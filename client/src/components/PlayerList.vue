<template>
  <div>
    <div class="sidebarPlayerList sidebarLeft">
      <transition-group name="playerCubeLeft">
        <PlayerCubeLeft v-for="player in playersLeft" :player-id="player.id" :key="'left-' + player.id" :style="{zIndex: 100 - player.index}"></PlayerCubeLeft>
      </transition-group>
    </div>
    <div class="sidebarPlayerList sidebarRight">
      <transition-group name="playerCubeRight">
        <PlayerCubeRight v-for="player in playersRight" :player-id="player.id" :key="'right-' + player.id" :style="{zIndex: player.index}"></PlayerCubeRight>
      </transition-group>
    </div>
    <div class="sidebarPlayerList sidebarTop">
      <transition-group name="playerCubeTop">
        <PlayerCubeTop v-for="player in playersTop" :player-id="player.id" :key="'top-' + player.id" :style="{zIndex: 100 - player.index}"></PlayerCubeTop>
      </transition-group>
    </div>
    <div class="sidebarPlayerList sidebarBottom">
      <transition-group name="playerCubeBottom">
        <PlayerCubeBottom v-for="player in playersBottom" :player-id="player.id" :key="'bottom-' + player.id" :style="{zIndex: player.index}"></PlayerCubeBottom>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import WatchResize from '../mixins/WatchResize'
import PlayerCubeLeft from './PlayerCubeLeft'
import PlayerCubeRight from './PlayerCubeRight'
import PlayerCubeTop from './PlayerCubeTop'
import PlayerCubeBottom from './PlayerCubeBottom'

export default {
  name: 'PlayerList',
  mixins: [WatchResize],
  components: {
    PlayerCubeLeft,
    PlayerCubeRight,
    PlayerCubeTop,
    PlayerCubeBottom,
  },
  computed: {
    playersLeft() {
      return this.landscape ? this.players.slice(0, 6) : this.players.slice(12, 18)
    },
    playersRight() {
      return this.landscape ? this.players.slice(6, 12) : this.players.slice(18, 24)
    },
    playersTop() {
      return this.landscape ? this.players.slice(12, 18) : this.players.slice(0, 6)
    },
    playersBottom() {
      return this.landscape ? this.players.slice(18, 24) : this.players.slice(6, 12)
    },
    players() {
      return this.myTurnActive ? [] : this.playersSorted
    },
    ...mapGetters([
      'playersSorted',
      'myTurnActive',
    ]),
  },
}
</script>

<style lang="scss" scoped>

.sidebarPlayerList {
  display: block;
  background-color: transparent;
  position: absolute;
  overflow: visible;
  z-index: 29;
}
.sidebarLeft {
  top: 50%;
  left: 0.5vmin;
  transform: translateY(-50%);
}
.sidebarRight {
  top: 50%;
  right: 0.5vmin;
  transform: translateY(-50%);
}
.sidebarTop {
  top: 0.5vmin;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.sidebarBottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
