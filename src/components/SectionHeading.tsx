import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'text-center' : ''}>
      <p
        className={`font-mono text-xs tracking-[0.3em] text-gold uppercase sm:text-sm ${
          centered ? '' : 'flex items-center gap-3'
        }`}
      >
        {centered ? (
          <>
            <span className="text-electric">//</span> {index} {'\u2014'} {eyebrow}
          </>
        ) : (
          <>
            <span className="text-electric">//</span> {index} {'\u2014'} {eyebrow}
            <span className="h-px w-16 bg-electric/60 sm:w-24" aria-hidden="true" />
          </>
        )}
      </p>
      <h2 className="font-display mt-4 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl leading-relaxed text-mist ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
