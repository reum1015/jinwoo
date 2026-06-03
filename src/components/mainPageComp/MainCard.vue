<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { products } from 'assets/data/products.js'

// Register the GSAP plugins we need for dragging with momentum.
gsap.registerPlugin(Draggable, InertiaPlugin)

const scrollSection = ref(null)
const raceTrack = ref(null)

let ctx = null
let draggable = null
let segmentWidth = 0
let resizeFrame = null

// Repeat the list three times so we can wrap the track seamlessly.
const loopedProducts = computed(() => [...products, ...products, ...products])

// Keep the track inside one repeated segment.
// When x moves outside the middle segment, jump it back to the matching position.
const syncTrackPosition = () => {
  if (!raceTrack.value || !segmentWidth) return

  const currentX = gsap.getProperty(raceTrack.value, 'x')
  const wrappedX = gsap.utils.wrap(-segmentWidth, 0, currentX)

  gsap.set(raceTrack.value, { x: wrappedX })
}

// Measure the full width of the repeated track and rebuild draggable bounds.
const setupDraggable = () => {
  if (!raceTrack.value) return

  const trackWidth = raceTrack.value.scrollWidth
  segmentWidth = trackWidth / 3

  if (draggable) {
    draggable.kill()
    draggable = null
  }

  // Start from the middle copy so both directions can wrap naturally.
  gsap.set(raceTrack.value, { x: -segmentWidth })

  draggable = Draggable.create(raceTrack.value, {
    type: 'x',
    inertia: true,
    edgeResistance: 0.85,
    onPressInit: () => {
      if (window.lenis) window.lenis.stop()
    },
    onDrag: syncTrackPosition,
    onThrowUpdate: syncTrackPosition,
    onRelease: () => {
      if (window.lenis) window.lenis.start()
    },
    onThrowComplete: () => {
      if (window.lenis) window.lenis.start()
    },
  })[0]
}

const handleResize = () => {
  if (resizeFrame) cancelAnimationFrame(resizeFrame)

  resizeFrame = requestAnimationFrame(() => {
    setupDraggable()
  })
}

onMounted(() => {
  ctx = gsap.context(() => {
    setupDraggable()
    window.addEventListener('resize', handleResize)
  }, scrollSection.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeFrame) cancelAnimationFrame(resizeFrame)
  if (draggable) draggable.kill()
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="scrollSection" class="horizontal-scroll-section item-section">
    <div class="sticky-viewport">
      <div class="intro-box">
        <div class="text-h2 text-bold text-white text-title">Products</div>
        <div class="text-subtitle1 text-grey-4">Drag left or right to explore</div>
      </div>

      <div class="track-shell">
        <div ref="raceTrack" class="race-track">
          <div
            v-for="(card, index) in loopedProducts"
            :key="`${card.id}-${index}`"
            class="card-item-wrapper"
          >
            <q-card class="my-quasar-card text-white">
              <q-img :src="card.imgUrl" :alt="card.name" class="card-img">
                <div class="absolute-bottom text-subtitle2 text-center">
                  {{ card.name }}
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.item-section {
  width: 100%;
  background-image: url('src/assets/imgs/background/celeb/cel04.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.horizontal-scroll-section {
  width: 100%;
  background-color: #111;
}

.sticky-viewport {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 5vw;
  padding: 0 6vw;
}

.intro-box {
  width: 280px;
  flex-shrink: 0;
  font-family: 'Lobster', sans-serif;

  .text-title {
    font-size: clamp(3rem, 6vw, 6rem);
    line-height: 0.9;
    margin-bottom: 1rem;
  }
}

/* The mask is applied to the whole track shell so the items themselves fade out naturally. */
.track-shell {
  position: relative;
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

.track-shell {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.race-track {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  align-items: center;
  will-change: transform;
  cursor: grab;
}

.race-track:active {
  cursor: grabbing;
}

.card-item-wrapper {
  flex-shrink: 0;
  margin-right: 18px;
}

.my-quasar-card {
  width: 190px;
  min-height: 200px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 200px;
  display: block;
}

@media (max-width: 1024px) {
  .sticky-viewport {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .intro-box {
    width: auto;
    .text-title {
      font-size: 5em;
    }
  }

  .track-shell {
    width: calc(100vw - 3rem);
  }

  .my-quasar-card {
    width: 165px;
    min-height: 200px;
  }

  .card-item-wrapper {
    margin-right: 14px;
  }
}

@media (max-width: 600px) {
  .track-shell {
    width: calc(100vw - 2rem);
  }

  .my-quasar-card {
    width: 145px;
    min-height: 150px;
  }

  .card-img {
    height: 160px;
  }

  .intro-box {
    .text-title {
      font-size: 5em;
    }
  }
}
</style>
