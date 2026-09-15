import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { CONTACT } from '../lib/data';

const PROJECT_TYPES = [
  'New Website',
  'Frontend Development',
  'Web Application',
  'Responsive Redesign',
  'Website Improvement',
  'Maintenance & Support',
  'Something Else',
];

const SERVICE_TO_TYPE: Record<string, string> = {
  'Website Development': 'New Website',
  'Frontend Development': 'Frontend Development',
  'Web Applications': 'Web Application',
  'Responsive Design': 'Responsive Redesign',
  'Website Improvements': 'Website Improvement',
  'Website Maintenance': 'Maintenance & Support',
};

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'failed'>('idle');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      const mapped = SERVICE_TO_TYPE[detail];
      if (mapped) setProjectType(mapped);
    };
    window.addEventListener('da:project-type', handler);
    return () => window.removeEventListener('da:project-type', handler);
  }, []);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email address.';
    if (message.trim().length < 10) next.message = 'Please describe your project (at least 10 characters).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          project_type: projectType,
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to send. Please try again.');
      setStatus('success');
    } catch (err) {
      setStatus('failed');
      setServerError(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setProjectType(PROJECT_TYPES[0]);
    setErrors({});
    setServerError('');
    setStatus('idle');
  };

  const inputClass = (invalid: boolean) =>
    `w-full border bg-ink px-4 py-3 text-sm text-white placeholder:text-mist/50 outline-none transition-colors focus:border-electric ${invalid ? 'border-red-500/70' : 'border-line'}`;

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-midnight/40" aria-label="Contact">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(640px 360px at 85% 20%, rgba(46,125,255,0.16), transparent 65%), radial-gradient(520px 340px at 10% 85%, rgba(255,196,46,0.08), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <span className="font-mono float pointer-events-none absolute top-16 right-[6%] hidden text-2xl text-gold/20 select-none lg:block" aria-hidden="true">{'{ }'}</span>
      <span className="font-mono float-slow pointer-events-none absolute bottom-20 left-[5%] hidden text-xl text-electric/20 select-none lg:block" aria-hidden="true">//</span>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title={<>Have An Idea? <span className="text-gold">Let&apos;s Build It</span>.</>}
          description="Whether you need a new website, a better interface, or improvements to an existing project, let's discuss what you're trying to create."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="space-y-4">
            <Reveal>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 border border-line bg-ink/70 p-5 transition-all hover:border-electric/60 hover:shadow-[0_0_24px_rgba(46,125,255,0.18)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-electric/40 bg-midnight text-electric transition-colors group-hover:border-gold group-hover:text-gold">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="font-mono block text-[11px] tracking-[0.25em] text-mist uppercase">Email</span>
                  <span className="block truncate text-[15px] font-semibold text-white">{CONTACT.email}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={80}>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-line bg-ink/70 p-5 transition-all hover:border-emerald-400/60 hover:shadow-[0_0_24px_rgba(52,211,153,0.18)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-emerald-400/40 bg-midnight text-emerald-300">
                  <MessageCircle size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="font-mono block text-[11px] tracking-[0.25em] text-mist uppercase">WhatsApp</span>
                  <span className="block text-[15px] font-semibold text-white">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={160}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-line bg-ink/70 p-5">
                  <MapPin size={18} className="shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="font-mono block text-[10px] tracking-[0.25em] text-mist uppercase">Location</span>
                    <span className="block text-sm font-semibold text-white">{CONTACT.location}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 border border-line bg-ink/70 p-5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                  </span>
                  <span>
                    <span className="font-mono block text-[10px] tracking-[0.25em] text-mist uppercase">Status</span>
                    <span className="block text-sm font-semibold text-white">Open to Work</span>
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${CONTACT.email}?subject=Project%20Inquiry%20for%20Daniel%20Adegbuyi`}
                  className="btn-cut inline-flex flex-1 items-center justify-center gap-2 bg-gold px-6 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-all hover:bg-white hover:shadow-[0_0_28px_rgba(255,196,46,0.35)]"
                >
                  <Mail size={16} strokeWidth={2.5} aria-hidden="true" /> Email Me
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-emerald-400/60 px-6 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all hover:bg-emerald-400/15"
                >
                  <MessageCircle size={16} strokeWidth={2.5} aria-hidden="true" /> WhatsApp Chat
                </a>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <p className="font-mono border border-dashed border-line px-4 py-3 text-center text-xs leading-relaxed text-mist/80">
                Prefer the form? Send the details — I&apos;ll get back to you to discuss next steps.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="relative border border-electric/30 bg-ink/80 p-6 sm:p-8">
              <span className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-gold" aria-hidden="true" />
              <span className="absolute -right-px -bottom-px h-6 w-6 border-r-2 border-b-2 border-gold" aria-hidden="true" />
              {status === 'success' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center border border-emerald-400/50 bg-emerald-400/10">
                    <CheckCircle2 size={30} className="text-emerald-300" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-bold text-white">Message received.</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                    Thanks for reaching out, {name.split(' ')[0] || 'there'}. I&apos;ll review your
                    project details and get back to you soon.
                  </p>
                  <button
                    onClick={reset}
                    className="font-mono mt-8 border border-line px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-gold hover:text-gold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">
                    {'//'} Start a project
                  </p>
                  <h3 className="font-display mt-2 text-xl font-bold text-white">Tell me about your project</h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="font-mono mb-2 block text-[11px] tracking-[0.2em] text-mist uppercase">
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className={inputClass(!!errors.name)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-300" role="alert">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="font-mono mb-2 block text-[11px] tracking-[0.2em] text-mist uppercase">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputClass(!!errors.email)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-red-300" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="contact-type" className="font-mono mb-2 block text-[11px] tracking-[0.2em] text-mist uppercase">
                      Project Type
                    </label>
                    <select
                      id="contact-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full cursor-pointer appearance-none border border-line bg-ink px-4 py-3 text-sm text-white outline-none transition-colors focus:border-electric"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-midnight">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="contact-message" className="font-mono mb-2 block text-[11px] tracking-[0.2em] text-mist uppercase">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are you trying to create? Share your goals, timeline, and any links or references."
                      rows={5}
                      className={`${inputClass(!!errors.message)} resize-y`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-300" role="alert">{errors.message}</p>
                    )}
                  </div>
                  {status === 'failed' && serverError && (
                    <p className="mt-5 flex items-start gap-2 border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-200" role="alert">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                      {serverError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-cut mt-6 inline-flex w-full items-center justify-center gap-2 bg-gold px-7 py-4 text-sm font-bold tracking-wide text-ink uppercase transition-all hover:bg-white hover:shadow-[0_0_32px_rgba(255,196,46,0.4)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-gold disabled:hover:shadow-none"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={17} className="animate-spin" strokeWidth={2.5} aria-hidden="true" />
                        Sending{'\u2026'}
                      </>
                    ) : (
                      <>
                        <Send size={16} strokeWidth={2.5} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
