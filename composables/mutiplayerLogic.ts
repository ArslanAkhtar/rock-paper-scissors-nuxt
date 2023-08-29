import { GET_ALL_ROOMS, CREATE_ROOM, JOIN_ROOM, MAKE_CHOICE } from '../graphql/queries'

export const multiplayerLogic = () => {
  const Rooms = ref<any>([])

  const createRoom = async () => {
    const { data } = await useAsyncQuery(CREATE_ROOM)

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

  const makeChoice = async (roomId: string, playerId:string, choice:string) => {
    const variables = {
      roomId,
      playerId,
      choice
    }

    console.log('variables', variables)
    const { data } = await useAsyncQuery(MAKE_CHOICE, variables)

    console.log('data', data.value)
  }

  return {
    Rooms,
    createRoom,
    getAllRooms,
    joinRoom,
    makeChoice
  }
}
