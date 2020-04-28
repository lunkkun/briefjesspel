<template>
  <div class="sidebarPlayerList">
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -1;"></PlayerCube>
    </transition>
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -2;"></PlayerCube>
    </transition>
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -3;"></PlayerCube>
    </transition>
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -4;"></PlayerCube>
    </transition>
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -5;"></PlayerCube>
    </transition>
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id" style="z-index: -6;"></PlayerCube>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PlayerCube from './PlayerCube'

export default {
  name: 'PlayerList',
  components: {
    PlayerCube,
  },
  computed: mapGetters([
    'players',
  ]),
}
</script>

<style lang="scss" scoped>
  
.sidebarPlayerList {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 0.5vmin;
  transform: translateY(-50%);
  overflow: visible;
  z-index: 29;
}
</style>
