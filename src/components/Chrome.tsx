import {useEffect, useRef, useState} from 'react';
import {brand, categories, contact, nav, planPath, waLink} from '../content';
import {useEnquiry} from '../lib/enquiry';
import {usePath} from '../lib/router';
import {onFrame} from '../lib/scroll';
import {A, Icon, Seal, btn} from './ui';

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [menu, setMenu] = useState(false);
  const [services, setServices] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const path = usePath();
  const enquiry = useEnquiry();

  // Close everything when the page changes.
  useEffect(() => {
    setMenu(false);
    setServices(false);
  }, [path]);

  // A veil of ink behind the bar once the page has moved.
  useEffect(() => {
    let last: boolean | null = null;
    return onFrame(() => {
      const scrolled = window.scrollY > 24;
      if (scrolled === last) return;
      last = scrolled;
      ref.current?.setAttribute('data-scrolled', String(scrolled));
    });
  }, []);

  useEffect(() => {
    if (!services) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setServices(false);
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServices(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [services]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const close = () => {
    setMenu(false);
    setServices(false);
  };

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="group/h fixed inset-x-0 top-0 z-50 text-ivory"
    >
      {/* The bar's backing lives on its own layer: a backdrop-filter on the header
          itself would trap the fixed mobile menu inside the bar's height. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 transition-[background-color,box-shadow] duration-500 group-data-[scrolled=true]/h:bg-ink/85 group-data-[scrolled=true]/h:shadow-[0_1px_0_rgb(200_167_106/0.18)] group-data-[scrolled=true]/h:backdrop-blur-md" />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="flex items-center justify-between gap-6 px-4 py-3 sm:px-6 md:px-[3vw] xl:py-4">
        <A href="/" onNavigate={close} className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={`${brand.name} — home`}>
          <Seal className="size-10 shrink-0 sm:size-11 lg:size-12" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1rem] tracking-[0.14em] whitespace-nowrap uppercase sm:text-[1.1875rem] sm:tracking-[0.2em]">Wedding Party</span>
            <span className="mt-1 text-[0.625rem] tracking-[0.24em] whitespace-nowrap text-gold uppercase sm:tracking-[0.42em]">The Group · Est. 2000</span>
          </span>
        </A>

        <nav aria-label="Primary" className="hidden items-center gap-6 whitespace-nowrap xl:flex 2xl:gap-8">
          <A href="/weddings/" className={navLink(path === '/weddings/')} aria-current={path === '/weddings/' ? 'page' : undefined}>
            Weddings
          </A>
          <div ref={servicesRef} className="relative">
            <button type="button" aria-expanded={services} aria-controls="services-menu" onClick={() => setServices((v) => !v)} className={`${navLink(categories.some((c) => c.path === path))} flex items-center gap-1.5`}>
              Services <Icon.Chevron className={`size-3.5 transition-transform duration-300 ${services ? 'rotate-180' : ''}`} />
            </button>
            <div
              id="services-menu"
              inert={!services}
              className={`absolute top-full left-1/2 mt-5 w-[44rem] -translate-x-1/2 rounded-[2px] bg-ink-2 p-3 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] ring-1 ring-gold/20 backdrop-blur-xl transition-[opacity,transform] duration-300 ${services ? 'opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
            >
              <ul className="grid grid-cols-2 gap-1">
                {categories.map((c, i) => (
                  <li key={c.slug}>
                    <A href={c.path} onNavigate={close} className="group flex gap-4 rounded-[2px] p-3 transition-colors hover:bg-ivory/[0.05]">
                      <span className="pt-1 text-label text-gold">0{i + 1}</span>
                      <span>
                        <span className="block font-display text-[1.25rem] text-ivory group-hover:text-gold-2">{c.title}</span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-stone">{c.blurb}</span>
                      </span>
                    </A>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {nav.slice(1).map((item) => (
            <A key={item.href} href={item.href} className={navLink(path === item.href)} aria-current={path === item.href ? 'page' : undefined}>
              {item.label}
            </A>
          ))}
          <EnquiryLink count={enquiry.length} />
          <A href={planPath} className={`${btn.gold} min-h-11 px-5`}>
            Start planning
          </A>
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <EnquiryLink count={enquiry.length} />
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="menu"
            className="flex min-h-11 min-w-11 items-center justify-center gap-2 px-2 text-label uppercase"
          >
            {menu ? <Icon.Close className="size-5" /> : <span aria-hidden="true" className="flex w-5 flex-col gap-1.5"><span className="h-px bg-current" /><span className="h-px bg-current" /></span>}
            <span className="max-[380px]:sr-only">{menu ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      <div
        id="menu"
        inert={!menu}
        className={`fixed inset-0 -z-10 overflow-y-auto bg-ink/97 px-6 pt-24 pb-10 backdrop-blur-xl transition-opacity duration-300 xl:hidden ${menu ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          <A href="/weddings/" onNavigate={close} className="py-2 font-display text-[2rem] text-ivory">
            Weddings
          </A>
          <p className="mt-5 mb-2 text-label text-gold uppercase">Services</p>
          <ul className="grid grid-cols-2 gap-x-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <A href={c.path} onNavigate={close} className="block py-2.5 font-display text-[1.25rem] text-linen">
                  {c.title}
                </A>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col">
            {nav.slice(2).map((item) => (
              <A key={item.href} href={item.href} onNavigate={close} className="py-2 font-display text-[1.5rem] text-ivory">
                {item.label}
              </A>
            ))}
          </div>
          <div className="mt-8 grid gap-3">
            <A href={planPath} onNavigate={close} className={btn.gold}>
              Start planning
            </A>
            <a href={waLink()} target="_blank" rel="noopener" className={btn.ghost}>
              <Icon.WhatsApp className="size-4" /> WhatsApp us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

const navLink = (active: boolean) =>
  `relative py-2 text-label uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 ${
    active ? 'text-ivory after:scale-x-100' : 'text-ivory/75 after:scale-x-0 hover:text-ivory hover:after:scale-x-100'
  }`;

function EnquiryLink({count}: {count: number}) {
  if (!count) return null;
  return (
    <A href={planPath} className="flex min-h-11 items-center gap-2 px-2 text-label text-gold-2 uppercase" aria-label={`Your enquiry list: ${count} item${count === 1 ? '' : 's'}`}>
      <span className="hidden xl:inline">Enquiry</span>
      <span className="flex size-6 items-center justify-center rounded-full bg-gold text-[0.6875rem] tracking-normal text-ink tabular-nums">{count}</span>
    </A>
  );
}

/** A quiet, always-there WhatsApp button. */
export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat to us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_12px_30px_-8px_rgb(0_0_0/0.6)] transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-gold-2 sm:right-6 sm:bottom-6"
    >
      <Icon.WhatsApp className="size-6" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-ink px-4 pt-20 pb-28 sm:px-6 md:px-[6vw] md:pb-12">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr_0.9fr]">
        <div>
          <A href="/" className="inline-flex items-center gap-4" aria-label={`${brand.name} — home`}>
            <Seal className="size-16" />
            <span className="font-display text-[1.5rem] leading-tight text-ivory">
              The Wedding
              <br />
              Party Group
            </span>
          </A>
          <p className="mt-6 font-display text-[1.375rem] text-gold-2 italic">{brand.slogan}.</p>
          <p className="mt-2 text-label text-stone uppercase">{brand.tagline}</p>
        </div>

        <div>
          <p className="text-label text-gold uppercase">Visit</p>
          <address className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-linen not-italic">
            <a href={contact.maps} target="_blank" rel="noopener" className="flex gap-3 hover:text-ivory">
              <Icon.Pin className="mt-1 size-4 shrink-0 text-gold" />
              <span>
                {contact.address[0]}
                <br />
                {contact.address[1]}
              </span>
            </a>
            <p className="flex gap-3">
              <Icon.Clock className="mt-1 size-4 shrink-0 text-gold" />
              {contact.hours}
            </p>
          </address>
        </div>

        <div>
          <p className="text-label text-gold uppercase">Talk to us</p>
          <ul className="mt-4 space-y-3 text-[0.9375rem] text-linen">
            <li>
              <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-ivory">
                <Icon.WhatsApp className="size-4 text-gold" /> WhatsApp {contact.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 hover:text-ivory">
                <Icon.Phone className="size-4 text-gold" /> Call {contact.phoneLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 [overflow-wrap:anywhere] hover:text-ivory">
                <Icon.Mail className="size-4 shrink-0 text-gold" /> {contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={contact.instagram} target="_blank" rel="noopener" aria-label="Wedding Party on Instagram" className="flex size-11 items-center justify-center rounded-full ring-1 ring-gold/30 transition-colors hover:bg-gold hover:text-ink">
              <Icon.Instagram className="size-5" />
            </a>
            <a href={contact.facebook} target="_blank" rel="noopener" aria-label="Wedding Party on Facebook" className="flex size-11 items-center justify-center rounded-full ring-1 ring-gold/30 transition-colors hover:bg-gold hover:text-ink">
              <Icon.Facebook className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-label text-gold uppercase">Explore</p>
          <ul className="mt-4 grid gap-2 text-[0.9375rem] text-linen">
            <li>
              <A href="/weddings/" className="hover:text-ivory">Weddings</A>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <A href={c.path} className="hover:text-ivory">
                  {c.title}
                </A>
              </li>
            ))}
            <li>
              <A href={planPath} className="text-gold-2 hover:text-ivory">Start planning</A>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[0.75rem] tracking-[0.12em] text-stone uppercase md:flex-row md:items-center md:justify-between">
        <span>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {brand.name} · Pretoria
        </span>
        <span>Established {brand.established}</span>
      </div>
    </footer>
  );
}
