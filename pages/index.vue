<script lang="ts" setup>

const state = usePlayersStore()

</script>

<template>
  <div class="flex flex-col justify-center align-center max-w-xl w-full p-8">
    <h1 class="text-2xl text-white">
      Welcome to Rock Paper Scissors!
    </h1>

    <v-text-field
      v-model="state.player1Name"
      required
      :rules="[() => !!state.player1Name || 'This field is required']"
      label="Full Name"
      placeholder="John Doe"
      variant="outlined"
      class="w-full my-8"
    />

    <v-btn :to="'/play'">
      Single Player
    </v-btn>
    <v-btn :to="'/waiting-room'">
      Multi Player
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
