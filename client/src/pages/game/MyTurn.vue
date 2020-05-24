<template>
  <div>
    <div v-if="!isStarted" @click="startTurn()">
      <div class="centerBlock noSelect">
        <div class="headerFont mediumFont">Het is jouw beurt!</div>
        <div class="textFont tinyFont">De tijd gaat lopen zodra je een briefje pakt...</div>
        <!--<div class="textFont tinyFont">Klik 2x op een briefje om de volgende te pakken!</div>-->
      </div>
      <NextButton @click="startTurn()" v-focus></NextButton>
    </div>

    <div v-else-if="isFinished" class="centerFontH">
      <div class="textFont mediumFont">
        Je beurt is voorbij!
      </div>
      <div class="textFont smallerFont">
          <br>
          Behaalde score: {{ scoreThisTurn }}<br>
          Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
      </div>
      <div class="headerFont mediumFont noSelect">
        <br>Geef de beurt door
      </div>
      <NextButton @click="nextTurn()"></NextButton>
      <div class="transparentOverlayButton" @click="nextTurn()"></div>
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
.subText2 {
  position: absolute;
  top: 66%;
  width: 100%;
  text-align: center;
}
.transparentOverlayButton {
  display: block;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
