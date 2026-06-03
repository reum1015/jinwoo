<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {Draggable} from "gsap/Draggable";
import {InertiaPlugin} from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger,Draggable,InertiaPlugin)

let ctx = null
const scrollSection = ref(null)
const raceTrack = ref(null) // 가로로 길게 늘어날 내부 박스

onMounted(() => {
  ctx = gsap.context(() => {
    // 가로로 이동해야 할 총 거리 계산 (전체 너비 - 브라우저 화면 너비)
    // 혹은 아이템 개수가 고정이라면 xPercent: -100 * (아이템개수 - 1) 조합도 좋습니다.
    // const scrollAmount = raceTrack.value.scrollWidth - window.innerWidth
    //
    // gsap.to(raceTrack.value, {
    //   x: -scrollAmount,
    //   ease: 'none', // 가로 스크롤은 속도가 일정해야 부드럽습니다.
    //   scrollTrigger: {
    //     trigger: scrollSection.value,
    //     start: 'top top',
    //     end: () => `+=${scrollAmount}`, // 이동 거리만큼 스크롤 영역 확보
    //     pin: true,                      // 스크롤 도중 화면 고정
    //     scrub: 1.2,                       // 스크롤 바를 따라 부드럽게 감속 매칭 (true 또는 숫자)
    //     invalidateOnRefresh: true,      // 브라우저 리사이즈 시 위치 재계산
    //     markers: false                  // 개발 시 true로 켜서 확인하세요
    //   }
    // })

    Draggable.create(raceTrack.value, {
      type: 'x',
      inertia: true,
      // 1. 드래그 및 관성 미끄러짐이 부모 컨테이너 영역(화면 폭)을 벗어나지 않도록 강제 제한
      bounds: '.sticky-viewport',
      // 2. 경계선에 부딪혔을 때 튕겨 나오는 탄성 저항감 설정 (0.5 = 적당히 쫀득하게 튕김)
      edgeResistance: 0.75,

      onDragStart: () => {
        if (window.lenis) window.lenis.stop();
      },
      onDragEnd: () => {
        if (window.lenis) window.lenis.start();
      }
    });



  }, scrollSection.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert() // 메모리 누수 방지
})
</script>

<template>
  <!-- 1. 전체 영역을 감싸며 pin(고정)이 걸릴 섹션 -->
  <section ref="scrollSection" class="horizontal-scroll-section item-section">

    <!-- 2. 화면 내에 들어올 고정 뷰포트 (높이 100vh) -->
    <div class="sticky-viewport">

      <!-- 3. 실제로 GSAP이 왼쪽(X축)으로 밀어버릴 길다란 트랙 박스 -->
      <div ref="raceTrack" class="race-track">

        <!-- 타이틀 섹션 (옵션) -->
        <div class="intro-box">
          <div class="text-h2 text-bold text-white text-title">Products</div>
          <div class="text-subtitle1 text-grey-4">Scroll down to explore</div>
        </div>

        <!-- Quasar 아이템 리스트 나열 구역 -->
        <div class="card-item-wrapper" v-for="n in 6" :key="n">
          <q-card class="my-quasar-card text-white">
            <q-img src="https://quasar.dev" class="card-img">
              <div class="absolute-bottom text-subtitle2 text-center">
                Product Item {{ n }}
              </div>
            </q-img>
            <q-card-section class="text-black bg-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.item-section{
  width: 100%;
  background-image: url("src/assets/imgs/background/celeb/cel04.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.horizontal-scroll-section {
  width: 100%;
  background-color: #111;
}

.sticky-viewport {
  height: 100vh;
  width: 100%;
  overflow: hidden; /* 가로로 탈출하는 아이템들을 숨겨주는 핵심 설정 */
  position: relative;
}

.race-track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* 아이템이 아래로 떨어지지 않고 가로로 쭉 나열되게 고정 */
  width: max-content; /* 자식 요소 크기만큼 자동으로 부모 너비가 무한히 확장됨 */
  height: 100%;
  align-items: center;
  padding: 0 10vw;   /* 시작과 끝에 주는 여백 */
  will-change: transform;
}

.intro-box {
  font-family: "Lobster", sans-serif;
  width: 400px;
  margin-right: 100px;
  flex-shrink: 0; /* 가로 스크롤 안에서 박스 크기가 찌그러지지 않도록 방지 */
  .text-title{
    font-size: 6rem;
  }
}

.card-item-wrapper {
  flex-shrink: 0;
  margin-right: 60px; /* 아이템 간격 */

  .my-quasar-card {
    width: 350px;
    height: 500px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    border-radius: 16px;
    overflow: hidden;

    .card-img {
      width: 100%;    /* 추가: 가로폭 고정 */
      height: 350px;
      display: block; /* 추가: 하단 미세 공백 제거 */
    }
  }
}
</style>
