<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">文本转图表工具</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">输入自然语言描述，自动生成可视化图表</p>
    </div>
    
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div class="h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)]">
        <TextEditor />
      </div>
      <div class="h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)]">
        <ChartPreview />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextEditor from '@/components/editor/TextEditor.vue'
import ChartPreview from '@/components/chart/ChartPreview.vue'
</script>