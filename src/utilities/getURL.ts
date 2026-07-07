import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL
  // Vercel deployment URLs (works for both preview and production)
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL
    || process.env.NEXT_PUBLIC_VERCEL_URL
  if (vercelUrl) return `https://${vercelUrl}`
  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port
    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }
  // Vercel deployment URLs
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL
    || process.env.NEXT_PUBLIC_VERCEL_URL
  if (vercelUrl) return `https://${vercelUrl}`
  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
