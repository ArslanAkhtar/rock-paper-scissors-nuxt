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

export const CREATE_ROOM = gql`
  mutation CreateRoom {
    createRoom
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

export const MAKE_CHOICE = gql`
mutation MakeChoice($roomId: String!, $playerId: String!, $choice: String!) {
  makeChoice(roomId: $roomId, playerId: $playerId, choice: $choice) {
    games {
      playerChoices {
        PlayerId
        PlayerChoice
      }
    }
  }
}
`

export const GET_RESULT = gql`
query GetGameResult($roomId: String!) {
  getGameResult(roomId: $roomId) {
    roomId
    users {
      id
      playerName
    }
    games {
      playerChoices {
        PlayerId
        PlayerChoice
      }
      result
    }
  }
}
`
