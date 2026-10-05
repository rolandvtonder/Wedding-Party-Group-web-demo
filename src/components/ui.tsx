import type {AnchorHTMLAttributes, ReactNode, SVGProps} from 'react';
import {linkClick} from '../lib/router';

/* ------------------------------------------------------------------ */
/* Icons — one stroke family (1.5px, round caps), drawn on a 24 grid.  */
/* ------------------------------------------------------------------ */

type IconProps = SVGProps<SVGSVGElement>;
const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const Icon = {
  WhatsApp: (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  ),
  Phone: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  Mail: (p: IconProps) => (
    <svg {...base(p)}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  ),
  Pin: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  Clock: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Instagram: (p: IconProps) => (
    <svg {...base(p)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  Facebook: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
    </svg>
  ),
  Arrow: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  ),
  Plus: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Check: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  Close: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Chevron: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Search: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  ),
  Star: (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8L12 3Z" />
    </svg>
  ),
};

/** Two interlocking rings — the site's ornament. */
export function Rings({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 60 36" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="22" cy="18" r="13" />
      <circle cx="38" cy="18" r="13" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Links & buttons                                                     */
/* ------------------------------------------------------------------ */

type AProps = AnchorHTMLAttributes<HTMLAnchorElement> & {href: string; onNavigate?: () => void};

/** An in-site link that routes without a reload (external links behave normally). */
export function A({onNavigate, onClick, ...props}: AProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) linkClick(e, onNavigate);
      }}
    />
  );
}

const btnBase =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[2px] px-6 py-3 text-label font-normal uppercase transition-[background-color,color,box-shadow] duration-300 active:scale-[0.98]';

export const btn = {
  gold: `${btnBase} bg-gold text-ink hover:bg-gold-2`,
  ivory: `${btnBase} bg-ivory text-ink hover:bg-gold-2`,
  ghost: `${btnBase} text-ivory ring-1 ring-ivory/35 ring-inset hover:bg-ivory hover:text-ink`,
};

export function Eyebrow({children, className = ''}: {children: ReactNode; className?: string}) {
  return <p className={`flex items-center gap-3 text-label text-gold uppercase ${className}`}>
    <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
    {children}
  </p>;
}

export function Crest({className = ''}: {className?: string}) {
  return <img src="/media/brand/crest.webp" alt="" aria-hidden="true" width={496} height={591} className={className} decoding="async" />;
}

export function Seal({className = ''}: {className?: string}) {
  return <img src="/media/brand/seal.webp" alt="" aria-hidden="true" width={192} height={192} className={className} decoding="async" />;
}
