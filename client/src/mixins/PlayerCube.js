import {mapState, mapGetters} from 'vuex'

export default {
  props: ['playerId'],
  computed: {
    shortName: function () {
      return this.shortNames[this.playerId].shortName
    },
    isActive: function() {
      return this.playerId === this.activePlayer
    },
    ...mapState({
      activePlayer: state => state.game.activePlayer
    }),
    ...mapGetters([
      'shortNames',
    ]),
  },
}
