<template>
  <div>
    <div v-if="shareableLink && isMaster">
      {{ shareableLink }}
    </div>

    <div v-if="!_playerName">
      <label for="playerName">Vul je naam in:</label>
      <input id="playerName" type="text" v-model="playerName">
      <button @click="setPlayerName(playerName)">Verder</button>
    </div>
    <div v-else-if="!_entriesPerPlayer && isMaster">
      <label for="entriesPerPlayer">Aantal briefjes per speler:</label>
      <input id="entriesPerPlayer" type="number" min="1" max="10" v-model="entriesPerPlayer">
      <button @click="setEntriesPerPlayer(entriesPerPlayer)">Verder</button>
    </div>
    <!-- briefjes invullen -->
    <!-- teams samenstellen -->
    <!-- tijd per ronde instellen -->
    <div v-else-if="canStart && isMaster">
      <button @click="startGame">Start</button>
    </div>
    <div v-else>
      Wachten tot het fisten kan beginnen...
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"

export default {
  name: 'Setup',
  data() {
    return {
      playerName: '',
      entriesPerPlayer: 4,
    }
  },
  computed: {
    ...mapState({
      canStart: state => state.game.canStart,
      _playerName: state => state.game.playerName,
      _entriesPerPlayer: state => state.game.entriesPerPlayer,
    }),
    ...mapGetters([
      'isMaster',
      'shareableLink',
    ]),
  },
  methods: mapActions([
    'setPlayerName',
    'setEntriesPerPlayer',
    'startGame',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
