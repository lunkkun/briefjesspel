<template>
  <div>
    <button @click="newGame">Start nieuw spel</button>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: 'Setup',
  methods: mapActions([
    'newGame',
  ]),
}
</script>

<style lang="scss" scoped>

</style>
