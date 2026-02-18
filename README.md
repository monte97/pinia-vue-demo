# Nuxt 3 Pinia Patterns

Demo app che accompagna l'articolo "Da EventBus a Pinia — migrazione progressiva dello stato in Vue 3".

Mostra 4 pattern di Pinia store in un'app inventario minimale.

## Quick start

```bash
npm install
npm run dev
```

## Store e Pattern

| Store | API Style | Persistenza | Pattern |
|-------|-----------|-------------|---------|
| `stores/app.ts` | Options API | Nessuna | UI state globale (rimpiazza EventBus) |
| `stores/inventory.ts` | Composition API | In-memory cache | Cache + request deduplication |
| `stores/filters.ts` | Composition API | sessionStorage | Filtri che sopravvivono alla navigazione |
| `stores/preferences.ts` | Composition API | localStorage | Preferenze utente persistenti |

## Pagine

- **Dashboard** (`/`) — Overview inventario, usa computed aggregati dallo store
- **Prodotti** (`/products`) — Lista CRUD con filtri persistenti e cache invalidation
- **Impostazioni** (`/settings`) — Preferenze con localStorage
- **Dettaglio Prodotto** (`/products/:id`) — Usa composable + wrapper + utility (DRY patterns)
- **Dettaglio Magazzino** (`/warehouses/:id`) — Variante semplice senza extra tab

## Pattern DRY (articolo "3 pattern per eliminare la duplicazione")

File aggiunti per dimostrare i pattern:

| File | Pattern |
|------|---------|
| `composables/useEntityDetail.ts` | Composable per setup condiviso |
| `components/EntityDetailPage.vue` | Wrapper component con slot |
| `helpers/fileDownload.ts` | Utility function estratta |
| `pages/products/[id].vue` | Pagina che usa tutti e 3 i pattern |
| `pages/warehouses/[id].vue` | Variante semplice (nessun extra tab) |
