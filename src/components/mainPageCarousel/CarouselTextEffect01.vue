<template>
  <div ref="CarouselTextEffect01" class="absolute-center full-width custom-caption text-wrapper">

        <h2 class="con_01 non-selectable">Reliable Sealing</h2>
        <h2 class="con_02 non-selectable">Solution Partner</h2>

  </div>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";

const CarouselTextEffect01 = ref(true)

let ctx;

gsap.registerPlugin(SplitText);

onMounted(() => {
  ctx = gsap.context(()=>{
  let split = SplitText.create(".con_01",{
    type: "chars,words,lines",
  })
    gsap.from(split.words,{
      y: 200,
      autoAlpha: 1,
      stagger: 1,
      duration: 2,
    })

    let split2 = SplitText.create(".con_02",{
      type: "chars,words,lines",
    })
    gsap.from(split2.chars,{
      x: 400,
      autoAlpha: 0,
      stagger: 0.2,
    })




  },CarouselTextEffect01.value)  //end ctx


})

onUnmounted(() => {
  if(ctx) ctx.revert();
})

</script>

<style lang="scss" scoped>
.text-wrapper{
  background-color: transparent !important;
  perspective: 1000px;

}

.con_01, .con_02{
  color: #ffffff;
  font-weight: 600;
  font-size: clamp(20px, 5vw, 180px);
  overflow: hidden;
  padding: 30px;
  margin: 0;
  letter-spacing: -0.04em;
  line-height: 1;
}


.char{
  display: inline-block;
  transform-style: preserve-3d;
  will-change: transform;
}

.con_01{
  text-shadow: 3px 4px 5px #000000;
}

.con_02{
  color: white;
  text-shadow: 4px 2px 4px #000000;
}






</style>
