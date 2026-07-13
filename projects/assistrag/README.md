# AssistRAG

Knowledge assistant — **Python** RAG engine + **Laravel** API gateway + **Next.js** chat UI + **Docker**.

## Stack

Next.js · Laravel 11 · Python · FastAPI · MySQL · Docker Compose · Azure OpenAI (prod)

## Quick start

```bash
docker compose up -d
# Python RAG: http://localhost:8000
# Laravel gateway: http://localhost:8085/api
# Next.js chat: http://localhost:3005
```

## Architecture

```
Next.js chat → Laravel (Sanctum + rate limit) → Python FastAPI (RAG)
Conversation logs → MySQL
```

## Key files

- `python-service/main.py` — chunk, embed, hybrid search, cited responses
- `api/app/Http/Controllers/ChatProxyController.php` — auth gateway to Python
- `api/app/Models/ConversationLog.php` — MySQL conversation history
