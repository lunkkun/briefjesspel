<template>
  <div>
    <div class="sidebarPlayerList sidebarLeft"><!-- :class="playerListClasses"> -->
      <transition name="playerCubeLeft">
        <PlayerCubeLeft v-for="player in players" :playerId="player.id" :key="player.id"><!-- :style="zIndexVariable"> --></PlayerCubeLeft>
      </transition>
    </div>
    <div class="sidebarPlayerList sidebarRight"><!-- :class="playerListClasses"> -->
      <transition name="playerCubeRight">
        <PlayerCubeRight v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeRight>
      </transition>
    </div>
    <div class="sidebarPlayerList sidebarTop"><!-- :class="playerListClasses"> -->
      <transition name="playerCubeTop">
        <PlayerCubeTop v-for="player in players" :playerId="player.id" :key="player.id"><!-- :style="zIndexVariable"> --></PlayerCubeTop>
      </transition>
    </div>
    <div class="sidebarPlayerList sidebarBottom"><!-- :class="playerListClasses"> -->
      <transition name="playerCubeBottom">
        <PlayerCubeBottom v-for="player in players" :playerId="player.id" :key="player.id"></PlayerCubeBottom>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PlayerCubeLeft from './PlayerCubeLeft'
import PlayerCubeRight from './PlayerCubeRight'
import PlayerCubeTop from './PlayerCubeTop'
import PlayerCubeBottom from './PlayerCubeBottom'

export default {
  name: 'PlayerList',
  components: {
    PlayerCubeLeft,
    PlayerCubeRight,
    PlayerCubeTop,
    PlayerCubeBottom,    
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
