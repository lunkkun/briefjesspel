<template>
  <div>
    <button v-if="!showSettings" @click="showSettings = true">Start nieuw spel</button>
    <Setup v-else></Setup>
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
      showSettings: false,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
