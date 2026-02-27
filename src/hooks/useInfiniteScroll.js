import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useInfiniteScroll(fetchFn, _options = {}) {
  const page = ref(0)
  const list = ref([])
  const loading = ref(false)
  const hasMore = ref(true)
  const loadMoreRef = ref(null)

  let observer = null

  const load = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true

    try {
      const res = await fetchFn(page.value)

      list.value.push(...res.list)
      hasMore.value = res.hasMore

      if (res.hasMore) page.value++
    } finally {
      loading.value = false
    }
  }

  const setupObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          load()
        }
      },
      {
        rootMargin: '200px',
      },
    )

    if (loadMoreRef.value) observer.observe(loadMoreRef.value)
  }

  const reset = () => {
    page.value = 0
    list.value = []
    hasMore.value = true
    load()
  }

  onMounted(async () => {
    await load()
    nextTick(setupObserver)
  })

  onUnmounted(() => observer?.disconnect())

  return {
    list,
    loading,
    hasMore,
    loadMoreRef,
    load,
    reset,
  }
}
