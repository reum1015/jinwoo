<script setup>
import {onMounted, onUnmounted} from "vue";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let ctx = null;


onMounted(() => {

  ctx = gsap.context(() => {
    const container = document.querySelector('#parallax__cont');
    const sections = gsap.utils.toArray('.section');

    // 전체 움직여야 할 거리는 (전체 너비 - 화면 하나 너비) 입니다.
    // xPercent 대신 컨테이너 전체를 x축으로 이동시키면 정확히 맞물립니다.
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#parallax__cont',
        pin: true,
        scrub: 1,
        snap: {
          snapTo : 1 / (sections.length - 1),
          inertia : false,
          duration : {min: 0.1, max: 0.4},

        },
        // end 값은 스크롤 속도(길이)를 조절합니다.
        // 마지막 여백 현상과 무관하므로 원하는 스크롤 감도로 조절 가능합니다.
        end: "+=4000",
        invalidateOnRefresh: true, // 화면 크기가 바뀔 때 재연산하여 오류를 방지합니다.
        anticipatePin : 1,
      }
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();


});
</script>

<template>

  <section class="next_section">
    <div class="next next01"></div>

  </section>
  <section ref="mainStackerCard" class="stacker-card" id="parallax__cont">
    <div class="section section01"><span class="parallax__con__num">01</span></div>
    <div class="section section02"><span class="parallax__con__num">02</span></div>
    <div class="section section03"><span class="parallax__con__num">03</span></div>
    <div class="section section04"><span class="parallax__con__num">04</span></div>
    <div class="section section05"><span class="parallax__con__num">05</span></div>
    <div class="section section06"><span class="parallax__con__num">06</span></div>
  </section>

  <section class="next_section">
    <div class="next next01"></div>

  </section>
</template>

<style scoped lang="scss">
#parallax__cont {
  overscroll-behavior: none;
  // 💡 600% 대신 600vw로 설정하여 자식들의 100vw * 6 총합과 일치시킵니다.
  width: 600vw;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
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

.section01 { background-color: #f2c037 }
.section02 { background-color: #264f03 }
.section03 { background-color: #8a012a }
.section04 { background-color: #210679 }
.section05 { background-color: #046239 }
.section06 { background-color: #363433 }


.next{
  height: 100vh;
}

.next01{ background-color: #21ba45}
.next02{ background-color: #5ea4d5
}
.next03{ background-color: #eabd77
}
.next04{ background-color: #c2187e
}
</style>
