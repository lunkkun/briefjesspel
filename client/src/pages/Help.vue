<template>
  <HomeCube>
    <div class="generalFont helpText">
      Dit is een online tool ter ondersteuning om het briefjesspel via Skype te kunnen spelen!
    </div>
  </HomeCube>
</template>

<script>
import HomeCube from '../components/HomeCube'

export default {
  name: 'Help',
  components: {HomeCube},
}
</script>

<style lang="scss" scoped>
.helpText {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  padding: 3%;
  text-align: center;
}
</style>
