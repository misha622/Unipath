const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data', 'universities-whed.ts');
const content = fs.readFileSync(file, 'utf-8');

// Извлекаем массив universities
const match = content.match(/export const universities: Univ\[\] = (\[[\s\S]*\]);/);
if (!match) { console.log('Не удалось найти массив'); process.exit(1); }

const universities = JSON.parse(match[1]);

let badSites = 0;
universities.forEach(u => {
  if (u.w && u.w.startsWith('http')) {
    // Проверка на подозрительные сайты (например, сайт другого вуза)
    if (u.n.toLowerCase().includes('harvard') && !u.w.includes('harvard')) {
      console.log(`⚠ ${u.n} → ${u.w} (должен быть harvard.edu)`);
      badSites++;
    }
  }
});

console.log(`Проверено: ${universities.length}, подозрительных сайтов: ${badSites}`);