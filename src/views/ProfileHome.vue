<template>
  <div class="profile-home">
    <div class="left">
      <div class="left-content">
        <div>
          <div class="introduction1">
            <span class="introducition1-left">
              <span class="title">收藏夹</span>
              <span class="lttitle" style="font-size: 10px">仅自己可见</span>
            </span>
            <span class="introduction1-right">查看更多</span>
          </div>
          <div class="show1">
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
        <div>
          <div class="introduction2">
            <span class="introducition2-left">
              <span class="title">订阅追番</span>
              <span class="lttitle" style="font-size: 10px">仅自己可见</span>
            </span>
            <span class="introduction2-right">查看更多</span>
          </div>
          <div class="show2">
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
        <div>
          <div class="introduction3">
            <span class="introducition3-left">
              <span class="title">最近投币的视频</span>
              <span class="lttitle" style="font-size: 10px">仅自己可见</span>
            </span>
            <span class="introduction3-right">查看更多</span>
          </div>
          <div class="show3">
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
        <div>
          <div class="introduction4">
            <span class="introducition4-left">
              <span class="title">最近点赞的视频</span>
              <span class="lttitle" style="font-size: 10px">仅自己可见</span>
            </span>
            <span class="introduction4-right">查看更多</span>
          </div>
          <div class="show4">
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
      </div>
    </div>
    <div class="right">
      <div class="right1">
        <p>点击申请bilibili认证 > <br />获得认证，享受多重认证福利！</p>
      </div>
      <div class="right2">
        <div class="grzl">
          <span>个人资料</span>
          <span>uid</span>
          <span>生日</span>
          <span>学校</span>
        </div>
        <div class="edit">
          <span>编辑></span>
        </div>
      </div>
      <div class="right3">
        <button @click="fetchData" :disable="loading">
          {{ loading ? '换一只狗狗' : '加载中...' }}
        </button>
        <el-skeleton :loading="isLoading" animated>
          <template #template>
            <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
          </template>
          <template #default>
            <img :src="dogUrl" alt="图片消失了" style="width: 100%; border-radius: 8px" />
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
import VideoCard from '../components/VideoCard.vue'
import { ref, onMounted } from 'vue'
import videoCardImg from '@/assets/videoCardImg.png'

const isLoading = ref(true) // 初始骨架屏状态
import axios from 'axios'
const dataList = ref({})
const dogUrl = ref()
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    // 1. 请求数据
    const res = await axios.get('https://dog.ceo/api/breeds/image/random')
    dogUrl.value = res.data.message
  } catch (err) {
    console.error('获取失败', err)
  }
}

const fetchCard = async () => {
  try {
    const res = await axios.get('https://dummyjson.com/products?limit=5')
    dataList.value = res.data.products
  } catch (err) {
    console.error('获取失败:', err) // 修正变量名
  } finally {
    // 关键：使用 .value 查看内部数据
    // 或者使用 JSON.parse(JSON.stringify()) 彻底脱掉响应式外壳
    console.warn('--- 终于执行到这里了 ---')
    console.log('数据内容:', dataList.value)
  }
}

// 初始化页面：确保两个请求都尝试完成后再关闭骨架屏
const initPage = async () => {
  isLoading.value = true
  try {
    // 并发请求
    await Promise.all([fetchData(), fetchCard()])
  } finally {
    // 稍微延迟关闭，避免闪烁过快
    setTimeout(() => {
      isLoading.value = false
    }, 800)
  }
}

// 页面加载完成后执行
onMounted(() => {
  initPage()
})
</script>

<style scoped>
.profile-home {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.left {
  flex: 4;
}
.right {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(5, auto);
  gap: 20px;
}
.left-content {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
}
.introduction1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.introduction2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.introduction3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.introduction4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.show1,
.show2,
.show3,
.show4 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.right1 {
  display: flex;
  justify-content: center; /* 水平 */
  align-items: center; /* 垂直 */
  background-color: rgb(246, 247, 248);
  padding: 6%;

  border-radius: 10%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.right2 {
  display: flex;
  justify-content: space-between;
  padding: 5% 10%;
  border-radius: 10%;
  background-color: rgb(246, 247, 248);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.grzl {
  flex: 1;

  display: flex;
  justify-content: left; /* 水平 */
  flex-direction: column;
}
.edit {
  flex: 1;

  display: flex;
  justify-content: right; /* 水平 */
}
.title {
  font-size: 20px;
  font-weight: 700;
}
.lttitle {
  font-size: 10px;
  margin-left: 10px;
}
</style>
