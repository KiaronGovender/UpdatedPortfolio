# BBD Portfolio — Full-Stack Software Engineer

Portfolio + six enterprise projects built with **Next.js**, **Laravel**, **MySQL**, **Docker**, and **Python** — tailored for the BBD Grad Programme.

## Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Laravel 11, PHP 8.3, Python, FastAPI |
| Database | MySQL 8, Redis |
| Infra | Docker Compose, GitHub Actions, Azure |

## Portfolio website

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
```

## Projects

| # | Project | Stack highlight |
|---|---------|----------------|
| 01 | [PayFlow Lite](./projects/payflow-lite/) | Laravel queues + MySQL reconciliation |
| 02 | [ClaimsTrack](./projects/claimstrack/) | Laravel state machine + Pest tests |
| 03 | [InfraGuard](./projects/infraguard/) | Laravel metrics collector + Next.js dashboard |
| 04 | [DocuVault](./projects/docuvault/) | Laravel encryption + MySQL audit log |
| 05 | [QueueForge](./projects/queueforge/) | Laravel jobs + Python PDF service |
| 06 | [AssistRAG](./projects/assistrag/) | Python RAG + Laravel gateway + Next.js chat |

## Customise

1. Update name/contact in `src/components/Hero.tsx` and `Contact.tsx`
2. Replace `yourusername` in `ProjectDetail.tsx`
3. Change navbar initials `YN.` in `Navbar.tsx`

## Deploy

- **Portfolio**: Vercel, Netlify, or Azure Static Web Apps
- **Projects**: Azure Container Apps with Azure Database for MySQL

---

Built for the BBD Grad Programme — Cape Town & Johannesburg.
