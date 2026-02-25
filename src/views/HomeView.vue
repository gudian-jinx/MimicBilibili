<template>
  <div class="mainlayoutt">
    <div class="header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon><Monitor /></el-icon>首页
        </el-menu-item>
        <el-menu-item index="2"> 番剧 </el-menu-item>
        <el-menu-item index="3"> 直播 </el-menu-item>
        <el-menu-item index="4"> 游戏中心 </el-menu-item>
        <el-menu-item index="5"> 会员购 </el-menu-item>
        <el-menu-item index="6"> 漫画 </el-menu-item>
        <el-menu-item index="7"> 赛事 </el-menu-item>
        <el-menu-item index="8"> 新春会 </el-menu-item>
        <el-menu-item index="9">
          <el-icon><Download /></el-icon>下载客户端
        </el-menu-item>
        <el-menu-item index="10" style="flex-grow: 2; max-width: 300px">
          <el-input
            v-model="input1"
            style="width: 100%"
            size="large"
            placeholder="Please Input"
            :suffix-icon="Search"
          />
        </el-menu-item>
        <el-menu-item>
          <el-avatar :src="urlAvatar" />
        </el-menu-item>
        <el-menu-item>
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
            <span>大会员</span>
          </div>
        </el-menu-item>
        <el-menu-item>
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
            <span>消息</span>
          </div>
        </el-menu-item>
        <el-menu-item>
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
        </el-menu-item>
        <el-menu-item>
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
            <span>收藏</span>
          </div>
        </el-menu-item>
        <el-menu-item>
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
            <span>历史</span>
          </div>
        </el-menu-item>
        <el-menu-item>
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
            <span>创作中心</span>
          </div>
        </el-menu-item>
        <el-menu-item>
          <el-button type="danger">
            <el-icon><Tools /></el-icon>
            投稿
          </el-button>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="mainlayout">
      <div class="nav">
        <Channel />
      </div>

      <div class="content-grid">
        <div class="carousel">
          <Carousel />
        </div>

        <div v-for="(video, index) in videoList" :key="index" class="video-card">
          <el-card style="max-width: 480px">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
              </div>
            </template>
            <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
            <template #footer>Footer content</template>
          </el-card>
        </div>
      </div>
    </div>

    <div class="loading" v-if="isLoading">加载更多中...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import header from '@/assets/avatar.png'
import Bg from '@/assets/bg.png'
import Channel from './Channel.vue'
import Carousel from './Carousel.vue'
console.log(Bg)
// 初始视频列表
const videoList = ref([
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
  // ...
])

const urlAvatar = header
const urlBg = Bg
const fit = 'cover'
const isLoading = ref(false)

// 模拟触底加载更多数据
const loadMoreVideos = () => {
  isLoading.value = true
  setTimeout(() => {
    // 请求接口获取新数据，并 push 到现有数组后面
    const newData = [{ title: '新视频A' }, { title: '新视频B' }, { title: '新视频C' }]
    videoList.value.push(...newData)
    isLoading.value = false

    // CSS Grid 会自动把新追加的元素排列到下一行，完全不用动 CSS！
  }, 1000)
}

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.carousel {
  grid-column: span 2;
  grid-row: span 2;
  /* 移除背景颜色，或者保留检查 */
  background: #ffaaaa;

  /* 关键：确保内部的 Carousel 组件占满容器 */
  display: flex;
  flex-direction: column;
}

/* 穿透确保组件宽度和高度都是 100% */
.carousel > :first-child {
  width: 100%;
  height: 100%;
}
/* 强制所有菜单项可以收缩 */
:deep(.el-menu-item) {
  flex-shrink: 1; /* 允许收缩 */
  min-width: 0; /* 允许缩小到极值 */
  padding: 0 5px !important; /* 进一步压缩间距 */
  font-size: 13px; /* 稍微调小字号 */
  display: flex;
  align-items: center;
}

/* 移除鼠标悬浮时的背景色 */
:deep(.el-menu-item:hover) {
  background-color: transparent !important;
}

/* 如果你点击菜单项后，也不想要那个选中的背景色，可以加上下面这段 */
:deep(.el-menu-item.is-active) {
  background-color: transparent !important;
}
/* 针对带有图标和文字垂直排列的容器 */
.topbottom {
  flex-shrink: 1;
  min-width: 0;
}

.topbottom span {
  font-size: 14px; /* 垂直排列时文字可以更小 */
  transform: scale(0.9); /* 甚至可以用缩放 */
}

.mainlayoutt {
  width: 100%;
  margin: 0 auto;
}
.header {
  width: 100%;
  border-bottom: solid 1px var(--el-menu-border-color); /* 模拟底边线 */
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 200px;
}

.el-menu-demo {
  width: 98%; /* 只有内容区域是 80% */
  margin: 0 auto; /* 居中内容 */
  border-bottom: none !important; /* 去掉自带边框，改用 header 的边框 */
  background-color: transparent !important;
  border: none !important;
  display: flex;
  justify-content: space-between;
}
.el-menu-item {
  color: white;
}
/* 1. 缩小每个菜单项的左右内边距 */
:deep(.el-menu--horizontal > .el-menu-item) {
  padding: 0 10px; /* 将原来的 20px 缩小到 10px 或更小 */
}

/* 2. 针对带图标和文字垂直排列的特殊项，进一步压缩 */
.topbottom {
  min-width: 40px; /* 限制最小宽度 */
}

/* 3. 调整搜索框所在的 menu-item */
/* 搜索框通常不需要 padding，因为它内部已经有间距了 */
:deep(.el-menu-item:has(input)) {
  padding: 0 5px !important;
}

.mainlayout {
  width: 80%;
  margin: 0 auto; /* 将容器水平居中 */
  min-width: 1200px; /* 建议加一个最小宽度，防止屏幕缩小时你的菜单挤成一团 */
}

/* 容器规则固定：永远保持 5 列 */
.content-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

/* 特权元素：跨越 2列 2行 */
.carousel {
  grid-column: span 2;
  grid-row: span 2;
  background: #ffaaaa;
}

/* 普通元素：自动流式排列，不需要写位置 */
/* .video-card {
  height: 180px;
  background: #e0e0e0;
} */
</style>
