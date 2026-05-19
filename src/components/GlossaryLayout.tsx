import Link from "next/link";

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-mono text-lg tracking-tight text-cyan-200">
            TechGlossary
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-zinc-300 hover:text-white transition">
              Início
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
      <footer className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6 text-xs text-zinc-500">
        {new Date().getFullYear()} • Mini dicionário de inglês para tecnologia
      </footer>
    </div>
  );
}

