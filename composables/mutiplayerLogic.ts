import { GET_ALL_ROOMS, JOIN_ROOM } from '../graphql/queries'

export const multiplayerLogic = () => {
  const Rooms = ref<any>([])

  const createRoom = async () => {
    console.log('createRoom')

    const query = gql`
      mutation CreateRoom {
        createRoom
      }
    `
    const { data } = await useAsyncQuery(query)

    console.log('data', data.value)
  }

  const getAllRooms = async () => {
    const { data } = await useAsyncQuery(GET_ALL_ROOMS)

    const rooms = data?.value as any

    Rooms.value = rooms?.getAllRooms
  }

  const joinRoom = async (roomId: string, playerId:string) => {
    const variables = {
      roomId,
      playerId
    }
    const { data } = await useAsyncQuery(JOIN_ROOM, variables)

    console.log('data', data.value)
  }

  return {
    Rooms,
    createRoom,
    getAllRooms,
    joinRoom
  }
}
