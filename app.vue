<template>
  <div>
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <strong>DinorCompteurDeCalories</strong>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field">
                <p class="control has-icons-left">
                  <input class="input is-rounded" type="text" placeholder="Rechercher un aliment" v-model="searchTerm">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container mt-6 pt-5">
      <h1 class="title is-1 has-text-centered my-6">Régime & Gestion du Poids</h1>
      <h2 class="subtitle is-3 has-text-centered mb-6">Calculateur Alimentaire</h2>
      <p class="has-text-centered mb-6">
        Obtenez les calories, graisses, glucides, protéines et bien plus pour plus de 37 000 aliments et boissons.
        Ensuite, ajoutez-les à vos Totaux Quotidiens pour voir comment vos calories s'accumulent !
      </p>

      <div class="tabs is-centered is-boxed is-toggle">
        <ul>
          <li :class="{ 'is-active': activeTab === 'aliments' }">
            <a @click="activeTab = 'aliments'">Aliments populaires</a>
          </li>
          <li :class="{ 'is-active': activeTab === 'restaurants' }">
            <a @click="activeTab = 'restaurants'">Restaurants populaires</a>
          </li>
        </ul>
      </div>

      <div class="columns is-multiline">
        <div v-for="aliment in filteredAliments" :key="aliment.nom" class="column is-one-third">
          <div class="card has-text-centered">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="aliment.image" :alt="aliment.nom">
              </figure>
            </div>
            <div class="card-content">
              <h2 class="title is-4">{{ getEmoji(aliment.nom) }} {{ aliment.nom }}</h2>
              <p class="subtitle is-6">Calories par portion : {{ aliment.calories_totales }}</p>
              <div class="field has-addons is-justify-content-center">
                <div class="control">
                  <input class="input is-rounded" type="number" v-model="aliment.portions" min="1"
                    :placeholder="aliment.portions || 1">
                </div>
                <div class="control">
                  <a class="button is-primary is-rounded">
                    Portions
                  </a>
                </div>
              </div>
              <p class="mt-2">Total des calories : {{ aliment.calories_totales * (aliment.portions || 1) }}</p>
              <div v-if="aliment.ingredients && aliment.ingredients.length" class="tags is-centered">
                <span v-for="ingredient in aliment.ingredients" :key="ingredient.nom" class="tag is-primary">
                  {{ getEmoji(ingredient.nom) }} {{ ingredient.nom }} ({{ ingredient.calories }} cal)
                </span>
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
import { useCalories } from '@/composables/useCalories'
import { useDietTips } from '@/composables/useDietTips'

const { aliments, isLoading, error } = useCalories()
const { tips } = useDietTips()
const searchTerm = ref('')
const activeTab = ref('aliments')

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
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background-color: #fafafa;
  color: #333;
}

.navbar {
  background-color: #2d9ee0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-item {
  color: #fff;
  font-weight: bold;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  color: #2d9ee0;
}

.subtitle {
  color: #333;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #fff;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.button.is-primary {
  background-color: #2d9ee0;
  border-color: #2d9ee0;
  color: #fff;
}

.button.is-primary:hover {
  background-color: #2589c6;
  border-color: #2589c6;
}

.tabs a {
  color: #666;
}

.tabs li.is-active a {
  color: #2d9ee0;
  border-bottom-color: #2d9ee0;
}

.input:focus {
  border-color: #2d9ee0;
}

.input.is-rounded {
  border-radius: 30px;
}

.field.has-addons .control .input {
  border-radius: 30px 0 0 30px;
}

.button.is-rounded {
  border-radius: 30px;
}
</style>
