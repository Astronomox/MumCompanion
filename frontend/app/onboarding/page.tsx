"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Logo } from "@/components/Logo"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils/cn"

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const LANGS = [
  { value: "english", label: "English" },
  { value: "yoruba", label: "Yoruba" },
  { value: "igbo", label: "Igbo" },
  { value: "hausa", label: "Hausa" },
]

function stageFromWeek(week: number): string {
  if (week <= 13) return "first_trimester"
  if (week <= 27) return "second_trimester"
  return "third_trimester"
}
function stageLabel(week: number): string {
  if (week <= 13) return "First trimester"
  if (week <= 27) return "Second trimester"
  return "Third trimester"
}

export default function OnboardingPage() {
  const router = useRouter()
  const { setUser } = useAppStore()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [week, setWeek] = useState<number | "">("")
  const [budget, setBudget] = useState<number | "">("")
  const [language, setLanguage] = useState("english")
  const [userId, setUserId] = useState("")

  // Get Supabase user ID
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id)
    })
  }, [])

  const weekNum = typeof week === "number" ? week : 0
  const budgetNum = typeof budget === "number" ? budget : 0

  const finish = async () => {
    setSaving(true)
    const profileData = {
      id: userId || `local-${Date.now()}`,
      name: name.trim(),
      stage: stageFromWeek(weekNum),
      week: weekNum,
      weeklyBudget: budgetNum,
      preferredLanguage: language,
      emergencyName: "",
      emergencyPhone: "",
      hospitalName: "",
      hospitalPhone: "",
    }

    // Save to local store
    setUser(profileData)

    // Save to Supabase profiles table
    if (userId) {
      try {
        const supabase = createClient()
        await supabase.from("profiles").upsert({
          id: userId,
          name: profileData.name,
          stage: profileData.stage,
          week: profileData.week,
          weekly_budget: profileData.weeklyBudget,
          preferred_language: profileData.preferredLanguage,
          updated_at: new Date().toISOString(),
        })
      } catch (err) {
        console.error("Profile save failed", err)
      }
    }

    // Set the onboarded cookie so middleware lets her through

    setSaving(false)
    router.push("/chat")
  }

  const steps = [
    {
      title: "Hi, I am Lami",
      subtitle: "Your companion through every week of this journey. What should I call you?",
      valid: name.trim().length > 0,
      body: (
        <div className="space-y-2">
          <input value={name} onChange={(e) => setName(e.target.value)} autoFocus placeholder="Your name or nickname"
            className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-4 text-base outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
          <p className="text-xs text-stone-400 px-1">This is what Lami will call you in every message.</p>
        </div>
      ),
    },
    {
      title: `Nice to meet you, ${name}`,
      subtitle: "How many weeks pregnant are you right now?",
      valid: typeof week === "number" && week >= 1 && week <= 42,
      body: (
        <div className="space-y-5">
          <div className="relative">
            <input type="number" min={1} max={42} value={week}
              onChange={(e) => {
                if (!e.target.value) { setWeek(""); return }
                const v = parseInt(e.target.value)
                if (v >= 1 && v <= 42) setWeek(v)
              }}
              placeholder="e.g. 18"
              className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-4 text-2xl font-bold text-forest-700 outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all text-center" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">weeks</span>
          </div>
          <div>
            <p className="text-xs text-stone-400 text-center mb-3">Or use the slider</p>
            <input type="range" min={1} max={42} value={weekNum || 1}
              onChange={(e) => setWeek(parseInt(e.target.value))} className="w-full accent-forest-600" />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>Week 1</span><span>Week 42</span>
            </div>
          </div>
          {typeof week === "number" && week >= 1 && (
            <div className="bg-forest-50 border border-forest-100 rounded-2xl px-4 py-3 text-center">
              <p className="text-sm font-semibold text-forest-700">Week {week} - {stageLabel(week)}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Your weekly food budget",
      subtitle: "I use this to plan meals that fit your pocket. What can you spend on food each week?",
      valid: typeof budget === "number" && budget >= 500,
      body: (
        <div className="space-y-5">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg font-bold">₦</span>
            <input type="number" min={500} value={budget}
              onChange={(e) => {
                if (!e.target.value) { setBudget(""); return }
                const v = parseInt(e.target.value)
                if (v >= 0) setBudget(v)
              }}
              placeholder="e.g. 15000"
              className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-4 text-2xl font-bold text-forest-700 outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
          </div>
          <div>
            <p className="text-xs text-stone-400 text-center mb-3">Or use the slider</p>
            <input type="range" min={500} max={100000} step={500} value={budgetNum || 500}
              onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full accent-forest-600" />
            <div className="flex justify-between text-xs text-stone-400 mt-1">
              <span>₦500</span><span>₦100,000</span>
            </div>
          </div>
          {typeof budget === "number" && budget >= 500 && (
            <div className="bg-forest-50 border border-forest-100 rounded-2xl px-4 py-3 text-center">
              <p className="text-sm font-semibold text-forest-700">₦{budget.toLocaleString()} per week</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Which language feels most like home?",
      subtitle: "Lami can chat with you in your mother tongue. You can switch anytime.",
      valid: true,
      body: (
        <div className="grid grid-cols-2 gap-3">
          {LANGS.map((l) => (
            <button key={l.value} onClick={() => setLanguage(l.value)}
              className={cn(
                "py-4 rounded-2xl font-semibold text-sm transition-all border-2",
                language === l.value
                  ? "bg-forest-600 text-white border-forest-600 shadow-warm"
                  : "bg-white text-stone-700 border-stone-200 hover:border-forest-200"
              )}>
              {l.label}
            </button>
          ))}
        </div>
      ),
    },
  ]

  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <div className="min-h-dvh bg-cream-50 flex flex-col">
      <div className="px-5 pt-safe pt-6">
        <Logo size={28} />
        <div className="mt-6 flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-400",
              i <= step ? "bg-forest-500" : "bg-stone-200"
            )} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-5 max-w-md mx-auto w-full py-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-2 tracking-tight">{current.title}</h1>
        <p className="text-stone-500 mb-8 leading-relaxed">{current.subtitle}</p>
        {current.body}
      </div>

      <div className="px-5 pb-safe pb-8 max-w-md mx-auto w-full space-y-3">
        <button
          onClick={() => isLast ? finish() : setStep((s) => s + 1)}
          disabled={!current.valid || saving}
          className="w-full bg-forest-600 hover:bg-forest-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-800 transition-colors flex items-center justify-center gap-2">
          {saving ? "Setting up..." : isLast ? "Meet Lami" : "Continue"} <Arrow className="w-4 h-4" />
        </button>
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)}
            className="w-full text-stone-400 text-sm py-2 hover:text-stone-600 transition-colors">
            Back
          </button>
        )}
      </div>
    </div>
  )
}
