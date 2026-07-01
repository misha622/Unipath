#!/usr/bin/env python3
"""
WHED Parser - Complete Working Version
Парсер World Higher Education Database (https://whed.net)
"""

import json
import time
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import re
from urllib.parse import urljoin

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('catch.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class WHEDParser:
    def __init__(self, output_dir: str = "whed_data", delay: float = 2.0, headless: bool = True):
        self.base_url = "https://whed.net"
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.delay = delay
        self.headless = headless

        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        })

        self.progress_file = self.output_dir / "progress.json"
        self.progress = self._load_progress()
        self.driver = None
        self.results_per_page = 100

    def _load_progress(self) -> Dict:
        if self.progress_file.exists():
            try:
                with open(self.progress_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                pass
        return {"processed_countries": [], "last_country": None}

    def _save_progress(self):
        with open(self.progress_file, 'w', encoding='utf-8') as f:
            json.dump(self.progress, f, ensure_ascii=False, indent=2)

    def _init_selenium(self):
        if self.driver is None:
            chrome_options = Options()
            if self.headless:
                chrome_options.add_argument('--headless')
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument('--window-size=1920,1080')

            try:
                service = Service(ChromeDriverManager().install())
                self.driver = webdriver.Chrome(service=service, options=chrome_options)
            except:
                self.driver = webdriver.Chrome(options=chrome_options)
            logger.info("WebDriver initialized")

    def _close_selenium(self):
        if self.driver:
            try:
                self.driver.quit()
            except:
                pass
            self.driver = None

    def get_country_list(self) -> List[Tuple[str, str]]:
        logger.info("Getting country list...")
        self._init_selenium()

        try:
            self.driver.get(f"{self.base_url}/home.php")
            time.sleep(3)

            select_element = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "Chp1"))
            )

            options = select_element.find_elements(By.TAG_NAME, "option")
            countries = []

            for option in options:
                country_id = option.get_attribute("value")
                country_name = option.text.strip()

                if country_id and country_name not in ["", "All countries"]:
                    countries.append((country_name, country_id))

            logger.info(f"Found {len(countries)} countries")
            return countries

        except Exception as e:
            logger.error(f"Error: {e}")
            return []

    def search_and_get_all_universities(self, country_id: str, country_name: str) -> List[Dict]:
        logger.info(f"Searching: {country_name}")

        # Пересоздаем WebDriver для каждой страны
        try:
            self._close_selenium()
        except:
            pass
        self.driver = None
        time.sleep(2)

        self._init_selenium()

        all_universities = []

        try:
            self.driver.get(f"{self.base_url}/home.php")
            time.sleep(3)

            form = self.driver.find_element(By.ID, "fsearch")
            select = Select(self.driver.find_element(By.ID, "Chp1"))
            select.select_by_value(country_id)
            time.sleep(1)

            self.driver.execute_script("arguments[0].submit();", form)
            time.sleep(5)

            try:
                results_select = Select(self.driver.find_element(By.NAME, "nbr_ref_pge"))
                results_select.select_by_value(str(self.results_per_page))
                time.sleep(3)
            except:
                pass

            total_results = self._get_total_results(self.driver.page_source)
            logger.info(f"Total results: {total_results}")

            if total_results == 0:
                return all_universities

            page_num = 0
            while True:
                logger.info(f"Page {page_num + 1}...")

                universities = self._parse_results(self.driver.page_source)
                all_universities.extend(universities)

                if not self._go_to_next_page():
                    break

                page_num += 1
                time.sleep(self.delay)

            logger.info(f"Total: {len(all_universities)}")
            return all_universities

        except Exception as e:
            logger.error(f"Search error: {e}")
            return all_universities

    def _get_total_results(self, html: str) -> int:
        soup = BeautifulSoup(html, 'html.parser')

        infos = soup.find('p', class_='infos')
        if infos:
            match = re.search(r'(\d+)\s+results?\s+found', infos.text)
            if match:
                return int(match.group(1))

        total_input = soup.find('input', {'name': 'total'})
        if total_input:
            return int(total_input.get('value', 0))

        return 0

    def _parse_results(self, html: str) -> List[Dict]:
        soup = BeautifulSoup(html, 'html.parser')
        universities = []

        results_list = soup.find('ul', id='results')
        if not results_list:
            return universities

        items = results_list.find_all('li', class_=re.compile(r'(odd|even)'))

        for item in items:
            try:
                checkbox = item.find('input', {'type': 'checkbox'})
                uni_id = checkbox.get('value') if checkbox else None

                gui_span = item.find_previous_sibling('span', class_='gui')
                iau_id = gui_span.text.strip() if gui_span else None

                h3 = item.find('h3')
                name = h3.find('a').text.strip() if h3 and h3.find('a') else None

                i_name = item.find('p', class_='i_name')
                alt_name = i_name.text.strip() if i_name else None

                detail_link = None
                if h3 and h3.find('a'):
                    href = h3.find('a').get('href', '')
                    if href:
                        detail_link = urljoin(self.base_url, href)

                iau_link = f"https://www.whed.net/institutions/{iau_id}" if iau_id else None

                universities.append({
                    'id': uni_id,
                    'iau_id': iau_id,
                    'name': name,
                    'alt_name': alt_name,
                    'detail_url': detail_link,
                    'iau_link': iau_link
                })

            except Exception as e:
                logger.error(f"Parse error: {e}")
                continue

        return universities

    def _go_to_next_page(self) -> bool:
        try:
            next_link = self.driver.find_element(By.CSS_SELECTOR, "a.next")
            if next_link and next_link.is_enabled():
                next_link.click()
                time.sleep(3)
                return True
            return False
        except:
            return False

    def get_university_details_via_click(self, index: int) -> Dict:
        details = {
            'address': None, 'website': None, 'email': None, 'phone': None,
            'fax': None, 'founded': None, 'type': None, 'funding': None,
            'academic_year': None, 'languages': [], 'faculties': [],
            'degrees': [], 'accreditation': None, 'officers': [],
            'statistics': {}, 'history': None, 'periodicals': [],
            'student_body': None
        }

        try:
            links = self.driver.find_elements(By.CSS_SELECTOR, "ul#results li h3 a")
            if index >= len(links):
                return details

            links[index].click()
            time.sleep(3)

            try:
                WebDriverWait(self.driver, 5).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".fancybox-inner iframe"))
                )

                iframe = self.driver.find_element(By.CSS_SELECTOR, ".fancybox-inner iframe")
                self.driver.switch_to.frame(iframe)

                for _ in range(3):
                    self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    time.sleep(1)

                soup = BeautifulSoup(self.driver.page_source, 'html.parser')

                for dl in soup.find_all('div', class_='dl'):
                    dts = dl.find_all('span', class_='dt')
                    for dt in dts:
                        key = dt.get_text(strip=True).lower()
                        dd = dt.find_next('div', class_='dd')
                        if not dd:
                            continue

                        text = dd.get_text(separator=' ', strip=True)

                        if 'address' in key:
                            addr = {}
                            for lib, con in zip(dd.find_all('span', class_='libelle'),
                                                dd.find_all('span', class_='contenu')):
                                addr[lib.get_text(strip=True).rstrip(':')] = con.get_text(strip=True)
                            details['address'] = addr if addr else text
                            if 'WWW' in addr:
                                w = addr['WWW']
                                details['website'] = w if w.startswith('http') else 'https://' + w

                        elif 'website' in key:
                            a = dd.find('a')
                            details['website'] = a.get('href', '') if a else text

                        elif 'email' in key:
                            m = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
                            details['email'] = m.group(0) if m else text

                        elif 'telephone' in key or 'phone' in key:
                            details['phone'] = text

                        elif 'fax' in key:
                            details['fax'] = text

                        elif 'history' in key:
                            details['history'] = text
                            m = re.search(r'Founded\s*(\d{4})', text, re.I)
                            if m:
                                details['founded'] = int(m.group(1))

                        elif 'funding' in key:
                            details['funding'] = text

                        elif 'academic year' in key:
                            details['academic_year'] = text

                        elif 'language' in key:
                            details['languages'] = [l.strip() for l in re.split(r'[,;/]', text) if l.strip()]

                        elif 'accrediting' in key:
                            details['accreditation'] = text

                        elif 'student body' in key:
                            details['student_body'] = text

                        elif 'institution type' in key:
                            details['type'] = text

                        elif 'periodicals' in key:
                            details['periodicals'] = [p.strip() for p in text.split('\n') if p.strip()]

                        elif 'staff' in key:
                            for lib, con in zip(dd.find_all('span', class_='libelle'),
                                                dd.find_all('span', class_='contenu')):
                                details['statistics']['Staff ' + lib.get_text(strip=True)] = con.get_text(strip=True)

                        elif 'students' in key:
                            for lib, con in zip(dd.find_all('span', class_='libelle'),
                                                dd.find_all('span', class_='contenu')):
                                details['statistics']['Students ' + lib.get_text(strip=True)] = con.get_text(strip=True)

                # Парсим секции
                h3_tags = soup.find_all('h3')
                current_section = None

                for h3 in h3_tags:
                    section_name = h3.get_text(strip=True).lower()

                    if 'officer' in section_name:
                        current_section = 'officers'
                    elif 'division' in section_name or 'facult' in section_name:
                        current_section = 'faculties'
                    elif 'degree' in section_name:
                        current_section = 'degrees'
                    elif 'periodical' in section_name:
                        current_section = 'periodicals'
                    else:
                        continue

                    next_elem = h3.find_next(['p', 'div'])
                    while next_elem and (next_elem.name != 'h3' or next_elem == h3):
                        if next_elem.name == 'p' and 'principal' in next_elem.get('class', []):
                            text = next_elem.get_text(strip=True)

                            if current_section == 'officers' and ':' in text:
                                parts = text.split(':', 1)
                                if len(parts) == 2:
                                    details['officers'].append({'title': parts[0].strip(), 'name': parts[1].strip()})

                            elif current_section == 'faculties' and text:
                                fac = {'name': text, 'fields': []}
                                fields_span = next_elem.find_next('span', class_='contenu')
                                if fields_span:
                                    fac['fields'] = [f.strip() for f in
                                                     re.split(r'[,;]', fields_span.get_text(strip=True)) if f.strip()]
                                details['faculties'].append(fac)

                            elif current_section == 'degrees' and text:
                                deg = {'name': text, 'fields': []}
                                fields_span = next_elem.find_next('span', class_='contenu')
                                if fields_span:
                                    deg['fields'] = [f.strip() for f in
                                                     re.split(r'[,;]', fields_span.get_text(strip=True)) if f.strip()]
                                details['degrees'].append(deg)

                            elif current_section == 'periodicals' and text:
                                details['periodicals'].append(text)

                        next_elem = next_elem.find_next(['p', 'div'])
                        if next_elem and next_elem.find_previous('h3') != h3:
                            break

                self.driver.switch_to.default_content()
                try:
                    self.driver.find_element(By.CSS_SELECTOR, ".fancybox-close").click()
                except:
                    pass
                time.sleep(1)

            except Exception as e:
                logger.error(f"Error in iframe: {e}")
                try:
                    self.driver.switch_to.default_content()
                except:
                    pass

        except Exception as e:
            logger.error(f"Error: {e}")

        return details

    def parse_country(self, country_name: str, country_id: str, test_mode: bool = False,
                      fetch_details: bool = True) -> Dict:
        logger.info(f"Processing: {country_name}")

        country_data = {
            'country_name': country_name,
            'country_id': country_id,
            'institutions': []
        }

        universities = self.search_and_get_all_universities(country_id, country_name)

        if not universities:
            logger.warning(f"No universities for {country_name}")
            return country_data

        if test_mode:
            universities = universities[:5]
            logger.info(f"Test mode: {len(universities)} universities")

        if fetch_details:
            for i, uni in enumerate(universities):
                logger.info(f"[{i + 1}/{len(universities)}] {uni['name'][:80]}...")

                details = self.get_university_details_via_click(i)
                uni.update(details)

                if not uni.get('founded'):
                    year_match = re.search(r'\b(1[89]\d{2}|20[0-2]\d)\b', uni.get('name', ''))
                    if year_match:
                        uni['founded'] = int(year_match.group())

                country_data['institutions'].append(uni)

                if i < len(universities) - 1:
                    time.sleep(self.delay)
        else:
            country_data['institutions'] = universities

        logger.info(f"Completed: {len(country_data['institutions'])} institutions")
        return country_data

    def save_country_data(self, country_data: Dict):
        safe_name = re.sub(r'[^\w\s-]', '', country_data['country_name']).strip().lower()
        safe_name = re.sub(r'[-\s]+', '_', safe_name)

        filename = self.output_dir / f"{safe_name}_universities.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(country_data, f, ensure_ascii=False, indent=2)

        logger.info(f"Saved: {filename}")

    def merge_all_data(self) -> Dict:
        all_data = {
            'metadata': {
                'source': 'WHED',
                'date_collected': datetime.now().strftime('%Y-%m-%d'),
                'total_countries': 0,
                'total_institutions': 0
            },
            'countries': []
        }

        total = 0
        for f in sorted(self.output_dir.glob("*_universities.json")):
            try:
                with open(f, 'r', encoding='utf-8') as fp:
                    data = json.load(fp)
                    all_data['countries'].append(data)
                    total += len(data.get('institutions', []))
            except Exception as e:
                logger.error(f"Error loading {f}: {e}")

        all_data['metadata']['total_countries'] = len(all_data['countries'])
        all_data['metadata']['total_institutions'] = total

        return all_data

    def generate_report(self):
        all_data = self.merge_all_data()

        output_file = self.output_dir / "whed_data.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)

        report = f"""
╔══════════════════════════════════════════╗
║         WHED PARSING REPORT             ║
╚══════════════════════════════════════════╝

Date: {all_data['metadata']['date_collected']}
Countries: {all_data['metadata']['total_countries']}
Institutions: {all_data['metadata']['total_institutions']}

TOP 10 COUNTRIES:
{'─' * 45}
"""
        sorted_countries = sorted(
            all_data['countries'],
            key=lambda x: len(x.get('institutions', [])),
            reverse=True
        )

        for i, c in enumerate(sorted_countries[:10], 1):
            report += f"{i:2d}. {c['country_name']:<30s} {len(c['institutions']):4d}\n"

        report += f"\nFull data: {output_file}\n"

        report_file = self.output_dir / "report.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)

        print(report)

    def run(self, countries=None, test_mode=False, fetch_details=True):
        try:
            all_countries = self.get_country_list()

            if not all_countries:
                logger.error("No countries found")
                return

            if countries:
                all_countries = [
                    (n, c) for n, c in all_countries
                    if n.lower() in [x.lower() for x in countries]
                ]

            total = len(all_countries)

            for i, (name, cid) in enumerate(all_countries, 1):
                if name in self.progress['processed_countries']:
                    logger.info(f"[{i}/{total}] Skip: {name}")
                    continue

                logger.info(f"\n{'=' * 50}")
                logger.info(f"[{i}/{total}] {name}")
                logger.info(f"{'=' * 50}")

                try:
                    data = self.parse_country(name, cid, test_mode, fetch_details)
                    self.save_country_data(data)

                    self.progress['processed_countries'].append(name)
                    self._save_progress()

                except Exception as e:
                    logger.error(f"Error {name}: {e}")
                    try:
                        self._close_selenium()
                    except:
                        pass
                    self.driver = None
                    time.sleep(5)

                    try:
                        logger.info(f"Retrying {name}...")
                        data = self.parse_country(name, cid, test_mode, fetch_details)
                        self.save_country_data(data)
                        self.progress['processed_countries'].append(name)
                        self._save_progress()
                    except Exception as e2:
                        logger.error(f"Failed {name}: {e2}")

                if i < total:
                    time.sleep(self.delay * 2)

            self.generate_report()

        except KeyboardInterrupt:
            logger.info("\nInterrupted. Progress saved.")
        finally:
            self._close_selenium()


def main():
    import argparse

    parser = argparse.ArgumentParser(description='WHED Parser')
    parser.add_argument('--test', action='store_true', help='Test mode (5 universities)')
    parser.add_argument('--country', type=str, nargs='+', help='Countries')
    parser.add_argument('--output', type=str, default='whed_data', help='Output directory')
    parser.add_argument('--delay', type=float, default=2.0, help='Delay (seconds)')
    parser.add_argument('--visible', action='store_true', help='Show browser')
    parser.add_argument('--no-details', action='store_true', help='Skip details')

    args = parser.parse_args()

    p = WHEDParser(
        output_dir=args.output,
        delay=args.delay,
        headless=not args.visible
    )

    p.run(
        countries=args.country,
        test_mode=args.test,
        fetch_details=not args.no_details
    )


if __name__ == "__main__":
    main()