import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="section-cream px-4 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="tag mb-6 inline-block text-[var(--color-muted)]">
              Contact
            </p>
            <h2 className="headline-xl text-5xl md:text-6xl">
              Let&apos;s
              <br />
              <span className="font-serif italic font-normal text-[var(--color-coral)]">
                talk
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-[var(--color-muted)]">
              Open to software engineering roles. Happy to walk through any
              project architecture or demo a Docker deployment live.
            </p>

            <div className="mt-10 space-y-4 font-mono text-sm">
              <a
                href="mailto:kiagov02@gmail.com"
                className="block transition hover:text-[var(--color-coral)]"
              >
                kiagov02@gmail.com
              </a>
              <p className="text-[var(--color-muted)]">South Africa</p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag transition hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag transition hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brutal-border brutal-shadow bg-white p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    className="mt-2 w-full border-b-2 border-[var(--color-ink)] bg-transparent py-2 outline-none focus:border-[var(--color-coral)]"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-2 w-full resize-none border-b-2 border-[var(--color-ink)] bg-transparent py-2 outline-none focus:border-[var(--color-coral)]"
                />
              </div>
              <button
                type="submit"
                className="brutal-border brutal-shadow w-full bg-[var(--color-lime)] py-4 font-mono text-sm font-bold uppercase tracking-wider transition"
              >
                Send message →
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
