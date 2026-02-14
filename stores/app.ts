import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    title: '' as string,
    drawer: true as boolean,
    loading: false as boolean
  }),

  actions: {
    setTitle(title: string) {
      this.title = title
    },
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    setLoading(value: boolean) {
      this.loading = value
    }
  }
})
