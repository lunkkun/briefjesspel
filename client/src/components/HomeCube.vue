<template>
  <div>
    <div class="homeCubeDropShadow"></div>
    <div class="homeCube">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCube',
}
</script>

<style lang="scss" scoped>
.homeCube {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vmin;
  height: 75vmin;
  max-width: 460px;
  max-height: 460px;
  background-color: #F6D370;
  z-index: 20;
}
.homeCubeDropShadow {
  display: block;
  background-color: #344558;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 106.6vmin;
  max-width: 650.5px;
  height: 200vw;
  max-height: 1200px;
  transform: translateX(-50%) rotate(-45deg);
  transform-origin: center top;
  z-index: 19;
}
</style>
