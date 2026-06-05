<template>
  <q-page class="q-pt-md flex flex-center bg-dark-theme">
    <section class="category-3d-section flex flex-center">
      <div class="section-title text-center text-white q-mb-xl">
        <h2 class="text-h4 font-weight-bold">Product Categories</h2>
        <p class="text-subtitle1 opacity-70 q-mt-sm">원하시는 카테고리를 드래그하거나 클릭하세요</p>
      </div>

      <!--
        🌟 부드러운 드래그를 위해 추가된 옵션들:
        - :touch-ratio="1.5"     : 마우스/터치 드래그 민감도를 올려 조금만 밀어도 슉 넘어가게 합니다.
        - :resistance="true"     : 슬라이드 저항력을 켭니다.
        - :resistance-ratio="0"  : 경계면 저항을 없애 루프가 끊김 없이 부드럽게 이어집니다.
        - :free-mode="false"     : 스냅이 딱딱 걸리도록 하되 가속도는 유지합니다.
        - :speed="400"           : 슬라이드가 제자리로 찾아 들어가는 관성 이동 시간을 최적화(0.4초)합니다.
      -->
      <swiper
        :modules="swiperModules"
        :effect="'coverflow'"
        :grab-cursor="true"
        :centered-slides="true"
        :slides-per-view="'auto'"
        :loop="true"
        :touch-ratio="1.5"
        :resistance="true"
        :resistance-ratio="0"
        :speed="400"
        :coverflow-effect="coverflowOptions"
        class="category-swiper"
      >
        <swiper-slide v-for="item in categories" :key="item.id" class="category-slide-item">
          <q-card
            class="category-card cursor-pointer q-hoverable"
            v-ripple
            @click="onCategoryClick(item)"
          >
            <div class="card-image-box flex flex-center" :style="{ backgroundColor: item.color }">
              <q-icon :name="item.icon" size="64px" color="white" />
            </div>
            <q-card-section class="text-center bg-grey-10 text-white">
              <div class="text-subtitle1 text-weight-bold">{{ item.name }}</div>
            </q-card-section>
          </q-card>
        </swiper-slide>
      </swiper>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

const swiperModules = [EffectCoverflow]

/**
 * 🌟 3D 가속 최적화 셋팅
 * - slideShadows: false로 변경합니다.
 *   (실시간 그림자 계산이 매끄러운 60fps 드래그를 방해하는 주원인입니다.
 *    대신 CSS 입체 그림자를 먹이는 게 훨씬 부드럽습니다.)
 */
const coverflowOptions = {
  rotate: 20, // 회전각을 살짝 낮춰 왜곡 연산을 줄입니다.
  stretch: -20, // 겹침을 부드럽게 완화합니다.
  depth: 120, // 원근감을 최적화합니다.
  modifier: 1,
  slideShadows: false, // ❌ true에서 false로 변경 (성능 대폭 향상)
}

const categories = ref([
  { id: 1, name: '전자기기', icon: 'devices', color: '#ff6b6b' },
  { id: 2, name: '의류/패션', icon: 'checkroom', color: '#4dadf7' },
  { id: 3, name: '뷰티/화장품', icon: 'face', color: '#ff8787' },
  { id: 4, name: '도서/음반', icon: 'auto_stories', color: '#63e6be' },
  { id: 5, name: '가구/인테리어', icon: 'chair', color: '#ffd43b' },
  { id: 6, name: '스포츠/레저', icon: 'fitness_center', color: '#a9e34b' },
  { id: 7, name: '식품/푸드', icon: 'restaurant', color: '#ff922b' },
  { id: 8, name: '유아동용품', icon: 'child_care', color: '#da77f2' },
  { id: 9, name: '생활/주방', icon: 'flatware', color: '#20c997' },
  { id: 10, name: '반려동물', icon: 'pets', color: '#94d82d' },
  { id: 11, name: '자동차용품', icon: 'directions_car', color: '#495057' },
  { id: 12, name: '완구/게임', icon: 'sports_esports', color: '#748ffc' },
  { id: 13, name: '오피스/문구', icon: 'edit', color: '#f783ac' },
  { id: 14, name: '가전제품', icon: 'tv', color: '#22b8cf' },
])

const onCategoryClick = (category) => {
  console.log('선택한 카테고리 데이터:', category)
}
</script>

<style lang="scss" scoped>
.bg-dark-theme {
  background-color: #121214;
}

.category-3d-section {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
}

.category-swiper {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 60px;
  perspective: 1200px;
}

.category-slide-item {
  width: 260px;
  height: 320px;
  /* 🌟 하드웨어 가속(GPU) 강제 활성화 속성 추가 */
  will-change: transform;
  transform-style: preserve-3d;
}

.category-card {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  /* slideShadows를 끈 대신 선명하고 가벼운 CSS 그림자 적용 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease;

  .card-image-box {
    width: 100%;
    height: 230px;
    transition: filter 0.2s ease;
  }

  &:hover {
    .card-image-box {
      filter: brightness(1.1);
    }
  }
}
</style>
