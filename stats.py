import json, os

with open('whed_data/whed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

total = 0
with_site = 0
with_wiki = 0
with_desc = 0
with_founded = 0

for c in data['countries']:
    for u in c['institutions']:
        total += 1
        w = u.get('website', '')
        if w and 'cloudflare' not in w and 'challenge' not in w:
            with_site += 1
        if u.get('wiki_url'):
            with_wiki += 1
        if u.get('description'):
            with_desc += 1
        if u.get('founded'):
            with_founded += 1

print('=' * 50)
print('WHED DATA STATS')
print('=' * 50)
print(f'Total: {total}')
print(f'Website: {with_site} ({with_site*100//total}%)')
print(f'Wikipedia: {with_wiki} ({with_wiki*100//total}%)')
print(f'Description: {with_desc} ({with_desc*100//total}%)')
print(f'Founded: {with_founded} ({with_founded*100//total}%)')
print()

print('EXAMPLES:')
count = 0
for c in data['countries']:
    for u in c['institutions']:
        if u.get('wiki_url') and u.get('description'):
            print(f"  [{c['country_name']}] {u['name']}")
            print(f"    Wiki: {u['wiki_url']}")
            print(f"    Founded: {u.get('founded', '?')}")
            print(f"    Desc: {u.get('description', '')[:150]}...")
            print()
            count += 1
            if count >= 3:
                break
    if count >= 3:
        break

size = os.path.getsize('whed_data/whed_data.json')
print(f'File size: {size / 1024 / 1024:.1f} MB')
