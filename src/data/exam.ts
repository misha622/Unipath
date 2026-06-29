// Вступительные экзамены и требования для каждой страны мира
// Используется в фильтрах страницы /explore

export interface ExamInfo {
  code: string         // короткий код для фильтра
  name: string         // полное название
  description: string  // что это такое (1 строка)
  type: 'language' | 'academic' | 'scholarship' | 'national' | 'professional'
}

export interface CountryExams {
  country: string
  exams: ExamInfo[]
}

export const EXAMS_BY_COUNTRY: Record<string, ExamInfo[]> = {

  // ═══════════════════════════════════════════════════════════════
  // ЕВРОПА
  // ═══════════════════════════════════════════════════════════════

  Russia: [
    { code: 'EGE',       name: 'ЕГЭ (Единый государственный экзамен)',  description: 'Обязательный выпускной экзамен для поступления в российские вузы',  type: 'national' },
    { code: 'OGE',       name: 'ОГЭ (Основной государственный экзамен)', description: 'Экзамен после 9-го класса',                                         type: 'national' },
    { code: 'TOEFL',     name: 'TOEFL',                                  description: 'Тест по английскому языку для поступления в иностранные вузы',        type: 'language' },
    { code: 'IELTS',     name: 'IELTS',                                  description: 'Международный экзамен по английскому языку',                          type: 'language' },
    { code: 'RUDN_TEST', name: 'Тест РУДН / МГУ',                       description: 'Внутренние вступительные испытания крупных российских вузов',          type: 'academic' },
  ],

  Germany: [
    { code: 'ABITUR',    name: 'Abitur',                  description: 'Немецкий аттестат зрелости — основное требование для поступления',   type: 'national' },
    { code: 'TESTAS',    name: 'TestAS',                  description: 'Академический тест для иностранных абитуриентов',                     type: 'academic' },
    { code: 'TESTDAF',   name: 'TestDaF',                 description: 'Тест по немецкому языку для университетов (уровень B2–C2)',           type: 'language' },
    { code: 'DSH',       name: 'DSH',                     description: 'Deutsche Sprachprüfung für den Hochschulzugang — языковой экзамен',   type: 'language' },
    { code: 'GOETHE_C1', name: 'Goethe-Zertifikat C1',   description: 'Языковой сертификат Института Гёте',                                  type: 'language' },
    { code: 'NC',        name: 'Numerus Clausus (NC)',    description: 'Проходной балл для ограниченных специальностей (медицина, юриспруденция)', type: 'academic' },
    { code: 'DAAD',      name: 'Стипендия DAAD',          description: 'Стипендия Германской службы академических обменов',                   type: 'scholarship' },
  ],

  Austria: [
    { code: 'MATURA',    name: 'Matura',                          description: 'Австрийский аттестат зрелости',                         type: 'national' },
    { code: 'SBP',       name: 'Studienberechtigungsprüfung',     description: 'Экзамен на право поступления без аттестата',             type: 'academic' },
    { code: 'TESTDAF',   name: 'TestDaF / ÖSD',                  description: 'Тест по немецкому языку (уровень B2+)',                  type: 'language' },
    { code: 'OeAD',      name: 'Стипендия OeAD',                 description: 'Австрийское агентство по вопросам образования и науки',  type: 'scholarship' },
  ],

  Switzerland: [
    { code: 'MATURA_CH', name: 'Maturité / Matura / Maturità',   description: 'Швейцарский аттестат (на 4 национальных языках)',   type: 'national' },
    { code: 'NC_CH',     name: 'Numerus Clausus',                 description: 'Проходной балл для медицины и юриспруденции',       type: 'academic' },
    { code: 'ETH_ENTRY', name: 'ETH Entrance Exam',              description: 'Внутренний вступительный экзамен ETH Zurich',       type: 'academic' },
    { code: 'SNF',       name: 'Грант SNF',                      description: 'Национальный научный фонд Швейцарии',               type: 'scholarship' },
  ],

  France: [
    { code: 'BAC',       name: 'Baccalauréat',               description: 'Французский аттестат зрелости — ключевой документ',   type: 'national' },
    { code: 'CPGE',      name: 'CPGE / Concours Grandes Écoles', description: 'Подготовительные классы + конкурсные экзамены в grandes écoles', type: 'academic' },
    { code: 'PARCOURSUP',name: 'Parcoursup',                  description: 'Национальная платформа подачи заявлений в вузы',      type: 'national' },
    { code: 'DELF',      name: 'DELF / DALF',                 description: 'Диплом по французскому языку (A1–C2)',                type: 'language' },
    { code: 'TCF',       name: 'TCF (Test de Connaissance du Français)', description: 'Тест на знание французского языка',         type: 'language' },
    { code: 'TEF',       name: 'TEF',                         description: 'Тест на знание французского (для иммиграции и вузов)',type: 'language' },
    { code: 'EIFFEL',    name: 'Стипендия Эйфель',           description: 'Правительственная стипендия Франции для иностранцев', type: 'scholarship' },
    { code: 'GMAT',      name: 'GMAT',                        description: 'Для поступления на MBA (HEC, INSEAD)',                 type: 'academic' },
  ],

  Netherlands: [
    { code: 'VWO',       name: 'VWO Diploma',                description: 'Голландский аттестат для поступления в университет',  type: 'national' },
    { code: 'HAVO',      name: 'HAVO Diploma',               description: 'Аттестат для поступления в прикладные вузы (HBO)',    type: 'national' },
    { code: 'GMAT',      name: 'GMAT',                       description: 'Для программ MBA',                                    type: 'academic' },
    { code: 'GRE',       name: 'GRE',                        description: 'Graduate Record Examination — для магистратуры',      type: 'academic' },
    { code: 'NUFFIC',    name: 'Стипендия Orange Tulip',     description: 'Стипендия нидерландских университетов',               type: 'scholarship' },
  ],

  Belgium: [
    { code: 'TOELATINGS', name: 'Toelatingsexamen',         description: 'Вступительный экзамен на медицину и стоматологию',   type: 'academic' },
    { code: 'CEER',      name: 'CEER (Concours)',           description: 'Конкурсный экзамен для Engineering (Louvain)',        type: 'academic' },
    { code: 'DELF',      name: 'DELF / DALF',              description: 'Для франкоязычных университетов',                     type: 'language' },
    { code: 'CNT',       name: 'Certificaat NT2',          description: 'Сертификат нидерландского языка (NT2)',               type: 'language' },
    { code: 'VLIR',      name: 'VLIR-UOS Scholarship',     description: 'Стипендия фламандских университетов',                 type: 'scholarship' },
  ],

  UK: [
    { code: 'ALEVEL',    name: 'A-Levels',                  description: 'Британские экзамены для поступления в университет (3 предмета)',  type: 'national' },
    { code: 'UCAS',      name: 'UCAS Points',               description: 'Очки UCAS на основе A-Levels / IB / BTEC',                       type: 'national' },
    { code: 'BTEC',      name: 'BTEC National Diploma',     description: 'Профессиональный диплом (альтернатива A-Levels)',                  type: 'national' },
    { code: 'IB',        name: 'IB Diploma',                description: 'Международный бакалавриат (принимается во всём мире)',             type: 'national' },
    { code: 'BMAT',      name: 'BMAT',                      description: 'Biomedical Admissions Test — для медицины (Оксфорд, Кембридж, UCL)', type: 'academic' },
    { code: 'UCAT',      name: 'UCAT',                      description: 'UK Clinical Aptitude Test — для медицины/стоматологии',            type: 'academic' },
    { code: 'LNAT',      name: 'LNAT',                      description: 'National Admissions Test for Law — для юриспруденции',             type: 'academic' },
    { code: 'MAT',       name: 'MAT (Maths)',               description: 'Mathematics Admissions Test — Оксфорд',                           type: 'academic' },
    { code: 'PAT',       name: 'PAT (Physics)',             description: 'Physics Aptitude Test — Оксфорд',                                 type: 'academic' },
    { code: 'TSA',       name: 'TSA',                       description: 'Thinking Skills Assessment — PPE, Economics, History (Оксфорд)',   type: 'academic' },
    { code: 'GMAT',      name: 'GMAT',                      description: 'Для MBA программ (LBS, Said, Judge)',                             type: 'academic' },
    { code: 'CHEVENING', name: 'Стипендия Chevening',      description: 'Правительственная стипендия Великобритании',                       type: 'scholarship' },
    { code: 'GATES',     name: 'Gates Cambridge Scholarship', description: 'Стипендия Кембриджа для исследователей',                         type: 'scholarship' },
  ],

  Ireland: [
    { code: 'LEAVING',   name: 'Leaving Certificate',       description: 'Ирландский выпускной экзамен (400–600 баллов)',       type: 'national' },
    { code: 'CAO',       name: 'CAO Points',                description: 'Очки для поступления через Central Applications Office', type: 'national' },
    { code: 'GAMSAT',    name: 'GAMSAT',                    description: 'Graduate Australian Medical School Admissions Test',  type: 'academic' },
    { code: 'HPAT',      name: 'HPAT-Ireland',             description: 'Health Professions Admission Test (медицина)',         type: 'academic' },
  ],

  Sweden: [
    { code: 'HOGSKOLEPROV', name: 'Högskoleprov (SweSAT)', description: 'Шведский SAT — тест для поступления в университеты',  type: 'national' },
    { code: 'GYMNASIEBETYG', name: 'Gymnasiebetyg',        description: 'Аттестат гимназии (баллы по шкале A–F)',               type: 'national' },
    { code: 'SWEDISH_B1',   name: 'Сертификат по шведскому', description: 'Для программ на шведском языке',                    type: 'language' },
    { code: 'SI',           name: 'Стипендия SI',          description: 'Swedish Institute Scholarship for Global Professionals', type: 'scholarship' },
  ],

  Norway: [
    { code: 'VITNEMAL',  name: 'Vitnemål',                 description: 'Норвежский аттестат о среднем образовании',           type: 'national' },
    { code: 'SAMORDNA',  name: 'Samordna Opptak',          description: 'Централизованная система подачи заявлений',           type: 'national' },
    { code: 'BERGENSTESTEN', name: 'Bergenstesten',        description: 'Тест по норвежскому языку',                           type: 'language' },
    { code: 'NORPART',   name: 'NORPART Scholarship',      description: 'Стипендия Норвегии для стран-партнёров',              type: 'scholarship' },
  ],

  Finland: [
    { code: 'YLIOPPILASTUTKINTO', name: 'Ylioppilastutkinto', description: 'Финский аттестат зрелости (matriculation exam)',   type: 'national' },
    { code: 'YRKESHOGSKOLA',     name: 'Ammattikorkeakoulu entrance exam', description: 'Вступительный экзамен в прикладные вузы', type: 'academic' },
    { code: 'YKI',               name: 'YKI (финский язык)', description: 'Тест финского языка для иностранцев',               type: 'language' },
    { code: 'FINLAND_GOVT',      name: 'Стипендия CIMO/Finland Government', description: 'Правительственные стипендии Финляндии', type: 'scholarship' },
  ],

  Denmark: [
    { code: 'STX',       name: 'STX / HHX / HTX',          description: 'Датский аттестат зрелости (разные профили)',          type: 'national' },
    { code: 'KOT',       name: 'KOT Kvotient',              description: 'Квотиент поступления на основе аттестата и экзаменов', type: 'national' },
    { code: 'DELF_DAN',  name: 'Сертификат датского языка', description: 'Для программ на датском языке',                      type: 'language' },
    { code: 'DENMARK_GOV', name: 'Denmark Government Scholarship', description: 'Стипендия датского правительства',            type: 'scholarship' },
  ],

  Spain: [
    { code: 'EVAU',      name: 'EVAU / Selectividad',       description: 'Испанский вступительный экзамен (ранее PAU)',        type: 'national' },
    { code: 'EBAU',      name: 'EBAU',                      description: 'Evaluación del Bachillerato para el Acceso a la Universidad', type: 'national' },
    { code: 'DELE',      name: 'DELE',                      description: 'Diplomas de Español como Lengua Extranjera (A1–C2)', type: 'language' },
    { code: 'SIELE',     name: 'SIELE',                     description: 'Servicio Internacional de Evaluación de la Lengua Española', type: 'language' },
    { code: 'GMAT',      name: 'GMAT',                      description: 'Для бизнес-школ (IESE, ESADE)',                      type: 'academic' },
    { code: 'AEI',       name: 'Стипендия AEI Maec',        description: 'Испанская правительственная стипендия',              type: 'scholarship' },
  ],

  Portugal: [
    { code: 'ENEM_PT',   name: 'ENEM (для бразильцев)',     description: 'Бразильский аналог для поступления в Португалии',   type: 'national' },
    { code: 'EXAMES',    name: 'Exames Nacionais',          description: 'Национальные экзамены Португалии',                   type: 'national' },
    { code: 'CAPLE',     name: 'CAPLE (CIPLE/DIPLE/DAPLE)', description: 'Сертификаты португальского языка',                  type: 'language' },
    { code: 'CAMOES',    name: 'Стипендия Camões Institute', description: 'Португальская государственная стипендия',          type: 'scholarship' },
  ],

  Italy: [
    { code: 'MATURITA',  name: 'Esame di Stato / Maturità', description: 'Итальянский выпускной экзамен',                    type: 'national' },
    { code: 'TOLC',      name: 'TOLC',                      description: 'Test Online CISIA — для технических и медицинских специальностей', type: 'academic' },
    { code: 'IMAT',      name: 'IMAT',                      description: 'International Medical Admissions Test (Италия)',    type: 'academic' },
    { code: 'PLIDA',     name: 'PLIDA / CELI',              description: 'Сертификаты итальянского языка',                    type: 'language' },
    { code: 'GRASP',     name: 'Стипендия Правительства Италии', description: 'Государственные стипендии для иностранцев',   type: 'scholarship' },
  ],

  CzechRepublic: [
    { code: 'MATURITA_CZ', name: 'Maturitní zkouška',      description: 'Чешский аттестат зрелости',                         type: 'national' },
    { code: 'PRIJIMACI',   name: 'Přijímací zkouška',       description: 'Вступительные испытания вуза (тест по предметам)',   type: 'academic' },
    { code: 'CCE',         name: 'CCE (Czech)',              description: 'Сертификат чешского языка B2+ для обучения на чешском', type: 'language' },
    { code: 'SCUK',        name: 'Стипендия МИД Чехии',     description: 'Правительственные стипендии Чешской Республики',    type: 'scholarship' },
  ],

  Poland: [
    { code: 'MATURA_PL',  name: 'Matura',                   description: 'Польский аттестат зрелости',                        type: 'national' },
    { code: 'REKRUTACJA',  name: 'Rekrutacja (баллы ЕГЭ)',   description: 'Польские вузы принимают ЕГЭ для граждан России/Беларуси', type: 'national' },
    { code: 'CERTYFIKAT',  name: 'Certyfikat Języka Polskiego', description: 'Сертификат польского языка B1/B2 для обучения', type: 'language' },
    { code: 'NAWA',        name: 'Стипендия NAWA',           description: 'Стипендия Национального агентства академического обмена', type: 'scholarship' },
  ],

  Hungary: [
    { code: 'ERETTSEGI',  name: 'Érettségi',                description: 'Венгерский аттестат зрелости',                     type: 'national' },
    { code: 'FELVETELI',  name: 'Felvételi vizsgák',         description: 'Вступительные экзамены вуза',                      type: 'academic' },
    { code: 'STIPENDIUM', name: 'Stipendium Hungaricum',     description: 'Государственная стипендия Венгрии для иностранцев (полное покрытие)', type: 'scholarship' },
    { code: 'OKTATAS',    name: 'Сертификат венгерского языка', description: 'Языковой сертификат (уровень B2+)',             type: 'language' },
  ],

  Greece: [
    { code: 'PANHELLENIC', name: 'Πανελλαδικές Εξετάσεις', description: 'Всегреческие вступительные экзамены',              type: 'national' },
    { code: 'IKY',         name: 'IKY Scholarship',         description: 'Государственная стипендия Греции',                 type: 'scholarship' },
  ],

  Romania: [
    { code: 'BACALAUREAT', name: 'Bacalaureat',             description: 'Румынский аттестат зрелости',                      type: 'national' },
    { code: 'CONCURS',     name: 'Concurs de admitere',     description: 'Конкурсный вступительный экзамен',                 type: 'academic' },
    { code: 'MEC',         name: 'Стипендия Министерства образования Румынии', description: 'Государственные стипендии',     type: 'scholarship' },
  ],

  // ═══════════════════════════════════════════════════════════════
  // АЗИЯ
  // ═══════════════════════════════════════════════════════════════

  Japan: [
    { code: 'EJU',        name: 'EJU (Examination for Japanese University Admission)', description: 'Основной вступительный тест для иностранцев (японский + предметы)', type: 'national' },
    { code: 'JLPT',       name: 'JLPT (日本語能力試験)',    description: 'Japanese Language Proficiency Test (N1–N5)',        type: 'language' },
    { code: 'MEXT',       name: 'MEXT Scholarship',         description: 'Стипендия Министерства образования Японии (полное покрытие)', type: 'scholarship' },
    { code: 'JASSO',      name: 'JASSO Scholarship',        description: 'Japan Student Services Organization стипендия',    type: 'scholarship' },
    { code: 'KYOIKU',     name: 'Университетский вступительный экзамен (KSAT)', description: 'Вузовский тест по профильным предметам', type: 'academic' },
    { code: 'TOKUTEI',    name: 'Tokutei Gino (特定技能)',   description: 'Сертификат специализированных навыков (для некоторых программ)', type: 'academic' },
  ],

  China: [
    { code: 'GAOKAO',     name: '高考 (Gaokao)',            description: 'Национальный вступительный экзамен Китая — самый масштабный в мире', type: 'national' },
    { code: 'HSK',        name: 'HSK (汉语水平考试)',        description: 'Тест по китайскому языку (HSK 1–6 / HSK 3.0 до уровня 9)', type: 'language' },
    { code: 'HSKK',       name: 'HSKK (устный)',           description: 'Устный тест по китайскому языку',                   type: 'language' },
    { code: 'CSC',        name: 'Стипендия CSC',           description: 'Chinese Scholarship Council — полное финансирование для иностранцев', type: 'scholarship' },
    { code: 'PROVINCIAL', name: 'Провинциальные экзамены', description: 'Дополнительные экзамены отдельных провинций',        type: 'national' },
    { code: 'GMAT',       name: 'GMAT',                    description: 'Для MBA (CEIBS, PKU, Tsinghua)',                     type: 'academic' },
  ],

  SouthKorea: [
    { code: 'CSAT',       name: 'CSAT / Suneung (수능)',    description: 'Национальный вступительный экзамен Кореи',          type: 'national' },
    { code: 'TOPIK',      name: 'TOPIK (한국어능력시험)',    description: 'Test of Proficiency in Korean (TOPIK I–II, уровни 1–6)', type: 'language' },
    { code: 'GKS',        name: 'GKS (Global Korea Scholarship)', description: 'Государственная стипендия Кореи (полное финансирование)', type: 'scholarship' },
    { code: 'NIIED',      name: 'NIIED Scholarship',       description: 'National Institute for International Education стипендия', type: 'scholarship' },
    { code: 'SAT_ACT',    name: 'SAT / ACT',               description: 'Принимается в топ-университетах Кореи для иностранцев', type: 'academic' },
  ],

  Taiwan: [
    { code: 'GSAT',       name: 'GSAT / CSAT (學測/指考)', description: 'Тайваньский национальный вступительный тест',        type: 'national' },
    { code: 'TOCFL',      name: 'TOCFL (華語文能力測驗)',   description: 'Test of Chinese as a Foreign Language (A1–C2)',       type: 'language' },
    { code: 'MOE_TW',     name: 'Стипендия MOE Taiwan',    description: 'Стипендия Министерства образования Тайваня',          type: 'scholarship' },
    { code: 'HUAYU',      name: 'Huayu Enrichment Scholarship', description: 'Стипендия для изучения китайского языка на Тайване', type: 'scholarship' },
  ],

  Singapore: [
    { code: 'ALEVELS_SG', name: 'A-Levels (Singapore)',    description: 'Сингапурские A-Levels через SEAB',                  type: 'national' },
    { code: 'IBDP',       name: 'IB Diploma Programme',    description: 'Международный бакалавриат',                         type: 'national' },
    { code: 'SAT',        name: 'SAT',                     description: 'Принимается в NUS и NTU',                            type: 'academic' },
    { code: 'A_STAR',     name: 'A*STAR Scholarship',      description: 'Agency for Science, Technology and Research стипендия', type: 'scholarship' },
    { code: 'MOE_SG',     name: 'ASEAN Scholarship',       description: 'Стипендия Сингапура для граждан ASEAN',              type: 'scholarship' },
  ],

  India: [
    { code: 'JEE',        name: 'JEE Main / Advanced',     description: 'Joint Entrance Examination — для инженерных специальностей (IIT, NIT)', type: 'national' },
    { code: 'NEET',       name: 'NEET',                    description: 'National Eligibility cum Entrance Test — для медицины', type: 'national' },
    { code: 'CAT',        name: 'CAT',                     description: 'Common Admission Test — для MBA (IIM)',               type: 'academic' },
    { code: 'GATE',       name: 'GATE',                    description: 'Graduate Aptitude Test in Engineering — для магистратуры', type: 'academic' },
    { code: 'CLAT',       name: 'CLAT',                    description: 'Common Law Admission Test — для юриспруденции',       type: 'academic' },
    { code: 'UPSC',       name: 'UPSC',                    description: 'Union Public Service Commission — государственная служба', type: 'national' },
    { code: 'ICAR',       name: 'ICAR AIEEA',              description: 'Вступительный экзамен для аграрных специальностей',   type: 'academic' },
  ],

  Malaysia: [
    { code: 'STPM',       name: 'STPM / Matriculation',    description: 'Malaysian University English Test + STPM',           type: 'national' },
    { code: 'UPU',        name: 'UPU (Unit Pusat Universiti)', description: 'Централизованная подача заявлений в малайзийские вузы', type: 'national' },
    { code: 'MUET',       name: 'MUET',                    description: 'Malaysian University English Test',                   type: 'language' },
    { code: 'MSD',        name: 'Стипендия MSD',           description: 'Майонез Malaysia Scholarship Division',              type: 'scholarship' },
  ],

  Thailand: [
    { code: 'TCAS',       name: 'TCAS',                    description: 'Thai University Central Admission System',           type: 'national' },
    { code: 'ONET',       name: 'O-NET',                   description: 'Ordinary National Educational Test',                 type: 'national' },
    { code: 'TGAT',       name: 'TGAT / TPAT',            description: 'Thai General Aptitude Test / Professional Aptitude', type: 'academic' },
    { code: 'DPST',       name: 'DPST Scholarship',        description: 'Development and Promotion of Science and Technology Talents', type: 'scholarship' },
  ],

  Vietnam: [
    { code: 'THPTQG',     name: 'THPT Quốc Gia',          description: 'Национальный выпускной экзамен Вьетнама',            type: 'national' },
    { code: 'VIED',       name: 'VIED Scholarship',        description: 'Vietnam International Education Development стипендия', type: 'scholarship' },
  ],

  Indonesia: [
    { code: 'SNBT',       name: 'SNBT (UTBK)',             description: 'Seleksi Nasional Berdasarkan Tes — национальный тест', type: 'national' },
    { code: 'SNBP',       name: 'SNBP',                    description: 'Поступление по результатам аттестата',                type: 'national' },
    { code: 'LPDP',       name: 'LPDP Scholarship',        description: 'Indonesia Endowment Fund for Education — государственная стипендия', type: 'scholarship' },
  ],

  Pakistan: [
    { code: 'NAT',        name: 'NAT (NTS)',               description: 'National Aptitude Test — для поступления в вузы Пакистана', type: 'national' },
    { code: 'GAT',        name: 'GAT',                     description: 'Graduate Assessment Test — для магистратуры',         type: 'academic' },
    { code: 'HEC',        name: 'HEC Scholarship',         description: 'Higher Education Commission стипендия',              type: 'scholarship' },
  ],

  Bangladesh: [
    { code: 'HSC',        name: 'HSC (Higher Secondary Certificate)', description: 'Выпускной экзамен',                      type: 'national' },
    { code: 'ICT_BD',     name: 'Вступительный экзамен вуза',         description: 'Индивидуальные экзамены университетов',   type: 'academic' },
  ],

  SriLanka: [
    { code: 'ALEVELS_SL', name: 'Sri Lanka A-Levels',     description: 'Шриланкийские A-Levels по системе UK',               type: 'national' },
    { code: 'UGC_SL',     name: 'UGC Z-score',            description: 'University Grants Commission Z-score',                type: 'national' },
  ],

  // ═══════════════════════════════════════════════════════════════
  // БЛИЖНИЙ ВОСТОК И АФРИКА
  // ═══════════════════════════════════════════════════════════════

  UAE: [
    { code: 'EMSAT',      name: 'EmSAT',                   description: 'Emirates Standardised Test — для поступления в ОАЭ',  type: 'national' },
    { code: 'SAT',        name: 'SAT',                     description: 'Принимается в международных университетах ОАЭ',       type: 'academic' },
    { code: 'IELTS',      name: 'IELTS',                   description: 'Обязательный языковой экзамен',                       type: 'language' },
    { code: 'TOEFL',      name: 'TOEFL',                   description: 'Альтернатива IELTS',                                  type: 'language' },
  ],

  SaudiArabia: [
    { code: 'QIYAS',      name: 'Qiyas (القياس)',          description: 'Национальный вступительный тест Саудовской Аравии',   type: 'national' },
    { code: 'TAHSILI',    name: 'Tahsili Achievement Test', description: 'Тест достижений по профильным предметам',            type: 'academic' },
    { code: 'KAUST',      name: 'Стипендия KAUST',         description: 'Стипендия Университета науки и технологий им. Короля Абдаллы', type: 'scholarship' },
  ],

  Turkey: [
    { code: 'YKS',        name: 'YKS (Yükseköğretim Kurumları Sınavı)', description: 'Единый вступительный экзамен Турции (TYT + AYT)', type: 'national' },
    { code: 'YOS',        name: 'YÖS',                     description: 'Yabancı Uyruklu Öğrenci Sınavı — для иностранцев',   type: 'academic' },
    { code: 'TURKCE',     name: 'Türkçe Yeterlik Sınavı',  description: 'Государственный экзамен по турецкому языку',          type: 'language' },
    { code: 'YTB',        name: 'Стипендия Türkiye Bursları', description: 'Государственная стипендия Турции (полное финансирование)', type: 'scholarship' },
  ],

  Egypt: [
    { code: 'THANAWEYA', name: 'Thanaweya Amma',           description: 'Египетский выпускной экзамен',                       type: 'national' },
    { code: 'UNIV_EG',   name: 'Вступительный экзамен вуза', description: 'Отдельные экзамены университетов',                 type: 'academic' },
    { code: 'MHESR',     name: 'Стипендия египетского правительства', description: 'Стипендии для иностранцев',               type: 'scholarship' },
  ],

  SouthAfrica: [
    { code: 'NSC',        name: 'NSC (National Senior Certificate)', description: 'Южноафриканский аттестат',                 type: 'national' },
    { code: 'NBT',        name: 'NBT',                     description: 'National Benchmark Tests — для поступления в ведущие вузы', type: 'academic' },
    { code: 'APS',        name: 'APS Score',               description: 'Admission Point Score — балл для поступления',        type: 'national' },
    { code: 'NSFAS',      name: 'NSFAS',                   description: 'National Student Financial Aid Scheme',              type: 'scholarship' },
  ],

  Nigeria: [
    { code: 'UTME',       name: 'UTME (JAMB)',             description: 'Unified Tertiary Matriculation Examination',          type: 'national' },
    { code: 'POST_UTME',  name: 'Post-UTME',               description: 'Экзамен вуза после UTME',                            type: 'academic' },
    { code: 'WAEC',       name: 'WAEC / NECO',             description: 'West African Examinations Council выпускной экзамен', type: 'national' },
    { code: 'MNI',        name: 'Стипендия Nigerian Govt', description: 'Государственная стипендия Нигерии',                  type: 'scholarship' },
  ],

  Kenya: [
    { code: 'KCSE',       name: 'KCSE',                    description: 'Kenya Certificate of Secondary Education',           type: 'national' },
    { code: 'KUCCPS',     name: 'KUCCPS',                  description: 'Централизованная система поступления в вузы Кении',  type: 'national' },
    { code: 'HELB',       name: 'HELB Loan/Scholarship',   description: 'Higher Education Loans Board',                       type: 'scholarship' },
  ],

  Morocco: [
    { code: 'BAC_MA',     name: 'Baccalauréat marocain',   description: 'Марокканский аттестат зрелости',                     type: 'national' },
    { code: 'CPGE_MA',    name: 'CPGE (Maroc)',            description: 'Подготовительные классы для Grandes Écoles',          type: 'academic' },
    { code: 'AMCI',       name: 'Стипендия AMCI',          description: 'Agence Marocaine de Coopération Internationale',     type: 'scholarship' },
  ],

  Ethiopia: [
    { code: 'EUEE',       name: 'EUEE',                    description: 'Ethiopian University Entrance Examination',           type: 'national' },
  ],

  Ghana: [
    { code: 'WASSCE',     name: 'WASSCE',                  description: 'West African Senior School Certificate Examination',  type: 'national' },
    { code: 'CSSPS',      name: 'CSSPS',                   description: 'Computerised School Selection and Placement System',  type: 'national' },
  ],

  Iran: [
    { code: 'KONKUR',     name: 'Konkur (کنکور)',          description: 'Иранский национальный вступительный экзамен',         type: 'national' },
    { code: 'PERSIA_LANG', name: 'Тест по персидскому языку', description: 'Для программ на персидском',                     type: 'language' },
  ],

  Israel: [
    { code: 'PSYCHOMETRIC', name: 'Psychometric Entrance Test', description: 'Израильский SAT (психометрический тест)',       type: 'national' },
    { code: 'BAGRUT',     name: 'Bagrut (בגרות)',          description: 'Израильский аттестат зрелости',                      type: 'national' },
  ],

  // ═══════════════════════════════════════════════════════════════
  // СЕВЕРНАЯ И ЮЖНАЯ АМЕРИКА
  // ═══════════════════════════════════════════════════════════════

  USA: [
    { code: 'SAT',        name: 'SAT',                     description: 'Scholastic Assessment Test — основной вступительный тест', type: 'national' },
    { code: 'ACT',        name: 'ACT',                     description: 'American College Testing — альтернатива SAT',          type: 'national' },
    { code: 'AP',         name: 'AP Exams',                description: 'Advanced Placement — продвинутые предметы для зачёта', type: 'academic' },
    { code: 'GRE',        name: 'GRE',                     description: 'Graduate Record Examination — для магистратуры',       type: 'academic' },
    { code: 'GMAT',       name: 'GMAT',                    description: 'Graduate Management Admission Test — для MBA',         type: 'academic' },
    { code: 'LSAT',       name: 'LSAT',                    description: 'Law School Admission Test — для юриспруденции',        type: 'professional' },
    { code: 'MCAT',       name: 'MCAT',                    description: 'Medical College Admission Test — для медицины',        type: 'professional' },
    { code: 'DAT',        name: 'DAT',                     description: 'Dental Admission Test — для стоматологии',             type: 'professional' },
    { code: 'PCAT',       name: 'PCAT',                    description: 'Pharmacy College Admissions Test',                     type: 'professional' },
    { code: 'TOEFL',      name: 'TOEFL',                   description: 'Test of English as a Foreign Language',                type: 'language' },
    { code: 'FULBRIGHT',  name: 'Fulbright Scholarship',   description: 'Флагманская стипендия США для иностранцев',            type: 'scholarship' },
    { code: 'IELTS',      name: 'IELTS',                   description: 'Альтернатива TOEFL во многих университетах',           type: 'language' },
  ],

  Canada: [
    { code: 'OSSD',       name: 'Ontario Secondary School Diploma', description: 'Для Онтарио — основной аттестат',          type: 'national' },
    { code: 'BC_DOGWOOD', name: 'BC Dogwood Diploma',      description: 'Аттестат провинции Британская Колумбия',              type: 'national' },
    { code: 'SAT',        name: 'SAT / ACT',               description: 'Принимается в ряде канадских университетов',          type: 'academic' },
    { code: 'LSAT',       name: 'LSAT',                    description: 'Для юридических школ (Osgoode, UBC Law, McGill)',     type: 'professional' },
    { code: 'MCAT',       name: 'MCAT',                    description: 'Для медицинских школ',                                type: 'professional' },
    { code: 'VANIER',     name: 'Vanier CGS',              description: 'Vanier Canada Graduate Scholarship — для PhD',         type: 'scholarship' },
    { code: 'CANADA_GOVT', name: 'Canada Government Scholarship', description: 'Государственные стипендии Канады',            type: 'scholarship' },
  ],

  Brazil: [
    { code: 'ENEM',       name: 'ENEM',                    description: 'Exame Nacional do Ensino Médio — ключевой национальный экзамен', type: 'national' },
    { code: 'FUVEST',     name: 'FUVEST / UNICAMP',        description: 'Экзамены ведущих университетов Бразилии',              type: 'academic' },
    { code: 'CELPE',      name: 'CELPE-Bras',              description: 'Сертификат по португальскому языку',                   type: 'language' },
    { code: 'CNPQ',       name: 'CNPq Scholarship',        description: 'Национальный совет научно-технического развития Бразилии', type: 'scholarship' },
  ],

  Mexico: [
    { code: 'CENEVAL',    name: 'CENEVAL / EXANI',         description: 'Examen Nacional de Ingreso — мексиканский вступительный тест', type: 'national' },
    { code: 'UNAM_EXAM',  name: 'Examen UNAM',             description: 'Вступительный экзамен Национального автономного университета', type: 'academic' },
    { code: 'AMEXCID',    name: 'Стипендия AMEXCID',       description: 'Агентство по международному сотрудничеству Мексики',   type: 'scholarship' },
  ],

  Argentina: [
    { code: 'CBC',        name: 'CBC (UBA)',               description: 'Ciclo Básico Común — вводный курс для поступления в UBA', type: 'academic' },
    { code: 'PUEBA',      name: 'Prueba de nivelación',    description: 'Нивелировочный тест (в зависимости от вуза)',          type: 'academic' },
    { code: 'DELES',      name: 'DELES (CELU)',            description: 'Сертификат по испанскому языку (Аргентина)',           type: 'language' },
  ],

  Chile: [
    { code: 'PAES',       name: 'PAES',                    description: 'Prueba de Acceso a la Educación Superior',            type: 'national' },
    { code: 'DEMRE',      name: 'PDT / DEMRE',             description: 'Departamento de Evaluación de la Universidad de Chile', type: 'national' },
    { code: 'BECAS_CHILE', name: 'Becas Chile',            description: 'Государственная стипендия Чили',                      type: 'scholarship' },
  ],

  Colombia: [
    { code: 'ICFES',      name: 'Saber 11 (ICFES)',        description: 'Колумбийский выпускной экзамен',                      type: 'national' },
    { code: 'ICETEX',     name: 'ICETEX Scholarship',      description: 'Instituto Colombiano de Crédito Educativo',           type: 'scholarship' },
  ],

  Peru: [
    { code: 'EXAMEN_ADM', name: 'Examen de admisión',      description: 'Вступительный экзамен каждого перуанского университета', type: 'academic' },
    { code: 'PRONABEC',   name: 'Beca 18 / PRONABEC',      description: 'Программа стипендий правительства Перу',              type: 'scholarship' },
  ],

  // ═══════════════════════════════════════════════════════════════
  // АВСТРАЛИЯ И ОКЕАНИЯ
  // ═══════════════════════════════════════════════════════════════

  Australia: [
    { code: 'ATAR',       name: 'ATAR',                    description: 'Australian Tertiary Admission Rank — ключевой балл для поступления', type: 'national' },
    { code: 'HSC',        name: 'HSC / VCE / QCE / SACE',  description: 'Выпускные свидетельства по штатам (NSW/VIC/QLD/SA)',  type: 'national' },
    { code: 'GAMSAT',     name: 'GAMSAT',                  description: 'Graduate Australian Medical School Admissions Test',   type: 'professional' },
    { code: 'UCAT_ANZ',   name: 'UCAT ANZ',               description: 'University Clinical Aptitude Test (медицина/стоматология)', type: 'professional' },
    { code: 'LSAT',       name: 'LSAT',                    description: 'Для ряда юридических школ',                           type: 'professional' },
    { code: 'AUS_GOVT',   name: 'Australia Awards',        description: 'Государственные стипендии Австралии',                  type: 'scholarship' },
    { code: 'RTP',        name: 'RTP (Research Training Program)', description: 'Стипендия для PhD от правительства',          type: 'scholarship' },
  ],

  NewZealand: [
    { code: 'NCEA',       name: 'NCEA',                    description: 'National Certificate of Educational Achievement',     type: 'national' },
    { code: 'NZ_SCHOLAR', name: 'NZ International Scholarship', description: 'Государственная стипендия Новой Зеландии',      type: 'scholarship' },
  ],

  // ═══════════════════════════════════════════════════════════════
  // МЕЖДУНАРОДНЫЕ ЭКЗАМЕНЫ (принимаются везде)
  // ═══════════════════════════════════════════════════════════════

  International: [
    { code: 'IELTS',      name: 'IELTS',                   description: 'International English Language Testing System (0–9 баллов)',  type: 'language' },
    { code: 'TOEFL',      name: 'TOEFL iBT',               description: 'Test of English as a Foreign Language (0–120 баллов)',        type: 'language' },
    { code: 'TOEFL_EAP',  name: 'TOEFL Essentials',        description: 'Упрощённая версия TOEFL',                                     type: 'language' },
    { code: 'CAMBRIDGE',  name: 'Cambridge (CAE/CPE)',      description: 'Сертификаты Кембриджского университета (C1/C2)',               type: 'language' },
    { code: 'DUOLINGO',   name: 'Duolingo English Test',    description: 'Онлайн-тест, принимается >4000 вузами',                       type: 'language' },
    { code: 'PEARSON',    name: 'PTE Academic',             description: 'Pearson Test of English Academic',                            type: 'language' },
    { code: 'IB',         name: 'IB Diploma',              description: 'International Baccalaureate — 24–45 баллов (полная программа)', type: 'national' },
    { code: 'GRE',        name: 'GRE General / Subject',    description: 'Graduate Record Examination — магистратура и PhD',            type: 'academic' },
    { code: 'GMAT',       name: 'GMAT / GMAT Focus',       description: 'Graduate Management Admission Test — MBA',                    type: 'academic' },
    { code: 'MCAT',       name: 'MCAT',                    description: 'Medical College Admission Test',                              type: 'professional' },
    { code: 'LSAT',       name: 'LSAT',                    description: 'Law School Admission Test',                                   type: 'professional' },
  ],
}

// Флаги стран для UI
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
  International: '🌐',
}

// Список всех стран (для селекта)
export const ALL_COUNTRIES = Object.keys(EXAMS_BY_COUNTRY).sort()

// Получить экзамены для страны
export function getExamsForCountry(country: string): ExamInfo[] {
  return EXAMS_BY_COUNTRY[country] ?? []
}

// Тип экзамена → лейбл
export const EXAM_TYPE_LABELS: Record<ExamInfo['type'], string> = {
  national:     'Национальный экзамен',
  academic:     'Вступительный / академический',
  language:     'Языковой экзамен',
  scholarship:  'Стипендиальная программа',
  professional: 'Профессиональный тест',
}