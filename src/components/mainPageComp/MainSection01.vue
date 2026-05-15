<template>
  <div class="wrap container">
    <section class="visual en">
      <div class="inner">
        <!-- 화면에 30% 이상 드러나면 bounce 애니메이션 실행 -->

        <div class="textBox" v-scrolla="{ class: 'my-fade-left', threshold: 0.3 }">
          <p class="title">My <span class="en2">Work</span></p>
          <p class="subTitle">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias earum excepturi
            inventore modi nemo. Beatae dolor eligendi, fuga maiores, necessitatibus nostrum
            possimus quam quia tempora temporibus velit veritatis vero voluptates?
          </p>
          <p class="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, deserunt.
          </p>
        </div>

        <div class="aniBox" v-scrolla="{ class: 'my-fade-in', threshold: 0.6 }">
          <q-img src="~assets/imgs/logo/fedex.png"></q-img>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const container = ref(null)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    //gsap.from('.textBox', { y: 200 }, 4)
  }, container.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped lang="scss">
.wrap {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background: #000;
  color: #fff;
}
.visual {
  padding-top: 150px;
  height: 100vh;
  box-sizing: border-box;
  .inner {
    width: 70%;
    margin: 0 auto;

    display: flex;
    justify-content: space-evenly;

    .textBox {
      width: 50%;
      .title {
        font-size: 5rem;
      }
      .en2 {
        font-size: 6rem;
        font-weight: bold;
      }

      .subTitle {
        font-size: 25px;
        line-height: 1.3;
        margin: 30px 0;
      }
    }

    .aniBox {
      width: 350px;
      height: 350px;
      .img {
        width: 100%;
      }
    }
  }
}

.en2 {
  font-family: 'Paperozi';
}

/* 공통 트랜지션만 부여 */
.animate-init {
  opacity: 0;
  transition: all 0.8s ease;
}

/* 화면 등장 시 공통 최종 상태 */
.animate-start {
  opacity: 1;
  transform: translate(0, 0) !important; /* X, Y축 모두 0으로 초기화 */
}

/* 시작 위치 정의 */
.my-fade-in {
  transform: translateY(200px);
}
.my-fade-left {
  transform: translateX(-200px);
}
</style>
