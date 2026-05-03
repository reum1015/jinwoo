<script setup></script>
<template>
  <q-layout>
    <!-- this is where the Pages are injected -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <div class="row">
      <div class="md-6"><img src="~assets/imgs/background/bg_01.jpg" /></div>
      <div class="md-6"><img src="~assets/imgs/background/bg_02.jpg" /></div>
    </div>
  </q-layout>
</template>

<style scoped>
img{
  width: 100%;
}


</style>
