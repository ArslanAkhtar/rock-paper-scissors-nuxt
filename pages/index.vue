<script lang="ts" setup>

const query = gql`
  mutation Mutation {
    createRoom(roomId: 1)
  }
`
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query, variables)

console.log('data', data.value)
</script>

<template>
  <div class="flex flex-col justify-center align-center max-w-xl w-full p-8">
    <h1 class="text-2xl text-white">
      Welcome to Rock Paper Scissors!
    </h1>

    <v-btn to="/play">
      Start
    </v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
