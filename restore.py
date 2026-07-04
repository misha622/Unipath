import json
from pathlib import Path

all_data = {
    'metadata': {
        'source': 'WHED',
        'date_collected': '2026-07-01',
        'total_countries': 0,
        'total_institutions': 0
    },
    'countries': []
}

total = 0
for f in sorted(Path('whed_data').glob('*_universities.json')):
    with open(f, 'r', encoding='utf-8') as fp:
        country_data = json.load(fp)
        all_data['countries'].append(country_data)
        total += len(country_data.get('institutions', []))

all_data['metadata']['total_countries'] = len(all_data['countries'])
all_data['metadata']['total_institutions'] = total

with open('whed_data/whed_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f"Restored: {len(all_data['countries'])} countries, {total} institutions")
