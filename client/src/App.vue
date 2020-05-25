<template>
  <div id="app" v-cloak>
    <FlashScored></FlashScored>
    <GeneratePlayerButton v-if="isDev && gameCreated && !gameStarted"></GeneratePlayerButton>
    <LeaveButton v-if="gameCreated && !myTurnActive"></LeaveButton>
    <HelpButton v-if="!myTurnActive"></HelpButton>

    <PlayerList v-if="gameCreated"></PlayerList>

    <transition name="homeCube">
      <HomeCube v-if="showHomeCube">
        <Help v-if="showHelp"></Help>

        <div v-else-if="isLoaded">
          <RequestToLeave v-if="requestToLeave"></RequestToLeave>
          <RemovePlayer v-else-if="selectedPlayer"></RemovePlayer>
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
import GeneratePlayerButton from './components/GeneratePlayerButton'
import HelpButton from './components/HelpButton'
import HomeCube from './components/HomeCube'
import LeaveButton from './components/LeaveButton'
import PlayerList from './components/PlayerList'
import Game from './pages/Game'
import Help from './pages/Help'
import Home from './pages/Home'
import RequestToLeave from './pages/RequestToLeave'
import Setup from './pages/Setup'
import ActiveTurn from './pages/game/ActiveTurn'
import RemovePlayer from './pages/RemovePlayer'
import FlashScored from './components/FlashScored'

export default {
  name: 'App',
  components: {
    FlashScored,
    RemovePlayer,
    ActiveTurn,
    GeneratePlayerButton,
    HelpButton,
    HomeCube,
    LeaveButton,
    PlayerList,
    Game,
    Help,
    Home,
    RequestToLeave,
    Setup,
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === 'development'
    },
    showHomeCube() {
      return !this.myTurnActive || this.requestToLeave
    },
    ...mapState({
      isLoaded: state => state.isLoaded,
      showHelp: state => state.showHelp,
      requestToLeave: state => state.requestToLeave,
      selectedPlayer: state => state.game.selectedPlayer,
      gameCreated: state => state.game.isCreated,
      gameStarted: state => state.game.isStarted,
    }),
    ...mapGetters([
      'myTurnActive',
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
  height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  background-color: #688980;
  overflow: hidden;
}
.spinner {
  display: block;
  position: absolute;
  top: 43%;
  left: 43%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.transparentButton {
  display: inline-block;
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
.noSelect {
  user-select: none;
}

.headerFont {
  font-family: Ironick, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: scaleY(1.2);
  text-transform: uppercase;
  color: #344558;
  caret-color: #344558;
}
.subheaderFont {
  font-family: Josefin Slab, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #344558;
  caret-color: #344558;
}
.textFont {
  font-family: Josefin Sans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #344558;
  caret-color: #344558;
}
.centerFontH {
  text-align: center;
}
.microFont {
  font-size: 3vmin;
  font-weight: normal;
}
.tinyFont {
  font-size: 3.4vmin;
  font-weight: normal;
}
.smallerFont {
  font-size: 4.2vmin;
  font-weight: normal;
}
.smallFont {
  font-size: 4.9vmin;
  font-weight: normal;
}
.smediumFont {
  font-size: 6.6vmin;
  font-weight: normal;
}
.mediumFont {
  font-size: 7.3vmin;
  font-weight: normal;
}
.largeFont {
  font-size: 8.5vmin;
  font-weight: normal;
}
.bigFont {
  font-size: 9.8vmin;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.3vmin 0.3vmin 0.15vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
.biggerFont {
  font-size: 12vmin;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.4vmin 0.4vmin 0.2vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
.hugeFont {
  font-size: 13vmin;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.4vmin 0.4vmin 0.2vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}
@media screen and (min-width: 613px) and (min-height: 613px) {

  .microFont {
    font-size: 18.5px;
  }
  .tinyFont {
    font-size: 21px;
  }
  .smallerFont {
    font-size: 26px;
  }
  .smallFont {
    font-size: 30px;
  }
  .smediumFont {
    font-size: 41px;
  }
  .mediumFont {
    font-size: 45px;
  }
  .largeFont {
    font-size: 52px;
  }
  .bigFont {
    font-size: 60px;
    text-shadow: 3px 3px 1.5px #FFF2;
  }
  .biggerFont {
    font-size: 74px;
    text-shadow: 4px 4px 2px #FFF2;
  }
  .hugeFont {
    font-size: 80px;
    text-shadow: 5px 5px 2px #FFF2;
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
