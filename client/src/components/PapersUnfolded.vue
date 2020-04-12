<template>
  <div>
    <div class="papersUnfolded" :class="quantityClass"></div>
  </div>
</template>

<script>
export default {
  name: 'PapersUnfolded',
  computed: {
    quantityClass() {
      return 'paperUnfolded' + '1' // TODO: depending on quantity remaining
    },
  },
}
</script>

<style lang="scss" scoped>

.papersUnfolded {
  display: block;
  background: url("~@/assets/img/paperUnfolded1.png");
  background-size: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65vmin;
  height: 65vmin;
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .papersUnfolded {
    width: 400px;
    height: 400px
  }
}
</style>
