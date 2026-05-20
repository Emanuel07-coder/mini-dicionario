// ../.. sobe dois níveis: sai de 'lib', sai de 'src' e chega na raiz do projeto.
import termsData from '../../data/terms.json'; 

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type TermEntry = {
  term: string;
  translation: string;
  definition: string;
  example: string;
};

// Retorna todos os termos do JSON
export function getAllTerms(): TermEntry[] {
  // O 'as TermEntry[]' avisa ao TypeScript que esse JSON é uma lista de termos
  return termsData as TermEntry[];
}

// Função de busca que olha Termo, Tradução e Definição
export function searchTerms(query: string) {
  const q = query.toLowerCase();
  const data = getAllTerms();
  
  const filtered = data.filter(entry => 
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
