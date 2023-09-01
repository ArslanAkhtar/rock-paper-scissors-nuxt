<script lang="ts" setup>

definePageMeta({
  middleware: 'user'
})

const { chooseOption, playAgain, playerScore, computerOption, result } =
  gameLogic()

const { isMultiplayer, UserState, selectedRoomId } = userLogic()

const { makeChoice, getResult, otherPlayerSelection } = multiplayerLogic()

const selectOption = (choice: string) => {
  if (isMultiplayer().value) {
    makeChoice(selectedRoomId().value, UserState().value.id, choice)
    const interval = setInterval(async () => {
      const gameResult = await getResult(selectedRoomId().value) as any
      if (gameResult !== undefined && gameResult !== null) {
        clearInterval(interval)
        const currentGameChoices = gameResult?.games[gameResult.games.length - 1]?.playerChoices
        // need to create type for currentGameChoices
        const otherPlayer = currentGameChoices.find((player: any) => player.PlayerId !== UserState().value.id)
        otherPlayerSelection().value = otherPlayer.PlayerChoice
      }
    }, 1000)
  } else {
    chooseOption(choice)
    otherPlayerSelection().value = computerOption.value
  }
}

</script>

<template>
  <div class="game-wrapper">
    <GameResult :playerScore="playerScore" />
    <GameBoard
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
