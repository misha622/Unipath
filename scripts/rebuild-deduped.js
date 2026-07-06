const fs = require('fs');
const path = require('path');
const dataDir = 'whed_data';
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !['whed_data.json','progress.json','report.txt'].includes(f));

const allUniversities = [];
let totalCountries = 0;

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
    if (data.institutions && data.institutions.length > 0) {
      totalCountries++;
      data.institutions.forEach(inst => {
        allUniversities.push({
          n: inst.name || '', a: inst.alt_name || '', c: data.country_name,
          t: inst.address?.City || '', r: inst.address?.Province || '', s: inst.address?.Street || '',
          w: inst.website || inst.address?.WWW || '', e: inst.email || '', p: inst.phone || '',
          f: inst.founded || null, y: inst.type || '', d: inst.funding || '',
          l: inst.languages || [], u: inst.faculties || [], i: inst.iau_id || '',
          x: inst.iau_link || '', o: inst.academic_year || '',
          wiki: inst.wiki_url || '', desc: inst.description || '',
          students: inst.students || inst.statistics?.['Students Total:'] || '',
          history: inst.history || '', accreditation: inst.accreditation || '',
        });
      });
    }
  } catch(e) {}
});

// Удаляем дубликаты — оставляем тот где больше данных
const deduped = new Map();
allUniversities.forEach(u => {
  const key = u.i || u.n;
  const existing = deduped.get(key);
  const score = (u.w ? 1 : 0) + (u.f ? 1 : 0) + (u.desc ? 1 : 0) + (u.students ? 1 : 0);
  const existingScore = existing ? ((existing.w ? 1 : 0) + (existing.f ? 1 : 0) + (existing.desc ? 1 : 0) + (existing.students ? 1 : 0)) : -1;
  if (!existing || score > existingScore) deduped.set(key, u);
});

const ts = '// ' + deduped.size + ' universities, ' + totalCountries + ' countries\n\nexport interface Univ {\n  n: string; a: string; c: string; t: string; r: string;\n  s: string; w: string; e: string; p: string;\n  f: number | null; y: string; d: string;\n  l: string[]; u: { name: string; fields: string[] }[];\n  i: string; x: string; o: string;\n  wiki: string; desc: string; students: string;\n  history: string; accreditation: string;\n}\n\nexport const universities: Univ[] = ' + JSON.stringify(Array.from(deduped.values())) + ';\n';

const outDir = path.join('src', 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'universities-whed.ts'), ts);
console.log('Done! ' + deduped.size + ' universities from ' + totalCountries + ' countries.');