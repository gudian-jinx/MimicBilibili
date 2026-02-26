<template>
  <el-carousel :interval="5000" arrow="always" height="100%">
    <el-carousel-item v-for="item in imgList" :key="item">
      <div class="carousel-content">
        <h3>
          <img :src="item.url" alt="图片找不到了" class="imglb" />
        </h3>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
const props = defineProps(['imgList'])
</script>

<style scoped>
.imglb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 整个轮播图组件也要撑满 */
.el-carousel {
  height: 100%;
}

.carousel-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 撑满轮播图内部 */
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 2rem;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
