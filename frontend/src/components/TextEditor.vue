<script setup>
import { useMermaidContext } from '../context/MermaidContext';

const { state, setText, generateMermaidCode } = useMermaidContext();
</script>

<template>
  <div class="text-editor">
    <textarea
      v-model="state.text"
      @input="setText($event.target.value)"
      placeholder="请输入自然语言描述..."
      class="editor"
    ></textarea>
    <div class="button-container">
      <button
        @click="generateMermaidCode"
        :disabled="state.loading || !state.text.trim()"
        class="generate-btn"
      >
        {{ state.loading ? '生成中...' : '生成图表' }}
      </button>
    </div>
    <p v-if="state.error" class="error-message">{{ state.error }}</p>
  </div>
</template>

<style scoped>
.text-editor {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.editor {
  width: 100%;
  min-height: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  margin-bottom: 15px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.generate-btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.generate-btn:hover:not(:disabled) {
  background-color: #3aa876;
}

.generate-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin-top: 10px;
  text-align: center;
}
</style>