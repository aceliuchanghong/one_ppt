<template>
    <div class="card h-full">
      <div class="flex flex-col space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">图表预览</h2>
          <div class="flex space-x-2">
            <div class="relative">
              <select 
                v-model="exportFormat" 
                class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="svg">SVG 格式</option>
                <option value="png">PNG 格式</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <button 
              class="btn btn-primary" 
              @click="exportChart"
              :disabled="isLoading || !hasMermaidCode"
            >
              <span class="flex items-center">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? '导出中...' : '导出图表' }}
              </span>
            </button>
          </div>
        </div>
        
        <div class="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <p>图表将根据您输入的文本自动生成。您可以导出为SVG或PNG格式。</p>
        </div>
      </div>
      
      <div class="relative mt-4 h-[calc(100%-12rem)] overflow-auto border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-700">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-75">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
        
        <div v-if="error" class="text-red-500 p-4">
          {{ error }}
        </div>
        
        <div v-else-if="!hasMermaidCode" class="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>请在左侧输入文本并点击"生成图表"按钮</p>
        </div>
        
        <div v-else>
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Mermaid 代码:</h3>
            <pre class="bg-gray-100 p-3 rounded-md overflow-auto text-sm">{{ mermaidCode }}</pre>
          </div>
          
          <h3 class="text-lg font-semibold text-gray-700 mb-2">渲染结果:</h3>
          <div ref="mermaidContainer" class="mermaid-container"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import { useChartStore } from '@/stores/index';
  import mermaid from 'mermaid';
  
  const chartStore = useChartStore();
  const mermaidContainer = ref(null);
  const exportFormat = ref('svg');
  
  // 从store获取状态
  const mermaidCode = computed(() => chartStore.mermaidCode);
  const isLoading = computed(() => chartStore.isLoading);
  const error = computed(() => chartStore.error);
  const hasMermaidCode = computed(() => mermaidCode.value && mermaidCode.value.trim().length > 0);
  
  // 初始化mermaid
  onMounted(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      logLevel: 'error',
      fontFamily: 'sans-serif'
    });
  });
  
  // 渲染mermaid图表
  const renderMermaid = async () => {
    if (!mermaidContainer.value || !hasMermaidCode.value) return;
    
    try {
      // 清空容器
      mermaidContainer.value.innerHTML = '';
      
      // 创建一个新的div元素
      const mermaidDiv = document.createElement('div');
      mermaidDiv.className = 'mermaid';
      mermaidDiv.textContent = mermaidCode.value;
      
      // 添加到容器中
      mermaidContainer.value.appendChild(mermaidDiv);
      
      // 渲染图表
      await mermaid.run();
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      // 显示错误信息
      if (mermaidContainer.value) {
        mermaidContainer.value.innerHTML = `<div class="text-red-500">图表渲染失败: ${error.message}</div>`;
      }
    }
  };
  
  // 监听mermaidCode变化，重新渲染图表
  watch(mermaidCode, () => {
    renderMermaid();
  }, { immediate: true });
  
  // 导出图表
  const exportChart = () => {
    chartStore.setExportFormat(exportFormat.value);
    chartStore.exportChart();
  };
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
  
  .mermaid-container {
    @apply mt-4 overflow-auto;
  }
  </style>