export function parseBadge(name: string): {
  badge: string | null;
  displayName: string;
} {
  const match = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const candidate = match?.[2] ?? null;
  const badge = candidate && !/\d/.test(candidate) ? candidate : null;
  return { badge, displayName: badge ? match![1] : name };
}
