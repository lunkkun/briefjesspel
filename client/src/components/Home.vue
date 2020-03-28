<template>
  <div>
    <Create v-if="creating"></Create>
    <button v-else @click="creating = true">Start nieuw spel</button>
  </div>
</template>

<script>
import Create from './Create'

export default {
  name: 'Home',
  components: {
    Create,
  },
  data() {
    return {
      creating: false,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
