import { useEffect, useRef } from 'react';
import { Card } from 'antd';
import mermaid from 'mermaid';
import { useMermaid } from '../context/MermaidContext';

function ChartPreview() {
  const { mermaidCode, error } = useMermaid();
  const containerRef = useRef(null);

  useEffect(() => {
    if (mermaidCode && containerRef.current) {
      mermaid.initialize({ startOnLoad: true });
      try {
        containerRef.current.innerHTML = '';
        mermaid.render('mermaid-diagram', mermaidCode).then(({ svg }) => {
          containerRef.current.innerHTML = svg;
        });
      } catch (err) {
        console.error('Failed to render mermaid diagram:', err);
      }
    }
  }, [mermaidCode]);

  return (
    <Card title="Chart Preview" style={{ marginBottom: '24px' }}>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div ref={containerRef} style={{ minHeight: '200px' }} />
      )}
    </Card>
  );
}

export default ChartPreview;