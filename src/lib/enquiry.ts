import {useSyncExternalStore} from 'react';

/**
 * The visitor's enquiry list: rental items they've marked on the catalogue,
 * carried into the Start Planning form. Kept in localStorage so it survives
 * moving between pages; it is a convenience, never the source of a booking.
 */

const KEY = 'wpg-enquiry';
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: the list still works for this page view */
  }
  listeners.forEach((fn) => fn());
}

export function toggleItem(sku: string) {
  const list = read();
  write(list.includes(sku) ? list.filter((s) => s !== sku) : [...list, sku]);
}

export function removeItem(sku: string) {
  write(read().filter((s) => s !== sku));
}

export function clearItems() {
  write([]);
}

export function useEnquiry(): string[] {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    read,
    () => EMPTY,
  );
}
