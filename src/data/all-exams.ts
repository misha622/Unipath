export interface ExamEntry {
  code: string
  name: string
  type: 'language' | 'academic' | 'school' | 'professional' | 'national' | 'scholarship'
  countries: string[]
}

export const ALL_EXAMS: ExamEntry[] = [
  // Языковые тесты
  { code: 'IELTS', name: 'IELTS — International English Language Testing System', type: 'language', countries: ['International'] },
  { code: 'TOEFL', name: 'TOEFL — Test of English as a Foreign Language', type: 'language', countries: ['International'] },
  { code: 'PTE', name: 'PTE Academic — Pearson Test of English', type: 'language', countries: ['International'] },
  { code: 'Duolingo', name: 'Duolingo English Test', type: 'language', countries: ['International'] },
  { code: 'Cambridge', name: 'Cambridge English Exams (C1 Advanced / C2 Proficiency)', type: 'language', countries: ['International'] },
  { code: 'TOEIC', name: 'TOEIC — Test of English for International Communication', type: 'language', countries: ['International'] },
  { code: 'TestDaF', name: 'TestDaF — Test Deutsch als Fremdsprache', type: 'language', countries: ['Germany', 'Austria', 'Switzerland'] },
  { code: 'DSH', name: 'DSH — Deutsche Sprachprüfung für den Hochschulzugang', type: 'language', countries: ['Germany'] },
  { code: 'Goethe', name: 'Goethe-Zertifikat (B2/C1/C2)', type: 'language', countries: ['Germany', 'Austria', 'Switzerland'] },
  { code: 'OSD', name: 'ÖSD — Österreichisches Sprachdiplom', type: 'language', countries: ['Austria'] },
  { code: 'DELF_DALF', name: 'DELF / DALF — Diplôme d\'Études en Langue Française', type: 'language', countries: ['France', 'Belgium', 'Switzerland'] },
  { code: 'TCF', name: 'TCF — Test de Connaissance du Français', type: 'language', countries: ['France'] },
  { code: 'TEF', name: 'TEF — Test d\'Évaluation de Français', type: 'language', countries: ['Canada'] },
  { code: 'DELE', name: 'DELE — Diploma de Español como Lengua Extranjera', type: 'language', countries: ['Spain'] },
  { code: 'SIELE', name: 'SIELE — Servicio Internacional de Evaluación de la Lengua Española', type: 'language', countries: ['Spain'] },
  { code: 'JLPT', name: 'JLPT — Japanese-Language Proficiency Test (N1–N5)', type: 'language', countries: ['Japan'] },
  { code: 'TOPIK', name: 'TOPIK — Test of Proficiency in Korean (1–6)', type: 'language', countries: ['South Korea'] },
  { code: 'HSK', name: 'HSK — Hanyu Shuiping Kaoshi (1–6)', type: 'language', countries: ['China'] },
  { code: 'TORFL', name: 'ТРКИ — Тест по русскому языку как иностранному', type: 'language', countries: ['Russia'] },
  { code: 'CELPE_Bras', name: 'CELPE-Bras — португальский для Бразилии', type: 'language', countries: ['Brazil'] },
  { code: 'CILS', name: 'CILS / PLIDA — итальянский язык', type: 'language', countries: ['Italy'] },
  { code: 'TISUS', name: 'TISUS — Test i svenska för universitets- och högskolestudier', type: 'language', countries: ['Sweden'] },
  { code: 'YKI', name: 'YKI — Yleinen kielitutkinto (финский)', type: 'language', countries: ['Finland'] },
  { code: 'CCE', name: 'CCE — Czech Language Certificate Exam', type: 'language', countries: ['Czech Republic'] },
  { code: 'ECL', name: 'ECL — European Consortium for the Certificate of Attainment in Modern Languages', type: 'language', countries: ['Hungary'] },
  { code: 'TOMER', name: 'TÖMER — Turkish Language Exam', type: 'language', countries: ['Turkey'] },
  { code: 'Bergenstesten', name: 'Bergenstesten — Norwegian Language Test', type: 'language', countries: ['Norway'] },
  { code: 'Studieproven', name: 'Studieprøven — Danish Language Test', type: 'language', countries: ['Denmark'] },
  { code: 'CAEL', name: 'CAEL — Canadian Academic English Language Test', type: 'language', countries: ['Canada'] },
  { code: 'TUL', name: 'TUL — Test of Ukrainian as a Foreign Language', type: 'language', countries: ['Ukraine'] },

  // Международные школьные
  { code: 'IB', name: 'IB Diploma — International Baccalaureate', type: 'school', countries: ['International'] },
  { code: 'ALevels', name: 'A-Levels (Cambridge / Edexcel)', type: 'school', countries: ['United Kingdom', 'Singapore'] },
  { code: 'AP', name: 'Advanced Placement (AP) Exams', type: 'school', countries: ['USA', 'Canada'] },
  { code: 'SAT', name: 'SAT — Scholastic Aptitude Test', type: 'school', countries: ['USA', 'Canada', 'International'] },
  { code: 'ACT', name: 'ACT — American College Test', type: 'school', countries: ['USA', 'Canada'] },

  // Великобритания
  { code: 'UCAS', name: 'UCAS Tariff Points', type: 'academic', countries: ['United Kingdom'] },
  { code: 'BMAT', name: 'BMAT — Biomedical Admissions Test', type: 'professional', countries: ['United Kingdom'] },
  { code: 'UCAT', name: 'UCAT — University Clinical Aptitude Test', type: 'professional', countries: ['United Kingdom', 'Australia', 'New Zealand'] },
  { code: 'LNAT', name: 'LNAT — Law National Aptitude Test', type: 'professional', countries: ['United Kingdom'] },
  { code: 'MAT', name: 'MAT — Mathematics Admissions Test (Oxford)', type: 'academic', countries: ['United Kingdom'] },
  { code: 'STEP', name: 'STEP — Sixth Term Examination Paper (Cambridge)', type: 'academic', countries: ['United Kingdom'] },
  { code: 'TSA', name: 'TSA — Thinking Skills Assessment', type: 'academic', countries: ['United Kingdom'] },
  { code: 'PAT', name: 'PAT — Physics Aptitude Test (Oxford)', type: 'academic', countries: ['United Kingdom'] },
  { code: 'ENGAA', name: 'ENGAA — Engineering Admissions Assessment (Cambridge)', type: 'academic', countries: ['United Kingdom'] },
  { code: 'NSAA', name: 'NSAA — Natural Sciences Admissions Assessment (Cambridge)', type: 'academic', countries: ['United Kingdom'] },

  // Германия
  { code: 'Abitur', name: 'Abitur — German school-leaving certificate', type: 'school', countries: ['Germany'] },
  { code: 'TestAS', name: 'TestAS — Test für Ausländische Studierende', type: 'academic', countries: ['Germany'] },
  { code: 'Feststellungsprüfung', name: 'Feststellungsprüfung — Studienkolleg exam', type: 'academic', countries: ['Germany'] },

  // Франция
  { code: 'Baccalauréat', name: 'Baccalauréat — French school-leaving certificate', type: 'school', countries: ['France'] },
  { code: 'CPGE', name: 'CPGE — Classes Préparatoires aux Grandes Écoles', type: 'academic', countries: ['France'] },
  { code: 'Concours', name: 'Concours — Grandes Écoles entrance exams', type: 'academic', countries: ['France'] },

  // Италия
  { code: 'Maturita_IT', name: 'Maturità — Italian school-leaving certificate', type: 'school', countries: ['Italy'] },
  { code: 'TOLC', name: 'TOLC — Test OnLine CISIA', type: 'academic', countries: ['Italy'] },
  { code: 'TIL', name: 'TIL — Test di Ingegneria (Politecnico di Torino)', type: 'academic', countries: ['Italy'] },
  { code: 'IMAT', name: 'IMAT — International Medical Admissions Test', type: 'professional', countries: ['Italy'] },

  // Испания
  { code: 'Selectividad', name: 'Selectividad / EBAU — Spanish university entrance exam', type: 'school', countries: ['Spain'] },
  { code: 'PCE', name: 'PCE — Pruebas de Competencias Específicas', type: 'academic', countries: ['Spain'] },

  // Нидерланды
  { code: 'VWO', name: 'VWO Diploma — Dutch pre-university diploma', type: 'school', countries: ['Netherlands'] },
  { code: 'CCVX', name: 'CCVX / Boswell-Bèta — entrance exams for foreigners', type: 'academic', countries: ['Netherlands'] },

  // США
  { code: 'GRE', name: 'GRE — Graduate Record Examination', type: 'academic', countries: ['USA', 'Canada', 'International'] },
  { code: 'GMAT', name: 'GMAT — Graduate Management Admission Test', type: 'professional', countries: ['USA', 'Canada', 'International'] },
  { code: 'LSAT', name: 'LSAT — Law School Admission Test', type: 'professional', countries: ['USA', 'Canada'] },
  { code: 'MCAT', name: 'MCAT — Medical College Admission Test', type: 'professional', countries: ['USA', 'Canada'] },
  { code: 'DAT', name: 'DAT — Dental Admission Test', type: 'professional', countries: ['USA'] },
  { code: 'PCAT', name: 'PCAT — Pharmacy College Admission Test', type: 'professional', countries: ['USA'] },
  { code: 'OAT', name: 'OAT — Optometry Admission Test', type: 'professional', countries: ['USA'] },

  // Азия
  { code: 'EJU', name: 'EJU — Examination for Japanese University Admission', type: 'academic', countries: ['Japan'] },
  { code: 'MEXT', name: 'MEXT Scholarship Exam', type: 'scholarship', countries: ['Japan'] },
  { code: 'CSAT', name: 'CSAT / Suneung — Korean College Scholastic Ability Test', type: 'school', countries: ['South Korea'] },
  { code: 'GKS', name: 'GKS — Global Korea Scholarship Exam', type: 'scholarship', countries: ['South Korea'] },
  { code: 'Gaokao', name: 'Gaokao — Chinese National College Entrance Exam', type: 'school', countries: ['China'] },
  { code: 'CSC', name: 'CSC — Chinese Scholarship Council Exam', type: 'scholarship', countries: ['China'] },
  { code: 'JEE', name: 'JEE Main / Advanced — Indian Engineering Entrance', type: 'academic', countries: ['India'] },
  { code: 'NEET', name: 'NEET — Indian Medical Entrance', type: 'professional', countries: ['India'] },
  { code: 'GATE', name: 'GATE — Graduate Aptitude Test in Engineering', type: 'academic', countries: ['India'] },
  { code: 'CAT', name: 'CAT — Common Admission Test (MBA)', type: 'professional', countries: ['India'] },
  { code: 'CLAT', name: 'CLAT — Common Law Admission Test', type: 'professional', countries: ['India'] },
  { code: 'NMAT', name: 'NMAT — NMIMS Management Aptitude Test', type: 'professional', countries: ['India'] },
  { code: 'XAT', name: 'XAT — Xavier Aptitude Test (MBA)', type: 'professional', countries: ['India'] },
  { code: 'SNAP', name: 'SNAP — Symbiosis National Aptitude Test', type: 'professional', countries: ['India'] },
  { code: 'YKS', name: 'YKS — Yükseköğretim Kurumları Sınavı (Turkey)', type: 'school', countries: ['Turkey'] },
  { code: 'YOS', name: 'YÖS — Foreign Student Exam (Turkey)', type: 'academic', countries: ['Turkey'] },
  { code: 'HKDSE', name: 'HKDSE — Hong Kong Diploma of Secondary Education', type: 'school', countries: ['Hong Kong'] },
  { code: 'Bagrut', name: 'Bagrut — Israeli school-leaving certificate', type: 'school', countries: ['Israel'] },
  { code: 'Psychometric', name: 'Psychometric Test — Israeli SAT equivalent', type: 'school', countries: ['Israel'] },

  // Австралия и Океания
  { code: 'ATAR', name: 'ATAR — Australian Tertiary Admission Rank', type: 'school', countries: ['Australia'] },
  { code: 'GAMSAT', name: 'GAMSAT — Graduate Australian Medical School Admissions Test', type: 'professional', countries: ['Australia'] },
  { code: 'STAT', name: 'STAT — Special Tertiary Admissions Test', type: 'academic', countries: ['Australia'] },
  { code: 'ISAT', name: 'ISAT — International Student Admissions Test', type: 'academic', countries: ['Australia'] },
  { code: 'NCEA', name: 'NCEA — National Certificate of Educational Achievement (NZ)', type: 'school', countries: ['New Zealand'] },

  // Южная Америка
  { code: 'ENEM', name: 'ENEM — Exame Nacional do Ensino Médio (Brazil)', type: 'school', countries: ['Brazil'] },
  { code: 'Vestibular', name: 'Vestibular — Brazilian university entrance exam', type: 'academic', countries: ['Brazil'] },
  { code: 'CBC', name: 'CBC — Ciclo Básico Común (UBA Argentina)', type: 'academic', countries: ['Argentina'] },
  { code: 'PAES', name: 'PSU / PAES — Prueba de Acceso a la Educación Superior (Chile)', type: 'school', countries: ['Chile'] },
  { code: 'EXANI', name: 'EXANI — Examen Nacional de Ingreso (Mexico)', type: 'academic', countries: ['Mexico'] },
  { code: 'PAA', name: 'PAA — Prueba de Aptitud Académica (ITESM Mexico)', type: 'academic', countries: ['Mexico'] },

  // Африка
  { code: 'NSC', name: 'NSC — National Senior Certificate (South Africa)', type: 'school', countries: ['South Africa'] },
  { code: 'NBT', name: 'NBT — National Benchmark Tests (South Africa)', type: 'academic', countries: ['South Africa'] },

  // Европа остальные
  { code: 'Matura_AT', name: 'Matura — Austrian school-leaving certificate', type: 'school', countries: ['Austria'] },
  { code: 'SBP_AT', name: 'Studienberechtigungsprüfung — Austrian entrance exam', type: 'academic', countries: ['Austria'] },
  { code: 'Toelatingsexamen', name: 'Toelatingsexamen — Belgian medicine/dentistry entrance', type: 'professional', countries: ['Belgium'] },
  { code: 'Maturita_CZ', name: 'Maturita — Czech school-leaving certificate', type: 'school', countries: ['Czech Republic'] },
  { code: 'Prijimaci', name: 'Přijímací zkouška — Czech university entrance exam', type: 'academic', countries: ['Czech Republic'] },
  { code: 'Matura_PL', name: 'Matura — Polish school-leaving certificate', type: 'school', countries: ['Poland'] },
  { code: 'Erettsegi', name: 'Érettségi — Hungarian school-leaving certificate', type: 'school', countries: ['Hungary'] },
  { code: 'Stipendium', name: 'Stipendium Hungaricum — Scholarship exam', type: 'scholarship', countries: ['Hungary'] },
  { code: 'Hogskoleprov', name: 'Högskoleprovet (SweSAT) — Swedish SAT', type: 'school', countries: ['Sweden'] },
  { code: 'Vitnemal', name: 'Vitnemål — Norwegian school-leaving certificate', type: 'school', countries: ['Norway'] },
  { code: 'STX', name: 'STX / HHX / HTX — Danish school-leaving certificates', type: 'school', countries: ['Denmark'] },
  { code: 'Ylioppilastutkinto', name: 'Ylioppilastutkinto — Finnish matriculation exam', type: 'school', countries: ['Finland'] },
  { code: 'Matura_CH', name: 'Swiss Matura — Swiss school-leaving certificate', type: 'school', countries: ['Switzerland'] },
  { code: 'NC_CH', name: 'Numerus Clausus (NC) — Swiss competitive admission', type: 'academic', countries: ['Switzerland'] },

  // СНГ
  { code: 'EGE', name: 'ЕГЭ — Единый государственный экзамен (Россия)', type: 'school', countries: ['Russia'] },
  { code: 'OGE', name: 'ОГЭ — Основной государственный экзамен (Россия)', type: 'school', countries: ['Russia'] },
  { code: 'ZNO', name: 'ЗНО / НМТ — Национальный мультипредметный тест (Украина)', type: 'school', countries: ['Ukraine'] },
  { code: 'CT', name: 'ЦТ / ЦЭ — Централизованное тестирование (Беларусь)', type: 'school', countries: ['Belarus'] },
  { code: 'ENT', name: 'ЕНТ — Единое национальное тестирование (Казахстан)', type: 'school', countries: ['Kazakhstan'] },
  { code: 'DTM', name: 'ДТМ — Давлат тест маркази (Узбекистан)', type: 'school', countries: ['Uzbekistan'] },
]

