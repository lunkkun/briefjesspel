import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
  props: ['playerId'],
  computed: {
    shortName: function () {
      return this.shortNames[this.playerId].shortName
    },
    isActive: function() {
      return this.roundStarted && !this.roundFinished && this.playerId === this.activePlayer
    },
    ...mapState({
      activePlayer: state => state.game.activePlayer,
      roundStarted: state => state.game.roundStarted,
      roundFinished: state => state.game.roundFinished,
    }),
    ...mapGetters([
      'isMaster',
      'shortNames',
    ]),
  },
  methods: mapMutations([
    'selectPlayer',
  ]),
}
