<template>
  <section class="work">
    <ul>
      <li v-for="n in 10" :key="n">
        <a href="#">
          <div class="imgBox">
            <img src="~assets/imgs/productThumbnail/gasket004.jpg" alt="gasket004" />
          </div>
          <div class="textBox">
            <p class="title">Site Name - {{ n }}</p>
            <p class="text2 en2"><em>UI/UX Design, Web Piblishing</em></p>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sec01 = ref(0)
let ctx

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  ctx = gsap.context(() => {
    let mm = gsap.matchMedia()

    mm.add('(min-width : 1204px)', () => {
      let list = gsap.utils.toArray('.work ul li')
      let scrollTween = gsap.to(list, {
        xPercent: -100 * (list.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.work',
          pin: true,
          scrub: 1,
          start: 'center center',
          end: '300%',
          //markers: true,
        },
      })

      //03.imageBox 모션

      gsap.utils.toArray('.imgBox').forEach((imageBox) => {
        //03-1 : imageBox 커지는 애니메이션 => 화면 오른쪽에서 커지기 시작해서 중앙에서 끝나는 애니
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imageBox,
              containerAnimation: scrollTween,
              start: 'center right',
              end: 'center center',
              scrub: true,
            },
          })
          .to(imageBox, { 'clip-path': 'inset(0%)', duration: 1 }, 0)

        //03-02: imageBox 작아지는 애니메이션
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imageBox,
              containerAnimation: scrollTween,
              start: 'center center',
              end: 'center left',
              scrub: true,
              markers: true,
            },
          })
          .to(imageBox, { 'clip-path': 'inset(30%)', duration: 1 }, 0)
      })
    })
  })
})

// 이미지나 레이아웃이 완전히 로드된 후 위치 재계산
window.addEventListener('load', () => ScrollTrigger.refresh())
// 모든 계산이 끝난 후 다시 한 번 위치 측정
setTimeout(() => {
  ScrollTrigger.refresh()
}, 100)

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style lang="scss" scoped>
.work {
  background-color: #1d1d1d;
  color: #fff;
  height: 100vh;
  overflow: hidden;
  ul {
    display: flex;
    padding: 3% 30%;
    box-sizing: border-box;

    li {
      width: 700px;
      padding: 100px;
      box-sizing: border-box;
      flex-shrink: 0;

      a {
        display: block;
        width: 100%;
        position: relative;

        .textBox {
          position: absolute;
          left: 0;
          bottom: 10%;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
          .title {
            font-size: 60px;
          }
          .text2 {
            font-size: 20px;
            padding-left: 5px;
          }
        }

        .imgBox {
          position: relative;

          img {
            width: 100%;
          }
        }
      }
    }
  }
}

/* hover */
/* 화살표와 테두리 */
.work ul li a .imgBox:before {
  content: '';
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 1px solid #fff;
  background: url('src/assets/imgs/flames.png') no-repeat center/100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: all 1s;
  opacity: 0;
}

/* spin 이미지와 배경색 */
.work ul li a .imgBox:after {
  content: '';
  width: 0%;
  height: 0%;
  border-radius: 100%;
  background: #fff url('src/assets/imgs/circle.png') no-repeat center/130px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  animation-name: spin2;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes spin2 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/*hover 효과*/
.work ul li a .imgBox:hover img {
  filter: brightness(50%);
  transition: 0.3s;
}

.work ul li a .imgBox:hover::before {
  opacity: 1;
}

.work ul li a .imgBox:hover::after {
  opacity: 1;
  width: 140px;
  height: 140px;
}

/*inset을 이용해서 */

.work ul li a .imgBox {
  clip-path: inset(30%);
}
.work ul li a .textBox {
  opacity: 0;
}
</style>
