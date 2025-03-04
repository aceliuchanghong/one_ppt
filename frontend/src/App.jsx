import { useState } from 'react';
import { Layout, Typography } from 'antd';
import TextEditor from './components/TextEditor';
import ChartPreview from './components/ChartPreview';
import ExportButtons from './components/ExportButtons';
import { MermaidProvider } from './context/MermaidContext';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <MermaidProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ margin: '16px 0' }}>Text to Chart Converter</Title>
        </Header>
        <Content style={{ padding: '24px', background: '#f0f2f5' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <TextEditor />
            </div>
            <div style={{ flex: 1 }}>
              <ChartPreview />
              <ExportButtons />
            </div>
          </div>
        </Content>
      </Layout>
    </MermaidProvider>
  );
}

export default App;