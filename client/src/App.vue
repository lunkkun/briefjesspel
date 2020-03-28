<template>
  <div id="app">
    <div v-if="isLoaded">
      <Game v-if="gameStarted"></Game>
      <Setup v-else-if="gameCreated"></Setup>
      <Home v-else></Home>
    </div>
    <SpinnerLoader v-else color="#54f1d2" />
  </div>
</template>

<script>
import {mapState} from "vuex"
import SpinnerLoader from '@bit/joshk.vue-spinners-css.spinner-loader'
import Game from './components/Game'
import Home from './components/Home'
import Setup from './components/Setup'

export default {
  name: 'App',
  components: {
    SpinnerLoader,
    Game,
    Home,
    Setup,
  },
  computed: mapState({
    isLoaded: state => state.game.isLoaded,
    gameCreated: state => state.game.isCreated,
    gameStarted: state => state.game.isStarted,
  }),
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
