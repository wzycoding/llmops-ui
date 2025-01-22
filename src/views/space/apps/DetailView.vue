<script setup lang="ts">
import { get } from '@/utils/request.ts'

async function debug() {
  const appId = '227ecfad-4014-4776-88d6-719c07fc5090'
  const response = await get(`/app/${appId}`)
  console.log(response)
}
</script>

<template>
  <a-button @click="debug">发起请求</a-button>
</template>

<style scoped></style>
