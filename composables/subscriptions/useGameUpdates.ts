// import { UseSubscriptionOptions } from '@vue/apollo-composable'
import { Choice } from 'utils/types'

type GameUpdatesVariables = {
  roomId: string;
};

type GameUpdatesResult = {
  result: string;
  playersChoice: { PlayerChoice: Choice; playerId: string }[];
};

export const useGameUpdates = (
  { roomId }: GameUpdatesVariables
//   { enabled }: UseSubscriptionOptions
) => {
  return useSubscription<GameUpdatesResult, GameUpdatesVariables>(
    subscription,
    { roomId }
  )
}

const subscription = gql`
  subscription GameUpdates($roomId: ID!) {
    gameUpdates(roomId: $roomId) {
      result
      playerChoices {
        PlayerChoice
        PlayerId
      }
    }
  }
`
