export default {
  state: {
    isLoaded: false, // whether we've received the first response from the server
    isInitialized: false, // whether the're actually a game
    path: '',

    players: [],
    teams: [],
    isMaster: true,
    entriesPerPlayer: 4,

    isStarted: false,
    isFinished: false,

    turnTime: 60, // in seconds
    roundStarted: false,

    activePlayer: null,
    turnStarted: false,
    turnTimeLeft: 60, // in seconds
    entry: '',
  },
  mutations: {
    load(state, data) {
      if (data) {
        state.path = data.path

        state.players = data.players
        state.teams = data.teams
        state.isMaster = data.isMaster
        state.entriesPerPlayer = data.entriesPerPlayer

        state.isStarted = data.isStarted
        state.isFinished = data.isFinished

        state.turnTime = data.turnTime
        state.roundStarted = data.roundStarted

        state.activePlayer = data.activePlayer
        state.turnStarted = data.turnStarted
        state.turnTimeLeft = data.turnTimeLeft

        state.isInitialized = true
      }
      state.isLoaded = true
    },
  },
  actions: {

  },
}
