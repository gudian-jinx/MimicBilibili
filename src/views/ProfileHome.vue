<template>
  <div class="profile-home">
    <div class="left">
      <div class="left-content">
        <div>
          <div class="introduction1">
            <span class="introducition1-left">收藏夹 仅自己可见</span>
            <span class="introduction1-right">查看更多</span>
          </div>
          <div class="show1">
            <div v-for="item in videoList" :key="item.index" class="video-card">
              <VideoCard :videoData="item" />
            </div>
          </div>
        </div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </div>
    </div>
    <div class="right">
      <p>Right side content</p>
      <p>Right side content</p>
      <p>Right side content</p>
      <p>Right side content</p>
      <p>Right side content</p>
      <p>Right side content</p>
    </div>
  </div>
</template>

<script setup>
import VideoCard from './VideoCard.vue'
import { ref } from 'vue'
import videoCardImg from '@/assets/videoCardImg.png'

const videoList = ref([
  {
    index: 1,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 2,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 3,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
  {
    index: 4,
    head: videoCardImg,
    mid: 'Zeus玩上单ADC玩上瘾了，上单卢锡安、上单VN、上单韦鲁斯',
    bottom: 'up',
  },
])
</script>

<style scoped>
.profile-home {
  display: flex;
}
.left {
  flex: 1;
  background-color: red;
}
.right {
  flex: 1;
  background-color: blue;
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
.show1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
