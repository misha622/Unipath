import json
with open('whed_data/whed_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Найдём вуз с wiki и сайтом
for country in data['countries']:
    for uni in country['institutions']:
        w = uni.get('website', '')
        wiki = uni.get('wiki_url', '')
        
        if wiki and w and 'cloudflare' not in w:
            print('=' * 60)
            print(f"Country: {country['country_name']}")
            print(f"Name: {uni['name']}")
            print(f"Website: {w}")
            print(f"Wikipedia: {wiki}")
            print(f"Founded: {uni.get('founded', '-')}")
            print(f"Students: {uni.get('students', '-')}")
            desc = uni.get('description', '-')
            print(f"Description: {desc[:200]}...")
            break
    else:
        continue
    break

print()
print('=' * 60)
print('STATS:')

total = 0
with_web = 0
with_wiki = 0
with_desc = 0
with_founded = 0

for c in data['countries']:
    for u in c['institutions']:
        total += 1
        w = u.get('website', '')
        if w and 'cloudflare' not in w and 'challenge' not in w:
            with_web += 1
        if u.get('wiki_url'):
            with_wiki += 1
        if u.get('description'):
            with_desc += 1
        if u.get('founded'):
            with_founded += 1

print(f"Total: {total}")
print(f"Website: {with_web} ({with_web*100//total}%)")
print(f"Wikipedia: {with_wiki} ({with_wiki*100//total}%)")
print(f"Description: {with_desc} ({with_desc*100//total}%)")
print(f"Founded: {with_founded} ({with_founded*100//total}%)")
