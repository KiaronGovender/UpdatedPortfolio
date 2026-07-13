<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Document;
use App\Services\DocumentEncryptionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function __construct(private DocumentEncryptionService $encryption) {}

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'filename' => 'required|string',
            'content' => 'required|string',
            'uploaded_by' => 'required|string',
        ]);

        $encrypted = $this->encryption->encrypt($validated['content']);

        $document = Document::create([
            'filename' => $validated['filename'],
            'ciphertext' => $encrypted['ciphertext'],
            'key_version' => $encrypted['key_version'],
            'uploaded_by' => $validated['uploaded_by'],
        ]);

        AuditLog::record($document->id, 'upload', $validated['uploaded_by']);

        return response()->json([
            'id' => $document->id,
            'filename' => $document->filename,
            'uploaded_at' => $document->created_at,
        ], 201);
    }

    public function show(Document $document, Request $request): JsonResponse
    {
        $content = $this->encryption->decrypt($document->ciphertext);
        AuditLog::record($document->id, 'download', $request->query('actor_id', 'anonymous'));

        return response()->json([
            'id' => $document->id,
            'filename' => $document->filename,
            'content' => $content,
        ]);
    }

    public function auditLog(): JsonResponse
    {
        return response()->json(AuditLog::orderByDesc('created_at')->limit(100)->get());
    }
}
