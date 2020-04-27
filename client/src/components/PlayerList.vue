<template>
  <div class="sidebarPlayerList">
    <transition name="playerCube">
      <PlayerCube v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCube>
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
  left: 2%;
  transform: translateY(-50%);
  width: 20%;
  padding: 2%;
  overflow-y: scroll;
  text-overflow: ellipsis;
}
</style>
