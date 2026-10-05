import {useSyncExternalStore, type MouseEvent} from 'react';
import {scrollToHash, scrollToY} from './scroll';

/**
 * A history-API router small enough to read in one sitting. Pages are real
 * URLs with trailing slashes (`/weddings/`), so the pre-rendered build serves
 * each one as `/weddings/index.html` from any static host.
 */

const listeners = new Set<() => void>();
let serverPath = '/';

export function setServerPath(path: string) {
  serverPath = path;
}

export function normalise(path: string) {
  const p = path.split(/[?#]/)[0] || '/';
  return p.endsWith('/') ? p : `${p}/`;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  const onPop = () => fn();
  window.addEventListener('popstate', onPop);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('popstate', onPop);
  };
}

const currentPath = () => normalise(window.location.pathname);

export function usePath() {
  return useSyncExternalStore(
    subscribe,
    currentPath,
    // Hydration reads this too: in the browser it must be the real URL, or a
    // pre-rendered /rentals/ would hydrate against the home page.
    () => (typeof window === 'undefined' ? serverPath : currentPath()),
  );
}

export function navigate(href: string) {
  const url = new URL(href, window.location.href);
  const samePage = normalise(url.pathname) === normalise(window.location.pathname);
  if (samePage && url.hash) {
    scrollToHash(url.hash);
    history.replaceState(null, '', url.pathname + url.hash);
    return;
  }
  history.pushState(null, '', url.pathname + url.hash);
  listeners.forEach((fn) => fn());
  // Let the new page mount, then land on its hash (or its top).
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (!url.hash || !scrollToHash(url.hash, true)) scrollToY(0, true);
      document.querySelector<HTMLElement>('main h1')?.focus({preventScroll: true});
    }),
  );
}

/** onClick for in-site anchors: keeps modifier-clicks and new tabs native. */
export function linkClick(e: MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const a = e.currentTarget;
  const href = a.getAttribute('href');
  if (!href || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  if (/^(https?:|mailto:|tel:)/.test(href)) return;
  e.preventDefault();
  then?.();
  navigate(href);
}
