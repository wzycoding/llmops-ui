import { defineStore } from 'pinia'
import { ref } from 'vue'

const initAccount = {
  name: '慕小课',
  email: 'imooc@163.com',
  avatar: '',
}

export const userAccountStore = defineStore('account', () => {
  // 1、定义数据
  const account = ref({ ...initAccount })

  // 2、计算属性
  function update(params: any) {
    // 传递不是完整数据时，只部分更新属性
    Object.assign(account.value, params)
  }

  function clear() {
    account.value = { ...initAccount }
  }

  return { account, update, clear }
})
