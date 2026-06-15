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
}

const EXERCISES: Exercise[] = [
  {
    id: "pelvic-tilt",
    name: "Pelvic Tilts",
    duration: "2 minutes",
    benefit: "Eases lower back pain and gently strengthens your core. Safe every single day.",
    safeFor: "All trimesters",
    steps: [
      "Stand with your back flat against a wall, feet shoulder-width apart.",
      "Breathe in slowly through your nose. Feel your belly gently rise.",
      "As you breathe out, press your lower back into the wall. Pelvis tilts forward slightly.",
      "Hold for 4 slow counts. Feel the stretch open along your lower spine.",
      "Release and return to neutral. Repeat 10 times with your breath.",
    ],
  },
  {
    id: "cat-cow",
    name: "Cat and Cow Stretch",
    duration: "3 minutes",
    benefit: "Relieves back tension and creates space for baby. Deeply soothing.",
    safeFor: "First and second trimester",
    steps: [
      "Get on your hands and knees on a soft surface. Wrists under shoulders.",
      "Breathe in and let your belly drop toward the floor, look gently upward (cow).",
      "Breathe out and round your back toward the ceiling, chin to chest (cat).",
      "Move slowly between both shapes, following your breath.",
      "Repeat 8 to 10 times. Never force the movement.",
    ],
  },
  {
    id: "ankle-circle",
    name: "Ankle Circles",
    duration: "2 minutes",
    benefit: "Reduces swelling in your feet and ankles. Works well in the third trimester.",
    safeFor: "All trimesters, great for third",
    steps: [
      "Sit comfortably on a chair with good back support.",
      "Lift your right foot slightly off the ground.",
      "Slowly rotate your ankle in a circle — 10 times clockwise.",
      "Then 10 times counter-clockwise. Switch to the left foot.",
      "Do this twice a day, especially after long periods of sitting.",
    ],
  },
  {
    id: "breathing",
    name: "Calm Breathing",
    duration: "5 minutes",
    benefit: "Lowers stress hormones, steadies your heart rate, and prepares you for labour breathing.",
    safeFor: "All trimesters, anytime",
    steps: [
      "Sit or lie on your left side somewhere comfortable. Close your eyes.",
      "Breathe in slowly through your nose for 4 counts.",
      "Hold gently for 4 counts — do not strain.",
      "Breathe out slowly through your mouth for 6 counts.",
      "Repeat for 5 minutes. Follow the animation on your screen.",
    ],
  },
  {
    id: "neck-roll",
    name: "Neck Rolls",
    duration: "2 minutes",
    benefit: "Releases tension from your shoulders, neck, and upper back carried during pregnancy.",
    safeFor: "All trimesters",
    steps: [
      "Sit tall in a chair or cross-legged on the floor.",
      "Drop your right ear slowly toward your right shoulder. Breathe.",
      "Roll your chin down toward your chest, then up toward the left shoulder.",
      "Move slowly — never force or roll your head all the way back.",
      "Repeat 3 times each side. Stop if you feel any dizziness.",
    ],
  },
]

// ---- ANIMATED FIGURES ----

