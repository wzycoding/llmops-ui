<template>
  <div class="about">
    <h1>This is an about page得到的111</h1>
    <a-button type="primary">注册登录</a-button>
    <a-avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </a-avatar>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
