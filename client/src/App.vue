<template>
  <div id="app" v-cloak>
    <LeaveButton v-if="gameCreated && !activeTurn"></LeaveButton>
    <HelpButton v-if="!activeTurn"></HelpButton>

    <PlayerList v-if="gameCreated && !gameStarted"></PlayerList>
    <PlayerListRight v-if="gameCreated && !gameStarted"></PlayerListRight>
    <PlayerListTop v-if="gameCreated && !gameStarted"></PlayerListTop>
    <PlayerListBottom v-if="gameCreated && !gameStarted"></PlayerListBottom>
    
    <transition name="homeCube">
      <HomeCube v-if="showHomeCube">
        <Help v-if="showHelp"></Help>

        <div v-else-if="isLoaded">
          <RequestToLeave v-if="requestToLeave"></RequestToLeave>
          <Home v-else-if="!gameCreated"></Home>
          <Setup v-else-if="!gameStarted"></Setup>
          <Game v-else></Game>
        </div>

        <div v-else>
          <FontAwesomeIcon icon="spinner" class="fa-3x fa-spin spinner" color="#344558"></FontAwesomeIcon>
        </div>
      </HomeCube>

      <ActiveTurn v-else></ActiveTurn>
    </transition>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import HelpButton from './components/HelpButton'
import HomeCube from './components/HomeCube'
import LeaveButton from './components/LeaveButton'
import PlayerList from './components/PlayerList'
import PlayerListRight from './components/PlayerListRight'
import PlayerListTop from './components/PlayerListTop'
import PlayerListBottom from './components/PlayerListBottom'
import Game from './pages/Game'
import Help from './pages/Help'
import Home from './pages/Home'
import RequestToLeave from './pages/RequestToLeave'
import Setup from './pages/Setup'
import ActiveTurn from './pages/game/ActiveTurn'

export default {
  name: 'App',
  components: {
    ActiveTurn,
    HelpButton,
    HomeCube,
    LeaveButton,
    PlayerList,
    PlayerListRight,
    PlayerListTop,
    PlayerListBottom,
    Game,
    Help,
    Home,
    RequestToLeave,
    Setup,
  },
  computed: {
    activeTurn() {
      return this.myTurn && this.turnStarted && !this.turnFinished && !this.roundFinished && !this.gameFinished
    },
    showHomeCube() {
      return !this.activeTurn
    },
    ...mapState({
      isLoaded: state => state.isLoaded,
      showHelp: state => state.showHelp,
      requestToLeave: state => state.requestToLeave,
      gameCreated: state => state.game.isCreated,
      gameStarted: state => state.game.isStarted,
      gameFinished: state => state.game.isFinished,
      roundFinished: state => state.game.roundFinished,
      turnStarted: state => state.game.turnStarted,
      turnFinished: state => state.game.turnFinished,
    }),
    ...mapGetters([
      'myTurn',
    ]),
  },
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
.centerFontH {
  text-align: center;
}
.microFont {
  font-size: 2.75vmin;
  font-weight: lighter;
}
.tinyFont {
  font-size: 3.75vmin;
  font-weight: lighter;
}
.smallFont {
  font-size: 4.9vmin;
  font-weight: lighter;
}
.mediumFont {
  font-size: 7.3vmin;
  font-weight: normal;
}
.bigFont {
  font-size: 9.8vmin;
  font-weight: bold;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.3vmin 0.3vmin 0.15vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
.biggerFont {
  font-size: 12vmin;
  font-weight: bold;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.4vmin 0.4vmin 0.2vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
@media screen and (min-width: 613px) and (min-height: 613px) {

  .microFont {
    font-size: 17px;
  }
  .tinyFont {
    font-size: 23px;
  }
  .smallFont {
    font-size: 30px;
    font-weight: normal;
  }
  .mediumFont {
    font-size: 45px;
  }
  .bigFont {
    font-size: 60px;
    text-shadow: 3px 3px 1.5px #FFF2;
  }
  .biggerFont {
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

input[type=number]::selection {
  background-color: transparent;
}
</style>
