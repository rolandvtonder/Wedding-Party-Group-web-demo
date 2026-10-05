import {useEffect, useRef} from 'react';
import {heritage} from '../content';
import {useReveals} from '../hooks/useReveals';
import {easeOutCubic, passProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Crest, Eyebrow} from './ui';

/**
 * Established in 2000. A ruler of the years from 2000 to today inks itself in
 * gold as the section passes, and the 26+ counts up with it. Only figures the
 * business publishes itself — no invented tallies.
 */

const YEARS = 27; // 2000 … 2026 inclusive

export function Heritage() {
  const ref = useReveals<HTMLElement>();
  const rulerRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastP = -1;
    return onFrame(() => {
      const root = ref.current;
      if (!root) return;
      const {p, rect, vh} = passProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.0001) return;
      lastP = p;
      const k = easeOutCubic(range(p, 0.18, 0.55));
      rulerRef.current!.style.transform = `scaleX(${k})`;
      countRef.current!.textContent = String(Math.round(k * 26));
      crestRef.current!.style.transform = `translate3d(0, ${(0.5 - p) * 18}vh, 0) rotate(${(p - 0.5) * 8}deg)`;
    });
  }, [ref]);

  return (
    <section ref={ref} id="about" aria-labelledby="heritage-title" className="relative overflow-hidden bg-ink-2 px-4 py-28 sm:px-6 md:px-[6vw] md:py-40">
      {/* The crest, very faint, drifting behind. */}
      <div ref={crestRef} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-[-12vw] w-[min(70vw,46rem)] -translate-y-1/2 opacity-[0.06] will-change-transform">
        <Crest className="w-full" />
      </div>

      <div className="relative grid gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div data-reveal>
          <Eyebrow>{heritage.eyebrow}</Eyebrow>
          <h2 id="heritage-title" className="mt-5 font-display text-display text-ivory">
            More than <em className="text-gold-2">26 years</em> of experience.
          </h2>
        </div>
        <ul className="space-y-1 self-end font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug text-linen" data-reveal style={{transitionDelay: '120ms'}}>
          {heritage.lines.map((l, i) => (
            <li key={l} className={i === 2 ? 'text-ivory italic' : ''}>
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* The ruler: one tick a year. */}
      <div className="relative mt-20 md:mt-28" aria-hidden="true">
        <div className="flex justify-between">
          {Array.from({length: YEARS}, (_, i) => (
            <span key={i} className={`w-px ${i % 5 === 0 || i === YEARS - 1 ? 'h-4 bg-gold/60' : 'h-2 bg-ivory/20'}`} />
          ))}
        </div>
        <span className="relative mt-2 block h-px bg-ivory/10">
          <span ref={rulerRef} className="absolute inset-0 origin-left bg-gradient-to-r from-gold/40 via-gold to-gold-2" style={{transform: 'scaleX(0)'}} />
        </span>
        <div className="mt-3 flex justify-between text-label text-stone tabular-nums">
          <span>2000</span>
          <span className="max-sm:hidden">2005</span>
          <span className="max-sm:hidden">2010</span>
          <span className="max-sm:hidden">2015</span>
          <span className="max-sm:hidden">2020</span>
          <span className="text-gold-2">Today</span>
        </div>
      </div>

      <dl className="relative mt-16 grid grid-cols-2 gap-px overflow-hidden bg-gold/15 ring-1 ring-gold/15 md:mt-20 md:grid-cols-4">
        {heritage.stats.map((s, i) => (
          <div key={s.label} className="flex flex-col-reverse justify-end gap-3 bg-ink-2 px-5 py-8 md:px-8 md:py-12" data-reveal style={{transitionDelay: `${i * 90}ms`}}>
            <dt className="text-label text-stone uppercase">{s.label}</dt>
            <dd className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none text-ivory">
              {s.count ? (
                <>
                  <span ref={countRef} className="tabular-nums">
                    {s.count}
                  </span>
                  <span className="text-gold">{s.suffix}</span>
                </>
              ) : i > 1 ? (
                <span className="text-[0.62em] italic">{s.value}</span>
              ) : (
                s.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
