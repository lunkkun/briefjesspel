<template>
  <div v-if="isMaster">
    <div v-if="!turnTimeSet">
      <Setup></Setup>
    </div>
    <div v-else>
      <div class="centerBlock" @click="startRound">
        <div class="headerFont bigFont transparentButton noSelect">Start ronde</div>
      </div>
      <NextButton @click="startRound"></NextButton>
    </div>
  </div>
  <div v-else class="centerBlock">
    <div class="textFont mediumFont">
      Wachten tot de ronde start...
    </div>
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
