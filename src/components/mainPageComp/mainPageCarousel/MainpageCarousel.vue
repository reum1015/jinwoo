<template>
  <q-carousel
    animated
    v-model="slide"
    :autoplay="7000"
    :transition-duration="1500"
    navigation
    navigation-icon="gps_not_fixed"
    navigation-active-icon="gps_fixed"
    infinite
    height="100vh"
    class=""
  >
    <q-carousel-slide :name="1" img-src="~assets/imgs/carousel/bg_01.jpg">
      <CarouselTextEffect01></CarouselTextEffect01>
    </q-carousel-slide>
    <q-carousel-slide :name="2" img-src="~assets/imgs/carousel/bg_02.jpg" />
    <q-carousel-slide :name="3" img-src="~assets/imgs/carousel/bg_03.jpg" />
    <q-carousel-slide :name="4" img-src="~assets/imgs/carousel/bg_04.jpg" />
  </q-carousel>
</template>

<script setup>
import CarouselTextEffect01 from "./CarouselTextEffect01.vue";

import {ref} from 'vue'

const slide = ref(1)
</script>

<style lang="scss" scoped>

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
