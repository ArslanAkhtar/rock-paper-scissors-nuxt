type UserRegisterResult = {
  createRoom: string;
};

type UserRegisterVariables = {
  roomId: string;
};

export const useCreateRoom = ({ onDone }: { onDone: () => void }) => {
  const data = useMutation<UserRegisterResult, UserRegisterVariables>(gql`
    mutation CreateRoom($roomId: ID!) {
      createRoom(roomId: $roomId)
    }
  `)
  data.onDone(onDone)

  return data
}
