<template>
  <div>
    <div class="generalFont mediumFont centerBlock">
      <div v-if="page === 1">
        Met deze app kun je, in combinatie met een video groepsgesprek, het briefjesspel online spelen!
      </div>
      <div v-if="page === 2">
        Hier volgt nog meer uitleg.
      </div>
    </div>
    <PreviousButton v-if="page > 1" @click="page--"></PreviousButton>
    <NextButton v-if="page < 2" @click="page++"></NextButton>
  </div>
</template>

<script>
import HomeCube from '../components/HomeCube'
import NextButton from '../components/NextButton'
import PreviousButton from '../components/PreviousButton'

export default {
  name: 'Help',
  data: () => ({
    page: 1,
  }),
  components: {
    HomeCube,
    NextButton,
    PreviousButton,
  },
}
</script>

<style lang="scss" scoped>

</style>
