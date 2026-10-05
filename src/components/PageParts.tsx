import {useEffect, useRef, type ReactNode} from 'react';
import {categories, planPath, waLink} from '../content';
import {useReveals} from '../hooks/useReveals';
import {easeOutCubic, lerp, range} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {A, Eyebrow, Icon, btn} from './ui';

/**
 * The opening of every inner page: the title on one side, a photograph in an
 * arch on the other. As the page scrolls the photo sinks slower than the text
 * and the arch's gold outline eases outward.
 */
export function PageHero({eyebrow, title, lead, image, alt, children}: {eyebrow: string; title: ReactNode; lead: string; image: string; alt: string; children?: ReactNode}) {
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = -1;
    return onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0) return;
      const p = range(-rect.top, 0, rect.height);
      if (Math.abs(p - last) < 0.0001) return;
      last = p;
      imgRef.current!.style.transform = `translate3d(0, ${p * 12}%, 0) scale(${lerp(1.12, 1.2, p)})`;
      frameRef.current!.style.transform = `scale(${1 + easeOutCubic(p) * 0.06})`;
      frameRef.current!.style.opacity = String(1 - p * 1.4);
      textRef.current!.style.transform = `translate3d(0, ${p * -6}vh, 0)`;
    });
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink px-4 pt-32 pb-20 sm:px-6 md:px-[6vw] md:pt-40 md:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_40%,rgb(200_167_106/0.12),transparent_70%)]" />
      <div className="relative grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div ref={textRef}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 tabIndex={-1} className="mt-6 font-display text-[clamp(2.5rem,6vw,5.75rem)] leading-[1] text-ivory">
            {title}
          </h1>
          <p className="mt-7 max-w-[36rem] text-lead text-linen">{lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <A href={planPath} className={btn.gold}>
              Start planning
            </A>
            <a href={waLink()} target="_blank" rel="noopener" className={btn.ghost}>
              <Icon.WhatsApp className="size-4" /> WhatsApp us
            </a>
          </div>
          {children}
        </div>
        <div className="relative mx-auto w-full max-w-[26rem] md:max-w-none">
          <div ref={frameRef} aria-hidden="true" className="arch absolute -inset-3 border border-gold/60 md:-inset-4" />
          <div className="arch relative aspect-[3/4] overflow-hidden bg-ink-3">
            <img ref={imgRef} src={image} alt={alt} decoding="async" fetchPriority="high" className="size-full object-cover will-change-transform" style={{transform: 'scale(1.12)'}} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Offers({heading, items}: {heading: string; items: {title: string; body: string}[]}) {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-label={heading} className="bg-ink-2 px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <h2 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] text-ivory" data-reveal>
        {heading}
      </h2>
      <ol className="mt-12 grid gap-px overflow-hidden bg-gold/15 ring-1 ring-gold/15 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((o, i) => (
          <li key={o.title} data-reveal style={{transitionDelay: `${(i % 3) * 90}ms`}} className="bg-ink-2 p-7 md:p-9">
            <span className="text-label text-gold">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-6 font-display text-[1.625rem] leading-tight text-ivory">{o.title}</h3>
            <p className="mt-2 text-body text-linen">{o.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Tags({heading, items}: {heading: string; items: string[]}) {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-label={heading} className="bg-ink px-4 py-20 sm:px-6 md:px-[6vw] md:py-24">
      <p className="text-label text-gold uppercase" data-reveal>
        {heading}
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3" data-reveal>
        {items.map((t, i) => (
          <li key={t} className="flex items-center gap-6 font-display text-[clamp(1.25rem,2vw,1.75rem)] text-linen italic">
            {t}
            {i < items.length - 1 && <span aria-hidden="true" className="size-1 rotate-45 bg-gold/60" />}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The closing invitation on every page, and links across to the other departments. */
export function CtaBand({except}: {except?: string}) {
  const ref = useReveals<HTMLElement>();
  const others = categories.filter((c) => c.slug !== except);
  return (
    <section ref={ref} aria-label="Start planning" className="relative overflow-hidden bg-ink px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <div className="relative mx-auto max-w-[52rem] text-center" data-reveal>
        <p className="font-script text-[2.75rem] leading-none text-gold md:text-[3.5rem]">Let’s begin</p>
        <h2 className="mt-4 font-display text-display text-ivory">Everything your event needs, under one roof.</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <A href={planPath} className={btn.gold}>
            Start planning
          </A>
          <a href={waLink()} target="_blank" rel="noopener" className={btn.ghost}>
            <Icon.WhatsApp className="size-4" /> WhatsApp us
          </a>
        </div>
      </div>
      <nav aria-label="Other services" className="mt-20 border-t border-ivory/10 pt-8 md:mt-28">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {others.map((c) => (
            <li key={c.slug}>
              <A href={c.path} className="group flex min-h-11 items-center gap-2 text-label text-stone uppercase transition-colors hover:text-ivory">
                {c.title}
                <Icon.Arrow className="size-3.5 -translate-x-1 text-gold opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </A>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
