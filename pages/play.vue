<script lang="ts" setup>
const { chooseOption, playAgain, playerScore, computerOption, result } =
  gameLogic()

const { isMultiplayer, UserState, selectedRoomId } = userLogic()

const { makeChoice } = multiplayerLogic()

const selectOption = (choice: string) => {
  if (isMultiplayer().value) {
    makeChoice(selectedRoomId().value, UserState().value.id, choice)
  } else {
    chooseOption(choice)
  }
}

</script>

<template>
  <div class="game-wrapper">
    <GameResult :playerScore="playerScore" />
    <GameBoard
      :houseSelection="(computerOption as string)"
      :result="(result as string)"
      @choose-option="selectOption"
      @playerScore="playAgain"
    />
  </div>
</template>

<style scoped lang="scss">
.game-wrapper {
  margin-top: 40px;
}
</style>
