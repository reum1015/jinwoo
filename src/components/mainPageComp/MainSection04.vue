<template>
<div class="wrap">
  <section class="con01">
      <div class="inner">
          <div class="mainTextBox">
            <h2 class="en">Jinwoo Company</h2>
            <p class="txt"> 안녕하세요 / 반갑습니다 </p>
          </div>
          <ul class="listBox">
            <li class="box a">a</li>
            <li class="box b">b</li>
            <li class="box c">c</li>
          </ul>

      </div>


  </section>

</div>
</template>

<script setup>
import gsap from 'gsap'
import {onMounted, onUnmounted, ref} from 'vue'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const con01 = ref(null)
let ctx = null

onMounted( () => {
  // DOM 렌더링이 완전히 완료된 후 실행 보장

  ctx = gsap.context(() => {
    gsap.utils.toArray('.con01 .listBox .box').forEach((item) => {


      // 💡 index가 짝수(0, 2...)면 10, 홀수(1, 3...)면 -10을 적용합니다.
      //const skewValue = index % 2 === 0 ? 10 : -10;

      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start : '0% 30%',
          end : '0% 60%',
          scrub : 3,
          markers: true,
        }
      })

        .to(item,{
          rotateX : -25,
          scale : 0.9,
          transformOrigin: 'top center',
          filter : 'brightness(0.3)',
        },0)
    })

  }, con01.value) // scope를 확실히 지정


})


onUnmounted(() => {

  if (ctx) ctx.revert() // 메모리 누수 방지 및 인스턴스 초기화
})

</script>

<style lang="scss" scoped>
  .wrap{
    position: relative;
    margin: 0 auto;
    background: #141212;

    .con01{
      padding: 500px 0 1000px;

      .inner{
        padding: 0 50px;
        box-sizing: border-box;
        color: #f2c037;
        .mainTextBox{
          text-transform: uppercase;
        }

        .listBox{
          perspective: 900px;
          .box{

            height: 400px;
            background: #fff;
            margin-bottom: 50px;
            border-radius: 10px;
            position: sticky;
            top: calc(50vh - 200px);;
            filter:brightness(1);

          }

        }
      }
    }
  }

  .b{background: #5271ff !important;}
  .c{background: #ff52d7 !important;}

</style>
