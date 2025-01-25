<script setup lang="ts">
import { post } from '@/utils/request.ts'

async function debug() {
  const response = await post(`/apps/710e3470-067f-4e85-be54-5552ec2c9788/debug`, {
    body: { query: '你好，你是谁' },
  })
  console.log(response)
}
</script>

<template>
  <a-button @click="debug">发起请求</a-button>
</template>

<style scoped></style>
