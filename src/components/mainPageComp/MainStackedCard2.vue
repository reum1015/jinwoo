<template>
  <div ref='main' class="container column flex-center">
    <h1>Trigger Start</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aut, dolores dolorum fugit iusto natus officia quo saepe voluptate voluptatem.</p>
    <div class="card bg-blue-grey-5">
      <div class="con_wrapper">
        <div class="col">
          <h1>Reliable Sealing Solution Partner</h1>
        </div>
        <div class="col img_wrapper rounded-borders">
          <q-img class="img" src="~assets/imgs/intro/reliable_01.jpg"></q-img>
        </div>
      </div>
    </div>
    <div class="card bg-blue-5">
      <q-img src="https://picsum.photos/1200/600"></q-img>
    </div>
    <div class="card bg-amber-9">
      <q-img src="https://picsum.photos/1200/700"></q-img>
    </div>

  </div>
</template>

<script setup>

import {onMounted, onUnmounted, ref} from "vue";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const main = ref(null);

let ctx;

onMounted(() => {
  ctx = gsap.context(()=>{

    const cards = gsap.utils.toArray('.card')

    cards.forEach((el,index)=>{
      const degree = 3;
      const skewValue = index % 2 === 0 ? degree : -degree
      const isLast = index === cards.length - 1;
      gsap.timeline({
        scrollTrigger : {
          trigger: el,
          start: '0% 150px',
          end:'0% 40%',
          scrub : 3,
          markers : true,
        }
      }).to(el,{
        rotateX : -6,
        rotateZ : skewValue,
        scale : 0.9,
        filter : isLast ? 'brightness(1)' : 'brightness(0.8)',
        opacity : isLast ? 1 : 0.7,
      })

    })
  },main.value)


})

onUnmounted(() => {
  if(ctx) ctx.revert();
})


</script>

<style lang="scss" scoped>
.container {
  //perspective: 1000px;
  min-height: 300vh;
  perspective: 1000px;

}


.card {
  width: 1200px;
  height: 500px;
  position: sticky;
  top: 150px;

  filter: brightness(1);
  opacity: 1;

  & + .card {
    margin-top: 200px;
  }

}
</style>
