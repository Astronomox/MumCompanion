"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/Logo"

const HERO = "https://images.unsplash.com/photo-1560707854-fb9a10eeaace?w=1200&q=85"

function Eye({ open, className = "" }: { open: boolean; className?: string }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M2 12 s4 -7 10 -7 s10 7 10 7 s-4 7 -10 7 s-10 -7 -10 -7 Z" stroke="currentColor" strokeWidth="2.2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.2"/></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M3 3 L21 21 M10.5 6.5 a10 10 0 0 1 1.5 -0.5 c6 0 10 7 10 7 s-1.3 2.3 -3.5 4.2 M6.5 8.5 C3.7 10.2 2 12 2 12 s4 7 10 7 c1.8 0 3.4 -0.6 4.7 -1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
  )
}
function Arrow({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Spin({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25"/><path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg>
}

function LoginContent() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get("next") || "/chat"
  const prefillEmail = params.get("email") || ""
  const justConfirmed = params.get("confirmed") === "1"
  const [email, setEmail] = useState(prefillEmail)
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(""); setLoading(true)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (err) { setError(err.message); setLoading(false); return }
      router.push(next); router.refresh()
    } catch { setError("Something went wrong. Please try again."); setLoading(false) }
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-cream-50">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-end"
        style={{ backgroundImage: `url('${HERO}')`, backgroundSize: "cover", backgroundPosition: "center 25%" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(21,52,30,0.7) 0%, rgba(21,52,30,0.35) 45%, rgba(21,52,30,0.9) 100%)" }} />
        <div className="relative z-10 p-10">
          <p className="font-display text-2xl text-white leading-snug font-bold">&ldquo;Welcome back. I missed you. Let us continue.&rdquo;</p>
          <p className="mt-3 text-sm text-white/70">Lami, your companion through every season.</p>
        </div>
      </div>
      <div className="lg:hidden relative h-40 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${HERO}')`, backgroundSize: "cover", backgroundPosition: "center 20%" }}>
        <div className="absolute inset-0" style={{ background: "rgba(21,52,30,0.7)" }} />
        <div className="relative z-10"><Logo light /></div>
      </div>
      <div className="flex-1 lg:w-1/2 flex flex-col">
        <div className="hidden lg:block px-8 pt-8"><Link href="/"><Logo /></Link></div>
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8 lg:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Welcome back</h1>
              <p className="mt-2 text-stone-600">Sign in to continue with Lami.</p>
            </div>
            <form onSubmit={submit} className="space-y-5">
              {justConfirmed && !error && (
                <div className="rounded-2xl border border-forest-200 bg-forest-50 px-4 py-3 text-sm text-forest-700">
                  Email confirmed. Enter your password to continue.
                </div>
              )}
              {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-stone-700">Password</label>
                  <Link href="/forgot-password" className="text-xs font-medium text-forest-600 hover:text-forest-700">Forgot it?</Link>
                </div>
                <div className="relative">
                  <input id="password" type={show ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters" autoFocus={justConfirmed && !!prefillEmail}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 pr-12 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-stone-400" aria-label="Toggle password"><Eye open={show} className="w-5 h-5" /></button>
                </div>
              </div>
              <button type="submit" disabled={loading || !email || !password}
                className="w-full bg-forest-600 hover:bg-forest-700 disabled:bg-stone-300 text-white font-semibold rounded-2xl py-3.5 text-sm shadow-warm transition-colors flex items-center justify-center gap-2">
                {loading ? <><Spin className="w-4 h-4" />Signing in...</> : <>Sign in<Arrow className="w-4 h-4" /></>}
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-stone-600">New here? <Link href="/signup" className="font-semibold text-forest-600 hover:text-forest-700">Create a free account</Link></p>
            </div>
          </div>
        </div>
        <div className="px-5 sm:px-8 pb-6 text-center"><p className="text-[11px] text-stone-400">By signing in you agree to our terms. Lami gives guidance, not medical advice.</p></div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-dvh bg-cream-50" />}><LoginContent /></Suspense>
}
