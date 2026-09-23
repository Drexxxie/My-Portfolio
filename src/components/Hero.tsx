import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { CONTACT, fetchSettings, scrollToSection } from '../lib/data';

interface Token {
  t: string;
  c: string;
}

const CODE_LINES: { tokens: Token[] }[] = [
  { tokens: [{ t: 'const ', c: 'tok-kw' }, { t: 'developer', c: 'tok-var' }, { t: ' = {', c: 'tok-punc' }] },
  { tokens: [{ t: '  name: ', c: 'tok-prop' }, { t: "'Daniel Adegbuyi'", c: 'tok-str' }, { t: ',', c: 'tok-punc' }] },
  { tokens: [{ t: '  role: ', c: 'tok-prop' }, { t: "'Web Developer'", c: 'tok-str' }, { t: ',', c: 'tok-punc' }] },
  { tokens: [{ t: '  stack: ', c: 'tok-prop' }, { t: '[', c: 'tok-punc' }, { t: "'React'", c: 'tok-str' }, { t: ', ', c: 'tok-punc' }, { t: "'TypeScript'", c: 'tok-str' }, { t: ', ', c: 'tok-punc' }, { t: "'Tailwind'", c: 'tok-str' }, { t: '],', c: 'tok-punc' }] },
  { tokens: [{ t: '  focus: ', c: 'tok-prop' }, { t: "'Fast. Modern. Responsive.'", c: 'tok-str' }, { t: ',', c: 'tok-punc' }] },
  { tokens: [{ t: '  hireable: ', c: 'tok-prop' }, { t: 'true', c: 'tok-bool' }, { t: ',', c: 'tok-punc' }] },
  { tokens: [{ t: '};', c: 'tok-punc' }] },
  { tokens: [{ t: '', c: '' }] },
  { tokens: [{ t: 'export default ', c: 'tok-kw' }, { t: 'developer', c: 'tok-var' }, { t: ';', c: 'tok-punc' }] },
];

const TOTAL_CHARS = CODE_LINES.reduce(
  (sum, line) => sum + line.tokens.reduce((s, tok) => s + tok.t.length, 0) + 1,
  0
);