function PelvicTiltFigure() {
  return (
    <svg viewBox="0 0 190 280" className="w-full h-full" style={{ maxHeight: 280 }}>
      <defs>
        <linearGradient id="pt1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a8c4a"/>
          <stop offset="100%" stopColor="#1a4724"/>
        </linearGradient>
        <style>{`
          @keyframes ptTilt { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(3.5deg)} }
          @keyframes ptBelly { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
          @keyframes ptArmL { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-6deg)} }
          @keyframes ptArmR { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(6deg)} }
          @keyframes ptNod { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(2.5deg)} }
          @keyframes ptGlow { 0%,100%{opacity:0.06} 50%{opacity:0.18} }
          .pt-torso { transform-origin:95px 150px; animation:ptTilt 4s ease-in-out infinite; }
          .pt-belly { transform-origin:95px 168px; animation:ptBelly 4s ease-in-out infinite; }
          .pt-armL { transform-origin:72px 143px; animation:ptArmL 4s ease-in-out infinite; }
          .pt-armR { transform-origin:118px 143px; animation:ptArmR 4s ease-in-out infinite; }
          .pt-head { transform-origin:95px 90px; animation:ptNod 4s ease-in-out infinite; }
          .pt-glow { animation:ptGlow 4s ease-in-out infinite; }
        `}</style>
      </defs>
      {/* Wall line */}
      <line x1="22" y1="40" x2="22" y2="248" stroke="#c8d5c9" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="248" x2="172" y2="248" stroke="#c8d5c9" strokeWidth="2" strokeLinecap="round"/>
      {/* Feet */}
      <ellipse cx="86" cy="244" rx="11" ry="5" fill="#143820"/>
      <ellipse cx="106" cy="244" rx="11" ry="5" fill="#143820"/>
      {/* Legs */}
      <rect x="78" y="198" width="16" height="46" rx="8" fill="url(#pt1)"/>
      <rect x="96" y="198" width="16" height="46" rx="8" fill="#2a6b38"/>
      {/* Torso group */}
      <g className="pt-torso">
        <ellipse cx="95" cy="198" rx="24" ry="10" fill="url(#pt1)"/>
        <path d="M71 143 Q69 168 71 198 L119 198 Q121 168 119 143Z" fill="url(#pt1)"/>
        {/* Belly */}
        <g className="pt-belly">
          <ellipse cx="95" cy="168" rx="27" ry="28" fill="#2a6b38"/>
          <ellipse cx="95" cy="168" rx="20" ry="21" fill="#3a8c4a" opacity="0.3"/>
          <ellipse cx="89" cy="159" rx="9" ry="8" fill="rgba(255,255,255,0.07)"/>
        </g>
        {/* Chest */}
        <ellipse cx="95" cy="140" rx="21" ry="15" fill="#2a6b38"/>
        {/* Left arm */}
        <g className="pt-armL">
          <ellipse cx="59" cy="149" rx="8" ry="19" fill="url(#pt1)" transform="rotate(-10 59 149)"/>
          <ellipse cx="53" cy="166" rx="7" ry="6" fill="#216330"/>
          <ellipse cx="49" cy="181" rx="6.5" ry="14" fill="url(#pt1)" transform="rotate(-5 49 181)"/>
          <ellipse cx="47" cy="193" rx="6" ry="7" fill="#2a6b38"/>
        </g>
        {/* Right arm */}
        <g className="pt-armR">
          <ellipse cx="131" cy="149" rx="8" ry="19" fill="#2a6b38" transform="rotate(10 131 149)"/>
          <ellipse cx="137" cy="166" rx="7" ry="6" fill="#2a6b38"/>
          <ellipse cx="141" cy="181" rx="6.5" ry="14" fill="#2a6b38" transform="rotate(5 141 181)"/>
          <ellipse cx="143" cy="193" rx="6" ry="7" fill="#3a8c4a"/>
        </g>
      </g>
      {/* Neck */}
      <ellipse cx="95" cy="122" rx="9" ry="10" fill="#2a6b38"/>
      {/* Head */}
      <g className="pt-head">
        <ellipse cx="95" cy="92" rx="27" ry="29" fill="#2a6b38"/>
        <ellipse cx="67" cy="92" rx="3" ry="8" fill="rgba(0,0,0,0.1)"/>
        <ellipse cx="123" cy="92" rx="3" ry="8" fill="rgba(0,0,0,0.1)"/>
        <ellipse cx="67" cy="93" rx="5" ry="7.5" fill="url(#pt1)"/>
        <ellipse cx="123" cy="93" rx="5" ry="7.5" fill="#2a6b38"/>
        <ellipse cx="95" cy="67" rx="30" ry="20" fill="#143820"/>
        <ellipse cx="95" cy="65" rx="24" ry="16" fill="#1a4724"/>
        <ellipse cx="88" cy="61" rx="13" ry="10" fill="#216330" opacity="0.4"/>
      </g>
      {/* Edge glow */}
      <ellipse className="pt-glow" cx="68" cy="155" rx="3.5" ry="45" fill="rgba(78,154,91,0.07)"/>
      <ellipse className="pt-glow" cx="122" cy="155" rx="3.5" ry="45" fill="rgba(78,154,91,0.05)" style={{ animationDelay: "0.5s" }}/>
    </svg>
  )
}

