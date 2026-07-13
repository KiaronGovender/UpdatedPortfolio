<?php

namespace App\Http\Controllers;

use App\Models\MetricSnapshot;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class MetricsController extends Controller
{
    public function summary(): JsonResponse
    {
        $latest = MetricSnapshot::select('container_name', DB::raw('MAX(collected_at) as last_seen'))
            ->groupBy('container_name')
            ->get();

        $healthy = MetricSnapshot::where('status', 'healthy')
            ->where('collected_at', '>=', now()->subHour())
            ->distinct('container_name')
            ->count('container_name');

        return response()->json([
            'total_containers' => $latest->count(),
            'healthy' => $healthy,
            'last_collection' => MetricSnapshot::max('collected_at'),
        ]);
    }

    public function history(string $container): JsonResponse
    {
        return response()->json(
            MetricSnapshot::where('container_name', $container)
                ->orderByDesc('collected_at')
                ->limit(24)
                ->get()
        );
    }

    public function anomalies(): JsonResponse
    {
        $anomalies = MetricSnapshot::select('container_name', DB::raw('AVG(cpu_percent) as avg_cpu'))
            ->where('collected_at', '>=', now()->subDays(7))
            ->groupBy('container_name')
            ->having('avg_cpu', '>', 50)
            ->get();

        return response()->json($anomalies);
    }
}
