<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered my-6">DinorCalorieCounter</h1>

    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Rechercher un aliment" v-model="searchTerm">
      </div>
    </div>

    <div class="box" v-if="selectedAliment">
      <h2 class="title is-4">{{ getEmoji(selectedAliment.nom) }} {{ selectedAliment.nom }}</h2>
      <p class="subtitle is-6">Calories totales: {{ selectedAliment.calories_totales }}</p>
      <div v-if="selectedAliment.ingredients && selectedAliment.ingredients.length" class="tags">
        <span v-for="ingredient in selectedAliment.ingredients" :key="ingredient.nom" class="tag is-info">
          {{ getEmoji(ingredient.nom) }} {{ ingredient.nom }} ({{ ingredient.calories }} cal)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCalories } from '@/composables/useCalories'
import Fuse from 'fuse.js'

const { aliments, isLoading, error } = useCalories()
const searchTerm = ref('')
const selectedAliment = ref(null)
let fuse

onMounted(() => {
  fuse = new Fuse(aliments.value, {
    keys: ['nom'],
    threshold: 0.3
  })
})

watch(searchTerm, (newValue) => {
  if (newValue) {
    const results = fuse.search(newValue)
    selectedAliment.value = results.length > 0 ? results[0].item : null
  } else {
    selectedAliment.value = null
  }
})

const getEmoji = (nom) => {
  const emojiMap = {
    'Attiéké': '🍚', 'Poisson': '🐟', 'Banane': '🍌', 'Poulet': '🍗',
    'Riz': '🍚', 'Tomate': '🍅', 'Oignon': '🧅', 'Piment': '🌶️',
  }
  return emojiMap[nom] || '🍽️'
}
</script>
