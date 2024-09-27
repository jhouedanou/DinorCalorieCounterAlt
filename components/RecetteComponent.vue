<template>
    <div class="columns is-multiline">
        <div v-for="aliment in aliments" :key="aliment.nom" class="column is-one-third">
            <div class="card">
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
</template>

<script setup>
const props = defineProps(['aliments'])

const getEmoji = (nom) => {
    const emojiMap = {
        'Attiéké': '🍚', 'Poisson': '🐟', 'Banane': '🍌', 'Poulet': '🍗',
        'Riz': '🍚', 'Tomate': '🍅', 'Oignon': '🧅', 'Piment': '🌶️',
    }
    return emojiMap[nom] || '🍽️'
}
</script>