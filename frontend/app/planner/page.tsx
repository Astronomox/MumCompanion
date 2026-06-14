"use client"

import { useState } from "react"
import { UtensilsCrossed, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { BottomNav } from "@/components/layout/BottomNav"
import { generateMealPlan } from "@/lib/api/client"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

const BUDGET_OPTIONS = [5000, 10000, 15000, 20000, 30000]

interface DayMeal {
  name: string
  foods: string[]
  cost_naira: number
  notes?: string
}

interface DayPlan {
  day: number
  breakfast: DayMeal
  lunch: DayMeal
  dinner: DayMeal
  snacks: DayMeal[]
  day_total: number
}

interface MealPlanResult {
  days: DayPlan[]
  weekly_total: number
  nutrition_notes: string
  tips: string[]
}

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function MealCard({ meal, label }: { meal: DayMeal; label: string }) {
  return (
    <div className="py-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">{label}</span>
          <p className="text-sm font-semibold text-stone-800 mt-0.5">{meal.name}</p>
          <p className="text-xs text-stone-500 mt-0.5">{meal.foods.join(", ")}</p>
          {meal.notes && <p className="text-xs text-forest-600 mt-1 italic">{meal.notes}</p>}
        </div>
        <span className="text-xs font-semibold text-terracotta-500 shrink-0">
          ₦{meal.cost_naira.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

function DayCard({ day, index }: { day: DayPlan; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="card mb-3">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-terracotta-50 flex items-center justify-center">
            <span className="text-xs font-bold text-terracotta-500">{index + 1}</span>
          </div>
          <div className="text-left">
            <p className="font-semibold text-stone-800">{DAY_NAMES[index]}</p>
            <p className="text-xs text-stone-400">₦{day.day_total.toLocaleString()}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-stone-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-stone-400" />
        )}
      </button>
      {open && (
        <div className="mt-3 divide-y divide-stone-100">
          <MealCard meal={day.breakfast} label="Breakfast" />
          <MealCard meal={day.lunch} label="Lunch" />
          <MealCard meal={day.dinner} label="Dinner" />
          {day.snacks.map((snack, i) => (
            <MealCard key={i} meal={snack} label={`Snack ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PlannerPage() {
  const { user } = useAppStore()
  const [budget, setBudget] = useState(10000)
  const [customBudget, setCustomBudget] = useState("")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<MealPlanResult | null>(null)
  const [error, setError] = useState("")

  const effectiveBudget = customBudget ? parseInt(customBudget) : budget

  const handleGenerate = async () => {
    if (effectiveBudget < 3000) {
      setError("Minimum budget is ₦3,000 per week")
      return
    }
    setError("")
    setLoading(true)
    try {
      const result = await generateMealPlan({
        weekly_budget: effectiveBudget,
        stage: user?.stage || "second_trimester",
        week: user?.week || 20,
      }) as MealPlanResult
      setPlan(result)
    } catch (e) {
      setError("Could not generate plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Meal Planner</h1>
        <p className="text-sm text-stone-500 mt-0.5">7-day plan with Nigerian foods, within your budget</p>
      </header>

      <div className="px-4 pt-4">
        {!plan ? (
          <div className="card">
            <h2 className="font-semibold text-stone-800 mb-4">Set your weekly food budget</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setBudget(opt); setCustomBudget("") }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    budget === opt && !customBudget
                      ? "bg-terracotta-500 text-white"
                      : "bg-stone-100 text-stone-600"
                  )}
                >
                  ₦{opt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-xs text-stone-500 mb-1 block">Or enter custom amount (Naira)</label>
              <input
                type="number"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                placeholder="e.g. 12500"
                className="w-full bg-stone-100 rounded-xl px-4 py-3 text-sm outline-none"
              />
            </div>

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

            <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating your plan...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  Generate 7-Day Plan
                </span>
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="card mb-4 bg-terracotta-50 border-terracotta-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-terracotta-700 font-medium">Weekly total</p>
                  <p className="text-2xl font-bold text-terracotta-600">
                    ₦{plan.weekly_total.toLocaleString()}
                  </p>
                  <p className="text-xs text-terracotta-500">Budget: ₦{effectiveBudget.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setPlan(null)}
                  className="text-xs text-terracotta-500 underline"
                >
                  Change budget
                </button>
              </div>
            </div>

            {plan.nutrition_notes && (
              <div className="card mb-4 bg-forest-50 border-forest-100">
                <p className="text-sm text-forest-700">{plan.nutrition_notes}</p>
              </div>
            )}

            {plan.days.map((day, i) => (
              <DayCard key={i} day={day} index={i} />
            ))}

            {plan.tips?.length > 0 && (
              <div className="card mt-2">
                <h3 className="font-semibold text-stone-800 mb-2">Tips</h3>
                <ul className="space-y-1">
                  {plan.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-stone-600 flex gap-2">
                      <span className="text-terracotta-400 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
