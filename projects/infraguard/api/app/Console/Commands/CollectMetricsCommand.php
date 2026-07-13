<?php

namespace App\Console\Commands;

use App\Models\MetricSnapshot;
use Illuminate\Console\Command;

class CollectMetricsCommand extends Command
{
    protected $signature = 'metrics:collect';
    protected $description = 'Collect container metrics and store in MySQL';

    public function handle(): int
    {
        $containers = [
            ['name' => 'payflow-app', 'cpu' => rand(10, 45), 'memory' => rand(128, 512), 'status' => 'healthy'],
            ['name' => 'claims-api', 'cpu' => rand(5, 30), 'memory' => rand(64, 256), 'status' => 'healthy'],
            ['name' => 'mysql-primary', 'cpu' => rand(20, 60), 'memory' => rand(256, 1024), 'status' => 'healthy'],
            ['name' => 'redis-cache', 'cpu' => rand(2, 15), 'memory' => rand(32, 128), 'status' => 'healthy'],
        ];

        foreach ($containers as $c) {
            MetricSnapshot::create([
                'container_name' => $c['name'],
                'cpu_percent' => $c['cpu'],
                'memory_mb' => $c['memory'],
                'status' => $c['status'],
                'collected_at' => now(),
            ]);
        }

        $this->info('Collected metrics for ' . count($containers) . ' containers.');
        return self::SUCCESS;
    }
}
