<template>
  <div class="header">
    <header-nav>
      <template #firstItem>
        <img :src="logo" alt="图片不存在" width="50px" />
        首页
      </template>
    </header-nav>
    <ProfileBanner></ProfileBanner>
  </div>
  <div class="mainlayout">
    <ProfileOption />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderNav from '../components/HeaderNav.vue'
import logo from '@/assets/logo.png'
import ProfileBanner from './ProfileBanner.vue'
import ProfileOption from './ProfileOption.vue'
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  width: 100%;
  height: 200px; /* 固定总高度 */
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  min-width: 1200px;
  border-bottom: solid 1px var(--el-menu-border-color);
  overflow: hidden; /* 防止子组件溢出 */
}
.mainlayout {
  width: 85%;
  margin: 0 auto; /* 将容器水平居中 */
  min-width: 1200px; /* 建议加一个最小宽度，防止屏幕缩小时你的菜单挤成一团 */
  height: 200px;
}
</style>
