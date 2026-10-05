import {useEffect, useRef, useState, type FormEvent, type ReactNode} from 'react';
import {contact, plan, waLink} from '../content';
import {rentals} from '../data/rentals';
import {useReveals} from '../hooks/useReveals';
import {clearItems, removeItem, useEnquiry} from '../lib/enquiry';
import {A, Eyebrow, Icon, btn} from './ui';

type Errors = Partial<Record<'name' | 'phone' | 'email', string>>;
type Status = {kind: 'idle' | 'invalid' | 'sent'; via?: 'whatsapp' | 'email'};

function useCountdown(date: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!date) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [date]);
  if (!date) return null;
  const ms = Math.max(0, new Date(`${date}T00:00:00`).getTime() - now);
  const s = Math.floor(ms / 1000);
  return {d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60};
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});

/**
 * Start planning. The countdown on the left ticks toward the visitor's own
 * date once they choose it; the form on the right composes a message for
 * WhatsApp (how most clients reach the business) or email. There is no
 * backend — nothing is sent until the visitor presses send in their own app.
 */
export function Plan({standalone = false}: {standalone?: boolean}) {
  const ref = useReveals<HTMLElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({kind: 'idle'});
  const t = useCountdown(date);
  const skus = useEnquiry();
  const items = skus.map((sku) => rentals.find((r) => r.sku === sku)).filter((r) => r !== undefined);

  // Today as the earliest date — set after mount so the pre-rendered HTML doesn't fix a stale day.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toISOString().slice(0, 10);
  }, []);

  const openPicker = () => {
    const input = dateRef.current;
    if (!input) return;
    input.focus();
    try {
      input.showPicker();
    } catch {
      /* older Safari: focusing the field is enough */
    }
  };

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    if (!String(data.get('name') ?? '').trim()) e.name = 'Please tell us your name.';
    const phone = String(data.get('phone') ?? '').replace(/\D/g, '');
    if (phone.length < 9) e.phone = 'Please add a phone or WhatsApp number we can reach you on (at least 9 digits).';
    const email = String(data.get('email') ?? '').trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email address doesn’t look complete — check for the @ and the domain.';
    return e;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const via = submitter?.value === 'email' ? 'email' : 'whatsapp';
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const first = (['name', 'phone', 'email'] as const).find((k) => found[k]);
    if (first) {
      setStatus({kind: 'invalid'});
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const get = (k: string) => String(data.get(k) ?? '').trim();
    const chosen = data.getAll('services').map(String);
    const lines = [
      `Name: ${get('name')}`,
      `Phone: ${get('phone')}`,
      get('email') && `Email: ${get('email')}`,
      `Event: ${get('type')}`,
      get('date') && `Date: ${formatDate(get('date'))}`,
      get('venue') && `Venue / area: ${get('venue')}`,
      get('guests') && `Guests: ${get('guests')}`,
      chosen.length > 0 && `Services: ${chosen.join(', ')}`,
      items.length > 0 && `Rental items (${items.length}):\n${items.map((r) => `• ${r.name} (${r.sku})`).join('\n')}`,
      get('message') && `\n${get('message')}`,
    ].filter(Boolean);
    const text = `Hello Wedding Party! I’d like to start planning.\n\n${lines.join('\n')}`;

    if (via === 'whatsapp') {
      window.open(waLink(text), '_blank', 'noopener');
    } else {
      const subject = `Enquiry: ${get('type')}${get('date') ? ` — ${formatDate(get('date'))}` : ''}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setStatus({kind: 'sent', via});
  };

  const field =
    'w-full rounded-[2px] bg-ivory/[0.04] px-4 py-3.5 text-[1rem] text-ivory ring-1 ring-ivory/15 outline-none transition-shadow placeholder:text-stone/70 focus:ring-gold aria-[invalid=true]:ring-[#e08a7a]';
  const label = 'mb-2 block text-label text-stone uppercase';
  const units: [string, number][] = t
    ? [
        ['Days', t.d],
        ['Hrs', t.h],
        ['Min', t.m],
        ['Sec', t.s],
      ]
    : [];

  const Heading = standalone ? 'h1' : 'h2';

  return (
    <section ref={ref} id="plan" aria-labelledby="plan-title" className={`relative overflow-hidden bg-ink px-4 pb-28 sm:px-6 md:px-[6vw] md:pb-40 ${standalone ? 'pt-32 md:pt-44' : ''}`}>
      {/* A low arch of candlelight at the bottom edge — the hero, bookended. */}
      <div aria-hidden="true" className="arch pointer-events-none absolute -bottom-[58vw] left-1/2 size-[90vw] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_30%,rgba(200,167,106,0.28),rgba(200,167,106,0.05)_55%,transparent_70%)]" />

      <div className={`relative grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16 ${standalone ? '' : 'border-t border-ivory/10 pt-20 md:pt-28'}`}>
        <div data-reveal>
          <Eyebrow>{plan.eyebrow}</Eyebrow>
          <Heading id="plan-title" tabIndex={standalone ? -1 : undefined} className="mt-5 font-display text-display text-ivory">
            Tell us about <em className="text-gold-2">your celebration.</em>
          </Heading>
          <p className="mt-5 max-w-[30rem] text-body text-linen">{plan.body}</p>

          <div className="mt-10">
            <p className="text-label text-stone uppercase">{date ? `Until ${formatDate(date)}` : plan.countdownLabel}</p>
            {t ? (
              <div className="mt-3 flex gap-2 md:gap-3" role="timer" aria-label={`${t.d} days, ${t.h} hours and ${t.m} minutes until your day`}>
                {units.map(([l, v]) => (
                  <div key={l} className="brackets min-w-[4.5rem] px-3 py-3 text-center text-gold/50 md:min-w-[5.5rem]">
                    <span className="block font-display text-[1.75rem] text-ivory tabular-nums md:text-[2.5rem]">{String(v).padStart(2, '0')}</span>
                    <span className="mt-1 block text-[0.6875rem] tracking-[0.18em] text-stone uppercase">{l}</span>
                  </div>
                ))}
              </div>
            ) : (
              <button type="button" onClick={openPicker} className="brackets mt-3 flex min-h-12 items-center gap-3 px-5 py-4 text-left text-gold/50">
                <span className="font-display text-[1.375rem] text-ivory italic">Choose your date</span>
                <Icon.Arrow className="size-4 text-gold" />
              </button>
            )}
          </div>

          <ul className="mt-12 space-y-4 text-[0.9375rem] text-linen">
            <li>
              <a href={waLink()} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-ivory">
                <Icon.WhatsApp className="size-5 text-gold" /> WhatsApp {contact.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 hover:text-ivory">
                <Icon.Phone className="size-5 text-gold" /> Call {contact.phoneLabel}
                <span className="text-stone">or {contact.phoneAltLabel}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-ivory">
                <Icon.Mail className="size-5 text-gold" /> {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon.Pin className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                {contact.address.join(', ')}
                <span className="block text-stone">Open {contact.hours}</span>
              </span>
            </li>
          </ul>
        </div>

        <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="plan-status" className="grid gap-4 sm:grid-cols-2" data-reveal style={{transitionDelay: '120ms'}}>
          <Field id="name" label="Your name" required error={errors.name} className="sm:col-span-2">
            <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} onInput={() => errors.name && setErrors({...errors, name: undefined})} />
          </Field>
          <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="082 000 0000" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} onInput={() => errors.phone && setErrors({...errors, phone: undefined})} />
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} onInput={() => errors.email && setErrors({...errors, email: undefined})} />
          </Field>
          <Field id="type" label="Occasion">
            <span className="relative block">
              <select id="type" name="type" defaultValue="Wedding" className={`${field} appearance-none pr-10`}>
                {plan.eventTypes.map((t) => (
                  <option key={t} value={t} className="bg-ink">
                    {t}
                  </option>
                ))}
              </select>
              <Icon.Chevron className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gold" />
            </span>
          </Field>
          <Field id="date" label="Date">
            <input ref={dateRef} id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} [color-scheme:dark]`} />
          </Field>
          <Field id="venue" label="Venue or area">
            <input id="venue" name="venue" autoComplete="off" placeholder="Venue name, or ‘still looking’" className={field} />
          </Field>
          <Field id="guests" label="Guests (approx.)">
            <input id="guests" name="guests" type="number" inputMode="numeric" min={1} placeholder="120" className={field} />
          </Field>

          <fieldset className="sm:col-span-2">
            <legend className={label}>What can we help with?</legend>
            <div className="flex flex-wrap gap-2">
              {plan.serviceOptions.map((s) => (
                <label key={s} className="relative">
                  <input type="checkbox" name="services" value={s} className="peer sr-only" />
                  <span className="flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-[0.875rem] text-linen ring-1 ring-ivory/15 transition-colors peer-checked:bg-gold peer-checked:text-ink peer-checked:ring-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-2 hover:ring-gold/60">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="sm:col-span-2">
            <p className={label}>Rental items</p>
            {items.length ? (
              <div className="rounded-[2px] p-4 ring-1 ring-gold/25">
                <ul className="flex flex-wrap gap-2">
                  {items.map((r) => (
                    <li key={r.sku} className="flex items-center gap-2 rounded-full bg-ivory/[0.06] py-1 pr-1 pl-1 text-[0.875rem] text-linen">
                      <img src={r.img} alt="" className="size-8 rounded-full object-cover" />
                      {r.name}
                      <button type="button" onClick={() => removeItem(r.sku)} aria-label={`Remove ${r.name}`} className="flex size-8 items-center justify-center rounded-full text-stone hover:bg-ivory/10 hover:text-ivory">
                        <Icon.Close className="size-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-4 text-label uppercase">
                  <A href="/rentals/#catalogue" className="text-gold-2 hover:text-ivory">Add more</A>
                  <button type="button" onClick={clearItems} className="text-stone hover:text-ivory">Clear list</button>
                </div>
              </div>
            ) : (
              <p className="text-[0.9375rem] text-stone">
                Nothing added yet. <A href="/rentals/#catalogue" className="text-gold-2 underline decoration-gold/40 underline-offset-4 hover:text-ivory">Browse the rentals catalogue</A> and tap “Add to enquiry” on anything you like.
              </p>
            )}
          </div>

          <Field id="message" label="Anything else?" className="sm:col-span-2">
            <textarea id="message" name="message" rows={4} placeholder="Your colours, your theme, a picture you love — or simply what you have in mind." className={`${field} resize-y`} />
          </Field>

          <div className="mt-2 grid gap-3 sm:col-span-2 sm:grid-cols-2">
            <button type="submit" name="via" value="whatsapp" className={btn.gold}>
              <Icon.WhatsApp className="size-4" /> Send on WhatsApp
            </button>
            <button type="submit" name="via" value="email" className={btn.ghost}>
              <Icon.Mail className="size-4" /> Send by email
            </button>
          </div>
          <p id="plan-status" role="status" className="min-h-[1.5rem] text-[0.875rem] text-linen sm:col-span-2">
            {status.kind === 'invalid' && 'A couple of details need attention — see the highlighted fields.'}
            {status.kind === 'sent' && status.via === 'whatsapp' && `WhatsApp should now be open with your message ready — just press send. If it didn’t open, message us on ${contact.whatsappLabel}.`}
            {status.kind === 'sent' && status.via === 'email' && `Your email app should now be open with your enquiry drafted. If not, write to ${contact.email}.`}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({id, label, required, error, className = '', children}: {id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-label text-stone uppercase">
        {label}
        {required && (
          <span className="text-gold" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[0.875rem] text-[#f0a596]">
          {error}
        </p>
      )}
    </div>
  );
}
