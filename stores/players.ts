import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    player1Id: '',
    player1Name: 'Guest123',
    player2Id: '',
    player2Name: '',
    matchCode: '',
    matchLink: '',
    waitingRoomLink: ''
  }),
  getters: {
    matchLink: ({ matchCode }) => `/play?id=${matchCode}`,
    waitingRoomLink: ({ matchCode, player1Id, player1Name }) => {
      return `/waiting-room?id=${matchCode}&hostId=${player1Id}&hostName=${player1Name}`
    }
  },
  actions: {
    setPlayer1 (id: string, name: string) {
      this.player1Id = id
      this.player1Name = name
    },
    setPlayer2 (id: string, name: string) {
      this.player2Id = id
      this.player2Name = name
    },
    setMatchCode (code: string) {
      this.matchCode = code
    }
  }
})
