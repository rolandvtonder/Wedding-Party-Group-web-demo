import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {brand, contact, routes, routeMeta} from './content';
import {setServerPath} from './lib/router';

/**
 * Build-time renderer: scripts/prerender.mjs calls `render` once per route and
 * writes the HTML into dist/<route>/index.html, so every page is real,
 * indexable HTML before any JavaScript runs.
 */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export {routes};

export function render(path: string) {
  setServerPath(path);
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  const known = routes.some((r) => r.path === path);
  const meta = known ? routeMeta(path) : {title: `Page not found | ${brand.name}`, description: routeMeta('/').description};
  const url = `${brand.url}${path}`;
  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    known ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    path === '/' ? `<link rel="preload" as="image" href="/media/brand/crest.webp" fetchpriority="high" />` : '',
    path === '/' ? `<link rel="preload" as="image" href="/media/photos/hero-lakeside-table.webp" fetchpriority="high" />` : '',
    path === '/' ? `<script type="application/ld+json">${JSON.stringify(localBusiness).replace(/</g, '\\u003c')}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
  return {html, head};
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: brand.name,
  alternateName: brand.short,
  description: 'Full-service wedding and event specialists: décor, flowers, furniture, rentals, stationery, printing and event management.',
  slogan: brand.slogan,
  url: `${brand.url}/`,
  logo: `${brand.url}/media/brand/seal.webp`,
  image: `${brand.url}/media/og.jpg`,
  foundingDate: String(brand.established),
  telephone: contact.phone,
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address[0],
    addressLocality: 'Pretoria',
    addressRegion: 'Gauteng',
    postalCode: '0081',
    addressCountry: 'ZA',
  },
  areaServed: 'Pretoria',
  sameAs: [contact.facebook, contact.instagram],
};
