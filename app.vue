<template>
  <Splashpage v-if="showSplash" />

  <div class="yeleen container">
    <div class="container mt-0 pt-6">
      <div class="carz is-flex is-justify-content-space-between is-align-items-center">
        <img src="/images/logo.png" class="same" alt="">
        <br>
      </div>
      <div class="tabs is-centered is-boxed is-toggle">
        <ul class="tabs-list">
          <li class="tab-item" :class="{ 'is-active': activeTab === 'aliments' }">
            <a @click="activeTab = 'aliments'">Aliments populaires</a>
          </li>
          <li class="tab-item" :class="{ 'is-active': activeTab === 'calculateur' }">
            <a @click="activeTab = 'calculateur'">Calculer les calories</a>
          </li>
          <div class="slider" :style="sliderStyle"></div>
        </ul>
      </div>

      <RecetteComponent v-if="activeTab === 'aliments'" :aliments="aliments" />
      <CalculateurCalories v-if="activeTab === 'calculateur'" />
    </div>
  </div>
</template>

<script setup>


import { useHead } from '#app'
import { ref, onMounted, computed } from 'vue'
import { useRestaurants } from '@/composables/useRestaurants'
import RecetteComponent from '@/components/RecetteComponent.vue'
import CalculateurCalories from '@/components/CalculateurCalories.vue'
import Splashpage from '@/components/Splashpage.vue';
useHead({
  title: 'Dinor App, Calculateur de calories'
})
const { restaurants } = useRestaurants()
const searchTermRecettes = ref('')
const searchTermRestaurants = ref('')
const aliments = ref([])
const activeTab = ref('aliments')
const sliderStyle = computed(() => {
  const index = activeTab.value === 'aliments' ? 0 : 1
  return {
    transform: `translateX(${index * 100}%)`
  }
})
const showSplash = ref(true);

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false;
  }, 7000);
});

onMounted(async () => {
  const response = await fetch('/api/calories.json')
  const data = await response.json()
  aliments.value = data.aliments
})
</script>

<style>
body {
  min-height: 100vh;
}

.tabs-list {
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #ddd;
}

.tab-item {
  list-style: none;
  margin: 0 10px;
}

.tab-item a {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.tab-item a:hover {
  background-color: #f5f5f5;
}

.tab-item.is-active a {
  background-color: #fff;
  border-color: #ddd;
  border-bottom-color: transparent;
  color: #000;
  font-weight: bold;
}
</style>
