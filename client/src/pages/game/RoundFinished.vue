<template>
  <div>
    <div class="generalFont mediumFont centerFontH">
      Ronde voorbij!<br>
      Scores:<br>
    </div>
    <ul>
      <li v-for="team in teams" :key="team.id" class="generalFont smallFont">
        {{ team.name }} deze ronde: {{ team.scoreThisRound }} (totaal: {{ team.score }})
      </li>
    </ul>
    <br>
    <div v-if="isMaster">
      <button class="generalFont smallFont transparentButton buttonLeft" @click="nextRound">Nog een ronde</button>
      <button class="generalFont smallFont transparentButton buttonRight" @click="finishGame">Spel afronden</button>
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
