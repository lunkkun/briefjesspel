<template>
  <div>
    <div v-if="editing">
      <h4 class="generalFont teamLabel teamName">Spelers {{ teams[editing].name }}:</h4>
      <ul class="teamList">
        <li v-for="player in players" :key="player.id" class="teamItem">
          <div class="generalFont teamItemName">
            {{ player.name }}
            <span v-if="player.teamId">({{ teams[player.teamId].name }})</span>
          </div>
          <div v-if="player.teamId === editing" class="listButton">
            <button class="generalFont transparentButton" @click="removePlayerFromTeam({id: player.id, teamId: editing})">x</button>
          </div>
          <div v-else class="listButton">
            <button class="generalFont transparentButton" @click="addPlayerToTeam({id: player.id, teamId: editing})">+</button>
          </div>
        </li>
      </ul>
      <div>
        <button class="generalFont transparentButton nextButton" @click="stopEditing()">&#187;</button>
      </div>
    </div>
    <div v-else>
      <div>
        <label class="generalFont teamLabel teamName" for="teamName">Voeg team toe:</label>
        <input id="teamName" class="generalFont teamNameInput teamName" style="color: #688980;" type="text" v-model="teamName" v-focus>
        <button class="generalFont transparentButton teamNameButton teamName" @click="confirmAddTeam()">&#187;</button>
      </div>
      <ul class="teamList">
        <li v-for="team in teams" :key="team.id" class="teamItem">
          <div class="generalFont teamItemName">
            {{ team.name }} ({{ playersForTeam(team.id).length }} speler<span v-if="playersForTeam(team.id).length !== 1">s</span>)
          </div>
          <div class="listButton">
            <button class="generalFont transparentButton" @click="removeTeam(team.id)">x</button>
          </div>
          <div class="listButton">
            <button class="generalFont transparentButton" @click="editTeam(team.id)">&#187;</button>
          </div>
        </li>
      </ul>
      <div v-if="allPlayersAssigned && allTeamsHaveEnoughPlayers">
        <button class="generalFont transparentButton nextButton" @click="confirmTeams()">&#187;</button>
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
    confirmAddTeam() {
      this.addTeam(this.teamName)
      this.teamName = ''
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
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  padding: 3%;
  text-align: center;
}
.teamNameInput {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}
.teamList {
  display: block;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  text-align: left;
}
.teamName {
  font-size: 6vmin;
  font-weight: bold;
}
.teamItem {
  display: flex;
}
.teamItemName {

}
.listButton {
  align-self: flex-end;
  margin-left: 0.5rem
}
button.teamNameButton {
  position: absolute;
  top: 32%;
  right: 4%;
}
button.nextButton {
  position: absolute;
  bottom: 2%;
  right: 4%;
  font-size: 10vmin;
  font-weight: bold;
}
</style>
