# InfraGuard

Infrastructure health dashboard — **Next.js** + **Laravel** + **MySQL** + **Docker**.

## Stack

Next.js · Laravel 11 · MySQL · Docker Compose · Recharts · GitHub Actions · Azure Container Apps

## Quick start

```bash
docker compose up -d
docker compose exec app php artisan migrate
docker compose exec app php artisan metrics:collect
```

## Key files

- `api/app/Console/Commands/CollectMetricsCommand.php` — scheduled metric collection
- `api/app/Http/Controllers/MetricsController.php` — dashboard API
- `frontend/` — Next.js dashboard with Recharts
