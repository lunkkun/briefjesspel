<template>
  <div>
    <div class="centerBlock">
      <div class="textFont">
        <div v-if="page === 1" class="smediumFont">
          <span class="subheaderFont mediumFont">M</span>et deze app kun je, in combinatie met een video groepsgesprek, het briefjesspel online spelen!
        </div>
        <div v-if="page === 2" class="smallFont">
          <span class="subheaderFont smediumFont">A</span>ls je met jouw vriendengroep het briefjesspel wilt spelen, zorg dan zelf voor een video groepsgesprek.
          Het handigst is om de briefjesspel-app op je smartphone te openen.
        </div>
        <div v-if="page === 3" class="smallFont">
          <span class="subheaderFont smediumFont">E</span>én persoon - de spelleider - start een nieuw spel en krijgt een link om met de overige spelers te delen.
          Met die link kan een ieder zich aanmelden in het spel. De link is 3 uur geldig.
          Als het spel is gestart kan er niemand meer worden toegevoegd.
        </div>
        <div v-if="page === 4" class="smallFont">
          <span class="subheaderFont smediumFont">A</span>ls je het briefjesspel nog niet kent, hier kort de regels:<br><br>
          Iedere speler vult een aantal "briefjes" in met namen van bekende personen.
          Vervolgens vorm je teams en kan het spel starten.
        </div>
        <div v-if="page === 5" class="smallFont">
          <span class="subheaderFont smediumFont">B</span>en je aan de beurt, dan trek je een briefje en probeer je aan je teamgenoten te omschrijven welke persoon er op je briefje staat.
          Je mag hierbij geen namen gebruiken.
        </div>
        <div v-if="page === 6" class="smallFont">
          <span class="subheaderFont smediumFont">A</span>ls je teamgenoten het goed hebben geraden scoren jullie een punt en trek je een volgend briefje, todat je tijd om is.
          Dan is er iemand van een ander team aan de beurt. De ronde eindigt als alle briefjes op zijn.
        </div>
        <div v-if="page === 7" class="smallFont">
          <span class="subheaderFont smediumFont">H</span>et is leuk om hierna nog meer rondes te spelen met dezelfde briefjes.
          Bijvoorbeeld een ronde uitbeelden of een (kortere) ronde waarin je maar één woord mag zeggen per briefje.
        </div>
        <div v-if="page === 8" class="smallFont">
          <span class="subheaderFont smediumFont">N</span>atuurlijk kunnen jullie als groep zelf volledig de regels bepalen!
          Als je andere rondes wilt spelen of deze app zelfs voor een heel ander spel wilt gebruiken (zoals hints) voel je vrij!<br>
          <span class="subheaderFont smediumFont">V</span>eel plezier!<br><br>
        </div>
      </div>
    </div>
    <div class="bottomBlock">
      <div class="textFont microFont">
        Klik rechtsboven om deze info te sluiten.
      </div>
    </div>
    <PreviousButton v-if="page > 1" @click="page--"></PreviousButton>
    <NextButton v-if="page < 8" @click="page++"></NextButton>
  </div>
</template>

<script>
import HomeCube from '../components/HomeCube'
import NextButton from '../components/NextButton'
import PreviousButton from '../components/PreviousButton'

export default {
  name: 'Help',
  data: () => ({
    page: 1,
  }),
  components: {
    HomeCube,
    NextButton,
    PreviousButton,
  },
}
</script>

<style lang="scss" scoped>
.bottomBlock {
  display: block;
  position: absolute;
  bottom: -3%;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
</style>
