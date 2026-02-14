import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockApi } from '~/helpers/mockApi'
import type { Product, Category, Supplier } from '~/helpers/mockData'

export type InventoryEntityType = 'products' | 'categories' | 'suppliers'

export const useInventoryStore = defineStore('inventory', () => {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const suppliers = ref<Supplier[]>([])

  const loaded: Record<InventoryEntityType, boolean> = {
    products: false,
    categories: false,
    suppliers: false
  }

  const loading = ref<Record<InventoryEntityType, boolean>>({
    products: false,
    categories: false,
    suppliers: false
  })

  const pendingRequests: Partial<Record<InventoryEntityType, Promise<any[]>>> = {}

  const entityRefs: Record<InventoryEntityType, typeof products> = {
    products,
    categories,
    suppliers
  }

  const apiFns: Record<InventoryEntityType, () => Promise<any[]>> = {
    products: () => mockApi.products.getAll(),
    categories: () => mockApi.categories.getAll(),
    suppliers: () => mockApi.suppliers.getAll()
  }

  async function fetchEntities(type: InventoryEntityType, force = false): Promise<any[]> {
    if (loaded[type] && !force) {
      return entityRefs[type].value
    }

    if (pendingRequests[type]) {
      return pendingRequests[type]!
    }

    loading.value[type] = true
    const promise = apiFns[type]()
      .then((response) => {
        entityRefs[type].value = response || []
        loaded[type] = true
        return entityRefs[type].value
      })
      .finally(() => {
        delete pendingRequests[type]
        loading.value[type] = false
      })

    pendingRequests[type] = promise
    return promise
  }

  function invalidate(type: InventoryEntityType) {
    loaded[type] = false
  }

  async function refresh(type: InventoryEntityType): Promise<any[]> {
    invalidate(type)
    return fetchEntities(type, true)
  }

  async function fetchMultiple(types: InventoryEntityType[]): Promise<void> {
    await Promise.all(types.map(t => fetchEntities(t)))
  }

  const availableCategories = computed(() => {
    return [...new Set(products.value.map(p => p.category).filter(Boolean))]
  })

  const availableSuppliers = computed(() => {
    return [...new Set(products.value.map(p => p.supplier).filter(Boolean))]
  })

  const totalValue = computed(() => {
    return products.value.reduce((sum, p) => sum + p.quantity * p.price, 0)
  })

  return {
    products, categories, suppliers, loading,
    fetchEntities, invalidate, refresh, fetchMultiple,
    availableCategories, availableSuppliers, totalValue
  }
})
