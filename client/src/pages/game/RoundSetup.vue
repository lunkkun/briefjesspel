<template>
  <div v-if="isMaster">
    <div v-if="!turnTimeSet">
      <Setup></Setup>
    </div>
    <div v-else>
      <div>
        <button class="centerBlock generalFont bigFont transparentButton" @click="startRound">Start ronde</button>
        <NextButton @click="startRound"></NextButton>
      </div>
    </div>
  </div>
  <div v-else class="generalFont mediumFont centerBlock">
      Wachten tot de ronde start...
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Setup from '../Setup'
import NextButton from '../../components/NextButton'

export default {
  name: 'RoundSetup',
  components: {
    Setup,
    NextButton,
  },
  computed: mapGetters([
    'turnTimeSet',
    'isMaster',
  ]),
  methods: mapActions([
    'startRound',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
