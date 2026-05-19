export default function NeonBadge({
  children,
  href,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  if (href) {
    return (
      <a
        aria-label={ariaLabel}
        href={href}
        className="inline-flex items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-sm font-semibold text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-sm font-semibold text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition"
    >
      {children}
    </button>
  );
}

