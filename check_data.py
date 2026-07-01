import json
with open('whed_data/algeria_universities.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    uni = data['institutions'][0]
    print(json.dumps(uni, indent=2, ensure_ascii=False))
    
    print('\n' + '='*60)
    total = len(data['institutions'])
    print(f'Total: {total}')
    print(f'Faculties: {sum(1 for u in data["institutions"] if u.get("faculties"))}/{total}')
    print(f'Degrees: {sum(1 for u in data["institutions"] if u.get("degrees"))}/{total}')
    print(f'Founded: {sum(1 for u in data["institutions"] if u.get("founded"))}/{total}')
    print(f'Type: {sum(1 for u in data["institutions"] if u.get("type"))}/{total}')
    print(f'Officers: {sum(1 for u in data["institutions"] if u.get("officers"))}/{total}')
    print(f'Statistics: {sum(1 for u in data["institutions"] if u.get("statistics"))}/{total}')
    print(f'History: {sum(1 for u in data["institutions"] if u.get("history"))}/{total}')
