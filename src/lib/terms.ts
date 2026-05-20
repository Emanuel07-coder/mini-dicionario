// Agora o arquivo está na mesma pasta, então usamos './'
import termsData from './terms.json'; 

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type TermEntry = {
  term: string;
  translation: string;
  definition: string;
  example: string;
};

export function getAllTerms(): TermEntry[] {
  return termsData as TermEntry[];
}

export function searchTerms(query: string) {
  const q = query.toLowerCase();
  const data = getAllTerms();
  
  const filtered = data.filter(entry => 
    entry.term.toLowerCase().includes(q) || 
    entry.translation.toLowerCase().includes(q) || 
    entry.definition.toLowerCase().includes(q)
  );

  return filtered.map(entry => ({
    letter: entry.term[0].toUpperCase(),
    entry: entry
  }));
}
