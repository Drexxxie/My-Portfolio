import { useEffect, useState } from 'react';
import {
  AppWindow,
  ArrowRight,
  ChevronRight,
  Code2,
  Globe,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { fetchList, scrollToSection, type Service } from '../lib/data';
import { services as fallbackServices } from '../data/services';

const ICONS: Record<string, LucideIcon> = {
  Globe,
  Code2,
  AppWindow,
  Smartphone,
  Wrench,
  ShieldCheck,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchList<Service>('/api/services')
      .then((data) => {
        if (!cancelled) setServices(Array.isArray(data) && data.length > 0 ? data : fallbackServices);
      })
      .catch(() => {
        // API unavailable (e.g. local terminal run without serverless runtime)
        // — fall back to bundled local data so the section still renders.
        if (!cancelled) setServices(fallbackServices);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const discuss = (title: string) => {
    window.dispatchEvent(new CustomEvent('da:project-type', { detail: title }));
    scrollToSection('contact');
  };

  return (
    <section id="services" className="relative scroll-mt-20 border-t border-line" aria-label="Services">
      <span className="font-mono pointer-events-none absolute top-10 right-[6%] hidden text-2xl text-electric/20 select-none lg:block" aria-hidden="true">{'{ }'}</span>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title={<>What I Can <span className="text-gold">Build</span> For You</>}
          description="Practical services for businesses, startups, entrepreneurs, and individuals — from brand-new websites to improvements on what you already have."
        />

        {loading && (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading services">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="skeleton h-72 border border-line" />
            ))}
          </div>
        )}

        {!loading && (services.length === 0 ? (
          <p className="mt-12 border border-dashed border-line px-5 py-10 text-center text-sm text-mist">
            Services are being updated — please check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon] ?? Code2;
              return (
                <Reveal key={service.id} delay={(i % 3) * 90}>
                  <article className="group relative flex h-full flex-col border border-line bg-panel/40 p-7 transition-all hover:-translate-y-1.5 hover:border-electric/60 hover:shadow-[0_0_36px_rgba(46,125,255,0.18)]">
                    <span
                      className="absolute top-0 left-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full"
                      aria-hidden="true"
                    />
                    <span className="font-mono absolute top-5 right-6 text-xs text-white/20" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center border border-electric/40 bg-ink text-electric transition-all group-hover:border-gold group-hover:text-gold group-hover:shadow-[0_0_20px_rgba(255,196,46,0.25)]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="font-display mt-5 text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{service.description}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {(service.features ?? []).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[13px] text-white/80">
                          <ChevronRight size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => discuss(service.title)}
                      className="font-mono mt-6 inline-flex items-center gap-2 pt-1 text-[13px] font-bold tracking-wide text-electric uppercase transition-colors group-hover:text-gold"
                    >
                      Discuss Your Project
                      <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
