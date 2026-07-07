export default function DebugPage() {
  return (
    <div style={{ padding: 40, fontFamily: 'monospace', background: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1>Debug Info</h1>
      <h2>Environment</h2>
      <pre>{JSON.stringify({
        VERCEL: process.env.VERCEL,
        VERCEL_URL: process.env.VERCEL_URL,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
        DATABASE_URL: process.env.DATABASE_URL,
      }, null, 2)}</pre>
    </div>
  )
}
