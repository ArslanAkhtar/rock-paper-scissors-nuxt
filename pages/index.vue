<script lang="ts" setup>
const { createUser, UserState, isMultiplayer } = userLogic()

const selectGameMode = () => {
  isMultiplayer().value = true
}

</script>

<template>
  <div class="flex flex-col justify-center align-center max-w-xl w-full p-8">
    <h1 class="text-2xl text-white">
      Welcome to Rock Paper Scissors!
    </h1>

    <CreatePlayer v-if="UserState().value.id === ''" @createUser="createUser" />

    <div v-if="UserState().value.id !== ''">
      <v-btn to="/waiting-area" @click="selectGameMode">
        Multiplayer
      </v-btn>
      <v-btn to="/play">
        Single Player
      </v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
