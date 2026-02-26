<template>
  <div class="banner-container">
    <div class="user-info-section">
      <div class="avatar-wrapper">
        <el-avatar :src="avaterUrl" alt="头像"></el-avatar>
      </div>

      <div class="user-details">
        <div class="name-row">
          <h2 class="user-name">Jinx</h2>
          <span class="level-tag" style="background-color: orange">LV5</span>
          <span class="vip-tag" style="background-color: slategray">大会员</span>
          <button class="fan-badge">+ 粉丝勋章</button>
        </div>
        <div class="signature">金克丝的含义就是jinx，笨！</div>
      </div>
    </div>

    <div class="action-section">
      <div class="view-selector">
        <el-dropdown>
          <span class="el-dropdown-link">
            视角：我自己
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>我的粉丝</el-dropdown-item>
              <el-dropdown-item>新访客</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <button class="theme-btn">
        <el-icon><Brush /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import avaterUrl from '@/assets/avatar.png'
</script>

<style scoped>
.banner-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 20px 20px 20px;

  /* 关键修改：去掉固定的 200px */
  flex: 1;
  width: 95%;
  margin: 0 auto;
  color: white; /* 之前你写的是 red，B站风格通常是 white */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.user-info-section {
  display: flex; /* 头像和文字也用 flex 排列 */
  align-items: center;
}

.user-details {
  margin-left: 20px;
  display: flex;
  flex-direction: column; /* 名字和签名垂直排列 */
  gap: 8px; /* 每一行之间的间距 */
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px; /* 名字、等级、标签之间的间距 */
}

.action-section {
  display: flex;
  gap: 12px;
  margin-bottom: 5px; /* 微调右侧按钮高度 */
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

:deep(.el-dropdown) {
  color: white; /* 穿透组件内部修改颜色 */
}

:deep(.el-dropdown-link) {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6); /* 确保下拉菜单文字也有阴影，才清晰 */
}

.view-selector {
  background: rgba(255, 255, 255, 0.2); /* 白色半透明背景 */
  padding: 4px 12px;
  border-radius: 4px;
  /* 毛玻璃模糊效果 */
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: background 0.3s;
}

.view-selector:hover {
  background: rgba(255, 255, 255, 0.3); /* 鼠标悬浮变亮 */
}
</style>
