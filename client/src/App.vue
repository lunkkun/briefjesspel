<template>
  <div id="app">
    <div v-if="isLoaded">
      <Game v-if="gameActive"></Game>
      <Home v-else></Home>
    </div>
    <SpinnerLoader v-else color="#54f1d2" />
  </div>
</template>

<script>
import {mapState} from "vuex"
import SpinnerLoader from '@bit/joshk.vue-spinners-css.spinner-loader'
import Home from './components/Home'
import Game from './components/Game'

export default {
  name: 'App',
  components: {
    Game,
    Home,
    SpinnerLoader,
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
