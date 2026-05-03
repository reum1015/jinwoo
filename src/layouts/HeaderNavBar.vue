<template>
  <q-header reveal class="top_bar_wrapper">
    <q-toolbar class="top_bar flex justify-between align-center">
      <div class="row flex-center" style="width: 100%">
        <div class="logo_box flex col-3">
          <router-link to="/">
            <q-img src="~assets/imgs/logo/fedex.png" class="main_logo flex align-center" alt="logo"
          /></router-link>
        </div>
        <div class="flex flex-center col-6 main_menu">
          <ul class="flex flex-center q-pa-none q-ma-none">
            <li>
              <div class="q-pa-md">
                <div class="q-gutter-md">
                  <q-btn
                    class="about_button"
                    :ripple="false"
                    flat
                    label="Fit Menu"
                    style="width: 150px"
                  >
                    <q-menu fit>
                      <q-list style="min-width: 100px">
                        <q-item clickable>
                          <q-item-section>New tab</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>New incognito tab</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable>
                          <q-item-section>Recent tabs</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>History</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Downloads</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable>
                          <q-item-section>Settings</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable>
                          <q-item-section>Help &amp; Feedback</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </li>
            <li>
              <q-btn color="primary" label="Rotate Menu">
                <q-menu transition-show="rotate" transition-hide="rotate">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Having fun</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Crazy for transitions</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                      <q-item-section>Mind blown</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </li>
            <li>Product</li>
            <li>Contact</li>
          </ul>

          <!-- -->
          <div class="q-pa-md">
            <!-- 메뉴와 버튼을 감싸는 컨테이너에 이벤트를 등록합니다 -->
            <div
              @mouseenter="menuVisible = true"
              @mouseleave="menuVisible = false"
              class="inline-block"
            >
              <q-btn color="primary" label="마우스 오버 메뉴">
                <!-- v-model로 메뉴의 노출 상태를 동기화합니다 -->
                <q-menu v-model="menuVisible">
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section>메뉴 1</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>메뉴 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>

          <!-- -->
          <div class="q-pa-md">
            <div class="menu-wrapper">
              <!-- 버튼 -->
              <q-btn color="primary" label="부드러운 메뉴" />

              <!-- 애니메이션이 적용될 메뉴 영역 -->
              <div class="custom-menu-animated">
                <q-list bordered class="bg-grey-5 shadow-2 rounded-borders">
                  <q-item clickable v-ripple>
                    <q-item-section>프로필 수정</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>설정</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-ripple class="text-red">
                    <q-item-section>로그아웃</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>

          <!-- -->
        </div>
        <div class="top_bar_right flex flex-center no-wrap col-3">
          <div class="search_box">
            <q-input
              class="gt-sm"
              v-model="search"
              filled
              type="search"
              dense
              label="search"
              bg-color="transparent"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="menu_box">
            <q-btn
              class="lt-md"
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />
          </div>

          <div class="lang_box">
            <q-btn
              class="btn"
              dense
              icon="language"
              aria-label="language"
              bg-color="transparent"
              flat
              round
              unelevated
              fab
              color="black"
            >
              <q-menu fit>
                <q-list style="min-width: 100px" dense>
                  <q-item clickable>
                    <q-item-section>English</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Korean</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Chinese</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-tooltip anchor="center left" self="center end"> Translate </q-tooltip>
          </div>
        </div>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer behavior="mobile" side="right" v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header> Essential Links </q-item-label>

      <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<style scoped lang="scss">
.top_bar_wrapper {
  background-color: transparent;
}
.top_bar {
}

.logo_box {
  justify-content: start;
  .main_logo {
    padding-left: 10px;
    min-width: 70px;
  }
}

.main_menu {
  > ul {
    height: 100%;
    list-style-type: none;
    > li {
      > div {
        height: 100%;
      }
    }
  }
}

.top_bar_right {
  justify-content: end;
}

.search_box {
  max-width: 200px;
}

.inline-block {
  display: inline-block;
}

.menu-wrapper {
  position: relative;
  display: inline-block;

  /* 1. 호버 시 하위 메뉴 스타일 변경 */
  &:hover .custom-menu-animated {
    opacity: 1;
    visibility: visible;
    transform: translateX(0); /* 제자리로 이동 */
  }
}

.custom-menu-animated {
  /* 2. 초기 상태: 숨김 및 위치 아래로 살짝 내림 */
  opacity: 0;
  visibility: hidden;
  transform: translateX(50px);

  /* 3. 부드러운 전환 효과 설정 */
  transition: all 0.3s ease;

  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  z-index: 1000;
  padding-top: 8px; /* 버튼과 메뉴 사이 마우스 통로 확보 */
}

.q-focus-helper:hover {
  opacity: 0 !important;
  background-color: transparent !important;
}

.q-focus-helper--focus {
  background: red !important;
  opacity: 0.2 !important;
}
</style>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { ref } from 'vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const menuVisible = ref(false)
</script>
