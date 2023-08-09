// ./test-utils/global-test-utils-config.ts
import { ref } from 'vue'
/** Mock Nuxt's useState to be a simple ref for unit testing. **/
jest.mock('#app', () => ({
  useState: <T>(_: string, init: () => T) => {
    return ref(init())
  }
}))
