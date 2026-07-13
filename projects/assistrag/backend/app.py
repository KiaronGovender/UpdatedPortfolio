from flask import Flask, jsonify, request

app = Flask(__name__)


@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "service": "assistrag-api",
        "message": "AssistRAG backend is running"
    })


@app.post("/api/chat")
def chat():
    payload = request.get_json(silent=True) or {}
    message = (payload.get("message") or "").strip()

    if not message:
        return jsonify({"reply": "Hello! Ask me anything about your project."})

    lowered = message.lower()
    if "help" in lowered:
        reply = "I can help you review your project ideas, structure prompts, or test a local chat flow."
    elif "status" in lowered:
        reply = "The local AssistRAG stack is up and ready for testing."
    elif "hello" in lowered or "hi" in lowered:
        reply = "Hello! I’m your AssistRAG assistant for this local demo."
    else:
        reply = f"You said: {message}. I’m responding from the local AssistRAG backend."

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
