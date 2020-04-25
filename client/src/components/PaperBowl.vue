<template>
  <div>
    <div :class="containerClass"></div>
    <div :class="containerShadowClass"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PaperBowl',
  computed: {
    containerClass() {
      return this.container
    },
    containerShadowClass() {
      return this.container + 'Shadow'
    },
    ...mapState({
      container: state => state.game.container,
    }),
  },
}
</script>

<style lang="scss" scoped>

.hat {
  display: block;
  background: url("~@/assets/img/hoed.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 99.5vmin;
  height: 99.5vmin;
}
.hatShadow {
  display: block;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88.5vmin;
  height: 88.5vmin;
  border-radius: 50%;
  box-shadow: 0 0 3vmin 5vmin rgba(0,0,0,0.5);
}

.bowl {
  display: block;
  background: url("~@/assets/img/schaal.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 105vmin;
  height: 105vmin;
}
.bowlShadow {
  display: block;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 51%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72vmin;
  height: 72vmin;
  border-radius: 50%;
  box-shadow: 0 0 3vmin 5vmin rgba(0,0,0,0.5);
}

.colander {
  display: block;
  background: url("~@/assets/img/vergiet.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 105vmin;
  height: 105vmin;
  filter: brightness(0.9);
}
.colanderShadow {
  display: block;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68.4vmin;
  height: 68.4vmin;
  border-radius: 50%;
  box-shadow: 0 0 3vmin 5vmin rgba(0,0,0,0.5);
}

@media screen and (min-width: 613px) and (min-height: 613px) {
  .hat {
    width: 610px;
    height: 610px;
  }
  .hatShadow {
    width: 540px;
    height: 540px;
    box-shadow: 0 0 18px 30px rgba(0,0,0,0.5);
  }

  .bowl {
    width: 640px;
    height: 640px;
  }
  .bowlShadow {
    width: 440px;
    height: 440px;
    box-shadow: 0 0 18px 30px rgba(0,0,0,0.5);
  }

  .colander {
    width: 640px;
    height: 640px;
  }
  .colanderShadow {
    width: 420px;
    height: 420px;
    box-shadow: 0 0 18px 30px rgba(0,0,0,0.5);
  }
}
</style>
