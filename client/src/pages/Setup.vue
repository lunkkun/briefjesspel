<template>
  <HomeCube>
    <div v-if="!gameStarted && shareableLink && isMaster">
      <div class="generalFont spelLink linkBox" :class="linkClasses" @click="copyLink()">
        <FontAwesomeIcon :icon="clipboard" style="margin: 0 2%;"> </FontAwesomeIcon> {{ shareableLink }}
      </div>
    </div>

<!-- Spel link -->
    <div v-if="!linkInfoRead && isMaster" @keydown.enter="confirmLinkInfoRead()">
      <div class="generalFont tinyFont linkDescription">stuur bovenstaande link naar je medespelers</div>
      <NextButton @click="confirmLinkInfoRead()" v-focus></NextButton>
    </div>

<!-- Naam -->
    <div v-else-if="!playerNameSet" @keydown.enter="confirmPlayerName()">
      <div class="fade-in">
        <label class="generalFont mediumFont labelPosition" for="playerName">Vul je naam in:</label>
        <input id="playerName" class="generalFont mediumFont centerTextVH" style="color: #688980;" type="text"
               autocomplete="off" maxlength="30" :value="playerName" @input="updatePlayerName" v-focus>
      </div>
      <div v-if="errors.playerName" class="generalFont tinyFont error">Minimaal twee letters...</div>
      <NextButton @click="confirmPlayerName()"></NextButton>
    </div>

<!-- Briefjes pp -->
    <div v-else-if="!entriesPerPlayerSet && isMaster" @keydown.enter="confirmEntriesPerPlayer()">
      <label class="generalFont mediumFont labelPosition" for="entriesPerPlayer">Aantal briefjes per speler:</label>
      <input id="entriesPerPlayer" class="generalFont mediumFont centerTextVH" style="color: #688980;" type="number"
             min="1" max="9" autocomplete="off" :value="entriesPerPlayer" @input.number="updateEntriesPerPlayer" v-focus v-select>
      <div v-if="errors.entriesPerPlayer" class="generalFont tinyFont error">Vul een getal in tussen de 1 en de 9</div>
      <NextButton @click="confirmEntriesPerPlayer()"></NextButton>
    </div>

<!-- Briefjes invullen -->
    <div v-else-if="!enoughEntries" @keydown.enter="confirmEntry()">
      <label class="generalFont mediumFont labelPosition" for="entry">
        Vul <span v-if="firstEntryAdded">nog </span>een briefje in ({{ nrEntries + 1 }}/{{ ofTotalEntries }}):
      </label>
      <input id="entry" class="generalFont mediumFont centerTextVH" style="color: #688980;" type="text"
             autocomplete="off" v-model="entry" v-focus>
      <div v-if="errors.entry" class="generalFont tinyFont error">Het briefje is leeg...</div>
      <NextButton @click="confirmEntry()"></NextButton>
    </div>

<!-- Team setup -->
    <SetupTeams v-else-if="!teamsConfirmed && isMaster"></SetupTeams>

<!-- Turn time -->
    <div v-else-if="!turnTimeSet && isMaster" @keydown.enter="confirmTurnTime()">
      <label class="generalFont mediumFont labelPosition" for="turnTime">Aantal seconden per beurt:</label>
      <input id="turnTime" class="generalFont mediumFont centerTextVH" style="color: #688980;" type="number"
             min="5" max="300" step="5" maxlength="3" autocomplete="off" :value="turnTime" @input.number="updateTurnTime"
             v-focus v-select>
      <div v-if="errors.turnTime" class="generalFont tinyFont error">Vul een getal in tussen de 5 en de 300</div>
      <NextButton @click="confirmTurnTime()"></NextButton>
    </div>

    <div v-else-if="!canStart" class="generalFont mediumFont centerBlock">
      Wachten tot het spel kan beginnen...
    </div>

    <div v-else-if="isMaster">
      <button class="generalFont biggerFont centerBlock transparentButton" @click="startGame()">Start</button>
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
import NextButton from '../components/NextButton'
import scaleElement from '../lib/scale-element'

export default {
  name: 'Setup',
  components: {
    HomeCube,
    SetupTeams,
    NextButton,
  },
  data() {
    return {
      linkInfoRead: false,
      playerName: '',
      entriesPerPlayer: 4,
      entry: '',
      firstEntryAdded: false,
      turnTime: 60,
      linkCopied: false,

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
    clipboard() {
      return this.linkCopied ? 'clipboard-check' : 'clipboard'
    },
    linkClasses() {
      if (!this.linkInfoRead) {
        return ['smallFont', 'linkBoxBig']
      } else {
        return ['tinyFont', 'linkBoxSmall']
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
    updatePlayerName() {
      this.playerName = event.target.value
      scaleElement(event.target, event.target.value, 'generalFont', 'mediumFont', 'smallFont', 'tinyFont', 'microFont')
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
        .then(() => {
          this.linkCopied = true
          setTimeout(() => {
            this.linkCopied = false
          }, 500)
        })
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
  z-index: 25
}
.linkBoxBig {
  top: 37%;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  padding: 3%;
  font-weight: lighter;
}
.linkBoxSmall {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  padding: 1%;
  font-weight: lighter;
  animation: shrink 0.5s cubic-bezier(.24,.99,.59,1);
}
@keyframes shrink {
  from {
    top: 37%;
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
    padding: 3%;
    font-size: 4.9vmin;
  }
  to{
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 98%;
    padding: 1%;
    font-size: 3.75vmin;
  }
}
@media screen and (min-width: 613px) and (min-height: 613px) {
  @keyframes shrink {
    from {
      top: 37%;
      left: 50%;
      transform: translateX(-50%);
      width: 94%;
      padding: 3%;
      font-size: 30px;
    }
    to {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 98%;
      padding: 1%;
      font-size: 23px;
    }
  }
}

.fade-in {
  opacity: 1.0;
  animation: fade-in 1s ease-out;
}
@keyframes fade-in {
  from {
    opacity: 0.0;
  }
  to {
    opacity: 1.0;
  }
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
.centerTextVH {
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
