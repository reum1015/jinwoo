<template>
  <section class="main-product">
    <div class="title-wrapper">
      <h1 class="title-text">Product List</h1>
    </div>

    <div ref="containerRef" class="card-carousel-container">
      <div ref="trackRef" class="card-track">
        <q-card
          v-for="(card, index) in loopedProducts"
          :key="`${card.id}-${index}`"
          class="my-card shadow-5"
          @click="goToProduct(card)"
        >
          <q-img :src="card.imgUrl" :alt="card.name" class="product-image">
            <div class="hover-glow"></div>
            <div class="absolute-bottom product-caption">
              <div class="text-h6">{{ card.name }}</div>
              <div class="caption-action">View details</div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <div class="carousel-controls">
      <q-btn
        round
        flat
        icon="chevron_left"
        color="white"
        class="control-btn"
        aria-label="Previous product"
        @click.stop="goToPrevious"
      />
      <div class="product-count text-white">{{ currentIndex + 1 }} / {{ totalProducts }}</div>
      <q-btn
        round
        flat
        icon="chevron_right"
        color="white"
        class="control-btn"
        aria-label="Next product"
        @click.stop="goToNext"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { products } from 'assets/data/products.js'

gsap.registerPlugin(Draggable, InertiaPlugin)

const router = useRouter()
const containerRef = ref(null)
const trackRef = ref(null)
const currentIndex = ref(0)

// 같은 상품 목록을 3번 반복해서 가운데 묶음에서 시작합니다.
// 양끝에 닿으면 같은 위치의 가운데 묶음으로 되돌려 무한처럼 보이게 합니다.
const loopedProducts = computed(() => [...products, ...products, ...products])
const totalProducts = computed(() => products.length)

let ctx = null
let draggable = null
let segmentWidth = 0
let itemWidth = 0
let centerOffset = 0
let currentVirtualIndex = 0
let cardCenterOffsets = []
let resizeFrame = null
let suppressClickUntil = 0

// 음수 인덱스나 전체 개수를 넘긴 인덱스를 실제 상품 범위로 되돌립니다.
const normalizeIndex = (index) => {
  if (!totalProducts.value) return 0
  return ((index % totalProducts.value) + totalProducts.value) % totalProducts.value
}

// 가운데 묶음의 index번째 카드가 화면 중앙에 오도록 track의 x 위치를 계산합니다.
const getXForIndex = (index) => -segmentWidth + centerOffset - index * itemWidth

const wrapTrackPosition = () => {
  if (!trackRef.value || !segmentWidth) return

  const currentX = gsap.getProperty(trackRef.value, 'x')
  // track이 가운데 묶음 밖으로 나가면 같은 시각 위치의 가운데 묶음 좌표로 순간 이동합니다.
  const wrappedX = gsap.utils.wrap(
    -segmentWidth * 2 + centerOffset,
    -segmentWidth + centerOffset,
    currentX,
  )

  if (wrappedX !== currentX) {
    gsap.set(trackRef.value, { x: wrappedX })
  }
}

const updateCurrentIndexFromTrack = () => {
  if (!trackRef.value || !itemWidth) return

  const currentX = gsap.getProperty(trackRef.value, 'x')
  // 현재 x 좌표를 카드 단위 인덱스로 환산해서 중앙에 가장 가까운 카드를 찾습니다.
  const rawIndex = (-segmentWidth + centerOffset - currentX) / itemWidth

  currentVirtualIndex = Math.round(rawIndex)
  currentIndex.value = normalizeIndex(currentVirtualIndex)
}

const updateCardPerspective = () => {
  if (!containerRef.value || !trackRef.value) return

  const containerWidth = containerRef.value.clientWidth
  const centerX = containerWidth / 2
  const trackX = gsap.getProperty(trackRef.value, 'x')
  const cards = gsap.utils.toArray('.my-card', trackRef.value)
  // 중앙에서 멀어질수록 scale, 회전, opacity가 강해지는 범위입니다.
  const effectRange = containerWidth * 0.62

  cards.forEach((card, index) => {
    const cardCenter = trackX + cardCenterOffsets[index]
    const distance = cardCenter - centerX
    const normalized = Math.min(Math.abs(distance) / effectRange, 1)
    const direction = distance < 0 ? -1 : 1

    gsap.set(card, {
      scale: gsap.utils.interpolate(1.05, 0.82, normalized),
      rotateY: direction * gsap.utils.interpolate(0, 25, normalized),
      rotateZ: direction * gsap.utils.interpolate(0, 4, normalized),
      z: gsap.utils.interpolate(90, -180, normalized),
      opacity: gsap.utils.interpolate(1, 0.48, normalized),
      //force3D: true,
      transformOrigin: 'center center',
      zIndex: Math.round((1 - normalized) * 100),
    })
  })
}

