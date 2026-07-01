import json

# Afghanistan
with open("whed_data/afghanistan_universities.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    print("AFGHANISTAN:")
    print(f"  Total: {len(data['institutions'])} universities")
    for uni in data["institutions"][:5]:
        print(f"  - {uni['name']}")
        print(f"    IAU ID: {uni['iau_id']}")

print()

# Algeria
with open("whed_data/algeria_universities.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    print("ALGERIA (first 5 with details):")
    for uni in data["institutions"][:5]:
        founded = uni.get("founded", "?")
        faculties = len(uni.get("faculties", []))
        degrees = len(uni.get("degrees", []))
        print(f"  - {uni['name'][:60]}")
        print(f"    Founded: {founded} | Faculties: {faculties} | Degrees: {degrees}")
