const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'src', 'data', 'universities-whed.ts');
const outputDir = path.join(__dirname, '..', 'src', 'data', 'universities');

// Читаем файл
const content = fs.readFileSync(input, 'utf-8');

// Извлекаем массив
const match = content.match(/export const universities: Univ\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.log('Не удалось найти массив universities');
  process.exit(1);
}

const universities = JSON.parse(match[1]);
console.log(`Всего вузов: ${universities.length}`);

// Группируем по странам
const byCountry = {};
universities.forEach(u => {
  const c = u.c || 'Unknown';
  if (!byCountry[c]) byCountry[c] = [];
  byCountry[c].push(u);
});

// Создаём папку
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Пишем файлы по странам
const countryFiles = {};
Object.entries(byCountry).forEach(([country, unis]) => {
  const fileName = country.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() + '.ts';
  const filePath = path.join(outputDir, fileName);

  const fileContent = `// ${country} — ${unis.length} universities
import { Univ } from '../universities-whed';

export const ${country.replace(/[^a-zA-Z0-9]/g, '_')}: Univ[] = ${JSON.stringify(unis)};
`;
  fs.writeFileSync(filePath, fileContent);
  countryFiles[country] = fileName;
  console.log(`  ${country}: ${unis.length} вузов → ${fileName}`);
});

// Пишем индексный файл
let indexContent = `// Auto-generated index of all universities by country
// Total: ${universities.length} universities from ${Object.keys(byCountry).length} countries
import { Univ } from '../universities-whed';
`;
const imports = [];
const exportsArr = [];
Object.entries(countryFiles).forEach(([country, fileName]) => {
  const varName = country.replace(/[^a-zA-Z0-9]/g, '_');
  imports.push(`import { ${varName} } from './${fileName.replace('.ts', '')}';`);
  exportsArr.push(`  ...${varName}`);
});
indexContent += imports.join('\n') + '\n\n';
indexContent += `export const allUniversities: Univ[] = [\n${exportsArr.join(',\n')}\n];\n`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);

// Обновляем universities-whed.ts — оставляем только тип
const typeOnly = content.split('export const universities')[0] + `
// Data moved to ./universities/index.ts
export { allUniversities as universities } from './universities/index';
`;
fs.writeFileSync(input, typeOnly);

console.log(`\nГотово! ${Object.keys(byCountry).length} файлов создано в ${outputDir}`);