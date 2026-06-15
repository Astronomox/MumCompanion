"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/layout/BottomNav"
import { useAppStore } from "@/lib/store"
import { Logo } from "@/components/Logo"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils/cn"

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateUser } = useAppStore()
  const [saved, setSaved] = useState(false)

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
    setTimeout(() => setSaved(false), 2000)
  }

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    router.push("/login")
  }

  const hasEmergency = emergencyName && emergencyPhone

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Me</h1>
        <p className="text-sm text-stone-500 mt-0.5">Your details and safety setup</p>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* Emergency setup - most important, at top */}
        <div className={cn("card border-2", hasEmergency ? "border-forest-200 bg-forest-50" : "border-red-200 bg-red-50")}>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("w-2.5 h-2.5 rounded-full", hasEmergency ? "bg-forest-500" : "bg-red-500 animate-pulse")} />
            <h2 className="font-display font-bold text-stone-800">Emergency setup</h2>
          </div>
          <p className="text-sm text-stone-600 mb-4">
            {hasEmergency
              ? "Your SOS button is ready. One tap calls your contact and sends them a message."
              : "Set this up now. In an emergency, the SOS button will call this person and send them a message."}
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Emergency contact name</label>
              <input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="e.g. My husband, My sister Bisi"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Their phone number</label>
              <input value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} type="tel"
                placeholder="e.g. 0803 123 4567"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400" />
            </div>
            <div className="border-t border-stone-200 pt-3">
              <label className="block text-xs font-medium text-stone-600 mb-1">Your hospital name</label>
              <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g. LUTH, my clinic"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400 mb-3" />
              <label className="block text-xs font-medium text-stone-600 mb-1">Hospital phone number</label>
              <input value={hospitalPhone} onChange={(e) => setHospitalPhone(e.target.value)} type="tel"
                placeholder="e.g. 0701 234 5678"
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest-400" />
            </div>
          </div>
        </div>

        {/* Personal details */}
        <div className="card">
          <h2 className="font-display font-bold text-stone-800 mb-4">About you</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Your name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-100 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Baby's name (if you have chosen one)</label>
              <input value={babyName} onChange={(e) => setBabyName(e.target.value)}
                placeholder="Optional"
                className="w-full bg-stone-100 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Weekly food budget</label>
              <input value={budget} onChange={(e) => setBudget(parseInt(e.target.value) || 0)} type="number"
                className="w-full bg-stone-100 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          </div>
        </div>

        <button onClick={save} className="w-full bg-forest-600 text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors">
          {saved ? "Saved!" : "Save my details"}
        </button>

        <button onClick={signOut} className="w-full bg-white border border-stone-200 text-stone-600 font-medium rounded-2xl py-3.5 text-sm">
          Sign out
        </button>

        <div className="flex justify-center pt-2 pb-4">
          <Logo size={24} />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
