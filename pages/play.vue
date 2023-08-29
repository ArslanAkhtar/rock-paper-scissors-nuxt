<script lang="ts" setup>
const { chooseOption, playAgain, playerScore, computerOption, result } =
  gameLogic()

</script>

<template>
  <div class="game-wrapper">
    <GameResult :playerScore="playerScore" />
    <GameBoard
      :houseSelection="(computerOption as string)"
      :result="(result as string)"
      @chooseOption="chooseOption"
      @playerScore="playAgain"
    />
  </div>
</template>

<style scoped lang="scss">
.game-wrapper {
  margin-top: 40px;
}
</style>
