<script lang="ts" setup>
const { createRoom, getAllRooms, Rooms } = multiplayerLogic()
const { UserState } = userLogic()

const createAndGetRooms = async () => {
  await createRoom()
  await getAllRooms()
}

await getAllRooms()
const playerId = await UserState()?.value?.id

const roomJoined = async () => {
  await getAllRooms()
}

</script>

<template>
  <div class="flex flex-col justify-center align-center w-full p-8">
    <h1 class="text-2xl text-white">
      Welcome to Multiplayer Rock Paper Scissors!
    </h1>
    <v-btn @click="createAndGetRooms()">
      Create Room
    </v-btn>

    <v-container v-if="playerId">
      <v-row>
        <v-col
          v-for="(Room, index) in Rooms"
          :key="Room.id"
          cols="4"
        >
          <RoomCard :count="index+1" :playersCount="Room.users.length" :roomId="Room.roomId" :playerId="playerId" @room-joined="roomJoined" />
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-btn to="/play" disabled>
      Start
    </v-btn> -->
  </div>
</template>

<style scoped lang="scss"></style>
