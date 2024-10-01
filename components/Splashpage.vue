<template>
    <div class="splashpage">
        <img src="/images/logo.png" alt="Logo" class="logo">

        <div class="progress-bar">
            <div class="progress"></div>
        </div>
        <div class="funny-messages">
            <p>{{ currentMessage }}</p>
        </div>
        <div class="food-icons">
            <span v-for="(icon, index) in foodIcons" :key="index" class="material-icons">
                {{ icon }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const foodIcons = ref(['restaurant', 'local_pizza', 'fastfood', 'cake', 'icecream']);
const funnyMessages = [
    "En cours de chargement",
    "Mise à jour de la carte des aliments",
    "Mise à jour des restaurants",
];
const currentMessage = ref(funnyMessages[0]);

onMounted(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
        foodIcons.value.push(foodIcons.value.shift());
        messageIndex = (messageIndex + 1) % funnyMessages.length;
        currentMessage.value = funnyMessages[messageIndex];
    }, 1333); // Change toutes les 1.333 secondes pour avoir 3 messages en 4 secondes

    setTimeout(() => {
        clearInterval(interval);
    }, 4000);
});
</script>

<style scoped>
.splashpage {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ec2f19;
    width: 100vw;
    z-index: 9999;
}

.logo {
    width: 100px;
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.progress-bar {
    width: 200px;
    height: 10px;
    background-color: #f3b702;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    width: 0;
    height: 100%;
    background-color: #fff;
    animation: progress 7s linear;
}

@keyframes progress {
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
}

.funny-messages {
    margin-top: 20px;
    text-align: center;
    color: #fff;
    font-style: italic;
    animation: fadeInOut 7s linear infinite;
}

.food-icons {
    margin-top: 20px;
}

.material-icons {
    font-size: 24px;
    color: #fff;
    margin: 0 5px;
}

.funny-messages {
    margin-top: 20px;
    text-align: center;
    color: #fff;
    font-style: italic;
    animation: fadeInOut 4s linear infinite;
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}
</style>
