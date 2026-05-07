<template>
  <!-- q-page에 style-fn 등을 사용하여 패딩을 제거하거나, 직접 absolute 배치 -->
  <q-page class="full-height-carousel">
    <q-carousel
      v-model="slide"
      animated
      infinite
      autoplay
      arrows
      navigation
      height="100vh"
      class="absolute-full"
    >
      <q-carousel-slide :name="1" img-src="/bg_01.jpg" />
      <q-carousel-slide :name="2" img-src="/bg_02.jpg" />
      <q-carousel-slide :name="3" img-src="/bg_03.jpg" />
    </q-carousel>

    <!-- 캐러셀 위에 텍스트 등을 올릴 때 사용하는 레이어 -->
    <div class="absolute-center text-white text-center">
      <div class="text-h2">Welcome</div>
      <div class="text-subtitle1">Awesome Background Carousel</div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'

const slide = ref(1)
</script>

<style scoped>
/* 헤더가 투명할 때 콘텐츠가 위로 올라오도록 강제 설정 */
.full-height-carousel {
  margin-top: -50px; /* 일반적인 q-header의 높이만큼 위로 당김 */
  min-height: 100vh !important;
}

/* 또는 q-page-container의 padding-top을 0으로 만들어도 됩니다. */
:deep(.q-page-container) {
  padding-top: 0 !important;
}
</style>
