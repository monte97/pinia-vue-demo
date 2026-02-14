<template>
  <div>
    <!-- Filters bar -->
    <v-card class="mb-4" variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="filtersStore.search"
              label="Cerca"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filtersStore.category"
              :items="inventoryStore.availableCategories"
              label="Categoria"
              variant="outlined"
              density="compact"
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filtersStore.supplier"
              :items="inventoryStore.availableSuppliers"
              label="Fornitore"
              variant="outlined"
              density="compact"
              clearable
              hide-details
            />
          </v-col>
          <v-col cols="12" md="3" class="d-flex align-center">
            <v-btn
              v-if="filtersStore.hasActiveFilters"
              variant="text"
              prepend-icon="mdi-filter-remove"
              @click="filtersStore.resetFilters()"
            >
              Reset filtri
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Data table -->
    <v-data-table
      :headers="headers"
      :items="filteredProducts"
      :items-per-page="preferencesStore.itemsPerPage"
      :loading="inventoryStore.loading.products"
      :density="preferencesStore.compactView ? 'compact' : 'default'"
    >
      <template #item.price="{ item }">
        {{ item.price.toFixed(2) }} &euro;
      </template>
      <template #item.actions="{ item }">
        <v-btn icon="mdi-delete" variant="text" size="small" @click="deleteProduct(item.id)" />
      </template>
    </v-data-table>

    <!-- FAB add -->
    <v-btn
      icon="mdi-plus"
      color="primary"
      position="fixed"
      location="bottom end"
      class="ma-4"
      size="large"
      @click="showAddDialog = true"
    />

    <!-- Add dialog -->
    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card title="Nuovo Prodotto">
        <v-card-text>
          <v-text-field v-model="newProduct.name" label="Nome" variant="outlined" density="compact" class="mb-2" />
          <v-select v-model="newProduct.category" :items="inventoryStore.availableCategories" label="Categoria" variant="outlined" density="compact" class="mb-2" />
          <v-select v-model="newProduct.supplier" :items="inventoryStore.availableSuppliers" label="Fornitore" variant="outlined" density="compact" class="mb-2" />
          <v-text-field v-model.number="newProduct.quantity" label="Quantita" type="number" variant="outlined" density="compact" class="mb-2" />
          <v-text-field v-model.number="newProduct.price" label="Prezzo" type="number" step="0.01" variant="outlined" density="compact" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showAddDialog = false">Annulla</v-btn>
          <v-btn color="primary" @click="addProduct">Salva</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from '~/stores/inventory'
import { useFiltersStore } from '~/stores/filters'
import { usePreferencesStore } from '~/stores/preferences'
import { useTitle } from '~/composables/useTitle'
import { mockApi } from '~/helpers/mockApi'

useTitle('Prodotti')

const inventoryStore = useInventoryStore()
const filtersStore = useFiltersStore()
const preferencesStore = usePreferencesStore()

const showAddDialog = ref(false)
const newProduct = ref({ name: '', category: '', supplier: '', quantity: 0, price: 0 })

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Categoria', key: 'category' },
  { title: 'Fornitore', key: 'supplier' },
  { title: 'Quantita', key: 'quantity' },
  { title: 'Prezzo', key: 'price' },
  { title: '', key: 'actions', sortable: false },
]

const filteredProducts = computed(() => {
  return inventoryStore.products.filter(p => {
    if (filtersStore.category && p.category !== filtersStore.category) return false
    if (filtersStore.supplier && p.supplier !== filtersStore.supplier) return false
    if (filtersStore.search && !p.name.toLowerCase().includes(filtersStore.search.toLowerCase())) return false
    if (filtersStore.minQuantity && p.quantity < filtersStore.minQuantity) return false
    return true
  })
})

async function addProduct() {
  await mockApi.products.create(newProduct.value)
  inventoryStore.invalidate('products')
  await inventoryStore.refresh('products')
  showAddDialog.value = false
  newProduct.value = { name: '', category: '', supplier: '', quantity: 0, price: 0 }
}

async function deleteProduct(id: string) {
  await mockApi.products.delete(id)
  inventoryStore.invalidate('products')
  await inventoryStore.refresh('products')
}

onMounted(async () => {
  await inventoryStore.fetchMultiple(['products', 'categories', 'suppliers'])
})
</script>
