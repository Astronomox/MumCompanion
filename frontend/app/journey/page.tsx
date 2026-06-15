"use client"

import { useState, useEffect } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { getWeekContent } from "@/lib/api/client"
import { useAppStore } from "@/lib/store"

interface WeekContent {
  week: number
  phase: string
  title: string
  baby_size: string
  baby_development: string
  mother_changes: string[]
  nutrition_tips: string[]
  warning_signs_this_week: string[]
  affirmation: string
}

function Section({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div className={`card mb-3 border-l-4 ${accent}`}>
      <h3 className="font-semibold text-stone-800 mb-2">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-stone-600 flex gap-2"><span className="shrink-0 mt-0.5 text-forest-400">·</span>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function JourneyPage() {
  const { user } = useAppStore()
  const initialWeek = user?.week && user.week > 0 ? user.week : 0
  const [week, setWeek] = useState(initialWeek)
  const [content, setContent] = useState<WeekContent | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!week || week < 1) return
    let cancelled = false
    setLoading(true)
    getWeekContent(week, "pregnancy")
      .then((d) => { if (!cancelled) setContent(d as WeekContent) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [week])

  // No week set yet - prompt her to update settings
  if (!week || week < 1) {
    return (
      <div className="min-h-dvh bg-cream-50 pb-24">
        <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
          <h1 className="font-display font-bold text-xl text-stone-800">Your Journey{user?.name ? `, ${user.name}` : ""}</h1>
          <p className="text-sm text-stone-500 mt-0.5">Week by week, together</p>
        </header>
        <div className="px-4 pt-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-forest-600">
              <rect x="4" y="5" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M4 10H20M8 3V7M16 3V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="font-display font-bold text-lg text-stone-800 mb-2">First, tell me your week</h2>
          <p className="text-sm text-stone-500 mb-6 max-w-xs mx-auto leading-relaxed">
            I cannot guide you week by week if I do not know how far along you are. Tap below to set your week.
          </p>
          <button onClick={() => window.location.href = "/profile"}
            className="bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-2xl px-6 py-3 text-sm transition-colors">
            Open Settings
          </button>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Your Journey{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="text-sm text-stone-500 mt-0.5">Week by week, together</p>
      </header>

      <div className="bg-white border-b border-stone-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setWeek((w) => Math.max(1, w - 1))} disabled={week <= 1}
            className="tap-target rounded-xl text-stone-500 disabled:opacity-30">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M15 18 L9 12 L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="text-center">
            <p className="text-2xl font-bold text-forest-600">Week {week}</p>
            <p className="text-xs text-stone-400">of 40</p>
          </div>
          <button onClick={() => setWeek((w) => Math.min(40, w + 1))} disabled={week >= 40}
            className="tap-target rounded-xl text-stone-500 disabled:opacity-30">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="mt-3 h-2 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-forest-500 rounded-full transition-all duration-500" style={{ width: `${(week / 40) * 100}%` }} />
        </div>
      </div>

      <div className="px-4 pt-4">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-forest-400 animate-spin"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25"/><path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
          </div>
        ) : content ? (
          <>
            <div className="card mb-3 bg-forest-50 border-forest-100">
              <p className="text-xs text-forest-600 font-medium">Your baby is about the size of a</p>
              <p className="text-lg font-bold text-forest-700 mb-2">{content.baby_size}</p>
              <h2 className="font-semibold text-stone-800 mb-1">{content.title}</h2>
              <p className="text-sm text-stone-600">{content.baby_development}</p>
            </div>
            {content.mother_changes?.length > 0 && <Section title="What to expect in your body" items={content.mother_changes} accent="border-forest-300" />}
            {content.nutrition_tips?.length > 0 && <Section title="Nutrition this week" items={content.nutrition_tips} accent="border-sage-400" />}
            {content.warning_signs_this_week?.length > 0 && <Section title="Watch for these" items={content.warning_signs_this_week} accent="border-amber-300" />}
            {content.affirmation && (
              <div className="card bg-sage-50 border-sage-100 mb-4">
                <p className="text-sm text-sage-800 italic text-center leading-relaxed">{content.affirmation}</p>
              </div>
            )}
          </>
        ) : null}
      </div>
      <BottomNav />
    </div>
  )
}
