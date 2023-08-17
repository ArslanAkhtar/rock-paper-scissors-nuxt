type UserRegisterResult = {
  registerPlayer: {
    PlayerId: string;
  };
};

type UserRegisterVariables = {
  playerId: string;
  playerName: string;
};

export const useUserRegister =
  ({ onDone }: { onDone: () => void }) => {
    const data = useMutation<UserRegisterResult, UserRegisterVariables>(gql`
        mutation RegisterPlayer($playerId: ID!, $playerName: String!) {
          registerPlayer(playerId: $playerId, playerName: $playerName)
        }
      `)

    data.onDone(onDone)

    return data
  }
