<script setup lang="ts">
// 1.定义交互所需的数据
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { post } from '@/utils/request.ts'

const query = ref('')
const messages = ref<any[]>([])
const isLoading = ref(false)

function clearMessages() {
  messages.value = []
}

async function send() {
  // 1.获取用户输入的数据，并校验是否存在
  if (!query.value) {
    Message.error('用户提问不能为空')
    return
  }
  // 2.当上一条请求还没有结束的时候，不允许发起新请求
  if (isLoading.value) {
    Message.warning('上一次恢复还未结束, 请稍等')
    return
  }
  // 3.提取用户的输入信息
  const humanQuery = query.value
  messages.value.push({
    role: 'human',
    content: humanQuery,
  })

  // 4.清除输入框
  query.value = ''

  // 5.发起API请求
  isLoading.value = true
  const response = await post('/apps/710e3470-067f-4e85-be54-5552ec2c9788/debug', {
    body: { query: humanQuery },
  })
  const content = response.data.content

  messages.value.push({
    role: 'ai',
    content: content,
  })
  isLoading.value = false
}
</script>

<template>
  <!-- 最外层容器，高度撑满整个浏览器屏幕 -->
  <div class="min-h-screen">
    <!-- 顶部导航 -->
    <header class="flex items-center h-[74px] bg-gray-100 border-b border-gray-200 px-4">
      顶部导航
    </header>
    <!-- 底部内容区 -->
    <div class="flex flex-row h-[calc(100vh-74px)]">
      <!-- 左侧的编排 -->
      <div class="w-2/3 bg-gray-50 h-full">
        <!--    左右边距28个像素，就可以设置成px-7  text-xl，字体大小20像素  -->
        <header class="flex items-center h-16 border-gray:200 px-7 text-xl text-gray-700">
          应用编排
        </header>
        <div class="flex flex-row h-[calc(100%-64px)]">
          <div class="flex-1 border-r border-gray-200 p-6">人设与回复逻辑</div>
          <div class="flex-1 p-6">应用能力</div>
        </div>
      </div>
      <!-- 右侧调试与预览 -->
      <div class="flex flex-col w-1/3 bg-white h-full">
        <header
          class="flex flex-shrink-0 items-center h-16 px-4 text-xl bg-white border-b border-gray-200 shadow-sm"
        >
          调试与预览
        </header>
        <!-- 调试对话页面-->
        <div class="h-full min-h-0 px-6 py-7 overflow-x-hidden overflow-y-scroll scrollbar-w-none">
          <!-- 人类消息 -->
          <div class="flex flex-row gap-2 mb-6" v-for="message in messages" :key="message.content">
            <!--     头像       -->
            <a-avatar
              v-if="message.role === 'human'"
              class="flex-shrink-0"
              :style="{ backgroundColor: '#14a9f8' }"
              :size="30"
              >慕
            </a-avatar>

            <a-avatar
              v-else
              class="flex-shrink-0"
              :style="{ backgroundColor: '#00d0b6' }"
              :size="30"
            >
              <icon-apps></icon-apps>
            </a-avatar>
            <!--     消息       -->
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">
                {{ message.role === 'human' ? '慕小课' : 'ChatGPT聊天机器人' }}
              </div>
              <div
                v-if="message.role === 'human'"
                class="max-w-max bg-blue-700 text-white border-blue-800 px-4 py-3 rounded-2xl leading-5"
              >
                {{ message.content }}
              </div>
              <div
                v-else
                class="max-w-max bg-gray-100 text-gray-900 border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                {{ message.content }}
              </div>
            </div>
          </div>
          <!--     没有任何数据时内容     -->
          <div
            v-if="!messages.length"
            class="mt-[200px] flex flex-col items-center justify-center gap-2"
          >
            <a-avatar :size="70" shape="square" :style="{ backgroundColor: '#14a9f8' }">
              <icon-apps />
            </a-avatar>
            <div class="text-2xl font-semibold text-gray-900">ChatGPT聊天机器人</div>
          </div>
          <!-- AI加载状态 -->
          <div v-if="isLoading" class="flex flex-row gap-2 mb-6">
            <!--     头像       -->
            <a-avatar class="flex-shrink-0" :style="{ backgroundColor: '#00d0b6' }" :size="30">
              <icon-apps></icon-apps>
            </a-avatar>
            <!--     消息       -->
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">ChatGPT聊天机器人</div>
              <div
                class="max-w-max bg-gray-100 text-gray-900 border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                <icon-loading />
              </div>
            </div>
          </div>
        </div>
        <!-- 调试对话输入框 -->
        <div class="w-full flex-shrink-0 flex flex-col">
          <!--     顶部输入框     -->
          <div class="px-6 flex items-center gap-4">
            <!--    清除按钮        -->
            <a-button class="flex-shrink-0" type="text" shape="circle" @click="clearMessages">
              <template #icon>
                <icon-empty :size="16" :style="{ color: '#374151' }"></icon-empty>
              </template>
            </a-button>
            <!--     输入框组件       -->
            <div
              class="h-[50px] flex items-center gap-2 px-4 flex-1 border border-gray-200 rounded-full"
            >
              <input type="text" class="flex-1 outline-0" v-model="query" @keyup.enter="send" />
              <a-button type="text" shape="circle">
                <template #icon>
                  <icon-plus-circle :size="16" :style="{ color: '#374151' }" />
                </template>
              </a-button>
              <a-button type="text" shape="circle" @click="send">
                <template #icon>
                  <icon-send :size="16" :style="{ color: '#1d4ed8' }" />
                </template>
              </a-button>
            </div>
          </div>
          <!--     底部提示文字     -->
          <div class="text-center text-gray-500 py-4">
            内容由AI生成，无法确保真实准确，仅供参考。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
