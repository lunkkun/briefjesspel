<template>
  <div>
    <Setup v-if="showSetup"></Setup>
    <button v-else @click="showSetup = true">Start nieuw spel</button>
  </div>
</template>

<script>
import Setup from './Setup'

export default {
  name: 'Home',
  components: {
    Setup
  },
  data() {
    return {
      showSetup: false,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
