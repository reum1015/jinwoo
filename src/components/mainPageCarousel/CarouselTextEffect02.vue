<template>
  <div ref="main" class="absolute-center full-width custom-caption text-wrapper">

  <h2 class="con_01 non-selectable"> Fast Response</h2>
  <h2 class="con_02 non-selectable"> Accurate Solution</h2>


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
    const split1 = SplitText.create(".con_02", {type:"chars"})

    gsap.from(split.chars,{
      y:40,
      color:"#00ff66",
      opacity:0,
      stagger:{each: 0.1, from : 'start'},
      duration:1,
      ease : "sine.out",
    })

    gsap.from(split1.chars,{
      y: -100, opacity: 0,
      stagger: { each: 0.1, from: "random" },
      duration:1, ease: "power2.out"
    })




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
  font-size: 100px;
  font-weight: 600;
  letter-spacing: -0.04em;
}


.char{

}






</style>
