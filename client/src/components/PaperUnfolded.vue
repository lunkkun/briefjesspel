<template>
  <div>
    <div class="paperUnfolded" :style="{background: `url('~@/assets/img/paperUnfolded${hierDanEenOfAndereVariabele}.png')`}"></div>
  </div>
</template>

<script>
export default {
  name: 'PaperUnfolded',
  computed: {
    quantityClass() {
      return 'paperUnfolded' + '1' // TODO: depending on quantity remaining
    },
  },
}
</script>

<style lang="scss" scoped>

.paperUnfolded {
  display: block;
  background: url("~@/assets/img/paperUnfolded1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98vmin;
  height: 98vmin;
}

@media screen and (min-width: 613px) and (min-height: 613px) {

  .paperUnfolded {
    width: 600px;
    height: 420px;
  }
}
</style>
