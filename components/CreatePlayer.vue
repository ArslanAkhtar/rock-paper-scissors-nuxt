<script setup lang="ts">
const userName = ref('')

defineEmits(['createUser'])

</script>
<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          ref="name"
          v-model="userName"
          :rules="[() => !!userName || 'This field is required']"
          label="Full Name"
          placeholder="John Doe"
          required
          width="100%"
        />
      </v-col>
    </v-row>
    <v-col>
      <v-btn @click="() => $emit('createUser', userName)">
        Create User
      </v-btn>
    </v-col>
    <v-row />
  </v-container>
</template>
