const OG_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/og-image`;

export function getOgImageUrl(title: string, subtitle: string, tag?: string): string {
  const params = new URLSearchParams({ title, subtitle });
  if (tag) params.set('tag', tag);
  return `${OG_BASE}?${params.toString()}`;
}
