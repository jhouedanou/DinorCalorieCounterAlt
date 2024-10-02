<template>
    <div class="mado squidgame">
        <div class="mirro p-4">

            <div v-if="etape === 1">
                <h2 class="title">Nom de la recette</h2>
                <input class="mouz" v-model="nomRecette" placeholder="Entrez le nom de votre recette">
                <button class="netflox" @click="etape = 2">Suivant</button>
            </div>

            <div v-if="etape === 2">
                <h2 class="title">Sélection des ingrédients</h2>
                <div class="search-container">
                    <input v-model="searchTerm" placeholder="Rechercher un ingrédient" class="search-input">
                </div>


                <div class="ingredients-grid container columns is-mobile is-multiline">
                    <div class="column is-6" v-for="ingredient in filteredIngredients" :key="ingredient.nom">
                        <div class="ingredient-item">
                            <label class="ingredient-label mouff">
                                <input type="checkbox" v-model="ingredientsSelectionnes" :value="ingredient"
                                    class="emoji-checkbox">
                                <span class="emoji-icon">{{ ingredient.icone }}</span>
                                <p class="zagba">{{ ingredient.nom }}</p>
                                <p class="lerequin">{{ ingredient.calories }} cal</p>
                            </label>
                            <input v-model="portions[ingredient.nom]" type="number" min="1"
                                :disabled="!ingredientsSelectionnes.includes(ingredient)">
                        </div>

                    </div>
                </div>
                <button class="netflox" @click="calculerCalories">Calculer les calories</button>
            </div>

            <div v-if="etape === 3">
                <h2 class="title">Résultat</h2>
                <p>Recette : {{ nomRecette }}</p>
                <p>Nombre total de calories : {{ totalCalories }}</p>
                <button class="netflox" @click="reinitialiser">Nouvelle recette</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
    setup() {
        const etape = ref(1)
        const nomRecette = ref('')
        const ingredients = ref([])
        const ingredientsSelectionnes = ref([])
        const portions = ref({})
        const totalCalories = ref(0)
        const searchTerm = ref('')

        const filteredIngredients = computed(() => {
            return ingredients.value.filter(ingredient =>
                ingredient.nom.toLowerCase().includes(searchTerm.value.toLowerCase())
            )
        })
        const calculerCalories = () => {
            totalCalories.value = ingredientsSelectionnes.value.reduce((total, ingredient) => {
                return total + ingredient.calories * (portions.value[ingredient.nom] || 1)
            }, 0)
            etape.value = 3
        }

        const reinitialiser = () => {
            etape.value = 1
            nomRecette.value = ''
            ingredientsSelectionnes.value = []
            portions.value = {}
            totalCalories.value = 0
        }

        // Charger les ingrédients depuis le fichier JSON
        fetch('/api/calories.json')
            .then(response => response.json())
            .then(data => {
                ingredients.value = data.aliments.flatMap(aliment => aliment.ingredients)
            })

        return {
            etape,
            nomRecette,
            ingredients,
            ingredientsSelectionnes,
            portions,
            totalCalories,
            calculerCalories,
            reinitialiser,
            searchTerm,
            filteredIngredients
        }
    }
}
</script>
<style lang="scss" scoped>
$primary: #ec2f19;
$secondary: #f3b702;

.search-container {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
    padding: 1rem 0;
    margin-bottom: 1rem;
}

.search-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}


.ingredients-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.ingredient-item {
    background: #f0f0f0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ingredient-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 0.5rem;
}

.emoji-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.ingredient-name {
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.ingredient-calories {
    font-size: 0.9rem;
    color: #666;
}

.zagba,
.lerequin {
    color: rgb(0, 0, 0) !important;
}

input[type="number"] {
    width: 60px;
    text-align: center;
}

@media (max-width: 768px) {
    .ingredient-item {
        flex: 0 0 calc(50% - 1rem);
    }
}

@media (max-width: 480px) {
    .ingredient-item {
        flex: 0 0 100%;
    }
}
</style>