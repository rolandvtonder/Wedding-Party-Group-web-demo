import {useEffect, useRef} from 'react';
import {categories, roof} from '../content';
import {clamp, pinProgress, range} from '../lib/math';
import {onFrame, scrollToY} from '../lib/scroll';
import {A, Eyebrow, Icon} from './ui';

/**
 * Everything under one roof, as a reel. The section pins and the eight
 * departments slide sideways with the scroll; the card nearest the focus line
 * is in focus, the rest dim back, and each photograph drifts against its
 * frame. Every card opens its own page.
 */

const SECTION_VH = 460;
const WINDOW = [0.04, 0.96] as const;

export function Roof() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastP = -1;
    return onFrame(() => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const {p, rect, vh} = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const vw = window.innerWidth;
      const k = range(p, ...WINDOW);
      // offsetLeft is the untransformed layout position, so this is stable
      // while the track itself is being translated.
      const travel = Math.max(0, track.offsetLeft + track.scrollWidth - vw * 0.94);
      track.style.transform = `translate3d(${-k * travel}px, 0, 0)`;

      const focus = vw >= 768 ? 0.6 : 0.5; // right of centre beside the intro column
      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const off = (r.left + r.width / 2 - vw * focus) / vw;
        const a = clamp(Math.abs(off) * 1.6);
        card.style.opacity = String(1 - a * 0.5);
        card.style.transform = `scale(${1 - a * 0.06})`;
        imgRefs.current[i].style.transform = `translate3d(${off * -50}px, 0, 0) scale(1.15)`;
        if (Math.abs(off) < best) {
          best = Math.abs(off);
          nearest = i;
        }
      });
      barRef.current!.style.transform = `scaleX(${k})`;
      countRef.current!.textContent = `0${nearest + 1}`;
    });
  }, []);

  /** Keyboard users tabbing into an off-screen card: scroll the reel to it. */
  const reveal = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const span = root.offsetHeight - window.innerHeight;
    const p = WINDOW[0] + (WINDOW[1] - WINDOW[0]) * (i / (categories.length - 1));
    scrollToY(top + p * span, true);
  };

  return (
    <section ref={rootRef} id="services" aria-labelledby="roof-title" className="relative bg-ink" style={{height: `${SECTION_VH}svh`}}>
      <div className="sticky top-0 flex h-screen-s flex-col justify-center overflow-hidden pt-20 md:flex-row md:items-center md:justify-start md:pt-0">
        <div className="relative z-10 shrink-0 px-4 sm:px-6 md:flex md:w-[36vw] md:flex-col md:justify-center md:self-stretch md:bg-ink md:pr-10 md:pl-[6vw] md:after:pointer-events-none md:after:absolute md:after:inset-y-0 md:after:left-full md:after:w-20 md:after:bg-gradient-to-r md:after:from-ink md:after:to-transparent">
          <Eyebrow>{roof.eyebrow}</Eyebrow>
          <h2 id="roof-title" className="mt-4 font-display text-display text-ivory">
            Everything you need. <em className="text-gold-2">All under one roof.</em>
          </h2>
          <p className="mt-5 max-w-[28rem] text-body text-linen max-md:hidden">{roof.body}</p>
          <p className="mt-3 max-w-[28rem] text-body text-stone max-lg:hidden">{roof.body2}</p>
          <div className="mt-8 flex items-center gap-4 text-label text-stone uppercase max-md:hidden" aria-hidden="true">
            <span>
              <span ref={countRef} className="text-ivory tabular-nums">
                01
              </span>{' '}
              / 0{categories.length}
            </span>
            <span className="relative h-px w-32 bg-ivory/15">
              <span ref={barRef} className="absolute inset-0 origin-left bg-gold" style={{transform: 'scaleX(0)'}} />
            </span>
          </div>
        </div>

        <ol ref={trackRef} className="mt-8 flex gap-4 pl-4 will-change-transform sm:pl-6 md:mt-0 md:gap-6 md:pl-0">
          {categories.map((c, i) => (
            <li
              key={c.slug}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="w-[68vw] shrink-0 origin-bottom sm:w-[42vw] md:w-[clamp(15rem,21vw,21rem)]"
            >
              <A href={c.path} onFocus={() => reveal(i)} className="group block">
                <div className="arch relative aspect-[3/4] overflow-hidden bg-ink-3">
                  <img
                    ref={(el) => {
                      if (el) imgRefs.current[i] = el;
                    }}
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover will-change-transform"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 transition-opacity duration-500 group-hover:opacity-60" />
                  <span aria-hidden="true" className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-ivory/90 text-ink transition-[background-color,transform] duration-500 group-hover:-rotate-45 group-hover:bg-gold">
                    <Icon.Arrow className="size-4" />
                  </span>
                </div>
                <div className="mt-4 flex gap-4">
                  <span className="text-label text-gold">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-[1.5rem] leading-tight text-ivory transition-colors group-hover:text-gold-2">{c.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-stone">{c.blurb}</span>
                  </span>
                </div>
              </A>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
