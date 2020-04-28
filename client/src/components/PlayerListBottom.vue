<template>
  <div class="sidebarPlayerListBottom">
    <transition name="playerCubeBottom">
      <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
    </transition>
    <transition name="playerCubeBottom">
      <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
    </transition>
    <transition name="playerCubeBottom">
      <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
    </transition>
    <transition name="playerCubeBottom">
      <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
    </transition>
    <transition name="playerCubeBottom">
      <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
    </transition>
    <transition name="playerCubeBottom">
      <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PlayerCubeBottom from './PlayerCubeBottom'

export default {
  name: 'PlayerListBottom',
  components: {
    PlayerCubeBottom,
  },
  computed: mapGetters([
    'players',
  ]),
}
</script>

<style lang="scss" scoped>

.sidebarPlayerListBottom {
  display: block;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
  white-space: nowrap;
  z-index: 29;
}
</style>
