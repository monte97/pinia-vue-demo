import { useAppStore } from '~/stores/app'
import { useInventoryStore } from '~/stores/inventory'
import { mockApi } from '~/helpers/mockApi'

export function useEntityDetail(entityType: string) {
  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()
  const inventoryStore = useInventoryStore()

  const code = computed(() => route.params.id as string)

  function goBack() {
    router.push(`/${entityType}`)
  }

  return {
    route,
    router,
    appStore,
    inventoryStore,
    mockApi,
    code,
    goBack
  }
}

export async function loadFieldOptions(
  fetchFn: () => Promise<Array<Record<string, any>>>,
  fieldName: string
): Promise<string[]> {
  try {
    const items = await fetchFn()
    return [...new Set(items.map(item => item[fieldName]).filter(Boolean))]
  } catch {
    return []
  }
}
