"use client";

import { useState, useEffect, Suspense } from "react"; // Adicionado Suspense
import { useRouter, useSearchParams } from "next/navigation";
import GlossaryLayout from "@/components/GlossaryLayout";
import { LETTERS, getAllTerms, searchTerms } from "@/lib/terms";
import type { TermEntry } from "@/lib/terms";

type SearchResult = {
  letter: string;
  entry: TermEntry;
};

// 1. Movemos toda a lógica para este componente interno
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(""); 
  const [selectedTerm, setSelectedTerm] = useState<TermEntry | null>(null);

  const queryFromUrl = searchParams.get("q") || "";
  const typeFromUrl = searchParams.get("type");

  const total = getAllTerms().length;
  const letters = LETTERS;
  const allTerms = getAllTerms();

  useEffect(() => {
    setInputValue(queryFromUrl);
  }, [queryFromUrl]);

  const getResults = () => {
    const currentQuery = queryFromUrl;
    if (!currentQuery) return [];

    if (typeFromUrl === "letter") {
      return allTerms
        .filter(term => term.term.toUpperCase().startsWith(currentQuery.toUpperCase()))
        .map(term => ({ letter: currentQuery, entry: term }));
    }
    return searchTerms(currentQuery);
  };

  const results = getResults();

  const updateUrl = (q: string, type: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (type) params.set("type", type);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearch = () => {
    updateUrl(inputValue, "global");
    setSelectedTerm(null);
  };

  const handleLetterClick = (l: string) => {
    setInputValue(l);
    updateUrl(l, "letter");
    setSelectedTerm(null);
  };

  return (
    <GlossaryLayout>
      <section className="mb-12 text-center sm:text-left">
        <h1 className="font-mono text-4xl tracking-tight text-cyan-200">
          Mini-dicionário <span className="text-zinc-500">Tech</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400 text-lg">
          Explore a terminologia do mundo da tecnologia de A a Z.
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          Base carregada: <span className="text-zinc-200">{total}</span> termos.
        </p>
      </section>

      <section className="mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div_
            
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Pesquisar termo, tradução ou definição..."
              className="w-full rounded-2xl border border-white/10 bg-zinc-900/50 pl-11 pr-24 py-4 text-zinc-100 outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-zinc-600"
            />
            
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl transition-colors text-sm"
            >
              Buscar
            </button>
          </div_

          {results.length > 0 && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-sm font-semibold text-zinc-400 mb-3 ml-1">
                {typeFromUrl === "letter" 
                  ? `Termos começando com ${queryFromUrl}:` 
                  : "Resultados encontrados:"}
              </h2>
              <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {results.slice(0, 50).map(({ entry }) => (
                  <li key={entry.term}>
                    <button
                      onClick={() => setSelectedTerm(entry)}
                      className="w-full text-left rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="text-sm font-bold text-cyan-200 group-hover:text-cyan-100">{entry.term}</div_
                      <div className="text-xs text-zinc-500">{entry.translation}</div_
                    </button>
                  </li>
                ))}
              </ul_
            </div_
          )}
          
          {queryFromUrl && results.length === 0 && (
            <div className="mt-6 text-center p-4 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-500 text-sm">
              Nenhum termo encontrado para "{queryFromUrl}".
            </div_
          )}
        </div_
      </section>

      {selectedTerm && (
        <section className="mb-12 max-w-2xl mx-auto animate-in zoom-in-95 fade-in duration-300">
          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 relative">
            <button 
              onClick={() => setSelectedTerm(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-cyan-200 mb-2">{selectedTerm.term}</h2>
            <p className="text-zinc-300 italic mb-4">{selectedTerm.translation}</p>
            <div className="text-zinc-400 leading-relaxed">
              {selectedTerm.definition}
            </div_
          </div_
        </section>
      )}

      <section>
        <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500 text-center">
          Navegação Alfabética
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-13 gap-2 max-w-4xl mx-auto">
          {letters.map((l) => (
            <button
              key={l}
              onClick={() => handleLetterClick(l)}
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] py-3 text-sm font-medium text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all"
            >
              {l}
            </button>
          ))}
        </div_
      </section>
    </GlossaryLayout>
  );
}

// 2. A função principal agora é apenas um wrapper com Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 font-mono">
        Carregando dicionário...
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
