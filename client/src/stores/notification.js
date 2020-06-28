import { writable } from 'svelte/store'

const { subscribe, update } = writable({
  value: false,
  message: '',
  type: 'info'
})

export default {
  subscribe,
  show: ({ message, type }) => {
    console.log('showing notif')
    update(obj => ({
      value: true,
      message,
      type
    }))
    setTimeout(() => {
      update(obj => ({
        ...obj,
        value: false
      }))
    }, 5000)
  }
}