export const EXAM_TYPES = [
  { key: 'all', label: 'Все' },
  { key: 'language', label: '🗣 Языковые' },
  { key: 'school', label: '🏫 Школьные аттестаты' },
  { key: 'academic', label: '📝 Академические' },
  { key: 'professional', label: '💼 Профессиональные' },
  { key: 'scholarship', label: '🎓 Стипендиальные' },
]

export const EXAM_REGIONS = [
  { key: 'all', label: 'Весь мир' },
  { key: 'International', label: '🌍 Международные' },
  { key: 'United Kingdom', label: '🇬🇧 Великобритания' },
  { key: 'Germany', label: '🇩🇪 Германия' },
  { key: 'France', label: '🇫🇷 Франция' },
  { key: 'Italy', label: '🇮🇹 Италия' },
  { key: 'Spain', label: '🇪🇸 Испания' },
  { key: 'Netherlands', label: '🇳🇱 Нидерланды' },
  { key: 'Sweden', label: '🇸🇪 Швеция' },
  { key: 'Norway', label: '🇳🇴 Норвегия' },
  { key: 'Denmark', label: '🇩🇰 Дания' },
  { key: 'Finland', label: '🇫🇮 Финляндия' },
  { key: 'Austria', label: '🇦🇹 Австрия' },
  { key: 'Switzerland', label: '🇨🇭 Швейцария' },
  { key: 'Belgium', label: '🇧🇪 Бельгия' },
  { key: 'Czech Republic', label: '🇨🇿 Чехия' },
  { key: 'Poland', label: '🇵🇱 Польша' },
  { key: 'Hungary', label: '🇭🇺 Венгрия' },
  { key: 'USA', label: '🇺🇸 США' },
  { key: 'Canada', label: '🇨🇦 Канада' },
  { key: 'Japan', label: '🇯🇵 Япония' },
  { key: 'South Korea', label: '🇰🇷 Южная Корея' },
  { key: 'China', label: '🇨🇳 Китай' },
  { key: 'India', label: '🇮🇳 Индия' },
  { key: 'Turkey', label: '🇹🇷 Турция' },
  { key: 'Australia', label: '🇦🇺 Австралия' },
  { key: 'Brazil', label: '🇧🇷 Бразилия' },
  { key: 'South Africa', label: '🇿🇦 ЮАР' },
  { key: 'Russia', label: '🇷🇺 Россия' },
  { key: 'Kazakhstan', label: '🇰🇿 Казахстан' },
]