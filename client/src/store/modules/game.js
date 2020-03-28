function msg(action, data) {
  return {action, data, type: 'sendMessage'}
}

export default {
  state: {
    userId: null,

    // game initialization
    isLoaded: false, // whether we've received the first response from the server
    isCreated: false, // whether there's actually a game on the server
    path: null,

    // settings for game
    players: [],
    teams: [],
    master: null,
    playerName: null,
    teamId: null,
    teamName: null,
    entriesPerPlayer: null,

    // state of game
    canStart: false,
    isStarted: false,
    isFinished: false,

    // settings for round
    turnTime: null, // in seconds
    scorePerEntry: 1, // for now hardcoded
    roundStarted: false,

    // state of turn
    activePlayer: null,
    turnStarted: false,
    turnTimeLeft: null, // in seconds
    activeEntry: null,
  },
  getters: {
    isMaster: state => {
      return state.master === state.userId
    },
    masterName: state => {
      return state.players.find(user => user.id === state.master)
    },
    shareableLink: state => {
      return state.path ? `${window.location.protocol}//${window.location.host}/${state.path}` : null
    },
  },
  mutations: {
    load(state, {userId, game}) {
      state.userId = userId

      if (game) {
        state.path = game.path

        state.players = game.players
        state.teams = game.teams

        state.master = game.master
        state.playerName = game.playerName
        state.teamId = game.teamId
        state.teamName = game.teamName
        state.entriesPerPlayer = game.entriesPerPlayer

        state.canStart = game.canStart
        state.isStarted = game.isStarted
        state.isFinished = game.isFinished

        state.turnTime = game.turnTime
        state.scorePerEntry = game.scorePerEntry
        state.roundStarted = game.roundStarted

        state.activePlayer = game.activePlayer
        state.teamIsActive = game.teamIsActive
        state.playerIsActive = game.playerIsActive
        state.turnStarted = game.turnStarted
        state.turnTimeLeft = game.turnTimeLeft

        state.isCreated = true
      }

      state.isLoaded = true
    },
    setPath(state, path) {
      state.path = path
    },
    addPlayer(state, data) {
      state.players.push(data)
    },
    setPlayerName(state, name) {
        state.playerName = name
    },
    setEntriesPerPlayer(state, entriesPerPlayer) {
      state.entriesPerPlayer = entriesPerPlayer
    },
    setCanStart(state, canStart) {
      state.canStart = canStart
    },
  },
  actions: {
    async newGame({state, commit, dispatch}) {
      await dispatch(msg('newGame'))
      state.master = state.userId
      state.isCreated = true
    },
    async setPlayerName({state, commit, dispatch}, name) {
      await dispatch(msg('setPlayerName', name))
      commit('setPlayerName', name)
    },
    async setEntriesPerPlayer({commit, dispatch}, entriesPerPlayer) {
      await dispatch(msg('setEntriesPerPlayer', entriesPerPlayer))
      commit('setEntriesPerPlayer', entriesPerPlayer)
    },
    async startGame({dispatch}) {
      dispatch(msg('startGame'))
    },
  },
}
