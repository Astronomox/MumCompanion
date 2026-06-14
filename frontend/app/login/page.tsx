"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/svg/Logo"

function EyeIcon({ open, className = "" }: { open: boolean; className?: string }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12 s4 -7 10 -7 s10 7 10 7 s-4 7 -10 7 s-10 -7 -10 -7 Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3 L21 21 M10.5 6.5 a10 10 0 0 1 1.5 -0.5 c6 0 10 7 10 7 s-1.3 2.3 -3.5 4.2 M6.5 8.5 C3.7 10.2 2 12 2 12 s4 7 10 7 c1.8 0 3.4 -0.6 4.7 -1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25"/>
      <path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get("next") || "/chat"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (signInError) { setError(signInError.message); setLoading(false); return }
      router.push(nextPath)
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-cream-50">

      {/* LEFT: Real photo hero */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-end"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1200&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(28,57,32,0.65) 0%, rgba(28,57,32,0.35) 40%, rgba(28,57,32,0.88) 100%)" }}
        />
        <div className="relative z-10 p-10">
          <p className="font-display text-2xl text-cream-50 leading-snug font-bold">
            &ldquo;Welcome back, nne. Let us pick up where we left off.&rdquo;
          </p>
          <p className="mt-3 text-sm text-cream-100/70">MamaBot, your companion through every season.</p>
        </div>
      </div>

      {/* Mobile hero strip */}
      <div
        className="lg:hidden relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(28,57,32,0.65)" }}/>
        <div className="relative z-10"><Logo /></div>
      </div>

      {/* RIGHT: Form */}
      <div className="flex-1 lg:w-1/2 flex flex-col">
        <div className="hidden lg:block px-8 pt-8">
          <Link href="/"><Logo /></Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8 lg:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Welcome back</h1>
              <p className="mt-2 text-stone-600">Sign in to continue your journey with MamaBot.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                <input
                  id="email" type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-stone-700">Password</label>
                  <Link href="/forgot-password" className="text-xs font-medium text-terracotta-500 hover:text-terracotta-600">Forgot it?</Link>
                </div>
                <div className="relative">
                  <input
                    id="password" type={showPassword ? "text" : "password"} required autoComplete="current-password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 pr-12 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    <EyeIcon open={showPassword} className="w-5 h-5"/>
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading || !email || !password}
                className="w-full bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-3.5 text-sm shadow-warm transition-colors flex items-center justify-center gap-2">
                {loading ? (<><Spinner className="w-4 h-4"/>Signing in...</>) : (<>Sign in<ArrowRight className="w-4 h-4"/></>)}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-stone-600">
                New to Mum Companion?{" "}
                <Link href="/signup" className="font-semibold text-terracotta-500 hover:text-terracotta-600">Create a free account</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-8 pb-6 text-center">
          <p className="text-[11px] text-stone-400">By signing in, you agree to our terms and acknowledge that MamaBot provides guidance, not medical advice.</p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-cream-50" />}>
      <LoginContent />
    </Suspense>
  )
}
