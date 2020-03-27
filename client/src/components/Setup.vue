<template>
  <div>
    <button v-if="!showSettings" @click="showSettings = true">Start nieuw spel</button>
    <div v-else>
      <label for="entriesPerPlayer">Aantal briefjes per speler:</label>
      <input id="entriesPerPlayer" type="number" v-model="settings.entriesPerPlayer">
      <button @click="newGame(settings)">Verder</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: 'Setup',
  data() {
    return {
      showSettings: false,
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
