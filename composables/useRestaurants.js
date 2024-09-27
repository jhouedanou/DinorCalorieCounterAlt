import { ref, onMounted } from 'vue'

export function useRestaurants() {
  const restaurants = ref([])
  const isLoading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const response = await fetch('/api/restaurants.json')
      const data = await response.json()
      restaurants.value = data.restaurants
      isLoading.value = false
    } catch (e) {
      error.value = e
      isLoading.value = false
    }
  })

  return { restaurants, isLoading, error }
}