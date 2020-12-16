<template>
  <div>
    <button v-if="showPaperUnfolded" class="textFont smediumFont topButton" @click="finishTurn">Foutje, beurt voorbij.</button>
    <button v-if="showPaperUnfolded" class="textFont smediumFont bottomButton" @click="requestNextEntry()" :key="entry.text">Goed! Volgende.</button>
    <PaperBowl></PaperBowl>
    <PapersFolded></PapersFolded>
    <div v-if="!timerStarted" class="timerStartButton" @click="startTimer()"></div>
    <transition name="paper" mode="out-in">
      <div v-if="showPaperUnfolded" class="transparentButton paperUnfolded" :style="{backgroundImage: paperUnfoldedImg}">
        <span class="centerWord" :style="{fontFamily: entry.font + ', daniel'}">
          {{ entry.text }}
        </span>
      </div>
    </transition>
    <div class="swipeToV swipeToTop"></div>
    <div class="swipeToH swipeToRight"></div>
    <div class="swipeToV swipeToBottom"></div>
    <div class="swipeToH swipeToLeft"></div>
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
    if (this.entry && this.timerStarted) {
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
      'finishTurn',
    ])
  },
}
</script>

<style lang="scss" scoped>
.topButton {x 10% 0px 10%;
  display: inline-block;
  position: absolute;
  top: 15%;
  z-index: 1;
  padding: 10px;
  margin: 10px;
  color: black;
  border-radius: 15px;
  border: 2px solid #B00000;
  background: #B00000;
  text-align: center;
  margin: 0px 10% 0px 10%;
  width: 80%;
}
.bottomButton {
  display: inline-block;
  position: absolute;
  bottom: 15%;
  z-index: 1;
  padding: 10px;
  margin: 10px;
  color: black;
  border-radius: 15px;
  border: 2px solid green;
  background: green;
  text-align: center;
  margin: 0px 10% 0px 10%;
  width: 80%;
}
.swipeToV {
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 94vmin;
  height: calc(50vh - 37.5vmin);
}
.swipeToH {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: calc(50vw - 49vmin);
  height: 70vmin;
}
.swipeToTop {
  top: 0;
}
.swipeToRight {
  right: 0;
}
.swipeToBottom {
  bottom: 0;
}
.swipeToLeft {
  left: 0;
}
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
  width: 94vmin;
  height: 70vmin;
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
  0% {transform: translate(-50%, -50%) scale(0, 0);}
  70% {transform: translate(-50%, -50%) scale(0, 0.5);}
  100% {transform: translate(-50%, -50%) scale(1, 1);}
}

.paper-leave-active {
  animation-name: drop;
  animation-duration: 0.25s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes drop {
  0% {transform: translate(-50%, -50%) scaleX(1);}
  100% {transform: translate(-50%, 200%) scaleX(0);}
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .swipeToV {
    width: 576px;
    height: calc(50vh - 230px);
  }
  .swipeToH {
    height: 430px;
    width: calc(50vw - 300px);
  }
  .centerWord {
    font-size: 55px;
  }
  .paperUnfolded {
    width: 576px;
    height: 430px;
  }
}
</style>
