<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    const container = document.querySelector('#parallax__cont')
    const sections = gsap.utils.toArray('.section')

    // 💡 container 대신 내부 'sections' 배열을 직접 움직입니다.
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1), // 끝까지 밀어내기 위해 (개수 - 1) 만큼 이동
      ease: 'none',
      scrollTrigger: {
        trigger: '#parallax__cont',
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // 💡 실제 스크롤 길이는 (전체 섹션 개수 * 화면 너비) 만큼 확보해야 끝까지 보입니다.
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section class="next_section">
    <div class="next next01"></div>
  </section>
  <section ref="mainStackerCard" class="stacker-card" id="parallax__cont">
    <!-- Section 01 -->
    <div class="section section01">
      <div class="my-card" id="my-card-01">
        <div class="my-col">
          <h1>Reliable Sealing Solution Partner</h1>
        </div>
        <div class="my-col">
          <q-img class="img" src="~assets/imgs/intro/reliable_01.jpg"></q-img>
        </div>
      </div>
      <span class="parallax__con__num">01</span>
    </div>
    <!-- Section 02 -->
    <div class="section section02">
      <div class="my-card" id="my-card-02">
        <div class="my-col">
          <h1>Fast Response, Accurate Solution</h1>
        </div>
        <div class="my-col">
          <q-img class="img" src="~assets/imgs/intro/fast_01.jpg"></q-img>
        </div>
      </div>
      <span class="parallax__con__num">02</span>
    </div>

    <!-- Section 03 -->
    <div class="section section03">
      <div class="my-card" id="my-card-03">
        <div class="my-col">
          <h1>Customized Sealing for Critical Industries</h1>
        </div>
        <div class="my-col">
          <q-img class="img" src="~assets/imgs/intro/customized_01.jpg"></q-img>
        </div>
      </div>
      <span class="parallax__con__num">03</span>
    </div>
    <!-- Section 04 -->
    <div class="section section04">
      <div class="my-card" id="my-card-04">
        <div class="my-col">
          <h1>Quality First, Performance Proven</h1>
        </div>
        <div class="my-col">
          <q-img class="img" src="~assets/imgs/intro/quality_01.jpg"></q-img>
        </div>
      </div>
      <span class="parallax__con__num">04</span>
    </div>
  </section>

  <section class="next_section">
    <div class="next next01"></div>
  </section>
</template>

<style scoped lang="scss">
#parallax__cont {
  overscroll-behavior: none;
  // 💡 600% 대신 600vw로 설정하여 자식들의 100vw * 6 총합과 일치시킵니다.
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.section {
  width: 100%;
  height: 100vh;
  position: relative;
  // 💡 flex 자식이 찌그러지지 않도록 크기를 고정합니다.
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(189, 180, 180);
}

.parallax__con__num {
  font-size: 4rem;
  position: absolute;
  bottom: 5%;
  right: 5%;
}

.next01 {
  background-color: #21ba45;
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
  color: #fff;
}

#my-card-01 {
  background-color: #466ec4;
}
#my-card-02 {
  background-color: #a155ff;
}
#my-card-03 {
  background-color: #ba2157;
}
#my-card-04 {
  background-color: #dc9613;
}

.my-card {
  width: 70%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem;
  border-radius: 1rem;
  color: #fff;
  transform-origin: center bottom;
}

.my-card .my-col {
  flex: 1;
  height: 100%;
}

.my-card .my-col:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
}

.my-card .my-col:nth-child(2) {
  border-radius: 0.75rem;
  overflow: hidden;
}
</style>
