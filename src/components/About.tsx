import { motion } from "framer-motion";

const values = [
  {
    num: "01",
    title: "Problem-first",
    text: "Every project started from a real workflow pain point — not a tutorial checklist.",
  },
  {
    num: "02",
    title: "Production patterns",
    text: "Queues, state machines, audit trails, Docker — I build the way enterprise teams actually ship.",
  },
  {
    num: "03",
    title: "Beyond the classroom",
    text: "Evenings and weekends spent building, breaking, and fixing full-stack systems on my own stack.",
  },
  {
    num: "04",
    title: "Role-ready pace",
    text: "Fast-moving teams teach more in weeks than classrooms — I've already embraced that intensity.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-dark diagonal-cut px-4 py-28 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="tag mb-6 inline-block text-[var(--color-lime)]">
              About
            </p>
            <h2 className="headline-xl text-5xl md:text-6xl text-[var(--color-paper)]">
              Code with
              <br />
              <span className="font-serif italic font-normal text-[var(--color-lime)]">
                purpose
              </span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[var(--color-paper)]/70">
              I&apos;m an early-career software engineer who builds software to
              solve real problems — not just pass assignments. My portfolio
              spans banking reconciliation, insurance claims, infrastructure
              monitoring, secure document storage, async job processing, and
              AI-powered knowledge systems. Each one uses my core stack
              (Next.js, Laravel, MySQL, Docker) and deploys to Azure.
            </p>
          </motion.div>

          <div className="space-y-0">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group border-t border-[var(--color-paper)]/20 py-6 transition hover:border-[var(--color-lime)]"
              >
                <div className="flex gap-6">
                  <span className="font-mono text-sm text-[var(--color-lime)]">
                    {v.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[var(--color-paper)]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-[var(--color-paper)]/60">
                      {v.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border-l-4 border-[var(--color-lime)] pl-8"
        >
          <p className="font-serif text-2xl italic leading-relaxed text-[var(--color-paper)]/80 md:text-3xl">
            &ldquo;Why your team? I want to learn from engineers who&apos;ve
            shipped for Standard Bank, Discovery, and Vodacom — not just read
            about them.&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
