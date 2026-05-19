import Link from "next/link";
import GlossaryLayout from "@/components/GlossaryLayout";
import { LETTERS, getAllTerms, searchTerms } from "@/lib/terms";
import type { TermEntry } from "@/lib/terms";

function TermsCountHint({ total }: { total: number }) {
  return (
    <p className="mt-1 text-sm text-zinc-400">
      {total ? (
        <>Base carregada: <span className="text-zinc-200">{total}</span> termos.</>
      ) : (
        <>Base pronta para receber termos (dataset vazio por enquanto).</>
      )}
    </p>
  );
}

type HomeSearchParams = {

  q?: string | string[];
};

export default function Home(props: { searchParams?: HomeSearchParams }) {
  return <HomeContent {...props} />;
}

function HomeContent({
  searchParams,
}: {
  searchParams?: HomeSearchParams;
}) {




  const total = getAllTerms().length;
  const letters = LETTERS;

  // Busca simples via query string (SSR/SSG-friendly)

  // Para manter rápido, o formulário manda para /?q=...
  // e a página filtra no server (dataset em JSON).
  // (Quando você preencher 780 termos, isso continua rápido.)
  // lê query string: /?q=...
  // Next já injeta isso no server component via searchParams
  const qRaw = searchParams?.q;
  const q = Array.isArray(qRaw) ? qRaw[0] ?? "" : qRaw ?? "";



  const results: Array<{ letter: string; entry: TermEntry }> = q
    ? searchTerms(q)
    : [];



  return (
    <GlossaryLayout>
      <section className="mb-8">
        <h1 className="font-mono text-3xl tracking-tight text-cyan-200">
          Mini-dicionário de inglês para tecnologia
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-300">
          Navegue por letra (A-Z) e encontre definições curtas, traduções e exemplos reais.
        </p>
        <TermsCountHint total={total} />
      </section>

      <section className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label className="text-sm text-zinc-400">Busca global</label>
            <form className="mt-2" action="/" method="get">
              <input
                name="q"
                placeholder="Ex.: API, backend, latency..."
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-400/60"
              />
            </form>
          </div>
          <div className="text-xs text-zinc-500">
            Dica: use também tradução (PT) ou definição.
          </div>
        </div>

        {results.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-zinc-200">Resultados</h2>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {results.slice(0, 12).map(({ letter, entry }) => (
                <li key={entry.term}>
                  <Link
                    href={`/${letter.toLowerCase()}/${entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="block rounded-xl border border-white/10 bg-zinc-950/40 px-3 py-2 hover:border-cyan-400/50 hover:bg-zinc-950/60 transition"
                  >
                    <div className="text-sm font-semibold text-cyan-200">{entry.term}</div>
                    <div className="text-xs text-zinc-400">{entry.translation}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 font-mono text-sm text-zinc-400">Navegação alfabética</h2>
        <div className="grid grid-cols-7 gap-2 sm:grid-cols-13">
          {letters.map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-zinc-200 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition"
            >
              {l}
            </Link>
          ))}
        </div>
      </section>
    </GlossaryLayout>
  );
}

