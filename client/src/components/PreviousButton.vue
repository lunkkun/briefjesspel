<template>
  <button class="transparentButton" @click="$emit('click')">
    <div class="previousCorner"></div>
    <div class="previousCornerTopRight"></div>
    <div class="previousCornerBig"></div>
  </button>
</template>

<script>
export default {
  name: 'PreviousButton',
}
</script>

<style lang="scss" scoped>

.previousCorner{
  display: block;
  position: absolute;
  bottom: -5vmin;
  left: -5vmin;
  width: 6.5vmin;
  height: 6.5vmin;
  background-color: #344558;
  box-shadow: 0.4vmin -0.4vmin 0.2vmin rgba(52,69,88,0.6);
  z-index: 21;
}
.previousCornerTopRight {
  display: block;
  position: absolute;
  bottom: -5vmin;
  left: -5vmin;
  width: 0;
  height: 0;
  border-right: 6.6vmin solid #F8DC8D;
  border-bottom: 6.6vmin solid transparent;
  z-index: 22;
  cursor: pointer;
}
.previousCornerBig{
  display: block;
  position: absolute;
  bottom: -7.5vmin;
  left: -7.5vmin;
  width: 13vmin;
  height: 13vmin;
  background: transparent;
  z-index: 20;
}

@media screen and (min-width: 613px) and (min-height: 613px) {
  .previousCorner {
    width: 40px;
    height: 40px;
    box-shadow: 2px -2px 1px rgba(52,69,88,0.6);
    bottom: -30px;
    left: -30px;
  }
  .previousCornerTopRight {
    bottom: -30px;
    left: -30px;
    border-right: 40px solid #F8DC8D;
    border-bottom: 40px solid transparent;
  }
  .previousCornerBig {
    width: 80px;
    height: 80px;
    bottom: -45px;
    left: -45px;
  }
}
</style>
