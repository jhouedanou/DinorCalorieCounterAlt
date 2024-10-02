<template>
  <Splashpage v-if="showSplash" />

  <div :class="{ 'overlay-active': showOverlay }">
    <div class="yeleen container">
      <div class="container mt-0 pt-6">
        <div class="carz is-flex is-justify-content-space-between is-align-items-center">
          <img src="/images/logo.png" class="same" alt="">
          <p>Calculateur de calories</p>
        </div>
        <div class="tabs is-centered is-boxed is-toggle">
          <ul class="tabs-list">
            <li class="tab-item" :class="{ 'is-active': activeTab === 'aliments' }">
              <a @click="activeTab = 'aliments'">Aliments populaires</a>
            </li>
            <li class="tab-item" :class="{ 'is-active': activeTab === 'calculateur' }">
              <a @click="activeTab = 'calculateur'">Calculateur de calories</a>
            </li>
            <div class="slider" :style="sliderStyle"></div>
          </ul>

        </div>

        <RecetteComponent v-if="activeTab === 'aliments'" :aliments="aliments" />
        <CalculateurCalories v-if="activeTab === 'calculateur'" />
      </div>
    </div>
    <div v-if="showOverlay" class="overlay">
      <p>Pour une meilleure expérience, veuillez utiliser cette page dans l'application DinorApp<br>Disponible sur votre
        mobile :</p><br>
      <br>
      <div class="store-links">
        <a href="https://play.google.com/store/apps/details?id=com.bfedition.dinorapp&hl=fr" target="_blank">
          <nuxt-img src="/images/googleplay.png" class="same" alt="" format="webp" quality="80" />
        </a>
        <a href="https://apps.apple.com/tr/app/dinor-app/id1515571306" target="_blank">
          <nuxt-img src="/images/apple.png" class="same" alt="" format="webp" quality="80" />

        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRestaurants } from '@/composables/useRestaurants'
import RecetteComponent from '@/components/RecetteComponent.vue'
import RestaurantComponent from '@/components/RestaurantComponent.vue'
import Splashpage from '@/components/Splashpage.vue';

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
//overlay pour les ordinateur s
const showOverlay = ref(false)
const isLargeScreen = computed(() => {
  return window.innerWidth > 768
})

onMounted(() => {
  showOverlay.value = isLargeScreen.value
  window.addEventListener('resize', () => {
    showOverlay.value = isLargeScreen.value
  })
})
onMounted(async () => {
  const response = await fetch('/api/calories.json')
  const data = await response.json()
  aliments.value = data.aliments
})
</script>

<style scoped>
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

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
