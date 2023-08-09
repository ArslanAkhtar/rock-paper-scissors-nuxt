<script setup>
defineProps({
  playerScore: { type: Number, default: 0 }
})
</script>

<template>
  <v-card class="mx-auto mb-6 result-card" variant="outlined">
    <section class="result-card__items">
      <div class="text-h3 result-card__title">
        ROCK PAPER SCISSORS
      </div>

      <v-card class="result-card__scores">
        <div class="text-h6 text-primary result-card__scores_title">
          SCORE
        </div>
        <div class="text-h2 result-card__scores_val">
          {{ playerScore }}
        </div>
      </v-card>
    </section>
  </v-card>
</template>

<style scoped lang="scss">
.v-card.result-card {
  border-radius: 20px;
  border-width: 3px;
  border-color: #58657e;
}

.result-card__items {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px;
  gap: 250px;
}

.result-card__scores {
  min-width: 150px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.result-card__title {
  max-width: 255px;
  font-weight: bolder;
  line-height: 40px;
}
.result-card__scores_val {
  font-weight: bold;
  color: #57556a;
}
.result-card__scores_title {
  font-weight: 600;
}
</style>
```
