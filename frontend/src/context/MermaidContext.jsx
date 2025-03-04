import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MermaidContext = createContext();

// 配置axios默认baseURL
axios.defaults.baseURL = 'http://localhost:5000';

export function MermaidProvider({ children }) {
  const [text, setText] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateChart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/parse-text', {
        description: text,
        complex_mermaid: false
      });
      
      if (response.data.success) {
        setMermaidCode(response.data.mermaidCode);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to generate chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exportChart = async (format) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/generate-chart', {
        mermaidCode,
        format
      });

      if (response.data.success) {
        window.open(response.data.fileUrl, '_blank');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to export chart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MermaidContext.Provider value={{
      text,
      setText,
      mermaidCode,
      loading,
      error,
      generateChart,
      exportChart
    }}>
      {children}
    </MermaidContext.Provider>
  );
}

export function useMermaid() {
  const context = useContext(MermaidContext);
  if (!context) {
    throw new Error('useMermaid must be used within a MermaidProvider');
  }
  return context;
}