import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

chrome_options = Options()
chrome_options.add_argument('--window-size=1920,1080')

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://whed.net/home.php')
time.sleep(3)

form = driver.find_element(By.ID, 'fsearch')
select = Select(driver.find_element(By.ID, 'Chp1'))
select.select_by_value('Algeria')
time.sleep(1)
driver.execute_script('arguments[0].submit();', form)
time.sleep(5)

links = driver.find_elements(By.CSS_SELECTOR, 'ul#results li h3 a')
links[0].click()
time.sleep(3)

iframe = driver.find_element(By.CSS_SELECTOR, '.fancybox-inner iframe')
driver.switch_to.frame(iframe)

for i in range(3):
    driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
    time.sleep(1)

soup = BeautifulSoup(driver.page_source, 'html.parser')

print('=== H3 TAGS ===')
for h3 in soup.find_all('h3'):
    print('  -', h3.get_text(strip=True)[:100])

print('\n=== DT SPANS ===')
for dt in soup.find_all('span', class_='dt'):
    print('  -', dt.get_text(strip=True)[:100])

print('\n=== PRINCIPAL PARAGRAPHS ===')
for p in soup.find_all('p', class_='principal'):
    print('  -', p.get_text(strip=True)[:100])

dls = soup.find_all('div', class_='dl')
print(f'\n=== DIV.DL: {len(dls)} found ===')

driver.quit()