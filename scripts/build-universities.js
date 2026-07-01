const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'whed_data');
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
          n: inst.name || '',
          a: inst.alt_name || '',
          c: data.country_name,
          t: inst.address?.City || '',
          r: inst.address?.Province || '',
          s: inst.address?.Street || '',
          w: inst.website || inst.address?.WWW || '',
          e: inst.email || '',
          p: inst.phone || '',
          f: inst.founded || null,
          y: inst.type || '',
          d: inst.funding || '',
          l: inst.languages || [],
          u: inst.faculties || [],
          i: inst.iau_id || '',
          x: inst.iau_link || '',
          o: inst.academic_year || ''
        });
      });
    }
  } catch(e) {}
});

const ts = `// ${allUniversities.length} universities, ${totalCountries} countries

export interface Univ {
  n: string; a: string; c: string; t: string; r: string;
  s: string; w: string; e: string; p: string;
  f: number | null; y: string; d: string;
  l: string[]; u: { name: string; fields: string[] }[];
  i: string; x: string; o: string;
}

export const universities: Univ[] = ${JSON.stringify(allUniversities)};
`;

const outDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'universities-whed.ts'), ts);
console.log(`Done! ${allUniversities.length} universities from ${totalCountries} countries.`);