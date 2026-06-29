export interface Exam {
  code: string
  label: string
}

export const EXAMS_BY_COUNTRY: Record<string, Exam[]> = {
  'International': [
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'PTE', label: 'PTE Academic (English)' },
    { code: 'Duolingo', label: 'Duolingo English Test' },
    { code: 'Cambridge', label: 'Cambridge English (C1/C2)' },
    { code: 'TOEIC', label: 'TOEIC (English)' },
    { code: 'SAT', label: 'SAT' },
    { code: 'ACT', label: 'ACT' },
    { code: 'IB', label: 'International Baccalaureate' },
    { code: 'AP', label: 'Advanced Placement' },
    { code: 'GRE', label: 'GRE (graduate)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'LSAT', label: 'LSAT (law)' },
    { code: 'MCAT', label: 'MCAT (medicine)' }
  ],
  'Australia': [
    { code: 'ATAR', label: 'ATAR' },
    { code: 'GAMSAT', label: 'GAMSAT (medicine)' },
    { code: 'UCAT ANZ', label: 'UCAT ANZ (medicine/dentistry)' },
    { code: 'STAT', label: 'STAT (Special Tertiary Admissions Test)' },
    { code: 'ISAT', label: 'ISAT (International Student Admissions Test)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'PTE', label: 'PTE Academic (English)' }
  ],
  'Austria': [
    { code: 'Matura', label: 'Matura' },
    { code: 'Studienberechtigungsprüfung', label: 'SBP entrance exam' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'ÖSD', label: 'ÖSD (German)' },
    { code: 'Goethe', label: 'Goethe-Zertifikat (German)' },
    { code: 'TestDaF', label: 'TestDaF (German)' },
    { code: 'DSH', label: 'DSH (German)' }
  ],
  'Belgium': [
    { code: 'Toelatingsexamen', label: 'Toelatingsexamen (medicine/dentistry)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'DELF', label: 'DELF/DALF (French)' },
    { code: 'Goethe', label: 'Goethe-Zertifikat (German)' }
  ],
  'Brazil': [
    { code: 'ENEM', label: 'ENEM' },
    { code: 'Vestibular', label: 'Vestibular' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'CELPE-Bras', label: 'CELPE-Bras (Portuguese)' }
  ],
  'Canada': [
    { code: 'SAT', label: 'SAT' },
    { code: 'ACT', label: 'ACT' },
    { code: 'LSAT', label: 'LSAT (law)' },
    { code: 'MCAT', label: 'MCAT (medicine)' },
    { code: 'DAT', label: 'DAT (dentistry)' },
    { code: 'GRE', label: 'GRE (graduate)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'CAEL', label: 'CAEL (English)' },
    { code: 'TEF', label: 'TEF (French)' },
    { code: 'TCF', label: 'TCF (French)' }
  ],
  'Chile': [
    { code: 'PAES', label: 'PAES' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'China': [
    { code: 'Gaokao', label: 'Gaokao' },
    { code: 'HSK', label: 'HSK (Chinese)' },
    { code: 'CSC', label: 'CSC scholarship test' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'Czech Republic': [
    { code: 'Maturita', label: 'Maturita' },
    { code: 'Prijimaci', label: 'Přijímací zkouška' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'CCE', label: 'CCE (Czech)' }
  ],
  'Denmark': [
    { code: 'STX', label: 'STX / HHX diploma' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'Studieprøven', label: 'Studieprøven (Danish)' }
  ],
  'Finland': [
    { code: 'Ylioppilastutkinto', label: 'Ylioppilastutkinto (Finnish matriculation)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'YKI', label: 'YKI (Finnish)' }
  ],
  'France': [
    { code: 'Baccalauréat', label: 'Baccalauréat' },
    { code: 'CPGE', label: 'CPGE / Grandes Écoles' },
    { code: 'Concours', label: 'Concours (Grandes Écoles)' },
    { code: 'TCF', label: 'TCF (French)' },
    { code: 'DELF', label: 'DELF/DALF (French)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'Germany': [
    { code: 'Abitur', label: 'Abitur' },
    { code: 'TestAS', label: 'TestAS' },
    { code: 'TestDaF', label: 'TestDaF (German)' },
    { code: 'DSH', label: 'DSH (German)' },
    { code: 'Goethe', label: 'Goethe-Zertifikat (German)' },
    { code: 'Feststellungsprüfung', label: 'Feststellungsprüfung' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'Hong Kong': [
    { code: 'HKDSE', label: 'HKDSE' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'Hungary': [
    { code: 'Érettségi', label: 'Érettségi' },
    { code: 'Stipendium', label: 'Stipendium Hungaricum exam' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'ECL', label: 'ECL (Hungarian)' }
  ],
  'India': [
    { code: 'JEE', label: 'JEE (engineering)' },
    { code: 'NEET', label: 'NEET (medicine)' },
    { code: 'GATE', label: 'GATE (graduate engineering)' },
    { code: 'CAT', label: 'CAT (MBA)' },
    { code: 'CLAT', label: 'CLAT (law)' },
    { code: 'NMAT', label: 'NMAT (MBA)' },
    { code: 'XAT', label: 'XAT (MBA)' },
    { code: 'SNAP', label: 'SNAP (MBA)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'Israel': [
    { code: 'Bagrut', label: 'Bagrut' },
    { code: 'Psychometric', label: 'Psychometric Test' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'Italy': [
    { code: 'Maturità', label: 'Maturità' },
    { code: 'TOLC', label: 'TOLC (university entrance)' },
    { code: 'TIL', label: 'TIL (Politecnico di Torino)' },
    { code: 'IMAT', label: 'IMAT (medicine in English)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'CILS', label: 'CILS (Italian)' },
    { code: 'PLIDA', label: 'PLIDA (Italian)' },
    { code: 'GMAT', label: 'GMAT (MBA)' }
  ],
  'Japan': [
    { code: 'EJU', label: 'EJU (Examination for Japanese Univ)' },
    { code: 'JLPT', label: 'JLPT (Japanese)' },
    { code: 'MEXT', label: 'MEXT scholarship exam' },
    { code: 'Common Test', label: 'Common Test for University Admissions' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'TOEIC', label: 'TOEIC (English)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'Kazakhstan': [
    { code: 'ENT', label: 'ЕНТ (Unified National Testing)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'Mexico': [
    { code: 'EXANI', label: 'EXANI (UNAM)' },
    { code: 'PAA', label: 'PAA (ITESM)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'Netherlands': [
    { code: 'VWO', label: 'VWO diploma' },
    { code: 'CCVX', label: 'CCVX / Boswell-Bèta' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'New Zealand': [
    { code: 'NCEA', label: 'NCEA' },
    { code: 'UCAT ANZ', label: 'UCAT ANZ (medicine)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'Norway': [
    { code: 'Vitnemål', label: 'Vitnemål (Norwegian diploma)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'Bergenstesten', label: 'Bergenstesten (Norwegian)' }
  ],
  'Poland': [
    { code: 'Matura', label: 'Matura (Polish baccalaureate)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'Egzamin', label: 'Egzamin (Polish)' }
  ],
  'Russia': [
    { code: 'EGE', label: 'ЕГЭ (Unified State Exam)' },
    { code: 'OGE', label: 'ОГЭ (Basic State Exam)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'TORFL', label: 'ТРКИ (Russian as Foreign Language)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'Singapore': [
    { code: 'GCE A-Level', label: 'GCE A-Level' },
    { code: 'IB', label: 'International Baccalaureate' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'South Korea': [
    { code: 'CSAT', label: 'CSAT / Suneung' },
    { code: 'TOPIK', label: 'TOPIK (Korean)' },
    { code: 'GKS', label: 'GKS scholarship exam' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'Spain': [
    { code: 'Selectividad', label: 'Selectividad / EBAU' },
    { code: 'PCE', label: 'PCE' },
    { code: 'DELE', label: 'DELE (Spanish)' },
    { code: 'SIELE', label: 'SIELE (Spanish)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'GMAT', label: 'GMAT (MBA)' }
  ],
  'Sweden': [
    { code: 'Högskoleprov', label: 'Högskoleprov (SweSAT)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'TISUS', label: 'TISUS (Swedish)' }
  ],
  'Switzerland': [
    { code: 'Matura', label: 'Swiss Matura' },
    { code: 'NC', label: 'Numerus clausus' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'Goethe', label: 'Goethe-Zertifikat (German)' },
    { code: 'DELF', label: 'DELF/DALF (French)' },
    { code: 'GMAT', label: 'GMAT (MBA)' }
  ],
  'Turkey': [
    { code: 'YKS', label: 'YKS (Higher Education Exam)' },
    { code: 'YÖS', label: 'YÖS (Foreign Student Exam)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'TÖMER', label: 'TÖMER (Turkish)' }
  ],
  'Ukraine': [
    { code: 'ZNO', label: 'ZNO / NMT' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'TUL', label: 'Test of Ukrainian as a Foreign Language' }
  ],
  'United Kingdom': [
    { code: 'UCAS', label: 'UCAS points' },
    { code: 'A-Levels', label: 'A-Levels' },
    { code: 'BMAT', label: 'BMAT (medicine)' },
    { code: 'UCAT', label: 'UCAT (medicine/dentistry)' },
    { code: 'LNAT', label: 'LNAT (law)' },
    { code: 'MAT', label: 'MAT (Mathematics, Oxford)' },
    { code: 'STEP', label: 'STEP (Mathematics, Cambridge)' },
    { code: 'TSA', label: 'TSA (Thinking Skills Assessment)' },
    { code: 'PAT', label: 'PAT (Physics Aptitude Test, Oxford)' },
    { code: 'ENGAA', label: 'ENGAA (Engineering, Cambridge)' },
    { code: 'NSAA', label: 'NSAA (Natural Sciences, Cambridge)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'PTE', label: 'PTE Academic (English)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'GRE', label: 'GRE (graduate)' }
  ],
  'USA': [
    { code: 'SAT', label: 'SAT' },
    { code: 'ACT', label: 'ACT' },
    { code: 'GRE', label: 'GRE (graduate)' },
    { code: 'GMAT', label: 'GMAT (MBA)' },
    { code: 'LSAT', label: 'LSAT (law)' },
    { code: 'MCAT', label: 'MCAT (medicine)' },
    { code: 'DAT', label: 'DAT (dentistry)' },
    { code: 'PCAT', label: 'PCAT (pharmacy)' },
    { code: 'OAT', label: 'OAT (optometry)' },
    { code: 'AP', label: 'AP Exams' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' },
    { code: 'PTE', label: 'PTE Academic (English)' },
    { code: 'Duolingo', label: 'Duolingo English Test' }
  ],
  'Uzbekistan': [
    { code: 'DTM', label: 'ДТМ (State Test Center)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ],
  'South Africa': [
    { code: 'NSC', label: 'NSC (National Senior Certificate)' },
    { code: 'NBT', label: 'NBT (National Benchmark Tests)' },
    { code: 'IELTS', label: 'IELTS (English)' },
    { code: 'TOEFL', label: 'TOEFL (English)' }
  ]
}

export const ALL_FIELDS: string[] = [
  'Aerospace Engineering', 'AI & Machine Learning', 'Architecture', 'Arts',
  'Bioinformatics', 'Biology', 'Biomedicine', 'Business Administration',
  'Chemical Engineering', 'Cognitive Science', 'Computer Science', 'Cybersecurity',
  'Data Science', 'Design', 'Economics', 'Engineering', 'Environmental Science',
  'Finance', 'Industrial Engineering', 'International Relations', 'Law',
  'Marine Technology', 'Mathematics', 'Medicine', 'Physics', 'Psychology',
  'Public Health', 'Robotics', 'Software Engineering', 'Sustainable Energy'
]

export const ALL_LANGUAGES: string[] = [
  'English', 'German', 'French', 'Spanish', 'Dutch', 'Swedish', 'Finnish',
  'Italian', 'Japanese', 'Chinese', 'Korean', 'Russian', 'Portuguese',
  'Polish', 'Turkish', 'Arabic', 'Greek', 'Czech', 'Hungarian', 'Norwegian',
  'Danish', 'Hindi', 'Vietnamese', 'Thai', 'Malay', 'Indonesian'
]

export const EU_COUNTRIES: string[] = [
  'Germany', 'Netherlands', 'France', 'Spain', 'Italy', 'Sweden', 'Norway',
  'Finland', 'Denmark', 'Austria', 'Belgium', 'Switzerland', 'Czech Republic',
  'Poland', 'Hungary'
]

export const ASIA_COUNTRIES: string[] = [
  'Japan', 'South Korea', 'China', 'Singapore', 'Hong Kong', 'Taiwan',
  'Malaysia', 'Thailand', 'India'
]

export const AMER_COUNTRIES: string[] = [
  'USA', 'Canada', 'Brazil', 'Mexico', 'Argentina', 'Chile'
]

export const COUNTRY_FLAGS: Record<string, string> = {
  Russia: '🇷🇺', Germany: '🇩🇪', Austria: '🇦🇹', Switzerland: '🇨🇭',
  France: '🇫🇷', Netherlands: '🇳🇱', Belgium: '🇧🇪', UK: '🇬🇧',
  Ireland: '🇮🇪', Sweden: '🇸🇪', Norway: '🇳🇴', Finland: '🇫🇮',
  Denmark: '🇩🇰', Spain: '🇪🇸', Portugal: '🇵🇹', Italy: '🇮🇹',
  CzechRepublic: '🇨🇿', Poland: '🇵🇱', Hungary: '🇭🇺', Greece: '🇬🇷',
  Romania: '🇷🇴', Japan: '🇯🇵', China: '🇨🇳', SouthKorea: '🇰🇷',
  Taiwan: '🇹🇼', Singapore: '🇸🇬', India: '🇮🇳', Malaysia: '🇲🇾',
  Thailand: '🇹🇭', Vietnam: '🇻🇳', Indonesia: '🇮🇩', Pakistan: '🇵🇰',
  Bangladesh: '🇧🇩', SriLanka: '🇱🇰', UAE: '🇦🇪', SaudiArabia: '🇸🇦',
  Turkey: '🇹🇷', Egypt: '🇪🇬', SouthAfrica: '🇿🇦', Nigeria: '🇳🇬',
  Kenya: '🇰🇪', Morocco: '🇲🇦', Ethiopia: '🇪🇹', Ghana: '🇬🇭',
  Iran: '🇮🇷', Israel: '🇮🇱', USA: '🇺🇸', Canada: '🇨🇦',
  Brazil: '🇧🇷', Mexico: '🇲🇽', Argentina: '🇦🇷', Chile: '🇨🇱',
  Colombia: '🇨🇴', Peru: '🇵🇪', Australia: '🇦🇺', NewZealand: '🇳🇿',
  International: '🌐', 'United Kingdom': '🇬🇧', 'Czech Republic': '🇨🇿',
  'South Korea': '🇰🇷', 'Hong Kong': '🇭🇰', 'New Zealand': '🇳🇿',
  'South Africa': '🇿🇦', Kazakhstan: '🇰🇿', Ukraine: '🇺🇦', Uzbekistan: '🇺🇿'
}
export const ALL_COUNTRIES = Object.keys(EXAMS_BY_COUNTRY).sort()