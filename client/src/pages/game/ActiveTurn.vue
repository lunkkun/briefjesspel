<template>
  <div>
    <PaperBowl></PaperBowl>
    <PapersFolded></PapersFolded>
    <div v-if="!timerStarted" class="timerStartButton" @click="startTimer()"></div>
    <transition name="paper" mode="out-in">
      <div v-if="showPaperUnfolded" class="transparentButton paperUnfolded" :style="{backgroundImage: paperUnfoldedImg}"
           @click="requestNextEntry()" :key="entry.text">
        <span class="centerWord" :style="{fontFamily: entry.font + ', daniel'}">{{ entry.text }}</span>
      </div>
    </transition>
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
      showPaperUnfolded: false,
      paperUnfoldedNum: null,
      // clicked: false,
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
  mounted() {
    if (this.entry) {
      this.showPaperUnfolded = true
    }
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
      timerStarted: state => state.game.timerStarted,
      entry: state => state.game.activeEntry,
    }),
  },
  methods: {
    requestNextEntry() {
      // if (this.clicked) {
        this.showPaperUnfolded = false
        this.setRandomPaperUnfoldedNum()
        this.nextEntry()
      // } else {
      //   this.clicked = true
      //   setTimeout(() => {
      //     this.clicked = false
      //   }, 500)
      // }
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
      'startTimer',
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
  max-height: 80%;
  text-align: center;
  font-size: 9vmin;
  color: black;
  user-select: none;
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
}
.timerStartButton {
  display: block;
  background: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vmin;
  height: 80vmin;
  max-height: 490px;
  max-width: 490px;
}

.paper-enter-active {
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

.paper-leave-active {
  animation-name: drop;
  animation-duration: 0.15s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes drop {
  0% {transform: translate(-50%, -50%) scale(1);}
  100% {transform: translate(-50%, 200%) scale(0);}
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .paperUnfolded {
    width: 600px;
    height: 420px;
  }
  .centerWord {
    font-size: 55px;
  }
}
</style>
