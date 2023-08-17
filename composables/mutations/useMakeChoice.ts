import { Choice } from 'utils/types'

type makeChoiceVariable = {
  roomId: string;
  choice: Choice;
  playerId: string;
};

export const useMakeChoice = () => {
  return useMutation<unknown, makeChoiceVariable>(gql`
    mutation MakeChoice($roomId: ID!, $choice: String!, $playerId: String!) {
      makeChoice(roomId: $roomId, choice: $choice, playerId: $playerId) {
        playerChoices {
          PlayerChoice
          PlayerId
        }
      }
    }
  `)
}
