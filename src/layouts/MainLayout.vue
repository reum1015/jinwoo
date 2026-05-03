<template>
  <q-layout view="lHh Lpr lFf" class="main_layout">

    <HeaderNavBar></HeaderNavBar>
<!--    <q-page-container>-->
<!--      <router-view />-->
<!--    </q-page-container>-->
  </q-layout>
</template>

<script setup>
import HeaderNavBar from 'layouts/HeaderNavBar.vue'
</script>
<style lang="scss">
.main_layout{
  background-image: url('/bg_05.jpg');
  background-size: cover;}

</style>
