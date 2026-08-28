export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: "fintech" | "devops" | "ai" | "fullstack";
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
    slug: "autonomous-production-incident-response-platform",
    title: "Autonomous Production Incident Response Platform",
    tagline:
      "AI-powered incident detection, investigation, and remediation platform",

    description:
      "Full-stack AI SRE platform that simulates production incidents and automates the detect-investigate-remediate lifecycle across application services.",

    longDescription:
      "The Autonomous Production Incident Response Platform is a full-stack AI-powered SRE system designed to simulate how modern engineering teams detect, investigate, and recover from production incidents. The platform generates realistic service failures, collects application telemetry and events, runs autonomous investigations across logs, metrics, deployment history, service dependencies, and database health, and ranks competing root-cause hypotheses. Investigation workflows can trigger approval-gated remediation actions such as service restarts, rollbacks, and failover operations, followed by automated recovery verification. The platform includes a Next.js incident command dashboard and a FastAPI backend deployed to Google Cloud Run through GitHub Actions CI/CD.",

    category: "devops",
    status: "completed",
    featured: true,
    accentColor: "#0078d4",

    tech: [
      "Python",
      "FastAPI",
      "SQLModel",
      "PostgreSQL",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "GitHub Actions",
    ],

    infrastructure: [
      "Docker",
      "Google Cloud Run",
      "Google Artifact Registry",
      "GitHub Actions CI/CD",
      "Google Cloud Workload Identity Federation",
    ],

    highlights: [
      "Built a full-stack incident management platform covering detection, investigation, remediation, and recovery verification",
      "Implemented autonomous investigation workflows using diagnostic tools across logs, metrics, deployments, service dependencies, and database health",
      "Implemented root-cause hypothesis ranking with confidence scoring",
      "Added realistic incident simulation scenarios covering multiple production failure modes",
      "Built approval-gated remediation workflows for rollback, restart, and failover actions",
      "Developed an incident command dashboard for service topology, telemetry, investigation traces, hypotheses, remediation, and timelines",
      "Added automated testing across API, incident detection, simulation, investigation, RAG, agent, remediation, and end-to-end workflows",
      "Implemented CI/CD with GitHub Actions and deployed the application to Google Cloud Run",
    ],

    challenges: [
      {
        problem:
          "Production incidents can involve multiple possible causes across different services and infrastructure signals.",
        solution:
          "Built an autonomous investigation workflow that gathers evidence from multiple diagnostic sources and evaluates competing root-cause hypotheses before recommending remediation.",
      },
      {
        problem:
          "Automated remediation can create additional risk if actions are executed without verification or human oversight.",
        solution:
          "Implemented approval-gated remediation workflows followed by automated recovery verification.",
      },
    ],

    architecture: [
      "Next.js incident command dashboard → FastAPI REST API → PostgreSQL",
      "Incident simulator → events + telemetry → detection and investigation engine",
      "Investigation agent → diagnostic tools → evidence collection → hypothesis ranking",
      "Approved remediation → recovery action → automated verification",
      "GitHub Actions → container build → Google Artifact Registry → Cloud Run",
    ],

    repoPath: "https://github.com/KiaronGovender/incident-response-platform",
  },
  {
    id: "02",
    slug: "chirp",
    title: "Chirp",
    tagline: "Full-stack social media platform built with Laravel and React",

    description:
      "Twitter-style social platform supporting posts, replies, likes, retweets, bookmarks, follows, notifications, messaging, profiles, and content discovery.",

    longDescription:
      "Chirp is a full-stack social media application built with Laravel and React using Inertia.js. The platform provides authenticated user accounts, social feeds, posts and replies, likes, retweets, bookmarks, following, notifications, user profiles, direct messaging, search, and content discovery. The project also includes application-level services, database relationships, validation, automated testing, static analysis, linting, formatting, and TypeScript checking.",

    category: "fullstack",
    status: "completed",
    featured: true,
    accentColor: "#10b981",

    tech: [
      "Laravel",
      "PHP",
      "React",
      "TypeScript",
      "Inertia.js",
      "Tailwind CSS",
      "Eloquent ORM",
      "SQLite",
      "Pest",
      "PHPStan",
    ],

    infrastructure: ["Vite", "Composer", "npm", "Git", "GitHub"],

    highlights: [
      "Built a complete social media platform with authenticated user accounts and personalized feeds",
      "Implemented posts, replies, likes, retweets, bookmarks, follows, and notifications",
      "Developed direct messaging and conversation functionality",
      "Implemented user profiles, search, trending content, and discovery functionality",
      "Used Laravel services and Eloquent relationships to structure application logic and data access",
      "Implemented automated testing with Pest",
      "Added static analysis with PHPStan/Larastan",
      "Added frontend linting, formatting, and TypeScript validation",
    ],

    challenges: [
      {
        problem:
          "A social platform requires different interaction states depending on the authenticated user.",
        solution:
          "Implemented user-specific interaction state for actions such as likes, retweets, bookmarks, and follows while keeping feed responses consistent.",
      },
      {
        problem:
          "Timeline and discovery queries can become expensive as the amount of social content increases.",
        solution:
          "Structured timeline and discovery logic into dedicated application services and used pagination to control the amount of data returned to the frontend.",
      },
    ],

    architecture: [
      "React + Inertia frontend → Laravel controllers and services → Eloquent ORM",
      "Laravel authentication → protected application routes → user-specific resources",
      "Social interactions → relational database models → personalized feed",
    ],

    repoPath: "https://github.com/KiaronGovender/Chirp",
  },
  {
    id: "03",
    slug: "payflow-lite",
    title: "PayFlow Lite",
    tagline: "Payment reconciliation API with queued event processing",

    description:
      "Fintech reconciliation platform that processes payment events through Redis-backed queues and matches deposits against merchant transactions.",

    longDescription:
      "PayFlow Lite is a full-stack payment reconciliation system consisting of a Laravel API and Next.js dashboard. Payment events are ingested through the API and processed asynchronously through Redis-backed queues before being matched against merchant transactions stored in MySQL. Idempotency keys prevent duplicate processing when events are retried. The platform includes a dashboard for monitoring reconciliation results and reviewing mismatches.",

    category: "fintech",
    status: "completed",
    featured: true,
    accentColor: "#0078d4",

    tech: [
      "Laravel",
      "PHP",
      "Next.js",
      "React",
      "MySQL",
      "Redis",
      "Docker",
      "PHPUnit",
    ],

    infrastructure: ["Docker Compose", "Redis", "MySQL", "GitHub Actions"],

    highlights: [
      "Built a Laravel REST API for ingesting and reconciling payment events",
      "Implemented Redis-backed asynchronous queue processing",
      "Used idempotency keys to prevent duplicate transaction processing during retries",
      "Built a Next.js dashboard for monitoring payment mismatches and reconciliation results",
      "Designed relational data models for transactions, deposits, reconciliation records, and audit information",
      "Containerized the application stack with Docker Compose",
      "Added automated backend testing",
    ],

    challenges: [
      {
        problem:
          "Retrying a failed payment event could result in the same transaction being processed more than once.",
        solution:
          "Implemented idempotency keys and database constraints so previously processed events could safely be retried without duplicate reconciliation.",
      },
      {
        problem:
          "Payment processing should not block the API while potentially expensive reconciliation work is performed.",
        solution:
          "Moved reconciliation processing into Redis-backed Laravel queue workers so API requests could return without waiting for background processing to complete.",
      },
    ],

    architecture: [
      "Next.js dashboard → Laravel REST API → MySQL",
      "Payment event → Laravel API → Redis queue → Laravel worker → reconciliation engine",
      "Reconciliation result → MySQL → Next.js analyst dashboard",
    ],

    repoPath: "https://github.com/KiaronGovender/Payflow-Lite",
  },
  {
    id: "04",
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    tagline: "AI-powered resume and job description analysis platform",

    description:
      "AI application that evaluates resumes against job descriptions using document parsing, web scraping, LLM analysis, ATS scoring, keyword matching, and recruiter-focused recommendations.",

    longDescription:
      "AI Resume Analyzer is a full-stack AI application that evaluates a candidate's resume against a target job description. The application supports PDF, DOCX, and TXT resume parsing, job-description extraction from URLs, ATS-style keyword analysis, recruiter scoring, role detection, and an AI-generated improvement plan. A React/Vite frontend communicates with a Flask backend, which processes documents and uses the Groq API with Llama 3.3 for analysis.",

    category: "ai",
    status: "completed",
    featured: true,
    accentColor: "#06b6d4",

    tech: [
      "Python",
      "Flask",
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Groq",
      "Llama 3.3",
      "BeautifulSoup",
      "PDFMiner",
      "python-docx",
    ],

    infrastructure: [
      "Python virtual environment",
      "REST API",
      "Vite",
      "Groq API",
    ],

    highlights: [
      "Built an AI-powered resume evaluation pipeline using Llama 3.3 through the Groq API",
      "Implemented PDF, DOCX, and TXT resume text extraction",
      "Built job-description extraction from public URLs using requests and BeautifulSoup",
      "Implemented ATS-style scoring and recruiter-focused scoring",
      "Added keyword matching to identify strengths and missing job requirements",
      "Implemented role-adaptive evaluation so scoring criteria can change based on the target position",
      "Generated prioritized recommendations for improving resume alignment",
      "Built a React frontend for uploading resumes and reviewing analysis results",
    ],

    challenges: [
      {
        problem:
          "Different jobs require different skills and evaluation criteria, making a single fixed scoring model unreliable.",
        solution:
          "Implemented role detection and role-adaptive evaluation criteria so the analysis can account for the requirements and seniority of the target position.",
      },
      {
        problem:
          "Job descriptions are often hosted on different websites and use inconsistent page structures.",
        solution:
          "Built a scraping pipeline that attempts structured JobPosting data and multiple common HTML patterns before falling back to cleaned page content.",
      },
    ],

    architecture: [
      "React/Vite frontend → Flask REST API",
      "Resume upload → document parser → extracted resume text",
      "Job URL → scraper → extracted job description",
      "Resume + job description → LLM analysis → ATS/recruiter scores + recommendations",
    ],

    repoPath: "https://github.com/KiaronGovender/Ai-Resume-Analyzer",
  },
  {
    id: "05",
    slug: "inventory-stock-management-system",
    title: "Inventory & Stock Management System",
    tagline: "Role-based inventory management and stock tracking platform",

    description:
      "Business application for managing inventory, stock movements, low-stock alerts, reporting, and role-based administrator and staff access.",

    longDescription:
      "A Laravel-based inventory management system designed around real-world stock control workflows. The application provides role-based access, product management, stock tracking, stock movement history, low-stock alerts, search and filtering, reporting, and dashboard statistics. It uses Laravel's Eloquent ORM and relational database features to model inventory and stock relationships.",

    category: "fullstack",
    status: "completed",
    featured: false,
    accentColor: "#8b5cf6",

    tech: [
      "Laravel",
      "PHP",
      "MySQL",
      "Eloquent ORM",
      "REST APIs",
      "Authentication",
      "Blade",
    ],

    infrastructure: ["Laravel", "MySQL", "Git", "GitHub"],

    highlights: [
      "Implemented role-based administrator and staff access",
      "Built inventory CRUD functionality and database migrations",
      "Implemented stock tracking and stock movement history",
      "Added low-stock alerts and dashboard statistics",
      "Implemented search and filtering for inventory records",
      "Used Eloquent relationships to model inventory data",
      "Implemented validation and protected application routes",
    ],

    challenges: [
      {
        problem:
          "Inventory changes need to remain traceable rather than simply overwriting the current stock value.",
        solution:
          "Implemented stock movement tracking so inventory changes could be recorded and reviewed as part of the application's workflow.",
      },
    ],

    architecture: [
      "Laravel application → controllers → Eloquent models → MySQL",
      "Authenticated user → role-based middleware → inventory functionality",
      "Stock operation → inventory update → stock movement history",
    ],

    repoPath:
      "https://github.com/KiaronGovender/Inventory-Stock-Management-System",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<Project["category"], string> = {
  fintech: "FinTech",
  devops: "DevOps",
  ai: "AI & Data",
  fullstack: "Full-Stack",
};
