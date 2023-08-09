<script lang="ts" setup>
import { useClipboard, usePermission } from '@vueuse/core'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()

const { selfPlayer, otherPlayer, gameMode, meetingCode } =
  injectPlayersContext()

const iamTheOtherPlayer = computed(() => {
  if (route.query.id && route.query.host) {
    return true
  }

  return false
})
const selfPlayerTextInput = ref('')
const setSelfPlayerName = () => {
  selfPlayer.value = selfPlayerTextInput.value
}

const meetingLink = computed(
  () =>
    `${config.public.baseUrl}/waiting-room?id=${meetingCode.value}&host=${selfPlayer.value}`
)

// Save the host name as other player when I'm joining his match
watchEffect(() => {
  if (iamTheOtherPlayer.value) {
    selfPlayer.value = ''
    otherPlayer.value = Array.isArray(route.query.host)
      ? route.query.host[0] || ''
      : route.query.host || ''
  }
})

// In case of user entered URL directly, put him in correct flow
onMounted(() => {
  if (!iamTheOtherPlayer.value && gameMode.value === 'single') {
    router.push('/')
  }
})

// Copy the meeting link
const { isSupported, copy } = useClipboard()
const permissionWrite = usePermission('clipboard-write')
const copyMeetingCode = () => {
  if (permissionWrite.value === 'prompt') {
    copy(meetingLink.value)
  }
}

// Auto start section
const secondsToStart = ref(3)
const countDownToStartInterval = ref<NodeJS.Timer | null>(null)
watchEffect(() => {
  if (otherPlayer.value && selfPlayer.value) {
    countDownToStartInterval.value = setInterval(() => {
      if (secondsToStart.value > -1) {
        secondsToStart.value--
      }
    }, 1000)
  }
})
onBeforeUnmount(() => {
  if (countDownToStartInterval.value) {
    clearInterval(countDownToStartInterval.value)
  }
})
watchEffect(() => {
  if (secondsToStart.value === -1) {
    router.push('/play')
  }
})
onBeforeUnmount(() => {
  if (countDownToStartInterval.value) {
    clearInterval(countDownToStartInterval.value)
  }
})

</script>

<template>
  <div
    v-if="!iamTheOtherPlayer"
    class="flex flex-col justify-center align-center max-w-xl w-full p-8"
  >
    <h1 class="text-2xl text-white">
      Invite your friend {{ selfPlayer }}!
    </h1>

    <div class="flex flex-col my-8 gap-4 p-4 bg-slate-600 rounded-md">
      <p>{{ meetingLink }}</p>
      <v-btn v-if="isSupported" @click="copyMeetingCode()">
        Copy
      </v-btn>
      <span v-else>Copy the meeting code and give it to your friend</span>
    </div>

    <h3 v-if="!otherPlayer">
      As soon as your friend join the room, the match will be started
    </h3>
    <h3 v-else>
      {{ otherPlayer }} joined! The match will be started in
      {{ Math.max(secondsToStart, 0) }}...
    </h3>

    <v-btn v-if="otherPlayer" to="/play">
      Start Now!
    </v-btn>
    <v-btn to="/">
      Cancel
    </v-btn>
  </div>

  <div v-else class="flex flex-col justify-center align-center max-w-xl w-full p-8">
    <v-text-field
      v-model="selfPlayerTextInput"
      required
      :rules="[() => !!selfPlayerTextInput || 'This field is required']"
      label="Full Name"
      placeholder="John Doe"
      variant="outlined"
      class="w-full my-8"
    />
    <v-btn v-if="!selfPlayer" @click="setSelfPlayerName">
      Start
    </v-btn>
    <h3 v-else>
      You are joining {{ otherPlayer }} match! The match will be started in
      {{ Math.max(secondsToStart, 0) }}...
    </h3>
  </div>
</template>

<style scoped lang="scss"></style>
