<template>
  <HomeCube>
    <div class="generalFont">
      Ronde voorbij!<br>
      Scores:<br>
    </div>
    <ul>
      <li v-for="team in teams" :key="team.id" class="generalFont">
        {{ team.name }}: {{ team.scoreThisRound }} (totaal: {{ team.score }})
      </li>
    </ul>
    <br>
    <div v-if="isMaster">
      <button class="generalFont transparentButton" @click="nextRound">Speel nog een ronde</button><br>
      <button class="generalFont transparentButton" @click="finishGame">Spel afronden</button>
    </div>
  </HomeCube>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import HomeCube from '../../components/HomeCube'

export default {
  name: 'RoundFinished',
  components: {
    HomeCube,
  },
  computed: {
    ...mapState({
      teams: state => state.game.teams,
    }),
    ...mapGetters([
      'isMaster',
    ]),
  },
  methods: mapActions([
    'nextRound',
    'finishGame',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
