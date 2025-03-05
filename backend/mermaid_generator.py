import os
import subprocess
import uuid
import logging
from termcolor import colored

logger = logging.getLogger(__name__)

class MermaidGenerator:
    def __init__(self, output_dir="static/charts"):
        self.output_dir = output_dir
        # 确保输出目录存在
        os.makedirs(output_dir, exist_ok=True)
        logger.info(colored(f"初始化MermaidGenerator，输出目录：{output_dir}", "blue"))
    
    def generate_chart(self, mermaid_code, format_type):
        """
        使用Mermaid CLI生成图表
        
        Args:
            mermaid_code (str): Mermaid语法代码
            format_type (str): 输出格式，'png'或'svg'
            
        Returns:
            tuple: (成功标志, 文件路径或错误消息)
        """
        try:
            # 创建临时文件存储Mermaid代码
            file_id = str(uuid.uuid4())
            input_file = os.path.join(self.output_dir, f"{file_id}.mmd")
            output_file = os.path.join(self.output_dir, f"{file_id}.{format_type}")
            
            # 写入Mermaid代码到临时文件
            with open(input_file, 'w', encoding='utf-8') as f:
                f.write(mermaid_code)
            
            # 使用npx执行Mermaid CLI命令
            cmd = [
                "npx", "--yes", "@mermaid-js/mermaid-cli",
                "--input", input_file,
                "--output", output_file
            ]
            
            logger.info(colored(f"执行命令：{' '.join(cmd)}", "blue"))
            
            # 执行命令
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                check=True
            )
            
            # 删除临时输入文件
            if os.path.exists(input_file):
                os.remove(input_file)
            
            # 检查输出文件是否生成
            if os.path.exists(output_file):
                # 返回相对于静态目录的路径
                relative_path = output_file.replace(os.path.sep, '/')
                logger.info(colored(f"成功生成图表：{relative_path}", "green"))
                return True, relative_path
            else:
                error_msg = f"图表生成失败，输出文件不存在：{output_file}"
                logger.error(colored(error_msg, "red"))
                return False, error_msg
                
        except subprocess.CalledProcessError as e:
            error_msg = f"执行Mermaid CLI时出错：{e.stderr}"
            logger.error(colored(error_msg, "red"))
            return False, error_msg
        except Exception as e:
            error_msg = f"生成图表时出错：{str(e)}"
            logger.error(colored(error_msg, "red"))
            return False, error_msg
    
    def cleanup_old_files(self, max_age_hours=24):
        """
        清理旧的图表文件
        
        Args:
            max_age_hours (int): 文件最大保留时间（小时）
        """
        import time
        from datetime import datetime, timedelta
        
        cutoff_time = datetime.now() - timedelta(hours=max_age_hours)
        cutoff_timestamp = cutoff_time.timestamp()
        
        try:
            file_count = 0
            for filename in os.listdir(self.output_dir):
                file_path = os.path.join(self.output_dir, filename)
                if os.path.isfile(file_path):
                    file_timestamp = os.path.getmtime(file_path)
                    if file_timestamp < cutoff_timestamp:
                        os.remove(file_path)
                        file_count += 1
            
            if file_count > 0:
                logger.info(colored(f"已清理{file_count}个过期图表文件", "blue"))
        
        except Exception as e:
            logger.error(colored(f"清理旧文件时出错：{str(e)}", "red"))