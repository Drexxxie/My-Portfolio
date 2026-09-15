import { Check, Code2, Gauge, MousePointerClick, Smartphone } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { scrollToSection } from '../lib/data';

const HIGHLIGHTS = [
  'Frontend Development',
  'Responsive Web Design',
  'Modern User Interfaces',
  'Web Application Development',
  'Problem Solving',
  'Clean, Maintainable Code',
  'Continuous Learning',
  'User Experience',
];

const VALUE_CARDS = [
  {
    icon: Gauge,
    title: 'Performance',
    text: 'Fast-loading pages and smooth interactions, optimized to keep visitors engaged.',
  },
  {
    icon: MousePointerClick,
    title: 'Usability',
    text: 'Clear layouts and intuitive flows that make every visit effortless.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    text: 'Organized, readable code that is easy to maintain, update, and scale.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    text: 'Pixel-considered layouts that adapt beautifully to every screen size.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line bg-midnight/40" aria-label="About">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={<>More Than Code.<br />I Build <span className="text-gold">Solutions</span>.</>}
          description="I am a web developer focused on creating modern websites and web applications that combine clean design, responsive layouts, and practical functionality."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <div className="relative">
              <div
                className="absolute -inset-4 bg-[radial-gradient(closest-side,rgba(255,196,46,0.10),transparent)] blur-xl"
                aria-hidden="true"
              />
              <div className="relative border border-electric/30 bg-ink p-2">
                <span className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-gold" aria-hidden="true" />
                <span className="absolute -top-px -right-px h-6 w-6 border-t-2 border-r-2 border-gold" aria-hidden="true" />
                <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-gold" aria-hidden="true" />
                <span className="absolute -right-px -bottom-px h-6 w-6 border-r-2 border-b-2 border-gold" aria-hidden="true" />
                <div className="bg-grid relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden bg-panel sm:aspect-square lg:aspect-[4/5]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(320px 220px at 50% 30%, rgba(46,125,255,0.25), transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-7xl font-bold tracking-tight text-white sm:text-8xl" aria-hidden="true">
                    DA<span className="text-gold">.</span>
                  </span>
                  <span className="font-mono mt-4 text-[11px] tracking-[0.3em] text-electric uppercase">
                    {'</>'} Web Developer
                  </span>
                  <span className="font-mono mt-6 border border-dashed border-line px-4 py-2 text-center text-[11px] leading-relaxed text-mist/80">
                    Professional photo
                    <br />
                    placeholder {'\u2014'} update anytime
                  </span>
                  <span className="font-mono absolute bottom-4 left-4 text-[10px] text-white/25" aria-hidden="true">fig. 01</span>
                  <span className="font-mono absolute right-4 bottom-4 text-[10px] text-white/25" aria-hidden="true">{'{ dev }'}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <p className="leading-relaxed text-mist">
                My approach is simple:{' '}
                <span className="font-semibold text-white">clean code, great design, real results</span>.
                Every project starts with understanding your goals {'\u2014'} then I design and build a
                website or web application that is fast, responsive, and easy to use.
              </p>
              <p className="mt-4 leading-relaxed text-mist">
                Whether you are launching something new or improving what already exists, I focus on
                practical solutions that look professional and work reliably across devices.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Focus areas">
                {HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border border-line bg-ink/60 px-4 py-3 text-sm text-white/90 transition-colors hover:border-electric/60"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-gold/15">
                      <Check size={13} strokeWidth={3} className="text-gold" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240}>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-mono mt-8 inline-flex items-center gap-2 text-sm text-electric transition-colors hover:text-gold"
              >
                <span className="text-gold">{'\u2192'}</span> Let&apos;s discuss what you&apos;re trying to create
              </button>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="group h-full border border-line bg-ink/70 p-6 transition-all hover:-translate-y-1 hover:border-electric/60 hover:shadow-[0_0_30px_rgba(46,125,255,0.18)]">
                <span className="inline-flex h-11 w-11 items-center justify-center border border-electric/40 bg-midnight text-electric transition-colors group-hover:border-gold group-hover:text-gold">
                  <card.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-display mt-4 text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
