import os
from dotenv import load_dotenv
import logging
from termcolor import colored
from openai import OpenAI

load_dotenv()
log_level = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=getattr(logging, log_level),
    format="%(asctime)s-%(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    # uv run backend/test_llm.py
    client = OpenAI(api_key=os.getenv("API_KEY"), base_url=os.getenv("BASE_URL"))
    messages = [
        {"role": "system", "content": "你是贾维斯"},
        {"role": "user", "content": "你好,你是谁?"},
    ]
    response = client.chat.completions.create(
        model=os.getenv("MODEL"),
        messages=messages,
        temperature=0.7,
    )
    logger.info(colored(f"{response.choices[0].message.content}", "green"))
