"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2, Leaf, Heart, AlertTriangle } from "lucide-react"
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

function Section({
  title,
  icon,
  items,
  color,
}: {
  title: string
  icon: React.ReactNode
  items: string[]
  color: string
}) {
  return (
    <div className={`card mb-3 border-l-4 ${color}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-semibold text-stone-800">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-stone-600 flex gap-2">
            <span className="shrink-0 mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function JourneyPage() {
  const { user } = useAppStore()
  const [week, setWeek] = useState(user?.week || 16)
  const [content, setContent] = useState<WeekContent | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchWeek = async (w: number) => {
    setLoading(true)
    try {
      const data = await getWeekContent(w, "pregnancy") as WeekContent
      setContent(data)
    } catch {
      // fail silently, keep previous content
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeek(week)
  }, [week])

  const prev = () => setWeek((w) => Math.max(1, w - 1))
  const next = () => setWeek((w) => Math.min(40, w + 1))

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Your Journey</h1>
        <p className="text-sm text-stone-500 mt-0.5">Week by week through pregnancy</p>
      </header>

      {/* Week navigator */}
      <div className="bg-white border-b border-stone-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={week <= 1}
            className="tap-target rounded-xl text-stone-500 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <p className="text-2xl font-bold text-terracotta-500">Week {week}</p>
            <p className="text-xs text-stone-400">of 40</p>
          </div>

          <button
            onClick={next}
            disabled={week >= 40}
            className="tap-target rounded-xl text-stone-500 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta-400 rounded-full transition-all duration-500"
            style={{ width: `${(week / 40) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-4 pt-4">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-terracotta-400 animate-spin" />
          </div>
        ) : content ? (
          <>
            {/* Baby size card */}
            <div className="card mb-3 bg-gradient-to-br from-terracotta-50 to-cream-100 border-terracotta-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-card">
                  {content.baby_size === "lime" ? "🍋" :
                   content.baby_size === "mango" ? "🥭" :
                   content.baby_size === "banana" ? "🍌" :
                   content.baby_size === "orange" ? "🍊" : "🌱"}
                </div>
                <div>
                  <p className="text-xs text-terracotta-600 font-medium">Your baby is about the size of a</p>
                  <p className="text-lg font-bold text-terracotta-700">{content.baby_size}</p>
                </div>
              </div>
              <h2 className="font-semibold text-stone-800 mb-1">{content.title}</h2>
              <p className="text-sm text-stone-600">{content.baby_development}</p>
            </div>

            {content.mother_changes?.length > 0 && (
              <Section
                title="What to expect in your body"
                icon={<Heart className="w-4 h-4 text-terracotta-500" />}
                items={content.mother_changes}
                color="border-terracotta-300"
              />
            )}

            {content.nutrition_tips?.length > 0 && (
              <Section
                title="Nutrition this week"
                icon={<Leaf className="w-4 h-4 text-forest-500" />}
                items={content.nutrition_tips}
                color="border-forest-300"
              />
            )}

            {content.warning_signs_this_week?.length > 0 && (
              <Section
                title="Warning signs to watch for"
                icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
                items={content.warning_signs_this_week}
                color="border-amber-300"
              />
            )}

            {/* Affirmation */}
            {content.affirmation && (
              <div className="card bg-forest-50 border-forest-100 mb-4">
                <p className="text-sm text-forest-700 italic text-center leading-relaxed">
                  {content.affirmation}
                </p>
              </div>
            )}
          </>
        ) : null}
      </div>

      <BottomNav />
    </div>
  )
}
