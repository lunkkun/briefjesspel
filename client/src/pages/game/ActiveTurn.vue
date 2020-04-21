<template>
  <div>
    <!-- TODO: paperBowl + toggleHomeCube implementeren -->
    <div v-if="entry">
      <div class="paperUnfolded">
        <button class="centerBlock generalFont bigFont transparentButton" @click="requestNextEntry()">
          <span>{{ entry.text }}<!-- TODO: font ({{ entry.font }}) --></span>
        </button>
      </div>
    </div>
    <Timer></Timer>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Timer from '../../components/Timer'
import PaperUnfolded from '../../components/PaperUnfolded'

export default {
  name: 'ActiveTurn',
  data() {
    return {
      clicked: false,
    }
  },
  components: {
    Timer,
    PaperUnfolded,
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
  
.paperUnfolded {
  display: block;
  background: url("~@/assets/img/paperUnfolded1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98vmin;
  height: 98vmin;
  animation-name: unfold;
  animation-duration: 1s;
}
@keyframes unfold {
  from {transform: translate(-50%, -50%) scale(0);}
  to {transform: translate(-50%, -50%) scale(1);}
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .paperUnfolded {
    width: 600px;
    height: 420px;
  }
}
</style>
