<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReconciliationController;

Route::get('/health', fn () => response()->json(['status' => 'healthy', 'service' => 'payflow-lite']));

Route::prefix('reconciliation')->group(function () {
    Route::get('/transactions', [ReconciliationController::class, 'transactions']);
    Route::get('/deposits', [ReconciliationController::class, 'deposits']);
    Route::post('/run', [ReconciliationController::class, 'reconcile']);
    Route::get('/stats', [ReconciliationController::class, 'stats']);
    Route::post('/transactions', [ReconciliationController::class, 'storeTransaction']);
});
