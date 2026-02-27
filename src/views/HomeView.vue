<template>
  <div class="header dark-header">
    <header-nav />
  </div>

  <div class="mainlayout">
    <div class="nav">
      <Channel />
    </div>

    <div class="content-grid">
      <div class="carousel">
        <el-skeleton :loading="isFirstLoading" animated>
          <template #template>
            <el-skeleton-item variant="image" style="height: 100%" />
          </template>
          <template #default>
            <Carousel :imgList="carouselList" />
          </template>
        </el-skeleton>
      </div>

      <template v-if="isFirstLoading">
        <div v-for="i in 6" :key="'skeleton-' + i" class="video-card">
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
          <VideoCard :videoData="item" @click="goDetail(item.id)" />
        </div>
      </template>
    </div>

    <div class="scroll-footer">
      <div v-if="loading" class="loading-more">
        <el-icon class="is-loading"><Loading /></el-icon> 加载中...
      </div>
      <div v-else-if="!hasMore" class="no-more">没有更多视频了</div>

      <div ref="loadMoreRef" class="load-more-trigger"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Loading } from '@element-plus/icons-vue'

// 组件导入
import Channel from './Channel.vue'
import Carousel from '../components/Carousel.vue'
import HeaderNav from '../components/HeaderNav.vue'
import VideoCard from '../components/VideoCard.vue'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

const router = useRouter()
const goDetail = (id) => router.push(`/video/${id}`)

/* ========= 业务配置 ========= */
const limit = 10
const carouselList = ref([])
const isFirstLoading = ref(true) // 用于控制首屏骨架屏

/* ========= 核心：适配 Hook 的请求函数 ========= */
// Hook 要求 fetchFn 接收当前 page 并返回 { list, hasMore }
const fetchVideos = async (currentPage) => {
  const skip = currentPage * limit
  const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)

  return {
    list: res.data.products,
    // 判断是否还有更多：如果当前返回量小于限制量，或者已达到 total
    hasMore: res.data.products.length === limit && (currentPage + 1) * limit < res.data.total,
  }
}

// 获取轮播图数据
const fetchCarousel = async () => {
  try {
    const res = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5')
    carouselList.value = res.data.slice(0, 5)
  } catch (err) {
    console.error('轮播图获取失败:', err)
  }
}

/* ========= 初始化 Hook ========= */
// 将 dataList 重命名以匹配组件原逻辑
const { list: dataList, loading, hasMore, loadMoreRef } = useInfiniteScroll(fetchVideos)

/* ========= 生命周期：处理首屏骨架屏同步 ========= */
onMounted(async () => {
  // 同时等待轮播图加载
  // 注意：Hook 内部已经自动执行了第一次 fetchVideos
  await fetchCarousel()

  // 给用户一点视觉缓冲，然后关闭骨架屏
  setTimeout(() => {
    isFirstLoading.value = false
  }, 600)
})
</script>

<style scoped>
.dark-header {
  --navbar-text-color: white;
}

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

.load-more-trigger {
  height: 10px;
}
</style>
