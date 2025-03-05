<template>
  <div class="card h-full">
    <div class="flex flex-col space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">文本编辑器</h2>
        <div class="flex space-x-2">
          <button 
            class="btn btn-primary" 
            @click="generateChart"
            :disabled="isLoading || !hasText"
          >
            <span class="flex items-center">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? '生成中...' : '生成图表' }}
            </span>
          </button>
          <button
            class="btn btn-secondary"
            @click="clearInput"
            :disabled="isLoading || !hasText"
          >
            清空
          </button>
        </div>
      </div>
      
      <div class="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
        <p class="font-medium">提示：</p>
        <ul class="list-disc list-inside space-y-1 mt-1">
          <li>输入自然语言描述，例如："创建一个流程图，显示用户注册流程"</li>
          <li>可以选择部分文本生成特定内容的图表</li>
          <li>支持多种图表类型：流程图、时序图、类图等</li>
        </ul>
      </div>
    </div>
    
    <textarea
      v-model="text"
      class="w-full h-[calc(100%-10rem)] mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none dark:bg-gray-700 dark:text-white"
      placeholder="在此输入您的图表描述..."
      @input="onTextChange"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useChartStore } from '@/stores/index';

const chartStore = useChartStore();
const text = ref('');
const isLoading = computed(() => chartStore.isLoading);
const hasText = computed(() => text.value.trim().length > 0);

// 当文本变化时更新store
const onTextChange = () => {
  chartStore.updateTextInput(text.value);
};

// 生成图表
const generateChart = () => {
  if (hasText.value) {
    // 获取选中的文本，如果没有选中则使用全部文本
    const textarea = document.querySelector('textarea');
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    chartStore.generateMermaidCode(selectedText.length > 0 ? selectedText : null);
  }
};

// 清空输入
const clearInput = () => {
  chartStore.clearInput();
  text.value = '';
};

// 监听store中的文本变化
watch(() => chartStore.textInput, (newValue) => {
  if (newValue !== text.value) {
    text.value = newValue;
  }
}, { immediate: true });
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
}

.btn {
  @apply px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
}

.btn-secondary {
  @apply bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400;
}
</style>