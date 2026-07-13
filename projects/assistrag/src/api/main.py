from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math
import re

app = FastAPI(title="AssistRAG", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

DOCUMENTS = [
    {
        "id": "doc-001",
        "title": "Azure Key Vault - Managed Identity Setup",
        "content": "To configure Managed Identity for Key Vault access: 1) Enable system-assigned managed identity on your App Service or Function App. 2) Navigate to Key Vault Access Policies or RBAC. 3) Assign the 'Key Vault Secrets User' role to the managed identity principal ID. 4) Use DefaultAzureCredential in your SDK code — no connection strings needed.",
        "source": "internal-docs/security/key-vault-guide.md",
    },
    {
        "id": "doc-002",
        "title": "Service Bus - Dead Letter Queue Monitoring",
        "content": "Monitor dead-letter queues using Azure Monitor metric alerts. Set threshold on DeadletteredMessages count > 0 for critical queues. Use Service Bus Explorer or az servicebus topic subscription show to inspect DLQ messages. Implement idempotent handlers to safely reprocess messages.",
        "source": "internal-docs/integration/service-bus-runbook.md",
    },
    {
        "id": "doc-003",
        "title": "Bicep Deployment Best Practices",
        "content": "Use modular Bicep files with a shared naming convention module. Always run 'az deployment group what-if' before deploying to production. Parameterise environment-specific values (SKU, capacity) in separate parameter files. Tag all resources with environment, project, and cost-centre.",
        "source": "internal-docs/devops/bicep-standards.md",
    },
    {
        "id": "doc-004",
        "title": "Cosmos DB - Partition Key Selection",
        "content": "Choose partition keys with high cardinality and even distribution. For claims data, use policyholderId or claimId. Avoid monotonically increasing keys like timestamps. Test query patterns against the emulator before deploying. Use hierarchical partition keys for multi-tenant scenarios.",
        "source": "internal-docs/data/cosmos-partitioning.md",
    },
    {
        "id": "doc-005",
        "title": "Azure OpenAI - RAG Implementation Guide",
        "content": "For RAG pipelines: chunk documents at 512-1024 tokens with 128-token overlap. Use hybrid search combining vector and BM25 keyword retrieval. Always include source citations in responses. Set a confidence threshold — below 0.7, respond with 'insufficient information'. Apply Content Safety filters on inputs and outputs.",
        "source": "internal-docs/ai/rag-implementation.md",
    },
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


def score_document(question_tokens: set[str], doc: dict) -> float:
    doc_tokens = tokenize(doc["title"] + " " + doc["content"])
    if not doc_tokens:
        return 0.0
    overlap = len(question_tokens & doc_tokens)
    return overlap / math.sqrt(len(question_tokens) * len(doc_tokens))


@app.get("/health")
def health():
    return {"status": "healthy", "service": "assistrag", "indexed_docs": len(DOCUMENTS)}


@app.get("/api/documents")
def list_documents():
    return [{"id": d["id"], "title": d["title"], "source": d["source"]} for d in DOCUMENTS]


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    question_tokens = tokenize(request.question)
    scored = [(score_document(question_tokens, doc), doc) for doc in DOCUMENTS]
    scored.sort(key=lambda x: x[0], reverse=True)

    top_results = [(score, doc) for score, doc in scored if score > 0][:3]
    confidence = top_results[0][0] if top_results else 0.0

    if confidence < 0.15:
        return ChatResponse(
            answer="I don't have enough information in the knowledge base to answer that confidently. Try rephrasing or check the suggested documentation areas.",
            citations=[],
            confidence=confidence,
        )

    context = "\n\n".join(doc["content"] for _, doc in top_results)
    answer = f"Based on the internal documentation:\n\n{context[:600]}{'...' if len(context) > 600 else ''}"

    citations = [
        Citation(document_id=doc["id"], title=doc["title"], source=doc["source"], relevance=round(score, 3))
        for score, doc in top_results
    ]

    return ChatResponse(answer=answer, citations=citations, confidence=round(confidence, 3))
