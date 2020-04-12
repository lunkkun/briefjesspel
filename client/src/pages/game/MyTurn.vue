<template>
  <div>
    <div v-if="!isStarted" class="generalFont smallFont centerFontH">
      Je bent aan de beurt!
      <button class="centerBlock generalFont bigFont transparentButton" @click="startTurn()">Start je beurt</button>
    </div>

    <div v-else-if="!isFinished">
      <!--<ActiveTurn></ActiveTurn>-->
    </div>

    <div v-else class="generalFont smallFont">
      Je beurt is voorbij!<br>
      <span class="generalFont tinyFont">
        Behaalde score: {{ scoreThisTurn }}<br>
        Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
      </span>
      <button class="centerBlock generalFont bigFont transparentButton" @click="nextTurn()">Geef de beurt door</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'MyTurn',
  computed: {
    ...mapState({
      isStarted: state => state.game.turnStarted,
      isFinished: state => state.game.turnFinished,
      scoreThisTurn: state => state.game.scoreThisTurn,
    }),
    ...mapGetters([
      'activePlayerName',
      'nextPlayerName',
      'activeTeamName',
      'nextTeamName',
    ]),
  },
  methods: mapActions([
    'startTurn',
    'nextTurn',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
