<script setup>
defineProps({
  playerScore: Number,
});
</script>

<template>
  <v-card class="mx-auto mb-6 mt-20" max-width="344" variant="outlined">
    <v-card-item>
      <h2>Player Score: {{ playerScore }}</h2>
      <!-- <div>
        <div class="text-overline mb-1">OVERLINE</div>
        <div class="text-h6 mb-1">Headline</div>
        <div class="text-caption">
          Greyhound divisely hello coldly fonwderfully
        </div>
      </div> -->
    </v-card-item>

    <!-- <v-card-actions>
      <v-btn variant="outlined"> Button </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<style scoped lang="scss">
.v-card {
  border-radius: 10px;
  border-width: 3px;
  border-color: #58657e;
}
</style>
```
