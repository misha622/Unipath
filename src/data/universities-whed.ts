// 23898 universities, 252 countries

export interface Univ {
  n: string; a: string; c: string; t: string; r: string;
  s: string; w: string; e: string; p: string;
  f: number | null; y: string; d: string;
  l: string[]; u: { name: string; fields: string[] }[];
  i: string; x: string; o: string;
  wiki: string; desc: string; students: string;
  history: string; accreditation: string;
}


// Data moved to ./universities/index.ts
export { allUniversities as universities } from './universities/index';
