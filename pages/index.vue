<script lang="ts" setup>
import { GameMode } from 'composables/playersContext'

const { selfPlayer, otherPlayer, gameMode } = injectPlayersContext()
const selectGameMode = (props: GameMode) => { gameMode.value = props }

onMounted(() => {
  selectGameMode('single')
  otherPlayer.value = ''
})
</script>

<template>
  <div class="flex flex-col justify-center align-center max-w-xl w-full p-8">
    <h1 class="text-2xl text-white">
      Welcome to Rock Paper Scissors!
    </h1>

    <v-text-field
      v-model="selfPlayer"
      required
      :rules="[() => !!selfPlayer || 'This field is required']"
      label="Full Name"
      placeholder="John Doe"
      variant="outlined"
      class="w-full my-8"
    />

    <v-btn @click="selectGameMode('single')">
      Single Player
    </v-btn>
    <v-btn @click="selectGameMode('multi')">
      Multi Player
    </v-btn>

    <v-btn :to="gameMode === 'single' ? '/play' : '/waiting-room'">
      Start
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
