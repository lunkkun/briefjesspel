<template>
  <button class="transparentButton" @click="newGame">
    <HomeCube>
      <div class="centerBlock generalFont bigFont" >NIEUW SPEL</div>
    </HomeCube>
  </button>
</template>

<script>
import {mapActions} from 'vuex'
import HomeCube from '../components/HomeCube'

export default {
  name: 'Home',
  components: {
    HomeCube,
  },
  methods: mapActions([
    'newGame',
  ]),
}
</script>

<style lang="scss" scoped>


</style>
