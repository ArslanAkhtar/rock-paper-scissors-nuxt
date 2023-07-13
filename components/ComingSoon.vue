<template>
  <v-container fluid class="coming-soon-container">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <h1 class="display-2">Coming Soon!</h1>
        <p class="subheading">
          Our website is under construction. Stay tuned for updates.
        </p>
        <div class="countdown">
          <span class="countdown-digit">{{ timeRemaining.days }}</span>
          <span class="countdown-label">Days</span>
          <span class="countdown-digit">{{ timeRemaining.hours }}</span>
          <span class="countdown-label">Hours</span>
          <span class="countdown-digit">{{ timeRemaining.minutes }}</span>
          <span class="countdown-label">Minutes</span>
          <span class="countdown-digit">{{ timeRemaining.seconds }}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const countdownDate = new Date("2023-06-01T00:00:00"); // Set your target date and time here
const now = ref(new Date());

setInterval(() => {
  now.value = new Date();
}, 1000);

const timeRemaining = computed(() => {
  const difference = countdownDate.getTime() - now.value.getTime();

  const seconds = Math.floor((difference / 1000) % 60);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
});
</script>

<style lang="scss" scoped>
.coming-soon-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.display-2 {
  font-weight: 500;
  margin-bottom: 24px;
}

.subheading {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 32px;
}

.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  .countdown-digit {
    display: inline-block;
    font-weight: 500;
    margin: 0 4px;
  }

  .countdown-label {
    display: inline-block;
    margin: 0 4px;
  }
}
</style>
