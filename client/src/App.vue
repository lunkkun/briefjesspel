<template>
  <div id="app">
    <HelpButton></HelpButton>
    <Help v-if="showHelp"></Help>
    <div v-else-if="isLoaded">
      <Game v-if="gameStarted"></Game>
      <Setup v-else-if="gameCreated"></Setup>
      <Home v-else></Home>
    </div>
    <HomeCube v-else>
      <SpinnerLoader class="centerHome" color="#344558" />
    </HomeCube>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SpinnerLoader from '@bit/joshk.vue-spinners-css.spinner-loader'
import HelpButton from './components/HelpButton'
import HomeCube from './components/HomeCube'
import Game from './pages/Game'
import Help from './pages/Help'
import Home from './pages/Home'
import Setup from './pages/Setup'

export default {
  name: 'App',
  components: {
    SpinnerLoader,
    HelpButton,
    HomeCube,
    Game,
    Help,
    Home,
    Setup,
  },
  computed: mapState({
    isLoaded: state => state.isLoaded,
    showHelp: state => state.showHelp,
    gameCreated: state => state.game.isCreated,
    gameStarted: state => state.game.isStarted,
  }),
}
</script>

<style lang="scss">
#app {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #688980;
}
.centerHome {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
}
.generalFont{
  font-family: Capone Light, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #344558;
  caret-color: #344558;

}
.transparentButton {
  display: block;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  width: max-content;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>
