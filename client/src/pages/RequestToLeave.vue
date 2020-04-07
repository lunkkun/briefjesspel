<template>
  <HomeCube>
    <div class="generalFont">
      Wil je het huidige spel verlaten?
    </div>
    <br>
    <button class="generalFont transparentButton" @click="leaveGame()">Ja</button>
    <button class="generalFont transparentButton" @click="stayInGame()">Nee</button>
  </HomeCube>
</template>

<script>
import {mapActions} from 'vuex'
import HomeCube from '../components/HomeCube'

export default {
  name: 'RequestToLeave',
  components: {
    HomeCube,
  },
  methods: mapActions([
    'leaveGame',
    'stayInGame',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
