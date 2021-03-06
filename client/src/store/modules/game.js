import Vue from 'vue'
import {addShortNames, msg, link, randomContainer, randomFont, rankTeams, setTimer} from '../../lib/helpers'

const minTeams = 1 // process.env.NODE_ENV === 'production' ? 2 : 1
const minPlayersPerTeam = process.env.NODE_ENV === 'production' ? 2 : 1

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
    container: null,
    teamsConfirmed: false,

    // state of game
    isStarted: false,
    isFinished: false,
    selectedPlayer: null,

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
    entriesConfirmed: 0,
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
    entryEditing: (state) => {
      return state.entries[state.entriesConfirmed] || ''
    },
    enoughEntries: (state) => {
      return state.entriesConfirmed >= state.entriesPerPlayer
    },
    turnTimeSet: (state) => {
      return !!state.turnTime
    },
    team: (state) => {
      return state.teams[state.player.teamId]
    },
    playersWithNames: (state) => {
      return Object.values(state.players).filter(player => player.name)
    },
    playersSorted: (state, getters) => {
      let nextIndex = getters.playersWithNames.reduce((max, player) => {
        return player.hasOwnProperty('index') ? Math.max(max, player.index) : max
      }, -1) + 1

      getters.playersWithNames.forEach(player => {
        if (!player.hasOwnProperty('index')) {
          Vue.set(player, 'index', nextIndex++)
        }
      })

      return getters.playersWithNames.sort((a, b) => a.index - b.index)
    },
    shortNames: (state, getters) => {
      // Key by id for use in PlayerCubes
      return Object.fromEntries(addShortNames(getters.playersWithNames).map(player => [player.id, player]))
    },
    playersForTeam: (state, getters) => (teamId) => {
      return getters.playersSorted.filter(player => player.teamId === teamId)
    },
    playersNotInTeam: (state, getters) => {
      return getters.playersSorted.filter(player => player.teamId === null)
    },
    allPlayersReady: (state, getters) => {
      return getters.playersWithNames.every(player => player.isReady)
    },
    enoughTeams: (state) => {
      return Object.keys(state.teams).length >= minTeams
    },
    allPlayersAssigned: (state, getters) => {
      return getters.playersWithNames.every(player => player.teamId)
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
    turnActive: (state) => {
      return state.turnStarted && !state.turnFinished && !state.roundFinished && !state.finished
    },
    myTurnActive: (state, getters) => {
      return getters.myTurn && getters.turnActive
    },
    imNext: (state) => {
      return state.nextPlayer === state.player.id
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
    selectedPlayerName: (state) => {
      return state.selectedPlayer && state.players.hasOwnProperty(state.selectedPlayer) ?
        state.players[state.selectedPlayer].name : null
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
      if (state.selectedPlayer === id) {
        state.selectedPlayer = null
      }
      if (state.players.hasOwnProperty(id)) {
        Vue.delete(state.players, id)
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
    startRound(state, {activeTeam, activePlayer, nextTeam, nextPlayer, entriesRemaining, turnTimeLeft}) {
      // for redundancy
      state.isStarted = true
      state.scoreThisTurn = 0
      clearInterval(state.timer)

      Object.values(state.teams).forEach((team) => {
        team.scoreThisRound = 0
      })

      state.activeTeam = activeTeam
      state.activePlayer = activePlayer
      state.nextTeam = nextTeam
      state.nextPlayer = nextPlayer
      state.entriesRemaining = entriesRemaining
      state.turnTimeLeft = turnTimeLeft

      state.timerStarted = false
      state.roundStarted = true
    },
    initializeTurn(state) {
      state.turnStarted = true
    },
    startTurn(state) {
      // for redundancy
      state.turnStarted = true
      state.scoreThisTurn = 0

      clearInterval(state.timer)
      setTimer(state)

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
      clearInterval(state.timer)

      state.turnFinished = true
    },
    nextTurn(state, {activeTeam, activePlayer, nextTeam, nextPlayer, entriesRemaining}) {
      state.activeTeam = activeTeam
      state.activePlayer = activePlayer
      state.nextTeam = nextTeam
      state.nextPlayer = nextPlayer
      state.entriesRemaining = entriesRemaining

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
      // for redundancy
      state.activeEntry = null

      state.roundStarted = false
      state.roundFinished = false

      state.turnStarted = false
      state.timerStarted = false
      state.turnFinished = false
      state.scoreThisTurn = 0

      state.previousTurnTime = state.turnTime
      state.turnTime = 0 // triggers setup

      Object.values(state.teams).forEach((team) => {
        team.scoreThisRound = 0
      })
    },
    finishGame(state, teams) {
      state.isFinished = true

      teams.forEach(team => {
        if (state.teams.hasOwnProperty(team.id)) {
          state.teams[team.id].score = team.score
        }
      })
    },

    // Only for local use
    setName(state, name) {
      state.player.name = name
    },
    setFont(state, font) {
      state.font = font
    },
    addEntry(state, {index, entry}) {
      Vue.set(state.entries, index, entry)
      state.entriesConfirmed++
    },
    previousEntry(state) {
      state.entriesConfirmed--
    },
    selectPlayer(state, id) {
      if (state.player.id !== id) {
        state.selectedPlayer = id
      }
    },
    deselectPlayer(state) {
      state.selectedPlayer = null
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
      }
    },
  },
  actions: {
    async newGame({dispatch}) {
      await dispatch(msg('newGame'))
    },
    async setPlayerName({state, commit, dispatch}, name) {
      await dispatch(msg('setPlayerName', name))
      commit('setName', name)

      await dispatch('setFont', randomFont()) // TODO: editable for user?
    },
    async removePlayer({commit, dispatch}, id) {
      await dispatch(msg('removePlayer', id))
      commit('removePlayer', id)
    },
    async removeSelectedPlayer({state, commit, dispatch}) {
      if (state.selectedPlayer) {
        await dispatch('removePlayer', state.selectedPlayer)
      }
    },
    async leaveGame({dispatch}) {
      await dispatch(msg('leaveGame'))
    },
    async stayInGame({dispatch, commit}) {
      await dispatch(msg('stayInGame'))
      commit('stayInGame')
    },
    async setFont({commit, dispatch}, font) {
      await dispatch(msg('setFont', font))
      commit('setFont', font)
    },
    async setEntriesPerPlayer({commit, dispatch}, entriesPerPlayer) {
      await dispatch(msg('setEntriesPerPlayer', entriesPerPlayer))
      commit('setEntriesPerPlayer', entriesPerPlayer)

      await dispatch('setContainer', randomContainer()) // TODO: editable for game master?
    },
    async setContainer({commit, dispatch}, container) {
      await dispatch(msg('setContainer', container))
      commit('setContainer', container)
    },
    async addEntry({state, commit, dispatch}, entry) {
      const index = state.entriesConfirmed
      await dispatch(msg('addEntry', {index, entry}))
      commit('addEntry', {index, entry})
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
