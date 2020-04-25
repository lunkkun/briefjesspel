<template>
  <div>
    <div v-if="!isStarted">
      <div class="centerBlock generalFont bigFont transparentButton" style="top: 45%;">Het is jouw beurt!</div>
      <div class="generalFont tinyFont subText">De tijd gaat lopen zodra je een briefje pakt...</div>
      <NextButton @click="startTurn()" v-focus></NextButton>
    </div>

    <div v-else-if="isFinished">
      <div class="generalFont smallFont">
        Je beurt is voorbij!<br>
        <span class="generalFont tinyFont">
          Behaalde score: {{ scoreThisTurn }}<br>
          Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
        </span>
        <button class="centerBlock generalFont bigFont transparentButton" @click="nextTurn()">Geef de beurt door</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import NextButton from '../../components/NextButton'

export default {
  name: 'MyTurn',
  components: {
    NextButton,
  },
  computed: {
    ...mapState({
      isStarted: state => state.game.turnStarted,
      isFinished: state => state.game.turnFinished,
      scoreThisTurn: state => state.game.scoreThisTurn,
    }),
    ...mapGetters([
      'activePlayerName',
      'nextPlayerName',
      'activeTeamName',
      'nextTeamName',
    ]),
  },
  methods: mapActions([
    'startTurn',
    'nextTurn',
  ]),
}
</script>

<style lang="scss" scoped>
.subText {
  position: absolute;
  top: 55%;
  width: 100%;
  text-align: center;
}
</style>
