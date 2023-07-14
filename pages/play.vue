<script lang="ts" setup>
import { ref } from "vue";

let playerScore = ref(0);
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
    playerScore.value--;
    result.value = "Computer wins!";
  }
};

const resetGame = () => {
  playerScore.value = 0;
  result.value = null;
};
</script>

<template>
  <div>
    <Result :playerScore="playerScore" />
    <GameBoard @chooseOption="chooseOption" />
  </div>
</template>

<style scoped lang="scss"></style>
