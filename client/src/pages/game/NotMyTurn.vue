<template>
  <div>
    <div v-if="!isFinished">
      <span class="generalFont mediumFont centerBlock">
        De beurt is aan {{ activePlayerName }} ({{ activeTeamName }})!
      </span>
      <Timer v-if="isStarted"></Timer>
    </div>
    <div v-else class="generalFont smallFont">
      De beurt is voorbij!<br>
      <span class="generalFont tinyFont">
        Behaalde score: {{ scoreThisTurn }}<br>
      </span>
      <span v-if="imNext" class="generalFont tinyFont">
        Jij bent hierna aan de beurt!
      </span>
      <span v-else class="generalFont tinyFont">
        Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
      </span>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Timer from '../../components/Timer'

export default {
  name: 'NotMyTurn',
  components: {
    Timer,
  },
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
      'imNext',
    ]),
  },
}
</script>

<style lang="scss" scoped>

</style>
