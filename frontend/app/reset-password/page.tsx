"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/Logo"

function EyeIcon({ open, className = "" }: { open: boolean; className?: string }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 3l18 18M10.5 6.5A10 10 0 0 1 12 6c6 0 10 7 10 7s-1.3 2.3-3.5 4.2M6.5 8.5C3.7 10.2 2 12 2 12s4 7 10 7c1.8 0 3.4-.6 4.7-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-forest-500">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-forest-500">
      <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  )
}

function StrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length
  const colors = ["bg-stone-200", "bg-red-400", "bg-amber-400", "bg-lime-500", "bg-forest-500"]
  const labels = ["", "Too short", "Weak", "Good", "Strong"]

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < score ? colors[score] : "bg-stone-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score >= 3 ? "text-forest-600" : score === 2 ? "text-amber-600" : "text-red-500"}`}>
        {labels[score]}
      </p>
    </div>
  )
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    // Supabase sets the session from the URL hash after email link click
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true)
      }
    })
  }, [])

  const passwordOk = password.length >= 8
  const matches = password === confirm && confirm.length > 0
  const canSubmit = passwordOk && matches && !loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!passwordOk) { setError("Password must be at least 8 characters."); return }
    if (!matches) { setError("Passwords do not match."); return }
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) { setError(updateError.message); setLoading(false); return }
      setDone(true)
      setLoading(false)
      setTimeout(() => router.push("/chat"), 2500)
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-dvh bg-cream-50 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-forest-50 border border-forest-100 flex items-center justify-center mb-6">
            <CheckCircle />
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900">Password updated!</h1>
          <p className="mt-3 text-stone-600">
            You are all set, nne. Taking you to Lami now...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8">
              <Spinner className="w-8 h-8 text-forest-500" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream-50 flex flex-col">
      <div className="h-2 bg-forest-600 w-full" />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <Logo size={28} />
          </div>

          <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center mb-6">
            <LockIcon />
          </div>

          <h1 className="font-display text-3xl font-bold text-stone-900">Set a new password</h1>
          <p className="mt-2 text-stone-600">
            Make it something only you would know. At least 8 characters.
          </p>

          {!sessionReady && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Waiting for your reset link to be verified. If this takes too long,{" "}
              <Link href="/forgot-password" className="font-semibold underline underline-offset-2">request a new one</Link>.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* New password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 pr-12 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} className="w-5 h-5" />
                </button>
              </div>
              <StrengthBar password={password} />
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-stone-700 mb-1.5">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Type it again"
                  className={`w-full bg-white border rounded-2xl px-4 py-3.5 pr-12 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-all ${
                    confirm.length > 0
                      ? matches
                        ? "border-forest-400 focus:ring-2 focus:ring-forest-100"
                        : "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-stone-200 focus:border-forest-400 focus:ring-2 focus:ring-forest-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showConfirm} className="w-5 h-5" />
                </button>
              </div>
              {confirm.length > 0 && (
                <p className={`mt-1.5 text-xs font-medium ${matches ? "text-forest-600" : "text-red-500"}`}>
                  {matches ? "Passwords match." : "Passwords do not match yet."}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-forest-600 hover:bg-forest-700 active:bg-forest-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-3.5 text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Spinner className="w-4 h-4" /> Updating password...</>
              ) : (
                "Update password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
