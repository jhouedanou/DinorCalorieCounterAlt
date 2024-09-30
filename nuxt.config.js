// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled:false },
  typescript: {
    strict: false
  },
  css: [
    '@/assets/styles/styles.scss',
    'bulma/css/bulma.min.css'
  ],
  head: {
    title:"DINOR APP - Calculateur de calories",  meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      {
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Material+Icons&display=swap'
}
    ]
  }
})
