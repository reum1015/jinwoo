<template>
  <q-header reveal class="top_bar_wrapper">
    <q-toolbar class="top_bar flex justify-between align-center">
      <div class="row flex-center" style="width: 100%">
        <div class="logo_box flex flex-center col-3">
          <router-link to="/">
            <q-img src="~assets/imgs/logo/fedex.png" class="main_logo flex align-center" alt="logo"
          /></router-link>
        </div>
        <div class="flex flex-center col-6 main_menu">
          <ul class="flex flex-center q-pa-none q-ma-none text-h6 text-bold full-height no-wrap">
            <li>Home</li>
            <li>About</li>
            <li>Product</li>
            <li>Contact</li>
          </ul>

          <!-- -->
          <div class="q-pa-md" style="display: none">
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
              class="gt-xs"
              filled
              dense
              type="search"
              label="search"
              bg-color="transparent"
              input-class="text-white"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="menu_box">
            <q-btn
              class="lt-sm"
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
            <q-tooltip
              anchor="center right"
              self="center left"
              class="bg-grey-8 text-body2"
              v-if="$q.screen.width > 600"
              :offset="[10, 10]"
            >
              Translate
            </q-tooltip>
          </div>
        </div>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer side="right" v-model="leftDrawerOpen" show-if-above bordered class="my-drawer" overlay>
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
  height: $top_bar_height;
  border-width: 0 0 1px;
  border-color: rgba(237, 239, 241, 0.2);
  border-style: solid;

  .logo_box {
    .main_logo {
      padding-left: 10px;
      min-width: 70px;
    }
  }
}

.main_menu {
  > ul {
    list-style-type: none;
    > li {
      padding: 0 20px;
      letter-spacing: -0.3px;
      font-size: 1.3vw;
    }
  }
}

.search_box {
  max-width: 200px;
}

/** input label style  */
:deep(.q-field__label) {
  font-size: 18px;
  letter-spacing: -1px;
}

/**사이드 바(q-drawer) 나타나고 사라지는 효과 적용 */
:deep(.q-drawer),
:deep(.q-drawer__backdrop) {
  transition: all 0.7s cubic-bezier(0.73, 0.17, 0.61, 1.01) !important;
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

/**모바일 사이즈 정의 */
@media (max-width: 600px) {
  .logo_box {
    justify-content: start;
  }
  .top_bar_right {
    justify-content: end;
  }
  .main_menu {
    display: none;
  }
  .top_bar {
    > div {
      justify-content: space-between;
    }
  }
  .top_bar {
    border: none;
  }
}
</style>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

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
</script>
