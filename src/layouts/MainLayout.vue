<template>
  <q-layout view="lHh Lff lFf" class="main_layout">
    <!-- 스크롤 감지 컴포넌트 -->
    <q-scroll-observer @scroll="onScroll" />
    <!-- 헤더에 동적 클래스 부여 -->
    <q-header flat :class="headerClass" class="fixed-top">
      <HeaderNavBar />
    </q-header>
    <q-page-container class="main-page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderNavBar from 'layouts/HeaderNavBar.vue'

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)

// 스크롤 위치 감지 함수
const onScroll = (info) => {
  isScrolled.value = info.position.top > 50 // 50px 이상 내려오면 true
}

// 헤더 클래스 동적 계산
const headerClass = computed(() => {
  const isMain = route.path === '/' // 현재 메인 페이지인지 확인

  if (isMain) {
    // 메인 페이지일 때: 스크롤 여부에 따라 투명 또는 회색
    return isScrolled.value ? 'bg-grey-9-transparent text-black' : 'bg-transparent text-red'
  } else {
    // 메인 페이지가 아닐 때: 무조건 회색 고정
    return 'bg-grey-9-transparent'
  }
})

//만약 특정 버튼만 색상이 안 바뀐다면, 해당 버튼에 :class="isScrolled ? 'text-amber' : 'text-white'"를 직접 바인딩하는 방법도 있습니다. (이 경우 isScrolled 변수를 props로 넘겨줘야 합니다.)
</script>
<style scoped lang="scss">
.absolute-top {
}
.main-page-container {
  padding-top: 0 !important;
}

// 투명도 있는 회색 배경 클래스
.bg-grey-9-transparent {
  background-color: rgba(33, 33, 33, 0.2) !important; // 회색 + 80% 투명도
  backdrop-filter: blur(5px); // 뒤가 살짝 비치는 유리효과 (선택)
  transition: background-color 0.3s; // 부드러운 변화
}

.bg-transparent {
  background-color: transparent !important;
  transition: background-color 0.3s;
}
</style>
