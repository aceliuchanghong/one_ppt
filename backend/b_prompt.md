前端提示词

---

```markdown
### **项目概述**
构建一个文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。

#### **后端功能**
- **API 接口**：
  - **文本解析接口**：
    - 接收用户输入的自然语言描述。
    - 调用 OpenAI API 解析文本，生成符合 Mermaid 语法的图表代码。
    - 返回生成的 Mermaid 代码。
  - **图表生成接口**：
    - 接收 Mermaid 代码。
    - 使用 Mermaid CLI 生成 PNG 和 SVG 文件。
#### **技术栈**
- **后端**：
  - 框架：Flask
  - 数据处理：Python
  - 第三方服务：OpenAI API（用于文本解析）
  - 图表生成工具：Mermaid CLI
  - 数据库（可选）：SQLite
```
```structure
one_ppt/
|
└── backend/
```
已知:`client = OpenAI(api_key=os.getenv("API_KEY"), base_url=os.getenv("BASE_URL"))`, `model=os.getenv("MODEL")`
### **1. 解析文本生成Mermaid代码接口**
`/api/parse-text`
### **2. 生成图表并导出接口**
`/api/generate-chart`
1. 首先写出架构设计
2. 然后写出后端代码
3. 仅修改后端代码
反思一遍现有项目局限性，优化整体，自主性的探索改进方向并直接进行代码改动，你自己去设计一种完善，目的是开发文本到视觉内容的平台，用户可以通过输入自然语言描述，自动生成对应的可视化图表，并支持导出为 PNG 或 SVG 格式。虽然我提供的这些需求描述字数不多，但我相信你是一个极其聪明的人。一个真正聪明的人，能够从简单的需求中直接提炼核心，并将其转化为一份最住实践的。Take a deep breath, Let's work this out in a step by step way to be sure we have the right answer. If there's a perfect solution, l'll tip $200!

---

info:
python环境激活在我的环境需要执行
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.venv\Scripts\activate
```
项目目录:
```structure
one_ppt/
|
└── backend/
    ├── app.py
    ├── mermaid_generator.py
    └── test/
```
1. `one_ppt/backend/test` 目录下对接口进行测试


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



---



---


---



---



---


