import json, os

with open('whed_data/whed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

count = 0
for c in data['countries']:
    for u in c['institutions']:
        if u.get('wiki_url') and u.get('description'):
            print('=' * 60)
            print(f"Country: {c['country_name']}")
            print(f"Name: {u['name']}")
            print(f"IAU ID: {u.get('iau_id', '-')}")
            print(f"Website: {u.get('website', '-')}")
            print(f"Wikipedia: {u.get('wiki_url', '-')}")
            print(f"Founded: {u.get('founded', '-')}")
            print(f"Students: {u.get('students', '-')}")
            desc = u.get('description', '-')
            print(f"Description: {desc[:200]}...")
            count += 1
            if count >= 3:
                break
    if count >= 3:
        break

print()
print('=' * 60)
size = os.path.getsize('whed_data/whed_data.json')
print(f'FILE SIZE: {size / 1024 / 1024:.1f} MB')
