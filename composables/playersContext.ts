import { ref, provide } from 'vue'

const selfPlayer = ref('Guest123')
const otherPlayer = ref('')
const meetingCode = ref('aviro123')

export type GameMode = 'single' | 'multi';
const gameMode = ref<GameMode>('single')

const playersContext = {
  selfPlayer,
  otherPlayer,
  gameMode,
  meetingCode
}

export type PlayersContext = typeof playersContext
export const providePlayersContext = () => provide('playersContext', playersContext)
export const injectPlayersContext = () => inject<PlayersContext>('playersContext') || playersContext
