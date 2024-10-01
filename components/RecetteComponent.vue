<template>
    <div class="container">
        <div class="columns is-multiline jordn listedesrecettes">
            <div class="mado">
                <div class="filter-buttons">
                    <button v-for="category in categories" :key="category.nom" @click="filterCategory(category.nom)"
                        class="button" :class="{ 'is-active': selectedCategory === category.nom }">
                        {{ category.icone }} {{ category.nom }}
                    </button>
                </div>
                <div class="cyvzp">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Rechercher un aliment" v-model="searchQuery"
                                @focus="handleFocus" @blur="handleBlur" @input="handleSearch" list="suggestions-list">
                            <span class="icon is-small is-left">
                                <span class="material-icons">search</span>
                            </span>
                            <span class="icon is-small is-right" v-if="searchQuery" @click="clearSearch">
                                <span class="material-icons">close</span>
                            </span>
                        </p>
                    </div>
                    <datalist id="suggestions-list">
                        <option v-for="suggestion in suggestions" :key="suggestion" :value="suggestion"></option>
                    </datalist>
                </div>
            </div>

            <div v-if="showNotification" class="notification is-info">
                <button class="delete" @click="closeNotification">
                    <span class="material-icons">close</span>
                </button>
                <div class="scroll-container">
                    <p class="scroll-text">Faites défiler vers la droite pour voir tous les ingrédients.<br>Cliquez sur
                        un
                        des aliments pour sélectionner un nombre de portions</p>
                </div>
            </div>
            <div v-for="aliment in filteredAliments" :key="aliment.nom" class="column is-12 pb-8 fassa">


                <div class="leplate columns">
                    <div class="leplate-image column is-12-mobile">
                        <div class="container">

                            <div class="line-1 columns is-mobile">
                                <div class="visuelproduct column is-3-mobile">
                                    <!-- visuel du plat -->
                                    <nuxt-img class="is-rounded" :src="aliment.image" :alt="aliment.nom" format="webp"
                                        quality="80" :fallback="aliment.image.replace(/\.[^.]+$/, '.jpg')" />
                                </div>
                                <div
                                    class="nompdt column is-6-mobile p-0 is-flex is-align-items-start is-flex-direction-column is-justify-content-center">
                                    <!-- nombdu plat -->
                                    <h2 class="momo title">{{ aliment.nom }}</h2>
                                    <!-- nombre de calories -->
                                    <p class="wilfried"><span>{{ aliment.calories_totales
                                            }}</span> calories</p>
                                </div>
                                <div class="column calorie-count is-3-mobile p-0">
                                    <div class="field has-addons is-justify-content-center">
                                        <div class="is-flex paabo p-0" title="Seuils caloriques :
     Vert : 1200-1500 calories
     Orange : 1501-2200 calories
     Rouge : Plus de 2200 calories">
                                            <div class="totalclro" :class="{
                                                'vert': calculateTotalCalories(aliment) >= 12000 && calculateTotalCalories(aliment) <= 1500,
                                                'orange': calculateTotalCalories(aliment) > 1500 && calculateTotalCalories(aliment) <= 2200,
                                                'rouge': calculateTotalCalories(aliment) > 2200
                                            }">
                                                <p class="mt-2 is-flex is-align-items-center">
                                                    <span> {{ calculateTotalCalories(aliment) }}</span>calories
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="line-2 columns is-mobile">

                                <div v-if="aliment.ingredients && aliment.ingredients.length" class="tags container">

                                    <div class="zingredients">
                                        <div v-for="ingredient in aliment.ingredients" :key="ingredient.nom"
                                            class="mouff">
                                            <label class="ingredient-label">
                                                <input type="checkbox" v-model="ingredient.selected"
                                                    class="emoji-checkbox" :id="ingredient.nom">
                                                <span class="emoji-icon">{{ ingredient.selected ? '✅' : ingredient.icone
                                                    }}</span>
                                                <p class="zagba">
                                                    {{ ingredient.nom }}

                                                </p>
                                                <p class="lerequin">{{ ingredient.calories }} cal
                                                </p>
                                            </label>
                                            <input v-if="ingredient.selected" type="number" :placeholder="1"
                                                v-model="ingredient.portions" min="1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps(['aliments'])

const categories = computed(() => {
    const uniqueCategories = [...new Set(props.aliments.map(aliment => JSON.stringify(aliment.categorie)))]
    return [{ nom: 'Tous', icone: '🍽️' }, ...uniqueCategories.map(cat => JSON.parse(cat))]
})

const searchQuery = ref('')
const selectedCategory = ref('Tous')
const isInputFocused = ref(false)

const showNotification = ref(true)

const closeNotification = () => {
    showNotification.value = false
}
const suggestions = computed(() => {
    if (!searchQuery.value) return []
    return props.aliments
        .filter(aliment => aliment.nom.toLowerCase().includes(searchQuery.value.toLowerCase()))
        .map(aliment => aliment.nom)
        .slice(0, 5)
})

const resetFilters = () => {
    selectedCategory.value = 'Tous'
}

const clearSearch = () => {
    searchQuery.value = ''
    resetFilters()
}

const selectSuggestion = (suggestion) => {
    searchQuery.value = suggestion
}

const filteredAliments = computed(() => {
    let filtered = props.aliments
    if (selectedCategory.value !== 'Tous') {
        filtered = filtered.filter(aliment => aliment.categorie.nom === selectedCategory.value)
    }
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(aliment =>
            aliment.nom.toLowerCase().includes(query) ||
            aliment.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(query))
        )
    }
    return filtered
})


const filterCategory = (categoryName) => {
    selectedCategory.value = categoryName
}

const toggleIngredient = (aliment, ingredient) => {
    ingredient.selected = !ingredient.selected
}

const initializeIngredients = () => {
    props.aliments.forEach(aliment => {
        if (aliment.ingredients) {
            aliment.ingredients.forEach(ingredient => {
                ingredient.selected = false;
                ingredient.portions = 1; // Définir la valeur par défaut à 1

            })
        }
    })
}

const calculateTotalCalories = (aliment) => {
    return aliment.ingredients.reduce((total, ingredient) => {
        if (ingredient.selected) {
            return total + (ingredient.calories * (ingredient.portions || 1));
        }
        return total;
    }, 0);
}

const handleFocus = () => {
    isInputFocused.value = true
}

const handleBlur = () => {
    isInputFocused.value = false
}
// const resetFilters = () => {
//   selectedCategory.value = 'Tous'
// }

const handleSearch = (event) => {
    searchQuery.value = event.target.value
    if (searchQuery.value) {
        resetFilters()
    }
}

onMounted(() => {
    initializeIngredients();

    setTimeout(() => {
        closeNotification()
    }, 30000) // 10000 millisecondes = 10 secondes
})

props.aliments.forEach(aliment => {
    aliment.ingredients.forEach(ingredient => {
        ingredient.selected = false
    })
})
</script>

<style scoped>
.tag {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.tag.is-light {
    opacity: 0.6;
}

.suggestions {
    position: absolute;
    z-index: 1000000;
    background: white;
    border: 1px solid #dbdbdb;
    border-top: none;
    border-radius: 0 0 4px 4px;
    width: inherit;
}

.suggestions a {
    display: block;
    padding: 0.5rem;
    cursor: pointer;
}

.suggestions a:hover {
    background-color: #f5f5f5;
}

.is-hidden {
    display: none;
}

.zingredients {}

.mouff {
    margin-bottom: 10px;
}
</style>
