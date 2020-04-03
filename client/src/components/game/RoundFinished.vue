<template>
  <div>
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
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'RoundFinished',
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
