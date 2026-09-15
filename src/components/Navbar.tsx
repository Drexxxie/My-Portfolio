import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CONTACT, NAV_LINKS, scrollToSection } from '../lib/data';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ink/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-white/5">
        <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8"
        aria-label="Main navigation"
      >
        <button
          onClick={() => go('home')}
          className="group flex items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <span className="font-mono flex h-10 w-10 items-center justify-center border border-electric/60 bg-midnight text-sm font-bold text-white transition-colors group-hover:border-gold group-hover:text-gold">
            {'</>'}
          </span>
          <span className="leading-tight">
            <span className="font-display block text-[15px] font-bold tracking-wide text-white">
              {CONTACT.name}
            </span>
            <span className="font-mono block text-[10px] tracking-[0.25em] text-electric uppercase">
              {CONTACT.title}
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={`relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors xl:px-4 xl:text-sm ${
                  active === link.id ? 'text-white' : 'text-mist hover:text-white'
                }`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-[1px] h-[2px] bg-gold transition-all duration-300 xl:inset-x-4 ${
                    active === link.id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go('contact')}
            className="btn-cut hidden items-center gap-2 bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-all hover:bg-white hover:shadow-[0_0_28px_rgba(255,196,46,0.35)] sm:inline-flex"
          >
            Let&apos;s Work Together
            <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={`flex w-full items-center justify-between border-l-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active === link.id
                    ? 'border-gold bg-panel text-white'
                    : 'border-transparent text-mist hover:border-electric/60 hover:text-white'
                }`}
              >
                {link.label}
                <span className="font-mono text-[11px] text-electric/70">
                  0{i + 1}
                </span>
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => go('contact')}
              className="btn-cut flex w-full items-center justify-center gap-2 bg-gold px-5 py-3 text-sm font-bold text-ink"
            >
              Let&apos;s Work Together
              <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
