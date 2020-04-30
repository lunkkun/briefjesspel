<template>
  <div class="wrapHomeCube">
    <div class="homeCubeDropShadow"></div>
    <div class="homeCube">
      <div class="homeCubePadding">
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
.homeCubePadding {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65vmin;
  height: 65vmin;
  max-height: 400px;
  max-width: 400px;
}
.homeCube {
  display: block;
  background-color: #F6D370;
  position: absolute;
  top: 0;
  left: 0;
  width: 75vmin;
  height: 75vmin;
  max-height: 460px;
  max-width: 460px;
  z-index: 20;
}
.homeCubeDropShadow {
  display: block;
  background-color: #344558;
  background: -webkit-gradient(linear, center top, center bottom, from(#344558), to(#688980));
  background: -webkit-linear-gradient(-155deg, #344558, #688980);
  background: -moz-linear-gradient(-155deg, #344558, #688980);
  background: -o-linear-gradient(-155deg, #344558, #688980);
  background: -ms-linear-gradient(-155deg, #344558, #688980);
  background: linear-gradient(-155deg, #344558, #688980);
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
}

.homeCube-enter-active {
  transform: translate(-50%, -50%);
  animation: unhideHomeCube 0.6s cubic-bezier(.44,.06,.19,1.32)
}
@keyframes unhideHomeCube {
  from {
    transform: translate(150%, 150%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}

.homeCube-leave-active {
  transform: translate(150%, 150%);
  animation: hideHomeCube 0.6s cubic-bezier(.85,-0.2,.56,.91);
}
@keyframes hideHomeCube {
  from {
    transform: translate(-50%, -50%);
  }
  to {
    transform: translate(150%, 150%);
  }
}
</style>
