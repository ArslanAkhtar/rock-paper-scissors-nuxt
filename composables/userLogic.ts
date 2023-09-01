import { REGISTER_USERS } from '../graphql/queries'
import { User } from '~/utils/types'
export const userLogic = () => {
  const defaultUser = {
    id: '',
    playerName: ''
  }

  const UserState = () => useState<User>('userDetails', () => defaultUser)
  const isMultiplayer = () => useState('isMultiplayer', () => false)
  const selectedRoomId = () => useState<string>('selectedRoomId', () => '')

  const createUser = async (name:string) => {
    const variables = {
      playerName: name
    }
    const { data } = await useAsyncQuery(REGISTER_USERS, variables)
    const user = data?.value as any
    UserState().value = user.registerPlayer as User
  }

  return {
    createUser,
    UserState,
    isMultiplayer,
    selectedRoomId
  }
}
