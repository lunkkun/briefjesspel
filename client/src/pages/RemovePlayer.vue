<template>
  <div>
    <div class="generalFont mediumFont centerBlock">
      Wil je {{ selectedPlayerName }} uit het spel verwijderen?
    </div>
    <br>
    <button class="generalFont mediumFont transparentButton buttonLeft" @click="removeSelectedPlayer()">Ja</button>
    <button class="generalFont mediumFont transparentButton buttonRight" @click="deselectPlayer()">Nee</button>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'RemovePlayer',
  computed: mapGetters([
    'selectedPlayerName',
  ]),
  methods: {
    ...mapMutations([
      'deselectPlayer'
    ]),
    ...mapActions([
      'removeSelectedPlayer',
    ]),
  },
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
