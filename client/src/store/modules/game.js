import msg from '../../lib/msg'
import randomFont from '../../lib/random-font'
import link from '../../lib/link'

export default {
  state: {
    // game initialization
    isLoaded: false, // whether we've received the first response from the server
    isCreated: false, // whether there's actually a game on the server
    path: null,

    // settings for game
    players: [],
    teams: [],
    master: null,
    entriesPerPlayer: 0,
    turnOrder: [],

    // state of game
    isStarted: false,
    isFinished: false,

    // settings for round
    turnTime: 0, // in seconds
    scorePerEntry: 1, // for now hardcoded

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
      return state.players.find(user => user.id === state.master)
    },
    shareableLink: (state) => {
      return state.path ? link(state.path) : null
    },
    team: (state) => {
      return state.player.teamId ? state.teams.find(team => team.id === state.player.teamId) : null
    },
    visiblePlayers: (state) => {
      return state.players.filter(player => player.name)
    },
    canStart: (state) => {
      return state.players.every(player => player.isReady && player.teamId)
    },
    myTurn: (state) => {
      return state.activePlayer === state.player.id
    },
  },
  mutations: {
    // Messages from server
    setPath(state, path) {
      state.path = path
      window.history.pushState(null, '', '/' + path)
    },
    addPlayer(state, player) {
      state.players.push(player)
    },
    setPlayerName(state, {id, name}) {
      const player = state.players.find(p => p.id === id)
      if (player) {
        player.name = name
      }
    },
    removePlayer(state, id) {
      const index = state.players.findIndex(p => p.id === id)
      if (index > -1) {
        this.players.splice(index, 1)
      }
      if (id === state.player.id) {
        // TODO
        state.isCreated = false
      }
    },
    setEntriesPerPlayer(state, entriesPerPlayer) {
      state.entriesPerPlayer = entriesPerPlayer
    },
    setPlayerReady(state, id) {
      const player = state.players.find(p => p.id === id)
      if (player) {
        player.isReady = true
      }
    },
    addTeam(state, team) {
      state.teams.push(team)
    },
    addPlayerToTeam(state, {id, teamId}) {
      const player = state.players.find(p => p.id === id)
      if (player) {
        player.teamId = teamId
      }
    },
    removeTeam(state, teamId) {
      const index = state.teams.findIndex(t => t.id === teamId)
      if (index > -1) {
        this.teams.splice(index, 1)
        for (const player in state.players) {
          if (player.teamId === teamId) {
            player.teamId = null
          }
        }
      }
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
    updateTeamScore(state, {id, score}) {
      const team = state.teams.find(t => t.id === id)
      if (team) {
        team.score = score
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
    },
    finishRound(state) {
      state.roundFinished = true
    },
    nextRound(state) {
      state.roundStarted = false
      state.roundFinished = false
    },
    finishGame(state) {
      state.isFinished = true
    },

    // Only for local use
    newGame(state) {
      state.master = state.player.id
      state.players.push(state.player)
      state.isCreated = true
    },
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
    async newGame({commit, dispatch}) {
      await dispatch(msg('newGame'))
      commit('newGame')
    },
    async setPlayerName({commit, dispatch}, name) {
      if (name) {
        await dispatch(msg('setPlayerName', name))
        commit('setName', name)
        dispatch('setFont', randomFont()) // TODO: add option for user?
      }
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
    async addTeam({commit, dispatch}, name) {
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
    async setTurnTime({commit, dispatch}, turnTime) {
      if (turnTime) {
        await dispatch(msg('setTurnTime', turnTime))
        commit('setTurnTime', turnTime)
      }
    },
    async startGame({dispatch}) {
      dispatch(msg('startGame'))
    },
  },
}
