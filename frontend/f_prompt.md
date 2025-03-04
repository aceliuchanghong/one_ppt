前端提示词

---

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
帮我仅仅设计前端后端交互的接口格式以及参数描述之类

---

```markdown
### **1. 文本解析接口**

#### **URL**：
`/api/parse-text`
#### **请求参数**：
```json
{
  "description": "string", // 用户输入的自然语言描述（必填）
  "complex_mermaid": False // 是否需要复杂表格
}
```
#### **响应格式**：
```json
{
  "success": true,         // 是否成功
  "message": "string",     // 返回的消息（如错误信息或成功提示）
  "mermaidCode": "string"  // 生成的 Mermaid 语法代码（仅在 success 为 true 时返回）
}
```

### **2. 图表生成接口**

#### **URL**：
`/api/generate-chart`
#### **请求参数**：
```json
{
  "mermaidCode": "string", // Mermaid 语法代码（必填）
  "format": "string"       // 导出格式，可选值为 "png" 或 "svg"（必填）
}
```
#### **响应格式**：
```json
{
  "success": true,         // 是否成功
  "message": "string",     // 返回的消息（如错误信息或成功提示）
  "fileUrl": "string"      // 生成的文件下载链接（仅在 success 为 true 时返回）
}
```

### **3. 注意事项**
1. **错误处理**：
   - 如果用户输入的自然语言描述无法解析为有效的 Mermaid 代码，`/api/parse-text` 应返回 `success: false` 并提供详细的错误信息。
   - 如果生成图表失败（例如 Mermaid CLI 执行错误），`/api/generate-chart` 应返回 `success: false` 并说明原因。
2. **性能优化**：
   - 对于频繁使用的 Mermaid 代码，可以考虑缓存生成结果以减少重复计算。
```

---

```markdown
### **项目概述**
构建一个文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。

#### **1. 前端功能**
- **用户输入界面**：
  - 提供一个类似笔记本的页面，用户可以输入自然语言描述。然后选择输入的文本,点击生成即可
  - 支持实时预览生成的图表。
- **图表展示**：
  - 使用 Mermaid.js 渲染生成的图表。
  - 支持动态更新图表内容（当用户修改输入时，图表实时刷新）。
- **文件导出**：
  - 提供按钮，允许用户将生成的图表导出为 PNG 或 SVG 格式。

#### **3. 技术栈**
- **前端**：
  - Vue3
  - 图表渲染：Mermaid.js
  - HTTP 请求：Axios
```
帮我写一下前端在`frontend`下面
```
one_ppt/
|
├── backend/
└── frontend/
```
1.首先写出架构设计
2.然后写出前端代码
3.给出怎么执行安装的步骤

---

```markdown
### **项目概述**
构建一个文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。

#### **1. 前端功能**
- **用户输入界面**：
  - 提供一个类似笔记本的页面，用户可以输入自然语言描述。然后选择输入的文本,点击生成即可
  - 支持实时预览生成的图表。
- **图表展示**：
  - 使用 Mermaid.js 渲染生成的图表。
  - 支持动态更新图表内容（当用户修改输入时，图表实时刷新）。
- **文件导出**：
  - 提供按钮，允许用户将生成的图表导出为 PNG 或 SVG 格式。

```
```structure
one_ppt/
|
├── backend/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.vue
        ├── main.js
        ├── style.css
        ├── assets/
        │   └── vue.svg
        ├── components/
        │   ├── ChartPreview.vue
        │   ├── HelloWorld.vue
        │   └── TextEditor.vue
        └── context/
            └── MermaidContext.js
```
帮我继续完善前端代码

---

```structure
one_ppt/
|
├── backend/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.vue
        ├── main.js
        ├── style.css
        ├── assets/
        │   └── vue.svg
        ├── components/
        │   ├── ChartPreview.vue
        │   ├── HelloWorld.vue
        │   └── TextEditor.vue
        └── context/
            └── MermaidContext.js
```
怎么指定0.0.0.0和端口,对于命令:`npm run dev`

---

```structure
one_ppt/
|
├── backend/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.vue
        ├── main.js
        ├── style.css
        ├── assets/
        │   └── vue.svg
        ├── components/
        │   ├── ChartPreview.vue
        │   ├── HelloWorld.vue
        │   └── TextEditor.vue
        └── context/
            └── MermaidContext.js
```
仅修改前端涉及的代码:
1. 这个代码里面css,js之类的似乎没有分开,帮我处理一下
2. 界面比较丑
3. 反思一遍现有项目局限性，优化整体布局和视觉层次，自主性的探索改进方向并直接进行代码改动，你自己去设计一种完善，目的是开发文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。虽然我提供的这些需求描述字数不多，但我相信你是一个极其聪明的人。一个真正聪明的人，能够从简单的需求中直接提炼核心，并将其转化为一份最住实践的。Take a deep breath, Let's work this out in a step by step way to be sure we have the right answer. If there's a perfect solution, l'll tip $200!

---

下面是项目结构,仅修改前端涉及的代码
```structure
one_ppt/
|
├── backend/
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.vue
        ├── main.js
        ├── style.css
        ├── assets/
        │   ├── vue.svg
        │   └── css/
        │       ├── main.css
        │       └── tailwind.css
        ├── components/
        │   ├── HelloWorld.vue
        │   ├── Navbar.vue
        │   ├── chart/
        │   │   └── ChartPreview.vue
        │   └── editor/
        │       └── TextEditor.vue
        ├── context/
        │   └── MermaidContext.js
        ├── router/
        │   └── index.js
        ├── services/
        │   └── api.js
        ├── stores/
        │   ├── chartStore.js
        │   └── mermaidStore.js
        └── views/
            ├── History.vue
            ├── Home.vue
            └── Templates.vue
```
1. 反思项目
2. 删除合并不必要的程序
3. 优化架构设计
Take a deep breath, Let's work this out in a step by step way to be sure we have the right answer. If there's a perfect solution, l'll tip $200!


---

```structure
one_ppt/
|
├── backend/
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.vue
        ├── main.js
        ├── style.css
        ├── assets/
        │   ├── vue.svg
        │   └── css/
        │       ├── main.css
        │       └── tailwind.css
        ├── components/
        │   ├── Navbar.vue
        │   ├── chart/
        │   │   └── ChartPreview.vue
        │   └── editor/
        │       └── TextEditor.vue
        ├── router/
        │   └── index.js
        ├── services/
        │   └── api.js
        ├── stores/
        │   └── index.js
        └── views/
            ├── History.vue
            ├── Home.vue
            └── Templates.vue
```
仅修改前端涉及的代码:
1. 不需要模板库
2. 反思一遍现有项目局限性，优化整体布局和视觉层次，自主性的探索改进方向并直接进行代码改动，你自己去设计一种完善，目的是开发文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。虽然我提供的这些需求描述字数不多，但我相信你是一个极其聪明的人。一个真正聪明的人，能够从简单的需求中直接提炼核心，并将其转化为一份最住实践的。Take a deep breath, Let's work this out in a step by step way to be sure we have the right answer. If there's a perfect solution, l'll tip $200!

---

Navbar组件里面切换白天,夜间的似乎没有成功,帮我修改一下

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

---
