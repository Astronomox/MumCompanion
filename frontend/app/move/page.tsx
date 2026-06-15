"use client"

import { useState } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

const EXERCISES = [
  {
    id: "pelvic-tilt",
    name: "Pelvic Tilts",
    duration: "2 min",
    tag: "All trimesters",
    benefit: "Eases lower back pain and strengthens your core gently.",
    steps: [
      "Stand with your back flat against a wall, feet shoulder-width apart.",
      "Breathe in slowly through your nose.",
      "As you breathe out, press your lower back into the wall.",
      "Hold for 4 counts. Feel the stretch along your lower spine.",
      "Release gently. Repeat 10 times, moving with your breath.",
    ],
  },
  {
    id: "cat-cow",
    name: "Cat and Cow Stretch",
    duration: "3 min",
    tag: "First and second trimester",
    benefit: "Relieves back tension and creates space for baby.",
    steps: [
      "Get on your hands and knees on a soft surface.",
      "Breathe in — let your belly drop toward the floor, look gently up.",
      "Breathe out — round your back toward the ceiling, chin to chest.",
      "Move slowly between both shapes with your breath.",
      "Repeat 8 to 10 times. Never force the movement.",
    ],
  },
  {
    id: "ankle-circle",
    name: "Ankle Circles",
    duration: "2 min",
    tag: "All trimesters",
    benefit: "Reduces swelling in your feet and ankles.",
    steps: [
      "Sit comfortably on a chair with good back support.",
      "Lift your right foot slightly off the ground.",
      "Rotate your ankle slowly — 10 times clockwise.",
      "Then 10 times counter-clockwise. Switch feet.",
      "Do this twice a day, especially after long sitting.",
    ],
  },
  {
    id: "breathing",
    name: "Calm Breathing",
    duration: "5 min",
    tag: "All trimesters, anytime",
    benefit: "Lowers stress and prepares you for labour breathing.",
    steps: [
      "Sit or lie somewhere comfortable. Close your eyes.",
      "Breathe in through your nose for 4 slow counts.",
      "Hold gently for 4 counts — do not strain.",
      "Breathe out through your mouth for 6 counts.",
      "Repeat for 5 minutes.",
    ],
  },
  {
    id: "neck-roll",
    name: "Neck Rolls",
    duration: "2 min",
    tag: "All trimesters",
    benefit: "Releases tension from your neck and upper back.",
    steps: [
      "Sit tall in a chair or cross-legged on the floor.",
      "Drop your right ear slowly toward your right shoulder.",
      "Roll your chin down toward your chest, then left shoulder.",
      "Move slowly — never force or roll your head all the way back.",
      "Repeat 3 times each side. Stop if you feel dizzy.",
    ],
  },
]

export default function MovePage() {
  const { user } = useAppStore()
  const [selected, setSelected] = useState<string | null>(null)
  const [step, setStep] = useState(0)

  const exercise = EXERCISES.find((e) => e.id === selected)

  if (exercise) {
    return (
      <div className="min-h-dvh bg-cream-50 pb-28">
        <header className="bg-white border-b border-stone-100 px-4 pt-safe pt-4 pb-4 flex items-center gap-3">
          <button onClick={() => { setSelected(null); setStep(0) }}
            className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center active:bg-stone-200 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-stone-600">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-stone-800">{exercise.name}</h1>
            <p className="text-xs text-forest-600 font-medium">{exercise.tag} · {exercise.duration}</p>
          </div>
        </header>

        <div className="px-4 pt-5 space-y-3">
          {/* Benefit */}
          <div className="bg-forest-50 border border-forest-100 rounded-2xl px-4 py-3">
            <p className="text-sm text-forest-800 leading-relaxed">{exercise.benefit}</p>
          </div>

          {/* Steps */}
          {exercise.steps.map((s, i) => (
            <div key={i} onClick={() => setStep(i)}
              className={cn(
                "flex gap-4 items-start p-4 rounded-2xl cursor-pointer transition-all",
                i === step
                  ? "bg-forest-600 shadow-warm"
                  : i < step
                  ? "bg-forest-50 border border-forest-100"
                  : "bg-white border border-stone-100"
              )}>
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5",
                i === step ? "bg-white text-forest-700" : i < step ? "bg-forest-500 text-white" : "bg-stone-100 text-stone-400"
              )}>
                {i < step ? (
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i + 1}
              </div>
              <p className={cn(
                "text-sm leading-relaxed pt-0.5",
                i === step ? "text-white font-medium" : i < step ? "text-forest-700" : "text-stone-600"
              )}>{s}</p>
            </div>
          ))}

          {/* Controls */}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="w-11 h-11 rounded-full border border-stone-200 bg-white flex items-center justify-center disabled:opacity-30 active:bg-stone-50 transition-colors text-stone-600 text-lg">←</button>
            <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-forest-600 rounded-full transition-all duration-400"
                style={{ width: `${((step + 1) / exercise.steps.length) * 100}%` }} />
            </div>
            <span className="text-xs text-stone-400 font-medium min-w-8 text-right">{step + 1}/{exercise.steps.length}</span>
            <button onClick={() => setStep(Math.min(exercise.steps.length - 1, step + 1))}
              disabled={step === exercise.steps.length - 1}
              className="w-11 h-11 rounded-full border border-stone-200 bg-white flex items-center justify-center disabled:opacity-30 active:bg-stone-50 transition-colors text-stone-600 text-lg">→</button>
          </div>

          {step === exercise.steps.length - 1 && (
            <div className="bg-forest-50 border border-forest-100 rounded-2xl px-4 py-3 text-center">
              <p className="text-sm text-forest-700 font-medium">Well done, nne. Take a breath.</p>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-28">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Move</h1>
        <p className="text-sm text-stone-500 mt-0.5">
          Gentle exercises{user?.name ? `, ${user.name}` : ""}
        </p>
      </header>

      <div className="px-4 pt-4 space-y-3">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            All exercises here are safe during pregnancy. Stop if something feels wrong and speak to your midwife.
          </p>
        </div>

        {EXERCISES.map((ex) => (
          <button key={ex.id} onClick={() => { setSelected(ex.id); setStep(0) }}
            className="w-full card text-left active:scale-[0.99] transition-transform">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-stone-800">{ex.name}</h3>
                  <span className="text-xs text-stone-400">{ex.duration}</span>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">{ex.benefit}</p>
                <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full">
                  {ex.tag}
                </span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-stone-300 flex-shrink-0">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
