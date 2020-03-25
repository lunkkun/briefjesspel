<template>
  <div>
    Komt binnenkort!
  </div>
</template>

<script>
export default {
  name: 'Game',
  created() {
    this.$store.dispatch('sendMessage', 'Hello World!')
  },
}
</script>

<style scoped>

</style>
