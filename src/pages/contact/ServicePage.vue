<template>
  <q-page class="q-pt-md">
    <div>
      <h1>Service Pages</h1>
      <div class="box1"></div>
    </div>

    <section class="section01">
      <div class="box2"></div>
    </section>

    <section class="section02"></section>
  </q-page>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.box1', {
      x: 500,
      borderRadius: 100,
      rotation: 360,
    })

    gsap.to('.box2', {
      duration: 2,
      x: 500,
      borderRadius: 100,
      scrollTrigger: {
        trigger: '.box2',
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1,
        toggleClass: 'active',
        id: 'box2',
        markers: {
          startColor: 'black',
          fontSize: '20px',
          indent: 20,
        },
        onEnter: () => {
          console.log('onEnter')
        },
        onLeave: () => {
          console.log('onLeave :>> ')
        },
      },
    })
  })

  console.log('ctx', ctx)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style lang="scss" scoped>
div {
  height: 900px;
  background-color: $deep-purple-5;
}

.box2.active {
  background-color: brown;
}

.box1 {
  height: 200px;
  width: 200px;
  background-color: tomato;
}

.box2 {
  height: 200px;
  width: 200px;
  background-color: rgb(162, 255, 125);
  transition: background-color 1s;
}

.section01 {
  height: 100vh;
}
.section02 {
  height: 100vh;
}
</style>
