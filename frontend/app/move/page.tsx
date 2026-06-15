"use client"

import { useState } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils/cn"

interface Exercise {
  id: string
  name: string
  duration: string
  benefit: string
  safeFor: string
  steps: string[]
  animation: "pelvic-tilt" | "cat-cow" | "ankle-circle" | "breathing" | "neck-roll"
}

const EXERCISES: Exercise[] = [
  {
    id: "pelvic-tilt",
    name: "Pelvic Tilts",
    duration: "2 minutes",
    benefit: "Eases lower back pain and strengthens your core gently",
    safeFor: "All trimesters",
    animation: "pelvic-tilt",
    steps: [
      "Stand with your back against a wall, feet shoulder-width apart",
      "Breathe in slowly through your nose",
      "As you breathe out, gently press your lower back into the wall",
      "Hold for 4 seconds, then release",
      "Repeat 10 times, slow and steady",
    ],
  },
  {
    id: "cat-cow",
    name: "Cat and Cow Stretch",
    duration: "3 minutes",
    benefit: "Relieves back tension and makes room for baby",
    safeFor: "First and second trimester",
    animation: "cat-cow",
    steps: [
      "Get on your hands and knees, wrists under shoulders",
      "Breathe in, drop your belly gently and look up (cow)",
      "Breathe out, round your back up toward the ceiling (cat)",
      "Move slowly between the two with your breath",
      "Repeat 8 to 10 times",
    ],
  },
  {
    id: "ankle-circle",
    name: "Ankle Circles",
    duration: "2 minutes",
    benefit: "Reduces swelling in your feet and ankles",
    safeFor: "All trimesters, great for third",
    animation: "ankle-circle",
    steps: [
      "Sit comfortably on a chair",
      "Lift one foot slightly off the ground",
      "Rotate your ankle slowly in a circle, 10 times one way",
      "Then 10 times the other way",
      "Switch to the other foot",
    ],
  },
  {
    id: "breathing",
    name: "Calm Breathing",
    duration: "5 minutes",
    benefit: "Lowers stress and prepares you for labour breathing",
    safeFor: "All trimesters, anytime",
    animation: "breathing",
    steps: [
      "Sit or lie down somewhere comfortable",
      "Breathe in slowly through your nose for 4 counts",
      "Hold gently for 4 counts",
      "Breathe out slowly through your mouth for 6 counts",
      "Follow the circle on screen and repeat for 5 minutes",
    ],
  },
  {
    id: "neck-roll",
    name: "Gentle Neck Rolls",
    duration: "2 minutes",
    benefit: "Releases tension from your neck and shoulders",
    safeFor: "All trimesters",
    animation: "neck-roll",
    steps: [
      "Sit up tall with relaxed shoulders",
      "Drop your chin gently toward your chest",
      "Slowly roll your head to one side",
      "Bring it back to center, then the other side",
      "Repeat 5 times each direction, slow and gentle",
    ],
  },
]

