# 🎬 MimicBilibili — Vue3 视频流媒体展示项目

一个基于 **Vue 3 + Vite** 构建的仿 Bilibili 视频列表与播放应用，重点体现 **组件封装能力、性能优化思路与工程化实践**，适合作为前端工程能力展示项目。

---

## 🚀 项目演示

👉 GitHub：https://github.com/gudian-jinx/MimicBilibili

> 建议在本地运行以获得完整体验

---

## 🧠 项目定位

本项目并非简单页面还原，而是围绕 **真实业务场景** 进行设计：

- 视频流列表加载
- 流媒体播放器封装
- 无限滚动与性能优化
- 通用请求模块设计
- 页面骨架屏体验优化

目标是体现：

✅ 组件抽象能力
✅ 前端性能优化意识
✅ API 调用与状态管理能力
✅ 可维护的工程结构设计

---

## 🛠 技术栈

### 核心框架

- Vue 3（Composition API）
- Vue Router
- Pinia

### UI 与样式

- Element Plus
- Flex + Grid 混合布局

### 网络通信

- Axios（请求拦截 / 错误处理 / 模块化封装）

### 视频播放

- DPlayer
- hls.js（HLS 流媒体支持）
- flv.js（FLV 流媒体支持）

### 构建工具

- Vite

---

## ✨ 核心功能

### 📺 视频列表页

- 视频卡片展示
- 无限滚动加载
- Skeleton 骨架屏优化首屏体验
- 请求节流与重复加载防护

---

### ▶️ 通用视频播放器组件

- 支持 **MP4 / HLS / FLV**
- 自动识别视频协议
- 播放器生命周期销毁（避免内存泄漏）
- 可复用的业务无关播放器封装

---

### 💬 评论模块

- 分页加载评论数据
- 独立状态管理
- 可扩展为真实业务评论系统

---

## 🔥 关键工程亮点

### ✅ 无限滚动性能优化

- 使用 **IntersectionObserver** 替代 scroll 监听
- 降低主线程计算压力
- 提升移动端滚动流畅度

---

### ✅ 请求状态机设计

通过：

- loading
- hasMore
- page

构建列表请求状态控制，避免：

- 重复请求
- 并发错乱
- 触底抖动

---

### ✅ 视频播放器工程化封装

- 解耦业务与播放器实现
- URL 自动识别播放协议
- 组件卸载时销毁实例，防止内存泄漏

---

### ✅ 首屏体验优化

- Skeleton 骨架屏减少白屏感
- 并发请求视频与评论数据
- 延迟关闭加载态避免闪烁

---

## 📦 项目结构

```
src
├── assets         # 静态资源
├── components     # 通用组件
├── views          # 页面
├── router         # 路由
├── store          # 全局状态
└── utils
```

---

## ⚙️ 本地运行

```bash
# 克隆项目
git clone https://github.com/gudian-jinx/MimicBilibili

# 安装依赖
npm install

# 启动
npm run dev
```

## 👨‍💻 作者

- GitHub：https://github.com/gudian-jinx

---
