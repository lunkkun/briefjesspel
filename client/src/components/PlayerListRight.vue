<template>
  <div class="sidebarPlayerListRight">
    <transition name="playerCubeRight">
      <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
    </transition>
    <transition name="playerCubeRight">
      <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
    </transition>
    <transition name="playerCubeRight">
      <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
    </transition>
    <transition name="playerCubeRight">
      <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
    </transition>
    <transition name="playerCubeRight">
      <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
    </transition>
    <transition name="playerCubeRight">
      <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PlayerCubeRight from './PlayerCubeRight'

export default {
  name: 'PlayerListRight',
  components: {
    PlayerCubeRight,
  },
  computed: mapGetters([
    'players',
  ]),
}
</script>

<style lang="scss" scoped>

.sidebarPlayerListRight {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 50%;
  right: 0.5vmin;
  transform: translateY(-50%);
  overflow: visible;
  z-index: 29;
}
</style>
