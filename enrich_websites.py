#!/usr/bin/env python3
"""
Дособирает website, email, контакты из страниц WHED
"""

import json
import time
import re
import logging
from pathlib import Path
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('enrich.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


def enrich_universities(data_file: str = "whed_data/whed_data.json", delay: float = 1.0):
    # Загружаем данные
    with open(data_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Собираем вузы без website
    to_enrich = []
    for country in data['countries']:
        for uni in country['institutions']:
            if not uni.get('website') and uni.get('iau_link'):
                to_enrich.append(uni)

    logger.info(f"Всего без website: {len(to_enrich)}")

    if not to_enrich:
        logger.info("Все вузы уже с website!")
        return

    # Запускаем браузер
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--window-size=1920,1080')

    try:
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
    except:
        driver = webdriver.Chrome(options=chrome_options)

    enriched = 0

    try:
        for i, uni in enumerate(to_enrich, 1):
            if uni.get('website'):  # Уже нашли ранее
                continue

            iau_link = uni['iau_link']
            logger.info(f"[{i}/{len(to_enrich)}] {uni.get('name', 'Unknown')[:60]}...")

            try:
                driver.get(iau_link)
                time.sleep(delay + 1)

                soup = BeautifulSoup(driver.page_source, 'html.parser')

                # Ищем website разными способами
                website = None

                # 1. В dt/dd
                for dt in soup.find_all('span', class_='dt'):
                    if 'website' in dt.get_text(strip=True).lower():
                        dd = dt.find_next('div', class_='dd')
                        if dd:
                            link = dd.find('a')
                            if link:
                                website = link.get('href', '')
                            else:
                                website = dd.get_text(strip=True)

                # 2. В адресе (WWW)
                if not website:
                    for dt in soup.find_all('span', class_='dt'):
                        if 'address' in dt.get_text(strip=True).lower():
                            dd = dt.find_next('div', class_='dd')
                            if dd:
                                for lib, con in zip(dd.find_all('span', class_='libelle'),
                                                    dd.find_all('span', class_='contenu')):
                                    if 'WWW' in lib.get_text(strip=True):
                                        website = con.get_text(strip=True)

                # 3. Поиск в тексте
                if not website:
                    match = re.search(r'https?://[^\s<>"\']+', driver.page_source)
                    if match and 'whed.net' not in match.group(0) and 'iau.global' not in match.group(0):
                        website = match.group(0)

                if website:
                    if not website.startswith('http'):
                        website = 'https://' + website
                    uni['website'] = website
                    enriched += 1
                    logger.info(f"  -> {website}")

                # Email
                email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', driver.page_source)
                if email_match and not uni.get('email'):
                    uni['email'] = email_match.group(0)

            except Exception as e:
                logger.error(f"  Error: {e}")
                continue

            if i % 100 == 0:
                logger.info(f"Progress: {i}/{len(to_enrich)}, enriched: {enriched}")
                # Сохраняем промежуточный результат
                with open(data_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)

    finally:
        driver.quit()

    # Сохраняем финальный результат
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Статистика
    total = sum(len(c['institutions']) for c in data['countries'])
    with_web = sum(1 for c in data['countries'] for u in c['institutions'] if u.get('website'))
    logger.info(f"\n{'=' * 50}")
    logger.info(f"ГОТОВО! Обогащено: {enriched} сайтов")
    logger.info(f"Всего с website: {with_web}/{total} ({with_web * 100 // total}%)")
    logger.info(f"Данные сохранены в {data_file}")


if __name__ == "__main__":
    enrich_universities()