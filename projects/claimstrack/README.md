# ClaimsTrack

Insurance claims lifecycle — **Next.js** portal + **Laravel** API + **MySQL** + **Sanctum** auth, **Dockerised**.

## Stack

Next.js · Laravel 11 · MySQL · Sanctum · Pest PHP · Docker Compose · Azure App Service

## Quick start

```bash
docker compose up -d
docker compose exec app php artisan migrate --seed
docker compose exec app ./vendor/bin/pest
```

## Claim states

`Submitted → UnderReview → Approved | Denied → Settled`

## Key files

- `api/app/Services/ClaimStateMachine.php` — enforced transitions + audit
- `api/app/Http/Controllers/ClaimController.php` — CRUD + transitions
- `api/tests/Feature/ClaimStateMachineTest.php` — Pest tests
