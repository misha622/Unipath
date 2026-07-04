#!/usr/bin/env python3
"""
Обогащение данных университетов через Wikipedia API + WHED
Исправленная версия с обработкой ошибок и правильным пропуском обработанных
"""
import json
import time
import re
import logging
from pathlib import Path
from bs4 import BeautifulSoup
import requests
import urllib3

# Отключаем предупреждения SSL
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('enrich.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class UniversityEnricher:
    def __init__(self, data_file: str = "whed_data/whed_data.json"):
        self.data_file = data_file
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'WHED-Enricher/1.0 (research project; research@example.com)'
        })
        self.session.verify = False  # Игнорируем SSL ошибки WHED

        with open(data_file, 'r', encoding='utf-8') as f:
            self.data = json.load(f)

    def save(self):
        """Сохранение данных"""
        try:
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, ensure_ascii=False, indent=2)
            logger.debug("Data saved successfully")
        except Exception as e:
            logger.error(f"Save error: {e}")

    def search_wikipedia(self, uni_name: str) -> dict:
        """Поиск статьи в Wikipedia через API"""
        try:
            api_url = "https://en.wikipedia.org/w/api.php"

            # Ищем статью
            resp = self.session.get(api_url, params={
                'action': 'query',
                'list': 'search',
                'srsearch': f"{uni_name} university",
                'format': 'json',
                'srlimit': 3
            }, timeout=15)

            if resp.status_code != 200:
                return None

            data = resp.json()

            if not data.get('query', {}).get('search'):
                return None

            page_title = data['query']['search'][0]['title']
            info = {'wiki_url': f"https://en.wikipedia.org/wiki/{page_title.replace(' ', '_')}"}

            # Получаем extract (описание)
            resp = self.session.get(api_url, params={
                'action': 'query',
                'prop': 'extracts',
                'exintro': 1,
                'explaintext': 1,
                'titles': page_title,
                'format': 'json'
            }, timeout=15)

            if resp.status_code == 200:
                pages = resp.json().get('query', {}).get('pages', {})
                for page in pages.values():
                    if 'extract' in page:
                        info['description'] = page['extract'][:500]

            # Парсим HTML для founded, students, website
            html_resp = self.session.get(info['wiki_url'], timeout=15)
            if html_resp.status_code == 200:
                soup = BeautifulSoup(html_resp.text, 'html.parser')

                infobox = soup.find('table', class_='infobox')
                if infobox:
                    for row in infobox.find_all('tr'):
                        th = row.find('th')
                        td = row.find('td')
                        if th and td:
                            k = th.get_text(strip=True).lower()
                            v = td.get_text(strip=True)

                            if 'established' in k or 'founded' in k:
                                m = re.search(r'\d{4}', v)
                                if m:
                                    info['founded'] = int(m.group())
                            elif 'students' in k:
                                m = re.search(r'[\d,]+', v)
                                if m:
                                    info['students'] = m.group().replace(',', '')
                            elif 'website' in k:
                                a = td.find('a')
                                if a:
                                    w = a.get('href', '')
                                    if w and 'cloudflare' not in w:
                                        info['website'] = w

            return info

        except Exception as e:
            logger.debug(f"Wiki error for '{uni_name}': {e}")
            return None

    def find_website_from_whed(self, iau_link: str) -> str:
        """Парсинг website со страницы WHED"""
        try:
            resp = self.session.get(iau_link, timeout=15)

            if resp.status_code != 200:
                return None

            soup = BeautifulSoup(resp.text, 'html.parser')

            # Способ 1: dt с "Website"
            for dt in soup.find_all('span', class_='dt'):
                if 'website' in dt.get_text(strip=True).lower():
                    dd = dt.find_next('div', class_='dd')
                    if dd:
                        a = dd.find('a')
                        if a:
                            w = a.get('href', '')
                            if w and 'cloudflare' not in w and 'challenge' not in w:
                                return w

            # Способ 2: WWW в адресе
            for dt in soup.find_all('span', class_='dt'):
                if 'address' in dt.get_text(strip=True).lower():
                    dd = dt.find_next('div', class_='dd')
                    if dd:
                        for lib, con in zip(
                                dd.find_all('span', class_='libelle'),
                                dd.find_all('span', class_='contenu')
                        ):
                            if 'WWW' in lib.get_text(strip=True):
                                w = con.get_text(strip=True)
                                if w and 'cloudflare' not in w and 'challenge' not in w:
                                    return w if w.startswith('http') else 'https://' + w
        except Exception:
            pass

        return None

    def is_valid_site(self, url: str) -> bool:
        """Проверяет, что это реальный сайт, а не cloudflare/заглушка"""
        if not url:
            return False
        bad = ['cloudflare', 'challenge', 'captcha', 'redirect', 'whed.net', 'iau.global']
        url_lower = url.lower()
        return not any(b in url_lower for b in bad)

    def enrich_university(self, uni: dict, country_name: str) -> int:
        """Обогащение одного университета. Возвращает количество добавленных полей"""
        name = uni.get('name', '')
        if not name:
            return 0

        added = 0

        # 1. Website из WHED (если нет нормального сайта)
        current_site = uni.get('website', '')
        if not self.is_valid_site(current_site) and uni.get('iau_link'):
            w = self.find_website_from_whed(uni['iau_link'])
            if w and self.is_valid_site(w):
                uni['website'] = w
                added += 1
                logger.info(f"  -> WHED site: {w}")

        # 2. Wikipedia
        if not uni.get('wiki_url'):
            wiki = self.search_wikipedia(name)
            if wiki:
                uni['wiki_url'] = wiki.get('wiki_url')

                if wiki.get('description') and not uni.get('description'):
                    uni['description'] = wiki['description']
                    added += 1

                if wiki.get('founded') and not uni.get('founded'):
                    uni['founded'] = wiki['founded']
                    added += 1

                if wiki.get('students') and not uni.get('students'):
                    uni['students'] = wiki['students']
                    added += 1

                if wiki.get('website') and self.is_valid_site(wiki['website']):
                    if not self.is_valid_site(uni.get('website', '')):
                        uni['website'] = wiki['website']

                logger.info(f"  -> Wiki: {wiki.get('wiki_url')}")

        return added

    def get_stats(self) -> dict:
        """Возвращает текущую статистику"""
        total = 0
        with_site = 0
        with_wiki = 0
        with_desc = 0
        with_founded = 0

        for c in self.data['countries']:
            for u in c['institutions']:
                total += 1
                if self.is_valid_site(u.get('website', '')):
                    with_site += 1
                if u.get('wiki_url'):
                    with_wiki += 1
                if u.get('description'):
                    with_desc += 1
                if u.get('founded'):
                    with_founded += 1

        return {
            'total': total,
            'with_site': with_site,
            'with_wiki': with_wiki,
            'with_desc': with_desc,
            'with_founded': with_founded
        }

    def run(self, delay: float = 1.0):
        """Запуск обогащения"""
        total = sum(len(c['institutions']) for c in self.data['countries'])
        processed = 0
        enriched = 0

        logger.info(f"Starting enrichment: {total} universities")

        for country in self.data['countries']:
            for uni in country['institutions']:
                processed += 1

                # Проверяем, нужно ли обрабатывать
                has_site = self.is_valid_site(uni.get('website', ''))
                has_wiki = bool(uni.get('wiki_url'))

                if has_site and has_wiki:
                    continue  # Уже всё есть

                name = uni.get('name', '?')[:70]
                logger.info(f"[{processed}/{total}] {country['country_name']}: {name}")

                try:
                    added = self.enrich_university(uni, country['country_name'])
                    enriched += added
                except Exception as e:
                    logger.error(f"  Error: {e}")

                # Сохраняем каждые 100
                if processed % 100 == 0:
                    self.save()
                    stats = self.get_stats()
                    logger.info(
                        f"  [Saved #{processed}] "
                        f"Site: {stats['with_site']} ({stats['with_site'] * 100 // stats['total']}%), "
                        f"Wiki: {stats['with_wiki']} ({stats['with_wiki'] * 100 // stats['total']}%)"
                    )

                time.sleep(delay)

        # Финальное сохранение
        self.save()
        stats = self.get_stats()
        t = stats['total']

        logger.info(f"\n{'=' * 50}")
        logger.info(f"DONE!")
        logger.info(f"Total universities: {t}")
        logger.info(f"With website: {stats['with_site']} ({stats['with_site'] * 100 // t}%)")
        logger.info(f"With Wikipedia: {stats['with_wiki']} ({stats['with_wiki'] * 100 // t}%)")
        logger.info(f"With description: {stats['with_desc']} ({stats['with_desc'] * 100 // t}%)")
        logger.info(f"With founded year: {stats['with_founded']} ({stats['with_founded'] * 100 // t}%)")
        logger.info(f"Data saved to: {self.data_file}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='WHED University Enricher')
    parser.add_argument('--delay', type=float, default=1.0, help='Delay between requests (seconds)')
    parser.add_argument('--country', type=str, help='Process only one country')
    args = parser.parse_args()

    enricher = UniversityEnricher()

    if args.country:
        enricher.data['countries'] = [
            c for c in enricher.data['countries']
            if c['country_name'].lower() == args.country.lower()
        ]
        if not enricher.data['countries']:
            logger.error(f"Country not found: {args.country}")
            exit(1)

    enricher.run(delay=args.delay)