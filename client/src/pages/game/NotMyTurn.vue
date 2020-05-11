<template>
  <div>
    <div v-if="!isFinished">
      <div class="textFont mediumFont centerBlock">
        {{ activePlayerName }} ({{ activeTeamName }}) is aan de beurt!
      </div>
      <Timer></Timer>
    </div>

    <div v-else class="centerBlock">
      <div class="textFont mediumFont">
        De beurt is voorbij!
      </div>
      <div class="textFont smallerFont">
        <br>
        Behaalde score: {{ scoreThisTurn }}<br>
        <span v-if="imNext">
          Jij bent hierna aan de beurt!
        </span>
        <span v-else>
          Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
        </span>
      </div>
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
