<template>
  <v-container>
    <v-btn variant="text" prepend-icon="mdi-arrow-left" class="mb-4" @click="$emit('back')">
      Torna alla lista
    </v-btn>

    <v-card>
      <v-card-title>
        <v-icon :icon="icon" class="mr-2" />
        {{ title }}
      </v-card-title>

      <v-tabs v-model="tab">
        <v-tab value="info">Info</v-tab>
        <slot name="extra-tabs" />
        <v-tab value="export">Export</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="info">
          <v-card-text>
            <slot name="info-fields" />
            <v-btn
              color="primary"
              class="mt-4"
              :loading="saving"
              @click="$emit('save')"
            >
              Salva
            </v-btn>
          </v-card-text>
        </v-window-item>

        <slot name="extra-tab-items" />

        <v-window-item value="export">
          <v-card-text>
            <v-btn
              prepend-icon="mdi-download"
              variant="outlined"
              @click="$emit('export')"
            >
              Esporta JSON
            </v-btn>
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  saving?: boolean
}>()

defineEmits<{
  back: []
  save: []
  export: []
}>()

const tab = ref('info')
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

function showSuccess(msg: string) {
  snackbarText.value = msg
  snackbarColor.value = 'success'
  snackbar.value = true
}

function showError(msg: string) {
  snackbarText.value = msg
  snackbarColor.value = 'error'
  snackbar.value = true
}

defineExpose({ showSuccess, showError })
</script>
