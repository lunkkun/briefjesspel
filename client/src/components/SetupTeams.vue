<template>
  <div>
    <div v-if="!editing">
      <div class="generalFont mediumFont teamLabel">Teams:</div>
      <div v-if="errors.teamName" class="generalFont tinyFont errorTeamName">Je hebt geen teamnaam ingevuld</div>
      <div class="tableWrap">
        <div class="teamList">
          <div v-for="team in teams" :key="team.id">
            <button class="generalFont transparentButton teams" style="cursor: pointer;" @click="editTeam(team.id)">
              <div ref="teamNames" class="smallFont">{{ team.name }}</div>
              <div class="microFont" style="color: #688980; float: right">
                {{ playersForTeam(team.id).length }} speler<span v-if="playersForTeam(team.id).length !== 1">s</span>
              </div>
            </button>
            <button class="teamButton generalFont smallFont transparentButton" style="cursor: pointer;" @click="removeTeam(team.id)">&#9587;</button>
          </div>
          <div @keydown.enter="confirmTeamName()">
              <input id="teamName" ref="teamNameInput" class="generalFont smallFont transparentButton teams" style="color: #688980;"
                     type="text" maxlength="30" placeholder="Voeg een team toe..." autocomplete="off" v-model="teamName" v-focus>
              <button class="generalFont smallFont transparentButton teamButton" @click="confirmTeamName()">
                <span style="display: block; transform: rotate(45deg); cursor: pointer;">&#9587;</span>
              </button>
          </div>
        </div>
      </div>
      <div v-if="canConfirmTeams">
        <NextButton @click="confirmTeams()"></NextButton>
      </div>
      <div v-else class="generalFont playersUnassignedNote">
        {{ playersNotInTeam.length }} speler<span v-if="playersNotInTeam.length !== 1">s</span> nog niet ingedeeld...
      </div>
    </div>

    <div v-else>
      <div ref="teamName" :key="editing" class="generalFont mediumFont teamLabel">{{ teams[editing].name }}:</div>
      <div class="tableWrap">
        <div class="teamPlayerList">
          <div v-if="playersForTeam(editing).length">
            <div v-for="player in playersForTeam(editing)" :key="player.id">
              <div class="generalFont smallFont teamPlayer">{{ player.name }}</div>
              <div class="teamPlayerButton">
                <button class="generalFont smallFont transparentButton plusToTimes" style="cursor: pointer;"
                        @click="removePlayerFromTeam({id: player.id, teamId: editing})">&#9587;</button>
              </div>
            </div>
          </div>
          <div v-else class="generalFont teamNote">
            Nog geen spelers toegevoegd
          </div>
        </div>
        <br>
        <div class="teamPlayerList">
          <div v-if="playersNotInTeam.length">
            <div v-for="player in playersNotInTeam" :key="player.id">
              <div class="generalFont smallFont teamPlayer">{{ player.name }}</div>
              <div class="teamPlayerButton">
                <button class="generalFont smallFont transparentButton timesToPlus" style="cursor: pointer;"
                        @click="addPlayerToTeam({id: player.id, teamId: editing})">&#9587;</button>
              </div>
            </div>
          </div>
          <div v-else class="generalFont teamNote">
            Alle spelers zijn ingedeeld
          </div>
        </div>
      </div>
      <div>
        <NextButton @click="stopEditing()"></NextButton>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import NextButton from '../components/NextButton'
import PreviousButton from '../components/PreviousButton'
import {scaleInput, scaleText} from "../lib/helpers/scale-element"

export default {
  name: 'SetupTeams',
  components: {
    NextButton,
    PreviousButton,
  },
  data() {
    return {
      teamName: '',
      editing: null,

      errors: {
        teamName: false,
      },
    }
  },
  computed: {
    ...mapState({
      teams: state => state.game.teams,
    }),
    ...mapGetters([
      'playersForTeam',
      'playersNotInTeam',
      'canConfirmTeams',
    ]),
  },
  watch: {
    teamName() {
      scaleInput(this.$refs.teamNameInput, 'smallFont', 'tinyFont', 'microFont')
    },
    teams() {
      this.$nextTick(this.scaleTeamNames)
    },
    editing() {
      this.$nextTick(this.scaleTeamNames)
    },
  },
  methods: {
    confirmTeamName() {
      if (this.teamName.length > 0) {
        this.addTeam(this.teamName)
        this.teamName = ''
        this.errors.teamName = false
      } else {
        this.errors.teamName = true
      }
    },
    editTeam(teamId) {
      this.editing = teamId
    },
    stopEditing() {
      this.editing = null
    },
    scaleTeamNames() {
      if (this.editing) {
        scaleText(this.$refs.teamName, 'mediumFont', 'smallFont', 'tinyFont', 'microFont')
      } else {
        Object.values(this.$refs.teamNames || {})
          .forEach(el => scaleText(el, 'smallFont', 'tinyFont', 'microFont'))
      }
    },
    ...mapMutations([
      'confirmTeams',
    ]),
    ...mapActions([
      'addTeam',
      'addPlayerToTeam',
      'removePlayerFromTeam',
      'removeTeam',
     ]),
  },
}
</script>

<style lang="scss" scoped>
.teamLabel {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: left;
  z-index: 25;
}
.teamNameInput {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: left;
  text-overflow: ellipsis;
}
.tableWrap {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%);
  height: 60%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.teamList {
  display: table;
  background-color: #F8DC8D;
  width: 95%;
  text-align: left;
  padding: 1vmin;
}
.teams {
  display: table-cell;
  width: 90%;
  text-align: left;
  vertical-align: bottom;
  border-bottom: dotted 1px rgba(104,137,128,0.4);
}
.teamButton {
  display: table-cell;
  width: 10%;
  vertical-align: bottom;
  text-align: center;
  border-bottom: dotted 1px rgba(104,137,128,0.4);
}
.teamPlayerList {
  display: table;
  background-color: #F8DC8D;
  width: 90%;
  text-align: left;
  padding: 1vmin;
}
.teamPlayer {
  display: table-cell;
  width: 95%;
  text-align: left;
  vertical-align: bottom;
  border-bottom: dotted 1px rgba(104,137,128,0.4);
}
.teamPlayerButton {
  display: table-cell;
  width: 5%;
  vertical-align: bottom;
  text-align: center;
  border-bottom: dotted 1px rgba(104,137,128,0.4);
}
.errorTeamName {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  color: red;
}
.teamNote {
  font-style: italic;
}
.playersUnassignedNote {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-style: italic;
}
.timesToPlus {
  animation-name: rotateCW;
  animation-duration: 0.1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes rotateCW {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(45deg);}
}
.plusToTimes {
  animation-name: rotateCCW;
  animation-duration: 0.1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes rotateCCW {
  0% {transform: rotate(45deg);}
  100% {transform: rotate(0deg);}
}
</style>
