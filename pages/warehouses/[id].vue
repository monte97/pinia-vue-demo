<template>
  <EntityDetailPage
    ref="page"
    :title="warehouse.name || 'Magazzino'"
    icon="mdi-warehouse"
    :saving="saving"
    @back="goBack"
    @save="handleSave"
    @export="handleExport"
  >
    <template #info-fields>
      <v-text-field v-model="warehouse.name" label="Nome" variant="outlined" density="compact" />
      <v-text-field v-model="warehouse.city" label="Citta" variant="outlined" density="compact" />
      <v-text-field v-model="warehouse.address" label="Indirizzo" variant="outlined" density="compact" />
    </template>
  </EntityDetailPage>
</template>

<script setup lang="ts">
import EntityDetailPage from '~/components/EntityDetailPage.vue'
import { useEntityDetail } from '~/composables/useEntityDetail'
import { downloadJson } from '~/helpers/fileDownload'

const { appStore, code, goBack } = useEntityDetail('warehouses')

appStore.setTitle('Magazzini / Dettaglio')

const warehouse = ref({ name: '', city: '', address: '' })
const saving = ref(false)
const page = ref()

onMounted(() => {
  warehouse.value = { name: `Magazzino ${code.value}`, city: 'Milano', address: 'Via Roma 1' }
})

async function handleSave() {
  saving.value = true
  await new Promise(r => setTimeout(r, 500))
  saving.value = false
  page.value?.showSuccess('Magazzino salvato')
}

function handleExport() {
  downloadJson(warehouse.value, `warehouse-${code.value}.json`)
}
</script>
