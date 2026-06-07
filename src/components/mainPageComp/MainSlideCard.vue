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
    <div class="section section01"><span class="parallax__con__num">01</span></div>
    <div class="section section02"><span class="parallax__con__num">02</span></div>
    <div class="section section03"><span class="parallax__con__num">03</span></div>
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
  width: 100vw;
  height: 100vh;
  position: relative;
  // 💡 flex 자식이 찌그러지지 않도록 크기를 고정합니다.
  flex-shrink: 0;
}

.parallax__con__num {
  font-size: 4rem;
  position: absolute;
  bottom: 5%;
  right: 5%;
}

.section01 {
  background-color: #f2c037;
}
.section02 {
  background-color: #264f03;
}
.section03 {
  background-color: #8a012a;
}
.section04 {
  background-color: #210679;
}
.section05 {
  background-color: #046239;
}
.section06 {
  background-color: #363433;
}

.next {
  height: 100vh;
}

.next_section {
  overflow: hidden;
}

.next01 {
  background-color: #21ba45;
}
.next02 {
  background-color: #5ea4d5;
}
.next03 {
  background-color: #eabd77;
}
.next04 {
  background-color: #c2187e;
}
</style>
