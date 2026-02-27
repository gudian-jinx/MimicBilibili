<template>
  <div class="header dark-header">
    <header-nav />
  </div>

  <div class="video-reviews">
    <div class="videoDiv">
      <h3>{{ videoDetail?.description || '加载中...' }}</h3>
      <VideoCP
        v-if="videoDetail"
        url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        :poster="bg"
      />
    </div>

    <div class="reviewsDiv">
      <h3>评论区</h3>

      <div v-if="loading && reviewDetail.length === 0">加载中...</div>

      <div v-else>
        <div v-for="item in reviewDetail" :key="item.id" class="review-item">
          <div class="review-header">
            <span class="name">{{ item.name }}</span>
            <span class="email">{{ item.email }}</span>
          </div>
          <p class="body">{{ item.body }}</p>
        </div>
      </div>

      <div class="scroll-footer">
        <div v-if="loading" class="loading-more">正在搬运更多评论...</div>
        <div v-if="!hasMore" class="no-more">—— 已显示全部评论 ——</div>

        <div ref="loadMoreRef" class="load-more-trigger"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import HeaderNav from '@/components/HeaderNav.vue'
import VideoCP from '@/components/VideoCP.vue'
import bg from '@/assets/img3.png'

// 导入你的 Hook
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

const route = useRoute()
const videoDetail = ref(null)

/* ========= 1. 定义请求适配器 ========= */
// Hook 需要这个函数返回 { list, hasMore }
const fetchReviewsApi = async (currentPage) => {
  // jsonplaceholder 的 _page 是从 1 开始的，所以 currentPage + 1
  const res = await axios.get(`https://jsonplaceholder.typicode.com/comments`, {
    params: {
      _limit: 10,
      _page: currentPage + 1,
    },
  })

  return {
    list: res.data,
    // 如果返回的数据少于 10 条，说明没货了
    hasMore: res.data.length === 10,
  }
}

/* ========= 2. 使用 Hook ========= */
const {
  list: reviewDetail,
  loading,
  hasMore,
  loadMoreRef,
  reset,
} = useInfiniteScroll(fetchReviewsApi)

/* ========= 3. 业务逻辑 ========= */

// 获取视频详情
const fetchVideo = async () => {
  try {
    const id = route.params.id
    const res = await axios.get(`https://dummyjson.com/products/${id}`)
    videoDetail.value = res.data
  } catch (err) {
    console.error('视频详情获取失败', err)
  }
}

// 监听路由 ID 变化
watch(
  () => route.params.id,
  () => {
    fetchVideo() // 重新获取视频详情
    reset() // 调用 Hook 的 reset，清空评论列表并重新从第一页加载
  },
)

onMounted(() => {
  fetchVideo() // 视频详情需要手动触发，评论列表由 Hook 自动触发
})
</script>

<style scoped>
.video-reviews {
  display: flex;
  gap: 20px;
  width: 90%;
  margin: 20px auto;
}

.videoDiv {
  flex: 1.5; /* 播放器占大一点 */
  min-height: 500px;
}

.reviewsDiv {
  flex: 1;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  height: 80vh; /* 给评论区一个固定高度，方便滚动 */
  overflow-y: auto;
}

.review-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.name {
  font-weight: bold;
  color: #333;
}

.email {
  color: #999;
  font-size: 12px;
}

.body {
  color: #666;
  line-height: 1.6;
}

.scroll-footer {
  padding: 20px 0;
  text-align: center;
  color: #bbb;
  font-size: 14px;
}

.load-more-trigger {
  height: 10px;
  width: 100%;
}
</style>
