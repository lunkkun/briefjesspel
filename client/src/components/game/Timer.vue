<template>
  <div class="generalFont timer">
    <!-- TODO: mooie timer -->
    {{ turnTimeLeft }}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Timer',
  computed: mapState({
    turnTimeLeft: state => state.game.turnTimeLeft,
  }),
}
</script>

<style lang="scss" scoped>
.timer {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 80%;
  left: 80%;
  transform: translate(-50%, -50%);
  font-size: 10vmin;
  font-weight: bold;
  color: #344558;
}
</style>
