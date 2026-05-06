<template>
  <div class="product_dropDwon flex rounded-borders q-col-gutter-y-sm text-left">
    <!--
    <q-list>
      <div class="row">
        <div class="col-3" v-for="item in products" :key="item.id">
          <q-item clickable v-ripple dense>
            <q-item-section avatar side>
              <q-avatar rounded size="xl">
                <q-img :src="item.imgUrl" ratio="1" />
              </q-avatar>
            </q-item-section>
            <q-item-section>

              <q-item-label class="text-no-wrap">{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-list>
    -->

    <QlistCard></QlistCard>
  </div>
</template>

<script setup>
import { products } from 'src/assets/data/products.js'
import QlistCard from '../QlistCard.vue'
</script>

<style lang="scss" scoped>
.product_dropDwon {
  background: $menuDropDownColorBG;
  font-family: 'Paperozi';
  font-size: 1rem;
  position: absolute;
  top: 110%;
  left: 50%;

  transform: translate(-55%, 0);
  :last-child {
    //padding-bottom: 6px;
  }

  width: 100%;
  min-width: 800px;
}

.q_item_icon {
  color: white;
}

.q-item__section--side {
  //padding-right: 7px;
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
}
</style>
