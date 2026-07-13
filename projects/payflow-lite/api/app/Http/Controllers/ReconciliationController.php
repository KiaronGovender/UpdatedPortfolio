<?php

namespace App\Http\Controllers;

use App\Models\BankDeposit;
use App\Models\Transaction;
use App\Jobs\ReconcilePaymentJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReconciliationController extends Controller
{
    public function transactions(): JsonResponse
    {
        return response()->json(Transaction::all());
    }

    public function deposits(): JsonResponse
    {
        return response()->json(BankDeposit::all());
    }

    public function reconcile(): JsonResponse
    {
        ReconcilePaymentJob::dispatch();

        return response()->json(['message' => 'Reconciliation job queued']);
    }

    public function stats(): JsonResponse
    {
        $total = Transaction::count();
        $matched = Transaction::where('status', 'matched')->count();
        $unmatched = Transaction::where('status', 'unmatched')->count();

        return response()->json([
            'total' => $total,
            'matched' => $matched,
            'unmatched' => $unmatched,
            'pending' => $total - $matched - $unmatched,
            'accuracy' => $total > 0 ? round(($matched / $total) * 100, 1) . '%' : '0%',
        ]);
    }

    public function storeTransaction(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'merchant_id' => 'required|string',
            'amount' => 'required|numeric',
            'reference' => 'required|string|unique:transactions,reference',
            'idempotency_key' => 'required|string|unique:transactions,idempotency_key',
        ]);

        $transaction = Transaction::create([
            ...$validated,
            'status' => 'pending',
        ]);

        return response()->json($transaction, 201);
    }
}
