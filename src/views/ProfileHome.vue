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
            <div v-for="item in videoList" :key="item.index" class="video-card">
              <VideoCard :videoData="item" />
            </div>
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
            <div v-for="item in videoList" :key="item.index" class="video-card">
              <VideoCard :videoData="item" />
            </div>
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
            <div v-for="item in videoList" :key="item.index" class="video-card">
              <VideoCard :videoData="item" />
            </div>
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
            <div v-for="item in videoList" :key="item.index" class="video-card">
              <VideoCard :videoData="item" />
            </div>
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
])
</script>

<style scoped>
.profile-home {
  display: flex;
  gap: 20px;
}
.left {
  flex: 4;
}
.right {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
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
