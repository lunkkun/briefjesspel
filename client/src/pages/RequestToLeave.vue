<template>
  <div>
    <div class="centerBlock">
      <div class="textFont smediumFont">
        <span class="subheaderFont mediumFont">W</span>il je het huidige spel verlaten?
      </div>
    </div>
    <br>
    <button class="textFont smediumFont transparentButton buttonLeft" @click="leaveGame()">Ja</button>
    <button class="textFont smediumFont transparentButton buttonRight" @click="stayInGame()">Nee</button>
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
