import {useEffect, useRef, useState} from 'react';
import {journey} from '../content';
import {useMediaQuery} from '../hooks/useMediaQuery';
import {clamp, easeOutCubic, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Eyebrow} from './ui';

/**
 * From the first idea to the final guest, drawn as you scroll. The section
 * pins while four legs ink themselves one after another, a gold bead riding
 * the leg being drawn: a first lap around the idea, a sweep into design, a
 * roof drawn over all eight departments — each one lighting as the line
 * passes above it — and a last descent into two interlocking rings.
 *
 * The counter is the point of the section: the suppliers you deal with fall
 * from eight to one as the roof closes over them.
 *
 * Phones get their own vertical composition rather than a shrunken landscape
 * one, so the labels stay legible.
 */

const SECTION_VH = 380;
const WINDOW = [0.06, 0.92] as const;

type Layout = {
  view: string;
  idea: {cx: number; cy: number; r: number};
  rings: {cx: number; cy: number; r: number};
  legs: string[];
  eave: [number, number];
  apex: [number, number];
  dots: {x: number; y: number}[];
  /** Where each department's label sits relative to its dot. */
  label: {dx: number; dy: number; anchor: 'middle' | 'start'; size: number};
  labels: {idea: [number, number]; roof: [number, number]; day: [number, number]};
  font: number;
};

const DESKTOP: Layout = (() => {
  const idea = {cx: 190, cy: 330, r: 64};
  const o = 100; // orbit radius
  const dots = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({x: 468 + (i % 4) * 88, y: i < 4 ? 330 : 410}));
  return {
    view: '0 0 1200 600',
    idea,
    rings: {cx: 1010, cy: 345, r: 42},
    legs: [
      // A first lap around the idea, then out of orbit.
      `M${idea.cx} ${idea.cy - o} a${o} ${o} 0 1 1 -0.1 0 a${o} ${o} 0 0 1 86.6 50`,
      // Sweep into design, up to the left eave.
      `M${idea.cx + 86.6} ${idea.cy - 50} C 330 210, 380 230, 430 285`,
      // The roof, drawn over all eight.
      `M430 285 L600 165 L770 285`,
      // Down into the rings.
      `M770 285 C 840 230, 920 250, 978 312`,
    ],
    eave: [430, 285],
    apex: [600, 165],
    dots,
    label: {dx: 0, dy: 30, anchor: 'middle', size: 13},
    labels: {idea: [190, 495], roof: [600, 132], day: [1026, 432]},
    font: 15,
  };
})();

const MOBILE: Layout = (() => {
  const idea = {cx: 150, cy: 150, r: 52};
  const o = 82;
  // Two columns, labels beside the dots: four across would not fit a phone.
  const dots = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({x: i % 2 ? 330 : 150, y: 452 + Math.floor(i / 2) * 56}));
  return {
    view: '0 0 600 820',
    idea,
    rings: {cx: 300, cy: 740, r: 38},
    legs: [
      `M${idea.cx} ${idea.cy - o} a${o} ${o} 0 1 1 -0.1 0 a${o} ${o} 0 0 1 71 41`,
      `M${idea.cx + 71} ${idea.cy - 41} C 360 120, 120 300, 110 410`,
      `M110 410 L300 290 L490 410`,
      `M490 410 C 560 520, 470 640, 324 706`,
    ],
    eave: [110, 410],
    apex: [300, 290],
    dots,
    label: {dx: 22, dy: 7, anchor: 'start', size: 19},
    labels: {idea: [300, 160], roof: [300, 262], day: [400, 748]},
    font: 22,
  };
})();

