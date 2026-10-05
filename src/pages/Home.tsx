import {work} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Mosaic} from '../components/Gallery';
import {Heritage} from '../components/Heritage';
import {Journey} from '../components/Journey';
import {Plan} from '../components/Plan';
import {Roof} from '../components/Roof';
import {Eyebrow} from '../components/ui';
import {Unveil} from '../components/Unveil';
import {Owner, Why} from '../components/Why';

export function Home() {
  return (
    <>
      <Unveil />
      <Roof />
      <Heritage />
      <Journey />
      <Work />
      <Why />
      <Owner />
      <Plan />
    </>
  );
}

function Work() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="work" aria-labelledby="work-title" className="bg-ink-2 px-4 py-28 sm:px-6 md:px-[6vw] md:py-40">
      <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <Eyebrow>{work.eyebrow}</Eyebrow>
          <h2 id="work-title" className="mt-5 max-w-[18ch] font-display text-display text-ivory">
            Real celebrations, <em className="text-gold-2">styled by our team.</em>
          </h2>
        </div>
        <p className="max-w-[24rem] text-body text-linen">{work.body}</p>
      </div>
      <Mosaic items={work.items} />
    </section>
  );
}