function CatCowFigure() {
  return (
    <svg viewBox="0 0 240 200" className="w-full h-full" style={{ maxHeight: 200 }}>
      <defs>
        <linearGradient id="cc1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a8c4a"/>
          <stop offset="100%" stopColor="#1a4724"/>
        </linearGradient>
        <style>{`
          @keyframes ccSpine { 0%,100%{transform:translateY(0) scaleY(1)} 50%{transform:translateY(-6px) scaleY(0.93)} }
          @keyframes ccHead { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(15deg)} }
          @keyframes ccBelly { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
          .cc-spine { transform-origin:120px 100px; animation:ccSpine 4s ease-in-out infinite; }
          .cc-head { transform-origin:50px 90px; animation:ccHead 4s ease-in-out infinite; }
          .cc-belly { transform-origin:120px 115px; animation:ccBelly 4s ease-in-out infinite; }
        `}</style>
      </defs>
      {/* Floor */}
      <line x1="20" y1="170" x2="220" y2="170" stroke="#c8d5c9" strokeWidth="1.5"/>
      {/* Arms (left) */}
      <ellipse cx="54" cy="145" rx="7" ry="28" fill="#2a6b38"/>
      <ellipse cx="54" cy="170" rx="10" ry="5" fill="#143820"/>
      {/* Arms (right) */}
      <ellipse cx="186" cy="145" rx="7" ry="28" fill="#2a6b38"/>
      <ellipse cx="186" cy="170" rx="10" ry="5" fill="#143820"/>
      {/* Knees/legs */}
      <ellipse cx="90" cy="158" rx="8" ry="16" fill="#2a6b38"/>
      <ellipse cx="90" cy="170" rx="12" ry="6" fill="#143820"/>
      <ellipse cx="150" cy="158" rx="8" ry="16" fill="#2a6b38"/>
      <ellipse cx="150" cy="170" rx="12" ry="6" fill="#143820"/>
      {/* Torso/spine group */}
      <g className="cc-spine">
        <path d="M54 115 Q90 100 120 105 Q150 100 186 115" stroke="#1a4724" strokeWidth="22" strokeLinecap="round" fill="none"/>
        <path d="M54 115 Q90 100 120 105 Q150 100 186 115" stroke="#2a6b38" strokeWidth="16" strokeLinecap="round" fill="none"/>
        {/* Belly */}
        <g className="cc-belly">
          <ellipse cx="120" cy="118" rx="22" ry="18" fill="#3a8c4a"/>
          <ellipse cx="120" cy="118" rx="16" ry="13" fill="#4e9a5b" opacity="0.3"/>
          <ellipse cx="114" cy="112" rx="7" ry="6" fill="rgba(255,255,255,0.07)"/>
        </g>
      </g>
      {/* Head */}
      <g className="cc-head">
        <ellipse cx="44" cy="90" rx="22" ry="24" fill="#2a6b38"/>
        <ellipse cx="24" cy="90" rx="4" ry="7" fill="url(#cc1)"/>
        <ellipse cx="44" cy="68" rx="20" ry="13" fill="#143820"/>
        <ellipse cx="40" cy="65" rx="11" ry="8" fill="#1a4724" opacity="0.5"/>
      </g>
      {/* Tail suggestion */}
      <path d="M186 110 Q200 95 195 80" stroke="#2a6b38" strokeWidth="8" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function AnkleCircleFigure() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full" style={{ maxHeight: 240 }}>
      <defs>
        <linearGradient id="ac1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a8c4a"/>
          <stop offset="100%" stopColor="#1a4724"/>
        </linearGradient>
        <style>{`
          @keyframes acFoot { 0%{transform:rotate(0deg)} 25%{transform:rotate(25deg)} 50%{transform:rotate(0deg)} 75%{transform:rotate(-25deg)} 100%{transform:rotate(0deg)} }
          @keyframes acLeg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          .ac-foot { transform-origin:100px 195px; animation:acFoot 3s linear infinite; }
          .ac-leg { transform-origin:100px 160px; animation:acLeg 3s ease-in-out infinite; }
          @keyframes acCircle { 0%{stroke-dashoffset:150} 100%{stroke-dashoffset:0} }
          .ac-circle { stroke-dasharray:150; animation:acCircle 3s linear infinite; }
        `}</style>
      </defs>
      {/* Chair */}
      <rect x="30" y="140" width="140" height="8" rx="4" fill="#c8d5c9"/>
      <rect x="35" y="148" width="8" height="40" rx="4" fill="#c8d5c9"/>
      <rect x="157" y="148" width="8" height="40" rx="4" fill="#c8d5c9"/>
      <rect x="155" y="60" width="8" height="88" rx="4" fill="#c8d5c9"/>
      {/* Body torso */}
      <ellipse cx="100" cy="100" rx="28" ry="35" fill="#2a6b38"/>
      <ellipse cx="100" cy="80" rx="22" ry="16" fill="#3a8c4a" opacity="0.4"/>
      {/* Belly */}
      <ellipse cx="97" cy="108" rx="20" ry="18" fill="#3a8c4a"/>
      <ellipse cx="93" cy="102" rx="7" ry="6" fill="rgba(255,255,255,0.07)"/>
      {/* Left leg (resting) */}
      <rect x="60" y="138" width="18" height="50" rx="9" fill="url(#ac1)"/>
      <ellipse cx="69" cy="190" rx="12" ry="6" fill="#143820"/>
      {/* Right leg (raised + rotating) */}
      <g className="ac-leg">
        <rect x="122" y="138" width="18" height="42" rx="9" fill="#2a6b38"/>
      </g>
      {/* Rotating foot */}
      <g className="ac-foot">
        <ellipse cx="131" cy="190" rx="16" ry="8" fill="#1a4724"/>
        <ellipse cx="131" cy="190" rx="11" ry="5" fill="#143820"/>
      </g>
      {/* Circle trace */}
      <circle className="ac-circle" cx="131" cy="205" r="24" fill="none" stroke="rgba(78,154,91,0.3)" strokeWidth="2" strokeLinecap="round"/>
      {/* Head */}
      <ellipse cx="100" cy="55" rx="25" ry="27" fill="#2a6b38"/>
      <ellipse cx="100" cy="34" rx="22" ry="15" fill="#143820"/>
      <ellipse cx="94" cy="30" rx="12" ry="9" fill="#1a4724" opacity="0.45"/>
      {/* Arms resting */}
      <ellipse cx="65" cy="112" rx="8" ry="22" fill="url(#ac1)" transform="rotate(8 65 112)"/>
      <ellipse cx="135" cy="112" rx="8" ry="22" fill="#2a6b38" transform="rotate(-8 135 112)"/>
    </svg>
  )
}

