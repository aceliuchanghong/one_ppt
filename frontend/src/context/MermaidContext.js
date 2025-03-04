import { ref, reactive, provide, inject } from 'vue';
import axios from 'axios';

const MermaidSymbol = Symbol();

export function provideMermaidContext() {
  const text = ref('');
  const mermaidCode = ref('');
  const loading = ref(false);
  const error = ref(null);

  const state = reactive({
    text,
    mermaidCode,
    loading,
    error
  });

  // 生成Mermaid代码
  async function generateMermaidCode() {
    if (!text.value.trim()) {
      error.value = '请输入文本描述';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post('/api/parse-text', {
        description: text.value,
        complex_mermaid: false
      });

      if (response.data.success) {
        mermaidCode.value = response.data.mermaidCode;
      } else {
        error.value = response.data.message || '生成图表失败';
      }
    } catch (err) {
      error.value = '请求失败: ' + (err.message || '未知错误');
      console.error('API请求错误:', err);
    } finally {
      loading.value = false;
    }
  }

  // 导出图表
  async function exportChart(format) {
    if (!mermaidCode.value) {
      error.value = '请先生成图表';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post('/api/generate-chart', {
        mermaidCode: mermaidCode.value,
        format: format
      }, {
        responseType: 'blob'
      });

      // 创建下载链接
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chart.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      error.value = '导出失败: ' + (err.message || '未知错误');
      console.error('导出错误:', err);
    } finally {
      loading.value = false;
    }
  }

  provide(MermaidSymbol, {
    state,
    setText: (newText) => { text.value = newText; },
    generateMermaidCode,
    exportChart
  });
}

export function useMermaidContext() {
  const context = inject(MermaidSymbol);
  if (!context) {
    throw new Error('useMermaidContext must be used within a provider');
  }
  return context;
}