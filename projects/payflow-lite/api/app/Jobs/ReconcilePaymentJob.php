<?php

namespace App\Jobs;

use App\Models\BankDeposit;
use App\Models\IdempotencyKey;
use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class ReconcilePaymentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public function handle(): void
    {
        BankDeposit::whereNull('matched_transaction_id')->each(function (BankDeposit $deposit) {
            $key = "reconcile-{$deposit->id}";

            if (IdempotencyKey::where('key', $key)->exists()) {
                return;
            }

            DB::transaction(function () use ($deposit, $key) {
                IdempotencyKey::create(['key' => $key]);

                $transaction = Transaction::where('reference', $deposit->reference)
                    ->where('status', 'pending')
                    ->first();

                if (!$transaction) {
                    return;
                }

                if (abs($transaction->amount - $deposit->amount) < 0.01) {
                    $transaction->update(['status' => 'matched']);
                    $deposit->update(['matched_transaction_id' => $transaction->id]);
                } else {
                    $transaction->update(['status' => 'unmatched']);
                }
            });
        });
    }
}
