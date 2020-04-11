<template>
  <HomeCube>
    <div v-if="!isStarted" class="generalFont smallFont centerFontH">
      Je bent aan de beurt!
      <button class="centerBlock generalFont bigFont transparentButton" @click="startTurn">Start je beurt</button>
    </div>
    <div v-else-if="!isFinished">
      <!-- Nog implementeren
      <div class="bowl" :class="paperContainer"></div>
      <div class="bowlShadow" :class="paperContainerShadow"></div>
      -->
      <div v-if="entry">
        <button class="centerBlock generalFont bigFont transparentButton" @dblclick="nextEntry">
          <span>{{ entry.text }}<!-- TODO: font ({{ entry.font }}) --></span>
        </button>
      </div>
      <Timer></Timer>
    </div>
    <div v-else class="generalFont smallFont">
      Je beurt is voorbij!<br>
      <span class="generalFont tinyFont">
        Behaalde score: {{ scoreThisTurn }}<br>
        Volgende speler: {{ nextPlayerName }} ({{ nextTeamName }})
      </span>
      <button class="centerBlock generalFont bigFont transparentButton" @click="nextTurn">Geef de beurt door</button>
    </div>
  </HomeCube>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import HomeCube from '../../components/HomeCube'
import Timer from '../../components/Timer'

export default {
  name: 'MyTurn',
  components: {
    HomeCube,
    Timer,
  },
  computed: {
    ...mapState({
      isStarted: state => state.game.turnStarted,
      isFinished: state => state.game.turnFinished,
      entry: state => state.game.activeEntry,
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
    'nextEntry',
    'nextTurn',
  ]),
}
</script>

<style lang="scss" scoped>

.bowl {
  display: block;
  background-image: url(/assets/img/hoed.png);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vmin;
  height: 85vmin;
  max-height: 480px;
  max-width: 480px;
  z-index: 11;
}
.bowlShadow {
  display: block;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vmin;
  height: 75vmin;
  max-height: 460px;
  max-width: 460px;
  border-radius: 50%;
  box-shadow: 0 0 5vmin 10vmin rgba(0,0,0,0.3);
  z-index: 10;
}

.hat {
  
}
.hatShadow {
  
}

.colander {
  
}
.colanderShadow {
  
}
</style>
