import {planPath, testimonial, weddings} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Mosaic} from '../components/Gallery';
import {CtaBand, PageHero} from '../components/PageParts';
import {A, Eyebrow, Rings, btn} from '../components/ui';

export function Weddings() {
  return (
    <>
      <PageHero
        eyebrow={weddings.eyebrow}
        title={
          <>
            Your wedding.
            <br />
            <em className="text-gold-2">Your story.</em>
            <br />
            Beautifully created.
          </>
        }
        lead={weddings.lead}
        image={weddings.image}
        alt={weddings.imageAlt}
      />
      <Services />
      <Levels />
      <section aria-label="Wedding gallery" className="bg-ink px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
        <Mosaic items={weddings.gallery} />
      </section>
      <Quote />
      <CtaBand />
    </>
  );
}

/** The thirteen services, as a numbered menu card. */
function Services() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="w-services" className="bg-ink-2 px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 id="w-services" className="mt-5 font-display text-display text-ivory">
            Everything your wedding <em className="text-gold-2">needs.</em>
          </h2>
          <Rings className="mt-10 w-24 text-gold/60" />
          <A href={planPath} className={`${btn.gold} mt-10`}>
            Start planning
          </A>
        </div>
        <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
          {weddings.services.map((s, i) => (
            <li key={s.title} data-reveal className="group grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 sm:grid-cols-[3rem_14rem_1fr] sm:items-baseline">
              <span className="text-label text-gold tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-[1.5rem] leading-tight text-ivory transition-colors group-hover:text-gold-2">{s.title}</h3>
              <p className="col-start-2 mt-1 text-body text-linen sm:col-start-3 sm:mt-0">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Levels() {
  const ref = useReveals<HTMLElement>();
  const {levels} = weddings;
  return (
    <section ref={ref} aria-labelledby="w-levels" className="bg-ink px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <div className="max-w-[40rem]" data-reveal>
        <h2 id="w-levels" className="font-display text-[clamp(2rem,3.6vw,3.25rem)] text-ivory">
          {levels.heading}
        </h2>
        <p className="mt-4 text-lead text-linen">{levels.body}</p>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {levels.items.map((l, i) => (
          <li key={l.title} data-reveal style={{transitionDelay: `${i * 90}ms`}} className="brackets relative p-7 text-gold/40">
            <span className="font-script text-[2.5rem] leading-none text-gold">{['One', 'Two', 'Three', 'Four'][i]}</span>
            <h3 className="mt-4 font-display text-[1.5rem] text-ivory">{l.title}</h3>
            <p className="mt-2 text-body text-linen">{l.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Quote() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-label="What our clients say" className="bg-ink-2 px-4 py-24 sm:px-6 md:px-[6vw] md:py-32">
      <figure className="mx-auto max-w-[52rem] text-center" data-reveal>
        <Rings className="mx-auto w-16 text-gold/60" />
        <blockquote className="mt-8 font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.4] text-ivory italic">“{testimonial.quote}”</blockquote>
        <figcaption className="mt-8 text-label text-stone uppercase">
          <span className="text-gold-2">{testimonial.name}</span> · {testimonial.role}
        </figcaption>
      </figure>
    </section>
  );
}
