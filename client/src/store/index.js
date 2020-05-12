import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'
import game from './modules/game'
import {link, setTimer} from '../lib/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoaded: false,
    showHelp: false,
    requestToLeave: false,
    firstButtonClicked: false,
  },
  mutations: {
    // Messages from server
    load(state, {userId, game = {}}) {
      state.game.players = {}
      if (game.players) {
        game.players.forEach((player) => {
          Vue.set(state.game.players, player.id, player)
        })
        state.game.player = state.game.players[userId]
      } else {
        state.game.player = {
          id: userId,
          name: null,
          teamId: null,
          isReady: false,
        }
      }

      state.game.teams = {}
      if (game.teams) {
        game.teams.forEach((team) => {
          Vue.set(state.game.teams, team.id, team)
        })
      }

      state.game.master = game.master || null
      state.game.entriesPerPlayer = game.entriesPerPlayer || 0
      state.game.container = game.container || null
      state.game.teamsConfirmed = game.isStarted || false
      state.game.selectedPlayer = null

      state.game.isStarted = game.isStarted || false
      state.game.isFinished = game.isFinished || false

      state.game.turnTime = game.turnTime || 0
      state.game.scorePerEntry = game.scorePerEntry || 1
      state.game.roundStarted = game.roundStarted || false
      state.game.roundFinished = game.roundFinished || false
      state.game.entriesRemaining = game.entriesRemaining || 0

      state.game.activeTeam = game.activeTeam || null
      state.game.activePlayer = game.activePlayer || null
      state.game.nextTeam = game.nextTeam || null
      state.game.nextPlayer = game.nextPlayer || null
      state.game.turnStarted = game.turnStarted || false
      state.game.timerStarted = game.turnStarted || false
      state.game.turnFinished = game.turnFinished || false
      state.game.activeEntry = game.activeEntry || null
      state.game.turnTimeLeft = game.turnTimeLeft || 0
      state.game.scoreThisTurn = game.scoreThisTurn || 0

      clearInterval(state.game.timer)

      if (state.game.timerStarted) {
        setTimer(state.game)
      }

      state.game.font = game.font || null
      state.game.entries = game.entries || []

      state.game.path = game.path || null
      state.game.isCreated = !!game.path

      if (window.location.href !== link(game.path)) {
        window.history.pushState(null, '', '/' + (game.path || ''))
      }

      state.requestToLeave = false
      state.isLoaded = true
    },
    requestToLeave(state) {
      state.requestToLeave = true
    },
    leaveGame() {
      window.location = '/'
    },
    redirectToGame(state, path) {
      window.location = '/' + path
    },

    // Only for local use
    stayInGame(state) {
      state.requestToLeave = false
    },
    toggleHelp(state) {
      state.showHelp = !state.showHelp
    },
    selectPlayer(state, id) {
      if (state.game.player.id === id) {
        state.requestToLeave = true
      }
    },
    buttonClicked(state) {
      if (!state.firstButtonClicked) {
        state.firstButtonClicked = true
      }
    },
  },
  modules: {
    socket,
    game,
  },
})
