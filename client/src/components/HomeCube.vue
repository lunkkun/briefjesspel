<template>
  <div>
    <div class="wrapHomeCube">
      <div class="homeCubeDropShadow"></div>
      <div class="homeCube">
        <slot></slot>
      </div>
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
  background-color: #F6D370;
  position: absolute;
  top: 0;
  left: 0;
  width: 75vmin;
  height: 75vmin;
  max-width: 460px;
  max-height: 460px;
  z-index: 20;
}
.homeCubeDropShadow {
  display: block;
  background-color: #344558;
  background-image: linear-gradient(-155deg, #344558, #688980);
  position: absolute;
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
.wrapHomeCube {
    display: block;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 75vmin;
    height: 75vmin;
    max-width: 460px;
    max-height: 460px;
    transform: translate(-50%, -50%);
    transition: transform 1s;
}
/* animatie om HomeCube te laten verdwijnen */
/* .wrapHomeCube:active {
    transform: translate(200%, 200%);
} */
</style>
