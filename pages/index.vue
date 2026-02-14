<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-package-variant</v-icon>
            Prodotti
          </v-card-title>
          <v-card-text class="text-h4">
            {{ inventoryStore.products.length }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-shape</v-icon>
            Categorie
          </v-card-title>
          <v-card-text class="text-h4">
            {{ inventoryStore.categories.length }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon start>mdi-currency-eur</v-icon>
            Valore Inventario
          </v-card-title>
          <v-card-text class="text-h4">
            {{ inventoryStore.totalValue.toFixed(2) }} &euro;
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card title="Categorie in uso">
          <v-card-text>
            <v-chip v-for="cat in inventoryStore.availableCategories" :key="cat" class="ma-1">
              {{ cat }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card title="Fornitori attivi">
          <v-card-text>
            <v-chip v-for="sup in inventoryStore.availableSuppliers" :key="sup" class="ma-1">
              {{ sup }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from '~/stores/inventory'
import { useTitle } from '~/composables/useTitle'

useTitle('Dashboard')

const inventoryStore = useInventoryStore()

onMounted(async () => {
  await inventoryStore.fetchMultiple(['products', 'categories', 'suppliers'])
})
</script>
