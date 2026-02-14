<template>
  <v-app :theme="preferencesStore.darkMode ? 'dark' : 'light'">
    <v-app-bar>
      <v-app-bar-nav-icon @click="appStore.toggleDrawer()" />
      <v-app-bar-title>{{ appStore.title || 'Inventory Manager' }}</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="appStore.drawer">
      <v-list nav>
        <v-list-item
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :prepend-icon="link.icon"
          :title="link.title"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-overlay v-model="appStore.loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-app>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import { usePreferencesStore } from '~/stores/preferences'

const appStore = useAppStore()
const preferencesStore = usePreferencesStore()

const links = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Prodotti', icon: 'mdi-package-variant', to: '/products' },
  { title: 'Impostazioni', icon: 'mdi-cog', to: '/settings' },
]
</script>
