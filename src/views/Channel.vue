<template>
  <div class="channel-nav">
    <div class="left-icons">
      <div class="icon-item">
        <div
          class="topbottom"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            line-height: normal;
          "
        >
          <el-icon><Tools /></el-icon>
          <span>动态</span>
        </div>
      </div>
      <div class="icon-item">
        <div
          class="topbottom"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            line-height: normal;
          "
        >
          <el-icon><Tools /></el-icon>
          <span>热门</span>
        </div>
      </div>
    </div>

    <div class="center-channel-grid">
      <el-button style="margin: 0; padding: 0" v-for="item in channels" :key="item">{{
        item.title
      }}</el-button>
    </div>

    <div class="right-links-grid">
      <div class="link-item">
        <el-icon><Message /></el-icon> &nbsp;专栏
      </div>
      <div class="link-item">
        <el-icon><Message /></el-icon>&nbsp;活动
      </div>
      <div class="link-item">
        <el-icon><Message /></el-icon>&nbsp;社区中心
      </div>
      <div class="link-item">
        <el-icon><Message /></el-icon>&nbsp;直播
      </div>
      <div class="link-item">
        <el-icon><Message /></el-icon>&nbsp;课堂
      </div>
      <div class="link-item">
        <el-icon><Message /></el-icon> &nbsp;新歌热榜
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const channels = ref([
  { title: '视频1' },
  { title: '视频2' },
  { title: '视频3' },
  { title: '视频4' },
  { title: '视频5' },
  { title: '视频6' },
  { title: '视频4' },
  { title: '视频5' },
  { title: '视频6' },
  { title: '视频4' },
  { title: '视频5' },
  { title: '视频6' },
  // ...
])
</script>

<style scoped>
.left-icons {
  display: flex;
  justify-content: space-between;
  gap: 2vw 2vh;
}
.channel-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  width: 100%; /* 或者 80% 配合 margin: 0 auto */
}

/* 中间按钮区域：2行排列的关键 */
.center-channel-grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr); /* 强制两行 */
  grid-auto-flow: column; /* 自动按列填充，保证顺序 */
  grid-column-gap: 8px;
  grid-row-gap: 10px;
  flex: 1; /* 占据剩余空间 */
}

/* 右侧链接区域 */
.right-links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列排列 */
  gap: 15px;
  padding-left: 20px;
  border-left: 1px solid #e3e5e7; /* 那个垂直分割线 */
}

/* 单个按钮微调 */
.el-button {
  height: 28px;
  padding: 0 12px;
  border-radius: 6px;
  background-color: #f6f7f8;
  border: none;
}
</style>
