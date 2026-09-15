import { Code2, Crosshair, Layers, MessagesSquare, Smartphone, TrendingUp } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const REASONS = [
  {
    icon: Smartphone,
    title: 'Responsive by Default',
    text: 'Every layout is built mobile-first and checked across screen sizes — no broken sections, anywhere.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    text: 'Readable, organized code that is easy to maintain, update, and hand over.',
  },
  {
    icon: Layers,
    title: 'Modern Approach',
    text: 'Current tools and practices — React, TypeScript, and component-driven development.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear Communication',
    text: 'Straightforward updates and honest timelines — you always know where things stand.',
  },
  {
    icon: Crosshair,
    title: 'Attention to Detail',
    text: 'Spacing, alignment, and polish checked carefully until everything feels right.',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Minded',
    text: 'Solutions built to evolve with you — easy to extend as your goals grow.',
  },
];

export default function WhyMe() {
  return (
    <section className="relative border-t border-line" aria-label="Why work with me">
      <span className="font-mono pointer-events-none absolute bottom-12 left-[4%] hidden text-xl text-electric/20 select-none lg:block" aria-hidden="true">{'<>'}</span>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="06"
          eyebrow="Why Me"
          align="center"
          title={<>Built With Purpose.<br />Delivered With <span className="text-gold">Care</span>.</>}
          description="Clean code. Great design. Real results — the standard behind everything I ship."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 3) * 90}>
              <div className="group flex h-full gap-5 border border-line bg-panel/40 p-6 transition-all hover:border-electric/60 hover:bg-panel/60">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-ink text-gold transition-shadow group-hover:shadow-[0_0_20px_rgba(255,196,46,0.25)]">
                  <reason.icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <h3 className="font-display block text-lg font-bold text-white">{reason.title}</h3>
                  <p className="mt-2 block text-sm leading-relaxed text-mist">{reason.text}</p>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
