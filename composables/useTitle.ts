import { useAppStore } from '~/stores/app'

export function useTitle(title: string) {
  const appStore = useAppStore()
  onMounted(() => appStore.setTitle(title))
  return { setTitle: (t: string) => appStore.setTitle(t) }
}
