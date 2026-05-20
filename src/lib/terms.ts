import termsData from './terms.json'; 

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type TermEntry = {
  term: string;
  translation: string;
  definition: string;
  example: string;
};

// 1. Retorna todos os termos (Usado na Home)
export function getAllTerms(): TermEntry[] {
  return termsData as TermEntry[];
}

// 2. Busca global por termo, tradução ou definição (Usado na Home)
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

// 3. Busca todos os termos de uma letra específica (Usado em /app/[letter]/page.tsx)
export function getTermsForLetter(letter: string): TermEntry[] {
  const targetLetter = letter.toUpperCase();
  return getAllTerms().filter(entry => 
    entry.term.toUpperCase().startsWith(targetLetter)
  );
}

// 4. Busca um termo específico pelo "slug" (Usado em /app/[letter]/[termSlug]/page.tsx)
export function findTerm(slug: string): TermEntry | undefined {
  return getAllTerms().find(entry => {
    // Transforma o termo em slug para comparar (ex: "API Rest" -> "api-rest")
    const termSlug = entry.term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    return termSlug === slug;
  });
}
