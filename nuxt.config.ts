// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  css: ['vuetify/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify', 'gsap']
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/apollo', '@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
        wsEndpoint: 'ws://localhost:4000/graphql'
      }
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000'
    }
  }
})
