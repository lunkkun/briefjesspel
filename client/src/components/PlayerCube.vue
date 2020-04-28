<template>
  <div class="wrapPlayerCube">
    <div class="playerCubeDropShadow"></div>
    <div class="playerCube generalFont smallFont">
      <div class="centerText">
        {{ shortName }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PlayerCube',
  props: ['playerId'],
  computed: {
    shortName() {
      return this.player.name.substr(0, 2).toUpperCase()
    },
    player() {
      return this.players[this.playerId]
    },
    ...mapState({
      players: state => state.game.players,
    }),
  },
}
</script>

<style lang="scss" scoped>

.centerText {
  display: block;
  background: transparent;
  position: absolute;
  top: 55%;
  left: 52%;
  transform: translate(-50%, -50%);
  user-select: none;
}
.playerCube {
  display: block;
  background-color: #F6D370;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 9.5vmin;
  height: 9.5vmin;
  box-shadow: 0.1vmin 0.1vmin 0.5vmin rgba(0,0,0,0.2);
  font-weight: bold;
  overflow: hidden;
  z-index: 20;
}
.playerCubeDropShadow {
  display: block;
  background-color: #344558;
  background: -webkit-gradient(linear, center bottom, center top, from(#344558), to(#688980));
  background: -webkit-linear-gradient(-155deg, #344558, #688980);
  background: -moz-linear-gradient(-155deg, #344558, #688980);
  background: -o-linear-gradient(-155deg, #344558, #688980);
  background: -ms-linear-gradient(-155deg, #344558, #688980);
  background: linear-gradient(-155deg, #344558, #688980);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 13.5vmin;
  height: 40vmin;
  transform: translateX(-50%) rotate(135deg);
  transform-origin: center top;
  z-index: 19;
}
.wrapPlayerCube {
  display: block;
  background-color: transparent;
  position: relative;
  top: 0;
  left: 0;
  width: 12vmin;
  height: 12vmin;
  transform: translate(0, 0);
  transition: transform 0.5s;
}
.wrapPlayerCube:hover {
  transform: translate( 30%, 30%);
}

.playerCube-enter-active {
  animation: unhidePlayerCube 0.6s cubic-bezier(.44,.06,.19,1.32)
}
@keyframes unhidePlayerCube {
  from {
    transform: translate(-150%, -150%);
  }
  to {
    transform: translate(0, 0);
  }
}

@media screen and (min-width: 613px) and (min-height: 613px) {
  .playerCube {
    width: 58px;
    height: 58px;
  }
  .playerCubeDropShadow {
    width: 82px;
    height: 300px;
  }
  .wrapPlayerCube {
    width: 73.2px;
    height: 73.2px;
  }
}
</style>
