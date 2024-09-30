<template>
    <div>
        <div class="columns is-multiline jordn listedesrecettes">
            <div class="filter-buttons column is-12">
                <button v-for="category in categories" :key="category" @click="filterCategory(category)" class="button">
                    {{ category }}
                </button>
            </div>
            <div v-for="aliment in filteredAliments" :key="aliment.nom" class="column is-12">
                <div class="leplate columns">
                    <div class="leplate-image column is-3">
                        <figure class="image is-4by3">
                            <img :src="aliment.image" :alt="aliment.nom">
                        </figure>
                    </div>
                    <div class="leplate-content">
                        <h2 class="momo title is-4">{{ aliment.nom }}</h2>
                        <div class="columns">
                            <div class="column is-9">
                                <p class="subtitle is-6">Calories par portion : <span>{{ aliment.calories_totales
                                        }}</span></p>
                                <div v-if="aliment.ingredients && aliment.ingredients.length"
                                    class="tags is-justify-content-start">
                                    <span v-for="ingredient in aliment.ingredients" :key="ingredient.nom"
                                        class="tag is-primary">
                                        {{ ingredient.nom }} ({{ ingredient.calories }}
                                        cal)
                                    </span>
                                </div>
                            </div>

                            <div class="column is-3">
                                <div class="field has-addons is-justify-content-center">
                                    <div class="is-flex paabo">
                                        <div class="poutube">
                                            <span>Nombre de calories</span>
                                            <div class="control">
                                                <input class="input is-rounded" type="number" v-model="aliment.portions"
                                                    min="1" :placeholder="aliment.portions || 1">
                                            </div>
                                        </div>
                                        <div class="totalclro">
                                            <p class="mt-2">Total des calories : <span>{{ aliment.calories_totales *
                                                (aliment.portions ||
                                                    1)
                                                    }}</span>
                                            </p>
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
import { ref, computed } from 'vue'

const props = defineProps(['aliments'])

const categories = computed(() => {
    const uniqueCategories = [...new Set(props.aliments.map(aliment => aliment.categorie))]
    return ['Tous', ...uniqueCategories]
})

const selectedCategory = ref('Tous')

const filteredAliments = computed(() => {
    return selectedCategory.value === 'Tous'
        ? props.aliments
        : props.aliments.filter(aliment => aliment.categorie === selectedCategory.value)
})

const filterCategory = (category) => {
    selectedCategory.value = category
}
</script>