<template>
  <div>
    <!-- TODO: paperBowl + toggleHomeCube implementeren -->
    <div v-if="entry">
      <button class="centerBlock generalFont bigFont transparentButton" @click="requestNextEntry()">
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
  data() {
    return {
      clicked: false,
    }
  },
  components: {
    Timer,
  },
  computed: mapState({
    entry: state => state.game.activeEntry,
  }),
  methods: {
    requestNextEntry() {
      if (this.clicked) {
        this.nextEntry()
      } else {
        this.clicked = true
        setTimeout(() => {
          this.clicked = false
        }, 500)
      }
    },
    ...mapActions([
      'nextEntry',
    ])
  },
}
</script>

<style lang="scss" scoped>

</style>
