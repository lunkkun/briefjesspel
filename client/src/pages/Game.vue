<template>
  <div v-if="!isFinished">
    <RoundSetup v-if="!roundStarted"></RoundSetup>
    <div v-else-if="!roundFinished">
      <MyTurn v-if="myTurn"></MyTurn>
      <NotMyTurn v-else></NotMyTurn>
    </div>
    <RoundFinished v-else></RoundFinished>
  </div>
  <Finished v-else></Finished>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import HomeCube from '../components/HomeCube'
import Finished from './game/Finished'
import MyTurn from './game/MyTurn'
import NotMyTurn from './game/NotMyTurn'
import RoundFinished from './game/RoundFinished'
import RoundSetup from './game/RoundSetup'

export default {
  name: 'Game',
  components: {
    HomeCube,
    Finished,
    MyTurn,
    NotMyTurn,
    RoundFinished,
    RoundSetup,
  },
  computed: {
    ...mapState({
      isFinished: state => state.game.isFinished,
      roundStarted: state => state.game.roundStarted,
      roundFinished: state => state.game.roundFinished,
    }),
    ...mapGetters([
      'myTurn',
    ]),
  },
}
</script>

<style lang="scss" scoped>

</style>
