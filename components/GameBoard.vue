<script lang="ts" setup>
const emit = defineEmits<{
  (e: "chooseOption", value: string): void;
}>();
</script>

<template>
  <div>
    <v-btn @click="emit('chooseOption', 'rock')">Rock</v-btn>
    <v-btn @click="emit('chooseOption', 'paper')">Paper</v-btn>
    <v-btn @click="emit('chooseOption', 'scissors')">Scissors</v-btn>
  </div>
  <!-- <div>
    <h2>Player Score: {{ playerScore }}</h2>
    <h2>Computer Score: {{ computerScore }}</h2>
    <div>
      <v-btn @click="chooseOption('rock')">Rock</v-btn>
      <v-btn @click="chooseOption('paper')">Paper</v-btn>
      <v-btn @click="chooseOption('scissors')">Scissors</v-btn>
    </div>
    <div v-if="result !== null">
      <h3>{{ result }}</h3>
      <v-btn @click="resetGame">Play Again</v-btn>
    </div>
  </div> -->
</template>
