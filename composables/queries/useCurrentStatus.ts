import { OptionsParameter } from '@vue/apollo-composable/dist/useQuery'
import { Choice } from 'utils/types'

export type CurrentStatusResult = {
  currentStatus: {
    result: string;
    playerChoices: {
      PlayerId: string;
      PlayerChoice: Choice;
    }[];
  };
};

export type CurrentStatusVariables = {
  roomId: string;
};

export type CurrentStatusOptions =
  | OptionsParameter<CurrentStatusResult, CurrentStatusVariables>
  | globalThis.Ref<
      OptionsParameter<CurrentStatusResult, CurrentStatusVariables>
    >;

export const useCurrentStatus = (
  variables: CurrentStatusVariables,
  options: CurrentStatusOptions
) =>
  useQuery<CurrentStatusResult, CurrentStatusVariables>(
    gql`
      query CurrentStatus($roomId: ID!) {
        currentStatus(roomId: $roomId) {
          result
          playerChoices {
            PlayerId
            PlayerChoice
          }
        }
      }
    `,
    variables,
    options as OptionsParameter<CurrentStatusResult, CurrentStatusVariables>
  )
