<template>
    <div class="madjoua">
        <div class="field">
            <!-- <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Rechercher un restaurant" :value="searchTerm"
                    @input="$emit('update:searchTerm', $event.target.value)" list="restaurant-suggestions">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p> -->
            <datalist id="restaurant-suggestions">
                <option v-for="restaurant in restaurants" :key="restaurant.nom" :value="restaurant.nom"></option>
            </datalist>
        </div>
        <div class="columns is-multiline">
            <div v-for="restaurant in filteredRestaurants" :key="restaurant.nom"
                class="column is-4-desktop is-12 cecila">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="restaurant.image" :alt="restaurant.nom">
                        </figure>
                    </div>
                    <div class="card-content">
                        <h2 class="title is-4">{{ restaurant.nom }}</h2>
                        <div v-if="restaurant.specialites && restaurant.specialites.length">
                            <ul>
                                <li v-for="specialite in restaurant.specialites" :key="specialite.nom"
                                    class="specialite-item">
                                    <label class="checkbox-container">
                                        <input type="checkbox" v-model="specialite.selected">
                                        <span class="checkmark"></span>
                                        <div class="is-flex is-justify-content-start is-flex-direction-column">
                                            <h3 class="subtitle is-5">{{ specialite.nom }}</h3>
                                            <p>{{ specialite.description }}
                                                ({{ getCalories(specialite.nom) }} calories)</p>
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-4 zena">
                            <strong>Total des calories:</strong>
                            <h4>{{
                                getRestaurantTotalCalories(restaurant) }}</h4>
                            <strong>calories</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCalories } from '@/composables/useCalories'

const props = defineProps(['restaurants', 'searchTerm'])
const { aliments } = useCalories()
const filteredRestaurants = computed(() => {
    if (!props.searchTerm) return props.restaurants
    const lowercasedTerm = props.searchTerm.toLowerCase()
    return props.restaurants.filter(restaurant =>
        restaurant.nom.toLowerCase().includes(lowercasedTerm) ||
        (restaurant.specialites && restaurant.specialites.some(specialite => specialite.nom.toLowerCase().includes(lowercasedTerm)))
    )
})
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

<style scoped>
.specialite-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    user-select: none;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.3s, border-color 0.3s;
}

.checkbox-container input:checked~.checkmark {
    background-color: #2196F3;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked~.checkmark:after {
    display: block;
}

.checkbox-container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}

.field {
    margin-bottom: 20px;
}

.card {
    margin-bottom: 20px;
}

.dflex {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
