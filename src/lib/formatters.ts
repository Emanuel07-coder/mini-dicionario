export function normalizeLetter(input: string): string {
  const c = input.trim().toUpperCase();
  if (!c) return "";
  return c[0];
}

export function safeText(input: string): string {
  return (input ?? "").toString();
}

