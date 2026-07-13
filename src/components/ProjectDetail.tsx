import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectBySlug, categoryLabels } from "../data/projects";

export function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 pt-24">
        <div className="text-center">
          <h1 className="headline-xl text-4xl">Not found</h1>
          <Link
            to="/"
            className="mt-4 inline-block font-mono text-sm uppercase underline"
          >
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="px-4 pb-28 pt-28 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/#projects"
          className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
        >
          ← All projects
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 brutal-border brutal-shadow bg-white p-8 md:p-12"
        >
          <div className="flex items-start justify-between">
            <span className="tag text-[var(--color-muted)]">
              {categoryLabels[project.category]} ·{" "}
              {project.status === "in-progress" ? "In progress" : "Completed"}
            </span>
            <span className="font-display text-5xl font-black text-[var(--color-paper-dark)]">
              {project.id}
            </span>
          </div>
          <h1 className="headline-xl mt-4 text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 font-serif text-xl italic text-[var(--color-muted)]">
            {project.tagline}
          </p>
        </motion.header>

        <div className="mt-12 space-y-14">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Overview
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              {project.longDescription}
            </p>
          </section>

          {project.metrics && (
            <section className="grid grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="brutal-border bg-[var(--color-lime)] p-5 text-center"
                >
                  <div className="font-display text-3xl font-black">
                    {m.value}
                  </div>
                  <div className="font-mono mt-1 text-[10px] uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </section>
          )}

          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-4 border-b border-[var(--color-paper-dark)] pb-3"
                >
                  <span className="font-mono text-[var(--color-coral)]">→</span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Architecture
            </h2>
            <div className="mt-4 brutal-border bg-[var(--color-ink)] p-6 font-mono text-sm text-[var(--color-lime)]">
              {project.architecture.map((line, i) => (
                <div key={line} className="py-2">
                  <span className="text-[var(--color-paper)]/40">
                    {String(i + 1).padStart(2, "0")}{" "}
                  </span>
                  {line}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Challenges
            </h2>
            <div className="mt-4 space-y-4">
              {project.challenges.map((c) => (
                <div key={c.problem} className="brutal-border p-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-coral)]">
                    Problem
                  </p>
                  <p className="mt-2">{c.problem}</p>
                  <p className="font-mono mt-4 text-xs uppercase tracking-wider text-[var(--color-lime)] bg-[var(--color-ink)] inline-block px-2 py-1">
                    Solution
                  </p>
                  <p className="mt-2 text-[var(--color-muted)]">{c.solution}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                Tech stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="stack-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                Deployment
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.infrastructure.map((s) => (
                  <span key={s} className="tag text-[var(--color-azure)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="brutal-border brutal-shadow-lime flex flex-col items-start gap-4 bg-[var(--color-ink)] p-6 text-[var(--color-paper)] sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-sm">
              Source:{" "}
              <code className="text-[var(--color-lime)]">
                {project.repoPath}
              </code>
            </span>
            <a
              href={`https://github.com/yourusername/portfolio/tree/main/${project.repoPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-border bg-[var(--color-lime)] px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
            >
              View repo →
            </a>
          </section>
        </div>
      </div>
    </article>
  );
}
