import { defineStore } from 'pinia';
import api from '@/services/api';

export const useChartStore = defineStore('chart', {
  state: () => ({
    textInput: '',
    mermaidCode: '',
    isLoading: false,
    error: null,
    exportFormat: 'svg',
    exportUrl: null,
    history: [],
    darkMode: localStorage.getItem('darkMode') === 'true'
  }),
  
  actions: {
    async generateMermaidCode(selectedText = null) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const textToProcess = selectedText || this.textInput;
        const response = await api.parseText(textToProcess);
        
        if (response.data.success) {
          this.mermaidCode = response.data.mermaidCode;
          
          // 添加到历史记录
          if (!this.history.some(item => item.text === this.textInput)) {
            this.history.push({
              id: Date.now(),
              text: this.textInput,
              mermaidCode: this.mermaidCode,
              timestamp: new Date().toISOString()
            });
            
            // 最多保存10条历史记录
            if (this.history.length > 10) {
              this.history.shift();
            }
          }
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        this.error = error.response?.data?.message || '生成图表代码失败';
        console.error('Error generating mermaid code:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async exportChart() {
      if (!this.mermaidCode) {
        this.error = '没有可导出的图表';
        return;
      }
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.generateChart(this.mermaidCode, this.exportFormat);
        
        if (response.data.success) {
          this.exportUrl = response.data.fileUrl;
          // 创建临时链接下载文件
          const link = document.createElement('a');
          link.href = this.exportUrl;
          link.download = `chart.${this.exportFormat}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        this.error = error.response?.data?.message || '导出图表失败';
        console.error('Error exporting chart:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    setExportFormat(format) {
      this.exportFormat = format;
    },
    
    updateTextInput(text) {
      this.textInput = text;
    },
    
    clearInput() {
      this.textInput = '';
      this.mermaidCode = '';
      this.error = null;
    },
    
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      document.documentElement.classList.toggle('dark');
    },
    
    initDarkMode() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }
});