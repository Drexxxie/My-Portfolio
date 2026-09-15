import { useEffect, useMemo, useState } from 'react';
import { Code2, Database, GitBranch, Palette, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { fetchList, type SkillCard, type Technology } from '../lib/data';
import { skillCards as fallbackSkillCards, technologies as fallbackTechnologies } from '../data/skills';

const ICONS: Record<string, LucideIcon> = { Code2, Palette, Database, GitBranch };
const CATEGORY_ORDER = ['core', 'frontend', 'backend', 'data', 'tools'];

export default function TechStack() {
  const [techs, setTechs] = useState<Technology[]>([]);
  const [cards, setCards] = useState<SkillCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchList<Technology>('/api/technologies'), fetchList<SkillCard>('/api/skill-cards')])
      .then(([t, c]) => {
        if (cancelled) return;
        setTechs(Array.isArray(t) && t.length > 0 ? t : fallbackTechnologies);
        setCards(Array.isArray(c) && c.length > 0 ? c : fallbackSkillCards);
      })
      .catch(() => {
        // API unavailable (e.g. local terminal run without serverless runtime)
        // — fall back to bundled local data so the section still renders.
        if (cancelled) return;
        setTechs(fallbackTechnologies);
        setCards(fallbackSkillCards);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const groups = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      key: cat,
      label: techs.find((t) => t.category === cat)?.category_label ?? cat,
      items: techs.filter((t) => t.category === cat),
    })).filter((g) => g.items.length > 0);
  }, [techs]);

  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-line bg-midnight/40" aria-label="Skills and tech stack">
      <span className="font-mono pointer-events-none absolute top-12 left-[5%] hidden text-xl text-gold/20 select-none lg:block" aria-hidden="true">{'</>'}</span>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="03"
          eyebrow="Skills & Stack"
          title={<>Technologies I <span className="text-gold">Work With</span></>}
          description="My current tech stack — the tools I use to design, build, and ship modern websites and web applications. Always learning, always improving."
        />

        {loading && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" aria-label="Loading tech stack">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} className="skeleton h-32 border border-line" />
            ))}
          </div>
        )}

        {!loading && (techs.length === 0 ? (
          <p className="mt-12 border border-dashed border-line px-5 py-10 text-center text-sm text-mist">
            The tech stack is being updated — please check back soon.
          </p>
        ) : (
          <>
            <div className="mt-12 space-y-10">
              {groups.map((group, gi) => (
                <Reveal key={group.key} delay={gi * 60}>
                  <div className="flex items-center gap-4">
                    <h3 className="font-mono text-xs tracking-[0.25em] whitespace-nowrap text-white uppercase sm:text-sm">
                      {group.label}
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-electric/60 to-transparent" aria-hidden="true" />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {group.items.map((tech) => (
                      <div
                        key={tech.id}
                        className="group flex flex-col items-center gap-3 border border-line bg-ink/70 px-4 py-6 transition-all hover:-translate-y-1 hover:border-electric/70 hover:shadow-[0_0_28px_rgba(46,125,255,0.22)]"
                      >
                        <img
                          src={tech.logo_url}
                          alt={`${tech.name} logo`}
                          loading="lazy"
                          className={`h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-110 ${tech.icon_invert ? 'invert' : ''}`}
                        />
                        <span className="text-sm font-semibold text-white">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card, i) => {
                const Icon = ICONS[card.icon] ?? Code2;
                return (
                  <Reveal key={card.id} delay={i * 90}>
                    <article className="h-full border border-line bg-ink/70 p-6 transition-colors hover:border-gold/60">
                      <span className="inline-flex h-11 w-11 items-center justify-center bg-gold/10 text-gold">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h3 className="font-display mt-4 text-lg font-bold text-white">{card.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-mist">{card.description}</p>
                      <ul className="font-mono mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-white/70">
                        {(card.points ?? []).map((point) => (
                          <li key={point} className="flex items-center gap-2">
                            <span className="h-1 w-1 shrink-0 bg-electric" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
