<template>
  <button class="transparentButton" @click="newGame">
    <div class="centerBlock generalFont biggerFont">NIEUW SPEL</div>
  </button>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Home',
  methods: mapActions([
    'newGame',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
