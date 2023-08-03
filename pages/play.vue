<script lang="ts" setup>
const { chooseOption, playAgain, playerScore, computerOption, result } =
  gameLogic();
</script>

<template>
  <div class="game-wrapper">
    <Result :playerScore="playerScore" />
    <GameBoard
      @chooseOption="chooseOption"
      :houseSelection="(computerOption as string)"
      :result="(result as string)"
      @playAgain="playAgain"
    />
  </div>
</template>

<style scoped lang="scss">
.game-wrapper {
  margin-top: 40px;
}
</style>
