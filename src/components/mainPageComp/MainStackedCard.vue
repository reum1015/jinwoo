<template>
  <section class="skicky-card">
    <div class="card" id="card-1">
      <div class="col">
        <h1>Reliable Sealing Solution Partner</h1>
      </div>
      <div class="col">
        <q-img class="img" src="~assets/imgs/intro/reliable_01.jpg"></q-img>
      </div>
    </div>
    <div class="card" id="card-2">
      <div class="col">
        <h1>Fast Response Accurate Solution</h1>
      </div>
      <div class="col">
        <q-img class="img" src="~assets/imgs/intro/fast_01.jpg"></q-img>
      </div>
    </div>
    <div class="card" id="card-3">
      <div class="col">
        <h1>Customized Sealing for Critical Industries</h1>
      </div>
      <div class="col">
        <q-img class="img" src="~assets/imgs/intro/customized_01.jpg"></q-img>
      </div>
    </div>
    <div class="card" id="card-4">
      <div class="col">
        <h1>Quality First Performance Proven</h1>
      </div>
      <div class="col">
        <q-img class="img" src="~assets/imgs/intro/quality_01.jpg"></q-img>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    const cards = document.querySelectorAll('.skicky-card .card')
    const totalCards = cards.length
    const segmentSize = 1 / totalCards

    // 초기 카드 배치 상수
    const cardYOffset = 5
    const cardScaleStep = 0.075

    // 1. 카드의 초기 위치 및 스타일 설정
    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50 + i * cardYOffset,
        scale: 1 - i * cardScaleStep,
      })
    })

    // 2. 스크롤에 따른 카드 애니메이션 제어
    ScrollTrigger.create({
      trigger: '.skicky-card',
      start: 'top top',
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress

        // 현재 활성화된 카드의 인덱스 계산
        const activeIndex = Math.min(Math.floor(progress / segmentSize), totalCards - 1)

        // 현재 세그먼트 안에서의 진행률 (0 ~ 1)
        const segProgress = (progress - activeIndex * segmentSize) / segmentSize

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            // 지나간 카드: 화면 위로 완전히 날려버림
            gsap.set(card, {
              yPercent: -250,
              rotationX: 35,
            })
          } else if (i === activeIndex) {
            // 현재 활성화된 카드: 스크롤에 맞춰 위로 올라가며 회전
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            })
          } else {
            const behindIndex = i - activeIndex
            const currentYOffset = (behindIndex - segProgress) * cardYOffset
            const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep

            gsap.set(card, {
              yPercent: -50 + currentYOffset,
              rotationX: 0,
              scale: currentScale,
            })
          }
        }) // end cards.forEach
      }, // end onUpdate
    }) // end ScrollTrigger.create
  }) // end gsap.context
}) // end onMounted

onUnmounted(() => {
  if (ctx) ctx.revert() // 메모리 누수 방지 및 리소스 해제
})
</script>

<style scoped lang="scss">
.sec02 {
  height: 100vh;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h1 {
  font-family: 'Barlow Condensed';
  text-transform: uppercase;
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 700;
}

section {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
}

.skicky-card {
  background: #e3e3db;
  perspective: 800px;

  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2.5rem;
    border-radius: 1rem;
    color: #fff;
    transform-origin: center bottom;
    will-change: transform;
  }
}

.card .col {
  flex: 1;
  height: 100%;
}

.card .col:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
}

.card .col:nth-child(2) {
  border-radius: 0.75rem;
  overflow: hidden;
}

.card#card-1 {
  background-color: #466ec4;
  z-index: 5;
}
.card#card-2 {
  background-color: #a155ff;
  z-index: 4;
}
.card#card-3 {
  background-color: #ba2157;
  z-index: 3;
}
.card#card-4 {
  background-color: #dc9613;
  z-index: 2;
}

@media (max-width: 1000px) {
  .skicky-card .card {
    width: calc(100% - 4rem);
    height: 75%;
    flex-direction: column;
  }

  .card .col {
    width: 100%;
  }
}
</style>
