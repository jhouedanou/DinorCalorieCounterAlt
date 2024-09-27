<template>
  <div>

    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <strong>DinorCalorieCounter</strong>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field" v-if="activeTab === 'aliments'">
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Rechercher une recette" v-model="searchTermRecettes">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                  </span>
                </p>
              </div>
              <div class="field" v-else>
                <p class="control has-icons-left">
                  <input class="input" type="text" placeholder="Rechercher un restaurant"
                    v-model="searchTermRestaurants">
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
      <h1 class="title is-1 has-text-centered my-6">DInor APP</h1>
      <h2 class="subtitle is-3 has-text-centered mb-6">Calculateur Alimentaire</h2>
      <p class="has-text-centered mb-6">
        Obtenez les calories, graisses, glucides, protéines et bien plus pour vos aliments et boissons.
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

      <RecetteComponent v-if="activeTab === 'aliments'" :aliments="filteredAliments" />
      <RestaurantComponent v-if="activeTab === 'restaurants'" :restaurants="restaurants" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useCalories } from '@/composables/useCalories'
import { useRestaurants } from '@/composables/useRestaurants'
import RecetteComponent from '@/components/RecetteComponent.vue'
import RestaurantComponent from '@/components/RestaurantComponent.vue'

const { aliments } = useCalories()
const { restaurants } = useRestaurants()
const searchTermRecettes = ref('')
const searchTermRestaurants = ref('')
const activeTab = ref('aliments')

const filteredAliments = computed(() => {
  if (!searchTermRecettes.value) return aliments.value
  const lowercasedTerm = searchTermRecettes.value.toLowerCase()
  return aliments.value.filter(aliment =>
    aliment.nom.toLowerCase().includes(lowercasedTerm) ||
    (aliment.ingredients && aliment.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(lowercasedTerm)))
  )
})

const filteredRestaurants = computed(() => {
  if (!searchTermRestaurants.value) return restaurants.value
  const lowercasedTerm = searchTermRestaurants.value.toLowerCase()
  return restaurants.value.filter(restaurant =>
    restaurant.nom.toLowerCase().includes(lowercasedTerm) ||
    (restaurant.specialites && restaurant.specialites.some(specialite => specialite.nom.toLowerCase().includes(lowercasedTerm)))
  )
})
</script>

Copy

Apply

Cette modification ajoute deux champs de recherche distincts dans le header, qui s'affichent en fonction de l'onglet
actif. La recherche est appliquée dynamiquement aux recettes ou aux restaurants selon le choix de l'utilisateur.



Try again with different context
Add context...
Avatar for jhouedanou
Jean Luc Houedanou




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
