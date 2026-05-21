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
  
  const filtered = data.filter(entry => {
    // Usamos o operador ?. para evitar crash se a propriedade for undefined
    // E usamos || "" para garantir que tenhamos uma string para chamar o .includes()
    const term = (entry.term || "").toLowerCase();
    const translation = (entry.translation || "").toLowerCase();
    const definition = (entry.definition || "").toLowerCase();

    return term.includes(q) || translation.includes(q) || definition.includes(q);
  });

  return filtered.map(entry => ({
    // Segurança extra ao pegar a primeira letra
    letter: entry.term ? entry.term[0].toUpperCase() : " ",
    entry: entry
  }));
}

// Busca termos por letra (Página de Letra)
export function getTermsForLetter(letter: string): TermEntry[] {
  const targetLetter = letter.toUpperCase();
  return getAllTerms().filter(entry => 
    // Segurança: verifica se entry.term existe antes de usar startWith
    entry.term?.toUpperCase().startsWith(targetLetter)
  );
}

// BUSCA CORRIGIDA
export function findTerm(_letter: string, slug: string): { letter: string, entry: TermEntry } | undefined {
  const term = getAllTerms().find(entry => {
    // Segurança: Se entry.term não existir, pula este item
    if (!entry.term) return false;

    const termSlug = entry.term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    return termSlug === slug;
  });

  if (!term) return undefined;

  return {
    letter: _letter.toUpperCase(),
    entry: term
  };
}
