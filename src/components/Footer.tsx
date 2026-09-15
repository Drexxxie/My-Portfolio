import { useEffect, useState } from 'react';
import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { CONTACT, NAV_LINKS, scrollToSection } from '../lib/data';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative border-t border-line bg-[#010512]" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <button onClick={() => scrollToSection('home')} className="flex items-center gap-3" aria-label="Back to top">
              <span className="font-mono flex h-10 w-10 items-center justify-center border border-electric/60 bg-midnight text-sm font-bold text-white">
                {'</>'}
              </span>
              <span className="text-left leading-tight">
                <span className="font-display block text-base font-bold text-white">{CONTACT.name}</span>
                <span className="font-mono block text-[10px] tracking-[0.25em] text-electric uppercase">
                  {CONTACT.title}
                </span>
              </span>
            </button>
            <p className="font-mono mt-5 text-xs tracking-[0.35em] text-gold">{CONTACT.brand}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">{CONTACT.tagline}.</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="font-mono text-[11px] tracking-[0.3em] text-white/60 uppercase">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-mist transition-colors hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-white/60 uppercase">Get in touch</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-mist transition-colors hover:text-gold">
                  <Mail size={15} className="text-electric" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mist transition-colors hover:text-gold">
                  <MessageCircle size={15} className="text-emerald-400" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="font-mono pt-1 text-xs text-mist/70">{CONTACT.location} {'\u2014'} Portfolio: {CONTACT.portfolioStatus}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="text-[13px] text-mist/80">
            {'\u00a9'} 2026 {CONTACT.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-widest text-mist/60">
            DESIGNED &amp; BUILT WITH CLEAN CODE
          </p>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center border border-gold/60 bg-ink/90 text-gold backdrop-blur transition-all hover:bg-gold hover:text-ink ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </footer>
  );
}
