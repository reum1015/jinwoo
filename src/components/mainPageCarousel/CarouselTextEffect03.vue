<template>
  <div ref="main" class="absolute-center full-width custom-caption text-wrapper">

  <h2 class="con_01 non-selectable"> Customized Sealing</h2>
  <h2 class="con_01 non-selectable"> for Critical Industries</h2>


  </div>
</template>

<script setup>


import {onMounted, onUnmounted, ref} from "vue";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const main = ref(true)

let ctx;

gsap.registerPlugin(SplitText,ScrollTrigger);

onMounted(() => {
  ctx = gsap.context(()=>{
    const split = SplitText.create(".con_01", {type:"chars"})

    gsap.from(split.chars, {
      opacity: 0.1, scale: 0.8, filter: "blur(4px)",
      stagger: { each: 0.06, from: "center" },
      duration: 0.4, ease: "power2.out"
    });




  },main.value)  //end ctx


})

onUnmounted(() => {
  if(ctx) ctx.revert();
})

</script>

<style lang="scss" scoped>
.text-wrapper{
  background-color: transparent !important;


}

.con_01, .con_02{
  font-size: 80px;
  font-weight: 600;
  letter-spacing: -0.04em;
}


.char{

}






</style>
