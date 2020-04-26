<template>
  <div v-if="entriesRemaining">
    <div class="papersFolded" :style="{backgroundImage}"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PapersFolded',
  computed: {
    papersInBowl() {
      return Math.min(this.entriesRemaining - (this.activeEntry ? 1 : 0), 8)
    },
    backgroundImage() {
      return `url(${require(`@/assets/img/papersFolded${this.papersInBowl}.png`)})`
    },
    ...mapState({
      entriesRemaining: state => state.game.entriesRemaining,
      activeEntry: state => state.game.activeEntry,
    }),
  },
}
</script>

<style lang="scss" scoped>

.papersFolded {
  display: block;
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65vmin;
  height: 65vmin;
  filter: drop-shadow(0 1.4vmin 1.4vmin rgba(0,0,0,0.5)) brightness(0.9) sepia(30%);
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .papersFolded {
    width: 400px;
    height: 400px;
    filter: drop-shadow(0 8px 8px rgba(0,0,0,0.5)) brightness(0.9) sepia(30%);
  }
}
</style>
