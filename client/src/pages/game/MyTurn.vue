<template>
  <HomeCube>
    <div v-if="!isStarted" class="generalFont smallFont centerFontH">
      Je bent aan de beurt!
      <button class="centerBlock generalFont bigFont transparentButton" @click="startTurn()">Start je beurt</button>
    </div>

    <div v-else-if="!isFinished">
      <!-- Nog paperBowl implementeren -->
      <div v-if="entry">
        <button class="centerBlock generalFont bigFont transparentButton" @dblclick="nextEntry()">
          <span>{{ entry.text }}<!-- TODO: font ({{ entry.font }}) --></span>
        </button>
      </div>
      <Timer></Timer>
    </div>

    <div v-else class="generalFont smallFont">
      Je beurt is voorbij!<br>
      <span class="generalFont tinyFont">
        Behaalde score: {{ scoreThisTurn }}<br>
        Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
      </span>
      <button class="centerBlock generalFont bigFont transparentButton" @click="nextTurn()">Geef de beurt door</button>
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

</style>