const updateCarousel = () => {
  wrapTrackPosition()
  updateCardPerspective()
  updateCurrentIndexFromTrack()
}

const normalizeTrackToMiddleSegment = () => {
  if (!trackRef.value || !itemWidth) return

  // 버튼이나 관성 드래그로 가상 인덱스가 커져도 실제 track은 가운데 묶음에 유지합니다.
  currentVirtualIndex = normalizeIndex(currentVirtualIndex)
  currentIndex.value = currentVirtualIndex
  gsap.set(trackRef.value, { x: getXForIndex(currentVirtualIndex) })
}

const moveToVirtualIndex = (targetIndex) => {
  if (!trackRef.value || !itemWidth) return

  // 버튼 클릭 직후 카드 클릭 이벤트가 같이 타지 않도록 짧게 막습니다.
  suppressClickUntil = Date.now() + 350
  currentVirtualIndex = targetIndex
  currentIndex.value = normalizeIndex(currentVirtualIndex)

  // 이동 애니메이션 중에는 Lenis 세로 스크롤과 충돌하지 않도록 잠시 멈춥니다.
  if (window.lenis) window.lenis.stop()
  gsap.killTweensOf(trackRef.value)

  gsap.to(trackRef.value, {
    x: getXForIndex(currentVirtualIndex),
    duration: 0.55,
    ease: 'power3.inOut',
    onUpdate: updateCardPerspective,
    onComplete: () => {
      normalizeTrackToMiddleSegment()
      updateCardPerspective()
      if (window.lenis) window.lenis.start()
    },
  })
}

const goToPrevious = () => {
  moveToVirtualIndex(currentVirtualIndex - 1)
}

const goToNext = () => {
  moveToVirtualIndex(currentVirtualIndex + 1)
}

const setupDraggable = () => {
  if (!containerRef.value || !trackRef.value) return

  const trackWidth = trackRef.value.scrollWidth
  // 전체 track은 상품 목록 3묶음이므로 한 묶음의 너비를 기준 단위로 사용합니다.
  segmentWidth = trackWidth / 3
  itemWidth = segmentWidth / totalProducts.value

  if (draggable) {
    draggable.kill()
    draggable = null
  }

  const firstCard = trackRef.value.querySelector('.my-card')
  // 첫 번째 카드의 중심이 화면 중앙에 오도록 필요한 보정값입니다.
  centerOffset = firstCard ? containerRef.value.clientWidth / 2 - firstCard.offsetWidth / 2 : 0
  cardCenterOffsets = gsap.utils
    .toArray('.my-card', trackRef.value)
    .map((card) => card.offsetLeft + card.offsetWidth / 2)

  currentVirtualIndex = currentIndex.value
  gsap.set(trackRef.value, { x: getXForIndex(currentVirtualIndex) })

  draggable = Draggable.create(trackRef.value, {
    type: 'x',
    inertia: true,
    edgeResistance: 0.75,
    dragResistance: 0.15,
    onPressInit: () => {
      // 가로 드래그 중에는 Lenis가 세로 스크롤을 가져가지 않게 막습니다.
      if (window.lenis) window.lenis.stop()
    },
    onDrag: function () {
      suppressClickUntil = Date.now() + 250
      updateCarousel()
      //updateCardPerspective()
    },
    onThrowUpdate: updateCarousel,
    onRelease: () => {
      if (window.lenis) window.lenis.start()
      wrapTrackPosition()
      updateCurrentIndexFromTrack()
    },
    onThrowComplete: () => {
      // 관성 이동이 끝난 뒤 가운데 묶음으로 좌표를 정리해 다음 이동을 안정화합니다.
      normalizeTrackToMiddleSegment()
      updateCardPerspective()
      if (window.lenis) window.lenis.start()
    },
  })[0]

  updateCarousel()
}

