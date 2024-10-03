import Vue from 'vue'
import { Swiper as SwiperClass, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

// Importez les styles Swiper
import 'swiper/swiper-bundle.css'

// Configurez Swiper pour utiliser les modules
SwiperClass.use([Pagination, Navigation, Mousewheel, Autoplay])

// Obtenez le composant VueAwesomeSwiper
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

// Installez les composants globalement
Vue.component('Swiper', Swiper)
Vue.component('SwiperSlide', SwiperSlide)