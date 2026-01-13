import { writable } from 'svelte/store';

export type Locale = 'th' | 'en';

export const locale = writable<Locale>('th');

export const t = writable((key: string) => key); // Mock translation function
