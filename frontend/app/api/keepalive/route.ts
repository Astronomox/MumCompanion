import { NextResponse } from "next/server"

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL
  if (!backendUrl) return NextResponse.json({ ok: false, reason: "no backend url" })
  try {
    const res = await fetch(`${backendUrl}/health`, { signal: AbortSignal.timeout(8000) })
    return NextResponse.json({ ok: res.ok, status: res.status, ts: new Date().toISOString() })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 })
  }
}
