import unittest
import os
import sys

# 添加父目录到路径，确保可以导入app模块
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 导入测试模块
from test_api import TestAPI

if __name__ == '__main__':
    # 创建测试套件
    test_suite = unittest.TestSuite()
    
    # 添加测试用例
    test_suite.addTest(unittest.makeSuite(TestAPI))
    
    # 运行测试
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # 输出测试结果摘要
    print(f"\n测试结果摘要:")
    print(f"运行测试: {result.testsRun}")
    print(f"成功: {result.testsRun - len(result.errors) - len(result.failures)}")
    print(f"失败: {len(result.failures)}")
    print(f"错误: {len(result.errors)}")
    
    # 设置退出码
    sys.exit(len(result.failures) + len(result.errors))