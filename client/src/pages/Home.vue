<template>
  <HomeCube>
    <button class="centerHome generalFont nieuwSpel transparentButton" @click="newGame">NIEUW SPEL</button>
  </HomeCube>
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

.centerHome {
  display: block;
  background-color: transparent;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
}
.nieuwSpel {
  font-size: 12vmin;
  font-weight: bold;
  color: #344558;
/*  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
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
  }
}
</style>
