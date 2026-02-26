<template>
  <div style="padding: 20px; text-align: center">
    <button @click="fetchDog" :disabled="loading">
      {{ loading ? '加载中...' : '换一只狗狗' }}
    </button>

    <div style="margin-top: 20px">
      <img v-if="dogUrl" :src="dogUrl" width="300" style="border-radius: 8px" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 1. 直接引入 axios 库
import axios from 'axios'

const dogUrl = ref('')
const loading = ref(false)

// 2. 直接在函数里写完整的请求逻辑
const fetchDog = async () => {
  loading.value = true
  try {
    // 必须写完整的 URL，必须手动处理 res.data
    const res = await axios.get('https://dog.ceo/api/breeds/image/random')

    // 注意：没有拦截器，你必须层层点出数据 (res.data.message)
    dogUrl.value = res.data.message
  } catch (err) {
    alert('请求失败了：' + err.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDog()
})
</script>

<style scoped></style>
