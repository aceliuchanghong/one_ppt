<script setup>
import { onMounted, watch } from 'vue';
import { useMermaidContext } from '../context/MermaidContext';
import mermaid from 'mermaid';

const { state, exportChart } = useMermaidContext();

// 初始化mermaid配置
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

// 渲染图表
async function renderChart() {
  if (!state.mermaidCode) return;
  
  try {
    const container = document.getElementById('mermaid-container');
    container.innerHTML = state.mermaidCode;
    await mermaid.run();
  } catch (error) {
    console.error('渲染图表失败:', error);
  }
}

// 监听mermaidCode变化
watch(() => state.mermaidCode, renderChart, { immediate: true });

// 组件挂载时初始化
onMounted(() => {
  if (state.mermaidCode) {
    renderChart();
  }
});
</script>

<template>
  <div class="chart-preview">
    <div v-if="state.mermaidCode" class="preview-container">
      <div id="mermaid-container"></div>
      <div class="export-buttons">
        <button @click="exportChart('png')" :disabled="state.loading">导出 PNG</button>
        <button @click="exportChart('svg')" :disabled="state.loading">导出 SVG</button>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>在文本框中输入描述，点击生成按钮来创建图表</p>
    </div>
  </div>
</template>

<style scoped>
.chart-preview {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-container {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 40px 0;
}

#mermaid-container {
  width: 100%;
  overflow: auto;
  margin-bottom: 20px;
}

.export-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.export-buttons button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.export-buttons button:hover:not(:disabled) {
  background-color: #3aa876;
}

.export-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>