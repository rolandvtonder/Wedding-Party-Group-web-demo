import {useMemo, useState} from 'react';
import {planPath, rentalRules} from '../content';
import {rentals} from '../data/rentals';
import {useReveals} from '../hooks/useReveals';
import {withBase} from '../lib/base';
import {toggleItem, useEnquiry} from '../lib/enquiry';
import {A, Icon, btn} from './ui';

const ALL = 'All';
const CATS = [ALL, ...Array.from(new Set(rentals.map((r) => r.cat)))];
const PAGE = 24;

/**
 * The rental catalogue. Filter by department or search by name; "Add to
 * enquiry" builds a list that rides along to the Start Planning form. No prices
 * and no booking here — availability is confirmed by a person.
 */
export function Catalogue() {
  const ref = useReveals<HTMLElement>();
  const [cat, setCat] = useState(ALL);
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(PAGE);
  const picked = useEnquiry();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rentals.filter((r) => (cat === ALL || r.cat === cat) && (!needle || r.name.toLowerCase().includes(needle) || r.sku.toLowerCase().includes(needle)));
  }, [cat, q]);

  return (
    <section ref={ref} id="catalogue" aria-labelledby="catalogue-title" className="bg-ink px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-label text-gold uppercase">Rental catalogue</p>
          <h2 id="catalogue-title" className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] text-ivory">
            Browse, then add to your enquiry.
          </h2>
        </div>
        {picked.length > 0 && (
          <A href={planPath} className={btn.gold}>
            Review enquiry ({picked.length}) <Icon.Arrow className="size-4" />
          </A>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by department" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setShown(PAGE);
              }}
              className={`min-h-11 shrink-0 rounded-full px-4 text-[0.875rem] whitespace-nowrap ring-1 transition-colors ${cat === c ? 'bg-gold text-ink ring-gold' : 'text-linen ring-ivory/15 hover:ring-gold/60'}`}
            >
              {c}
              <span className={`ml-1.5 tabular-nums ${cat === c ? 'text-ink/60' : 'text-stone'}`}>{c === ALL ? rentals.length : rentals.filter((r) => r.cat === c).length}</span>
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search the catalogue</span>
          <Icon.Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search — e.g. gold, napkin"
            className="w-full rounded-full bg-ivory/[0.04] py-3 pr-4 pl-11 text-[1rem] text-ivory ring-1 ring-ivory/15 outline-none placeholder:text-stone/70 focus:ring-gold"
          />
        </label>
      </div>

      <p className="mt-6 text-[0.875rem] text-stone" role="status">
        {list.length} item{list.length === 1 ? '' : 's'}
        {cat !== ALL && ` in ${cat}`}
        {q && ` matching “${q}”`}
      </p>

      {list.length ? (
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {list.slice(0, shown).map((r) => {
            const on = picked.includes(r.sku);
            return (
              <li key={r.sku} className="flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-[2px] bg-ivory">
                  <img src={withBase(r.img)} alt={r.name} loading="lazy" decoding="async" width={480} height={480} className="size-full object-cover" />
                  {on && (
                    <span className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-gold text-ink" aria-hidden="true">
                      <Icon.Check className="size-4" />
                    </span>
                  )}
                </div>
                <p className="mt-3 text-[0.9375rem] leading-snug text-ivory">{r.name}</p>
                <p className="mt-0.5 text-[0.75rem] tracking-[0.14em] text-stone uppercase">
                  {r.cat} · {r.sku}
                </p>
                <button
                  type="button"
                  onClick={() => toggleItem(r.sku)}
                  aria-pressed={on}
                  className={`mt-3 flex min-h-11 items-center justify-center gap-2 rounded-[2px] text-[0.8125rem] tracking-[0.12em] uppercase ring-1 transition-colors ${on ? 'bg-gold/15 text-gold-2 ring-gold/50' : 'text-linen ring-ivory/15 hover:bg-ivory hover:text-ink'}`}
                >
                  {on ? <Icon.Check className="size-4" /> : <Icon.Plus className="size-4" />}
                  {on ? 'Added' : 'Add to enquiry'}
                  <span className="sr-only"> — {r.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-10 rounded-[2px] p-10 text-center ring-1 ring-ivory/10">
          <p className="font-display text-[1.5rem] text-ivory">Nothing matches that just yet.</p>
          <p className="mt-2 text-linen">Try another word, or ask us — not every item is listed online.</p>
          <button type="button" onClick={() => (setQ(''), setCat(ALL))} className={`${btn.ghost} mt-6`}>
            Show everything
          </button>
        </div>
      )}

      {shown < list.length && (
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE * 2)} className={btn.ghost}>
            Show more <span className="text-stone">({list.length - shown} more)</span>
          </button>
        </div>
      )}

      <details className="group mt-24 rounded-[2px] ring-1 ring-gold/20 open:bg-ink-2">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-label text-gold uppercase">Before you book</span>
            <span className="mt-1 block font-display text-[1.5rem] text-ivory">General rules of rental</span>
          </span>
          <Icon.Plus className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
        </summary>
        <ol className="grid gap-x-12 gap-y-4 px-6 pb-8 md:grid-cols-2">
          {rentalRules.map((rule, i) => (
            <li key={i} className="flex gap-4 text-[0.9375rem] leading-relaxed text-linen">
              <span className="text-label text-gold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              {rule}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
