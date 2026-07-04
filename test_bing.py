# test_bing.py
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

chrome_options = Options()
chrome_options.add_argument('--window-size=1920,1080')

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

query = "University of Luxembourg official website"
driver.get(f"https://www.bing.com/search?q={query}")
time.sleep(3)

with open('bing_test.html', 'w', encoding='utf-8') as f:
    f.write(driver.page_source)

soup = BeautifulSoup(driver.page_source, 'html.parser')

# Ищем ВСЕ ссылки
print("=== ALL LINKS ===")
for a in soup.find_all('a', href=True)[:30]:
    href = a['href']
    text = a.get_text(strip=True)[:80]
    if text and href.startswith('http'):
        print(f"  {text} -> {href[:120]}")

# Ищем разные классы
for cls in ['b_algo', 'b_title', 'b_caption', 'b_attribution']:
    elems = soup.find_all(class_=cls)
    print(f"\n.{cls}: {len(elems)} found")

driver.quit()