// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  css: ['vuetify/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify', 'gsap']
  },
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },

  devtools: { enabled: true },
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
        wsEndpoint: 'ws://localhost:4000/graphql'
      }
    }
  }

})
