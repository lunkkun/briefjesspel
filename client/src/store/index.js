import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'
import game from './modules/game'

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

        state.game.activePlayer = game.activePlayer
        state.game.teamIsActive = game.teamIsActive
        state.game.playerIsActive = game.playerIsActive
        state.game.turnStarted = game.turnStarted
        state.game.turnTimeLeft = game.turnTimeLeft

        const player = game.players.find(player => player.id === userId)
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
