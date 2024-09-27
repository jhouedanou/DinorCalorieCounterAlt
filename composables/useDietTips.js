import { ref, onMounted } from 'vue'

export function useDietTips() {
  const tips = ref([])

  onMounted(async () => {
    const response = await fetch('/api/diet.json')
    tips.value = await response.json()
  })

  return { tips }
}
