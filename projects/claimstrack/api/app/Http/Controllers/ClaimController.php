<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Services\ClaimStateMachine;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;

class ClaimController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Claim::with('auditLogs')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'policyholder_id' => 'required|string',
            'type' => 'required|in:motor,home',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string',
            'metadata' => 'nullable|array',
        ]);

        $claim = Claim::create([
            ...$validated,
            'status' => 'submitted',
        ]);

        return response()->json($claim, 201);
    }

    public function transition(Request $request, Claim $claim): JsonResponse
    {
        $validated = $request->validate([
            'target_status' => 'required|string',
            'actor_id' => 'required|string',
            'note' => 'nullable|string',
        ]);

        try {
            $updated = ClaimStateMachine::transition(
                $claim,
                $validated['target_status'],
                $validated['actor_id'],
                $validated['note'] ?? null,
            );
            return response()->json($updated->load('auditLogs'));
        } catch (InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
