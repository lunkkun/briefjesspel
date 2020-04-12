<template>
  <div>
    <div class="generalFont mediumFont centerFontH">
      Eindstand:
    </div>
    <ul>
      <li v-for="team in rankings" :key="team.id">
        <div class="generalFont smallFont">
          Team {{ team.name }}: {{ team.score }} punt<span v-if="team.score !== 1">en</span>
        </div>
      </li>
    </ul>

    <button v-if="isMaster" class="generalFont smallFont transparentButton buttonLeft" @click="newGameFromCurrent()">Nog eens</button><br>
    <button class="generalFont smallFont transparentButton buttonRight" @click="leaveGame()">Verlaat het spel</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import HomeCube from '../../components/HomeCube'

export default {
  name: 'Finished',
  components: {
    HomeCube,
  },
  computed: mapGetters([
    'isMaster',
    'rankings',
  ]),
  methods: mapActions([
    'newGameFromCurrent',
    'leaveGame',
  ]),
}
</script>

<style lang="scss" scoped>


.buttonLeft {
  position: absolute;
  bottom: 2%;
  left: 2%;
}
.buttonRight {
  position: absolute;
  bottom: 2%;
  right: 2%;
}
</style>
