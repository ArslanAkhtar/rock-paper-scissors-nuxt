export type Choice = 'rock' | 'paper' | 'scissors';

type makeChoiceVariable = {
  roomId: string;
  choice: Choice;
  playerId: string;
};

const makeChoiceGql = gql`
  mutation MakeChoice($roomId: ID!, $choice: String!, $playerId: Int!) {
    makeChoice(
      roomId: $makeChoiceRoomId2
      choice: $choice
      playerId: $playerId
    ) {
      playerChoices {
        PlayerChoice
        PlayerId
      }
    }
  }
`

type resetGameVariable = {
  roomId: string;
};

const resetGameGql = gql`
  mutation ResetGame($roomId: ID!) {
    resetGame(roomId: $roomId)
  }
`

export const multiplayerLogic = () => {
  const store = usePlayersStore()
  const selfPlayerChoice = ref<Choice | null>(null)
  // const otherPlayerChoice = ref<Choice | null>(null)

  const { mutate: makeChoiceMutation } = useMutation<
    unknown,
    makeChoiceVariable
  >(makeChoiceGql)

  const { mutate: resetGameMutation } = useMutation<unknown, resetGameVariable>(
    resetGameGql,
    { variables: { roomId: store.matchCode } }
  )

  const makeChoice = async (choice: Choice | string) => {
    selfPlayerChoice.value = choice as Choice

    return await makeChoiceMutation({
      roomId: store.matchCode,
      playerId: store.player1Id,
      choice: selfPlayerChoice.value
    })
  }

  const resetGame = async () => await resetGameMutation()

  return {
    makeChoice,
    resetGame
  }
}
