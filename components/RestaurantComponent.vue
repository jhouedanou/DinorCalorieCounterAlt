<template>
    <div class="columns is-multiline">
        <div v-for="restaurant in restaurants" :key="restaurant.nom" class="column is-one-third">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img :src="restaurant.image" :alt="restaurant.nom">
                    </figure>
                </div>
                <div class="card-content">
                    <h2 class="title is-4">{{ restaurant.nom }}</h2>
                    <div v-if="restaurant.specialites && restaurant.specialites.length">
                        <h3 class="subtitle is-5">Spécialités :</h3>
                        <ul>
                            <li v-for="specialite in restaurant.specialites" :key="specialite.nom">
                                <label class="checkbox">
                                    <input type="checkbox" v-model="specialite.selected">
                                    <strong>{{ specialite.nom }}</strong>: {{ specialite.description }}
                                    ({{ getCalories(specialite.nom) }} calories)
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-4">
                        <strong>Total des calories sélectionnées :</strong> {{ getRestaurantTotalCalories(restaurant) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCalories } from '@/composables/useCalories'

const props = defineProps(['restaurants'])
const { aliments } = useCalories()

const getCalories = (nom) => {
    const aliment = aliments.value.find(a => a.nom === nom)
    return aliment ? aliment.calories_totales : 0
}

const getRestaurantTotalCalories = (restaurant) => {
    return restaurant.specialites.reduce((total, specialite) => {
        return total + (specialite.selected ? getCalories(specialite.nom) : 0)
    }, 0)
}
</script>