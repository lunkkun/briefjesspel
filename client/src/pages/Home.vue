<template>
  <button class="transparentButton" @click="newGame">
    <HomeCube>
      <div class="centerHome generalFont nieuwSpel" >NIEUW SPEL</div>
    </HomeCube>
  </button>
</template>

<script>
import {mapActions} from 'vuex'
import HomeCube from '../components/HomeCube'

export default {
  name: 'Home',
  components: {
    HomeCube,
  },
  methods: mapActions([
    'newGame',
  ]),
}
</script>

<style lang="scss" scoped>

.nieuwSpel {
  font-size: 12vmin;
  font-weight: bold;
  background-color: #344558;
  color: transparent;
  text-shadow: 0.4vmin 0.4vmin 0.2vmin #FFF2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
/* -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
/*  -moz-animation: fadein 1s; /* Firefox < 16 */
/* -ms-animation: fadein 1s; /* Internet Explorer */
/*  -o-animation: fadein 1s; /* Opera < 12.1 */
/*  animation: fadein 1s; */
}
/*
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
} */
@media screen and (min-width: 613px) and (min-height: 613px){
  .nieuwSpel {
    font-size: 74px;
    text-shadow: 4px 4px 2px #FFF2;
  }
}
</style>
