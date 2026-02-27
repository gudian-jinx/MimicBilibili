<template>
  <div class="header dark-header">
    <header-nav />
  </div>
  <div class="video-reviews">
    <div class="videoDiv">
      <h3>{{ videoDetail?.description }}</h3>
      <VideoCP
        v-if="videoDetail"
        url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        :poster="bg"
      />
    </div>
    <div class="reviewsDiv">
      <h3>评论区</h3>

      <div v-if="!reviewDetail">加载中...</div>

      <div v-else>
        <div v-for="item in reviewDetail" :key="item.id" class="review-item">
          <div class="review-header">
            <span class="name">{{ item.name }}</span>
            <span class="email">{{ item.email }}</span>
          </div>

          <p class="body">{{ item.body }}</p>
        </div>
      </div>
      <!-- 无限滚动 -->
      <div v-if="loadingMore" class="loading-more">加载中...</div>
      <div ref="loadMoreRef" class="load-more-trigger" v-if="hasMore"></div>
    </div>
  </div>
</template>

<script setup>
import HeaderNav from '@/components/HeaderNav.vue'
import bg from '@/assets/img3.png'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import VideoCP from '@/components/VideoCP.vue'
import axios from 'axios'
/* ========= 状态 ========= */

const dataList = ref([]) // 初始化为数组
const isLoading = ref(true) // 初始骨架屏状态

/* 无限滚动核心状态 */
const page = ref(0)
const limit = 10
const hasMore = ref(true)
const loadingMore = ref(false)

/* 哨兵 */
const loadMoreRef = ref(null)
let observer = null

const route = useRoute()
const videoDetail = ref(null)
const reviewDetail = ref([])

const fetchVideo = async () => {
  const id = route.params.id
  const res = await axios.get(`https://dummyjson.com/products/${id}`)
  videoDetail.value = res.data
}

const fetchReviews = async () => {
  if (!hasMore.value || loadingMore.value) return

  loadingMore.value = true

  try {
    const skip = page.value * limit
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${skip}`,
    )
    const list = res.data

    if (list.length < limit) {
      hasMore.value = false
    }

    dataList.value.push(...list)
    reviewDetail.value.push(...list)
    page.value++
  } catch (err) {
    console.error('分页加载失败', err)
  } finally {
    loadingMore.value = false
  }
}

// 初始化页面：确保两个请求都尝试完成后再关闭骨架屏
const initPage = async () => {
  isLoading.value = true

  try {
    await Promise.all([fetchVideo(), fetchReviews()])
  } finally {
    setTimeout(() => {
      isLoading.value = false
      nextTick(setupObserver)
    }, 800)
  }
}

// 页面加载完成后执行
onMounted(() => {
  initPage()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

/* ========= 哨兵监听 ========= */

const setupObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchReviews()
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

watch(
  () => route.params.id,
  () => {
    fetchVideo()
    fetchReviews()
  },
)
</script>

<style scoped>
.video-reviews {
  display: flex;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
}
.videoDiv {
  flex: 1;
  height: 600px;
}
.reviewsDiv {
  flex: 1;
  padding: 3%;
}

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

.review-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.name {
  font-weight: bold;
}

.email {
  color: #888;
  font-size: 12px;
}

.body {
  line-height: 1.5;
}
.load-more-trigger {
  padding: 10px;
}
</style>
