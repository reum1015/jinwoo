<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx
const zoomContainer = ref(null) // trigger와 pin을 일치시킬 컨테이너

onMounted(() => {
  ctx = gsap.context(() => {
    // 타겟을 container 자체로 잡아 핀을 고정합니다.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: zoomContainer.value,
        start: 'top top',
        end: '+=200%',
        pin: true, // 자기 자신을 그대로 고정
        scrub: true,
        markers: false, // 디버깅 후 false로 변경하세요
      },
    })

    // 1. 앞쪽 q-img 내부 이미지 혹은 컨테이너 스케일 업 (클래스 타겟팅 안정화)
    tl.to('.front-image', {
      scale: 4,
      z: 500,
      rotateX: 10,
      transformOrigin: 'center center',
      ease: 'power1.inOut',
    })

    // 2. 뒤쪽 배경 이미지 스케일 업
    tl.fromTo(
      '.hero',
      {
        scale: 1.2,
      },
      {
        scale: 1,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    )

    // 3. 글자 내부 스케일 업
    tl.to(
      '.content-title h1',
      {
        scale: 1.2,
        transformOrigin: 'center center',
        ease: 'power1.inOut',
      },
      '<',
    )
  }, zoomContainer.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <!-- 전체를 감싸는 고정 핀 컨테이너 역할을 합니다 -->
  <section ref="zoomContainer" class="zoom-container">
    <div class="wrapper">
      <div class="content">
        <div class="hero"></div>
        <div class="content-title">
          <h1 class="content-title-h1">
            <span>jinwoo</span>
            <span>korea</span>
          </h1>
        </div>
      </div>

      <div class="image-container">
        <!-- class를 타겟으로 바로 쓸 수 있도록 구조 조정 -->
        <q-img src="~assets/imgs/blackHole_03.png" class="front-image" />
      </div>
    </div>
  </section>

  <!--
    만약 sec01, sec02, sec03이 다음 스크롤 화면으로 보여야 하는 거라면
    고정되는 고유 영역(section) 바깥으로 완전히 빼내야 레이아웃이 깨지지 않습니다.
  -->
</template>

<style scoped lang="scss">
.content-title-h1 {
  font-family: 'Barlow Condensed';
  text-transform: uppercase;
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 700;
  display: flex;
}

/* 고정될 메인 컨테이너 */
.zoom-container {
  background: #58ff32;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden; /* 영역 밖 이미지 탈출 방지 */
}

.wrapper {
  perspective: 1500px;
  width: 100%;
  height: 100%;
  position: relative;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.content-title {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.content-title h1 {
  max-width: calc(100vw - 32px);
  font-size: 8rem;
  line-height: 1;
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  text-align: center;
  color: #f2c037;
  overflow-wrap: normal;
  white-space: nowrap;
}

.content-title h1 span {
  display: inline;
}

.content-title h1 span + span {
  margin-left: 0.22em;
}

.image-container {
  position: absolute;
  inset: 0;
  z-index: 2;
  perspective: 1500px;
  overflow: hidden;

  .front-image {
    width: 100%;
    height: 100%;
    /* q-img 컴포넌트 자체 혹은 내부 이미지 정렬 */
    :deep(img) {
      object-fit: cover;
      object-position: center center;
    }
  }
}

.hero {
  background-image: url('src/assets/imgs/background/celeb/cel03.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: absolute;
  inset: 0;
}

/* 고정 영역 외부 슬라이드들 */
.sec01,
.sec02,
.sec03 {
  height: 100vh;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.sec01 {
  background-image: url('src/assets/imgs/background/celeb/cel01.jpg');
}
.sec02 {
  background-image: url('src/assets/imgs/background/celeb/cel02.jpg');
}
.sec03 {
  background-image: url('src/assets/imgs/background/celeb/cel06.jpg');
}

@media (max-width: 1200px) {
  .content-title h1 {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .content-title h1 {
    font-size: 4rem;
  }
}

@media (max-width: 480px) {
  .content-title h1 {
    font-size: 2.6rem;
    line-height: 0.95;
    white-space: normal;
  }

  .content-title h1 span {
    display: block;
  }

  .content-title h1 span + span {
    margin-left: 0;
  }
}
</style>
