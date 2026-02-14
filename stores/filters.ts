import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  const category = ref('')
  const supplier = ref('')
  const search = ref('')
  const minQuantity = ref<number | null>(null)

  function updateFilters(filters: Partial<{
    category: string
    supplier: string
    search: string
    minQuantity: number | null
  }>) {
    if (filters.category !== undefined) category.value = filters.category
    if (filters.supplier !== undefined) supplier.value = filters.supplier
    if (filters.search !== undefined) search.value = filters.search
    if (filters.minQuantity !== undefined) minQuantity.value = filters.minQuantity
  }

  function resetFilters() {
    category.value = ''
    supplier.value = ''
    search.value = ''
    minQuantity.value = null
  }

  const hasActiveFilters = computed(() => {
    return !!(category.value || supplier.value || search.value || minQuantity.value)
  })

  return { category, supplier, search, minQuantity, updateFilters, resetFilters, hasActiveFilters }
}, {
  persist: {
    storage: sessionStorage,
    pick: ['category', 'supplier', 'search', 'minQuantity']
  }
})
