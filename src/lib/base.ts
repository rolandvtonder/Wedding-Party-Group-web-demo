/**
 * The site can live at a domain root (`/`) or under a sub-path such as
 * GitHub Pages' `/Wedding-Party-Group-web-demo/`. Vite's `base` (set from
 * BASE_PATH at build time) arrives here as BASE_URL, always with a trailing
 * slash. Content and routes are written root-relative (`/weddings/`); these
 * helpers translate at the edges.
 */

export const BASE = import.meta.env.BASE_URL;

/** `/media/x.webp` → `/sub/media/x.webp`. Leaves `#hash`, `https:` etc. alone. */
export const withBase = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? BASE + path.slice(1) : path);

/** `/sub/weddings/` → `/weddings/`. */
export const stripBase = (path: string) => (BASE !== '/' && path.startsWith(BASE) ? `/${path.slice(BASE.length)}` : path);
