<?php

namespace App\Jobs;

use App\Models\JobProgress;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GenerateReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public int $tries = 5;
    public array $backoff = [10, 30, 60, 120, 300];

    public function __construct(public string $jobId, public array $parameters) {}

    public function handle(): void
    {
        $steps = ['fetching_data', 'transforming', 'rendering_pdf', 'storing'];

        foreach ($steps as $i => $step) {
            JobProgress::updateOrCreate(
                ['job_id' => $this->jobId],
                ['step' => $step, 'progress' => (int) (($i + 0.5) / count($steps) * 100), 'status' => 'running']
            );

            if ($step === 'rendering_pdf') {
                $response = Http::timeout(120)->post('http://python-service:5000/render', [
                    'template' => $this->parameters['template'] ?? 'monthly-report',
                    'data' => $this->parameters,
                ]);

                if (!$response->successful()) {
                    throw new \RuntimeException('PDF rendering failed: ' . $response->body());
                }
            }

            JobProgress::where('job_id', $this->jobId)->update([
                'step' => $step,
                'progress' => (int) (($i + 1) / count($steps) * 100),
            ]);
        }

        JobProgress::where('job_id', $this->jobId)->update([
            'status' => 'completed',
            'progress' => 100,
            'completed_at' => now(),
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        JobProgress::where('job_id', $this->jobId)->update([
            'status' => 'failed',
            'error' => $exception->getMessage(),
        ]);
    }
}
