<template>
  <HomeCube>
    <div v-if="!gameStarted">
      <div class="generalFont spelLink linkPosition" v-if="shareableLink && isMaster">{{ shareableLink }}</div>
      <!-- auto copy to clipboard, on select. JavaScript? Polle -->
      <br>
      <br>
    </div>
    <div v-if="!playerNameSet">
      <label class="generalFont spelOpzetBriefjes labelPosition" for="playerName">Vul je naam in:</label>
      <input id="playerName" class="generalFont spelOpzetNaam centerTextInput" style="color: #688980;" type="text" v-model="playerName" v-focus>
      <div v-if="errors.playerName" class="generalFont error">Je naam moet minimaal 2 tekens bevatten</div>
      <button class="generalFont spelOpzetNaam transparentButton nextButton" @click="confirmPlayerName()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>
    <div v-else-if="!entriesPerPlayerSet && isMaster">
      <label class="generalFont spelOpzetBriefjes labelPosition" style="" for="entriesPerPlayer">Aantal briefjes per speler:</label>
      <input id="entriesPerPlayer" class="generalFont spelOpzetNaam centerTextInput" style="color: #688980;" type="number" min="1" max="9" v-model="entriesPerPlayer"  v-focus>
      <div v-if="errors.entriesPerPlayer" class="generalFont error">Vul een getal in tussen de 1 en de 9</div>
      <!-- Input number arrows nog hiden. Polle -->
      <button class="generalFont spelOpzetNaam transparentButton nextButton" @click="confirmEntriesPerPlayer()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>
    <div v-else-if="!enoughEntries">
      <label class="generalFont spelOpzetBriefjes labelPosition" for="entry">
        Vul <span v-if="firstEntryAdded">nog </span>een briefje in ({{ nrEntries + 1 }}/{{ ofTotalEntries }}):
      </label>
      <input id="entry" class="generalFont spelOpzetNaam centerTextInput" style="color: #688980;" type="text" v-model="entry" v-focus>
      <div v-if="errors.entry" class="generalFont error">Het briefje mag niet leeg zijn</div>
      <button class="generalFont spelOpzetNaam transparentButton nextButton" @click="confirmEntry()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>
    <SetupTeams v-else-if="!teamsConfirmed && isMaster"></SetupTeams>
    <div v-else-if="!turnTimeSet && isMaster">
      <label class="generalFont spelOpzetBriefjes labelPosition" for="turnTime">Aantal seconde per beurt:</label>
      <input id="turnTime" class="generalFont spelOpzetNaam centerTextInput" style="color: #688980;" type="number" min="5" step="5" max="600" v-model="turnTime"  v-focus>
      <div v-if="errors.turnTime" class="generalFont error">Vul een getal in tussen de 5 en de 600</div>
      <button class="generalFont spelOpzetNaam transparentButton nextButton" @click="confirmTurnTime()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>
    <div v-else-if="!canStart" class="generalFont spelOpzetBriefjes centerTextInput">
      Wachten tot het spel kan beginnen...
    </div>
    <div v-else-if="isMaster">
      <button class="generalFont spelOpzetNaam centerTextInput" @click="startGame">Start</button>
    </div>
    <div v-else class="generalFont spelOpzetBriefjes centerTextInput">
      Wachten tot het spel begint...
    </div>
  </HomeCube>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import HomeCube from '../components/HomeCube'
import SetupTeams from '../components/SetupTeams'

export default {
  name: 'Setup',
  components: {
    HomeCube,
    SetupTeams,
  },
  data() {
    return {
      playerName: '',
      entriesPerPlayer: 4,
      entry: '',
      firstEntryAdded: false,
      turnTime: 60,

      errors: {
        playerName: false,
        entriesPerPlayer: false,
        entry: false,
        turnTime: false,
      },
    }
  },
  mounted() {
    this.turnTime = this.previousTurnTime || this.turnTime
  },
  computed: {
    ...mapState({
      nrEntries: state => state.game.entries.length,
      ofTotalEntries: state => state.game.entriesPerPlayer,
      teamsConfirmed: state => state.game.teamsConfirmed,
      previousTurnTime: state => state.game.previousTurnTime,
      gameStarted: state => state.game.isStarted,
    }),
    ...mapGetters([
      'isMaster',
      'shareableLink',
      'playerNameSet',
      'entriesPerPlayerSet',
      'enoughEntries',
      'turnTimeSet',
      'canStart',
     ])
  },
  methods: {
    confirmPlayerName() {
      if (this.playerName.length >= 2) {
        this.setPlayerName(this.playerName)
        this.errors.playerName = false
      } else {
        this.errors.playerName = true
      }
    },
    confirmEntriesPerPlayer() {
      let entriesPerPlayer = parseInt(this.entriesPerPlayer)
      if (entriesPerPlayer > 0 && entriesPerPlayer <= 9) {
        this.setEntriesPerPlayer(entriesPerPlayer)
        this.errors.entriesPerPlayer = false
      } else {
        this.errors.entriesPerPlayer = true
      }
    },
    confirmTurnTime() {
      let turnTime = parseInt(this.turnTime)
      if (turnTime > 0 && turnTime <= 600) {
        this.setTurnTime(this.turnTime)
        this.errors.turnTime = false
      } else {
        this.errors.turnTime = true
      }
    },
    confirmEntry() {
      if (this.entry.length > 0) {
        this.addEntry(this.entry)
        this.entry = ''
        this.firstEntryAdded = true
        this.errors.entry = false
      } else {
        this.errors.entry = true
      }
    },
    ...mapActions([
      'setPlayerName',
      'setEntriesPerPlayer',
      'startGame',
      'addEntry',
      'setTurnTime',
     ])
  },
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
.error {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: red;
}
</style>
