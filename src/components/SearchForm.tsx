"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ defaultValue }: { defaultValue: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    
    // encodeURIComponent garante que espaços e acentos não quebrem a URL
    const query = q ? encodeURIComponent(q) : "";
    
    router.push(`/?q=${query}`);
    
    // Opcional: Se você quiser que o spinner pare mais rápido, 
    // mas o router.push é assíncrono, o ideal é deixar o Next processar.
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-colors ${isLoading ? 'text-zinc-600' : 'text-zinc-500 group-focus-within:text-cyan-400'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder="Pesquisar termo, tradução ou definição..."
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/50 pl-11 pr-24 py-4 text-zinc-100 outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-zinc-600"
      />
      
      <button 
        type="submit" 
        disabled={isLoading}
        className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl transition-all text-sm flex items-center justify-center min-w-[80px]"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Buscar"
        )}
      </button>
    </form>
  );
}
