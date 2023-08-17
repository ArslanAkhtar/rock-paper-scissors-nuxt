<script lang="ts" setup>
const route = useRoute()
const isSinglePlayer = computed(() => !readFirstQ(route, 'id'))

const { chooseOption, playAgain, playerScore, computerOption, result } =
  gameLogic()
const { finalResult, player2Choice, makeChoice, resetGame } =
  useMultiplayerLogic(
    readFirstQ(route, 'id'),
    readFirstQ(route, 'hostId') || readFirstQ(route, 'guestId')
  )

const choose = computed(() =>
  isSinglePlayer.value ? chooseOption : makeChoice
)
const reset = computed(() => (isSinglePlayer.value ? playAgain : resetGame))
</script>

<template>
  <div class="game-wrapper">
    {{ finalResult }}
    <GameResult :playerScore="playerScore" />
    <GameBoard
      :player2Choice="computerOption || player2Choice"
      :result="result || undefined"
      @choose-option="choose"
      @play-again="reset"
    />
  </div>
</template>

<style scoped lang="scss">
.game-wrapper {
  margin-top: 40px;
}
</style>
