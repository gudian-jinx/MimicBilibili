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
        <div v-for="i in 5" :key="'skeleton-' + i" class="video-card">
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

  <div class="loading" v-if="isMoreLoading">加载更多中...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// 组件导入
import Channel from './Channel.vue'
import Carousel from './Carousel.vue'
import HeaderNav from './HeaderNav.vue'
import VideoCard from './VideoCard.vue'

// 状态控制
const dataList = ref([]) // 初始化为数组
const carouselList = ref([])
const isLoading = ref(true) // 初始骨架屏状态
const isMoreLoading = ref(false) // 触底加载状态

// 获取商品数据
const fetchData = async () => {
  try {
    const res = await axios.get('https://dummyjson.com/products?limit=5')
    dataList.value = res.data.products
  } catch (err) {
    console.error('商品获取失败:', err)
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
    // 并发请求
    await Promise.all([fetchData(), fetchCarousel()])
  } finally {
    // 稍微延迟关闭，避免闪烁过快
    setTimeout(() => {
      isLoading.value = false
    }, 800)
  }
}

onMounted(() => {
  initPage()
})
</script>

<style scoped>
.mainlayout {
  width: 90%;
  margin: 0 auto;
  min-width: 1200px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.carousel {
  grid-column: span 2;
  grid-row: span 2;
  /* 关键：限制高度并防止拉伸 */
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
}

/* 确保骨架屏在加载时也能占满 grid 空间 */
:deep(.el-skeleton) {
  height: 100%;
}

.header {
  width: 100%;
  background-image: url('@/assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 200px;
}
</style>