export function Journey() {
  const mobile = useMediaQuery('(max-width: 767px)');
  const L = mobile ? MOBILE : DESKTOP;
  const rootRef = useRef<HTMLElement>(null);
  const legRefs = useRef<SVGPathElement[]>([]);
  const dotRefs = useRef<SVGGElement[]>([]);
  const beadRef = useRef<SVGGElement>(null);
  const ringsRef = useRef<SVGGElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [leg, setLeg] = useState(0);

  useEffect(() => {
    let lastP = -1;
    let current = 0;
    return onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const {p, rect, vh} = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const u = range(p, ...WINDOW) * L.legs.length;
      const s = clamp(Math.floor(u), 0, L.legs.length - 1);
      if (s !== current) {
        current = s;
        setLeg(s);
      }
      legRefs.current.forEach((path, i) => {
        const k = easeOutCubic(clamp(u - i));
        path.style.strokeDashoffset = String(1 - k);
        if (i === s) {
          const pt = path.getPointAtLength(path.getTotalLength() * k);
          beadRef.current!.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        }
      });

      // Each department lights as the roof line passes over it.
      const roofK = easeOutCubic(clamp(u - 2));
      // The two pitches are equal, so the line's x advances linearly along them.
      const reach = L.eave[0] + roofK * 2 * (L.apex[0] - L.eave[0]);
      let lit = 0;
      dotRefs.current.forEach((g, i) => {
        const on = roofK > 0 && L.dots[i].x <= reach + 1;
        if (on) lit++;
        g.style.opacity = on ? '1' : '0.35';
      });
      // Eight suppliers become one.
      const n = roofK >= 1 ? 1 : Math.max(1, 8 - lit);
      countRef.current!.textContent = String(n);

      ringsRef.current!.style.opacity = String(0.35 + 0.65 * easeOutCubic(clamp(u - 3)));
    });
  }, [L]);

  const current = journey.legs[leg];

  return (
    <section ref={rootRef} id="journey" aria-labelledby="journey-title" className="relative bg-ink" style={{height: `${SECTION_VH}svh`}}>
      <div className="sticky top-0 flex h-screen-s flex-col overflow-hidden px-4 pt-22 pb-6 sm:px-6 md:px-[6vw] md:pt-28 md:pb-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{journey.eyebrow}</Eyebrow>
            <h2 id="journey-title" className="mt-3 max-w-[18ch] font-display text-[clamp(1.875rem,4vw,3.75rem)] leading-[1.04] text-ivory">
              From the first idea <em className="text-gold-2">to the final guest.</em>
            </h2>
          </div>
          <p className="flex items-baseline gap-3 text-label text-stone uppercase" aria-live="off">
            {journey.counterLabel}
            <span ref={countRef} className="font-display text-[2rem] leading-none tracking-normal text-gold-2 tabular-nums md:text-[2.75rem]">
              8
            </span>
          </p>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <svg key={mobile ? 'm' : 'd'} viewBox={L.view} className="h-auto max-h-full w-full" role="img" aria-label="A line drawn from your idea, through design, under one roof over eight departments, to your day.">
            <defs>
              <radialGradient id="bead-glow">
                <stop offset="0" stopColor="#e4cf9f" stopOpacity="0.7" />
                <stop offset="1" stopColor="#e4cf9f" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Faint gold dust. */}
            <g fill="#e4cf9f">
              {Array.from({length: 60}, (_, i) => (
                <circle key={i} cx={(i * 173) % (mobile ? 600 : 1200)} cy={(i * 97) % (mobile ? 820 : 600)} r={i % 7 === 0 ? 1.4 : 0.8} opacity={0.08 + ((i * 37) % 30) / 100} />
              ))}
            </g>

            {/* Your idea. */}
            <circle cx={L.idea.cx} cy={L.idea.cy} r={L.idea.r} fill="#1d1914" stroke="#c8a76a" strokeOpacity="0.5" />
            <g transform={`translate(${L.idea.cx} ${L.idea.cy})`} stroke="#e4cf9f" strokeWidth="1.5" strokeLinecap="round">
              <path d="M0 -20 L0 20 M-20 0 L20 0 M-12 -12 L12 12 M-12 12 L12 -12" opacity="0.8" />
              <circle r="4" fill="#e4cf9f" stroke="none" />
            </g>

            {/* The eight departments. */}
            {L.dots.map((d, i) => (
              <g
                key={i}
                ref={(el) => {
                  if (el) dotRefs.current[i] = el;
                }}
                style={{opacity: 0.35, transition: 'opacity 0.4s'}}
              >
                <circle cx={d.x} cy={d.y} r={mobile ? 9 : 7} fill="#c8a76a" />
                <text x={d.x + L.label.dx} y={d.y + L.label.dy} textAnchor={L.label.anchor} fontSize={L.label.size} letterSpacing="1.5" fill="#d9d0c1" fontFamily="Jost, sans-serif">
                  {journey.roofLabels[i].toUpperCase()}
                </text>
              </g>
            ))}

            {/* Your day. */}
            <g ref={ringsRef} fill="none" stroke="#e4cf9f" strokeWidth="2.5" style={{opacity: 0.35}}>
              <circle cx={L.rings.cx - L.rings.r * 0.42} cy={L.rings.cy} r={L.rings.r} />
              <circle cx={L.rings.cx + L.rings.r * 0.42} cy={L.rings.cy} r={L.rings.r} />
            </g>

            {/* Ghost of the whole route, then the inked legs over it. */}
            {L.legs.map((d, i) => (
              <path key={`g${i}`} d={d} fill="none" stroke="#f4efe6" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="3 7" />
            ))}
            {L.legs.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  if (el) legRefs.current[i] = el;
                }}
                d={d}
                pathLength={1}
                fill="none"
                stroke={i === 2 ? '#e4cf9f' : '#c8a76a'}
                strokeWidth={i === 2 ? 3 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            ))}

            <g ref={beadRef} transform={`translate(${L.idea.cx} ${L.idea.cy - (mobile ? 82 : 100)})`}>
              <circle r="16" fill="url(#bead-glow)" />
              <circle r="5" fill="#f4efe6" />
            </g>

            <g fontFamily="Jost, sans-serif" fontSize={L.font} letterSpacing="3" fill="#a1978a">
              <text x={L.labels.idea[0]} y={L.labels.idea[1]} textAnchor={mobile ? 'start' : 'middle'}>
                YOUR IDEA
              </text>
              <text x={L.labels.roof[0]} y={L.labels.roof[1]} textAnchor="middle" fill="#c8a76a">
                ONE ROOF
              </text>
              <text x={L.labels.day[0]} y={L.labels.day[1]} textAnchor={mobile ? 'start' : 'middle'}>
                YOUR DAY
              </text>
            </g>
          </svg>
        </div>

        {/* Current step. */}
        <div className="grid gap-3 border-t border-ivory/10 pt-5 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
          <p className="text-label text-gold uppercase">
            {current.step} of {journey.legs.length}
          </p>
          <div key={leg} className="animate-[leg-in_0.6s_cubic-bezier(0.2,0.7,0.1,1)]" aria-live="polite">
            <h3 className="font-display text-[1.375rem] text-ivory md:text-[1.75rem]">{current.title}</h3>
            <p className="mt-1 max-w-[40rem] text-body text-linen max-sm:text-[0.9375rem] max-sm:leading-relaxed">{current.body}</p>
          </div>
          <div className="flex gap-1.5 max-md:hidden" aria-hidden="true">
            {journey.legs.map((_, i) => (
              <span key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= leg ? 'bg-gold' : 'bg-ivory/15'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
