<template>
  <div :class="{score: flashScore}"></div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'FlashScored',
  data: () => ({
    flashScore: false,
  }),
  watch: {
    scoreThisTurn() {
      if (this.scoreThisTurn && !this.myTurn) {
        this.flashScore = false
        this.$nextTick(function () {
          this.flashScore = true
        })
      }
    }
  },
  computed: {
    ...mapState({
      scoreThisTurn: state => state.game.scoreThisTurn,
    }),
    ...mapGetters([
      'myTurn',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.score {
  display: block;
  background-color: transparent;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  animation: flash 1s ease-out;
}
@keyframes flash {
  0% {background-color: #F8DC8D; opacity: 1;}
  100% {background-color: #F8DC8D; opacity: 0;}
}
</style>
