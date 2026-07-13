import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#projects", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-paper)]/95 backdrop-blur-sm border-b-2 border-[var(--color-ink)]"
          : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          to="/"
          className="font-display text-xl font-black tracking-tighter"
        >
          KG<span className="text-[var(--color-coral)]">.</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={isHome ? link.href.replace("/", "") : link.href}
                className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden brutal-border brutal-shadow bg-[var(--color-lime)] px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition md:inline-block"
        >
          Hire me
        </a>

        <button
          type="button"
          className="font-mono text-xs uppercase md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-4 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href.replace("/", "") : link.href}
              className="block py-3 font-mono text-sm uppercase tracking-wider"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
