<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered my-6">DinorCalorieCounter</h1>

    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Rechercher un aliment" v-model="searchTerm"
          list="aliment-suggestions">
        <datalist id="aliment-suggestions">
          <option v-for="aliment in aliments" :key="aliment.nom" :value="aliment.nom"></option>
        </datalist>
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
import { ref, computed, watch } from 'vue'
import { useCalories } from '@/composables/useCalories'

const { aliments, isLoading, error } = useCalories()
const searchTerm = ref('')
const selectedAliment = ref(null)

watch(searchTerm, (newValue) => {
  selectedAliment.value = aliments.value.find(aliment => aliment.nom.toLowerCase() === newValue.toLowerCase())
})

const getEmoji = (nom) => {
  const emojiMap = {
    'Attiéké': '🍚', 'Poisson': '🐟', 'Banane': '🍌', 'Poulet': '🍗',
    'Riz': '🍚', 'Tomate': '🍅', 'Oignon': '🧅', 'Piment': '🌶️',
  }
  return emojiMap[nom] || '🍽️'
}
</script>
