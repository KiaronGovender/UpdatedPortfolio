# DocuVault

Encrypted document vault — **Next.js** portal + **Laravel** encryption API + **MySQL** audit log + **Docker**.

## Stack

Next.js · Laravel 11 · MySQL · Sanctum · Docker Compose · Azure Key Vault (prod)

## Quick start

```bash
docker compose up -d
docker compose exec app php artisan migrate
```

## Key files

- `api/app/Services/DocumentEncryptionService.php` — AES-256 encrypt/decrypt
- `api/app/Http/Controllers/DocumentController.php` — upload/download with audit
- `api/app/Models/AuditLog.php` — append-only access records
