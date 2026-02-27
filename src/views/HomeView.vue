<template>
  <div class="header">
    <header-nav />
  </div>

  <div class="mainlayout">
    <div class="nav">
      <Channel />
    </div>

    <div class="content-grid">
      <div class="carousel">
        <el-skeleton :loading="isLoading" animated>
          <template #template>
            <el-skeleton-item variant="image" />
          </template>
          <template #default>
            <Carousel :imgList="carouselList" />
          </template>
        </el-skeleton>
      </div>

      <template v-if="isLoading">
        <div v-for="i in 10" :key="'skeleton-' + i" class="video-card">
          <el-card>
            <el-skeleton animated>
              <template #template>
                <el-skeleton-item variant="image" style="width: 100%; height: 150px" />
                <div style="padding: 14px">
                  <el-skeleton-item variant="h3" style="width: 80%" />
                  <el-skeleton-item variant="text" style="margin-top: 10px" />
                  <el-skeleton-item variant="text" style="width: 60%; margin-top: 5px" />
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </div>
      </template>

      <template v-else>
        <div v-for="item in dataList" :key="item.id" class="video-card">
          <VideoCard :videoData="item" />
        </div>
      </template>
    </div>
  </div>

  <!-- 无限滚动 -->
  <div v-if="loadingMore" class="loading-more">加载中...</div>

  <div ref="loadMoreRef" class="load-more-trigger" v-if="hasMore"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import axios from 'axios'
// 组件导入
import Channel from './Channel.vue'
import Carousel from '../components/Carousel.vue'
import HeaderNav from '../components/HeaderNav.vue'
import VideoCard from '../components/VideoCard.vue'

/* ========= 状态 ========= */

const dataList = ref([]) // 初始化为数组
const carouselList = ref([])
const isLoading = ref(true) // 初始骨架屏状态

/* 无限滚动核心状态 */
const page = ref(0)
const limit = 10
const hasMore = ref(true)
const loadingMore = ref(false)

/* 哨兵 */
const loadMoreRef = ref(null)
let observer = null

// 获取商品数据
const fetchData = async () => {
  if (!hasMore.value || loadingMore.value) return

  loadingMore.value = true

  try {
    const skip = page.value * limit
    const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)

    const list = res.data.products

    if (list.length < limit) {
      hasMore.value = false
    }

    dataList.value.push(...list)
    page.value++
  } catch (err) {
    console.error('分页加载失败', err)
  } finally {
    loadingMore.value = false
  }
}

// 获取轮播图（猫咪）数据
const fetchCarousel = async () => {
  try {
    const res = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5')
    // 强制截取 5 张，防止 API 抽风返回 10 张
    carouselList.value = res.data.slice(0, 5)
  } catch (err) {
    console.error('猫咪获取失败:', err)
  }
}

// 初始化页面：确保两个请求都尝试完成后再关闭骨架屏
const initPage = async () => {
  isLoading.value = true

  try {
    await Promise.all([fetchData(), fetchCarousel()])
  } finally {
    setTimeout(() => {
      isLoading.value = false
      nextTick(setupObserver)
    }, 800)
  }
}

/* ========= 哨兵监听 ========= */

const setupObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchData()
      }
    },
    {
      root: null,
      rootMargin: '200px', // 提前加载
      threshold: 0,
    },
  )

  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value)
  }
}

onMounted(initPage)

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
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

.header {
  width: 100%;
  border-bottom: solid 1px var(--el-menu-border-color); /* 模拟底边线 */
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 200px;
  min-width: 1200px;
}

/* 2. 针对带图标和文字垂直排列的特殊项，进一步压缩 */
.topbottom {
  min-width: 40px; /* 限制最小宽度 */
}

:deep(.el-menu-item .el-button) {
  padding: 8px 12px; /* 减小按钮内边距 */
  margin-left: 0;
}

/* 3. 调整搜索框所在的 menu-item */
/* 搜索框通常不需要 padding，因为它内部已经有间距了 */
/* 修改这一段 */
:deep(.el-menu-item:has(input)) {
  padding: 0 5px !important;
  flex-shrink: 1; /* 允许收缩 */
  min-width: 100px; /* 设置一个最小收缩限度 */
}

.mainlayout {
  width: 90%;
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
</style>
