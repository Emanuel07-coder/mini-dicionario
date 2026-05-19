import GlossaryLayout from "@/components/GlossaryLayout";
import { findTerm, getTermsForLetter } from "@/lib/terms";
import { toSlug } from "@/lib/slug";
import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata({
  params,
}: {
  params: { letter: string; termSlug: string };
}): Metadata {
  const { letter, termSlug } = params;
  const found = findTerm(letter, termSlug);
  const title = found?.entry?.term
    ? `TechGlossary - ${found.entry.term}`
    : `TechGlossary - termo`;

  const description = found?.entry?.definition
    ? found.entry.definition
    : "Definição técnica do termo.";

  return {
    title,
    description,
  };
}

export function generateStaticParams() {
  // Next.js gera estático por fallback a partir do dataset.
  // Mantemos simples: durante dev/build, isso cria rotas para termos existentes.
  // Como o dataset começa vazio, não vai falhar.
  // Quando preencher 780 termos, isso vai indexar tudo.
  const out: Array<{ letter: string; termSlug: string }> = [];
  for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")) {
    const terms = getTermsForLetter(letter);
    for (const t of terms) {
      out.push({ letter: letter.toLowerCase(), termSlug: toSlug(t.term) });
    }
  }
  return out;
}

export default function TermPage({
  params,
}: {
  params: { letter: string; termSlug: string };
}) {
  const letter = (params.letter ?? "").toUpperCase().slice(0, 1);
  const termSlug = params.termSlug ?? "";

  const found = findTerm(letter, termSlug);

  if (!found) {
    return (
      <GlossaryLayout>
        <section>
          <h1 className="font-mono text-2xl tracking-tight text-cyan-200">
            Termo não encontrado
          </h1>
          <p className="mt-2 text-zinc-300">
            Não existe um verbete para <span className="font-mono text-zinc-100">{letter}/{termSlug}</span>.
          </p>
          <div className="mt-4">
            <Link
              href={`/${letter.toLowerCase()}`}
              className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition"
            >
              Voltar para a letra {letter}
            </Link>
          </div>
        </section>
      </GlossaryLayout>
    );
  }

  const { entry } = found;

  return (
    <GlossaryLayout>
      <article>
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-500">Inglês • {letter}</div>
              <h1 className="mt-1 font-mono text-3xl tracking-tight text-cyan-200">
                {entry.term}
              </h1>
              <div className="mt-2 text-sm text-zinc-400">
                Tradução: <span className="text-zinc-200">{entry.translation}</span>
              </div>
            </div>
            <div className="shrink-0">
              <Link
                href={`/${letter.toLowerCase()}`}
                className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition"
              >
                Lista da letra
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-mono text-sm text-zinc-400">Definição técnica</h2>
          <p className="mt-2 text-zinc-100">{entry.definition}</p>

          <div className="mt-5">
            <h2 className="font-mono text-sm text-zinc-400">Exemplo de uso</h2>
            <p className="mt-2 text-zinc-100 italic">“{entry.example}”</p>
          </div>
        </section>
      </article>
    </GlossaryLayout>
  );
}

