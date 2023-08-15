<script lang="ts" setup>
const route = useRoute()
const isSinglePlayer = computed(() => !readFirstQ(route, 'id'))

const { chooseOption, playAgain, playerScore, computerOption, result } =
  gameLogic()
const { makeChoice, resetGame } = multiplayerLogic()

const { load, result: statusResult } = useLazyQuery(
  gql`
    query CurrentStatus($roomId: ID!) {
      currentStatus(roomId: $roomId) {
        playerChoices {
          PlayerId
        }
      }
    }
  `
)

onMounted(() => {
  const id = readFirstQ(route, 'id')
  if (id) {
    load(undefined, { roomId: id })
  }
})

console.log({ statusResult })

const choose = computed(() => (isSinglePlayer ? chooseOption : makeChoice))
const reset = computed(() => (isSinglePlayer ? playAgain : resetGame))
</script>

<template>
  <div class="game-wrapper">
    <GameResult :playerScore="playerScore" />
    <GameBoard
      :houseSelection="(computerOption as string)"
      :result="(result as string)"
      @chooseOption="choose"
      @playAgain="reset"
    />
  </div>
</template>

<style scoped lang="scss">
.game-wrapper {
  margin-top: 40px;
}
</style>
