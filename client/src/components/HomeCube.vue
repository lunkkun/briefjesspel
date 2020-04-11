<template>
  <div>
    <div class="wrapHomeCube" :class="toggleHomeCube">
      <div class="homeCubeDropShadow"></div>
      <div class="homeCube">
        <div class="homeCubePadding">
          <slot></slot>
        </div>
      </div>
    </div>
    <!--
    Divs om style te checken
    <div class="bowl" :class="paperContainer"></div>
    <div class="bowlShadow" :class="paperContainerShadow"></div>
    -->
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
  width: 70vmin;
  height: 70vmin;
  max-height: 430px;
  max-width: 430px;
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

.hideHomeCube {
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

.unhideHomeCube {
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

/* bowl + bowlShadow uitproberen, moet eigenlijk in MyTurn.vue */
.hat {
  display: block;
  background: url("hoed.png");
  background-size: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vmin;
  height: 90vmin;
  z-index: 11;
}
.hatShadow {
  display: block;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vmin;
  height: 75vmin;
  border-radius: 50%;
  box-shadow: 0 0 3vmin 5vmin rgba(0,0,0,0.5);
  z-index: 10;
}

.bowl {
  display: block;
  background: url("schaal.png");
  background-size: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110vmin;
  height: 110vmin;
  z-index: 11;
}
.bowlShadow {
  display: block;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vmin;
  height: 75vmin;
  border-radius: 50%;
  box-shadow: 0 0 3vmin 5vmin rgba(0,0,0,0.5);
  z-index: 10;
}

/* colander style nog aanpassen 
.colander {
  display: block;
  background: url("vergiet.png");
  background-size: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vmin;
  height: 90vmin;
  z-index: 11;
}
.colanderShadow {
  display: block;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vmin;
  height: 75vmin;
  border-radius: 50%;
  box-shadow: 0 0 3vmin 5vmin rgba(0,0,0,0.5);
  z-index: 10;
} */

@media screen and (min-width: 613px) and (min-height: 613px) {
  .hat {
    width: 550px;
    height: 550px;
  }
  .hatShadow {
    width: 460px;
    height: 460px;
    box-shadow: 0 0 18px 30px rgba(0,0,0,0.5);
  }
  
  .bowl {
    width: 680px;
    height: 680px;
  }
  .bowlShadow {
    width: 460px;
    height: 460px;
    box-shadow: 0 0 18px 30px rgba(0,0,0,0.5);
  }
  
  .colander {
    width: 550px;
    height: 550px;
  }
  .colanderShadow {
    width: 460px;
    height: 460px;
    box-shadow: 0 0 18px 30px rgba(0,0,0,0.5);
  }

}
</style>
