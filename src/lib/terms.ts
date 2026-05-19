import termsData from "@/../data/terms.json";

export type TermEntry = {

  term: string;
  translation: string;
  definition: string;
  example: string;
};

export type TermsByLetter = Record<string, TermEntry[]>;

type TermsJson = {
  version: string;
  entries: TermsByLetter;
  note?: string;
};

const data = termsData as unknown as TermsJson;

export const LETTERS = Object.keys(data.entries).sort();

export function getTermsForLetter(letter: string): TermEntry[] {
  return data.entries[letter.toUpperCase()] ?? [];
}

export function findTerm(letter: string, termSlug: string): { entry: TermEntry; index: number } | null {
  const entries = getTermsForLetter(letter);
  const slug = termSlug.toLowerCase();
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];

    // keep slug logic consistent with slug.ts
    // (we inline minimal slugging here to avoid circular imports)
    const candidate = e.term
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (candidate === slug) return { entry: e, index: i };
  }
  return null;
}

export function getAllTerms(): Array<{ letter: string; entry: TermEntry }> {
  const out: Array<{ letter: string; entry: TermEntry }> = [];
  for (const letter of Object.keys(data.entries)) {
    for (const entry of data.entries[letter] ?? []) {
      out.push({ letter, entry });
    }
  }
  return out;
}

export function searchTerms(query: string): Array<{ letter: string; entry: TermEntry }> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const all = getAllTerms();
  // Busca simples (termo + tradução + definição)
  return all.filter(({ entry }) => {
    return (
      entry.term.toLowerCase().includes(q) ||
      entry.translation.toLowerCase().includes(q) ||
      entry.definition.toLowerCase().includes(q)
    );
  });
}

