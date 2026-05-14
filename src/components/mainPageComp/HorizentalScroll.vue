<template>
  <!-- 전체 페이지 스크롤 여유 공간 -->
  <div style="height: 50vh; background: #eee; display: flex; align-items: center; justify-content: center;">
    <h2>스크롤을 내려 가로 섹션으로 이동하세요 ↓</h2>
  </div>

  <!-- 가로 스크롤이 시작될 섹션 -->

  <div style="display: block; margin-top: 500px">
    <section ref="mainContainer" class="horizontal-section" s>
      <div class="container">
        <div class="boxs a text-center">a</div>
        <div class="boxs b flex flex-center">b</div>
        <div class="boxs c flex flex-center">c</div>
        <div class="boxs d flex flex-center bg-amber-4">d</div>
        <div class="boxs e flex flex-center bg-green-6">e</div>
        <div class="boxs f flex flex-center bg-blue-5">f</div>
        <div class="boxs g flex flex-center bg-grey-6">g</div>
        <div class="boxs h flex flex-center bg-pink-4">h</div>
        <div class="boxs i flex flex-center bg-purple-7">i</div>
        <div class="boxs j flex flex-center bg-indigo-5">j</div>
      </div>
    </section>
  </div>
  <!-- 하단 여유 공간 -->
  <div style="height: 100vh; background: #eee;"></div>


</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainContainer = ref(null)

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {

    const sections = gsap.utils.toArray('.boxs');


    const horizontalTween = gsap.to('.container', {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: mainContainer.value, // 클래스명 대신 ref.value 사용
        start: "top 80px", // 이 값을 유지하되, 아래 'Margin'을 확인해보세요.
        pin: true,
        scrub: 1,
        markers: true,
        end: () => `+=${sections.length * 1000}`, // 섹션 개수에 비례해 스크롤 길이 설정
        invalidateOnRefresh: true,
      }
    })

    // 2. 가로 이동 중 개별 박스 애니메이션 (containerAnimation 활용)
    sections.forEach((box) => {
      gsap.to(box, {

        scrollTrigger: {
          trigger: box,
          containerAnimation: horizontalTween, // 가로 스크롤과 연동
          start: "left center",                // 박스 왼쪽이 화면 중앙에 올 때
          toggleActions: "play reverse play reverse",
        },
      });
    });


  }, mainContainer.value);

  // 이미지나 레이아웃이 완전히 로드된 후 위치 재계산
  window.addEventListener("load", () => ScrollTrigger.refresh());
  // 모든 계산이 끝난 후 다시 한 번 위치 측정
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);


})

onUnmounted(() => {
  if (ctx) ctx.revert();
});

</script>

<style lang="scss" scoped>
.horizontal-section {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 가로 스크롤바 숨김 */
  position: relative;
  display: block; /* 부모가 flex일 경우를 대비해 명시 */
}

.container {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  width: max-content;
}

.boxs {
  width: 100vw; /* 각 박스는 화면 너비 가득 차지 */
  height: 80vh;
  flex-shrink: 0; /* 크기 줄어듦 방지 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: white;
  font-weight: bold;
}

.a {
  background-color: #5271ff;
}

.b {
  background-color: #f2c037;
}

.c {
  background-color: coral;
}


.container {
  display: flex; /* 자식들을 가로로 나열 */
  flex-wrap: nowrap; /* 줄바꿈 금지 (일직선 유지) */
  width: 1600%; /* 섹션이 3개라면 300% */
  height: 100vh; /* 높이는 화면 가득 */
}

</style>
