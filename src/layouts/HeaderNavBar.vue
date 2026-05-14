<template>
  <q-toolbar class="top_bar flex justify-between align-center">
    <div class="row flex-center no-wrap full-height" style="width: 100%">
      <!-- 로고 -->
      <div class="logo_box flex flex-center col-3 col-md-3 full-height">
        <router-link to="/">
          <q-img src="~assets/imgs/logo/fedex.png" class="main_logo flex align-center" alt="logo"
        /></router-link>
      </div>
      <!-- 로고 End.-->
      <!--메인 메뉴 -->
      <div class="flex flex-center col-6 col-md-6 main_menu full-height"
           :class="{ 'disable-hover': isNavigating }">
        <ul class="row flex-center q-pa-none q-ma-none text-h6 text-bold full-height">
          <li class="col">
            <q-btn
              :color="$route.path === '/' ? 'primary' : 'white'"
              :class="{ 'text-weight-bolder': $route.path === '/'}"
              flat
              no-caps
              label="Home"
              class="menu_items"
              :to="{ path: '/' }"
              :ripple="false"
            />
          </li>
          <li class="col list_item" @mouseenter="isAbout = true" @mouseleave="isAbout = false">
            <transition name="slide-fade">
              <AboutDropDown v-show="isAbout"></AboutDropDown>
            </transition>
            <q-btn
              :color="$route.path === '/about' ? 'primary' : 'white'"
              :class="{ 'text-weight-bolder': $route.path === '/about'}"
              flat
              no-caps
              label="About"
              class="menu_items"
              :to="{ name: 'About' }"
              :ripple="false"
            />
          </li>

          <!-- Prodyct List  -->
          <li class="col" @mouseenter="isProduct = true" @mouseleave="isProduct = false">
            <transition name="slide-fade">
              <ProductDropDown v-show="isProduct"></ProductDropDown>
            </transition>
            <q-btn
              :color="$route.path === '/products' ? 'primary' : 'white'"
              :class="{ 'text-weight-bolder': $route.path === '/products'}"
              flat
              no-caps
              label="Products"
              class="menu_items"
              :to="{ name: 'Products' }"
              :ripple="false"
            />
          </li>

          <!-- Contact List-->
          <li class="col" @mouseenter="isContact = true" @mouseleave="isContact = false">
            <transition name="slide-fade">
              <ContactDropDown v-show="isContact"></ContactDropDown>
            </transition>
            <q-btn
              :color="$route.path === '/service' ? 'primary' : 'white'"
              :class="{ 'text-weight-bolder': $route.path === '/service' }"
              flat
              no-caps
              label="Service"
              class="menu_items"
              :to="{ name: 'Service' }"
              :ripple="false"
            />
          </li>
        </ul>
      </div>
      <!--메인 메뉴  End.-->
      <!-- 검색, 언어선택 -->
      <div class="top_bar_right flex flex-center no-wrap col-3 col-md-3 full-height">
        <div class="search_box">
          <q-input
            class="gt-xs"
            filled
            dense
            type="search"
            label="search"
            bg-color="transparent"
            input-class="text-white"
            color="white"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>


        <!-- Hamburger Menu -->
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

        <!--  language Select-->
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
            <q-menu fit transition-show="rotate" transition-hide="rotate">
              <q-list style="min-width: 100px" dense>
                <q-item clickable>
                  <q-item-section>English</q-item-section>
                </q-item>
                <q-separator />
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
            anchor="top middle"
            self="center middle"
            class="bg-grey-8 text-body3"
            v-if="$q.screen.width > 600"
            :offset="[10, 10]"
          >
            Translate
          </q-tooltip>
        </div>
      </div>
      <!-- 검색, 언어선택 End. -->
    </div>
    <!--row End. -->
  </q-toolbar>

  <q-drawer
    side="right"
    v-model="leftDrawerOpen"
    bordered
    overlay
    rounded-borders
    :animation-duration="2000"
  >
    <q-list>
      <q-item-label header> Essential Links </q-item-label>

      <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<script setup>
