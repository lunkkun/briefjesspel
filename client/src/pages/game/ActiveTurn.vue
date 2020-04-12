<template>
  <div>
    <!-- TODO: paperBowl + toggleHomeCube implementeren -->
    <div v-if="entry">
      <button class="centerBlock generalFont bigFont transparentButton" @dblclick="nextEntry()">
        <span>{{ entry.text }}<!-- TODO: font ({{ entry.font }}) --></span>
      </button>
    </div>
    <Timer></Timer>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Timer from '../../components/Timer'

export default {
  name: 'ActiveTurn',
  components: {
    Timer,
  },
  computed: mapState({
    entry: state => state.game.activeEntry,
  }),
  methods: mapActions([
    'nextEntry',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
