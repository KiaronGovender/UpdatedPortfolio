# PayFlow Lite

Payment reconciliation system — **Next.js** dashboard + **Laravel** API + **MySQL** + **Redis** queues, fully **Dockerised**.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, TypeScript |
| API | Laravel 11, PHP 8.3 |
| Database | MySQL 8 |
| Queue | Redis + Laravel Queue |
| Infra | Docker Compose |
| Deploy | Azure Container Apps, Azure Database for MySQL |

## Quick start

```bash
docker compose up -d
docker compose exec app php artisan migrate --seed
docker compose exec app php artisan queue:work &
```

- API: http://localhost:8080/api
- Next.js dashboard: http://localhost:3000

## Run tests

```bash
docker compose exec app php artisan test
```

## Architecture

```
Next.js dashboard → Laravel REST API → MySQL
Payment events → Redis queue → ReconcilePaymentJob → MySQL
```

## Key files

- `api/app/Jobs/ReconcilePaymentJob.php` — idempotent reconciliation
- `api/app/Http/Controllers/ReconciliationController.php` — API endpoints
- `api/database/migrations/` — transactions, deposits, idempotency_keys
- `docker-compose.yml` — nginx, php-fpm, mysql, redis, nextjs
