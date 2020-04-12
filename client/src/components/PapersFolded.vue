<template>
  <div>
    <div class="papersFolded" :class="quantityClass"></div>
  </div>
</template>

<script>
export default {
  name: 'PapersFolded',
  computed: {
    quantityClass() {
      return 'paperFolded' + '1' // TODO: depending on quantity remaining
    },
  },
}
</script>

<style lang="scss" scoped>

.papersFolded {
  display: block;
  background: url("~@/assets/img/paperFolded8.png");
  background-size: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65vmin;
  height: 65vmin;
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .papers {
    width: 400px;
    height: 400px
  }
}
</style>
