import unittest
import json
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_parse_text_success(self):
        """测试文本解析接口 - 成功场景"""
        test_data = {
            "description": "创建一个简单的流程图，显示用户登录流程",
            "complex_mermaid": False
        }
        response = self.app.post('/api/parse-text',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('mermaidCode', data)
        self.assertIsInstance(data['mermaidCode'], str)

    def test_parse_text_empty_description(self):
        """测试文本解析接口 - 空描述场景"""
        test_data = {
            "description": "",
            "complex_mermaid": False
        }
        response = self.app.post('/api/parse-text',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertFalse(data['success'])

    def test_generate_chart_success(self):
        """测试图表生成接口 - 成功场景"""
        test_data = {
            "mermaidCode": "graph TD\nA[开始] --> B[结束]",
            "format": "png"
        }
        response = self.app.post('/api/generate-chart',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        self.assertIn('fileUrl', data)

    def test_generate_chart_invalid_format(self):
        """测试图表生成接口 - 无效格式场景"""
        test_data = {
            "mermaidCode": "graph TD\nA[开始] --> B[结束]",
            "format": "invalid"
        }
        response = self.app.post('/api/generate-chart',
                               data=json.dumps(test_data),
                               content_type='application/json')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertFalse(data['success'])

if __name__ == '__main__':
    unittest.main()