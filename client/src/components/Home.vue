<template>
  <div>
    <button class="transparentButton" @click="newGame"><p class="nieuwSpel">NIEUW SPEL</p></button>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: 'Home',
  methods: mapActions([
    'newGame',
  ]),
}
</script>

<style lang="scss" scoped>
button.transparentButton {
  display: block;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
}
p.nieuwSpel {
  font-family: Capone Light, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12vmin;
  font-weight: bold;
  color: #344558;
}
@media screen and (min-width: 613px) and (min-height: 613px){
  p.nieuwSpel {
    font-size: 74px
  }
}
</style>
