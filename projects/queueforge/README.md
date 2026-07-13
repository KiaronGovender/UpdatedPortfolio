# QueueForge

Background job orchestrator — **Laravel** queues + **Python** PDF renderer + **Next.js** progress dashboard + **Docker**.

## Stack

Next.js · Laravel 11 · MySQL · Redis · Python (Flask) · Docker Compose

## Quick start

```bash
docker compose up -d
docker compose exec app php artisan queue:work &
```

## Architecture

```
Next.js → Laravel API → Redis queue → GenerateReportJob
  → Python PDF service (HTTP) → storage → job_progress table
```

## Key files

- `api/app/Jobs/GenerateReportJob.php` — multi-step job with progress updates
- `python-service/app.py` — Flask PDF rendering microservice
- `api/app/Models/JobProgress.php` — live progress tracking
