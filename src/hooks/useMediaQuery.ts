import {useSyncExternalStore} from 'react';

/** Live media-query match. Always `false` while pre-rendering. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (fn) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', fn);
      return () => mq.removeEventListener('change', fn);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
