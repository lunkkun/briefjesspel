<template>
  <div @click="requestToLeave">
    <div class="leaveButton textFont smallFont">
      &#8855;
    </div>
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
  top: 1vmin;
  left: 1vmin;
  cursor: pointer;
  text-shadow: 0 0 1vmin #688980;
  z-index: 30;
}
</style>
