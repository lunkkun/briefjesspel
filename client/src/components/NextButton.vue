<template>
  <div>
    <div class="nextCorner"></div>
    <div class="nextCornerTopLeft"></div>
  </div>
</template>

<script>
export default {
  name: 'NextButton',
}
</script>

<style lang="scss" scoped>
.nextCorner{
  display: block;
  position: absolute;
  bottom: -2.5vmin;
  right: -2.5vmin;
  width: 6.5vmin;
  height: 6.5vmin;
  max-width: 40px;
  max-height: 40px;
  background-color: #344558;
  box-shadow: -0.4vmin -0.4vmin #344558;
  z-index: 21;
}
.nextCornerTopLeft {
  display: block;
  position: absolute;
  bottom: -2.5vmin;
  right: -2.5vmin;
  width: 0;
  height: 0;
  border-left: 6.6vmin solid #F6D370;;
  border-bottom: 6.6vmin solid transparent;
  z-index: 22;
  cursor: pointer;
}
@media screen and (min-width: 613px) and (min-height: 613px) {
  .nextCornerTopLeft {
    bottom: -15px;
    right: -15px;
    border-left: 40px solid #F6D370;;
    border-bottom: 40px solid transparent;
  }
  .nextCorner {
    box-shadow: -2px -2px #344558;
    bottom: -15px;
    right: -15px;
  }
}
</style>
