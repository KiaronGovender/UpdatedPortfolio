export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-8 text-[var(--color-paper)] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider text-[var(--color-paper)]/50 md:flex-row">
        <p>
          © {new Date().getFullYear()} · Next.js · Laravel · MySQL · Docker ·
          Python
        </p>
        <p>
          Built for{" "}
          <span className="text-[var(--color-lime)]">ambitious teams</span>
        </p>
      </div>
    </footer>
  );
}
