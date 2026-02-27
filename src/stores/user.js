import { ref } from 'vue'
import { defineStore } from 'pinia'
import avatarImg from '@/assets/avatar.png'
// 假设存的是头像路径
export const useUserStore = defineStore('user', () => {
  // 头像路径
  const avatar = ref(avatarImg)

  // 一个示例方法：更新头像
  function setAvatar(newAvatar) {
    avatar.value = newAvatar
  }

  return { avatar, setAvatar }
})
