// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VuetifyTheme from '@/styles/vuetifyTheme'

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    defaultTheme: 'VuetifyTheme',
    themes: {
      VuetifyTheme
    }
  }
})

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(vuetify)
})
