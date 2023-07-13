<template>
  <div>
    <h2>Player Score: {{ playerScore }}</h2>
    <h2>Computer Score: {{ computerScore }}</h2>
    <div>
      <button @click="chooseOption('rock')">Rock</button>
      <button @click="chooseOption('paper')">Paper</button>
      <button @click="chooseOption('scissors')">Scissors</button>
    </div>
    <div v-if="result !== null">
      <h3>{{ result }}</h3>
      <button @click="resetGame">Play Again</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let playerScore = ref(0);
let computerScore = ref(0);
let result = ref<string | null>(null);

const chooseOption = (option: string) => {
  const options = ["rock", "paper", "scissors"];
  const computerOption = options[Math.floor(Math.random() * options.length)];

  if (option === computerOption) {
    result.value = "It's a tie!";
  } else if (
    (option === "rock" && computerOption === "scissors") ||
    (option === "paper" && computerOption === "rock") ||
    (option === "scissors" && computerOption === "paper")
  ) {
    playerScore.value++;
    result.value = "You win!";
  } else {
    computerScore.value++;
    result.value = "Computer wins!";
  }
};

const resetGame = () => {
  playerScore.value = 0;
  computerScore.value = 0;
  result.value = null;
};
</script>
