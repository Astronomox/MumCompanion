"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/svg/Logo"
import { useAppStore } from "@/lib/store"

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25" />
      <path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

function computeWeekFromDueDate(dueDate: string): { week: number; stage: string } {
  const due = new Date(dueDate)
  const now = new Date()
  const msInWeek = 1000 * 60 * 60 * 24 * 7
  const weeksUntilDue = Math.round((due.getTime() - now.getTime()) / msInWeek)
  const week = Math.max(1, Math.min(40, 40 - weeksUntilDue))

  let stage = "second_trimester"
  if (week <= 13) stage = "first_trimester"
  else if (week <= 27) stage = "second_trimester"
  else stage = "third_trimester"

  return { week, stage }
}

export default function OnboardingPage() {
  const router = useRouter()
  const setUser = useAppStore((s) => s.setUser)

  const [step, setStep] = useState(1)
  const [dueDate, setDueDate] = useState("")
  const [budget, setBudget] = useState(10000)
  const [language, setLanguage] = useState("en")
  const [loading, setLoading] = useState(false)

  const handleComplete = async () => {
    setLoading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { week, stage } = computeWeekFromDueDate(dueDate)

      // Save to local store (Supabase profile table will be wired in next step)
      setUser({
        id: user.id,
        name: user.user_metadata?.full_name || "Mama",
        stage,
        week,
        weeklyBudget: budget,
        preferredLanguage: language,
        dueDate,
      })

      router.push("/chat")
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-cream-50 flex flex-col">
      <header className="px-5 sm:px-8 pt-6 pb-4">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8">
        <div className="w-full max-w-lg">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-terracotta-500" : "bg-stone-200"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                When are you expecting?
              </h1>
              <p className="mt-3 text-stone-600">
                We use your due date to give you content tuned to your exact week.
                If you are not sure, your best guess is fine.
              </p>

              <div className="mt-8">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Estimated due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!dueDate}
                className="mt-8 w-full bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-stone-300 text-white font-semibold rounded-2xl py-3.5 text-sm shadow-warm flex items-center justify-center gap-2 transition-colors"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                What is your weekly food budget?
              </h1>
              <p className="mt-3 text-stone-600">
                Be honest. We will build meal plans that fit what you actually spend.
                You can change this any time.
              </p>

              <div className="mt-8 space-y-3">
                {[5000, 10000, 15000, 20000, 30000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBudget(amount)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all ${
                      budget === amount
                        ? "border-terracotta-400 bg-terracotta-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <span className="font-semibold text-stone-800">
                      ₦{amount.toLocaleString()}
                    </span>
                    {budget === amount && (
                      <div className="w-5 h-5 rounded-full bg-terracotta-500 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none">
                          <path d="M5 12 l4 4 l10 -10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl py-3.5 text-sm hover:border-stone-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-2xl py-3.5 text-sm shadow-warm flex items-center justify-center gap-2 transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Which language do you prefer?
              </h1>
              <p className="mt-3 text-stone-600">
                You can switch any time. Voice mode will use HelpMum&apos;s 9ja translators
                in the language you pick.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { code: "en", label: "English", sub: "Standard chat and content" },
                  { code: "yo", label: "Yorùbá", sub: "Voice mode in Yoruba" },
                  { code: "ig", label: "Igbo", sub: "Voice mode in Igbo" },
                  { code: "ha", label: "Hausa", sub: "Voice mode in Hausa" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all text-left ${
                      language === lang.code
                        ? "border-terracotta-400 bg-terracotta-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-stone-800">{lang.label}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{lang.sub}</p>
                    </div>
                    {language === lang.code && (
                      <div className="w-5 h-5 rounded-full bg-terracotta-500 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none">
                          <path d="M5 12 l4 4 l10 -10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl py-3.5 text-sm hover:border-stone-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-stone-300 text-white font-semibold rounded-2xl py-3.5 text-sm shadow-warm flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? (
                    <>
                      <Spinner className="w-4 h-4" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      Meet MamaBot
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
