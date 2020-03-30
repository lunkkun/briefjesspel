<template>
  <div>
    <div class="generalFont spelLink linkPosition" v-if="shareableLink && isMaster">{{ shareableLink }}</div>
    <!-- auto copy to clipboard, on select. JavaScript? Polle -->
    <br>
    <br>
    <div v-if="!_playerName">
      <label class="generalFont spelOpzetBriefjes labelPosition" for="playerName">Vul je naam in:</label>
      <!-- ipv label: onfocus="this.value=''" value="Je naam...", wilde mij niet lukken. Wellicht JavaScript. Polle -->
      <input id="playerName" class="generalFont spelOpzetNaam centerTextInput" style="color: #688980;" type="text" v-model="playerName">
      <button class="generalFont spelOpzetNaam transparentButton nextButton" @click="setPlayerName(playerName)">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>
    <div v-else-if="!_entriesPerPlayer && isMaster">
      <label class="generalFont spelOpzetBriefjes labelPosition" style="" for="entriesPerPlayer">Aantal briefjes per speler:</label>
      <!-- ipv label: onfocus="this.value=''" value="Aantal briefjes per speler...", wilde mij niet lukken. Wellicht JavaScript. Polle -->
      <input id="entriesPerPlayer" class="generalFont spelOpzetNaam centerTextInput" style="color: #688980;" type="number" min="1" max="10" v-model="entriesPerPlayer">
      <!-- Input number arrows nog hiden. Polle -->
      <button class="generalFont spelOpzetNaam transparentButton nextButton" @click="setEntriesPerPlayer(entriesPerPlayer)">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>
    <!-- briefjes invullen -->
    <!-- teams samenstellen -->
    <!-- tijd per ronde instellen -->
    <div v-else-if="canStart && isMaster">
      <button class="generalFont spelOpzetNaam centerTextInput" @click="startGame">Start</button>
    </div>
    <div class="generalFont spelOpzetBriefjes centerTextInput" v-else>
      Wachten tot het spel kan beginnen...
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"

export default {
  name: 'Setup',
  data() {
    return {
      playerName: '',
      entriesPerPlayer: 4,
    }
  },
  computed: {
    ...mapState({
      canStart: state => state.game.canStart,
      _playerName: state => state.game.playerName,
      _entriesPerPlayer: state => state.game.entriesPerPlayer,
    }),
    ...mapGetters([
      'isMaster',
      'shareableLink',
    ]),
  },
  methods: mapActions([
    'setPlayerName',
    'setEntriesPerPlayer',
    'startGame',
  ]),
}
</script>

<style lang="scss" scoped>
    
.linkPosition {
  display: block;
  background-color: #F8DC8D;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 15%;
  padding: 3% 2%;
  text-align: center;
  word-wrap: break-word;
}
.labelPosition {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  padding: 3%;
  text-align: center;
}
.centerTextInput {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}
button.nextButton {
  position: absolute;
  bottom: 2%;
  right: 4%;
}
.spelOpzetNaam {
  font-size: 10vmin;
  font-weight: bold;
}
@media screen and (min-width: 613px) and (min-height: 613px){
  .spelOpzetNaam {
    font-size: 60px;
  }
}
.spelOpzetBriefjes {
  font-size: 6.5vmin;
  font-weight: bold;
}
@media screen and (min-width: 613px) and (min-height: 613px){
  .spelOpzetBriefjes {
    font-size: 40px;
  }
}
.spelLink {
  font-style: italic;
  font-size: 5vmin;
  font-weight: bold;
}
@media screen and (min-width: 613px) and (min-height: 613px){
  .spelLink {
    font-size: 30px;
  }
}
</style>
