"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { Logo } from "@/components/Logo"
import { cn } from "@/lib/utils/cn"

function Arrow({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12 H19 M13 6 l6 6 l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function stageFromWeek(week: number): string {
  if (week <= 13) return "first_trimester"
  if (week <= 27) return "second_trimester"
  return "third_trimester"
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user, setUser } = useAppStore()
  const [step, setStep] = useState(0)

  const [name, setName] = useState(user?.name || "")
  const [week, setWeek] = useState(16)
  const [budget, setBudget] = useState(10000)
  const [language, setLanguage] = useState("english")
  const [emergencyName, setEmergencyName] = useState("")
  const [emergencyPhone, setEmergencyPhone] = useState("")
  const [hospitalName, setHospitalName] = useState("")
  const [hospitalPhone, setHospitalPhone] = useState("")

  const finish = () => {
    setUser({
      id: user?.id || `local-${Date.now()}`,
      name: name.trim() || "Mama",
      stage: stageFromWeek(week),
      week,
      weeklyBudget: budget,
      preferredLanguage: language,
      emergencyName: emergencyName.trim(),
      emergencyPhone: emergencyPhone.trim(),
      hospitalName: hospitalName.trim(),
      hospitalPhone: hospitalPhone.trim(),
    })
    router.push("/chat")
  }

  const steps = [
    {
      title: "Hi, I am Lami",
      subtitle: "Your companion from today. What should I call you?",
      valid: name.trim().length > 0,
      body: (
        <input value={name} onChange={(e) => setName(e.target.value)} autoFocus
          placeholder="Your name or nickname"
          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-4 text-base outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
      ),
    },
    {
      title: `Lovely to meet you${name ? ", " + name : ""}`,
      subtitle: "How many weeks pregnant are you? Move the slider, no need to be exact.",
      valid: true,
      body: (
        <div>
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-forest-600 font-display">{week}</p>
            <p className="text-sm text-stone-400">weeks ({stageFromWeek(week).replace("_", " ")})</p>
          </div>
          <input type="range" min={1} max={40} value={week} onChange={(e) => setWeek(parseInt(e.target.value))}
            className="w-full accent-forest-600" />
          <div className="flex justify-between text-xs text-stone-400 mt-1"><span>Week 1</span><span>Week 40</span></div>
        </div>
      ),
    },
    {
      title: "What can you spend on food each week?",
      subtitle: "This helps me plan meals that fit your real budget. You can change it anytime.",
      valid: budget >= 3000,
      body: (
        <div>
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-forest-600 font-display">N{budget.toLocaleString()}</p>
            <p className="text-sm text-stone-400">per week</p>
          </div>
          <input type="range" min={3000} max={50000} step={1000} value={budget} onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full accent-forest-600" />
          <div className="flex justify-between text-xs text-stone-400 mt-1"><span>N3,000</span><span>N50,000</span></div>
        </div>
      ),
    },
    {
      title: "One last important thing",
      subtitle: "Who should I call if there is an emergency? This powers your SOS button. You can skip and add it later in your profile.",
      valid: true,
      body: (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Emergency contact</p>
          <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)}
            placeholder="Contact name (e.g. My husband)"
            className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-forest-400" />
          <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} type="tel"
            placeholder="Their phone number"
            className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-forest-400" />
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide pt-1">Hospital (optional)</p>
          <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Hospital or clinic name"
            className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-forest-400" />
          <input value={hospitalPhone} onChange={(e) => setHospitalPhone(e.target.value)} type="tel"
            placeholder="Hospital phone number"
            className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-forest-400" />
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
            <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= step ? "bg-forest-500" : "bg-stone-200")} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-5 max-w-md mx-auto w-full">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">{current.title}</h1>
        <p className="text-stone-600 mb-8">{current.subtitle}</p>
        {current.body}
      </div>

      <div className="px-5 pb-safe pb-8 max-w-md mx-auto w-full space-y-3">
        <button onClick={() => (isLast ? finish() : setStep((s) => s + 1))} disabled={!current.valid}
          className="w-full bg-forest-600 disabled:bg-stone-300 text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors flex items-center justify-center gap-2">
          {isLast ? "Meet Lami" : "Continue"} <Arrow className="w-4 h-4" />
        </button>
        {isLast && (
          <button onClick={finish} className="w-full text-stone-400 text-sm py-2">Skip for now</button>
        )}
        {step > 0 && !isLast && (
          <button onClick={() => setStep((s) => s - 1)} className="w-full text-stone-400 text-sm py-2">Back</button>
        )}
      </div>
    </div>
  )
}
