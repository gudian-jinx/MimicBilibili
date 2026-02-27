<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="Home">
      <slot name="firstItem">
        <el-icon><Monitor /></el-icon>首页
      </slot>
    </el-menu-item>
    <el-menu-item index="2"> 番剧 </el-menu-item>
    <el-menu-item index="3"> 直播 </el-menu-item>
    <el-menu-item index="4"> 游戏中心 </el-menu-item>
    <el-menu-item index="5"> 会员购 </el-menu-item>
    <el-menu-item index="6"> 漫画 </el-menu-item>
    <el-menu-item index="7"> 赛事 </el-menu-item>
    <el-menu-item index="8"> 新春会 </el-menu-item>
    <el-menu-item index="9">
      <el-icon><Download /></el-icon>下载客户端
    </el-menu-item>
    <el-menu-item index="10" style="flex-grow: 2; max-width: 300px">
      <el-input
        v-model="input1"
        style="width: 100%"
        size="large"
        placeholder="Please Input"
        :suffix-icon="Search"
      />
    </el-menu-item>
    <el-menu-item index="Profile">
      <el-avatar :src="userStore.avatar" />
    </el-menu-item>
    <el-menu-item index="12">
      <div
        class="topbottom"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: normal;
        "
      >
        <el-icon><Tools /></el-icon>
        <span>大会员</span>
      </div>
    </el-menu-item>
    <el-menu-item index="13">
      <div
        class="topbottom"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: normal;
        "
      >
        <el-icon><Tools /></el-icon>
        <span>消息</span>
      </div>
    </el-menu-item>
    <el-menu-item index="14">
      <div
        class="topbottom"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: normal;
        "
      >
        <el-icon><Tools /></el-icon>
        <span>动态</span>
      </div>
    </el-menu-item>
    <el-menu-item index="15">
      <div
        class="topbottom"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: normal;
        "
      >
        <el-icon><Tools /></el-icon>
        <span>收藏</span>
      </div>
    </el-menu-item>
    <el-menu-item index="16">
      <div
        class="topbottom"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: normal;
        "
      >
        <el-icon><Tools /></el-icon>
        <span>历史</span>
      </div>
    </el-menu-item>
    <el-menu-item index="17">
      <div
        class="topbottom"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          line-height: normal;
        "
      >
        <el-icon><Tools /></el-icon>
        <span>创作中心</span>
      </div>
    </el-menu-item>
    <el-menu-item index="18">
      <el-button type="danger">
        <el-icon><Tools /></el-icon>
        投稿
      </el-button>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Monitor, Download, Tools } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user' // ✅ 这里是命名导入

const userStore = useUserStore() // ✅ Pinia store 实例

console.log('# ', userStore)

const router = useRouter()
const input1 = ref('')
const activeIndex = ref('1') // 根据你的逻辑给个初始值

const handleSelect = (name) => {
  router.push({ name })
}
</script>

<style scoped>
/* 强制所有菜单项可以收缩 */
:deep(.el-menu-item) {
  flex-shrink: 1; /* 允许收缩 */
  min-width: 0; /* 允许缩小到极值 */
  padding: 0 5px !important; /* 进一步压缩间距 */
  font-size: 13px; /* 稍微调小字号 */
  display: flex;
  align-items: center;
}

/* 移除鼠标悬浮时的背景色 */
:deep(.el-menu-item:hover) {
  background-color: transparent !important;
}

/* 如果你点击菜单项后，也不想要那个选中的背景色，可以加上下面这段 */
:deep(.el-menu-item.is-active) {
  background-color: transparent !important;
}
/* 针对带有图标和文字垂直排列的容器 */
.topbottom {
  flex-shrink: 1;
  min-width: 0;
}
.topbottom span {
  font-size: 14px; /* 垂直排列时文字可以更小 */
  transform: scale(0.9); /* 甚至可以用缩放 */
}
.el-menu-demo {
  width: 98%; /* 只有内容区域是 80% */
  margin: 0 auto; /* 居中内容 */
  border-bottom: none !important; /* 去掉自带边框，改用 header 的边框 */
  background-color: transparent !important;
  border: none !important;
  display: flex;
  justify-content: space-between;
  width: 90%; /* 保持与 .mainlayout 一致的宽度 */
  max-width: 100%;
  min-width: 1200px; /* 让菜单和下方的 Grid 同步产生滚动条，而不是互相挤压 */
}
:deep(.el-menu-item) {
  color: var(--navbar-text-color);
}
/* 1. 缩小每个菜单项的左右内边距 */
:deep(.el-menu--horizontal > .el-menu-item) {
  padding: 0 8px !important; /* 进一步压缩 */
  min-width: auto !important; /* 强制取消最小宽度限制 */
  flex-shrink: 1; /* 确保每一项都能参与收缩 */
}
</style>
