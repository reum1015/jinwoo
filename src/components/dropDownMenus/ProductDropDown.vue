<template>
  <div class="product_dropDown flex q-pa-sm rounded-borders">
    <!--
    <q-list>
      <div class="row justify-center wrap q-gutter-y-md">
        <div class="col-3" v-for="item in products" :key="item.id">
          <q-item clickable dense class="q_item">
            <q-item-section avatar side>
              <q-avatar rounded size="xl" class="q_img">
                <q-img :src="item.imgUrl" ratio="1" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-no-wrap item_title">{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-list>
    -->
    <div class="full-width flex justify-center">
      <!-- 부모가 자식을 중앙으로 밀어줌 -->
      <div class="product_grid">
        <q-item v-for="item in products" :key="item.id" clickable dense class="q_item my-item">
          <q-item-section avatar side>
            <q-avatar rounded size="xl" class="q_img">
              <q-img :src="item.imgUrl" ratio="1" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-no-wrap item_title">{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import {products} from 'src/assets/data/products'
</script>

<style lang="scss" scoped>
.product_dropDown {
  background: $menuDropDownColorBG;
  font-family: 'Paperozi';
  font-size: 1rem;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-60%, 0);
  :last-child {
    //padding-bottom: 6px;
  }
}

.q-item__section--side {
  padding-right: 7px;
}

.item_title {
  font-size: 12px;
}

:deep(.q_item) {
  &:hover {
    color: $mainColor;
    //text-shadow: 3px 4px 3px rgba(69, 153, 217, 0.61);
  }
  &:hover .q-focus-helper {
    background: transparent !important;
    opacity: 0 !important;
  }

  &:hover .q_img {
    opacity: 1;
  }
}

.product_grid {
  display: grid;
  /* 가로로 4개 고정, 각 너비는 동일하게 */
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 70px;
  gap: 5px; /* 아이템 사이 간격 */
  width: 100%; /* 부모 너비에 맞춤 */
  padding: 2px;
  height: 100%;
}

/* 마지막 행에 속한 아이템들만 선택 (예: 아이템이 3열일 때) */
.my-item:nth-last-child(-n+3) {
  //height: 50px;
}

.my-item {
  border-radius: 8px;
}

/**
.my-card {
  width: 100%;
  max-width: 120px;

  .item_title {
    padding: 0;
    background-color: black;
  }

  transition: transform 0.2s;
  &:hover {
    transform: scale(-5px); // 살짝 떠오르는 효과
    //box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  }
}
  */
</style>
