<template>
  <div>
    <PaperBowl></PaperBowl>
    <PapersFolded></PapersFolded>
    <div v-if="showPaperUnfolded">
      <button class="transparentButton" @click="requestNextEntry()">
        <div class="paperUnfolded" :style="{backgroundImage: paperUnfoldedImg}">
          <span class="generalFont mediumFont centerWord">{{ entry.text }}<!-- TODO: font ({{ entry.font }}) --></span>
        </div>
      </button>
    </div>
    <Timer></Timer>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Timer from '../../components/Timer'
import PapersFolded from '../../components/PapersFolded'
import PaperBowl from '../../components/PaperBowl'

export default {
  name: 'ActiveTurn',
  data() {
    return {
      showPaperUnfolded: true,
      paperUnfoldedNum: 1,
      clicked: false,
    }
  },
  components: {
    Timer,
    PapersFolded,
    PaperBowl,
  },
  created() {
    this.setRandomPaperUnfoldedNum()
  },
  watch: {
    entry() {
      this.showPaperUnfolded = true
    },
  },
  computed: {
    paperUnfoldedImg() {
      return `url(${require(`@/assets/img/paperUnfolded${this.paperUnfoldedNum}.png`)})`
    },
    ...mapState({
      entry: state => state.game.activeEntry,
    })
  },
  methods: {
    requestNextEntry() {
      if (this.clicked) {
        this.showPaperUnfolded = false
        this.setRandomPaperUnfoldedNum()
        this.nextEntry()
      } else {
        this.clicked = true
        setTimeout(() => {
          this.clicked = false
        }, 500)
      }
    },
    setRandomPaperUnfoldedNum() {
      let num
      let counter = 0

      do {
        num = Math.floor(Math.random() * 4) + 1
        counter++
      } while (num === this.paperUnfoldedNum && counter <= 100)

      this.paperUnfoldedNum = num
    },
    ...mapActions([
      'nextEntry',
    ])
  },
}
</script>

<style lang="scss" scoped>
  .centerWord {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
  box-sizing: border-box;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  }
.paperUnfolded {
  display: block;
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
  animation-duration: 0.6s;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}
@keyframes unfold {
  0% {transform: translate(-50%, -50%) scale(0, 0.5);}
  70% {transform: translate(-50%, -50%) scale(0, 0.5);}
  100% {transform: translate(-50%, -50%) scale(1, 1);}
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .paperUnfolded {
    width: 600px;
    height: 420px;
  }
}
</style>
