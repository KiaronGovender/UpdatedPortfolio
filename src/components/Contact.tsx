import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/kiagov02@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Unable to send your message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-cream px-4 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Side */}
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
                  href="https://github.com/KiaronGovender"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag transition hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/kiarongovender/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag transition hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brutal-border brutal-shadow bg-white p-8"
            //onSubmit={handleSubmit}
            action="https://formsubmit.co/kiagov02@gmail.com"
            method="POST"
          >
            {/* Optional FormSubmit settings */}
            <input
              type="hidden"
              name="_subject"
              value="New Portfolio Contact"
            />
            <input type="hidden" name="_captcha" value="false" />

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
                    name={field.id}
                    type={field.type}
                    required
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
                  name="message"
                  rows={4}
                  required
                  className="mt-2 w-full resize-none border-b-2 border-[var(--color-ink)] bg-transparent py-2 outline-none focus:border-[var(--color-coral)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="brutal-border brutal-shadow w-full bg-[var(--color-lime)] py-4 font-mono text-sm font-bold uppercase tracking-wider transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                {loading ? "Sending..." : "Send message →"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
