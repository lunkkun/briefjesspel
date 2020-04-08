<template>
  <div>
    <div class="wrapPlayerCube">
      <div class="playerCubeDropShadow"></div>
      <div class="playerCube">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCube',
}
</script>

<style lang="scss" scoped>
.playerCube {
  display: block;  
  background-color: #F6D370;
  position: absolute;
  top: 0;
  left: 0;
  width: 15vmin;
  height: 15vmin;
  max-width: 80px;
  max-height: 80px;
  z-index: 20;
}
.playerCubeDropShadow {
  display: block;
  background-color: #344558;
  background-image: linear-gradient(180deg, #344558, #688980);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 21.2vmin;
  max-width: 113.1px;
  height: 50vmax;
  max-height: 1200px;
  transform: translateX(-50%) rotate(135deg);
  transform-origin: center top;
  z-index: 19;
}
.wrapPlayerCube {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 4%;
  width: 15vmin;
  height: 15vmin;
  max-width: 80px;
  max-height: 80px;
  transition: transform 0.5s;
}
.wrapPlayerCube:hover {
  transform: translate( 50%, 50%);
}
</style>
