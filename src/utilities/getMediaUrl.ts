/**
 * Processes media resource URL to ensure proper formatting.
 * Strips any hardcoded domain so URLs are always relative — critical
 * for deployments where the domain changes (Vercel preview, production, localhost).
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Strip hardcoded origin (e.g. http://localhost:3000/media/... → /media/...)
  let clean = url
  try {
    const parsed = new URL(url)
    clean = parsed.pathname + parsed.search
  } catch {
    // Already relative, keep as-is
  }

  // Payload local upload URLs read through an API route. The same files are
  // committed under `public/media`, so use Vercel's static asset path instead.
  clean = clean.replace(/^\/api\/media\/file\//, '/media/')
  clean = clean.replace(/^\/media\/file\//, '/media/')

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${clean}?${cacheTag}` : clean
}
