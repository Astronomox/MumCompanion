"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/layout/BottomNav"
import { useAppStore } from "@/lib/store"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils/cn"

function SettingsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function CheckIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M12 2L4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
}

function UserIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
}

function LogOutIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export default function SettingsPage() {
  const router = useRouter()
  const { user, updateUser, clearMessages } = useAppStore()
  const [saved, setSaved] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const [name, setName] = useState(user?.name || "")
  const [babyName, setBabyName] = useState(user?.babyName || "")
  const [budget, setBudget] = useState(user?.weeklyBudget || 10000)
  const [emergencyName, setEmergencyName] = useState(user?.emergencyName || "")
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyPhone || "")
  const [hospitalName, setHospitalName] = useState(user?.hospitalName || "")
  const [hospitalPhone, setHospitalPhone] = useState(user?.hospitalPhone || "")

  const save = () => {
    updateUser({ name, babyName, weeklyBudget: budget, emergencyName, emergencyPhone, hospitalName, hospitalPhone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const signOut = async () => {
    setSigningOut(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    // Clear local store
    clearMessages()
    // Hard redirect — clears all state
    window.location.href = "/login"
  }

  const hasEmergency = emergencyName && emergencyPhone

  return (
    <div className="min-h-dvh bg-cream-50 pb-28">
      <header className="bg-white border-b border-stone-100 px-4 pt-safe pt-4 pb-4">
        <div className="flex items-center gap-2.5">
          <SettingsIcon className="w-5 h-5 text-forest-600" />
          <div>
            <h1 className="font-display font-bold text-xl text-stone-800">Settings</h1>
            <p className="text-xs text-stone-500 mt-0.5">Your details and safety setup</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">

        {/* Emergency SOS card */}
        <div className={cn("card border-2", hasEmergency ? "border-forest-200 bg-forest-50" : "border-red-200 bg-red-50")}>
          <div className="flex items-center gap-2 mb-1">
            <ShieldIcon className={cn("w-4 h-4", hasEmergency ? "text-forest-500" : "text-red-500")} />
            <h2 className="font-display font-bold text-stone-800">Emergency SOS</h2>
            <span className={cn("ml-auto w-2 h-2 rounded-full", hasEmergency ? "bg-forest-500" : "bg-red-500 animate-pulse")} />
          </div>
          <p className="text-sm text-stone-600 mb-4">
            {hasEmergency
              ? "Your SOS button is armed. One tap calls your contact and sends them a WhatsApp message about how you feel."
              : "Set this up now. In a real emergency, every second counts. The SOS button calls this person immediately."}
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Emergency contact</label>
              <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="e.g. My husband, Sister Bisi"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
            </div>
            <div>
              <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} type="tel"
                placeholder="Their phone number e.g. 0803 123 4567"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
            </div>
            <div className="border-t border-stone-100 pt-3">
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Hospital</label>
              <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}
                placeholder="Hospital or clinic name"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all mb-2" />
              <input value={hospitalPhone} onChange={(e) => setHospitalPhone(e.target.value)} type="tel"
                placeholder="Hospital phone number"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
            </div>
          </div>
        </div>

        {/* Personal details */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon className="w-4 h-4 text-stone-500" />
            <h2 className="font-display font-bold text-stone-800">About you</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="What should Lami call you?"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Baby's name</label>
              <input value={babyName} onChange={(e) => setBabyName(e.target.value)}
                placeholder="Optional — if you have chosen one"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Weekly food budget (₦)</label>
              <input value={budget} onChange={(e) => setBudget(parseInt(e.target.value) || 0)} type="number"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all" />
            </div>
          </div>
        </div>

        {/* Save button */}
        <button onClick={save}
          className="w-full bg-forest-600 hover:bg-forest-700 active:bg-forest-800 text-white font-semibold rounded-2xl py-4 text-sm transition-colors flex items-center justify-center gap-2">
          {saved ? (
            <><CheckIcon className="w-4 h-4" />Saved!</>
          ) : "Save settings"}
        </button>

        {/* Sign out */}
        <button
          onClick={signOut}
          disabled={signingOut}
          className="w-full bg-white border border-stone-200 hover:bg-red-50 hover:border-red-200 text-stone-600 hover:text-red-600 font-medium rounded-2xl py-3.5 text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
          <LogOutIcon className="w-4 h-4" />
          {signingOut ? "Signing out..." : "Sign out"}
        </button>

        <div className="text-center pb-4">
          <p className="text-xs text-stone-400">Mum AI Companion · Lami is with you</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
