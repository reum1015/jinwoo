<template>
  <q-layout>
  <q-header elevated class="bg-white text-dark shadow-sm">
    <q-toolbar class="q-py-sm">
      <q-btn flat round dense icon="logo" class="q-mr-lg">
        <span class="text-h6 font-bold text-positive">Mistral</span>
      </q-btn>

      <div class="row items-center q-gutter-md q-hidden-xs">
        <!-- Products 버튼 -->
        <div class="relative-position">
          <q-btn
            flat
            no-caps
            label="Products"
            color="positive"
            class="text-weight-medium no-hover-btn"
            @mouseenter="menuProducts = true"
            @mouseleave="menuProducts = false"
            icon-right="arrow_drop_down"
          >
            <q-menu
              v-model="menuProducts"
              :offset="[0, 10]"
              auto-close
              hover
              anchor="bottom left"
              self="top left"
            >
              <q-list style="min-width: 200px">
                <q-item clickable v-ripple>
                  <q-item-section avatar><q-icon name="smart_toy" /></q-item-section>
                  <q-item-section>
                    <q-item-label>Le Chat</q-item-label>
                    <q-item-label caption>대화형 AI</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <!-- 다른 버튼들 -->
        <q-btn flat no-caps label="Solutions" color="positive" class="text-weight-medium no-hover-btn" />
        <q-btn flat no-caps label="Developers" color="positive" class="text-weight-medium no-hover-btn" />
        <q-btn flat no-caps label="Pricing" color="positive" class="text-weight-medium no-hover-btn" />
        <q-btn flat no-caps label="Company" color="positive" class="text-weight-medium no-hover-btn" />
      </div>

      <div class="row items-center q-ml-auto q-gutter-sm">
        <q-btn flat no-caps label="Log in" color="positive" class="text-weight-medium no-hover-btn" />
        <q-btn unelevated no-caps label="Sign up" color="positive" class="text-weight-medium q-px-md" />
      </div>
    </q-toolbar>
  </q-header>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
const menuProducts = ref(false);
</script>

<style scoped>
/* no-hover-btn 클래스를 q-btn 에 적용 */
.no-hover-btn {
  /* 기본 배경색 제거 (flat 버튼이므로 이미 투명해야 함) */
  background-color: transparent !important;
}

/* :deep() 을 사용하여 q-btn 내부의 모든 요소 (hover, focus, active 상태) 의 배경색을 투명하게 강제 */
:deep(.no-hover-btn:hover),
:deep(.no-hover-btn:focus),
:deep(.no-hover-btn:active),
:deep(.no-hover-btn.q-btn--flat:hover),
:deep(.no-hover-btn.q-btn--flat:focus),
:deep(.no-hover-btn.q-btn--flat:active) {
  background-color: transparent !important;
  box-shadow: none !important; /* 호버 시 그림자 제거 */
  outline: none !important; /* 포커스 링 제거 (선택 사항) */
}

/* 호버 시 텍스트 색상만 변경 (배경색은 그대로 투명) */
:deep(.no-hover-btn:hover) {
  color: #0055ff; /* Mistral 블루 색상 */
}

/* 활성화 상태 (현재 페이지) 색상 유지 */
:deep(.no-hover-btn.q-btn--active) {
  color: #0055ff;
  background-color: transparent !important;
}
</style>
