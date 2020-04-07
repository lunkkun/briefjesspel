<template>
  <HomeCube>
    <div v-if="!isStarted" class="generalFont">
      De beurt is aan jou!
      <button class="centerHome generalFont transparentButton startTurnButton" @click="startTurn">Start je beurt</button>
    </div>
    <div v-else-if="!isFinished">
      <div v-if="entry">
        <button class="centerHome generalFont transparentButton entryButton" @click="nextEntry">
          <span>{{ entry.text }}<!-- TODO: font ({{ entry.font }}) --></span>
        </button>
      </div>
      <Timer></Timer>
    </div>
    <div v-else class="generalFont">
      Je beurt is voorbij!<br>
      Behaalde score: {{ scoreThisTurn }}<br>
      Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
      <button class="centerHome generalFont transparentButton nextTurnButton" @click="nextTurn">Geef de beurt door</button>
    </div>
  </HomeCube>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import HomeCube from '../../components/HomeCube'
import Timer from '../../components/Timer'

export default {
  name: 'MyTurn',
  components: {
    HomeCube,
    Timer,
  },
  computed: {
    ...mapState({
      isStarted: state => state.game.turnStarted,
      isFinished: state => state.game.turnFinished,
      entry: state => state.game.activeEntry,
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
    'nextEntry',
    'nextTurn',
  ]),
}
</script>

<style lang="scss" scoped>
.startTurnButton {
  font-size: 10vmin;
  font-weight: bold;
  color: #344558;
}
.entryButton {
  font-size: 8vmin;
  font-weight: bold;
  color: #344558;
}
.nextTurnButton {
  font-size: 10vmin;
  font-weight: bold;
  color: #344558;
}
</style>
