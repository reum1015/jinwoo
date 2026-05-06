<template>
  <div>
    <h1>Test Page</h1>

    <q-img :src="product[0].imgUrl" />

    <q-avatar>
      <img :src="product[0].imgUrl" />
    </q-avatar>
  </div>
</template>

<script setup>
import { product } from 'src/assets/data/products'
</script>

<style></style>
