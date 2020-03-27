<template>
  <div>
    <label for="entriesPerPlayer">Aantal briefjes per speler:</label>
    <input id="entriesPerPlayer" type="number" v-model="settings.entriesPerPlayer">
    <button @click="newGame(settings)">Verder</button>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: 'Setup',
  data() {
    return {
      settings: {
        entriesPerPlayer: 4,
      }
    }
  },
  methods: mapActions([
    'newGame',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
