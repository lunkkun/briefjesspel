<template>
<div id="app">
  <div class="infoCorner"></div>
  <div class="infoCornerBottomLeft"></div>
  <div class="homeCubeDropShadow"></div>
  <div class="homeCube">
    <div v-if="isLoaded">
      <Game v-if="gameStarted"></Game>
      <Setup v-else-if="gameCreated"></Setup>
      <Home v-else></Home>
    </div>
    <SpinnerLoader class="centerHome" v-else color="#344558" />
  </div>
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
    isLoaded: state => state.isLoaded,
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
.homeCube {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vmin;
  height: 75vmin;
  max-width: 460px;
  max-height: 460px;
  background-color: #F6D370;
  z-index: 20;
}
.homeCubeDropShadow {
  display: block;
  background-color: #344558;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 106.6vmin;
  max-width: 650.5px;
  height: 200vw;
  max-height: 1200px;
  transform: translateX(-50%) rotate(-45deg);
  transform-origin: center top;
  z-index: 19;
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
.infoCorner{
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 6.5vmin;
  height: 6.5vmin;
  max-width: 40px;
  max-height: 40px;
  background-color: #344558;
  box-shadow: -0.4vmin 0.4vmin #344558;
  z-index: 19;
}
.infoCornerBottomLeft {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 6.6vmin solid #F6D370;;
  border-right: 6.6vmin solid transparent;
  z-index: 20;
}
@media screen and (min-width: 613px) and (min-height: 613px) {
  .infoCornerBottomLeft {
      border-bottom: 40px solid #F6D370;;
      border-right: 40px solid transparent;
  }
  .infoCorner {
      box-shadow: -2px 2px #344558;
  }
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>
