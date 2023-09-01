import { userLogic } from '../composables/userLogic' // Adjust the path to your composable

export default defineNuxtRouteMiddleware(() => {
  const { UserState } = userLogic()
  if (UserState().value.id === '' || UserState === undefined) {
    return navigateTo('/')
  }
})