function ExerciseAnimation({ type }: { type: Exercise["animation"] }) {
  // Each animation is a simple CSS-animated figure
  if (type === "breathing") {
    return (
      <div className="flex items-center justify-center h-44">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-forest-200 animate-breathe" />
          <div className="absolute inset-4 rounded-full bg-forest-300 animate-breathe" style={{ animationDelay: "0.2s" }} />
          <span className="relative z-10 text-forest-700 text-sm font-medium">breathe</span>
        </div>
      </div>
    )
  }

  if (type === "ankle-circle") {
    return (
      <div className="flex items-center justify-center h-44">
        <svg viewBox="0 0 120 120" className="w-32 h-32">
          <circle cx="60" cy="60" r="34" fill="none" stroke="#aed6b3" strokeWidth="3" strokeDasharray="4 4" />
          <g>
            <circle cx="60" cy="26" r="7" fill="#216330">
              <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
          <rect x="54" y="70" width="12" height="30" rx="4" fill="#4e9a5b" />
        </svg>
      </div>
    )
  }

  if (type === "pelvic-tilt") {
    return (
      <div className="flex items-center justify-center h-44">
        <svg viewBox="0 0 160 120" className="w-44 h-32">
          <line x1="30" y1="10" x2="30" y2="110" stroke="#cedbc4" strokeWidth="4" />
          <g>
            <ellipse cx="70" cy="55" rx="14" ry="20" fill="#216330">
              <animate attributeName="cx" values="70;62;70" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
            <circle cx="70" cy="30" r="9" fill="#4e9a5b">
              <animate attributeName="cx" values="70;62;70" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    )
  }

  if (type === "cat-cow") {
    return (
      <div className="flex items-center justify-center h-44">
        <svg viewBox="0 0 160 120" className="w-44 h-32">
          <path fill="none" stroke="#216330" strokeWidth="6" strokeLinecap="round">
            <animate attributeName="d"
              values="M30 80 Q80 60 130 80;M30 80 Q80 100 130 80;M30 80 Q80 60 130 80"
              dur="3s" repeatCount="indefinite" />
          </path>
          <circle cx="30" cy="80" r="8" fill="#4e9a5b" />
          <rect x="124" y="80" width="10" height="24" rx="3" fill="#4e9a5b" />
        </svg>
      </div>
    )
  }

  if (type === "neck-roll") {
    return (
      <div className="flex items-center justify-center h-44">
        <svg viewBox="0 0 120 120" className="w-32 h-32">
          <rect x="50" y="60" width="20" height="45" rx="6" fill="#4e9a5b" />
          <g>
            <circle cx="60" cy="45" r="14" fill="#216330">
              <animateTransform attributeName="transform" type="rotate" values="-25 60 58;25 60 58;-25 60 58" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    )
  }

  return null
}

export default function MovePage() {
  const { user } = useAppStore()
  const [active, setActive] = useState<Exercise | null>(null)
  const [step, setStep] = useState(0)

  if (active) {
    return (
      <div className="min-h-dvh bg-cream-50 pb-24">
        <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe flex items-center gap-3">
          <button onClick={() => { setActive(null); setStep(0) }} className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-stone-600"><path d="M15 18 L9 12 L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h1 className="font-display font-bold text-lg text-stone-800">{active.name}</h1>
            <p className="text-xs text-stone-400">{active.duration} | {active.safeFor}</p>
          </div>
        </header>

        <div className="px-4 pt-4">
          <div className="card bg-forest-50 border-forest-100 mb-4">
            <ExerciseAnimation type={active.animation} />
          </div>

          <div className="card mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-forest-500 rounded-full transition-all" style={{ width: `${((step + 1) / active.steps.length) * 100}%` }} />
              </div>
              <span className="text-xs text-stone-400">{step + 1}/{active.steps.length}</span>
            </div>
            <p className="text-lg text-stone-800 leading-relaxed min-h-[60px]">{active.steps[step]}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl py-3.5 text-sm disabled:opacity-40">
              Back
            </button>
            {step < active.steps.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)}
                className="flex-1 bg-forest-600 text-white font-semibold rounded-2xl py-3.5 text-sm active:bg-forest-700">
                Next step
              </button>
            ) : (
              <button onClick={() => { setActive(null); setStep(0) }}
                className="flex-1 bg-forest-600 text-white font-semibold rounded-2xl py-3.5 text-sm active:bg-forest-700">
                Done, well done!
              </button>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Move with Lami</h1>
        <p className="text-sm text-stone-500 mt-0.5">Gentle, safe exercises for every stage</p>
      </header>

      <div className="px-4 pt-4 space-y-3">
        <div className="card bg-forest-50 border-forest-100">
          <p className="text-sm text-forest-700">
            {user?.name ? `${user.name}, m` : "M"}oving your body a little each day helps with back pain, swelling, sleep, and your mood. Always stop if something hurts.
          </p>
        </div>

        {EXERCISES.map((ex) => (
          <button key={ex.id} onClick={() => { setActive(ex); setStep(0) }}
            className="card w-full text-left active:scale-[0.99] transition-transform hover:shadow-warm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-display font-bold text-stone-800">{ex.name}</h3>
                <p className="text-sm text-stone-500 mt-1">{ex.benefit}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-lg">{ex.duration}</span>
                  <span className="text-xs text-stone-400">{ex.safeFor}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white"><path d="M8 5 L18 12 L8 19 Z" fill="currentColor"/></svg>
              </div>
            </div>
          </button>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}
