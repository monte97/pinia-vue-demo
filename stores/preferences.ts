import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  const itemsPerPage = ref(10)
  const darkMode = ref(false)
  const compactView = ref(false)

  function setItemsPerPage(n: number) {
    itemsPerPage.value = n || 10
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
  }

  function toggleCompactView() {
    compactView.value = !compactView.value
  }

  return { itemsPerPage, darkMode, compactView, setItemsPerPage, toggleDarkMode, toggleCompactView }
}, {
  persist: {
    storage: localStorage,
    pick: ['itemsPerPage', 'darkMode', 'compactView']
  }
})
