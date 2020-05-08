<template>
  <div>
    <div class="centerBlock generalFont biggerFont" @click="newGame">NIEUW SPEL</div>
    <div class="centerBlock generalFont smallFont subText" @click="toggleHelp()">Hoe werkt het?</div>
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
  position: absolute;
  top: 90%;
  width: 100%;
  text-align: center;
}
</style>