function BreathingFigure() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full" style={{ maxHeight: 240 }}>
      <defs>
        <style>{`
          @keyframes brBelly { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
          @keyframes brChest { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.06)} }
          @keyframes brRing1 { 0%,100%{transform:scale(0.85);opacity:0.5} 50%{transform:scale(1.15);opacity:0.1} }
          @keyframes brRing2 { 0%,100%{transform:scale(0.8);opacity:0.35} 50%{transform:scale(1.2);opacity:0.08} }
          @keyframes brRing3 { 0%,100%{transform:scale(0.75);opacity:0.2} 50%{transform:scale(1.25);opacity:0.05} }
          .br-belly { transform-origin:100px 148px; animation:brBelly 4s ease-in-out infinite; }
          .br-chest { transform-origin:100px 118px; animation:brChest 4s ease-in-out infinite; }
          .br-r1 { transform-origin:100px 148px; animation:brRing1 4s ease-in-out infinite; }
          .br-r2 { transform-origin:100px 148px; animation:brRing2 4s ease-in-out 0.3s infinite; }
          .br-r3 { transform-origin:100px 148px; animation:brRing3 4s ease-in-out 0.6s infinite; }
        `}</style>
      </defs>
      {/* Breathing rings */}
      <circle className="br-r3" cx="100" cy="148" r="70" fill="none" stroke="rgba(78,154,91,0.15)" strokeWidth="1.5"/>
      <circle className="br-r2" cx="100" cy="148" r="52" fill="none" stroke="rgba(78,154,91,0.2)" strokeWidth="1.5"/>
      <circle className="br-r1" cx="100" cy="148" r="36" fill="none" stroke="rgba(78,154,91,0.3)" strokeWidth="1.5"/>
      {/* Body lying/sitting */}
      {/* Legs */}
      <ellipse cx="82" cy="205" rx="12" ry="28" fill="#2a6b38"/>
      <ellipse cx="82" cy="230" rx="14" ry="6" fill="#143820"/>
      <ellipse cx="118" cy="205" rx="12" ry="28" fill="#1a4724"/>
      <ellipse cx="118" cy="230" rx="14" ry="6" fill="#143820"/>
      {/* Belly — big breathing */}
      <g className="br-belly">
        <ellipse cx="100" cy="148" rx="30" ry="32" fill="#2a6b38"/>
        <ellipse cx="100" cy="148" rx="23" ry="25" fill="#3a8c4a" opacity="0.3"/>
        <ellipse cx="93" cy="137" rx="10" ry="9" fill="rgba(255,255,255,0.08)"/>
      </g>
      {/* Chest */}
      <g className="br-chest">
        <ellipse cx="100" cy="118" rx="23" ry="18" fill="#2a6b38"/>
      </g>
      {/* Arms */}
      <ellipse cx="66" cy="130" rx="8" ry="24" fill="#1a4724" transform="rotate(-12 66 130)"/>
      <ellipse cx="134" cy="130" rx="8" ry="24" fill="#1a4724" transform="rotate(12 134 130)"/>
      {/* Head */}
      <ellipse cx="100" cy="75" rx="26" ry="28" fill="#2a6b38"/>
      <ellipse cx="100" cy="53" rx="22" ry="15" fill="#143820"/>
      <ellipse cx="94" cy="49" rx="12" ry="9" fill="#1a4724" opacity="0.45"/>
      {/* Neck */}
      <ellipse cx="100" cy="98" rx="10" ry="11" fill="#2a6b38"/>
    </svg>
  )
}

