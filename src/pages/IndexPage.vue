<template>
  <q-page>
    <q-carousel
      animated
      v-model="slide"
      autoplay
      navigation
      infinite
      height="100vh"
      class="absolute-full jinwoo-carousel"
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
    <div class="box">1</div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'

const slide = ref(1)
</script>

<style scoped lang="scss">
.box {
  background-color: red;
  height: 10000px;
}

.jinwoo-carousel {
  /* 하단 버튼(점)들의 기본 동그란 모양을 제거하고 네모로 변경 */
  .q-carousel__navigation-inner .q-btn {
    border-radius: 0; /* 둥근 테두리 제거 */
    padding: 4px 12px; /* 납작한 네모를 위한 패딩 조절 */
    min-height: 4px; /* 높이 조절 */

    .q-icon {
      display: none; /* 기존 동그라미 아이콘 숨기기 */
    }

    /* 실제 네모 모양을 배경색으로 구현 */
    background: rgba(255, 255, 255, 0.5);
    margin: 0 4px;

    &.q-btn--active {
      background: white; /* 활성화 시 색상 */
      width: 40px; /* 활성화 시 더 길어지는 효과 (선택사항) */
    }
  }
}

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
