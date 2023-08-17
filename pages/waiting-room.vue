<script lang="ts" setup>
import { uuid } from 'vue-uuid'

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const state = usePlayersStore()
const { isSupported, copy } = useCopy()

const isRoomCreated = ref(false)
const isReadyToBeRedirected = ref(false)
const isUserGuest = computed(() => !!route.query.id && !!route.query.hostId)
const waitingRoomLink = computed(
  () => `${config.public.baseUrl}${state.waitingRoomLink}`
)

// Auto-start when ready
const secondsToStart = useCountDown({
  enabled: isReadyToBeRedirected.value,
  seconds: 3,
  callback: () => {
    const playerIdString = isUserGuest
      ? `guestId=${state.player2Id}`
      : `hostId=${state.player1Id}`
    router.push(`${state.matchLink}&${playerIdString}`)
  },
  clearCallback: () => {
    isReadyToBeRedirected.value = false
  }
})

// Save the host name as other player when I'm joining his match
watchEffect(() => {
  if (isUserGuest.value) {
    state.setMatchCode(readFirstQ(route, 'id'))
    state.setPlayer1('', '')
    state.setPlayer2(
      readFirstQ(route, 'hostId'),
      readFirstQ(route, 'hostName')
    )
  }
})

const { mutate: registerUser } = useUserRegister({
  onDone: () => {
    if (isUserGuest.value) {
      isReadyToBeRedirected.value = true
    } else {
      isRoomCreated.value = true
    }
  }
})

const { mutate: createRoom } = useCreateRoom({
  onDone: () => {
    const selfId = uuid.v4()
    state.setPlayer1(selfId, state.player1Name)
    registerUser({ playerId: selfId, playerName: state.player1Name })
  }
})

// Create room when user enters the page
onMounted(() => {
  if (!isUserGuest.value) {
    const newRoomId = uuid.v4()
    state.setMatchCode(newRoomId)
    createRoom({ roomId: newRoomId })
  }
})

// Get guest name
const guestPlayerTextInput = ref('')
const setGuestReady = () => {
  const selfId = uuid.v4()
  state.setPlayer1(selfId, guestPlayerTextInput.value)
  registerUser({ playerId: selfId, playerName: guestPlayerTextInput.value })
}

</script>

<template>
  <div
    v-if="!isUserGuest"
    class="flex flex-col justify-center align-center max-w-xl w-full p-8"
  >
    <h1 class="text-2xl text-white">
      Invite your friend {{ state.player1Name }}!
    </h1>

    <div class="flex flex-col my-8 gap-4 p-4 bg-slate-600 rounded-md">
      <p>{{ state.waitingRoomLink }}</p>
      <v-btn v-if="isSupported" @click="copy(waitingRoomLink)">
        Copy
      </v-btn>
      <span v-else>Copy the meeting code and give it to your friend</span>
    </div>

    <h3 v-if="!state.player2Name">
      As soon as your friend join the room, the match will be started
    </h3>
    <h3 v-else>
      {{ state.player2Name }} joined! The match will be started in
      {{ Math.max(secondsToStart, 0) }}...
    </h3>

    <v-btn v-if="state.player2Name" to="/play">
      Start Now!
    </v-btn>
    <v-btn to="/">
      Cancel
    </v-btn>
  </div>

  <div
    v-else
    class="flex flex-col justify-center align-center max-w-xl w-full p-8"
  >
    <v-text-field
      v-model="guestPlayerTextInput"
      required
      :rules="[() => !!guestPlayerTextInput || 'This field is required']"
      label="Full Name"
      placeholder="John Doe"
      variant="outlined"
      class="w-full my-8"
    />
    <v-btn v-if="!state.player1Name" @click="setGuestReady">
      Start
    </v-btn>
    <h3 v-else>
      You are joining {{ state.player2Name }} match! The match will be started
      in {{ Math.max(secondsToStart, 0) }}...
    </h3>
  </div>
</template>

<style scoped lang="scss"></style>
