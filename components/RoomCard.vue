<script setup lang="ts">
const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  playersCount: {
    type: Number,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['room-joined'])

const { joinRoom } = multiplayerLogic()
const { selectedRoomId } = userLogic()

const joinRoomById = async () => {
  const { roomId, playerId } = props
  selectedRoomId().value = roomId

  await joinRoom(roomId, playerId)
  emit('room-joined')
}
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          ROOM # ({{ count }})
        </div>
        <div class="text-h6 mb-1">
          Players ({{ playersCount }})
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn v-if="playersCount !== 2" variant="outlined" @click="joinRoomById">
        Join Room
      </v-btn>
      <v-btn v-if="playersCount === 2" variant="outlined" to="/play">
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
