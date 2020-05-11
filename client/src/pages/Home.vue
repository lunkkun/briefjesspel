<template>
  <div>
    <div class="centerBlock" style="top: 48%;">
      <div class="headerFont hugeFont noSelect" @click="newGame">NIEUW SPEL</div>
    </div>
    <div class="textFont tinyFont subText noSelect" @click="toggleHelp()">Hoe werkt het?</div>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapMutations([
      'toggleHelp',
    ]),
    ...mapActions([
      'newGame',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.subText {
  display: block;
  position: absolute;
  top: 90%;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
</style>
