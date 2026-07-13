import { motion } from "framer-motion";
import { projects } from "../data/projects";

export function Hero() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12 lg:gap-0">
        {/* Left — typography */}
        <div className="flex flex-col justify-center px-4 py-16 md:px-8 lg:col-span-7 lg:py-24">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="tag mb-8 inline-block w-fit text-[var(--color-muted)]"
          >
            Software Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="headline-xl text-[clamp(3rem,10vw,7rem)]"
          >
            I build
            <br />
            <span className="font-serif italic font-normal text-[var(--color-coral)]">
              systems
            </span>
            <br />
            that work.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--color-muted)]"
          >
            Full-stack developer crafting enterprise projects with{" "}
            <strong className="font-medium text-[var(--color-ink)]">
              Next.js
            </strong>
            ,{" "}
            <strong className="font-medium text-[var(--color-ink)]">
              Laravel
            </strong>
            ,{" "}
            <strong className="font-medium text-[var(--color-ink)]">
              MySQL
            </strong>
            , and{" "}
            <strong className="font-medium text-[var(--color-ink)]">
              Docker
            </strong>{" "}
            — deployed to Azure. Six projects built for the pace of fast-moving
            product teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="brutal-border brutal-shadow-lime bg-[var(--color-ink)] px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-[var(--color-lime)] transition"
            >
              See my work →
            </a>
            <a
              href="#about"
              className="brutal-border px-8 py-4 font-mono text-sm uppercase tracking-wider transition hover:bg-[var(--color-paper-dark)]"
            >
              About me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex gap-12 border-t-2 border-[var(--color-ink)] pt-8"
          >
            {[
              { n: "10+", l: "Projects" },
              { n: "5", l: "Core stack" },
              { n: "100%", l: "Self-built" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl font-black">{s.n}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — project stack preview */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 p-8">
            <p className="font-mono mb-4 text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Featured work
            </p>
            {featured.map((p, i) => (
              <motion.a
                key={p.slug}
                href={`#projects`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="group mb-4 block brutal-border bg-white p-5 transition hover:translate-x-2"
                style={{ marginLeft: `${i * 16}px` }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {p.id}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: p.accentColor }}
                  >
                    {p.category}
                  </span>
                </div>
                <h3 className="font-display mt-2 text-xl font-black group-hover:text-[var(--color-coral)]">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="stack-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="border-t-2 border-b-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-3 text-[var(--color-lime)]">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track font-mono text-sm uppercase tracking-widest">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="mx-8">
                Next.js · Laravel · PHP · MySQL · Docker · Python · Azure ·
                React · Redis · Pest PHP · FastAPI · CI/CD ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
