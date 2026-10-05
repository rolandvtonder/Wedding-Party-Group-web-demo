import {useEffect, useRef} from 'react';
import {brand, hero, planPath, waLink} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {easeInOutCubic, easeOutCubic, lerp, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {A, Crest, Icon, btn} from './ui';

/**
 * The Unveiling. The page opens behind an ivory bridal veil with gold petals
 * falling across it; the scroll lifts the veil like a curtain, and one real
 * Wedding Party table rises into an arch window. One pinned scroll range moves
 * every layer at its own rate:
 *
 *   0.00 – 0.16  the veil lifts away upward (its scalloped hem last)
 *   0.03 – 0.42  the arch rises from below the frame and settles
 *   0.18 – 0.46  a gold hairline arch closes in around it — the frame
 *   0.14 – 0.54  YOUR VISION. / OUR EXPERIENCE. / YOUR PERFECT EVENT.
 *                resolve one line at a time, then yield
 *   0.50 – 0.68  the arch steps aside and the brand, disciplines and the
 *                three calls to action come forward
 *   0.84 – 1.00  everything lifts and the stage fades to ink, which is
 *                where the page continues
 *
 * The photo is shown sharp only inside the arch: the old site's images top out
 * around 960px, so the full-bleed copy behind is deliberately out of focus,
 * like candlelight past a shallow lens. A thin HUD rides on top: the year
 * ticking from 2000 to today, and where the business is.
 */

const STAGE_VH = 400;
const YEAR_NOW = 2026;

type Petal = {x: number; y: number; r: number; s: number; a: number; rot: number; spin: number; sway: number; hue: number};

export function Unveil() {
  const rootRef = useRef<HTMLElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archImgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const bokehRefs = useRef<HTMLDivElement[]>([]);
  const blockRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  // Petal canvas size.
  useEffect(() => {
    const c = petalsRef.current!;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = petalsRef.current!;
    const ctx = canvas.getContext('2d')!;
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const petals: Petal[] = Array.from({length: 46}, () => ({
      x: rand(),
      y: rand(),
      r: 3 + rand() * 6,
      s: 0.25 + rand() * 0.6,
      a: 0.35 + rand() * 0.5,
      rot: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 1.2,
      sway: rand() * Math.PI * 2,
      hue: rand(),
    }));
    let lastP = -1;
    let lastTime = 0;
    let veilOn: boolean | null = null;
    const html = document.documentElement;

    const stop = onFrame((time) => {
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;
      const root = rootRef.current;
      if (!root) return;
      const {p, rect} = pinProgress(root);
      if (rect.bottom < 0) return;

      const veilK = range(p, 0, 0.16);
      const exit = range(p, 0.84, 1);

      // Petals fall every frame while the stage is on screen; most of them
      // leave with the veil, a few stay for the rest of the scene.
      const petalAlpha = lerp(1, 0.4, veilK) * (1 - exit);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = canvas.width / Math.max(1, w);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (petalAlpha > 0.01) {
        for (const pt of petals) {
          if (!reducedRef.current) {
            pt.y += 0.028 * pt.s * dt;
            pt.sway += dt * 0.8 * pt.s;
            pt.rot += pt.spin * dt;
            if (pt.y > 1.05) {
              pt.y -= 1.1;
              pt.x = Math.random();
            }
          }
          const x = (pt.x + Math.sin(pt.sway) * 0.012) * w;
          const y = (pt.y - veilK * 0.35) * h;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(pt.rot);
          ctx.globalAlpha = pt.a * petalAlpha;
          ctx.fillStyle = pt.hue > 0.55 ? '#d8b6a6' : pt.hue > 0.2 ? '#c8a76a' : '#efe2c4';
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.r, pt.r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      }

      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const desktop = window.innerWidth >= 768;
      const settle = easeOutCubic(range(p, 0, 0.5));

      // The veil lifts like a curtain; its hem trails it. Until the hem has
      // cleared the header, the header reads ink-on-ivory.
      const lift = easeInOutCubic(veilK);
      veilRef.current!.style.transform = `translate3d(0, ${-lift * 112}%, 0)`;
      veilRef.current!.style.visibility = veilK >= 1 ? 'hidden' : '';
      const on = lift < 0.8;
      if (on !== veilOn) {
        veilOn = on;
        html.dataset.veil = on ? 'on' : 'off';
      }

      // Ambient: the out-of-focus room.
      ambientRef.current!.style.transform = `translate3d(0, ${lerp(0, -6, p)}vh, 0) scale(${lerp(1.25, 1.08, settle)})`;
      shadeRef.current!.style.opacity = String(lerp(0.35, 0.82, range(p, 0.04, 0.36)));

      // The arch rises, then steps aside.
      const rise = easeOutCubic(range(p, 0.03, 0.42));
      const aside = easeInOutCubic(range(p, 0.5, 0.66));
      const ax = desktop ? aside * 19 : 0;
      const ay = lerp(56, 0, rise) + (desktop ? 0 : -aside * 19) - exit * 22;
      const as = lerp(0.86, 1, rise) * lerp(1, desktop ? 0.94 : 0.7, aside);
      archRef.current!.style.transform = `translate3d(${ax}vw, ${ay}vh, 0) scale(${as})`;
      archImgRef.current!.style.transform = `scale(${lerp(1.32, 1.04, rise)}) translate3d(0, ${lerp(-3, 2, p)}%, 0)`;
      const rim = easeOutCubic(range(p, 0.18, 0.46));
      frameRef.current!.style.transform = `scale(${lerp(1.22, 1, rim)})`;
      frameRef.current!.style.opacity = String(rim);

      // Title: each line resolves (tracking closes in), then all yield.
      const tOut = range(p, 0.46, 0.54);
      linesRef.current.forEach((line, i) => {
        const tIn = easeOutCubic(range(p, 0.14 + i * 0.06, 0.27 + i * 0.06));
        line.style.opacity = String(tIn * (1 - tOut));
        line.style.letterSpacing = `${lerp(0.42, 0.04, tIn)}em`;
        line.style.transform = `translate3d(0, ${-tOut * 5}vh, 0)`;
        line.style.filter = tIn < 0.99 ? `blur(${(1 - tIn) * 10}px)` : '';
      });

      // Candlelight bokeh: far drifts slowly, near passes fast.
      const glow = range(p, 0.08, 0.3) * (1 - exit);
      bokehRefs.current.forEach((b, i) => {
        b.style.opacity = String(glow * (i ? 0.9 : 0.6));
        b.style.transform = `translate3d(0, ${i ? lerp(28, -46, p) : lerp(8, -14, p)}vh, 0)`;
      });

      // The brand block and calls to action.
      const bIn = easeOutCubic(range(p, 0.56, 0.68)) * (1 - range(p, 0.86, 0.95));
      const block = blockRef.current!;
      block.style.opacity = String(bIn);
      block.style.transform = `translate3d(0, ${lerp(4, 0, bIn) - exit * 10}vh, 0)`;
      block.style.visibility = bIn < 0.04 ? 'hidden' : '';
      block.style.pointerEvents = bIn > 0.5 ? '' : 'none';

      // Telemetry.
      // The HUD hands the screen over to the brand block as it arrives.
      hudRef.current!.style.opacity = String(range(p, 0.1, 0.18) * (1 - range(p, 0.5, 0.58)));
      yearRef.current!.textContent = String(Math.round(lerp(2000, YEAR_NOW, easeOutCubic(range(p, 0.08, 0.72)))));

      fadeRef.current!.style.opacity = String(easeInOutCubic(exit));
    });

    return () => {
      stop();
      delete html.dataset.veil;
    };
  }, []);

  return (
    <section id="top" ref={rootRef} aria-label="Welcome" className="relative" style={{height: `${STAGE_VH}svh`}}>
      <div className="sticky top-0 h-screen-s overflow-hidden bg-ink">
        {/* The room, out of focus. */}
        <div ref={ambientRef} aria-hidden="true" className="absolute inset-0 will-change-transform">
          <img src={hero.image} alt="" className="size-full scale-110 object-cover blur-[22px] saturate-[1.15]" fetchPriority="high" decoding="async" />
        </div>
        <div ref={shadeRef} aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(11_10_8/0.55),rgb(11_10_8/0.96))]" style={{opacity: 0.35}} />

        {/* Far bokeh. */}
        <Bokeh ref={(el) => el && (bokehRefs.current[0] = el)} far />

        {/* The arch window. */}
        <div className="absolute inset-0 flex items-center justify-center pt-10 md:pt-6">
          <div ref={archRef} className="relative will-change-transform" style={{height: 'min(68svh, 118vw)', aspectRatio: '0.74', transform: 'translate3d(0, 56vh, 0) scale(0.86)'}}>
            <div ref={frameRef} aria-hidden="true" className="arch absolute -inset-3 border border-gold/70 md:-inset-4" style={{opacity: 0}} />
            <div className="arch absolute inset-0 overflow-hidden bg-ink-3 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]">
              <img ref={archImgRef} src={hero.image} alt={hero.imageAlt} width={960} height={960} className="size-full object-cover will-change-transform" fetchPriority="high" decoding="async" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Title lines sit over the arch, under the near bokeh. */}
        <p className="pointer-events-none absolute inset-x-0 top-[52%] -translate-y-1/2 px-4 text-center font-display text-hero text-ivory uppercase [text-shadow:0_6px_50px_rgb(0_0_0/0.65)]">
          {hero.lines.map((l, i) => (
            <span
              key={l}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              className={`block whitespace-nowrap ${i === 1 ? 'text-gold-2 italic' : ''}`}
              style={{opacity: 0, marginRight: '-0.04em'}}
            >
              {l}
            </span>
          ))}
        </p>

        {/* Near bokeh. */}
        <Bokeh ref={(el) => el && (bokehRefs.current[1] = el)} />

        {/* Brand block + calls to action. */}
        <div
          ref={blockRef}
          className="absolute inset-x-0 bottom-[max(9svh,5.5rem)] px-5 text-center md:inset-y-0 md:right-auto md:left-[6vw] md:flex md:w-[42vw] md:flex-col md:justify-center md:px-0 md:text-left"
          style={{opacity: 0, visibility: 'hidden'}}
        >
          <p className="text-label text-gold uppercase">{hero.established}</p>
          <p className="mt-4 font-display text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] text-ivory max-md:hidden">
            Everything your event needs. <em className="text-gold-2">All under one roof.</em>
          </p>
          <p className="mx-auto mt-3 max-w-[30rem] text-[0.8125rem] leading-relaxed tracking-[0.14em] text-linen uppercase md:mx-0 md:mt-6">
            {hero.disciplines.join(' · ')}
          </p>
          <div className="mt-6 grid gap-2.5 sm:flex sm:flex-wrap sm:justify-center md:mt-9 md:justify-start">
            <A href="#work" className={btn.ghost}>
              View our work
            </A>
            <A href={planPath} className={btn.gold}>
              Start planning
            </A>
            <a href={waLink()} target="_blank" rel="noopener" className={btn.ghost}>
              <Icon.WhatsApp className="size-4" /> WhatsApp us
            </a>
          </div>
        </div>

        {/* The veil. */}
        <div
          ref={veilRef}
          className="absolute inset-0 z-10 will-change-transform"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 38%, rgba(247,243,235,0.98) 38%, rgba(236,226,208,0.94) 72%, rgba(214,196,166,0.9))',
          }}
        >
          {/* Scalloped hem, like the edge of lace. */}
          <svg aria-hidden="true" className="absolute inset-x-0 top-full h-6 w-full text-[rgb(220,204,177)]" preserveAspectRatio="none" viewBox="0 0 400 12">
            <path fill="currentColor" d={`M0 0 ${Array.from({length: 40}, (_, i) => `Q${i * 10 + 5} 14 ${i * 10 + 10} 0`).join(' ')} Z`} />
          </svg>
          <div className="flex h-full flex-col items-center justify-center px-6 pt-10 text-center text-ink">
            <Crest className="w-[min(44vw,11.5rem)] md:w-[13rem]" />
            <h1 tabIndex={-1} className="mt-6 font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.05] tracking-[0.12em] uppercase" style={{marginRight: '-0.12em'}}>
              {brand.name}
            </h1>
            <p className="mt-3 max-w-[30rem] text-label text-[#6b5a3c] uppercase">{brand.statement}</p>
            <p className="mt-10 font-display text-[1.125rem] text-[#4a4030] italic">Scroll to unveil</p>
            <span aria-hidden="true" className="mt-2 inline-block text-[#8a7350] motion-safe:animate-[drift-down_2.4s_ease-in-out_infinite]">
              <Icon.Chevron className="size-5" />
            </span>
          </div>
        </div>

        <canvas ref={petalsRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 size-full" />

        {/* Telemetry HUD. */}
        <div ref={hudRef} aria-hidden="true" className="pointer-events-none absolute inset-3 z-[5] text-[0.6875rem] tracking-[0.2em] text-linen/80 uppercase sm:inset-5" style={{opacity: 0}}>
          <div className="brackets absolute inset-0 text-gold/45" />
          <div className="absolute top-[4.75rem] left-3 space-y-1 md:top-24 md:left-5">
            <p className="font-display text-[1.75rem] leading-none tracking-[0.06em] text-gold-2 tabular-nums md:text-[2.25rem]">
              <span ref={yearRef}>2000</span>
            </p>
            <p className="text-stone">Celebrating since 2000</p>
          </div>
          <div className="absolute top-[4.75rem] right-3 hidden space-y-1 text-right sm:block md:top-24 md:right-5">
            <p>{brand.statement}</p>
            <p className="text-stone">{brand.tagline}</p>
          </div>
          <div className="absolute bottom-3 left-3 max-md:hidden md:bottom-5 md:left-5">{hero.place}</div>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 max-md:hidden md:bottom-5">
            Scroll <Icon.Chevron className="size-3.5 motion-safe:animate-[drift-down_2.4s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Hand-off to the page below. */}
        <div ref={fadeRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 bg-ink" style={{opacity: 0}} />
      </div>
    </section>
  );
}

/** Soft circles of warm light, like candles past a shallow focus. */
function Bokeh({far = false, ref}: {far?: boolean; ref: (el: HTMLDivElement | null) => void}) {
  const dots = far
    ? [[12, 22, 9], [84, 18, 7], [70, 64, 11], [24, 74, 8], [50, 12, 6], [92, 82, 9]]
    : [[6, 58, 16], [90, 40, 20], [18, 96, 22], [78, 104, 18]];
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 will-change-transform" style={{opacity: 0}}>
      {dots.map(([x, y, s], i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${s}vmin`,
            height: `${s}vmin`,
            background: 'radial-gradient(circle, rgba(240,205,140,0.55), rgba(240,205,140,0.18) 45%, transparent 70%)',
            filter: far ? 'blur(6px)' : 'blur(14px)',
          }}
        />
      ))}
    </div>
  );
}
