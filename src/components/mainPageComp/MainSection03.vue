<template>
  <!-- gsap context가 추적할 수 있도록 최상위 container ref 연결 -->
  <section class="textBox" ref="container">
    <span class="mask">
      <span class="text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br />
        Debitis officiis vero eligendi sunt nostrum cumque quis reprehenderit <br />
        bellendus. Consequatur, ratione!<br />
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio sint dolore ex amet
        consequuntur ullam <br />
        eligendi similique doloremque, rerum, impedit quam quo libero distinctio saepe? Provident
        laboriosam<br />
        quibusdam at ab ipsum omnis assumenda necessitatibus facilis, dolore possimus, soluta <br />
        eius pariatur aliquam aperiam magnam nihil consequuntur dolor. Dignissimos repellendus earum
        vel!
      </span>
    </span>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const container = ref(null)
let ctx = null

onMounted(async () => {
  // DOM 렌더링이 완전히 완료된 후 실행 보장
  await nextTick()

  ctx = gsap.context(() => {
    // scoped style 충돌을 피하기 위해 class 문자열 대신 ref 참조 활용
    const textTarget = container.value.querySelector('.text')

    if (textTarget) {
      gsap.fromTo(
        textTarget,
        { 'background-size': '0% 100%' },
        {
          'background-size': '100% 100%',
          scrollTrigger: {
            trigger: container.value, // 클래스명 대신 요소 직접 지정
            start: '0% 60%', // '0% 60%'보다 명확한 직관적 키워드 사용
            markers: true,
            scrub: 1,
          },
        },
      )
    }
  }, container.value) // scope를 확실히 지정

  // window load 시점에 refresh 진행
  window.addEventListener('load', refreshScroll)
})

const refreshScroll = () => ScrollTrigger.refresh()

onUnmounted(() => {
  window.removeEventListener('load', refreshScroll)
  if (ctx) ctx.revert() // 메모리 누수 방지 및 인스턴스 초기화
})
</script>

<style scoped lang="scss">
.textBox {
  font-size: 60px;
  margin: 2000px 0; // 단축 속성 정리
  background-color: crimson;
  line-height: 1.3;

  .mask {
    display: block;

    .text {
      -webkit-text-fill-color: rgba(255, 255, 255, 0.2);
      -webkit-background-clip: text;
      background-repeat: no-repeat;
      background-image: linear-gradient(#fff, #fff);
      background-size: 0% 100%;
    }
  }
}
</style>
