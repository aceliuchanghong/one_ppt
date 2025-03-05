import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // 解析文本生成Mermaid代码
  parseText(description, complexMermaid = false) {
    return apiClient.post('/parse-text', {
      description,
      complex_mermaid: complexMermaid
    });
  },
  
  // 生成图表并导出
  generateChart(mermaidCode, format) {
    return apiClient.post('/generate-chart', {
      mermaidCode,
      format
    });
  }
};