const handleResize = () => {
  if (resizeFrame) cancelAnimationFrame(resizeFrame)

  // resize 이벤트가 연속으로 들어올 때 마지막 프레임에서만 다시 계산합니다.
  resizeFrame = requestAnimationFrame(() => {
    setupDraggable()
  })
}

const goToProduct = (card) => {
  if (Date.now() < suppressClickUntil) return

  // 상세 페이지는 나중에 만들 예정이므로 현재는 id 기반 경로만 연결해 둡니다.
  router.push({ path: `/products/${card.id}` })
}

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    setupDraggable()
    window.addEventListener('resize', handleResize)
  }, containerRef.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeFrame) cancelAnimationFrame(resizeFrame)
  if (draggable) draggable.kill()
  if (ctx) ctx.revert()
})
</script>

<style scoped lang="scss">
.main-product {
  height: 100vh;
  width: 100%;
  background:
    linear-gradient(rgba(12, 14, 20, 0.48), rgba(12, 14, 20, 0.76)),
    url('src/assets/imgs/background/celeb/cel05.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title-wrapper {
  width: 100%;
  text-align: left;
}

.title-text {
  margin: 0 0 1.5rem 6vw;
  font-family: 'Lobster', sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0;
  color: #fff;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.9;
}

.card-carousel-container {
  width: 100%;
  overflow: hidden;
  padding: 80px 0;
  cursor: grab;
  perspective: 1600px;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);

  &:active {
    cursor: grabbing;
  }
}

.card-track {
  display: flex;
  width: max-content;
  transform-style: preserve-3d;
  align-items: center;
  padding: 0 2rem;
  will-change: transform;
}

.my-card {
  width: clamp(190px, 23vw, 320px);
  flex-shrink: 0;
  margin: 0 clamp(10px, 1.4vw, 22px);
  user-select: none;
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.12);
  transform-style: preserve-3d;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transition:
    box-shadow 0.24s ease,
    outline-color 0.24s ease;
  cursor: pointer;
  outline: 1px solid rgba(255, 255, 255, 0.08);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0);
    transition: box-shadow 0.24s ease;
  }

  &:hover {
    outline-color: rgba(255, 255, 255, 0.5);
    box-shadow:
      0 34px 70px rgba(0, 0, 0, 0.52),
      0 0 34px rgba(82, 113, 255, 0.36);

    &::after {
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.42);
    }

    .product-image {
      :deep(img) {
        filter: brightness(1.14) contrast(1.08) saturate(1.12);
        transform: scale(1.08);
      }
    }

    .hover-glow {
      opacity: 1;
      transform: translateX(70%) skewX(-18deg);
    }

    .product-caption {
      padding-bottom: 1.25rem;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.86));
    }

    .caption-action {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.product-image {
  height: clamp(260px, 34vw, 390px);

  :deep(img) {
    object-fit: cover;
    will-change: transform, filter;
    backface-visibility: hidden;
    transition:
      filter 0.32s ease,
      transform 0.32s ease;
  }
}

.hover-glow {
  position: absolute;
  top: -20%;
  left: -80%;
  z-index: 1;
  width: 55%;
  height: 140%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent);
  opacity: 0;
  pointer-events: none;
  transform: translateX(0) skewX(-18deg);
  transition:
    opacity 0.24s ease,
    transform 0.45s ease;
}

.product-caption {
  z-index: 2;
  padding: 1rem 0.9rem 0.85rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.72));
  transition:
    background 0.24s ease,
    padding-bottom 0.24s ease;
}

.caption-action {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  color: #f2c037;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.24s ease,
    transform 0.24s ease;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
}

.control-btn {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
    transform: translateY(-1px);
  }
}

.product-count {
  min-width: 96px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 600px) {
  .main-product {
    height: 86vh;
  }

  .title-text {
    margin-left: 1.25rem;
    font-size: 4rem;
  }

  .card-carousel-container {
    padding: 48px 0;
  }

  .carousel-controls {
    gap: 0.65rem;
  }

  .control-btn {
    width: 42px;
    height: 42px;
  }

  .product-count {
    min-width: 82px;
    font-size: 1rem;
  }
}
</style>
