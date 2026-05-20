<template>
  <q-page>
    <MainpageCarousel></MainpageCarousel>

    <!-- main section 01-->
    <MainSection01></MainSection01>
    <MainSection02></MainSection02>
    <MainSection03></MainSection03>
    <MainSection04></MainSection04>
  </q-page>
</template>
<script setup>
import MainpageCarousel from '../components/mainPageComp/mainPageCarousel/MainpageCarousel.vue'
import MainSection02 from 'components/mainPageComp/MainSection02.vue'
import MainSection01 from 'components/mainPageComp/MainSection01.vue'
import MainSection03 from 'components/mainPageComp/MainSection03.vue'
import MainSection04 from "components/mainPageComp/MainSection04.vue";
</script>

<style scoped lang="scss"></style>
