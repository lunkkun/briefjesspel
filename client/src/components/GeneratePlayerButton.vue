<template>
  <div @click="generatePlayer">
    <div class="generatePlayerButton textFont smallFont" style="text-shadow: 0 0 1vmin #688980;">
      &#8853;
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'GeneratePlayerButton',
  methods: mapMutations([
    'generatePlayer',
  ]),
}
</script>

<style lang="scss" scoped>
.generatePlayerButton {
  display: block;
  position: fixed;
  top: 1vmin;
  left: 50%;
  cursor: pointer;
  z-index: 30;
}
</style>
