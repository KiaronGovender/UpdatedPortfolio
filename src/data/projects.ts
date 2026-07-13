export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category:
    | "fintech"
    | "insurance"
    | "devops"
    | "security"
    | "integration"
    | "ai";
  status: "completed" | "in-progress";
  featured: boolean;
  accentColor: string;
  tech: string[];
  infrastructure: string[];
  highlights: string[];
  challenges: { problem: string; solution: string }[];
  architecture: string[];
  repoPath: string;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "payflow-lite",
    title: "PayFlow Lite",
    tagline: "Payment reconciliation API with queued event processing",
    description:
      "Laravel API that matches bank deposits to merchant transactions via Redis queues — a fintech reconciliation pattern used in banking systems.",
    longDescription:
      "PayFlow Lite is a full-stack reconciliation system: a Next.js dashboard for analysts and a Laravel API that ingests payment events, processes them through Redis-backed queues, and persists matches to MySQL. Idempotency keys prevent duplicate counting on retries. Docker Compose spins up the entire stack — nginx, PHP-FPM, MySQL, Redis, and the Next.js frontend — in one command.",
    category: "fintech",
    status: "completed",
    featured: true,
    accentColor: "#0078d4",
    tech: ["Next.js", "Laravel 11", "MySQL", "Redis", "Docker", "PHPUnit"],
    infrastructure: [
      "Docker Compose",
      "Azure Container Apps",
      "Azure Database for MySQL",
      "Azure Cache for Redis",
    ],
    highlights: [
      "Laravel queue workers with idempotent reconciliation jobs and dead-letter handling",
      "Next.js dashboard with real-time mismatch table and filtering",
      "MySQL schema with indexed reference lookups and audit trail table",
      "Full Docker Compose setup — reproducible dev environment in under 2 minutes",
    ],
    challenges: [
      {
        problem:
          "Queue retries could double-count transactions on failure recovery.",
        solution:
          "Idempotency keys stored in MySQL with unique constraints — Laravel jobs check before processing.",
      },
      {
        problem:
          "Matching rules differed per merchant and lived hardcoded in controllers.",
        solution:
          "Extracted rules to JSON config files loaded via Laravel config cache — update without redeploy.",
      },
    ],
    architecture: [
      "Next.js dashboard → Laravel REST API → MySQL (transactions + deposits)",
      "Payment events → Redis queue → Laravel queue worker (match engine)",
      "Mismatch records → API endpoint → Next.js analyst review UI",
    ],
    repoPath: "projects/payflow-lite",
    metrics: [
      { label: "API routes", value: "12" },
      { label: "Test coverage", value: "84%" },
      { label: "Docker services", value: "5" },
    ],
  },
  {
    id: "02",
    slug: "claimstrack",
    title: "ClaimsTrack",
    tagline: "Insurance claims lifecycle with document uploads",
    description:
      "End-to-end claims workflow — submit, review, approve/deny — built with Laravel state machines, MySQL audit logs, and a Next.js portal.",
    longDescription:
      "ClaimsTrack models how insurers process claims daily. Policyholders use a Next.js portal to submit motor or home claims with document uploads stored via Laravel filesystem (local dev, Azure Blob in production). A Laravel API enforces valid state transitions through a dedicated state machine class, logging every change to a MySQL audit table. Role-based middleware separates claimant, adjuster, and admin access.",
    category: "insurance",
    status: "completed",
    featured: true,
    accentColor: "#10b981",
    tech: ["Next.js", "Laravel 11", "MySQL", "Sanctum", "Docker", "Pest PHP"],
    infrastructure: [
      "Docker Compose",
      "Azure App Service",
      "Azure Blob Storage",
      "Azure Database for MySQL",
    ],
    highlights: [
      "Laravel state machine class with enforced transition rules and audit logging",
      "Chunked file uploads with validation via Laravel Form Requests",
      "Sanctum token auth between Next.js frontend and Laravel API",
      "Pest PHP tests covering every valid and invalid state transition",
    ],
    challenges: [
      {
        problem:
          "Motor and home claims needed different fields on the same endpoint.",
        solution:
          "Polymorphic MySQL schema — shared claims table with JSON metadata column for product-specific fields.",
      },
      {
        problem: "Large PDF uploads timed out behind nginx.",
        solution:
          "Adjusted Docker nginx client_max_body_size and Laravel chunked upload with progress events.",
      },
    ],
    architecture: [
      "Next.js portal → Laravel API (Sanctum auth) → MySQL",
      "Documents → Laravel Storage → local / Azure Blob",
      "State transitions → ClaimStateMachine → audit_log table",
    ],
    repoPath: "projects/claimstrack",
    metrics: [
      { label: "API endpoints", value: "18" },
      { label: "Pest tests", value: "24" },
      { label: "Claim states", value: "5" },
    ],
  },
  {
    id: "03",
    slug: "infraguard",
    title: "InfraGuard",
    tagline: "Infrastructure health dashboard with Dockerised monitoring stack",
    description:
      "Next.js ops dashboard backed by a Laravel API that aggregates server metrics, cost trends, and alert history from MySQL.",
    longDescription:
      "InfraGuard gives small teams a single pane of glass for infrastructure health. A Laravel scheduler command polls Docker container stats and writes metrics to MySQL. The Next.js dashboard visualises uptime, memory usage, and cost anomalies with Recharts. Everything runs in Docker Compose — mirroring how modern engineering teams containerise services for enterprise clients deploying to Azure Container Apps.",
    category: "devops",
    status: "completed",
    featured: true,
    accentColor: "#8b5cf6",
    tech: [
      "Next.js",
      "Laravel 11",
      "MySQL",
      "Docker",
      "Recharts",
      "GitHub Actions",
    ],
    infrastructure: [
      "Docker Compose",
      "Azure Container Apps",
      "Azure Monitor",
      "GitHub Actions CI/CD",
    ],
    highlights: [
      "Laravel scheduled commands collect and aggregate container metrics into MySQL",
      "Cost anomaly detection using 7-day rolling average SQL window functions",
      "Next.js dashboard with uptime charts and alert feed",
      "GitHub Actions pipeline: test → build Docker images → push to registry",
    ],
    challenges: [
      {
        problem: "Raw metrics table grew too fast for dashboard queries.",
        solution:
          "Laravel artisan command aggregates hourly rollups — dashboard reads summary table only.",
      },
      {
        problem:
          "Docker stats varied between dev (Compose) and prod (Container Apps).",
        solution:
          "Abstracted metric collector behind a Laravel interface — swap Docker/Azure implementation per env.",
      },
    ],
    architecture: [
      "Laravel scheduler → metric collector → MySQL (raw + hourly rollup)",
      "Next.js dashboard → Laravel API → aggregated metrics + alerts",
      "GitHub Actions → Docker build → Azure Container Registry → Container Apps",
    ],
    repoPath: "projects/infraguard",
    metrics: [
      { label: "Containers monitored", value: "8" },
      { label: "Alert rules", value: "12" },
      { label: "CI pipeline steps", value: "6" },
    ],
  },
  {
    id: "04",
    slug: "docuvault",
    title: "DocuVault",
    tagline: "Encrypted document vault with access audit trail",
    description:
      "Secure document storage — Laravel handles encryption and access control, MySQL logs every action, Next.js provides the upload portal.",
    longDescription:
      "DocuVault demonstrates security-first document handling for banking and insurance contexts. Files are encrypted server-side using Laravel's encryption helpers before storage. Access tokens are time-limited via Laravel Sanctum abilities. Every upload, download, and delete is recorded in a MySQL audit table. Docker Compose packages PHP, MySQL, and Next.js for a consistent security testing environment.",
    category: "security",
    status: "completed",
    featured: false,
    accentColor: "#f59e0b",
    tech: ["Next.js", "Laravel 11", "MySQL", "Sanctum", "Docker", "PHPUnit"],
    infrastructure: [
      "Docker Compose",
      "Azure Key Vault",
      "Azure Blob Storage",
      "Azure App Service",
    ],
    highlights: [
      "Laravel encrypt/decrypt with per-document keys stored separately from ciphertext",
      "Sanctum token abilities restrict download access to 15-minute windows",
      "MySQL audit_log table — immutable append-only access records",
      "Docker Compose with separate volumes for encrypted storage isolation",
    ],
    challenges: [
      {
        problem:
          "Key rotation required re-encrypting thousands of existing documents.",
        solution:
          "Versioned encryption keys in Laravel config — decrypt with old, re-encrypt with new via artisan command.",
      },
      {
        problem: "Audit log queries slowed as records accumulated.",
        solution:
          "MySQL partitioning by month on audit_log + indexed composite (document_id, created_at).",
      },
    ],
    architecture: [
      "Next.js upload portal → Laravel API → encrypted storage volume",
      "Encryption keys → Laravel config / Azure Key Vault in production",
      "All access events → MySQL audit_log → admin compliance view",
    ],
    repoPath: "projects/docuvault",
    metrics: [
      { label: "Encryption", value: "AES-256-CBC" },
      { label: "Audit coverage", value: "100%" },
      { label: "Token TTL", value: "15 min" },
    ],
  },
  {
    id: "05",
    slug: "queueforge",
    title: "QueueForge",
    tagline: "Background job orchestrator with live progress tracking",
    description:
      "Laravel queue system for long-running report jobs — batch processing, retries, and a Next.js dashboard showing live job progress.",
    longDescription:
      "QueueForge handles async workloads every enterprise needs: PDF report generation, CSV exports, batch data validation. Laravel queues (Redis driver) orchestrate multi-step jobs with retry logic and failure handling. A Python sidecar script handles heavy PDF rendering. The Next.js dashboard polls Laravel API for job status and displays a live progress bar — a common integration pattern across client-facing platforms.",
    category: "integration",
    status: "completed",
    featured: false,
    accentColor: "#f43f5e",
    tech: ["Next.js", "Laravel 11", "MySQL", "Redis", "Python", "Docker"],
    infrastructure: [
      "Docker Compose",
      "Azure Container Apps",
      "Azure Cache for Redis",
      "Azure Blob Storage",
    ],
    highlights: [
      "Laravel job chains: fetch → transform → render (Python) → store",
      "Exponential backoff retry policy with max 5 attempts and failed_jobs table",
      "Python Flask microservice for PDF generation called via HTTP from Laravel jobs",
      "Next.js dashboard with polling-based live progress and job history",
    ],
    challenges: [
      {
        problem: "PDF rendering blocked PHP queue workers for 30+ seconds.",
        solution:
          "Extracted rendering to a Python sidecar — Laravel job sends HTTP request, polls for completion.",
      },
      {
        problem: "Users had no visibility into 10-minute batch jobs.",
        solution:
          "Jobs update a MySQL job_progress table at each step — Next.js polls every 2 seconds.",
      },
    ],
    architecture: [
      "Next.js → Laravel API → Redis queue → queue worker",
      "Report job → Python PDF service → Azure Blob / local storage",
      "Job progress → MySQL → Next.js live dashboard",
    ],
    repoPath: "projects/queueforge",
    metrics: [
      { label: "Job types", value: "4" },
      { label: "Max retries", value: "5" },
      { label: "Longest job tested", value: "11 min" },
    ],
  },
  {
    id: "06",
    slug: "assistrag",
    title: "AssistRAG",
    tagline:
      "Knowledge assistant — Python RAG engine, Laravel gateway, Next.js chat",
    description:
      "Retrieval-augmented generation chatbot: Python handles embeddings and search, Laravel manages auth and rate limiting, Next.js delivers the chat UI.",
    longDescription:
      "AssistRAG is a three-service architecture showcasing polyglot system design. A Python FastAPI service indexes markdown docs, generates embeddings, and performs hybrid retrieval. Laravel acts as the API gateway — handling Sanctum auth, rate limiting, and request logging to MySQL. The Next.js chat UI streams responses with source citations. All three services communicate over Docker's internal network, deployable to Azure Container Apps as separate containers.",
    category: "ai",
    status: "in-progress",
    featured: true,
    accentColor: "#06b6d4",
    tech: ["Next.js", "Laravel 11", "Python", "FastAPI", "MySQL", "Docker"],
    infrastructure: [
      "Docker Compose",
      "Azure OpenAI",
      "Azure Container Apps",
      "Azure Database for MySQL",
    ],
    highlights: [
      "Python FastAPI RAG pipeline: chunk → embed → hybrid search → cited response",
      "Laravel gateway with Sanctum auth, rate limiting, and conversation logging",
      "Next.js streaming chat UI with clickable source citations",
      "Confidence threshold — refuses to answer when retrieval score is below 0.7",
    ],
    challenges: [
      {
        problem: "Direct Python API exposure lacked auth and rate limiting.",
        solution:
          "Laravel API gateway proxies to Python — Sanctum tokens validated before forwarding.",
      },
      {
        problem:
          "Re-embedding unchanged documents wasted Azure OpenAI credits.",
        solution:
          "Python indexer stores content hashes in MySQL — skip embedding when hash unchanged.",
      },
    ],
    architecture: [
      "Next.js chat → Laravel gateway (auth + rate limit) → Python FastAPI (RAG)",
      "Docs → Python indexer → embeddings → vector store / MySQL metadata",
      "Conversation logs → MySQL via Laravel → admin analytics dashboard",
    ],
    repoPath: "projects/assistrag",
    metrics: [
      { label: "Indexed docs", value: "120+" },
      { label: "Avg. latency", value: "2.3s" },
      { label: "Services", value: "3" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<Project["category"], string> = {
  fintech: "FinTech",
  insurance: "Insurance",
  devops: "DevOps",
  security: "Security",
  integration: "Integration",
  ai: "AI & Data",
};
