<template>
  <div class="yeleen container">

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

      <RecetteComponent v-if="activeTab === 'aliments'" :aliments="aliments" />
      <RestaurantComponent v-if="activeTab === 'restaurants'" :restaurants="restaurants" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRestaurants } from '@/composables/useRestaurants'
import RecetteComponent from '@/components/RecetteComponent.vue'
import RestaurantComponent from '@/components/RestaurantComponent.vue'

//const { aliments } = useCalories()
const { restaurants } = useRestaurants()
const searchTermRecettes = ref('')
const searchTermRestaurants = ref('')
const aliments = ref([])
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

onMounted(async () => {
  const response = await fetch('/api/calories.json')
  const data = await response.json()
  aliments.value = data.aliments
})
</script>




<style lang="scss"></style>
