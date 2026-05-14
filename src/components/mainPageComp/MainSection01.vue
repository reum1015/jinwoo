<template>
<div class="wrap">
  <section class="visual en">
    <div class="inner">
      <!-- 화면에 30% 이상 드러나면 bounce 애니메이션 실행 -->

      <div class="textBox">
        <p class="title">My <span class="en2">Work</span></p>
        <p class="subTitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias earum excepturi inventore modi nemo. Beatae dolor eligendi, fuga maiores, necessitatibus nostrum possimus quam quia tempora temporibus velit veritatis vero voluptates?</p>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, deserunt.</p>
      </div>

      <div class="aniBox" v-scrolla="'my-fade-in'">
        <q-img src="~assets/imgs/logo/fedex.png"></q-img>
      </div>

    </div>
  </section>
</div>
</template>

<script setup>
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {onMounted, onUnmounted, ref} from "vue";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);

let ctx;

onMounted(() => {




});


onUnmounted(() => {
  if (ctx) ctx.revert();
});


</script>

<style scoped lang="scss">

.wrap{
  position: relative; margin: 0 auto; overflow: hidden; background: #000; color: #fff;}
.visual{
  padding-top:150px;
  height: 100vh;
  box-sizing: border-box;
  .inner{
    width: 70%;
    margin: 0 auto;

    display: flex;
    justify-content: space-evenly;

    .textBox{
      width: 50%;
      .title{
        font-size: 5rem;
      }
      .en2{
        font-size: 6rem;
        font-weight: bold;
      }

      .subTitle{
        font-size: 25px;
        line-height: 1.3;
        margin: 30px 0;
      }
    }

    .aniBox{
      width: 350px;
      height: 350px;
      .img{
        width: 100%;
      }
    }
  }
}

.en2{
  font-family: 'Paperozi';
}

/* CSS로 애니메이션 정의 */
.animate-init {
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.8s ease;
}

/* 화면에 등장하면 발동할 클래스 */
.my-fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
