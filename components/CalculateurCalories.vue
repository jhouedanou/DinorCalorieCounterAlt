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

                <div class="ingredients-grid columns is-mobile is-multiline">
                    <div class="p-2 column is-4-mobile" v-for="ingredient in filteredIngredients" :key="ingredient.nom">
                        <div class="ingredient-item">
                            <label class="ingredient-label">
                                <input type="checkbox" v-model="ingredient.selected" class="emoji-checkbox">
                                <span class="emoji-icon">{{ ingredient.selected ? '✅' : ingredient.icone }}</span>
                                <p class="zagba">{{ ingredient.nom }}</p>
                                <p class="lerequin">{{ ingredient.calories }} cal</p>
                            </label>
                            <input v-if="ingredient.selected" v-model="portions[ingredient.nom]" type="number" min="1"
                                placeholder="Nombre de portions" class="portions-input">

                        </div>
                    </div>
                </div>
                <div class="crofixed">
                    <div class="total-calories" :class="{
                        'vert': totalCalories >= 12000 && totalCalories <= 1500,
                        'orange': totalCalories > 1500 && totalCalories <= 2200,
                        'rouge': totalCalories > 2200
                    }">
                        Nombre total de calories : <span>{{ totalCalories }}</span> calories
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

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
            const filtered = ingredients.value.filter(ingredient =>
                ingredient.nom.toLowerCase().includes(searchTerm.value.toLowerCase())
            );

            // Éliminer les doublons
            const uniqueFiltered = {};
            filtered.forEach(ingredient => {
                if (!uniqueFiltered[ingredient.nom]) {
                    uniqueFiltered[ingredient.nom] = ingredient;
                }
            });

            return Object.values(uniqueFiltered);
        })

        const calculerCalories = () => {
            totalCalories.value = ingredients.value.reduce((total, ingredient) => {
                if (ingredient.selected) {
                    return total + ingredient.calories * (portions.value[ingredient.nom] || 1)
                }
                return total
            }, 0)
        }

        watch([ingredients, portions], () => {
            calculerCalories()
        }, { deep: true })

        // Charger les ingrédients depuis le fichier JSON
        fetch('/api/calories.json')
            .then(response => response.json())
            .then(data => {
                const allIngredients = data.aliments.flatMap(aliment => aliment.ingredients)
                const uniqueIngredients = Array.from(new Set(allIngredients.map(JSON.stringify))).map(JSON.parse)
                ingredients.value = uniqueIngredients
            })

        return {
            etape,
            nomRecette,
            ingredients,
            ingredientsSelectionnes,
            portions,
            totalCalories,
            calculerCalories,
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
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.emoji-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.emoji-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.zagba,
.lerequin {
    margin: 0;
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