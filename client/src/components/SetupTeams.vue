<template>
  <div>
    <div v-if="!editing">
      <div @keydown.enter="confirmTeamName()">
        <button class="generalFont mediumFont transparentButton teamLabel" @click="confirmTeamName()">Voeg teamnaam toe +</button>
        <input id="teamName" class="generalFont mediumFont teamNameInput" style="color: #688980;" type="text" maxlength="10" autocomplete="off" v-model="teamName" v-focus>
        <div v-if="errors.teamName" class="generalFont tinyFont errorTeamName">Je hebt geen teamnaam ingevuld</div>
        
      </div>
      <div class="teamList">
        <div v-for="team in teams" :key="team.id" class="teamRow">
          <div class="teamPlayer generalFont smallFont">
            {{ team.name }} ({{ playersForTeam(team.id).length }} speler<span v-if="playersForTeam(team.id).length !== 1">s</span>)
          </div>
          <button class="listButton generalFont smallFont transparentButton" @click="removeTeam(team.id)">x</button>          
          <button class="listButton generalFont smallFont transparentButton" @click="editTeam(team.id)">+</button>
        </div>
      </div>
      <div v-if="allPlayersAssigned && allTeamsHaveEnoughPlayers">
        <button class="generalFont bigFont transparentButton nextButton" @click="confirmTeams()">&#187;</button>
      </div>
    </div>
    <div v-else>
      <div class="generalFont mediumFont teamLabel">Team {{ teams[editing].name }}:</div>
      <div class="teamPlayerList">
        <div v-for="player in players" :key="player.id" class="teamItem">
          <div class="generalFont smallFont teamPlayer">
            {{ player.name }}
            <span v-if="player.teamId">({{ teams[player.teamId].name }})</span>
          </div>
          <div v-if="player.teamId === editing" class="listButton">
            <button class="generalFont smallFont transparentButton" style="font-weight: bold;" @click="removePlayerFromTeam({id: player.id, teamId: editing})">x</button>
          </div>
          <div v-else class="listButton">
            <button class="generalFont smallFont transparentButton" @click="addPlayerToTeam({id: player.id, teamId: editing})">+</button>
          </div>          
        </div>
      </div>
      <div>
        <button class="generalFont bigFont transparentButton nextButton" @click="stopEditing()">&#187;</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'SetupTeams',
  components: {
    //
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
      'allPlayersAssigned',
      'allTeamsHaveEnoughPlayers',
    ]),
    players() {
      return [
        ...this.playersForTeam(this.editing),
        ...this.playersNotInTeam(this.editing),
      ]
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
  text-align: center;
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
  text-align: center;
  text-overflow: ellipsis;
}
.teamList {
  display: table;
  background-color: transparent;
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  text-align: left;
  padding: 0;
}
.teamPlayerList {
  display: table;
  background-color: transparent;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  text-align: left;
  padding: 0;
}
.teamRow {
  display: table-row;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 0;
  margin: 0;
}
.teamPlayer {
  display: table-cell;
  width: 70%;
}
.listButton {
  display: table-cell;
  width: 15%;
}
button.nextButton {
  position: absolute;
  transform: rotate(45deg);
  bottom: -5%;
  right: 0;
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
}</style>
