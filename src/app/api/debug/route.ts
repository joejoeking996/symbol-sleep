import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const info: Record<string, unknown> = {}

  // Check DB
  const dbPaths = ['/tmp/company-site.db', './company-site.db']
  info.db = {}
  for (const p of dbPaths) {
    const full = path.resolve(p)
    try {
      const stat = fs.statSync(full)
      info.db[p] = { exists: true, size: stat.size }
    } catch {
      info.db[p] = { exists: false }
    }
  }

  // Check public/media
  const mediaDir = path.resolve(process.cwd(), 'public/media')
  try {
    const files = fs.readdirSync(mediaDir)
    info.media = { path: mediaDir, count: files.length, sample: files.slice(0, 10) }
  } catch (e: any) {
    info.media = { error: e.message }
  }

  // Check env
  info.env = {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    cwd: process.cwd(),
  }

  return NextResponse.json(info)
}
