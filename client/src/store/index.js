import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'
import game from './modules/game'
import link from '../lib/link'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoaded: false,
    showHelp: false,
  },
  mutations: {
    load(state, {userId, game}) {
      if (game) {
        state.game.path = game.path
        if (window.location.href !== link(game.path)) {
          window.history.pushState(null, '', '/' + game.path)
        }

        state.game.players = game.players
        state.game.teams = game.teams
        state.game.master = game.master
        state.game.entriesPerPlayer = game.entriesPerPlayer
        state.game.turnOrder = game.turnOrder

        state.game.isStarted = game.isStarted
        state.game.isFinished = game.isFinished

        state.game.turnTime = game.turnTime
        state.game.scorePerEntry = game.scorePerEntry
        state.game.roundStarted = game.roundStarted
        state.game.roundFinished = game.roundFinished

        state.game.activeTeam = game.activeTeam
        state.game.activePlayer = game.activePlayer
        state.game.nextTeam = game.nextTeam
        state.game.nextPlayer = game.nextPlayer
        state.game.turnStarted = game.turnStarted
        state.game.turnFinished = game.turnFinished
        state.game.activeEntry = game.activeEntry
        state.game.turnTimeLeft = game.turnTimeLeft

        const player = state.players.find(player => player.id === userId)
        if (player) {
          state.game.player = player
        }

        state.game.font = game.font
        state.game.entries = game.entries

        state.game.isCreated = true
      } else {
        state.game.player.id = userId
      }

      state.isLoaded = true
    },
  },
  modules: {
    socket,
    game,
  },
})
