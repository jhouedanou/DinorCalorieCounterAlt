<template>
    <div class="madjoua">
        <!-- <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Rechercher un restaurant" :value="searchTerm"
                    @input="$emit('update:searchTerm', $event.target.value)" list="restaurant-suggestions">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
            <datalist id="restaurant-suggestions">
                <option v-for="restaurant in restaurants" :key="restaurant.nom" :value="restaurant.nom"></option>
            </datalist>
        </div> -->
        <div class="columns is-multiline telas">
            <div v-for="restaurant in filteredRestaurants" :key="restaurant.nom"
                class="column is-4-desktop is-12 cecila light-background">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="restaurant.image" :alt="restaurant.nom">
                        </figure>
                    </div>
                    <div class="card-content gray-text">
                        <h2 class="title is-4">{{ restaurant.nom }}</h2>
                        <div v-if="restaurant.specialites && restaurant.specialites.length">
                            <!-- <ul>
                                <li v-for="specialite in restaurant.specialites" :key="specialite.nom"
                                    class="specialite-item">
                                    <label class="checkbox-container">
                                        <input type="checkbox" v-model="specialite.selected">
                                        <span class="checkmark"></span>
                                        <div class="is-flex is-justify-content-start is-flex-direction-column">
                                            <h3 class="subtitle is-5 malik">{{ specialite.nom }}</h3>
                                            <div
                                                :class="['is-flex', 'is-justify-content-start', 'is-flex-direction-column', { 'show-description': specialite.selected }]">
                                                <p>{{ specialite.description }}
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            </ul> -->
                            <div v-if="restaurant.specialites && restaurant.specialites.length"
                                class="specialites-grid">
                                <div v-for="specialite in restaurant.specialites" :key="specialite.nom"
                                    class="specialite-item">
                                    <div class="image-container" @click="toggleSpecialite(specialite)">
                                        <img :src="specialite.subImage || 'https://dummyimage.com/150x150'"
                                            :alt="specialite.nom" class="specialite-image">
                                        <div class="overlay" :class="{ 'selected': specialite.selected }"></div>
                                    </div>
                                    <span class="specialite-nom">{{ specialite.nom }}</span>
                                </div>
                            </div>
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
const getCalories = (specialite) => {
    return specialite.calories || 0;
}


const getRestaurantTotalCalories = (restaurant) => {
    return restaurant.specialites.reduce((total, specialite) => {
        console.log(`Spécialité: ${specialite.nom}, Calories: ${specialite.calories}, Sélectionné: ${specialite.selected}`);
        return total + (specialite.selected ? specialite.calories : 0);
    }, 0);
}

const toggleSpecialite = (specialite) => {
    specialite.selected = !specialite.selected;
}

</script>

<style lang="scss" scoped>
.specialite-item p {
    display: none;
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
    max-height: 0;
    opacity: 0;
}

.specialite-item .show-description p {
    display: block;
    max-height: 100px;
    opacity: 1;
}

.specialite-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    h3 {
        font-weight: bold;
        font-size: 15px;
    }

    p {
        font-size: 14px;
    }
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

.light-background {
    background-color: #f5f5f5;
}

.gray-text {
    color: #4a4a4a;
}

.gray-text h2,
.gray-text h3 {
    color: #363636;
}

.card {
    background: white;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}

.specialite-item {
    margin-bottom: 1rem;
}

.zena {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}


.specialites-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.specialite-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-container {
    position: relative;
    cursor: pointer;
    width: 150px;
    height: 150px;
}

.specialite-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
}

.overlay.selected {
    opacity: 1;
}

.specialite-nom {
    margin-top: 5px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #ec2f19;
}

.image-container {
    width: 100% !important;
    height: auto !important;
    margin: 0 auto !important;
}
</style>
