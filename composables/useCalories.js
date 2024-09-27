import {ref,onMounted} from 'vue'
export function useCalories(){
    const aliments = ref([])
    const isLoading = ref(true)
    const error = ref(null)

    const fetchAliments = async () => {
        try {
            console.log('Début du chargement des aliments')
            isLoading.value = true
            error.value = null
            const response = await fetch('/api/calories.json')
            console.log('Réponse reçue:', response)
            if (!response.ok) throw new Error('Erreur de chargement des aliments')
            const data = await response.json()
            console.log('Données reçues:', data)
            aliments.value = data.aliments
            console.log('Aliments chargés:', aliments.value)
        } catch (e) {
            console.error('Erreur lors du chargement:', e)
            error.value = e.message
        } finally {
            isLoading.value = false
        }
    }
    onMounted(()=>fetchAliments())

    return {
        aliments,
        isLoading,
        error,
        fetchAliments

    }
}
