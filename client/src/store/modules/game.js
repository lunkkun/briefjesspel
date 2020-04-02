import Vue from 'vue'
import msg from '../../lib/msg'
import randomFont from '../../lib/random-font'
import link from '../../lib/link'

export default {
  state: {
    // game initialization
    isCreated: false,
    path: null,

    // settings for game
    players: {},
    teams: {},
    master: null,
    entriesPerPlayer: 0,

    // state of game
    isStarted: false,
    isFinished: false,

    // settings for round
    turnTime: 0, // in seconds
    scorePerEntry: 1,

    // state of round
    roundStarted: false,
    roundFinished: false,

    // state of turn
    activeTeam: null,
    activePlayer: null,
    nextTeam: null,
    nextPlayer: null,
    turnStarted: false,
    turnFinished: false,
    activeEntry: null, // only for active player
    turnTimeLeft: 0, // in seconds
    scoreThisTurn: 0,

    // public settings for player
    player: {
      id: null,
      name: null,
      teamId: null,
      isReady: false,
    },

    // private settings for player
    font: null,
    entries: [],
  },
  getters: {
    isMaster: (state) => {
      return state.master === state.player.id
    },
    master: (state) => {
      return state.players[state.master]
    },
    shareableLink: (state) => {
      return state.path ? link(state.path) : null
    },
    playerNameSet: (state) => {
      return !!state.player.name
    },
    entriesPerPlayerSet: (state) => {
      return !!state.entriesPerPlayer
    },
    enoughEntries: (state) => {
      return state.entries.length >= state.entriesPerPlayer
    },
    turnTimeSet: (state) => {
      return !!state.turnTime
    },
    team: (state) => {
      return state.teams[state.player.teamId]
    },
    players: (state) => {
      return Object.values(state.players).filter(player => player.name)
    },
    allPlayersReady: (state) => {
      return Object.values(state.players).every(player => player.isReady)
    },
    allPlayersAssigned: (state) => {
      return Object.values(state.players).every(player => player.teamId)
    },
    canStart: (state, getters) => {
      return getters.allPlayersReady && getters.allPlayersAssigned
    },
    myTurn: (state) => {
      return state.activePlayer === state.player.id
    },
  },
  mutations: {
    // Messages from server
    addPlayer(state, player) {
      Vue.set(state.players, player.id, player)
    },
    setPlayerName(state, {id, name}) {
      const player = state.players[id]
      if (player) {
        player.name = name
      }
    },
    removePlayer(state, id) {
      Vue.delete(this.players, id)
    },
    updateMaster(state, master) {
      state.master = master
    },
    setEntriesPerPlayer(state, entriesPerPlayer) {
      state.entriesPerPlayer = entriesPerPlayer
    },
    setPlayerReady(state, id) {
      const player = state.players[id]
      if (player) {
        player.isReady = true
      }
    },
    addTeam(state, team) {
      Vue.set(state.teams, team.id, team)
    },
    addPlayerToTeam(state, {id, teamId}) {
      const player = state.players[id]
      if (player) {
        player.teamId = teamId
      }
    },
    removeTeam(state, id) {
      Vue.delete(state.teams, id)
      Object.values(state.players).forEach((player) => {
        if (player.teamId === id) {
          player.teamId = null
        }
      })
    },
    setTurnTime(state, turnTime) {
      state.turnTime = turnTime
    },
    startGame(state) {
      state.isStarted = true
    },
    startRound(state, {activeTeam, activePlayer, nextTeam, nextPlayer}) {
      state.activeTeam = activeTeam
      state.activePlayer = activePlayer
      state.nextTeam = nextTeam
      state.nextPlayer = nextPlayer

      state.turnTimeLeft = state.turnTime
      state.roundStarted = true
    },
    startTurn(state) {
      state.turnStarted = true
    },
    nextEntry(state, entry) {
      state.activeEntry = entry
    },
    updateTeamScore(state, {id, score, scoreThisRound, scoreThisTurn}) {
      state.scoreThisTurn = scoreThisTurn

      const team = state.teams[id]
      if (team) {
        team.score = score
        team.scoreThisRound = scoreThisRound
      }
    },
    finishTurn(state) {
      state.turnFinished = true
    },
    nextTurn(state, {activeTeam, activePlayer, nextTeam, nextPlayer}) {
      state.activeTeam = activeTeam
      state.activePlayer = activePlayer
      state.nextTeam = nextTeam
      state.nextPlayer = nextPlayer

      state.turnStarted = false
      state.turnFinished = false
      state.turnTimeLeft = state.turnTime
      state.scoreThisTurn = 0
    },
    finishRound(state) {
      state.roundFinished = true
    },
    nextRound(state) {
      state.roundStarted = false
      state.roundFinished = false

      Object.values(state.teams).forEach((team) => {
        team.scoreThisRound = 0
      })
    },
    finishGame(state) {
      state.isFinished = true
    },

    // Only for local use
    setName(state, name) {
      state.player.name = name
    },
    setFont(state, font) {
      state.font = font
    },
    addEntry(state, entry) {
      state.entries.push(entry)
    },
  },
  actions: {
    async newGame({dispatch}) {
      dispatch(msg('newGame'))
    },
    async setPlayerName({commit, dispatch}, name) {
      if (name) {
        await dispatch(msg('setPlayerName', name))
        commit('setName', name)
        dispatch('setFont', randomFont()) // TODO: add option for user?
      }
    },
    async removePlayer({commit, dispatch}, id) {
      await dispatch(msg('removePlayer', id))
      commit('removePlayer', id)
    },
    async leaveGame({dispatch}) {
      dispatch(msg('leaveGame'))
    },
    async stayInCurrentGame({dispatch, commit}) {
      await dispatch(msg('stayInCurrentGame'))
      commit('stayInCurrentGame')
    },
    async setFont({commit, dispatch}, font) {
      if (font) {
        await dispatch(msg('setFont', font))
        commit('setFont', font)
      }
    },
    async setEntriesPerPlayer({commit, dispatch}, entriesPerPlayer) {
      if (entriesPerPlayer) {
        await dispatch(msg('setEntriesPerPlayer', entriesPerPlayer))
        commit('setEntriesPerPlayer', entriesPerPlayer)
      }
    },
    async addEntry({commit, dispatch}, entry) {
      if (entry) {
        await dispatch(msg('addEntry', entry))
        commit('addEntry', entry)
      }
    },
    async addTeam({dispatch}, name) {
      if (name) {
        dispatch(msg('addTeam', name))
      }
    },
    async addPlayerToTeam({commit, dispatch}, {id, teamId}) {
      if (id && teamId) {
        await dispatch(msg('addPlayerToTeam', {id, teamId}))
        commit('addPlayerToTeam', {id, teamId})
      }
    },
    async removeTeam({commit, dispatch}, id) {
      await dispatch(msg('removeTeam', id))
      commit('removeTeam', id)
    },
    async setTurnTime({commit, dispatch}, turnTime) {
      if (turnTime) {
        await dispatch(msg('setTurnTime', turnTime))
        commit('setTurnTime', turnTime)
      }
    },
    async startGame({dispatch}) {
      dispatch(msg('startGame'))
    },
    async startRound({dispatch}) {
      dispatch(msg('startRound'))
    },
    async startTurn({dispatch}) {
      dispatch(msg('startTurn'))
    },
    async nextEntry({dispatch}) {
      dispatch(msg('nextEntry'))
    },
    async nextTurn({dispatch}) {
      dispatch(msg('nextTurn'))
    },
    async nextRound({dispatch}) {
      dispatch(msg('nextRound'))
    },
    async finishGame({dispatch}) {
      dispatch(msg('finishGame'))
    },
    async newGameFromCurrent({dispatch}) {
      dispatch(msg('newGameFromCurrent'))
    },
  },
}
