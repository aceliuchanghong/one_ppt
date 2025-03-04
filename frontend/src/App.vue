<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TextEditor from './components/TextEditor.vue';
import ChartPreview from './components/ChartPreview.vue';
import { provideMermaidContext } from './context/MermaidContext';

// 提供Mermaid上下文
provideMermaidContext();
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>文本转图表工具</h1>
      <p>输入自然语言描述，自动生成可视化图表</p>
    </header>
    
    <main class="app-content">
      <TextEditor />
      <ChartPreview />
    </main>
    
    <footer class="app-footer">
      <p>基于 Vue3 和 Mermaid.js 构建</p>
    </footer>
  </div>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #213547;
  background-color: #f5f5f5;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  width: 100%;
  margin: 0 auto;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  color: #42b883;
  margin-bottom: 10px;
}

.app-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.app-footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px 0;
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .app-content {
    flex-direction: column;
  }
}
</style>
