import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, FileText, FolderGit2, Github, Plus } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { fetchList, scrollToSection, type Project } from '../lib/data';
import { projects as fallbackProjects } from '../data/projects';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'websites', label: 'Websites' },
  { id: 'web-apps', label: 'Web Apps' },
  { id: 'ui', label: 'UI Projects' },
  { id: 'experiments', label: 'Experiments' },
];

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes('live')) return 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300';
  if (s.includes('development') || s.includes('progress')) return 'border-gold/60 bg-gold/10 text-gold';
  return 'border-line bg-ink/80 text-mist';
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;
    fetchList<Project>('/api/projects')
      .then((data) => {
        if (!cancelled) setProjects(Array.isArray(data) && data.length > 0 ? data : fallbackProjects);
      })
      .catch(() => {
        // API unavailable (e.g. local terminal run without serverless runtime)
        // — fall back to bundled local data so the section still renders.
        if (!cancelled) setProjects(fallbackProjects);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const f of FILTERS) {
      if (f.id !== 'all') map[f.id] = projects.filter((p) => p.category === f.id).length;
    }
    return map;
  }, [projects]);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <section id="projects" className="relative scroll-mt-20 border-t border-line" aria-label="Projects">
      <span className="font-mono pointer-events-none absolute top-10 right-[5%] hidden text-xl text-electric/20 select-none lg:block" aria-hidden="true">02</span>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title={<>Selected <span className="text-gold">Projects</span></>}
          description="A growing collection of personal builds and experiments. More projects are on the way — this section updates as new work ships."
        />

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`font-mono border px-4 py-2 text-xs tracking-wider uppercase transition-all ${
                  filter === f.id
                    ? 'border-gold bg-gold font-bold text-ink'
                    : 'border-line text-mist hover:border-electric/70 hover:text-white'
                }`}
              >
                {f.label}
                <span className={`ml-2 ${filter === f.id ? 'text-ink/70' : 'text-electric/70'}`}>
                  {counts[f.id] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2" aria-label="Loading projects">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="skeleton h-96 border border-line" />
            ))}
          </div>
        )}

        {!loading && visible.length === 0 && (
          <p className="mt-10 border border-dashed border-line px-5 py-10 text-center text-sm text-mist">
            No projects in this category yet — check back soon.
          </p>
        )}

        {!loading && visible.length > 0 && (
          <div key={filter} className="project-grid mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((project) =>
              project.placeholder ? (
                <article
                  key={project.id}
                  className="flex min-h-[380px] flex-col items-center justify-center border border-dashed border-electric/40 bg-midnight/30 px-8 py-12 text-center transition-colors hover:border-gold/60"
                >
                  <span className="flex h-14 w-14 items-center justify-center border border-dashed border-gold/50 text-gold">
                    <Plus size={24} aria-hidden="true" />
                  </span>
                  <p className="font-mono mt-5 text-[11px] tracking-[0.25em] text-electric uppercase">
                    {project.category_label}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">{project.description}</p>
                  <span className={`font-mono mt-5 border px-3 py-1.5 text-[11px] tracking-widest uppercase ${statusStyle(project.status)}`}>
                    {project.status}
                  </span>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="font-mono mt-6 text-[13px] font-bold text-gold uppercase transition-colors hover:text-white"
                  >
                    {'\u2192'} Start your project
                  </button>
                </article>
              ) : (
                <article
                  key={project.id}
                  className="group flex flex-col border border-line bg-panel/40 transition-all hover:-translate-y-1 hover:border-electric/60 hover:shadow-[0_0_40px_rgba(46,125,255,0.16)]"
                >
                  <div className="relative overflow-hidden border-b border-line bg-ink">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="bg-grid flex aspect-video w-full items-center justify-center">
                        <FolderGit2 size={40} className="text-electric/40" aria-hidden="true" />
                      </div>
                    )}
                    <span className={`font-mono absolute top-4 left-4 border px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase backdrop-blur ${statusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="font-mono text-[11px] tracking-[0.22em] text-electric uppercase">
                      {project.category_label}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{project.description}</p>
                    {(project.technologies ?? []).length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {(project.technologies ?? []).map((tech) => (
                          <span key={tech} className="font-mono border border-line bg-ink px-2.5 py-1 text-[11px] text-white/75">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex flex-wrap gap-2.5 border-t border-line pt-5">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gold px-4 py-2 text-xs font-bold tracking-wide text-ink uppercase transition-colors hover:bg-white"
                        >
                          <ExternalLink size={14} strokeWidth={2.5} aria-hidden="true" /> Live Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-line px-4 py-2 text-xs font-bold tracking-wide text-white uppercase transition-colors hover:border-electric hover:bg-electric/15"
                        >
                          <Github size={14} aria-hidden="true" /> GitHub
                        </a>
                      )}
                      {project.case_study_url && (
                        <a
                          href={project.case_study_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-line px-4 py-2 text-xs font-bold tracking-wide text-white uppercase transition-colors hover:border-electric hover:bg-electric/15"
                        >
                          <FileText size={14} aria-hidden="true" /> Case Study
                        </a>
                      )}
                      {!project.live_url && !project.github_url && !project.case_study_url && (
                        <span className="font-mono text-xs text-mist/70">
                          Links coming soon — project in active development.
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
