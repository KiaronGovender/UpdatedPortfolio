<?php

namespace App\Http\Controllers;

use App\Models\ConversationLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;

class ChatProxyController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $key = 'chat:' . ($request->user()?->id ?? $request->ip());

        if (RateLimiter::tooManyAttempts($key, 20)) {
            return response()->json(['error' => 'Rate limit exceeded'], 429);
        }

        RateLimiter::hit($key, 60);

        $validated = $request->validate(['question' => 'required|string|max:1000']);

        $response = Http::timeout(30)->post(config('services.rag.url') . '/chat', [
            'question' => $validated['question'],
        ]);

        if (!$response->successful()) {
            return response()->json(['error' => 'RAG service unavailable'], 502);
        }

        $data = $response->json();

        ConversationLog::create([
            'user_id' => $request->user()?->id,
            'question' => $validated['question'],
            'answer' => $data['answer'],
            'confidence' => $data['confidence'],
            'citations' => json_encode($data['citations']),
        ]);

        return response()->json($data);
    }
}
