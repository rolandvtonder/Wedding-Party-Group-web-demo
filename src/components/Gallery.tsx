import {useEffect, useRef} from 'react';
import {passProgress} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {useReveals} from '../hooks/useReveals';

type Item = {src: string; alt: string; caption?: string};

/**
 * An editorial mosaic. Three columns that pass at slightly different speeds,
 * so the wall of photographs has depth without anything pinning.
 */
export function Mosaic({items}: {items: Item[]}) {
  const ref = useReveals<HTMLDivElement>();
  const colRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let lastP = -1;
    return onFrame(() => {
      const root = ref.current;
      if (!root || window.innerWidth < 768) return;
      const {p, rect, vh} = passProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.0001) return;
      lastP = p;
      colRefs.current.forEach((c, i) => {
        c.style.transform = `translate3d(0, ${(p - 0.5) * [-40, 50, -20][i]}px, 0)`;
      });
    });
  }, [ref]);

  const cols: Item[][] = [[], [], []];
  items.forEach((it, i) => cols[i % 3].push(it));

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {cols.map((col, c) => (
        <div
          key={c}
          ref={(el) => {
            if (el) colRefs.current[c] = el;
          }}
          className={`grid content-start gap-4 will-change-transform md:gap-6 ${c === 1 ? 'md:pt-16' : ''} ${c === 2 ? 'sm:max-md:col-span-2 sm:max-md:grid-cols-2' : ''}`}
        >
          {col.map((it, i) => (
            <figure key={it.src + i} data-reveal className="group">
              <div className={`relative overflow-hidden bg-ink-3 ${(c + i) % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'} ${c === 1 && i === 0 ? 'arch' : 'rounded-[2px]'}`}>
                <img src={it.src} alt={it.alt} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]" />
              </div>
              {it.caption && <figcaption className="mt-3 text-label text-stone uppercase">{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
