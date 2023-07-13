// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/styles/main.sass", "@mdi/font/css/materialdesignicons.css"],
  components: ["~/components"],
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
});
