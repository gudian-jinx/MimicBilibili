<template>
  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>
          <img :src="videoData.thumbnail" alt="图片消失了" width="100%" />
        </span>
      </div>
    </template>

    <el-tooltip
      effect="dark"
      :content="videoData.description"
      placement="top"
      :disabled="videoData.description.length < 50"
    >
      <p class="text item">{{ videoData.description }}</p>
    </el-tooltip>

    <template #footer>
      {{ videoData.title }}
    </template>
  </el-card>
</template>

<script setup>
const props = defineProps(['videoData'])
</script>

<style scoped>
/* 1. 去掉 header 部分的内边距（你已有的代码） */
:deep(.el-card__header) {
  padding: 1px;
  border-bottom: none;
}

/* 2. 去掉中间内容的内边距 */
:deep(.el-card__body) {
  padding: 5px;
}

/* 3. 去掉底部 footer 的内边距 */
:deep(.el-card__footer) {
  padding: 5px;
  border-top: none; /* 如果不想要 footer 上方的分割线也可以去掉 */
}

/* 确保图片填满容器且没有多余间隙 */
.card-header img {
  display: block;
  width: 100%;
  height: auto;
}

/* 在 VideoCard.vue 的 style 中添加 */
.text.item {
  /* 开启多行省略模式 */
  display: -webkit-box;
  -webkit-box-orient: vertical;

  /* 你想展示几行文字就写几 */
  -webkit-line-clamp: 2;

  /* 隐藏超出的部分并显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;

  /* 设置一个固定行高，防止在某些浏览器下文字显示一半 */
  line-height: 1.5;
  height: 3em; /* 行数 * line-height = 2 * 1.5 = 3 */
  margin: 10px 0;
}
/* 统一内容区域高度 */
:deep(.el-card__body) {
  padding: 10px;
  height: 100px; /* 根据你的文字行数调整这个高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 父组件的 style */
.video-container {
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
  gap: 20px; /* 卡片之间的间距 */
  justify-content: center;
}

.video-card {
  width: 280px; /* 固定每一项的宽度 */
  flex-shrink: 0; /* 防止被挤压 */
}
/* 限制卡片内图片的高度 */
.card-header img {
  display: block;
  width: 100%;
  height: 150px; /* 强制统一图片高度 */
  object-fit: contain; /* 保证图片不缩放变形 */
}

/* 进一步压缩 Body 间距 */
:deep(.el-card__body) {
  padding: 8px; /* 减小内边距 */
}
</style>
