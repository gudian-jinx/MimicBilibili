<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import DPlayer from 'dplayer'
import Hls from 'hls.js'
import flvjs from 'flv.js'

const props = defineProps({
  url: { type: String, required: true },
  type: { type: String, default: 'auto' },
  poster: String,
  autoplay: Boolean,
  loop: Boolean,
})

const playerRef = ref(null)
let dp = null
let hlsInstance = null
let flvInstance = null

/* 自动识别类型 */
const getType = () => {
  if (props.type !== 'auto') return props.type
  if (props.url.includes('.m3u8')) return 'hls'
  if (props.url.includes('.flv')) return 'flv'
  return 'normal'
}

/* 初始化 */
const initPlayer = () => {
  if (!playerRef.value) return

  dp = new DPlayer({
    container: playerRef.value,
    autoplay: props.autoplay,
    loop: props.loop,
    video: {
      url: props.url,
      pic: props.poster,
      type: getType(),
      customType: {
        hls(video) {
          if (!Hls.isSupported()) return
          hlsInstance = new Hls()
          hlsInstance.loadSource(video.src)
          hlsInstance.attachMedia(video)
        },
        flv(video) {
          if (!flvjs.isSupported()) return
          flvInstance = flvjs.createPlayer({
            type: 'flv',
            url: video.src,
          })
          flvInstance.attachMediaElement(video)
          flvInstance.load()
        },
      },
    },
  })
}

/* 销毁 */
const destroy = () => {
  hlsInstance?.destroy()
  flvInstance?.destroy()

  hlsInstance = null
  flvInstance = null

  dp?.destroy()
  dp = null
}

/* url 变化 */
watch(
  () => props.url,
  async () => {
    destroy()
    await nextTick()
    initPlayer()
  },
)

/* 生命周期 */
onMounted(initPlayer)
onBeforeUnmount(destroy)

/* 对外暴露 */
defineExpose({
  play: () => dp?.play(),
  pause: () => dp?.pause(),
  seek: (t) => dp?.seek(t),
  dp,
})
</script>

<template>
  <div ref="playerRef" class="player"></div>
</template>

<style scoped>
.player {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