function TypedCode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let pause: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      frame += 1 + Math.floor(Math.random() * 2);
      if (frame >= TOTAL_CHARS) {
        setCount(TOTAL_CHARS);
        if (timer) clearInterval(timer);
        pause = setTimeout(() => {
          frame = 0;
          setCount(0);
          timer = setInterval(tick, 34);
        }, 7000);
        return;
      }
      setCount(frame);
    };
    timer = setInterval(tick, 34);
    return () => {
      if (timer) clearInterval(timer);
      if (pause) clearTimeout(pause);
    };
  }, []);

  const done = count >= TOTAL_CHARS;

  return (
    <div className="font-mono text-[11px] leading-[1.7] sm:text-[12.5px]" aria-label="Animated code sample">
      {CODE_LINES.map((line, li) => {
        const charsBeforeLine = CODE_LINES.slice(0, li).reduce(
          (sum, previousLine) => sum + previousLine.tokens.reduce((s, tok) => s + tok.t.length, 0) + 1,
          0
        );
        const remaining = count - charsBeforeLine;
        if (remaining <= 0) {
          return (
            <div key={li} className="flex">
              <span className="w-7 shrink-0 text-right text-white/20 select-none">{li + 1}</span>
              <span className="w-4 shrink-0" />
              <span>&nbsp;</span>
            </div>
          );
        }
        const rendered = line.tokens.reduce<{ spans: Token[]; remaining: number }>(
          (acc, tok) => {
            if (acc.remaining <= 0) return acc;
            const slice = tok.t.slice(0, acc.remaining);
            return {
              spans: [...acc.spans, { t: slice, c: tok.c }],
              remaining: acc.remaining - slice.length,
            };
          },
          { spans: [], remaining }
        );
        const remainingAfterLine = rendered.remaining - 1;
        const showCursor = !done && remainingAfterLine <= 0;
        return (
          <div key={li} className="flex">
            <span className="w-7 shrink-0 text-right text-white/20 select-none">{li + 1}</span>
            <span className="w-4 shrink-0" />
            <span className="whitespace-pre">
              {rendered.spans.length > 0 ? (
                rendered.spans.map((s, si) => (
                  <span key={si} className={s.c}>
                    {s.t}
                  </span>
                ))
              ) : (
                '\u00a0'
              )}
              {showCursor && <span className="cursor-blink text-gold">{'\u258c'}</span>}
            </span>
          </div>
        );
      })}
      {done && (
        <div className="flex">
          <span className="w-7 shrink-0" />
          <span className="w-4 shrink-0" />
          <span className="cursor-blink text-gold">{'\u258c'}</span>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const [availability, setAvailability] = useState('Available for new projects');

  useEffect(() => {
    fetchSettings()
      .then((s) => {
        if (s.availability_label) setAvailability(s.availability_label);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-16 lg:pt-[76px]" aria-label="Home">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(720px 420px at 12% 18%, rgba(46,125,255,0.22), transparent 65%), radial-gradient(560px 380px at 88% 72%, rgba(255,196,46,0.10), transparent 65%), radial-gradient(600px 500px at 70% 10%, rgba(58,224,255,0.10), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <span className="font-mono float-slow pointer-events-none absolute top-[16%] left-[4%] hidden text-3xl text-electric/25 select-none lg:block" aria-hidden="true">{'{ }'}</span>
      <span className="font-mono float pointer-events-none absolute bottom-[24%] left-[2%] hidden text-xl text-gold/25 select-none lg:block" aria-hidden="true">01</span>
      <span className="font-mono float-slow pointer-events-none absolute top-[30%] right-[3%] hidden text-2xl text-electric/25 select-none lg:block" aria-hidden="true">{'</>'}</span>
      <span className="font-mono float pointer-events-none absolute right-[6%] bottom-[14%] hidden text-xl text-white/15 select-none lg:block" aria-hidden="true">{'<>'}</span>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8 lg:pt-20 lg:pb-24">
        <div>
          <div className="inline-flex items-center gap-2.5 border border-electric/40 bg-midnight/80 px-4 py-2 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-white/90 uppercase sm:text-xs">
              {availability}
            </span>
          </div>

          <p className="font-mono mt-6 text-xs tracking-[0.3em] text-electric uppercase sm:text-sm">
            {CONTACT.name} <span className="text-gold">{'\u2014'}</span> {CONTACT.title}
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl xl:text-[3.9rem]">
            I BUILD DIGITAL{' '}
            <span className="text-glow-blue text-electric">EXPERIENCES</span>{' '}
            THAT WORK<span className="text-gold">.</span>
          </h1>
          <p className="font-display mt-5 text-lg font-medium text-white sm:text-xl">
            Fast. Modern. <span className="text-gold">Responsive</span> Websites Built Around Your Goals.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-mist">
            I help businesses, startups, and individuals turn ideas into clean, responsive,
            and functional websites that look great and work smoothly across devices.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-cut group inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-all hover:bg-white hover:shadow-[0_0_36px_rgba(255,196,46,0.4)]"
            >
              Start a Project
              <ArrowRight size={17} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center justify-center gap-2 border border-electric/60 px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all hover:border-ice hover:bg-electric/15 hover:shadow-[0_0_28px_rgba(46,125,255,0.35)]"
            >
              View My Work
              <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
            <p className="font-mono text-xs tracking-[0.35em] text-gold">{CONTACT.brand}</p>
            <p className="font-mono flex items-center gap-1.5 text-xs tracking-widest text-mist">
              <MapPin size={13} className="text-electric" aria-hidden="true" />
              {CONTACT.location.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="relative" aria-label="Code editor preview">
          <div className="absolute -inset-6 hidden bg-[radial-gradient(closest-side,rgba(46,125,255,0.18),transparent)] blur-2xl lg:block" aria-hidden="true" />
          <div className="relative border border-electric/30 bg-[#040C22]/95 shadow-[0_0_60px_rgba(46,125,255,0.15)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-line bg-midnight/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-gold" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
              <span className="font-mono ml-3 hidden flex-1 truncate border border-line bg-ink px-3 py-1 text-[11px] text-mist sm:block">
                danieladeb.dev {'\u2014'} portfolio.tsx
              </span>
              <span className="font-mono ml-auto text-[10px] tracking-widest text-electric uppercase sm:ml-3">
                TSX
              </span>
            </div>
            <div className="flex border-b border-line text-[11px]">
              <span className="font-mono border-t-2 border-gold bg-panel px-4 py-2 text-white">
                portfolio.tsx
              </span>
              <span className="font-mono hidden px-4 py-2 text-mist/50 sm:block">services.tsx</span>
              <span className="font-mono hidden px-4 py-2 text-mist/50 md:block">contact.tsx</span>
            </div>
            <div className="min-h-[290px] p-4 sm:min-h-[310px] sm:p-5">
              <TypedCode />
            </div>
            <div className="font-mono flex items-center justify-between border-t border-line bg-midnight/80 px-4 py-2 text-[10px] tracking-wider text-mist/80">
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">{'\u2713'} No errors</span>
                <span className="hidden sm:inline">UTF-8</span>
              </span>
              <span>TypeScript React</span>
            </div>
          </div>

          <div className="float absolute -top-5 -right-2 hidden items-center gap-2 border border-electric/50 bg-midnight/95 px-3 py-2 shadow-[0_0_24px_rgba(46,125,255,0.3)] sm:flex" aria-hidden="true">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="" className="h-5 w-5" loading="lazy" />
            <span className="font-mono text-[11px] font-bold text-white">React</span>
          </div>
          <div className="float-slow absolute top-1/2 -left-3 hidden items-center gap-2 border border-gold/50 bg-midnight/95 px-3 py-2 shadow-[0_0_24px_rgba(255,196,46,0.25)] sm:flex" aria-hidden="true">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="" className="h-5 w-5" loading="lazy" />
            <span className="font-mono text-[11px] font-bold text-white">TypeScript</span>
          </div>
          <div className="float absolute -right-2 -bottom-5 hidden items-center gap-2 border border-ice/50 bg-midnight/95 px-3 py-2 shadow-[0_0_24px_rgba(58,224,255,0.3)] sm:flex" style={{ animationDelay: '1.2s' }} aria-hidden="true">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="" className="h-5 w-5" loading="lazy" />
            <span className="font-mono text-[11px] font-bold text-white">Tailwind</span>
          </div>
        </div>
      </div>

      <div className="relative hidden justify-center pb-8 lg:flex" aria-hidden="true">
        <button
          onClick={() => scrollToSection('about')}
          className="font-mono flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] text-mist/70 uppercase transition-colors hover:text-gold"
          tabIndex={-1}
        >
          Scroll
          <ChevronDown size={16} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
