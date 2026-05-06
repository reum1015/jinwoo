<template>
  <!-- 가로 배치를 위한 row. q-col-gutter는 카드 사이의 간격을 조절합니다. -->
  <div class="row q-col-gutter-sm">
    <!-- v-for로 13개의 데이터를 반복합니다. -->
    <!-- col-12(모바일 1개), col-sm-6(태블릿 2개), col-md-3(PC 4개) -->
    <div v-for="item in products" :key="item.id" class="col-6 col-sm-4 col-md-2">
      <!-- @click 대신 'to' 속성을 쓰면 자동으로 링크(<a> 태그) 역할을 합니다. -->
      <!-- '/product/1' 같은 형식으로 이동한다고 가정합니다. -->
      <q-card
        flat
        bordered
        class="my-card cursor-pointer q-hoverable"
        v-ripple
        :to="`/product/${item.id}`"
      >
        <span class="q-focus-helper"></span>

        <!-- 이미지 영역: ratio="1"로 정사각형 유지 -->
        <q-img :src="item.imgUrl" :ratio="1">
          <div class="absolute-bottom text-subtitle2 text-center">
            {{ item.name }}
          </div>
        </q-img>

        <q-card-actions align="right">
          <q-btn flat color="primary" label="자세히 보기" icon-right="chevron_right" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
// 아까 만든 products 데이터를 가져옵니다.
import { products } from 'src/assets/data/products.js'
</script>

<style lang="scss" scoped>
.my-card {
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px); // 살짝 떠오르는 효과
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  }
}
</style>
