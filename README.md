# The Wedding Party Group — website

Vite + React + TypeScript, Tailwind CSS v4, Lenis smooth scrolling. No backend:
enquiries are composed into WhatsApp or email on the visitor's own device.

```bash
npm install
npm run dev      # http://localhost:3006
npm run lint     # type-check
npm run build    # static site in dist/, every page pre-rendered
```

## Hosting

`dist/` is a plain static site — upload it to any static host (Netlify,
Vercel, Cloudflare Pages, cPanel). Each page is a real file
(`/weddings/index.html`, `/rentals/index.html` …), and `404.html` handles
unknown addresses. `sitemap.xml` and `robots.txt` are generated for
`https://weddingparty.co.za`; change `SITE` in `scripts/prerender.mjs` and
`brand.url` in `src/content.ts` if the domain differs.

## Where things live

| What | File |
| --- | --- |
| Every word, contact detail, page title and description | `src/content.ts` |
| Rental catalogue (233 items) | `src/data/rentals.ts` + `public/media/rentals/` |
| Photographs | `public/media/photos/` (WebP) |
| Logo crest, seal, favicon, social card | `public/media/brand/`, `public/favicon.png`, `public/media/og.jpg` |
| Colours and type | `@theme` block in `src/index.css` |

To swap a photo, replace the WebP in `public/media/photos/` keeping the
name, or point `content.ts` at a new file. The hero photo is
`hero-lakeside-table.webp`; a 2000px+ original would let it run larger.

## How the scroll scenes work

One `requestAnimationFrame` loop (`src/lib/scroll.ts`) advances Lenis, then
each pinned scene reads its own scroll progress and writes styles directly —
nothing re-renders while scrolling. Timings are documented at the top of
each scene: `Unveil.tsx` (hero), `Roof.tsx` (department reel),
`Journey.tsx` (the drawn path), `Heritage.tsx` (the year ruler).
