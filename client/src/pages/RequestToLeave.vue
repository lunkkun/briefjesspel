<template>
  <div>
    <div class="generalFont mediumFont centerBlock">
      Wil je het huidige spel verlaten?
    </div>
    <br>
    <button class="generalFont mediumFont transparentButton buttonLeft" @click="leaveGame()">Ja</button>
    <button class="generalFont mediumFont transparentButton buttonRight" @click="stayInGame()">Nee</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'RequestToLeave',
  methods: mapActions([
    'leaveGame',
    'stayInGame',
  ]),
}
</script>

<style lang="scss" scoped>

.buttonLeft {
  position: absolute;
  bottom: 5%;
  left: 5%;
}
.buttonRight {
  position: absolute;
  bottom: 5%;
  right: 5%;
}
</style>
