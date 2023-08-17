// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  css: ['vuetify/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify', 'gsap']
  },
  devtools: { enabled: true },
  imports: {
    autoImport: true,
    dirs: ['./composables/**', './utils/**', 'stores']
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
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
