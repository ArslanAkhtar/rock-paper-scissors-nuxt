<script lang="ts" setup></script>

<template>
  <v-app theme="VuetifyTheme">
    <!-- <Header /> -->
    <v-main class="main-wrapper">
      <slot />
    </v-main>

    <!-- <Footer /> -->
  </v-app>
</template>

<style scoped lang="scss">
.main-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
