<template>
  <HomeCube>
    <div v-if="!isFinished">
      <div v-if="!roundStarted">
        <div v-if="isMaster">
          <!-- TODO: tijd per ronde aanpassen -->
          <button class="centerHome generalFont transparentButton startRoundButton" @click="startRound">Start ronde</button>
        </div>
        <div v-else class="generalFont">
          Wachten tot de ronde start...
        </div>
      </div>
      <div v-else-if="!roundFinished">
        <MyTurn v-if="myTurn"></MyTurn>
        <NotMyTurn v-else></NotMyTurn>
      </div>
      <RoundFinished v-else></RoundFinished>
    </div>
    <div v-else class="generalFont centerHome">
      EINDE
      <!-- TODO: nieuw spel kunnen starten -->
      <!-- TODO: spel kunnen verlaten -->
    </div>
  </HomeCube>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import HomeCube from '../components/HomeCube'
import MyTurn from '../components/game/MyTurn'
import NotMyTurn from '../components/game/NotMyTurn'
import RoundFinished from '../components/game/RoundFinished'

export default {
  name: 'Game',
  components: {
    HomeCube,
    MyTurn,
    NotMyTurn,
    RoundFinished,
  },
  computed: {
    ...mapState({
      isFinished: state => state.game.isFinished,
      roundStarted: state => state.game.roundStarted,
      roundFinished: state => state.game.roundFinished,
    }),
    ...mapGetters([
      'isMaster',
      'myTurn',
    ]),
  },
  methods: mapActions([
    'startRound',
  ]),
}
</script>

<style lang="scss" scoped>
.startRoundButton {
  font-size: 12vmin;
  font-weight: bold;
  color: #344558;
}
</style>
