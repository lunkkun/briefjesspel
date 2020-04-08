<template>
  <div v-if="isMaster">
    <div v-if="!turnTimeSet">
      <Setup></Setup>
    </div>
    <div v-else>
      <HomeCube>
        <button class="centerBlock generalFont transparentButton startRoundButton" @click="startRound">Start ronde</button>
      </HomeCube>
    </div>
  </div>
  <div v-else class="generalFont">
    <HomeCube>
      Wachten tot de ronde start...
    </HomeCube>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Setup from '../Setup'
import HomeCube from '../../components/HomeCube'

export default {
  name: 'RoundSetup',
  components: {
    Setup,
    HomeCube,
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
.startRoundButton {
  font-size: 12vmin;
  font-weight: bold;
  color: #344558;
}
</style>
