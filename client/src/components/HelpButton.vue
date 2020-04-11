<template>
  <div @click="toggleHelp">
    <div class="infoCorner"></div>
    <div class="infoCornerBottomLeft"></div>
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
.infoCorner{
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 6.5vmin;
  height: 6.5vmin;
  max-width: 40px;
  max-height: 40px;
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
  border-bottom: 6.6vmin solid #F6D370;;
  border-right: 6.6vmin solid transparent;
  z-index: 20;
  cursor: pointer;
}
@media screen and (min-width: 613px) and (min-height: 613px) {
  .infoCorner {
    box-shadow: -2px 2px 1px rgba(52,69,88,0.6);
  }
  .infoCornerBottomLeft {
    border-bottom: 40px solid #F6D370;;
    border-right: 40px solid transparent;
  }
}
</style>
