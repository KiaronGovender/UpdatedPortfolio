from fastapi import FastAPI
from pydantic import BaseModel
import math
import re

app = FastAPI(title="AssistRAG Engine", version="1.0.0")

DOCUMENTS = [
    {"id": "doc-001", "title": "Laravel Queue Workers", "content": "Run queue workers with php artisan queue:work redis --tries=3. Failed jobs go to the failed_jobs table. Use exponential backoff via public array $backoff on your job class.", "source": "docs/laravel/queues.md"},
    {"id": "doc-002", "title": "Docker Compose for Laravel", "content": "Standard Compose stack: nginx, php-fpm, mysql, redis. Mount source as volume for dev. Use separate Dockerfile for production with multi-stage build.", "source": "docs/devops/docker-laravel.md"},
    {"id": "doc-003", "title": "Next.js API Routes", "content": "Use Route Handlers in app/api/ for server-side logic. For Laravel backends, configure NEXT_PUBLIC_API_URL and use fetch with Sanctum tokens in Authorization header.", "source": "docs/frontend/nextjs-api.md"},
    {"id": "doc-004", "title": "MySQL Indexing", "content": "Add composite indexes for common query patterns. Use EXPLAIN to verify index usage. Partition large audit tables by month.", "source": "docs/database/mysql-indexing.md"},
    {"id": "doc-005", "title": "RAG Best Practices", "content": "Chunk at 512-1024 tokens with 128 overlap. Hybrid search combines keyword and vector retrieval. Always cite sources. Set confidence threshold below 0.7 to refuse answering.", "source": "docs/ai/rag-guide.md"},
]

class ChatRequest(BaseModel):
    question: str

class Citation(BaseModel):
    document_id: str
    title: str
    source: str
    relevance: float

class ChatResponse(BaseModel):
    answer: str
    citations: list[Citation]
    confidence: float

def tokenize(text: str) -> set[str]:
    return set(re.findall(r"\w+", text.lower()))

def score(question_tokens: set[str], doc: dict) -> float:
    doc_tokens = tokenize(doc["title"] + " " + doc["content"])
    if not doc_tokens:
        return 0.0
    overlap = len(question_tokens & doc_tokens)
    return overlap / math.sqrt(len(question_tokens) * len(doc_tokens))

@app.get("/health")
def health():
    return {"status": "healthy", "service": "assistrag-engine", "docs": len(DOCUMENTS)}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    q_tokens = tokenize(req.question)
    scored = sorted([(score(q_tokens, d), d) for d in DOCUMENTS], key=lambda x: x[0], reverse=True)
    top = [(s, d) for s, d in scored if s > 0][:3]
    confidence = top[0][0] if top else 0.0

    if confidence < 0.15:
        return ChatResponse(answer="I don't have enough information to answer confidently.", citations=[], confidence=confidence)

    answer = "Based on internal docs:\n\n" + "\n\n".join(d["content"][:300] for _, d in top)
    citations = [Citation(document_id=d["id"], title=d["title"], source=d["source"], relevance=round(s, 3)) for s, d in top]

    return ChatResponse(answer=answer, citations=citations, confidence=round(confidence, 3))
