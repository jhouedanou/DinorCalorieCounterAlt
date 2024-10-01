import {ref,onMounted} from 'vue'
export function useAjr(){
    const ajr = ref([])
    const isLoading = ref(true)
    const error = ref(null)

const fetchAjr = async()=>{
    try{
        isLoading.value=true
        error.value = null
        const response = await fetch('/api/ajr.json')
        if(!response.ok) throw new Error('Erreur de chargement des ajr')
            const data = await response.json()
        console.log('Données reçues:', data)
        ajr.value = data.ajr
        console.log('Ajr chargés:', ajr.value)
    }catch{
        console.error('Erreur lors du chargement:', e)
        error.value = e.message
    }finally{
        isLoading.value = false
    }
}
onMounted(()=>fetchAjr())
return {
    ajr,
    isLoading,
    error,
    fetchAjr
}
}