## only_one_page_ppt

The AI only focuses on generating a single slide of PPT.

## install

```shell
# 初始化python环境
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
uv init
uv venv
.venv\Scripts\activate
uv pip install .
# 前端相关
cd frontend
npm install
npm run dev
```

## design

```markdown
### **项目概述**
构建一个文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。

#### **1. 前端功能**
- **用户输入界面**：
  - 提供一个文本输入框，用户可以输入自然语言描述。
  - 支持实时预览生成的图表。
- **图表展示**：
  - 使用 Mermaid.js 渲染生成的图表。
  - 支持动态更新图表内容（当用户修改输入时，图表实时刷新）。
- **文件导出**：
  - 提供按钮，允许用户将生成的图表导出为 PNG 或 SVG 格式。
  - 导出功能需调用后端 API 获取文件。

#### **2. 后端功能**
- **API 接口**：
  - **文本解析接口**：
    - 接收用户输入的自然语言描述。
    - 调用 OpenAI API 解析文本，生成符合 Mermaid 语法的图表代码。
    - 返回生成的 Mermaid 代码。
  - **图表生成接口**：
    - 接收 Mermaid 代码。
    - 使用 Mermaid CLI 生成 PNG 和 SVG 文件。

#### **3. 技术栈**
- **后端**：
  - 框架：Flask
  - 数据处理：Python
  - 第三方服务：OpenAI API（用于文本解析）
  - 图表生成工具：Mermaid CLI
  - 数据库（可选）：SQLite
- **前端**：
  - 框架：Vue3
  - 图表渲染：Mermaid.js
  - HTTP 请求：Axios
```
