export const GET_ALL_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      roomId
      users {
        id
        playerName
      }
      games {
        playerChoices {
          PlayerChoice
          PlayerId
        }
      }
    }
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      playerName
    }
  }
`

export const REGISTER_USERS = gql`
mutation RegisterPlayer($playerName: String!) {
  registerPlayer(playerName: $playerName) {
    id
    playerName
  }
}
`

export const JOIN_ROOM = gql`
mutation JoinRoom($roomId: String!, $playerId: String!) {
  joinRoom(roomId: $roomId, playerId: $playerId) {
    roomId
    users {
      id
      playerName
    }
  }
}
`
