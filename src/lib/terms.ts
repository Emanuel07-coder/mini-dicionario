import termsData from './terms.json'; // Importa o seu arquivo JSON

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type TermEntry = {
  term: string;
  translation: string;
  definition: string;
  example: string;
};

// Retorna todos os termos do JSON
export function getAllTerms(): TermEntry[] {
  return termsData;
}

// Função de busca que olha Termo, Tradução e Definição
export function searchTerms(query: string) {
  const q = query.toLowerCase();
  
  const filtered = termsData.filter(entry => 
    entry.term.toLowerCase().includes(q) || 
    entry.translation.toLowerCase().includes(q) || 
    entry.definition.toLowerCase().includes(q)
  );

  // Retorna o termo junto com a primeira letra dele para montar a URL correta
  return filtered.map(entry => ({
    letter: entry.term[0].toUpperCase(),
    entry: entry
  }));
}
