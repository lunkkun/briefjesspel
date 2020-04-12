<template>
  <div @click="toggleHelp">
    <div class="infoCorner"></div>
    <div class="infoCornerBottomLeft"></div>    
    <div class="infoCornerBig"></div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'HelpButton',
  methods: mapMutations([
    'toggleHelp',
  ]),
}
</script>

<style lang="scss" scoped>
  
.infoCorner {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 6.5vmin;
  height: 6.5vmin;
  background-color: #344558;
  box-shadow: -0.4vmin 0.4vmin 0.2vmin rgba(52,69,88,0.6);
  z-index: 19;
}
.infoCornerBottomLeft {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 6.6vmin solid #F8DC8D;
  border-right: 6.6vmin solid transparent;
  z-index: 20;
  cursor: pointer;
}
.infoCornerBig {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 12vmin;
  height: 12vmin;
  background-color: transparent;
  z-index: 19;
}

@media screen and (min-width: 613px) and (min-height: 613px) {
  .infoCorner {
    width: 40px;
    height: 40px;
    box-shadow: -2px 2px 1px rgba(52,69,88,0.6);
  }
  .infoCornerBottomLeft {
    border-bottom: 40px solid #F8DC8D;
    border-right: 40px solid transparent;
  }
  .infoCornerBig {
    width: 75px;
    height: 75px;
  }
}
</style>