function NeckRollFigure() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" style={{ maxHeight: 220 }}>
      <defs>
        <linearGradient id="nr1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a8c4a"/>
          <stop offset="100%" stopColor="#1a4724"/>
        </linearGradient>
        <style>{`
          @keyframes nrHead { 0%{transform:rotate(0deg)} 25%{transform:rotate(18deg)} 50%{transform:rotate(0deg)} 75%{transform:rotate(-18deg)} 100%{transform:rotate(0deg)} }
          @keyframes nrShoulderL { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(4deg)} 75%{transform:rotate(-4deg)} }
          @keyframes nrShoulderR { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-4deg)} 75%{transform:rotate(4deg)} }
          .nr-head { transform-origin:100px 72px; animation:nrHead 5s ease-in-out infinite; }
          .nr-shL { transform-origin:72px 118px; animation:nrShoulderL 5s ease-in-out infinite; }
          .nr-shR { transform-origin:128px 118px; animation:nrShoulderR 5s ease-in-out infinite; }
        `}</style>
      </defs>
      {/* Seated body */}
      <ellipse cx="100" cy="165" rx="30" ry="14" fill="#143820"/>
      <path d="M70 125 Q68 148 70 168 L130 168 Q132 148 130 125Z" fill="#2a6b38"/>
      {/* Belly */}
      <ellipse cx="98" cy="150" rx="22" ry="20" fill="#3a8c4a"/>
      <ellipse cx="93" cy="142" rx="8" ry="7" fill="rgba(255,255,255,0.07)"/>
      {/* Chest */}
      <ellipse cx="100" cy="122" rx="22" ry="16" fill="#2a6b38"/>
      {/* Shoulders */}
      <g className="nr-shL">
        <ellipse cx="60" cy="118" rx="10" ry="20" fill="url(#nr1)" transform="rotate(-15 60 118)"/>
        <ellipse cx="50" cy="138" rx="8" ry="6" fill="#216330"/>
        <ellipse cx="44" cy="153" rx="7" ry="15" fill="url(#nr1)"/>
        <ellipse cx="42" cy="166" rx="6" ry="7" fill="#2a6b38"/>
      </g>
      <g className="nr-shR">
        <ellipse cx="140" cy="118" rx="10" ry="20" fill="#2a6b38" transform="rotate(15 140 118)"/>
        <ellipse cx="150" cy="138" rx="8" ry="6" fill="#2a6b38"/>
        <ellipse cx="156" cy="153" rx="7" ry="15" fill="#2a6b38"/>
        <ellipse cx="158" cy="166" rx="6" ry="7" fill="#3a8c4a"/>
      </g>
      {/* Neck */}
      <ellipse cx="100" cy="108" rx="9" ry="10" fill="#2a6b38"/>
      {/* Head rolling */}
      <g className="nr-head">
        <ellipse cx="100" cy="74" rx="26" ry="28" fill="#2a6b38"/>
        <ellipse cx="74" cy="74" rx="3" ry="8" fill="rgba(0,0,0,0.1)"/>
        <ellipse cx="126" cy="74" rx="3" ry="8" fill="rgba(0,0,0,0.1)"/>
        <ellipse cx="74" cy="75" rx="5" ry="7.5" fill="url(#nr1)"/>
        <ellipse cx="126" cy="75" rx="5" ry="7.5" fill="#2a6b38"/>
        <ellipse cx="100" cy="51" rx="28" ry="19" fill="#143820"/>
        <ellipse cx="100" cy="49" rx="22" ry="14" fill="#1a4724"/>
        <ellipse cx="93" cy="45" rx="12" ry="9" fill="#216330" opacity="0.4"/>
        {/* Arc showing neck roll path */}
        <path d="M74 74 Q100 90 126 74" stroke="rgba(78,154,91,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
      </g>
    </svg>
  )
}

