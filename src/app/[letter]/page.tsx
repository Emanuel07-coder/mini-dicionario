import Link from "next/link";
import GlossaryLayout from "@/components/GlossaryLayout";
import { getTermsForLetter, LETTERS } from "@/lib/terms";
import type { Metadata } from "next";
import { toSlug } from "@/lib/slug";

export function generateMetadata({
  params,
}: {
  params: { letter: string };
}): Metadata {
  const letter = (params.letter ?? "").toUpperCase().slice(0, 1);
  return {
    title: `TechGlossary - ${letter}`,
    description: `Lista de termos técnicos em inglês começando com ${letter}.`,
  };
}

export function generateStaticParams() {
  return LETTERS.map((l) => ({ letter: l.toLowerCase() }));
}

export default function LetterPage({
  params,
}: {
  params: { letter: string };
}) {
  const letter = (params.letter ?? "").toUpperCase().slice(0, 1);
  const terms = getTermsForLetter(letter);

  return (
    <GlossaryLayout>
      <section className="mb-6">
        <h1 className="font-mono text-2xl tracking-tight text-cyan-200">
          Letra {letter}
        </h1>
        <p className="mt-2 text-zinc-300">
          {terms.length
            ? `Termos técnicos iniciados com ${letter}.`
            : `Ainda não há termos cadastrados para ${letter}.`}
        </p>
      </section>

      <section>
        <ul className="grid gap-3 sm:grid-cols-2">
          {terms.map((entry) => (
            <li key={entry.term}>
              <Link
                href={`/${letter.toLowerCase()}/${toSlug(entry.term)}`}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyan-400/50 hover:bg-cyan-400/10"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="truncate font-mono text-base text-cyan-200">
                    {entry.term}
                  </div>
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                  {entry.translation}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {!terms.length && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-zinc-400">
            Preencha o arquivo <span className="font-mono text-zinc-200">data/terms.json</span> com 30 termos para cada letra.
          </div>
        )}
      </section>
    </GlossaryLayout>
  );
}

