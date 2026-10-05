import {categories, servicePages} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Catalogue} from '../components/Catalogue';
import {Mosaic} from '../components/Gallery';
import {CtaBand, Offers, PageHero, Tags} from '../components/PageParts';

/** One template for the eight departments; Rentals adds the catalogue. */
export function Service({slug}: {slug: string}) {
  const page = servicePages[slug];
  const cat = categories.find((c) => c.slug === slug)!;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} image={cat.image} alt={cat.alt} />
      <Intro paragraphs={page.intro} note={page.note} />
      {slug === 'rentals' && <Catalogue />}
      <Offers heading={page.offersHeading} items={page.offers} />
      {page.tags && <Tags heading={page.tags.heading} items={page.tags.items} />}
      {page.gallery.length > 0 && (
        <section aria-label={`${page.eyebrow} gallery`} className="bg-ink px-4 pb-24 sm:px-6 md:px-[6vw] md:pb-32">
          <Mosaic items={page.gallery} />
        </section>
      )}
      <CtaBand except={slug} />
    </>
  );
}

function Intro({paragraphs, note}: {paragraphs: string[]; note?: string}) {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="bg-ink px-4 pb-20 sm:px-6 md:px-[6vw] md:pb-28">
      <div className="ml-auto max-w-[44rem] border-l border-gold/30 pl-6 md:pl-10" data-reveal>
        {paragraphs.map((p) => (
          <p key={p} className="mt-5 text-lead text-linen first:mt-0">
            {p}
          </p>
        ))}
        {note && <p className="mt-6 text-label text-gold-2 uppercase">{note}</p>}
      </div>
    </section>
  );
}
