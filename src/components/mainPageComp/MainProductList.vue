<template>
  <!-- Lenis 스크롤 간섭 차단을 위한 data-lenis-prevent 추가 -->
  <section class="main-product flex flex-center">
    <div class="title-wrapper">
      <h1 class="title-text">Product List</h1>
    </div>
    <div ref="containerRef" class="card-carousel-container">
      <div ref="trackRef" class="card-track">
        <!-- 각 카드 엘리먼트들을 추적하기 위해 ref 배열 바인딩 처리 제거 및 단순화 -->

        <q-card v-for="(i, index) in 10" :key="i" :index="index" class="my-card q-ma-lg shadow-5">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" class="product-image">
            <div class="absolute-bottom">
              <div class="text-h6">Insulation Kit {{ i }}</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn flat color="primary">view</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(Draggable, InertiaPlugin)

const containerRef = ref(null)
const trackRef = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {})
})
onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped lang="scss">
.main-product {
  height: 100vh;
  width: 100%;
  background: #4646ff;
  overflow: hidden;
}

.card-carousel-container {
  width: 100%;
  overflow: hidden;
  padding: 60px 0;
  cursor: grab;
  perspective: 1200px;

  &:active {
    cursor: grabbing;
  }
}

.card-track {
  display: flex;
  width: max-content;
  transform-style: preserve-3d;
  // 첫 번째 카드와 마지막 카드가 화면 양쪽 끝에서 자연스럽게 멈추도록 여백 조정
  padding-left: 2rem;
  padding-right: 2rem;
}

.my-card {
  // 3. 충돌하던 너비 속성들을 정리하고 명확한 크기로 고정합니다.
  width: 320px;
  flex-shrink: 0; /* 트랙 안에서 카드가 구겨지거나 찌그러지는 현상 방지 */
  user-select: none;
}

.product-image {
  height: 350px; /* min-height 대신 명확한 고정 높이 지정이 부드러운 정렬에 유리합니다 */
}
</style>
