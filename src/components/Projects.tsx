import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects, categoryLabels } from "../data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-dark px-4 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="tag mb-6 inline-block text-[var(--color-lime)]">
              Selected work
            </p>
            <h2 className="headline-xl text-5xl text-[var(--color-paper)] md:text-7xl">
              06 Projects
            </h2>
          </div>
          <p className="max-w-md text-[var(--color-paper)]/60">
            Enterprise patterns on my stack — Next.js frontends, Laravel APIs,
            MySQL persistence, Docker packaging, Python where it fits. Each one
            deployable to Azure.
          </p>
        </div>

        <div className="divide-y-2 divide-[var(--color-paper)]/15">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="project-row group py-10 transition"
            >
              <div className="grid items-center gap-6 md:grid-cols-12">
                <div className="md:col-span-1">
                  <span className="project-num font-display text-6xl font-black md:text-7xl">
                    {project.id}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: project.accentColor }}
                  >
                    {categoryLabels[project.category]}
                    {project.status === "in-progress"
                      ? " · In progress"
                      : " · Completed"}
                  </span>
                  <h3 className="font-display mt-1 text-3xl font-black text-[var(--color-paper)] transition group-hover:text-[var(--color-lime)] md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-paper)]/50">
                    {project.tagline}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="stack-pill text-[var(--color-paper)]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  {project.metrics && (
                    <div className="space-y-1">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div
                          key={m.label}
                          className="font-mono text-xs text-[var(--color-paper)]/40"
                        >
                          <span className="text-[var(--color-lime)]">
                            {m.value}
                          </span>{" "}
                          {m.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 md:text-right">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-paper)]/40">
                    Click for details
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[var(--color-paper)] transition group-hover:text-[var(--color-lime)]"
                  >
                    Case study
                    <span className="inline-block transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
