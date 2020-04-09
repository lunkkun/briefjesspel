<template>
  <div id="app">
    <LeaveButton v-if="gameCreated"></LeaveButton>
    <HelpButton></HelpButton>

    <RequestToLeave v-if="requestToLeave"></RequestToLeave>
    <Help v-else-if="showHelp"></Help>

    <div v-else-if="isLoaded">
      <Game v-if="gameStarted"></Game>
      <Setup v-else-if="gameCreated"></Setup>
      <Home v-else></Home>
    </div>

    <HomeCube v-else>
      <FontAwesomeIcon icon="spinner" class="fa-3x fa-spin spinner" color="#344558"></FontAwesomeIcon>
    </HomeCube>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import HelpButton from './components/HelpButton'
import HomeCube from './components/HomeCube'
import LeaveButton from './components/LeaveButton'
import Game from './pages/Game'
import Help from './pages/Help'
import Home from './pages/Home'
import RequestToLeave from './pages/RequestToLeave'
import Setup from './pages/Setup'

export default {
  name: 'App',
  components: {
    HelpButton,
    HomeCube,
    LeaveButton,
    Game,
    Help,
    Home,
    RequestToLeave,
    Setup,
  },
  computed: mapState({
    isLoaded: state => state.isLoaded,
    showHelp: state => state.showHelp,
    requestToLeave: state => state.requestToLeave,
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
  overflow: hidden;
}
.transparentButton {
  display: block;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
}
.centerBlock {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
.spinner {
  display: block;
  position: absolute;
  top: 43%;
  left: 43%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.generalFont{
  font-family: Capone Light, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #344558;
  caret-color: #344558;
}
.tinyFont {
  font-size: 4vmin;
  font-weight: lighter;
}
.smallFont {
  font-size: 6vmin;
  font-weight: lighter;
}
.mediumFont {
  font-size: 7.5vmin;
  font-weight: normal;
}
.bigFont {
  font-size: 12vmin;
  font-weight: bold;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.4vmin 0.4vmin 0.2vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
@media screen and (min-width: 613px) and (min-height: 613px){
  .tinyFont {
    font-size: 24px;
    font-weight: lighter;
  }
  .smallFont {
    font-size: 30px;
    font-weight: normal;
  }
  .mediumFont {
    font-size: 45px;
    font-weight: normal;
  }
  .bigFont {
    font-size: 74px;
    text-shadow: 4px 4px 2px #FFF2;
  }
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input::selection,
textarea::selection {
  background-color: transparent;
}
</style>
