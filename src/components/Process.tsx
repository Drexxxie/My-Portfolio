import { ClipboardList, Compass, Hammer, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const STEPS = [
  {
    number: '01',
    icon: Compass,
    title: 'Discover',
    text: 'We talk through your idea, your goals, and what success looks like — so every decision serves a purpose.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Plan',
    text: 'I map out the structure, pages, and features before writing code — keeping the scope clear and focused.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build',
    text: 'Clean, responsive development with regular updates, so you always know how things are progressing.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Refine',
    text: 'We review, test across devices, and polish the details until everything works smoothly.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative scroll-mt-20 border-t border-line bg-midnight/40" aria-label="Process">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="05"
          eyebrow="Process"
          title={<>How We&apos;ll <span className="text-gold">Work Together</span></>}
          description="A simple, transparent process that keeps your project organized — from first conversation to final polish."
        />

        <div className="relative mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <span
            className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="group relative h-full border border-line bg-ink/70 p-7 transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(255,196,46,0.12)]">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-electric/40 bg-midnight text-electric transition-colors group-hover:border-gold group-hover:text-gold">
                    <step.icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-display text-5xl font-bold text-white/10 transition-colors group-hover:text-gold/25" aria-hidden="true">
                    {step.number}
                  </span>
                </div>
                <p className="font-mono mt-6 text-[11px] tracking-[0.3em] text-gold uppercase">
                  Step {step.number}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
