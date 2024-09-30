<template>
    <div>
        <div class="columns is-multiline jordn listedesrecettes">
            <div class="mado">
                <div class="filter-buttons"
                    :class="{ 'has-active': selectedCategory !== 'Tous', 'is-hidden': isInputFocused }">
                    <button v-for="category in categories" :key="category" @click="filterCategory(category)"
                        class="button" :class="{ 'is-active': selectedCategory === category }">
                        {{ category }}
                    </button>
                </div>
                <div class="cyvzp">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Rechercher un aliment" v-model="searchQuery"
                                @focus="handleFocus" @blur="handleBlur" list="suggestions-list">
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

            <div v-for="aliment in filteredAliments" :key="aliment.nom" class="column is-12 pb-8">
                <div class="leplate columns">
                    <div class="leplate-image column is-3">
                        <p class="subtitle is-6">Calories par portion : <span>{{ aliment.calories_totales
                                }}</span></p>
                        <figure class="image is-4by3">
                            <img :src="aliment.image" :alt="aliment.nom">
                        </figure>
                    </div>
                    <div class="leplate-content">
                        <div class="lauei columns">
                            <div class="column is-9 is-flex is-align-items-end">
                                <h2 class="momo title is-4">{{ aliment.nom }}</h2>

                            </div>
                            <div class="column is-3">
                                <div class="poutube pl-5 pr-5">
                                    <span class="mb-4">Combien de portions ?</span>
                                    <div class="control">
                                        <input class="input is-rounded" type="tel" v-model="aliment.portions"
                                            pattern="[0-9]*" inputmode="numeric" :placeholder="aliment.portions || 1">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="columns">
                            <div class="column is-9">
                                <p class="p-2">Sélectionnez les ingrédients du plat en cliquant sur les élements
                                    ci-dessous </p>
                                <div v-if="aliment.ingredients && aliment.ingredients.length"
                                    class="tags is-justify-content-start">
                                    <span v-for="ingredient in aliment.ingredients" :key="ingredient.nom"
                                        class="tag is-primary" @click="toggleIngredient(aliment, ingredient)"
                                        :class="{ 'is-light': !ingredient.selected }">
                                        {{ ingredient.nom }} ({{ ingredient.calories }} cal)
                                    </span>
                                </div>
                            </div>

                            <div class="column is-3">
                                <div class="field has-addons is-justify-content-center">
                                    <div class="is-flex paabo">

                                        <div class="totalclro">
                                            <p class="mt-2">Total des calories : <span>{{
                                                aliment.calories_totales * (aliment.portions || 1) -
                                                aliment.ingredients.reduce((sum, ing) => !ing.selected ? sum +
                                                    ing.calories : sum, 0)
                                                    }}</span> Kcal</p>
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
    const uniqueCategories = [...new Set(props.aliments.map(aliment => aliment.categorie))]
    return ['Tous', ...uniqueCategories]
})

const searchQuery = ref('')
const selectedCategory = ref('Tous')
const isInputFocused = ref(false)

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
        filtered = filtered.filter(aliment => aliment.categorie === selectedCategory.value)
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

const filterCategory = (category) => {
    selectedCategory.value = category
}

const toggleIngredient = (aliment, ingredient) => {
    ingredient.selected = !ingredient.selected
}

const initializeIngredients = () => {
    props.aliments.forEach(aliment => {
        if (aliment.ingredients) {
            aliment.ingredients.forEach(ingredient => {
                ingredient.selected = false
            })
        }
    })
}

const calculateTotalCalories = (aliment) => {
    const baseCalories = aliment.calories_totales * (aliment.portions || 1)
    const selectedIngredients = aliment.ingredients.filter(ing => ing.selected !== false)
    const selectedCalories = selectedIngredients.reduce((sum, ing) => sum + ing.calories, 0)
    return baseCalories - (aliment.calories_totales - selectedCalories)
}

const handleFocus = () => {
    isInputFocused.value = true
}

const handleBlur = () => {
    isInputFocused.value = false
}

onMounted(() => {
    initializeIngredients()
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
</style>
