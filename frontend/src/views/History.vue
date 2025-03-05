<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">历史记录</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">查看您之前生成的图表</p>
    </div>
    
    <div v-if="!history.length" class="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-lg">暂无历史记录</p>
      <p class="mt-2">生成图表后将自动保存在这里</p>
      <router-link to="/" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
        创建新图表
      </router-link>
    </div>
    
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="item in history" :key="item.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">文本描述</h3>
          <p class="text-gray-600 dark:text-gray-300 line-clamp-3">{{ item.text }}</p>
        </div>
        
        <div class="mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">生成时间</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ formatDate(item.timestamp) }}</p>
        </div>
        
        <div class="flex justify-end space-x-2">
          <button 
            @click="loadChart(item)" 
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            查看图表
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChartStore } from '@/stores/index'

const router = useRouter()
const store = useChartStore()
const history = computed(() => store.history)

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString()
}

function loadChart(item) {
  store.updateTextInput(item.text)
  store.mermaidCode = item.mermaidCode
  router.push('/')
}
</script>