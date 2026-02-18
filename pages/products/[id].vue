<template>
  <EntityDetailPage
    ref="page"
    :title="product?.name || 'Prodotto'"
    icon="mdi-package-variant"
    :saving="saving"
    @back="goBack"
    @save="handleSave"
    @export="handleExport"
  >
    <template #info-fields>
      <v-text-field v-model="product.name" label="Nome" variant="outlined" density="compact" />
      <v-select v-model="product.category" :items="categories" label="Categoria" variant="outlined" density="compact" />
      <v-text-field v-model.number="product.quantity" label="Quantita" type="number" variant="outlined" density="compact" />
      <v-text-field v-model.number="product.price" label="Prezzo" type="number" prefix="€" variant="outlined" density="compact" />
    </template>

    <template #extra-tabs>
      <v-tab value="stock">Storico Giacenza</v-tab>
    </template>

    <template #extra-tab-items>
      <v-window-item value="stock">
        <v-card-text>
          <p class="text-medium-emphasis">Storico movimenti giacenza (placeholder)</p>
        </v-card-text>
      </v-window-item>
    </template>
  </EntityDetailPage>
</template>

<script setup lang="ts">
import EntityDetailPage from '~/components/EntityDetailPage.vue'
import { useEntityDetail, loadFieldOptions } from '~/composables/useEntityDetail'
import { downloadJson } from '~/helpers/fileDownload'

const { appStore, mockApi, code, goBack } = useEntityDetail('products')

appStore.setTitle('Prodotti / Dettaglio')

const product = ref({ name: '', category: '', supplier: '', quantity: 0, price: 0 })
const categories = ref<string[]>([])
const saving = ref(false)
const page = ref()

onMounted(async () => {
  categories.value = await loadFieldOptions(mockApi.categories.getAll, 'name')
  const all = await mockApi.products.getAll()
  const found = all.find(p => p.id === code.value)
  if (found) product.value = { ...found }
})

async function handleSave() {
  saving.value = true
  await new Promise(r => setTimeout(r, 500))
  saving.value = false
  page.value?.showSuccess('Prodotto salvato')
}

function handleExport() {
  downloadJson(product.value, `product-${code.value}.json`)
}
</script>
