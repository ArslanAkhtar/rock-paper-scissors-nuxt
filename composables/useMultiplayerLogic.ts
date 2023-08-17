import { useMakeChoice } from './mutations/useMakeChoice'
import { useResetGame } from './mutations/useResetGame'
import { CurrentStatusOptions } from './queries/useCurrentStatus'
import { Choice } from 'utils/types'

export const useMultiplayerLogic = (roomId: string, playerId: string) => {
  const state = usePlayersStore()

  onMounted(() => {
    state.setMatchCode(roomId)
    state.setPlayer1(playerId, '')
  })

  const { mutate: resetGame } = useResetGame({ roomId: state.matchCode })
  const { mutate: makeChoiceMutation, onDone } = useMakeChoice()

  const currentStatusOptions = ref<CurrentStatusOptions>({ enabled: false })
  onDone(() => {
    currentStatusOptions.value = {
      enabled: true,
      pollInterval: 500
    }
  })

  const { result: statusResult } = useCurrentStatus(
    { roomId },
    currentStatusOptions
  )
  const currentStatus = computed(() => statusResult.value?.currentStatus)
  const finalResult = computed(() => currentStatus.value?.result)
  const playerChoices = computed(() => currentStatus.value?.playerChoices)
  const player1Choice = computed(
    () =>
      playerChoices.value?.findLast(
        playerChoice => playerChoice.PlayerId === playerId
      )?.PlayerChoice
  )
  const player2Choice = computed(
    () =>
      playerChoices.value?.findLast(
        playerChoice => playerChoice.PlayerId !== playerId
      )?.PlayerChoice
  )

  watchEffect(() => {
    if (player2Choice.value) {
      currentStatusOptions.value = { enabled: false, pollInterval: 10000 }
    }
  })

  return {
    finalResult,
    player1Choice,
    player2Choice,
    resetGame,
    makeChoice: async (choice: Choice) =>
      await makeChoiceMutation({
        roomId: state.matchCode,
        playerId: state.player1Id,
        choice
      })
  }
}
