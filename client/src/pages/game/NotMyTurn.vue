<template>
  <HomeCube>
    <div v-if="!isFinished">
      <span class="generalFont centerHome">
        De beurt is aan {{ activePlayerName }} ({{ activeTeamName }})!
      </span>
      <Timer v-if="isStarted"></Timer>
    </div>
    <div v-else class="generalFont">
      De beurt is voorbij!<br>
      Behaalde score: {{ scoreThisTurn }}<br>
      Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
    </div>
  </HomeCube>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import HomeCube from '../../components/HomeCube'
import Timer from '../../components/Timer'

export default {
  name: 'NotMyTurn',
  components: {
    HomeCube,
    Timer,
  },
  computed: {
    ...mapState({
      isStarted: state => state.game.turnStarted,
      isFinished: state => state.game.turnFinished,
    }),
    ...mapGetters([
      'activePlayerName',
      'nextPlayerName',
      'activeTeamName',
      'nextTeamName',
    ]),
  },
}
</script>

<style lang="scss" scoped>

</style>
