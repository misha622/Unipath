import json
with open('whed_data/whed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Маленькие страны
small = [(c['country_name'], len(c['institutions'])) for c in data['countries'] if 1 <= len(c['institutions']) <= 3]
small.sort(key=lambda x: x[1])
print('МАЛЕНЬКИЕ СТРАНЫ (1-3 вуза):')
for name, count in small:
    print(f'  {name:<40s} {count} вузов')

print()

# Ищем Luxembourg
for c in data['countries']:
    if 'lux' in c['country_name'].lower() or 'bourg' in c['country_name'].lower():
        print(f'{c["country_name"]} - {len(c["institutions"])} вузов')

print(f'\nВсего стран: {len(data["countries"])}')
print('Первые 5:')
for c in data['countries'][:5]:
    print(f'  {c["country_name"]}')
