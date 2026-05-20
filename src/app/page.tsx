import Link from "next/link";
import GlossaryLayout from "@/components/GlossaryLayout";
import { LETTERS, getAllTerms, searchTerms } from "@/lib/terms";
import SearchForm from "@/components/SearchForm"; // Importe o novo componente

function TermsCountHint({ total }: { total: number }) {
  return (
    <p className="mt-1 text-sm text-zinc-400">
      {total ? (
        <>Base carregada: <span className="text-zinc-200">{total}</span> termos.</>
      ) : (
        <>Base pronta para receber termos.</>
      )}
    </p>
  );
}

type HomeSearchParams = {
  q?: string | string[];
};

export default async function Home(props: { searchParams: Promise<HomeSearchParams> }) {
  const searchParams = await props.searchParams;
  return <HomeContent searchParams={searchParams} />;
}

function HomeContent({ searchParams }: { searchParams: HomeSearchParams }) {
  const total = getAllTerms().length;
  const letters = LETTERS;
  const qRaw = searchParams?.q;
  const q = Array.isArray(qRaw) ? qRaw[0] ?? "" : qRaw ?? "";
  const results = q ? searchTerms(q) : [];

  return (
    <GlossaryLayout>
      <section className="mb-12 text-center sm:text-left">
        <h1 className="font-mono text-4xl tracking-tight text-cyan-200">
          Mini-dicionário <span className="text-zinc-500">Tech</span>
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400 text-lg">
          Explore a terminologia do mundo da tecnologia de A a Z.
        </p>
        <TermsCountHint total={total} />
      </section>

      <section className="mb-12">
        <div className="max-w-2xl mx-auto">
          {/* Substituído o <form> pelo componente <SearchForm /> */}
          <SearchForm defaultValue={q} />

          {results.length > 0 && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-sm font-semibold text-zinc-400 mb-3 ml-1">Resultados encontrados:</h2>
              <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {results.slice(0, 10).map(({ letter, entry }) => (
                  <li key={entry.term}>
                    <Link
                      href={`/${letter.toLowerCase()}/${entry.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="block rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="text-sm font-bold text-cyan-200 group-hover:text-cyan-100">{entry.term}</div>
                      <div className="text-xs text-zinc-500">{entry.translation}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500 text-center">
          Navegação Alfabética
        </h2>
        {/* AJUSTE DE RESPONSIVIDADE: grid-cols-3 no mobile, 6 no tablet, 13 no desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-13 gap-2 max-w-4xl mx-auto">
          {letters.map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] py-3 text-sm font-medium text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all"
            >
              {l}
            </Link>
          ))}
        </div>
      </section>
    </GlossaryLayout>
  );
}
