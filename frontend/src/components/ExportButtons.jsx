import { Button, Space } from 'antd';
import { useMermaid } from '../context/MermaidContext';

function ExportButtons() {
  const { exportChart, loading, mermaidCode } = useMermaid();

  return (
    <Space>
      <Button
        onClick={() => exportChart('png')}
        disabled={!mermaidCode || loading}
      >
        Export as PNG
      </Button>
      <Button
        onClick={() => exportChart('svg')}
        disabled={!mermaidCode || loading}
      >
        Export as SVG
      </Button>
    </Space>
  );
}

export default ExportButtons;