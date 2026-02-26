<template>
  <div class="banner">
    <el-menu
      :default-active="activeIndex"
      class="left-menu"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="ProfileHome"
        ><el-icon><House /></el-icon>主页</el-menu-item
      >
      <el-menu-item index="ProfileOther">动态</el-menu-item>
      <el-menu-item index="ProfileOther2">投稿</el-menu-item>
      <el-menu-item index="ProfileOther3">合集和系列</el-menu-item>
      <el-menu-item index="ProfileOther4">收藏</el-menu-item>
      <el-menu-item index="ProfileOther5">追番追剧</el-menu-item>
      <el-menu-item index="ProfileOther6">设置</el-menu-item>

      <div class="search-wrapper">
        <el-input
          v-model="input3"
          class="search-input"
          size="small"
          placeholder="搜索视频、动态"
          :suffix-icon="Search"
        />
      </div>
    </el-menu>

    <div class="user-stats">
      <div class="stat-item">
        <span class="label">关注数</span>
        <span class="value">15</span>
      </div>
      <div class="stat-item">
        <span class="label">粉丝数</span>
        <span class="value">2</span>
      </div>
      <div class="stat-item">
        <span class="label">获赞数</span>
        <span class="value">0</span>
      </div>
      <div class="stat-item">
        <span class="label">播放数</span>
        <span class="value">0</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')

import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const input3 = ref('')

const handleSelect = (name) => {
  router.push({ name })
}
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* B站二级菜单背景通常是白色 */
  padding: 0 10px;
}

.left-menu {
  border-bottom: none !important;
  flex: 1; /* 占据左侧所有空间 */
  display: flex;
  align-items: center;
}

/* 核心：压缩菜单项的间距 */
:deep(.el-menu-item) {
  padding: 0 12px !important; /* 缩小内边距 */
  height: 50px;
  line-height: 50px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.search-input {
  width: 160px; /* 缩小搜索框，防止撑破 */
  transition: width 0.3s;
}
.search-input:focus-within {
  width: 200px; /* 聚焦时稍微变长 */
}

/* 右侧统计栏样式 */
.user-stats {
  display: flex;
  gap: 20px;
  padding-right: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
}

.stat-item .value {
  color: #222;
  font-size: 14px;
  margin-top: 2px;
}
</style>