import {ref} from 'vue'
import EssentialLink from 'src/components/EssentialLink.vue'
import AboutDropDown from 'src/components/dropDownMenus/AboutDropDown.vue'
import ContactDropDown from 'src/components/dropDownMenus/ContactDropDown.vue'
import ProductDropDown from 'src/components/dropDownMenus/ProductDropDown.vue'

import {useQuasar} from 'quasar'
import {useRouter} from 'vue-router'

const isAbout = ref(false)
const isContact = ref(false)
const isProduct = ref(false)

const isNavigating = ref(false) // 이동 중인지 체크하는 변수


const $q = useQuasar()

const router = useRouter();
router.afterEach(() => {
  isAbout.value = false
  isContact.value = false
  isProduct.value = false

  // 이동 직후 클래스 추가
  isNavigating.value = true

  // 500ms(애니메이션 시간 고려) 후에 다시 호버가 작동하도록 잠금 해제
  setTimeout(() => {
    isNavigating.value = false
  }, 1000)
})

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

<style scoped lang="scss">
.active {
  color: $mainColor;
}

.top_bar {
  height: $top_bar_height;
  border-width: 0 0 1px;
  border-color: rgba(237, 239, 241, 0.2);
  border-style: solid;

  .logo_box {
    padding-right: 50px;

    .main_logo {
      min-width: 100px;
    }
  }
}

.main_menu {
  > ul {
    display: flex;
    //padding-right: 3rem;
    width: 70%;
    > li {
      width: 100%;
      display: flex;
      height: 100%;
      padding: 5px 20px 0px 20px;
      letter-spacing: -0.3px;
      position: relative;

      &:hover .menu_items {
        color: $mainColor !important;
      }
    }
  }

  /** 메뉴 호버시 메뉴색 변경 */
  .menu_items {
    height: 100%;
    font-size: 20px;
    letter-spacing: -1px;
    //font-weight: 600;
    color: $mainMenuColor;
    transition: all 0.4s ease-in-out;
  }
}

/* active 상태(현재 페이지)일 때 효과 */
.text-weight-bolder {
  transform: scale(1.05); /* 살짝 커지면서 강조됨 */
  font-weight: 700; /* 두께는 그대로 두되 scale로 시각적 효과 부여 */
}

/* style 섹션 하단에 추가 */
.disable-hover {
  pointer-events: none !important; /* 마우스 인식을 강제로 끔 */
}


/** <q-btn> hover 배경색 변경 */
:deep(.menu_items) {
  &:hover .q-focus-helper {
    background: transparent !important;
    opacity: 0 !important;
  }
}
// :deep(.list_item) {
//   &:hover .menu_items {
//     color: dodgerblue;
//   }
// }

/** 메뉴바 오른쪽 영역 */
.top_bar_right {
  padding-right: 20px;
  /** 검색창 너비 */
  .search_box {
    max-width: 200px;
  }
}
/** 검색창 텍스트 변경  */
:deep(.q-field__label) {
  font-size: 14px;
  letter-spacing: -1px;
}

/**사이드 바(q-drawer) 나타나고 사라지는 효과 적용 */
:deep(.q-drawer),
:deep(.q-drawer__backdrop) {
  transition: all 0.5s cubic-bezier(0.73, 0.17, 0.61, 1.01) !important;
}

.color-black{
  color : black !important;
}

/* --- 여기서부터 핵심 애니메이션 --- */

/* 나타날 때와 사라질 때의 속도/곡선 정의 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

/* 시작 상태와 끝 상태 (살짝 아래에서 위로 올라오며 투명도 조절) */
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/**태블릿 사이즈 */
@media (max-width: 1024px) {
  .menu_items {
    font-size: 14px !important;
  }

  .top_bar .logo_box {
    padding-right: 0px;
  }

  .main_menu {
    ul {
      margin-right: 100px;
    }

    &:last-child {
      padding-left: 30px;
    }
  }
}

/**모바일 사이즈 */
@media (max-width: 600px) {
  .main_menu {
    display: none;
  }
  .top_bar {
    border: none;
    > div {
      justify-content: space-between;
    }
    .logo_box {
      justify-content: start;
    }
    .top_bar_right {
      justify-content: end;
      padding-right: 0px;
    }
  }
}
</style>
