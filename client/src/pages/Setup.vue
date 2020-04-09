<template>
  <HomeCube>
    <div v-if="!gameStarted && shareableLink && isMaster">
      <div class="generalFont spelLink linkBox" :class="linkClasses" @click="copyLink()">
        <FontAwesomeIcon :icon="clipboard" style="margin: 0 2%;"> </FontAwesomeIcon> {{ shareableLink }}
      </div>
    </div>

    <div v-if="!linkInfoRead && isMaster">      
      <div class="generalFont tinyFont linkDescription">stuur bovenstaande link naar je medespelers</div>
      <button class="generalFont bigFont transparentButton nextButton" @click="confirmLinkInfoRead()">&#187;</button>
    </div>

    <div v-else-if="!playerNameSet" @keydown.enter="confirmPlayerName()">      
      <label class="generalFont mediumFont labelPosition" for="playerName">Vul je naam in:</label>
      <input id="playerName" class="generalFont mediumFont centerTextInput" value="je naam" style="color: #688980;" type="text"
             autocomplete="off" v-model="playerName" v-focus>
      <div v-if="errors.playerName" class="generalFont tinyFont error">Minimaal twee letters...</div>
      <button class="generalFont bigFont transparentButton nextButton" @click="confirmPlayerName()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>

    <div v-else-if="!entriesPerPlayerSet && isMaster" @keydown.enter="confirmEntriesPerPlayer()">
      <label class="generalFont mediumFont labelPosition" for="entriesPerPlayer">Aantal briefjes per speler:</label>
      <input id="entriesPerPlayer" class="generalFont mediumFont centerTextInput" style="color: #688980;" type="number"
             min="1" max="9" autocomplete="off" :value="entriesPerPlayer" @input.number="updateEntriesPerPlayer" v-focus v-select>
      <div v-if="errors.entriesPerPlayer" class="generalFont tinyFont error">Vul een getal in tussen de 1 en de 9</div>
      <!-- Input number arrows nog hiden. Polle -->
      <button class="generalFont bigFont transparentButton nextButton" @click="confirmEntriesPerPlayer()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>

    <div v-else-if="!enoughEntries" @keydown.enter="confirmEntry()">
      <label class="generalFont mediumFont labelPosition" for="entry">
        Vul <span v-if="firstEntryAdded">nog </span>een briefje in ({{ nrEntries + 1 }}/{{ ofTotalEntries }}):
      </label>
      <input id="entry" class="generalFont mediumFont centerTextInput" style="color: #688980;" type="text"
             autocomplete="off" v-model="entry" v-focus>
      <div v-if="errors.entry" class="generalFont tinyFont error">Het briefje is leeg...</div>
      <button class="generalFont bigFont transparentButton nextButton" @click="confirmEntry()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>

    <SetupTeams v-else-if="!teamsConfirmed && isMaster"></SetupTeams>
    <div v-else-if="!turnTimeSet && isMaster" @keydown.enter="confirmTurnTime()">
      <label class="generalFont mediumFont labelPosition" for="turnTime">Aantal seconden per beurt:</label>
      <input id="turnTime" class="generalFont mediumFont centerTextInput" style="color: #688980;" type="number"
             min="5" max="300" step="5" maxlength="3" autocomplete="off" :value="turnTime" @input.number="updateTurnTime"
             v-focus v-select>
      <div v-if="errors.turnTime" class="generalFont tinyFont error">Vul een getal in tussen de 5 en de 300</div>
      <button class="generalFont bigFont transparentButton nextButton" @click="confirmTurnTime()">&#187;</button>
      <!-- Button mooier maken. Polle -->
    </div>

    <div v-else-if="!canStart" class="generalFont mediumFont centerBlock">
      Wachten tot het spel kan beginnen...
    </div>

    <div v-else-if="isMaster">
      <button class="generalFont bigFont centerBlock transparentButton" @click="startGame()">Start</button>
    </div>

    <div v-else class="generalFont mediumFont centerBlock">
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
      linkInfoRead: false,
      playerName: '',
      entriesPerPlayer: 4,
      entry: '',
      firstEntryAdded: false,
      turnTime: 60,
      clipboard: 'clipboard',

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
    this.linkInfoRead = this.playerNameSet // assume info was read
  },
  computed: {
    linkClasses() {
      if (!this.linkInfoRead) {
        return ['class1', 'class2']
      } else {
        return ['class3', 'class4']
      }
    },
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
    confirmLinkInfoRead() {
      this.linkInfoRead = true
    },
    confirmPlayerName() {
      if (this.playerName.length >= 2) {
        this.setPlayerName(this.playerName)
        this.errors.playerName = false
      } else {
        this.errors.playerName = true
      }
    },
    updateEntriesPerPlayer(event) {
      let value = event.target.value
      if (value.length <= 1) {
        this.entriesPerPlayer = value
      }
      this.$forceUpdate()
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
    confirmEntry() {
      if (this.entry.length > 0) {
        this.addEntry(this.entry)
        this.entry = ''
        this.firstEntryAdded = true
      } else {
        this.errors.entry = true
      }
    },
    updateTurnTime(event) {
      let value = event.target.value
      if (value.length <= 3) {
        this.turnTime = value
      }
      this.$forceUpdate()
    },
    confirmTurnTime() {
      let turnTime = parseInt(this.turnTime)
      if (turnTime > 0 && turnTime <= 300) {
        this.setTurnTime(this.turnTime)
        this.errors.turnTime = false
      } else {
        this.errors.turnTime = true
      }
    },
    copyLink() {
      navigator.clipboard.writeText(this.shareableLink)
        .then(() => {this.clipboard = 'clipboard-check'})
        .catch((err) => console.error(err))
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

.linkBox {
  display: block;
  background-color: #F8DC8D;
  position: absolute;  
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
}
.linkBoxBig {
  top: 37%;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  padding: 3%;
  font-weight: bold;
}
.linkBoxSmall {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  padding: 1%;
}
.linkDescription {
  display: block;
  position: absolute;
  top: 53%;
  width: 100%;
  text-align: center;
  color: grey;
}
.labelPosition {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
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
  text-overflow: ellipsis;
}
button.nextButton {
  position: absolute;
  transform: rotate(45deg);
  bottom: -5%;
  right: 0;
}
.error {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  color: red;
}
</style>
