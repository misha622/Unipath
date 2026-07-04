# test_google.py
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

chrome_options = Options()
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--window-size=1920,1080')

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

query = "University of Luxembourg official website"
driver.get(f"https://www.google.com/search?q={query}&hl=en")
time.sleep(3)

# Сохраним HTML
with open('google_test.html', 'w', encoding='utf-8') as f:
    f.write(driver.page_source)

soup = BeautifulSoup(driver.page_source, 'html.parser')
print("=== All links ===")
for a in soup.find_all('a', href=True)[:20]:
    href = a['href']
    if href.startswith('http') and 'google' not in href:
        print(a.get_text(strip=True)[:80], '->', href[:100])

driver.quit()