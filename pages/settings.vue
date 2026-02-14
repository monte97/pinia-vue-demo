<template>
  <div>
    <v-card>
      <v-card-title>Preferenze</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              :model-value="preferencesStore.itemsPerPage"
              @update:model-value="preferencesStore.setItemsPerPage($event)"
              :items="[5, 10, 25, 50]"
              label="Elementi per pagina"
              variant="outlined"
              density="compact"
            />
          </v-col>
        </v-row>

        <v-switch
          :model-value="preferencesStore.darkMode"
          @update:model-value="preferencesStore.toggleDarkMode()"
          label="Tema scuro"
          color="primary"
        />

        <v-switch
          :model-value="preferencesStore.compactView"
          @update:model-value="preferencesStore.toggleCompactView()"
          label="Vista compatta tabelle"
          color="primary"
        />
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>Info Persistenza</v-card-title>
      <v-card-text>
        <v-alert type="info" variant="tonal" class="mb-2">
          Le preferenze sono salvate in <strong>localStorage</strong> e sopravvivono alla chiusura del browser.
        </v-alert>
        <v-alert type="info" variant="tonal">
          I filtri prodotti sono in <strong>sessionStorage</strong> e si resettano chiudendo il tab.
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { usePreferencesStore } from '~/stores/preferences'
import { useTitle } from '~/composables/useTitle'

useTitle('Impostazioni')

const preferencesStore = usePreferencesStore()
</script>
