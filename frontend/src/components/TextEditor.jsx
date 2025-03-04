import { Input, Button, Space } from 'antd';
import { useMermaid } from '../context/MermaidContext';

const { TextArea } = Input;

function TextEditor() {
  const { text, setText, generateChart, loading } = useMermaid();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text description here..."
        autoSize={{ minRows: 10, maxRows: 20 }}
        style={{ fontFamily: 'monospace' }}
      />
      <Button
        type="primary"
        onClick={generateChart}
        loading={loading}
        style={{ width: '100%' }}
      >
        Generate Chart
      </Button>
    </Space>
  );
}

export default TextEditor;