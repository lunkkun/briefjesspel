<template>
  <div id="app">
    <div v-if="isLoaded">
      <Game v-if="gameActive"></Game>
      <Setup v-else></Setup>
    </div>
    <SpinnerLoader v-else color="#54f1d2" />
  </div>
</template>

<script>
import {mapState} from "vuex"
import SpinnerLoader from '@bit/joshk.vue-spinners-css.spinner-loader'
import Setup from './components/Setup'
import Game from './components/Game'

export default {
  name: 'App',
  components: {
    Game,
    SpinnerLoader,
    Setup,
  },
  computed: mapState({
    isLoaded: state => state.game.isLoaded,
    gameActive: state => state.game.isActive,
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
