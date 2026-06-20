"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/Logo"

function ArrowLeft({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-forest-500">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2.2"/>
      <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/reset-password` }
      )
      if (resetError) { setError(resetError.message); setLoading(false); return }
      setSent(true)
      setLoading(false)
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-dvh bg-cream-50 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-forest-50 border border-forest-100 flex items-center justify-center mb-6">
            <MailIcon />
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900">Check your email</h1>
          <p className="mt-3 text-stone-600 leading-relaxed">
            We sent a password reset link to{" "}
            <span className="font-semibold text-stone-800">{email}</span>.
            Click it to choose a new password.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            Did not get it? Check your spam folder, or{" "}
            <button
              onClick={() => { setSent(false) }}
              className="text-forest-600 font-semibold hover:text-forest-700 underline underline-offset-2"
            >
              try again
            </button>.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream-50 flex flex-col">
      {/* Green top bar */}
      <div className="h-2 bg-forest-600 w-full" />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <Logo size={28} />
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to sign in
          </Link>

          <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center mb-6">
            <MailIcon />
          </div>

          <h1 className="font-display text-3xl font-bold text-stone-900">Forgot your password?</h1>
          <p className="mt-2 text-stone-600 leading-relaxed">
            No stress, nne. Enter your email and we will send you a link to reset it.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-forest-600 hover:bg-forest-700 active:bg-forest-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-3.5 text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Spinner className="w-4 h-4" /> Sending link...</>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Remembered it?{" "}
            <Link href="/login" className="font-semibold text-forest-600 hover:text-forest-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
