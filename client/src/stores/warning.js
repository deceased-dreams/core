import { writable } from 'svelte/store';

const { subscribe, set, update } = writable({
  value: false,
  message: '',
  on_next: null
});

export default {
  subscribe,
  show: ({ message, on_next }) => update(obj => ({ value: true, message, on_next })),
  hide: () => update(obj => ({...obj, value: false}))
};


