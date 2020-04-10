<template>
  <div class="generalFont mediumFont timer">
    {{ turnTimeLeft }}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Timer',
  computed: mapState({
    turnTimeLeft: (state) => {
      const timeLeft = state.game.turnTimeLeft
      const minutes = Math.floor(timeLeft / 60)
      const seconds = timeLeft - 60 * minutes
      return minutes + ':' + seconds.toString().padStart(2, '0')
    },
  }),
}
</script>

<style lang="scss" scoped>
.timer {
  display: block;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  right: 4%;
  font-weight: bold;
}
</style>
