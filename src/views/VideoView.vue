<template>
  <div class="header dark-header">
    <header-nav />
  </div>
  <div class="video-reviews">
    <div class="videoDiv"></div>
    <div class="reviewsDiv"></div>
  </div>
</template>

<script setup>
import HeaderNav from '@/components/HeaderNav.vue'
</script>

<style scoped>
.header {
  width: 100%;
  border-bottom: solid 1px var(--el-menu-border-color); /* 模拟底边线 */
  height: 5%;
  min-width: 1200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.light-header {
  --navbar-text-color: black;
}
</style>
