<template>
  <div class="mainlayoutt">
    <div class="header">
      <header-nav/>
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
import Bg from '@/assets/bg.png'
import Channel from './Channel.vue'
import Carousel from './Carousel.vue'
import HeaderNav from './HeaderNav.vue'
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
  min-width: 1200px
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
  flex-shrink: 1;    /* 允许收缩 */
  min-width: 100px;  /* 设置一个最小收缩限度 */
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
