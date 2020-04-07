<template>
  <HomeCube>
    <div class="generalFont">
      <h3>Eindstand:</h3>

      <ul>
        <li v-for="team in rankings" :key="team.id">
          <div class="generalFont">
            {{ team.name }}: {{ team.score }}
          </div>
        </li>
      </ul>

      <button v-if="isMaster" class="generalFont transparentButton" @click="newGameFromCurrent()">Nieuw spel met dezelfde spelers</button><br>
      <button class="generalFont transparentButton" @click="leaveGame()">Verlaat het spel</button>
    </div>
  </HomeCube>
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

</style>
