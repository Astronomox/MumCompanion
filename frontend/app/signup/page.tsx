"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PregnancyGrowthIllustration } from "@/components/svg/PregnancyGrowthIllustration"
import { Logo } from "@/components/svg/Logo"

function EyeIcon({ open, className = "" }: { open: boolean; className?: string }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12 s4 -7 10 -7 s10 7 10 7 s-4 7 -10 7 s-10 -7 -10 -7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3 L21 21 M10.5 6.5 a10 10 0 0 1 1.5 -0.5 c6 0 10 7 10 7 s-1.3 2.3 -3.5 4.2 M6.5 8.5 C3.7 10.2 2 12 2 12 s4 7 10 7 c1.8 0 3.4 -0.6 4.7 -1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12 H19 M13 6 l6 6 l-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25" />
      <path
        d="M21 12 a9 9 0 0 0 -9 -9"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12 l4 4 l10 -10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const passwordOk = password.length >= 8

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!passwordOk) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-dvh bg-cream-50 flex items-center justify-center px-5">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-forest-50 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-forest-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900">
            Check your email
          </h1>
          <p className="mt-3 text-stone-600">
            We sent a confirmation link to <span className="font-medium text-stone-800">{email}</span>.
            Click it to activate your account and start your journey.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-semibold"
          >
            Back to sign in
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-cream-50">

      {/* Mobile hero strip */}
      <div className="lg:hidden relative h-40 bg-cream-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <PregnancyGrowthIllustration className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <Logo />
        </div>
      </div>

      {/* LEFT - Form */}
      <div className="flex-1 lg:w-1/2 flex flex-col order-2 lg:order-1">
        <div className="hidden lg:block px-8 pt-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8 lg:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Start your journey
              </h1>
              <p className="mt-2 text-stone-600">
                Free forever. No card needed. Just answers when you need them.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 pr-12 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 transition-all"
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
                {password.length > 0 && (
                  <p className={`mt-1.5 text-xs ${passwordOk ? "text-forest-600" : "text-stone-400"}`}>
                    {passwordOk ? "Strong enough." : `${password.length}/8 characters minimum.`}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !name || !email || !passwordOk}
                className="w-full bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-3.5 text-sm shadow-warm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create my account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-stone-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-terracotta-500 hover:text-terracotta-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-8 pb-6 text-center">
          <p className="text-[11px] text-stone-400">
            By creating an account, you agree to our terms. MamaBot provides guidance,
            not medical advice.
          </p>
        </div>
      </div>

      {/* RIGHT - Hero illustration (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-cream-100 overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <PregnancyGrowthIllustration className="w-full max-w-lg h-auto" />
        </div>

        {/* Feature list overlay */}
        <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-cream-100 via-cream-100/95 to-transparent">
          <div className="max-w-md space-y-3">
            <p className="font-display text-xl text-stone-900 font-bold mb-4">
              What you get on day one
            </p>
            {[
              "Symptom companion with triage in three tiers",
              "Seven-day meal plans within your budget",
              "Week-by-week guidance through every trimester",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <div className="shrink-0 w-5 h-5 rounded-full bg-terracotta-500 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
