<template>
  <q-page>
    <MainPageCarousel></MainPageCarousel>
    <MainSection01></MainSection01>
    <MainImageZoom></MainImageZoom>
    <MainTextMask></MainTextMask>
    <MainCard></MainCard>
    <MainProductList></MainProductList>
    <MainSlideCard></MainSlideCard>
  </q-page>
</template>
<script setup>
import {onMounted, onUnmounted} from 'vue'
import MainImageZoom from "../components/mainPageComp/MainImageZoom.vue";
import MainPageCarousel from "components/mainPageCarousel/MainPageCarousel.vue";
import MainCard from "components/mainPageComp/MainCard.vue";


import {ScrollTrigger} from 'gsap/ScrollTrigger'
import MainProductList from "components/mainPageComp/MainProductList.vue";
import MainSection01 from "components/mainPageComp/MainSection01.vue";
import MainTextMask from "components/mainPageComp/MainTextMask.vue";
import MainSlideCard from "../components/mainPageComp/MainSlideCard.vue";


// indexPage.vue 의온마운트 부분 변경 추천
onMounted(() => {
  // 이미지가 완전히 로드되고 도큐먼트 배치가 끝나는 시점에 맞추어 넉넉히 실행
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 200) // 200ms에서 400ms 정도로 살짝 여유를 둡니다.
})
onUnmounted(() => {
  // 2. 메인 페이지를 떠나 다른 메뉴(예: 회사 소개, 게시판 등)로 이동할 때
  // 메인 페이지의 모든 스크롤 트리거를 깔끔하게 지워 메모리 누수를 방지합니다.
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped lang="scss"></style>
