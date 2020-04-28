<template>
  <div class="sidebarPlayerListTop">
    <transition name="playerCubeTop">
      <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -1;"></PlayerCubeTop>
    </transition>
    <transition name="playerCubeTop">
      <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -2;"></PlayerCubeTop>
    </transition>
    <transition name="playerCubeTop">
      <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -3;"></PlayerCubeTop>
    </transition>
    <transition name="playerCubeTop">
      <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -4;"></PlayerCubeTop>
    </transition>
    <transition name="playerCubeTop">
      <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -5;"></PlayerCubeTop>
    </transition>
    <transition name="playerCubeTop">
      <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -6;"></PlayerCubeTop>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PlayerCubeTop from './PlayerCubeTop'

export default {
  name: 'PlayerList',
  components: {
    PlayerCubeTop,
  },
  computed: mapGetters([
    'players',
  ]),
}
</script>

<style lang="scss" scoped>
  
.sidebarPlayerListTop {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 0.5vmin;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
  white-space: nowrap;
  z-index: 29;
}
</style>
