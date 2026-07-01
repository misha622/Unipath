#!/usr/bin/env python3
"""Отладка страницы деталей через Selenium"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

chrome_options = Options()
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--window-size=1920,1080')

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Загружаем страницу результатов для Algeria
    print("Загрузка страницы результатов...")
    driver.get("https://whed.net/home.php")
    time.sleep(3)

    # Выбираем Algeria и отправляем форму
    from selenium.webdriver.support.ui import Select

    form = driver.find_element(By.ID, "fsearch")
    select = Select(driver.find_element(By.ID, "Chp1"))
    select.select_by_value("Algeria")
    time.sleep(1)
    driver.execute_script("arguments[0].submit();", form)
    time.sleep(5)

    # Кликаем на первый университет для открытия деталей
    print("Открываем детали первого университета...")
    first_link = driver.find_element(By.CSS_SELECTOR, "ul#results li h3 a")
    first_link.click()
    time.sleep(5)

    # Сохраняем скриншот
    driver.save_screenshot("debug_detail_selenium.png")
    print("Скриншот сохранен: debug_detail_selenium.png")

    # Сохраняем HTML
    with open("debug_detail_selenium.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    print("HTML сохранен: debug_detail_selenium.html")

    # Анализируем HTML
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    print("\n=== ПОИСК КЛЮЧЕВЫХ СЕКЦИЙ ===")

    # Ищем заголовки h3
    h3s = soup.find_all('h3')
    print(f"Найдено h3: {len(h3s)}")
    for h3 in h3s:
        print(f"  - {h3.get_text(strip=True)[:100]}")

    # Ищем dt элементы
    dts = soup.find_all('span', class_='dt')
    print(f"\nНайдено dt: {len(dts)}")
    for dt in dts:
        print(f"  - {dt.get_text(strip=True)[:100]}")

    # Ищем div.dl
    dls = soup.find_all('div', class_='dl')
    print(f"\nНайдено div.dl: {len(dls)}")

    # Ищем principal параграфы
    principals = soup.find_all('p', class_='principal')
    print(f"\nНайдено p.principal: {len(principals)}")
    for p in principals[:10]:
        print(f"  - {p.get_text(strip=True)[:100]}")

    input("\nНажмите Enter для завершения...")

finally:
    driver.quit()