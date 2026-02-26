<template>
  <div class="avatar-area" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <!-- 头像 -->
    <el-avatar class="avatar" :size="36" :src="avatar" />

    <!-- 用户面板 -->
    <transition name="panel">
      <div v-show="show" class="panel">
        <div class="panel-header">
          <el-avatar :size="72" :src="avatar" />

          <div class="username">jinx</div>

          <!-- 等级 -->
          <div class="level-row">
            <span class="lv">LV5</span>
            <div class="progress">
              <div class="bar" :style="{ width: '60%' }"></div>
            </div>
            <span class="lv gray">LV6</span>
          </div>

          <!-- 数据 -->
          <div class="stats">
            <div class="item">
              <div class="num">15</div>
              <div class="label">关注</div>
            </div>
            <div class="item">
              <div class="num">3</div>
              <div class="label">粉丝</div>
            </div>
            <div class="item">
              <div class="num">0</div>
              <div class="label">动态</div>
            </div>
          </div>
        </div>

        <!-- 菜单 -->
        <div class="menu">
          <div class="menu-item">个人中心</div>
          <div class="menu-item">投稿管理</div>
          <div class="menu-item">推荐服务</div>
          <div class="menu-item">主题：浅色</div>
        </div>

        <div class="logout">退出登录</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const avatar = 'https://i0.hdslb.com/bfs/face/member/noface.jpg'

const show = ref(false)
let timer = null

const handleEnter = () => {
  clearTimeout(timer)
  show.value = true
}

const handleLeave = () => {
  timer = setTimeout(() => {
    show.value = false
  }, 120)
}
</script>

<style scoped>
.avatar-area {
  position: relative;
  display: flex;
  align-items: center;
}

/* 头像动画 */
.avatar {
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.avatar:hover {
  transform: scale(1.15);
}

/* 面板 */
.panel {
  position: absolute;
  top: 48px;
  right: -120px;
  width: 320px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

/* header */
.panel-header {
  padding: 18px;
  text-align: center;
}

.username {
  margin-top: 8px;
  font-weight: 600;
}

/* 等级 */
.level-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.lv {
  font-size: 12px;
  color: #ff6699;
  font-weight: 600;
}
.lv.gray {
  color: #999;
}

.progress {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 999px;
  overflow: hidden;
}
.bar {
  height: 100%;
  background: linear-gradient(90deg, #ff7aa2, #ff4d88);
}

/* 数据 */
.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.item .num {
  font-weight: 600;
}
.item .label {
  font-size: 12px;
  color: #888;
}

/* 菜单 */
.menu {
  border-top: 1px solid #eee;
  padding: 8px 0;
}
.menu-item {
  padding: 10px 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.menu-item:hover {
  background: #f5f6f7;
}

.logout {
  border-top: 1px solid #eee;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  color: #666;
}

/* 入场动画 */
.panel-enter-active,
.panel-leave-active {
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}
</style>
