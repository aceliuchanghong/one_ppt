import os
from dotenv import load_dotenv
import logging
from termcolor import colored
from openai import OpenAI
from flask import Flask, request, jsonify
from mermaid_generator import MermaidGenerator

load_dotenv()
log_level = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=getattr(logging, log_level),
    format="%(asctime)s-%(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
client = OpenAI(api_key=os.getenv("API_KEY"), base_url=os.getenv("BASE_URL"))

@app.route('/api/parse-text', methods=['POST'])
def parse_text():
    try:
        data = request.get_json()
        description = data.get('description')
        complex_mermaid = data.get('complex_mermaid', False)
        
        if not description:
            return jsonify({
                'success': False,
                'message': '请提供文本描述'
            }), 400

        # 构建提示词
        system_prompt = "你是一个专业的图表生成助手，擅长将文本描述转换为Mermaid图表代码。请仅返回有效的Mermaid代码，不要包含任何其他解释。"
        if complex_mermaid:
            system_prompt += "请生成一个复杂的图表，包含更多细节和层次。"

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"请将以下描述转换为Mermaid图表代码：\n{description}"}
        ]

        response = client.chat.completions.create(
            model=os.getenv("MODEL"),
            messages=messages,
            temperature=0.7,
        )

        mermaid_code = response.choices[0].message.content.strip()
        logger.info(colored(f"生成的Mermaid代码：\n{mermaid_code}", "green"))

        return jsonify({
            'success': True,
            'message': '成功生成Mermaid代码',
            'mermaidCode': mermaid_code
        })

    except Exception as e:
        logger.error(colored(f"生成Mermaid代码时出错：{str(e)}", "red"))
        return jsonify({
            'success': False,
            'message': f'生成失败：{str(e)}'
        }), 500

@app.route('/api/generate-chart', methods=['POST'])
def generate_chart():
    try:
        data = request.get_json()
        mermaid_code = data.get('mermaidCode')
        format_type = data.get('format')

        if not mermaid_code or not format_type:
            return jsonify({
                'success': False,
                'message': '请提供Mermaid代码和导出格式'
            }), 400

        if format_type not in ['png', 'svg']:
            return jsonify({
                'success': False,
                'message': '导出格式必须是 png 或 svg'
            }), 400

        # 使用MermaidGenerator生成图表
        generator = MermaidGenerator()
        success, result = generator.generate_chart(mermaid_code, format_type)

        if success:
            # 清理旧文件
            generator.cleanup_old_files()
            return jsonify({
                'success': True,
                'message': '成功生成图表',
                'fileUrl': result
            })
        else:
            return jsonify({
                'success': False,
                'message': result
            }), 500

    except Exception as e:
        logger.error(colored(f"生成图表时出错：{str(e)}", "red"))
        return jsonify({
            'success': False,
            'message': f'生成失败：{str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)