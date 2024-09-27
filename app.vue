<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered my-6">DinorCalorieCounter</h1>

    <div class="field mb-6">
      <div class="control">
        <input class="input" type="text" placeholder="Rechercher un aliment" v-model="searchTerm">
      </div>
    </div>

    <div class="columns is-multiline">
      <div v-for="aliment in filteredAliments" :key="aliment.nom" class="column is-one-third">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="aliment.image" :alt="aliment.nom">
            </figure>
          </div>
          <div class="card-content">
            <h2 class="title is-4">{{ getEmoji(aliment.nom) }} {{ aliment.nom }}</h2>
            <p class="subtitle is-6">Calories totales: {{ aliment.calories_totales }}</p>
            <div v-if="aliment.ingredients && aliment.ingredients.length" class="tags">
              <span v-for="ingredient in aliment.ingredients" :key="ingredient.nom" class="tag is-info">
                {{ getEmoji(ingredient.nom) }} {{ ingredient.nom }} ({{ ingredient.calories }} cal)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCalories } from '@/composables/useCalories'

const { aliments, isLoading, error } = useCalories()
const searchTerm = ref('')

const filteredAliments = computed(() => {
  if (!searchTerm.value) return aliments.value
  const lowercasedTerm = searchTerm.value.toLowerCase()
  return aliments.value.filter(aliment =>
    aliment.nom.toLowerCase().includes(lowercasedTerm) ||
    (aliment.ingredients && aliment.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(lowercasedTerm)))
  )
})

const getEmoji = (nom) => {
  const emojiMap = {
    'Attiéké': '🍚', 'Poisson': '🐟', 'Banane': '🍌', 'Poulet': '🍗',
    'Riz': '🍚', 'Tomate': '🍅', 'Oignon': '🧅', 'Piment': '🌶️',
  }
  return emojiMap[nom] || '🍽️'
}
</script>
