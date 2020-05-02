<template>
  <div>
    <div v-if="!gameStarted && shareableLink && isMaster">
      <div class="generalFont spelLink linkBox" :class="linkClasses" @click="copyLink()">
        <FontAwesomeIcon :icon="clipboard" style="margin: 0 2%;"> </FontAwesomeIcon> {{ shareableLink }}
      </div>
    </div>

<!-- Spel link -->
    <div v-if="!linkInfoRead && isMaster" @keydown.enter="confirmLinkInfoRead()">
      <div class="generalFont tinyFont linkDescription">stuur bovenstaande link naar je medespelers</div>
      <div class="nextButtonPulse"></div>
      <NextButton @click="confirmLinkInfoRead()" v-focus></NextButton>
    </div>

<!-- Naam -->
    <div v-else-if="!playerNameSet" @keydown.enter="confirmPlayerName()">
      <div class="fadeIn">
        <label class="generalFont mediumFont labelPosition" for="playerName">Vul je naam in:</label>
        <input ref="playerName" id="playerName" class="generalFont mediumFont centerTextVH" style="color: #688980;"
               type="text" autocomplete="off" maxlength="30" v-model="playerName" v-focus>
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
        <!--Vul <span v-if="firstEntryAdded">nog </span>een briefje in ({{ nrEntries + 1 }}/{{ ofTotalEntries }}):-->
        Briefje {{ nrEntries + 1 }} (van de {{ ofTotalEntries }}):
      </label>
      <input id="entry" ref="entry" class="generalFont mediumFont centerTextVH" style="color: #688980;" maxlength="30"
                v-model="entry" v-focus>
      <div v-if="errors.entry" class="generalFont tinyFont error">Het briefje is leeg...</div>
      <NextButton @click="confirmEntry()"></NextButton>
    </div>

<!-- Team setup -->
    <SetupTeams v-else-if="!(teamsComplete && teamsConfirmed) && isMaster"></SetupTeams>

<!-- Turn time -->
    <div v-else-if="!turnTimeSet && isMaster" @keydown.enter="confirmTurnTime()">
      <label class="generalFont mediumFont labelPosition" for="turnTime">Seconden per beurt:</label>
      <input id="turnTime" class="generalFont mediumFont centerTextVH" style="color: #688980;" type="number"
             min="5" max="300" step="5" maxlength="3" autocomplete="off" :value="turnTime" @input.number="updateTurnTime"
             v-focus v-select>
      <div v-if="errors.turnTime" class="generalFont tinyFont error">Vul een getal in tussen de 5 en de 300</div>
      <PreviousButton v-if="!gameStarted" @click="unconfirmTeams()"></PreviousButton>
      <NextButton @click="confirmTurnTime()"></NextButton>
    </div>

    <div v-else-if="!canStart" class="generalFont mediumFont centerBlock">
      Wachten tot het spel kan beginnen...
    </div>

    <div v-else-if="isMaster">
      <button class="generalFont biggerFont centerBlock transparentButton" @click="startGame()">Start het spel</button>
      <PreviousButton @click="unsetTurnTime()"></PreviousButton>
      <NextButton @click="startGame()"></NextButton>
    </div>

    <div v-else class="generalFont mediumFont centerBlock">
      Wachten tot het spel begint...
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import SetupTeams from './SetupTeams'
import NextButton from '../components/NextButton'
import PreviousButton from '../components/PreviousButton'
import {scaleInput, copyToClipboard} from '../lib/helpers'

export default {
  name: 'Setup',
  components: {
    PreviousButton,
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
      'teamsComplete',
      'turnTimeSet',
      'canStart',
     ])
  },
  watch: {
    playerName: function () {
      scaleInput(this.$refs.playerName, 'mediumFont', 'smallFont', 'tinyFont', 'microFont')
    },
    entry: function () {
      scaleInput(this.$refs.entry, 'mediumFont', 'smallFont', 'tinyFont')
    },
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
        this.$refs.entry.focus()
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
      copyToClipboard(this.shareableLink)

      this.linkCopied = true
      setTimeout(() => {
        this.linkCopied = false
      }, 750)
    },
    ...mapMutations([
      'unconfirmTeams',
      'unsetTurnTime',
    ]),
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

.fadeIn {
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

.nextButtonPulse
{
  display: block;
  position: absolute;
  bottom: -5vmin;
  right: -5vmin;
  width: 6.5vmin;
  height: 6.5vmin;
  background-color: #344558;
  box-shadow: -0.4vmin -0.4vmin 0.2vmin rgba(52,69,88,0.6);
  opacity: 0;
  z-index: 22;
  transform-origin: bottom right;
  animation: pulse 2s ease-in infinite;
  animation-delay: 6s;
}
@keyframes pulse
{
  0% {transform: scale(0.8); opacity: 1;}
  100% {transform: scale(1.3); opacity: 0;}
}
@media screen and (min-width: 613px) and (min-height: 613px)
{
  .nextButtonPulse
  {
    width: 40px;
    height: 40px;
    box-shadow: -2px -2px 1px rgba(52,69,88,0.6);
    bottom: -30px;
    right: -30px;
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
