import termsData from './terms.json'; 

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type TermEntry = {
  term: string;
  translation: string;
  definition: string;
  example: string;
};

// Retorna todos os termos
export function getAllTerms(): TermEntry[] {
  return termsData as TermEntry[];
}

// Busca global (Home)
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

// Busca termos por letra (Página de Letra)
export function getTermsForLetter(letter: string): TermEntry[] {
  const targetLetter = letter.toUpperCase();
  return getAllTerms().filter(entry => 
    entry.term.toUpperCase().startsWith(targetLetter)
  );
}

// BUSCA CORRIGIDA: Agora aceita (letter, slug) e retorna o objeto com .entry
export function findTerm(_letter: string, slug: string): { letter: string, entry: TermEntry } | undefined {
  const term = getAllTerms().find(entry => {
    const termSlug = entry.term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    return termSlug === slug;
  });

  if (!term) return undefined;

  // Retornamos no formato que a sua página [termSlug]/page.tsx espera:
  // { letter: "A", entry: { term: "API", ... } }
  return {
    letter: _letter.toUpperCase(),
    entry: term
  };
}
