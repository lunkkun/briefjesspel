<template>
  <div id="app">
    <div v-if="isLoaded">
      <Game></Game>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game,
  },
  computed: mapState({
    isLoaded: state => state.game.isLoaded,
  }),
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
