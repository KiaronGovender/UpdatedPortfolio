<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('merchant_id');
            $table->decimal('amount', 12, 2);
            $table->string('reference')->unique();
            $table->string('idempotency_key')->unique();
            $table->enum('status', ['pending', 'matched', 'unmatched'])->default('pending');
            $table->timestamps();
        });

        Schema::create('bank_deposits', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 12, 2);
            $table->string('reference');
            $table->unsignedBigInteger('matched_transaction_id')->nullable();
            $table->timestamps();
        });

        Schema::create('idempotency_keys', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('idempotency_keys');
        Schema::dropIfExists('bank_deposits');
        Schema::dropIfExists('transactions');
    }
};
