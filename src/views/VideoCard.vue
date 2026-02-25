<template>
    <el-card style="max-width: 480px" >
        <template #header>
            <div class="card-header">
                <span>
                    <img :src="videoData.head" alt="图片消失了" width="100%">
                </span>
            </div>
        </template>
        
        <p class="text item">{{ videoData.mid }}</p>
        
        <template #footer>
            {{ videoData.bottom }}
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
</style>