<template>
  <div>
    <div class="generalFont mediumFont centerBlock">
      Met deze app kun je, in combinatie met een video groepsgesprek, het briefjesspel online spelen!
    </div>
    <NextButton @click=""></NextButton>
    <PreviousButton @click=""></PreviousButton>
  </div>
</template>

<script>
import HomeCube from '../components/HomeCube'
import NextButton from '../components/NextButton'
import PreviousButton from '../components/PreviousButton'

export default {
  name: 'Help',
  components: {
    HomeCube,
    NextButton,
    PreviousButton,
    },
</script>

<style lang="scss" scoped>

</style>
