<template>
  <div v-if="isMaster">
    <div v-if="!turnTimeSet">
      <Setup></Setup>
    </div>
    <div v-else>
      <div>
        <button class="centerBlock generalFont bigFont transparentButton" @click="startRound">Start ronde</button>
      </div>
    </div>
  </div>
  <div v-else class="generalFont">
      Wachten tot de ronde start...
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Setup from '../Setup'

export default {
  name: 'RoundSetup',
  components: {
    Setup,
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
