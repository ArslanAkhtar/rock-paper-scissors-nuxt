import { GET_ALL_ROOMS, CREATE_ROOM, JOIN_ROOM, MAKE_CHOICE, GET_RESULT } from '../graphql/queries'

export const multiplayerLogic = () => {
  const Rooms = ref<any>([])
  const otherPlayerSelection = () => useState<null | string>('optionSelection', () => null)

  const createRoom = async () => {
    await useAsyncQuery(CREATE_ROOM)
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
    await useAsyncQuery(JOIN_ROOM, variables)
  }

  const makeChoice = async (roomId: string, playerId:string, choice:string) => {
    const variables = {
      roomId,
      playerId,
      choice
    }
    await useAsyncQuery(MAKE_CHOICE, variables)
  }

  const getResult = async (roomId: string) => {
    const variables = { roomId }
    const { data } = await useAsyncQuery(GET_RESULT, variables)
    const result = data?.value as any

    return result?.getGameResult
  }

  return {
    Rooms,
    createRoom,
    getAllRooms,
    joinRoom,
    makeChoice,
    getResult,
    otherPlayerSelection
  }
}
