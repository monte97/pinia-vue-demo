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
