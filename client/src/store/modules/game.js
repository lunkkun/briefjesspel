import Vue from 'vue'
import {msg, link, randomContainer, randomFont, rankTeams, getShortNames} from '../../lib/helpers'

const minTeams = 1 // process.env.NODE_ENV === 'production' ? 2 : 1
const minPlayersPerTeam = process.env.NODE_ENV === 'production' ? 2 : 1

export default {
  state: {
    // game initialization
    isCreated: false,
    path: null,

    // settings for game
    players: {},
    playersWithNames: [], // separate array with players in the order in which they entered their names
    teams: {},
    master: null,
    entriesPerPlayer: 0,
    container: null,
    teamsConfirmed: false,

    // state of game
    isStarted: false,
    isFinished: false,

    // settings for round
    turnTime: 0, // in seconds
    previousTurnTime: 0,
    scorePerEntry: 1,

    // state of round
    roundStarted: false,
    roundFinished: false,
    entriesRemaining: 0,

    // state of turn
    activeTeam: null,
    activePlayer: null,
    nextTeam: null,
    nextPlayer: null,
    turnStarted: false,
    timerStarted: false,
    turnFinished: false,
    activeEntry: null, // only for active player
    turnTimeLeft: 0, // in seconds
    timer: null,
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
    shortNames: (state) => {
      // Key by id for use in PlayerCubes
      return Object.fromEntries(getShortNames(state.playersWithNames).map(player => [player.id, player]))
    },
    playersForTeam: (state) => (teamId) => {
      return state.playersWithNames.filter(player => player.teamId === teamId)
    },
    playersNotInTeam: (state) => {
      return state.playersWithNames.filter(player => player.teamId === null)
    },
    allPlayersReady: (state) => {
      return state.playersWithNames.every(player => player.isReady)
    },
    enoughTeams: (state) => {
      return Object.keys(state.teams).length >= minTeams
    },
    allPlayersAssigned: (state) => {
      return state.playersWithNames.every(player => player.teamId)
    },
    allTeamsHaveEnoughPlayers: (state, getters) => {
      return Object.values(state.teams).every(team => getters.playersForTeam(team.id).length >= minPlayersPerTeam)
    },
    teamsComplete: (state, getters) => {
      return getters.enoughTeams && getters.allPlayersAssigned && getters.allTeamsHaveEnoughPlayers
    },
    canStart: (state, getters) => {
      return getters.allPlayersReady && getters.teamsComplete
    },
    myTurn: (state) => {
      return state.activePlayer === state.player.id
    },
    activePlayerName: (state) => {
      const player = state.players[state.activePlayer]
      return player ? player.name : null
    },
    nextPlayerName: (state) => {
      const player = state.players[state.nextPlayer]
      return player ? player.name : null
    },
    activeTeamName: (state) => {
      const team = state.teams[state.activeTeam]
      return team ? team.name : null
    },
    nextTeamName: (state) => {
      const team = state.teams[state.nextTeam]
      return team ? team.name : null
    },
    rankings: (state) => {
      return Object.values(state.teams).sort(rankTeams)
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
        if (!player.name) {
          state.playersWithNames.push(player)
        }
        player.name = name
      }
    },
    removePlayer(state, id) {
      if (state.players.hasOwnProperty(id)) {
        Vue.delete(this.players, id)
      }
    },
    updateNextPlayer(state, {nextTeam, nextPlayer}) {
      state.nextTeam = nextTeam
      state.nextPlayer = nextPlayer
    },
    updateMaster(state, master) {
      state.master = master
    },
    setEntriesPerPlayer(state, entriesPerPlayer) {
      state.entriesPerPlayer = entriesPerPlayer
    },
    setContainer(state, container) {
      state.container = container
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
    removePlayerFromTeam(state, {id, teamId}) {
      const player = state.players[id]
      if (player && player.teamId === teamId) {
        player.teamId = null
      }
    },
    removeTeam(state, id) {
      if (state.teams.hasOwnProperty(id)) {
        Vue.delete(state.teams, id)
        Object.values(state.players).forEach((player) => {
          if (player.teamId === id) {
            player.teamId = null
          }
        })
      }
    },
    confirmTeams(state) {
      state.teamsConfirmed = true
    },
    unconfirmTeams(state) {
      state.teamsConfirmed = false
    },
    setTurnTime(state, turnTime) {
      state.turnTime = turnTime
    },
    unsetTurnTime(state) {
      state.turnTime = 0
    },
    startGame(state) {
      state.isStarted = true
    },
    startRound(state, {activeTeam, activePlayer, nextTeam, nextPlayer, entriesRemaining}) {
      state.activeTeam = activeTeam
      state.activePlayer = activePlayer
      state.nextTeam = nextTeam
      state.nextPlayer = nextPlayer
      state.entriesRemaining = entriesRemaining

      state.turnTimeLeft = state.turnTime
      state.roundStarted = true
    },
    initializeTurn(state) {
      state.turnStarted = true
    },
    startTurn(state) {
      state.timer = setInterval(() => {
        state.turnTimeLeft--

        if (state.turnTimeLeft <= 0) {
          clearInterval(state.timer)
        }
      }, 1000)
      state.timerStarted = true
    },
    nextEntry(state, {text, font, remaining}) {
      state.activeEntry = {text, font}
      state.entriesRemaining = remaining
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
      state.timerStarted = false
      state.turnFinished = false
      state.activeEntry = null
      state.turnTimeLeft = state.turnTime
      state.scoreThisTurn = 0
    },
    finishRound(state) {
      clearInterval(state.timer)
      state.activeEntry = null
      state.roundFinished = true
    },
    nextRound(state) {
      state.roundStarted = false
      state.roundFinished = false

      state.turnStarted = false
      state.timerStarted = false
      state.scoreThisTurn = 0

      state.previousTurnTime = state.turnTime
      state.turnTime = 0 // triggers setup

      Object.values(state.teams).forEach((team) => {
        team.scoreThisRound = 0
      })
    },
    finishGame(state) {
      state.isFinished = true
    },

    // Only for local use
    setFont(state, font) {
      state.font = font
    },
    addEntry(state, entry) {
      state.entries.push(entry)
    },

    // For testing
    generatePlayer(state) {
      const names = ['Liam','Sem','Lucas','Noah','Milan','Daan','Levi','Finn','Jesse','Max','Thomas','Bram',
        'Thijs','Sam','Tim','Lars','Ruben','Julian','Adam','Eva','Mark','Anna','Jonas']

      let name, i = 0
      do {
        name = names[i++]
      } while (state.players.hasOwnProperty(name) && i < names.length)

      if (!state.players.hasOwnProperty(name)) {
        const player = {id: name, name, teamId: null, isReady: true}
        Vue.set(state.players, player.id, player)
        state.playersWithNames.push(player)
      }
    },
  },
  actions: {
    async newGame({dispatch}) {
      await dispatch(msg('newGame'))
    },
    async setPlayerName({state, commit, dispatch}, name) {
      await dispatch(msg('setPlayerName', name))
      commit('setPlayerName', {id: state.player.id, name})

      await dispatch('setFont', randomFont()) // TODO: add option for user?
    },
    async removePlayer({commit, dispatch}, id) {
      await dispatch(msg('removePlayer', id))
      commit('removePlayer', id)
    },
    async leaveGame({dispatch}) {
      await dispatch(msg('leaveGame'))
    },
    async stayInGame({commit}) {
      commit('stayInGame')
    },
    async stayInCurrentGame({dispatch, commit}) {
      await dispatch(msg('stayInCurrentGame'))
      commit('stayInCurrentGame')
    },
    async setFont({commit, dispatch}, font) {
      await dispatch(msg('setFont', font))
      commit('setFont', font)
    },
    async setEntriesPerPlayer({commit, dispatch}, entriesPerPlayer) {
      await dispatch(msg('setEntriesPerPlayer', entriesPerPlayer))
      commit('setEntriesPerPlayer', entriesPerPlayer)

      await dispatch('setContainer', randomContainer()) // TODO: add option for game master?
    },
    async setContainer({commit, dispatch}, container) {
      await dispatch(msg('setContainer', container))
      commit('setContainer', container)
    },
    async addEntry({commit, dispatch}, entry) {
      await dispatch(msg('addEntry', entry))
      commit('addEntry', entry)
    },
    async addTeam({dispatch}, name) {
      await dispatch(msg('addTeam', name))
    },
    async addPlayerToTeam({commit, dispatch}, {id, teamId}) {
      await dispatch(msg('addPlayerToTeam', {id, teamId}))
      commit('addPlayerToTeam', {id, teamId})
    },
    async removePlayerFromTeam({commit, dispatch}, {id, teamId}) {
      await dispatch(msg('removePlayerFromTeam', {id, teamId}))
      commit('removePlayerFromTeam', {id, teamId})
    },
    async removeTeam({commit, dispatch}, id) {
      await dispatch(msg('removeTeam', id))
      commit('removeTeam', id)
    },
    async setTurnTime({commit, dispatch}, turnTime) {
      await dispatch(msg('setTurnTime', turnTime))
      commit('setTurnTime', turnTime)
    },
    async startGame({dispatch}) {
      await dispatch(msg('startGame'))
    },
    async startRound({dispatch}) {
      await dispatch(msg('startRound'))
    },
    async startTurn({commit}) {
      commit('initializeTurn')
    },
    async startTimer({dispatch}) {
      await dispatch(msg('startTurn'))
    },
    async nextEntry({dispatch}) {
      await dispatch(msg('nextEntry'))
    },
    async nextTurn({dispatch}) {
      await dispatch(msg('nextTurn'))
    },
    async nextRound({dispatch}) {
      await dispatch(msg('nextRound'))
    },
    async finishGame({dispatch}) {
      await dispatch(msg('finishGame'))
    },
    async newGameFromCurrent({dispatch}) {
      await dispatch(msg('newGameFromCurrent'))
    },
  },
}