const FIGURES: Record<string, React.ReactNode> = {
  "pelvic-tilt": <PelvicTiltFigure />,
  "cat-cow": <CatCowFigure />,
  "ankle-circle": <AnkleCircleFigure />,
  "breathing": <BreathingFigure />,
  "neck-roll": <NeckRollFigure />,
}

export default function MovePage() {
  const { user } = useAppStore()
  const [selected, setSelected] = useState<string | null>(null)
  const [step, setStep] = useState(0)

  const exercise = EXERCISES.find((e) => e.id === selected)

  if (exercise) {
    return (
      <div className="min-h-dvh flex flex-col bg-[#0d1f12] pb-24">
        {/* Back */}
        <header className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3">
          <button onClick={() => { setSelected(null); setStep(0) }}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div>
            <h1 className="font-display font-bold text-white text-lg leading-tight">{exercise.name}</h1>
            <p className="text-xs text-green-400/70">{exercise.safeFor}</p>
          </div>
        </header>

        {/* Figure stage */}
        <div className="relative mx-4 rounded-3xl overflow-hidden flex items-center justify-center"
          style={{ background: "linear-gradient(180deg, #0d1f12 0%, #122a18 60%, #0d1f12 100%)", height: 300 }}>
          {/* Ambient rings */}
          {[80, 130, 180].map((r, i) => (
            <div key={i} className="absolute rounded-full border border-green-500/10 animate-breathe"
              style={{ width: r * 2, height: r * 2, animationDelay: `${i * 0.35}s` }} />
          ))}
          {/* Ground shadow */}
          <div className="absolute bottom-10 w-20 h-2 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(47,125,62,0.3) 0%, transparent 70%)" }} />
          <div className="relative z-10 w-full h-full flex items-center justify-center px-8">
            {FIGURES[exercise.id]}
          </div>
          {/* Phase pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-900/60 border border-green-700/40 text-green-300 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
            {step === 0 ? "Get ready" : `Step ${step} of ${exercise.steps.length}`}
          </div>
        </div>

        {/* Steps */}
        <div className="px-4 pt-5 flex flex-col gap-2.5 flex-1">
          {exercise.steps.map((s, i) => (
            <div key={i} onClick={() => setStep(i)}
              className={cn("flex gap-3 items-start p-3.5 rounded-2xl cursor-pointer transition-all",
                i === step ? "bg-green-900/40 border border-green-700/40" : "bg-white/5 border border-white/5")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5",
                i === step ? "bg-green-600 text-white" : "bg-white/10 text-green-500/60")}>
                {i + 1}
              </div>
              <p className={cn("text-sm leading-relaxed pt-0.5", i === step ? "text-green-100" : "text-green-800/60")}>{s}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="px-4 pt-4 flex items-center gap-3">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="w-11 h-11 rounded-full border border-green-700/40 bg-white/5 text-green-400 flex items-center justify-center disabled:opacity-20 active:bg-white/10 text-lg">←</button>
          <div className="flex-1 h-1 bg-green-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-400"
              style={{ width: `${((step + 1) / exercise.steps.length) * 100}%` }} />
          </div>
          <span className="text-xs text-green-700 font-semibold min-w-8 text-right">{step + 1}/{exercise.steps.length}</span>
          <button onClick={() => setStep(Math.min(exercise.steps.length - 1, step + 1))} disabled={step === exercise.steps.length - 1}
            className="w-11 h-11 rounded-full border border-green-700/40 bg-white/5 text-green-400 flex items-center justify-center disabled:opacity-20 active:bg-white/10 text-lg">→</button>
        </div>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Move</h1>
        <p className="text-sm text-stone-500 mt-0.5">Gentle exercises, just for you{user?.name ? `, ${user.name}` : ""}</p>
      </header>

      <div className="px-4 pt-4 space-y-3">
        <div className="bg-forest-50 border border-forest-100 rounded-2xl px-4 py-3 mb-4">
          <p className="text-xs text-forest-700 font-medium">
            All exercises here are safe during pregnancy. Always stop if something feels wrong and talk to your midwife.
          </p>
        </div>

        {EXERCISES.map((ex) => (
          <button key={ex.id} onClick={() => { setSelected(ex.id); setStep(0) }}
            className="w-full card text-left hover:shadow-warm transition-shadow active:scale-[0.99]">
            <div className="flex items-start gap-4">
              {/* Mini preview figure */}
              <div className="w-16 h-16 rounded-2xl bg-[#0d1f12] flex items-center justify-center flex-shrink-0 overflow-hidden">
                <div className="w-12 h-12 scale-75 opacity-90">
                  {FIGURES[ex.id]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-stone-800">{ex.name}</h3>
                  <span className="text-xs text-stone-400 shrink-0">{ex.duration}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{ex.benefit}</p>
                <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full">
                  {ex.safeFor}
                </span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-stone-300 flex-shrink-0 mt-1">
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
