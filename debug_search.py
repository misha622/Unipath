#!/usr/bin/env python3
"""Скрипт для отладки поиска на WHED"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager

# Настройка браузера
chrome_options = Options()
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--window-size=1920,1080')

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    print("=" * 60)
    print("ЗАГРУЗКА ГЛАВНОЙ СТРАНИЦЫ")
    print("=" * 60)

    driver.get("https://whed.net/home.php")
    time.sleep(5)

    # Сохраняем скриншот
    driver.save_screenshot("debug_01_home.png")
    print("✓ Скриншот главной страницы сохранен")

    # Ищем все элементы формы
    print("\n=== АНАЛИЗ ФОРМ ПОИСКА ===")

    # Ищем все select элементы
    selects = driver.find_elements(By.TAG_NAME, "select")
    for sel in selects:
        sel_id = sel.get_attribute("id")
        sel_name = sel.get_attribute("name")
        print(f"\nSelect: id='{sel_id}' name='{sel_name}'")

        if sel_id in ["Chp1", "pays"]:
            options = sel.find_elements(By.TAG_NAME, "option")
            print(f"  Количество опций: {len(options)}")
            for opt in options[:5]:
                print(f"  - value='{opt.get_attribute('value')}' text='{opt.text}'")

    # Ищем все input элементы
    inputs = driver.find_elements(By.TAG_NAME, "input")
    print("\nInput элементы:")
    for inp in inputs:
        inp_type = inp.get_attribute("type")
        inp_name = inp.get_attribute("name")
        inp_id = inp.get_attribute("id")
        inp_placeholder = inp.get_attribute("placeholder")
        print(f"  - type='{inp_type}' name='{inp_name}' id='{inp_id}' placeholder='{inp_placeholder}'")

    # Ищем все кнопки
    buttons = driver.find_elements(By.TAG_NAME, "button")
    print("\nКнопки:")
    for btn in buttons:
        btn_text = btn.text.strip()
        btn_id = btn.get_attribute("id")
        btn_class = btn.get_attribute("class")
        print(f"  - text='{btn_text}' id='{btn_id}' class='{btn_class}'")

    # Ищем формы
    forms = driver.find_elements(By.TAG_NAME, "form")
    print("\nФормы:")
    for form in forms:
        form_action = form.get_attribute("action")
        form_method = form.get_attribute("method")
        form_id = form.get_attribute("id")
        print(f"  - action='{form_action}' method='{form_method}' id='{form_id}'")

    print("\n" + "=" * 60)
    print("ТЕСТ 1: Выбор страны через Chp1")
    print("=" * 60)

    # Выбираем Algeria в Chp1
    try:
        select_chp1 = driver.find_element(By.ID, "Chp1")
        select = Select(select_chp1)
        select.select_by_value("Algeria")
        print("✓ Выбрана Algeria в Chp1")
        time.sleep(2)

        driver.save_screenshot("debug_02_algeria_selected.png")
        print("✓ Скриншот после выбора страны сохранен")

    except Exception as e:
        print(f"✗ Ошибка выбора в Chp1: {e}")

    # Пробуем найти и нажать кнопку поиска
    print("\n=== ПОИСК КНОПКИ ОТПРАВКИ ===")

    # Способ 1: Ищем кнопку Ok
    try:
        ok_buttons = driver.find_elements(By.XPATH, "//button[contains(text(), 'Ok')]")
        if ok_buttons:
            print(f"✓ Найдена кнопка Ok: {ok_buttons[0].text}")
            ok_buttons[0].click()
            print("✓ Клик по кнопке Ok")
            time.sleep(3)
        else:
            print("✗ Кнопка Ok не найдена")
    except Exception as e:
        print(f"✗ Ошибка: {e}")

    # Проверяем URL после клика
    print(f"\nТекущий URL: {driver.current_url}")
    driver.save_screenshot("debug_03_after_ok.png")

    # Способ 2: Пробуем отправить форму через JavaScript
    if "home.php" in driver.current_url:
        print("\nURL не изменился, пробуем JavaScript submit...")
        try:
            # Ищем форму, содержащую Chp1
            select_elem = driver.find_element(By.ID, "Chp1")
            form = select_elem.find_element(By.XPATH, "./ancestor::form")
            driver.execute_script("arguments[0].submit();", form)
            print("✓ Форма отправлена через JavaScript")
            time.sleep(5)
        except Exception as e:
            print(f"✗ Ошибка отправки формы: {e}")

    print(f"\nТекущий URL после JS submit: {driver.current_url}")
    driver.save_screenshot("debug_04_after_js_submit.png")

    # Способ 3: Прямой URL
    if "home.php" in driver.current_url or "results" not in driver.current_url:
        print("\nПробуем прямой URL...")
        driver.get("https://whed.net/search.php?Chp1=Algeria")
        time.sleep(5)
        print(f"URL после прямого перехода: {driver.current_url}")
        driver.save_screenshot("debug_05_direct_url.png")

    # Сохраняем HTML страницы результатов
    with open("debug_result_page.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    print("\n✓ HTML страницы сохранен в debug_result_page.html")

    # Анализируем результаты
    print("\n=== АНАЛИЗ РЕЗУЛЬТАТОВ ===")
    page_source = driver.page_source

    # Ищем ключевые слова
    keywords = ["university", "institution", "results", "table", "Algeria"]
    for keyword in keywords:
        count = page_source.lower().count(keyword.lower())
        print(f"  Слово '{keyword}' встречается {count} раз(а)")

    # Ищем таблицы
    from bs4 import BeautifulSoup

    soup = BeautifulSoup(page_source, 'html.parser')
    tables = soup.find_all('table')
    print(f"\n  Найдено таблиц: {len(tables)}")

    for i, table in enumerate(tables):
        rows = table.find_all('tr')
        print(f"  Таблица {i + 1}: {len(rows)} строк")
        if rows:
            # Показываем первую строку
            first_row_text = ' | '.join([cell.get_text(strip=True)[:50] for cell in rows[0].find_all(['td', 'th'])])
            print(f"    Первая строка: {first_row_text}")

    print("\n" + "=" * 60)
    print("ОТЛАДКА ЗАВЕРШЕНА")
    print("=" * 60)
    print("\nПроверьте созданные файлы:")
    print("  - debug_01_home.png")
    print("  - debug_02_algeria_selected.png")
    print("  - debug_03_after_ok.png")
    print("  - debug_04_after_js_submit.png")
    print("  - debug_05_direct_url.png")
    print("  - debug_result_page.html")

    input("\nНажмите Enter для завершения...")

finally:
    driver.quit()