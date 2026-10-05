import {contact, owner, testimonial, why} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, Icon} from './ui';

/** Six reasons. Each card carries a ring for every reason before it — the set grows as you read. */
export function Why() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="why" aria-labelledby="why-title" className="relative bg-ink px-4 py-28 sm:px-6 md:px-[6vw] md:py-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <Eyebrow>{why.eyebrow}</Eyebrow>
          <h2 id="why-title" className="mt-5 max-w-[16ch] font-display text-display text-ivory">
            Why clients choose <em className="text-gold-2">Wedding Party Group.</em>
          </h2>
        </div>
        <a href={contact.maps} target="_blank" rel="noopener" className="flex items-center gap-4 self-start rounded-[2px] px-5 py-4 ring-1 ring-gold/25 transition-colors hover:bg-ivory/[0.04] md:self-auto">
          <span className="font-display text-[2.5rem] leading-none text-ivory">{contact.google.rating}</span>
          <span>
            <span className="flex gap-0.5 text-gold" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <Icon.Star key={i} className="size-4" />
              ))}
              <span className="relative size-4">
                <Icon.Star className="absolute inset-0 size-4 text-ivory/20" />
                <span className="absolute inset-0 w-1/2 overflow-hidden">
                  <Icon.Star className="size-4" />
                </span>
              </span>
            </span>
            <span className="mt-1 block text-label text-stone uppercase">
              <span className="sr-only">Rated {contact.google.rating} out of 5 from </span>
              {contact.google.reviews} Google reviews
            </span>
          </span>
        </a>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden bg-gold/15 ring-1 ring-gold/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
        {why.items.map((item, i) => (
          <li key={item.title} data-reveal style={{transitionDelay: `${(i % 3) * 100}ms`}} className="group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:p-10">
            <svg aria-hidden="true" viewBox="0 0 200 120" className="absolute -top-6 -right-8 w-44 text-gold/15 transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:-translate-x-3 group-hover:text-gold/30">
              {Array.from({length: i + 1}, (_, k) => (
                <circle key={k} cx={150 - k * 18} cy="60" r="34" fill="none" stroke="currentColor" />
              ))}
            </svg>
            <span className="text-label text-gold">0{i + 1}</span>
            <h3 className="mt-10 font-display text-[1.75rem] leading-tight text-ivory">{item.title}</h3>
            <p className="mt-3 max-w-[22rem] text-body text-linen">{item.body}</p>
          </li>
        ))}
      </ol>

      <figure className="relative mx-auto mt-24 max-w-[56rem] text-center md:mt-32" data-reveal>
        <span aria-hidden="true" className="block font-display text-[6rem] leading-[0.5] text-gold/50">
          “
        </span>
        <blockquote className="mt-6 font-display text-[clamp(1.375rem,2.4vw,2.125rem)] leading-[1.35] text-ivory italic">{testimonial.quote}</blockquote>
        <figcaption className="mt-8 text-label text-stone uppercase">
          <span className="text-gold-2">{testimonial.name}</span> · {testimonial.role}
        </figcaption>
      </figure>
    </section>
  );
}

export function Owner() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="owner-title" className="relative bg-ink-2 px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-20">
        <div className="relative mx-auto w-full max-w-[20rem] md:mx-0" data-reveal>
          <div aria-hidden="true" className="arch absolute -inset-3 border border-gold/50" />
          <div className="arch relative aspect-[3/4] overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#2a241c,#14110d)]">
            <img src={owner.image} alt={`${owner.name}, owner of the Wedding Party Group`} width={225} height={338} loading="lazy" decoding="async" className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto object-contain" />
          </div>
        </div>
        <div data-reveal style={{transitionDelay: '120ms'}}>
          <Eyebrow>{owner.eyebrow}</Eyebrow>
          <h2 id="owner-title" className="mt-5 font-display text-display text-ivory">
            {owner.name}
          </h2>
          <p className="mt-3 text-label text-gold-2 uppercase">{owner.role}</p>
          {owner.body.map((b) => (
            <p key={b} className="mt-5 max-w-[36rem] text-lead text-linen">
              {b}
            </p>
          ))}
          <p className="mt-8 font-script text-[2.5rem] leading-none text-gold">Renette</p>
        </div>
      </div>
    </section>
  );
}
