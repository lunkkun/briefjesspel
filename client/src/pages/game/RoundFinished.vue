<template>
  <div>
    <div class="headerFont mediumFont centerFontH" style="font-weight: bold;">
      Ronde voorbij!<br>
    </div>
    <div class="textFont smediumFont centerFontH">
      Scores:<br>
    </div>
    <ul>
      <li v-for="team in teams" :key="team.id" class="textFont smallerFont">
        {{ team.name }} deze ronde: {{ team.scoreThisRound }} (totaal: {{ team.score }})
      </li>
    </ul>
    <br>
    <div v-if="isMaster">
      <button class="textFont smallerFont transparentButton buttonLeft" @click="nextRound">Nog een ronde</button>
      <button class="textFont smallerFont transparentButton buttonRight" @click="finishGame">Spel afronden</button>
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
