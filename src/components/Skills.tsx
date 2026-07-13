const skills = [
  'Next.js', 'React', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'Redis',
  'Docker', 'Python', 'FastAPI', 'Sanctum', 'Pest PHP', 'PHPUnit',
  'GitHub Actions', 'Azure', 'REST APIs', 'Queue Workers', 'CI/CD',
]

const groups = [
  {
    title: 'Frontend',
    items: ['Next.js 14+', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
  },
  {
    title: 'Backend',
    items: ['Laravel 11', 'PHP 8.3', 'Python / FastAPI', 'REST API design', 'Sanctum auth'],
  },
  {
    title: 'Data & Infra',
    items: ['MySQL', 'Redis', 'Docker Compose', 'Azure Container Apps', 'Azure Blob / MySQL'],
  },
  {
    title: 'Practices',
    items: ['TDD (Pest/PHPUnit)', 'Queue-driven architecture', 'State machines', 'GitHub Actions CI/CD'],
  },
]

export function Skills() {
  return (
    <section id="stack" className="section-cream px-4 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="tag mb-6 inline-block text-[var(--color-muted)]">Stack</p>
        <h2 className="headline-xl text-5xl md:text-6xl">
          My toolkit<span className="cursor-blink text-[var(--color-coral)]">_</span>
        </h2>

        {/* Marquee */}
        <div className="mt-12 overflow-hidden border-y-2 border-[var(--color-ink)] py-4">
          <div className="marquee-track">
            {[...skills, ...skills].map((s, i) => (
              <span key={`${s}-${i}`} className="mx-6 font-mono text-lg font-bold uppercase tracking-wider">
                {s}
                <span className="mx-6 text-[var(--color-coral)]">◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="brutal-border brutal-shadow bg-white p-6 transition">
              <h3 className="font-display mb-4 text-lg font-black uppercase">{g.title}</h3>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-sm text-[var(--color-muted)]">
                    <span className="h-1.5 w-1.5 bg-[var(--color-lime)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
