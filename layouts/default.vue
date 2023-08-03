<script lang="ts" setup></script>

<template>
  <v-app theme="VuetifyTheme">
    <!-- <Header /> -->
    <v-main class="background-effect">
      <v-container>
        <section class="main-wrapper">
          <slot />
        </section>
      </v-container>
    </v-main>

    <!-- <Footer /> -->
  </v-app>
</template>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  justify-content: center;
}

.background-effect {
  position: relative;
  background-image: radial-gradient(rgba(30, 51, 82, 0.5), transparent);
  overflow: hidden;
}

.background-effect::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  background-color: rgba(30, 51, 82, 0.1);
  border-radius: 50%;
  z-index: 0;

  background: linear-gradient(
    45deg,
    rgba(24, 30, 64, 0.1) 0%,
    rgba(25, 36, 68, 0.2) 25%,
    rgba(25, 38, 72, 0.3) 50%,
    rgba(29, 45, 78, 0.2) 75%,
    rgba(30, 53, 84, 0.4) 100%
  );
  background-size: 200% 200%;
  background-position: 0% 50%;
}
</style>
