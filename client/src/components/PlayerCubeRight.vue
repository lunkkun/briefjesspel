<template>
  <div class="wrapPlayerCubeRight" :class="{wrapPlayerCubeRightActive: isActive}">
    <div class="playerCubeRightDropShadow"></div>
    <div class="playerCubeRight generalFont smediumFont" :class="{playerCubeRightActive: isActive}">
      <div class="centerText">
        {{ shortName }}
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCube from '../mixins/PlayerCube'

export default {
  name: 'PlayerCubeRight',
  mixins: [PlayerCube],
}
</script>

<style lang="scss" scoped>

.centerText {
  display: block;
  background: transparent;
  position: absolute;
  top: 55%;
  left: 52%;
  transform: translate(-50%, -50%);
  user-select: none;
}
.playerCubeRight {
  display: block;
  background-color: #F6D370;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 9.5vmin;
  height: 9.5vmin;
  box-shadow: -0.1vmin -0.1vmin 0.5vmin rgba(0,0,0,0.2);
  font-weight: bold;
  overflow: hidden;
  z-index: 20;
}
.playerCubeRightDropShadow {
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
  right: 50%;
  width: 13.5vmin;
  height: 40vmin;
  transform: translateX(50%) rotate(-45deg);
  transform-origin: center top;
  z-index: 19;
}
.wrapPlayerCubeRight {
  display: block;
  background-color: transparent;
  position: relative;
  top: 0;
  right: 0;
  width: 12vmin;
  height: 12vmin;
  transform: translate(0, 0);
  transition: transform 0.3s;
}
.playerCubeRightActive {
  background-color: #E9A14F;
}

.playerCubeRight-enter-active {
  transform: translate(0, 0);
  animation: unhidePlayerCubeRight 0.6s cubic-bezier(.44,.06,.19,1.32)
}
@keyframes unhidePlayerCubeRight {
  0%    {transform: translate(150%, 150%);}
  100%  {transform: translate(0, 0);}
}
.playerCubeRight-leave-active {
  transform: translate(150%, 150%);
  animation: hidePlayerCubeRight 0.6s cubic-bezier(.85,-0.2,.56,.91);
}
@keyframes hidePlayerCubeRight {
  0%    {transform: translate(0, 0);}
  100%  {transform: translate(150%, 150%);}
}

@media screen and (min-width: 613px) and (min-height: 613px) {
  .playerCubeRight {
    width: 58px;
    height: 58px;
  }
  .playerCubeRightDropShadow {
    width: 82px;
    height: 300px;
  }
  .wrapPlayerCubeRight {
    width: 73.2px;
    height: 73.2px;
  }
}
</style>
