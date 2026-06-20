"use client"

import { useState } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { useAppStore } from "@/lib/store"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils/cn"
import { ThemeToggle } from "@/components/ThemeToggle"

function GearIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2L4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg>
}
function UserIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2.2"/><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
}
function CheckIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function LogOutIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function CalIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.2"/><path d="M4 10H20M8 3V7M16 3V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
}

export default function SettingsPage() {
  const { user, updateUser, clearMessages, setUser } = useAppStore()
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState(user?.name || "")
  const [week, setWeek] = useState<number | "">(user?.week || "")
  const [babyName, setBabyName] = useState(user?.babyName || "")
  const [budget, setBudget] = useState(user?.weeklyBudget || 0)
  const [language, setLanguage] = useState(user?.preferredLanguage || "english")
  const [emergencyName, setEmergencyName] = useState(user?.emergencyName || "")
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyPhone || "")
  const [hospitalName, setHospitalName] = useState(user?.hospitalName || "")
  const [hospitalPhone, setHospitalPhone] = useState(user?.hospitalPhone || "")

  const stageFromWeek = (w: number) => w <= 13 ? "first_trimester" : w <= 27 ? "second_trimester" : "third_trimester"

  const save = async () => {
    setSaving(true)
    setError("")

    const weekNum = typeof week === "number" ? week : (user?.week || 20)

    const patch = {
      name: name.trim(),
      babyName,
      week: weekNum,
      stage: stageFromWeek(weekNum),
      weeklyBudget: budget,
      preferredLanguage: language,
      emergencyName,
      emergencyPhone,
      hospitalName,
      hospitalPhone,
    }

    // Update local store
    updateUser(patch)

    // Save to Supabase
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        const { error: err } = await supabase.from("profiles").upsert({
          id: authUser.id,
          name: patch.name,
          stage: patch.stage,
          week: patch.week,
          baby_name: patch.babyName,
          weekly_budget: patch.weeklyBudget,
          preferred_language: patch.preferredLanguage,
          emergency_name: patch.emergencyName,
          emergency_phone: patch.emergencyPhone,
          hospital_name: patch.hospitalName,
          hospital_phone: patch.hospitalPhone,
          updated_at: new Date().toISOString(),
        })
        if (err) {
          console.error("Supabase save error:", err)
          setError("Saved locally but could not sync to cloud. Try again later.")
        }
      }
    } catch (e) {
      console.error("Save error:", e)
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const signOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    clearMessages()
    // @ts-ignore
    setUser(null)
    // Clear the persisted store entirely, not just the user field
    try {
      localStorage.removeItem("mum-ai-companion-store")
    } catch {}
    // Hard replace with cache-busting param so back-swipe cannot show stale authenticated page
    window.location.replace("/login?signedout=" + Date.now())
  }

  const hasEmergency = emergencyName && emergencyPhone
  const weekNum = typeof week === "number" ? week : 0
  const stage = weekNum > 0 ? (weekNum <= 13 ? "First trimester" : weekNum <= 27 ? "Second trimester" : "Third trimester") : ""

  return (
    <div className="min-h-dvh bg-cream-50 pb-28">
      <header className="bg-white border-b border-stone-100 px-4 pt-safe pt-4 pb-4">
        <div className="flex items-center gap-2.5">
          <GearIcon className="w-5 h-5 text-forest-600" />
          <div>
            <h1 className="font-serif font-semibold text-xl text-stone-800">Settings</h1>
            <p className="text-xs text-stone-400 mt-0.5">Your details and safety setup</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">

        {/* Appearance */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-stone-800 mb-0.5">Appearance</h2>
              <p className="text-xs text-stone-400">Switch between light and dark</p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* About You */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="w-4 h-4 text-stone-400" />
            <h2 className="font-display font-bold text-stone-800">About you</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">Baby&apos;s name</label>
              <input value={babyName} onChange={(e) => setBabyName(e.target.value)} placeholder="Optional"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
            </div>
          </div>
        </div>

        {/* Pregnancy Week */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <CalIcon className="w-4 h-4 text-stone-400" />
            <h2 className="font-display font-bold text-stone-800">Pregnancy week</h2>
          </div>
          <input type="number" min={1} max={42} value={week}
            onChange={(e) => {
              if (!e.target.value) { setWeek(""); return }
              const v = parseInt(e.target.value)
              if (v >= 1 && v <= 42) setWeek(v)
            }}
            placeholder="e.g. 18"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
          {stage && (
            <p className="text-xs text-forest-600 font-medium mt-2">{stage}</p>
          )}
        </div>

        {/* Budget + Language */}
        <div className="card">
          <h2 className="font-display font-bold text-stone-800 mb-4">Preferences</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">Weekly food budget (₦)</label>
              <input value={budget || ""} onChange={(e) => setBudget(parseInt(e.target.value) || 0)} type="number"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">Chat language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100">
                <option value="english">English</option>
                <option value="yoruba">Yoruba</option>
                <option value="igbo">Igbo</option>
                <option value="hausa">Hausa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Emergency */}
        <div className={cn("card border-2", hasEmergency ? "border-forest-200 bg-forest-50" : "border-amber-200 bg-amber-50")}>
          <div className="flex items-center gap-2 mb-1">
            <ShieldIcon className={cn("w-4 h-4", hasEmergency ? "text-forest-500" : "text-amber-500")} />
            <h2 className="font-display font-bold text-stone-800">Emergency SOS</h2>
            <span className={cn("ml-auto w-2 h-2 rounded-full", hasEmergency ? "bg-forest-500" : "bg-amber-400 animate-pulse")} />
          </div>
          <p className="text-sm text-stone-600 mb-4 leading-relaxed">
            {hasEmergency
              ? "Your SOS button is armed."
              : "Add an emergency contact so the SOS button can call them instantly."}
          </p>
          <div className="space-y-2.5">
            <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)}
              placeholder="Emergency contact name"
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
            <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} type="tel"
              placeholder="Their phone number"
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
            <div className="border-t border-stone-100 pt-2.5 space-y-2.5">
              <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}
                placeholder="Hospital name (optional)"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
              <input value={hospitalPhone} onChange={(e) => setHospitalPhone(e.target.value)} type="tel"
                placeholder="Hospital phone (optional)"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100" />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        <button onClick={save} disabled={saving}
          className="w-full bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-2xl py-4 text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
          {saving ? "Saving..." : saved ? <><CheckIcon className="w-4 h-4" />Saved!</> : "Save settings"}
        </button>

        <button onClick={signOut} disabled={signingOut}
          className="w-full bg-white border border-stone-200 hover:bg-red-50 hover:border-red-200 text-stone-500 hover:text-red-600 font-medium rounded-2xl py-3.5 text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
          <LogOutIcon className="w-4 h-4" />
          {signingOut ? "Signing out..." : "Sign out"}
        </button>

        <p className="text-center text-xs text-stone-400 pb-2">Mum AI Companion · Lami is with you</p>
      </div>

      <BottomNav />
    </div>
  )
}
