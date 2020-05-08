<template>
  <div>
    <div class="generalFont centerBlock">
      <div v-if="page === 1" class="mediumFont">
        Met deze app kun je, in combinatie met een video groepsgesprek, het briefjesspel online spelen!
      </div>
      <div v-if="page === 2" class="smallFont">
        Als je met jouw vriendengroep het briefjesspel wil spelen, zorg dan zelf voor een video groepsgesprek.
        Het handigst is om de briefjesspel app op je mobiel te openen.<br>
        Eén persoon - de spelleider - start een nieuw spel en krijgt een link die hij met de anderen kan delen.
        Met die link kunnen ze zich aanmelden in het spel. De link is 3 uur geldig.
        Als het spel is gestart kan er niemand meer worden toegevoegd.
      </div>
      <div v-if="page === 3" class="smallFont">
        Voor als je het briefjesspel nog niet kent, hier kort de regels:<br>
        Iedereen vult een aantal "briefjes" in met namen van bekende personen.
        Vervolgens vorm je teams en kan het spel starten.<br>
        Als je aan de beurt bent trek je een briefje en probeer je aan je teamgenoten te omschrijven welke persoon op je briefje staat.
        Je mag hierbij geen namen gebruiken.
      </div>
      <div v-if="page === 4" class="smallFont">
        Als je teamgenoten het goed hebben geraden scoren jullie een punt en trek je een volgende briefje, zo door todat je tijd om is.
        Dan is iemand van een ander team aan de beurt. De ronde eindigt als alle briefjes op zijn.<br>
        Het is leuk om hierna nog meer rondes te spelen met dezelfde briefjes.
        Bijvoorbeeld een ronde uitbeelden en een (kortere) ronde waarin je maar één woord mag zeggen per briefje.
      </div>
      <div v-if="page === 5" class="smediumFont">
        Natuurlijk kunnen jullie als groep zelf volledig de regels bepalen!
        Als je andere rondes wil spelen of deze app zelfs voor een heel ander spel wil gebruiken (zoals hints) voel je vrij!<br>
        Klik rechtsboven om verder te gaan. Veel plezier!<br>
      </div>
    </div>
    <PreviousButton v-if="page > 1" @click="page--"></PreviousButton>
    <NextButton v-if="page < 5" @click="page++"></NextButton>
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

</style>
