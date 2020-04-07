<template>
  <div @click="requestToLeave">
    <div class="leaveButton">&times;</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'LeaveButton',
  methods: mapMutations([
    'requestToLeave',
  ]),
}
</script>

<style lang="scss" scoped>
.leaveButton {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
