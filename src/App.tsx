import {useEffect} from 'react';
import {Footer, Header, WhatsAppFloat} from './components/Chrome';
import {CtaBand} from './components/PageParts';
import {Plan} from './components/Plan';
import {A, btn} from './components/ui';
import {categories, routeMeta} from './content';
import {useReducedMotion} from './hooks/useReducedMotion';
import {usePath} from './lib/router';
import {startScroll} from './lib/scroll';
import {Home} from './pages/Home';
import {Service} from './pages/Service';
import {Quote, Weddings} from './pages/Weddings';

export default function App() {
  const reduced = useReducedMotion();
  const path = usePath();
  useEffect(() => startScroll(reduced), [reduced]);

  // Keep the tab title and description in step with the page.
  useEffect(() => {
    const meta = routeMeta(path);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [path]);

  return (
    <>
      <Header />
      <main id="main">
        <Page path={path} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export function Page({path}: {path: string}) {
  if (path === '/') return <Home />;
  if (path === '/weddings/') return <Weddings />;
  if (path === '/start-planning/')
    return (
      <>
        <Plan standalone />
        <Quote />
      </>
    );
  const cat = categories.find((c) => c.path === path);
  if (cat) return <Service key={cat.slug} slug={cat.slug} />;
  return <NotFound />;
}

function NotFound() {
  return (
    <>
      <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 pt-32 text-center">
        <p className="font-script text-[3.5rem] leading-none text-gold">Oh dear</p>
        <h1 tabIndex={-1} className="mt-4 font-display text-display text-ivory">
          This page has wandered off.
        </h1>
        <p className="mt-4 max-w-[30rem] text-body text-linen">The address may have changed with our new website. Everything is still here — start from the beginning.</p>
        <A href="/" className={`${btn.gold} mt-10`}>
          Back to the home page
        </A>
      </section>
      <CtaBand />
    </>
  );
}
