type ResetGameVariable = {
  roomId: string;
};

export const useResetGame = (variables: ResetGameVariable) =>
  useMutation<unknown, ResetGameVariable>(
    gql`
      mutation ResetGame($roomId: ID!) {
        resetGame(roomId: $roomId)
      }
    `,
    {
      variables
    }
  )
