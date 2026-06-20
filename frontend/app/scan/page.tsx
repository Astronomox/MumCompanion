"use client"

import { useState, useRef, useCallback } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { checkDrug, type DrugCheckResponse } from "@/lib/api/client"
import { cn } from "@/lib/utils/cn"

type Stage = "idle" | "preview" | "checking" | "result"

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2.2"/>
    </svg>
  )
}
function UploadIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function SpinnerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}
function CloseIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>
}
function CheckBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
      <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function RetakeIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M3 12a9 9 0 1 0 3-6.7M3 5v5h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

const VERDICT = {
  safe: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", label: "Safe", dot: "bg-green-500" },
  caution: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Use with caution", dot: "bg-amber-500" },
  avoid: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Avoid", dot: "bg-red-500" },
  unknown: { bg: "bg-stone-50", border: "border-stone-200", text: "text-stone-600", label: "Not sure, ask a clinician", dot: "bg-stone-400" },
}

const CHECK_STEPS = [
  "Reading the medicine name...",
  "Checking pregnancy safety data...",
  "Checking breastfeeding safety...",
  "Putting together Lami's advice...",
]

export default function ScanPage() {
  const [stage, setStage] = useState<Stage>("idle")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [drugName, setDrugName] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalClosing, setModalClosing] = useState(false)
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [withFood, setWithFood] = useState(false)
  const [result, setResult] = useState<DrugCheckResponse | null>(null)
  const [error, setError] = useState("")
  const [checkStepIndex, setCheckStepIndex] = useState(0)
  const cameraRef = useRef<HTMLInputElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)
  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleImageCapture = useCallback((file: File | null) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setImagePreview(url)
    setStage("preview")
    setError("")
  }, [])

  const openModal = () => {
    setModalClosing(false)
    setShowModal(true)
  }

  const closeModal = (cb?: () => void) => {
    setModalClosing(true)
    setTimeout(() => {
      setShowModal(false)
      setModalClosing(false)
      cb?.()
    }, 220)
  }

  const startCheckAnimation = () => {
    setCheckStepIndex(0)
    let i = 0
    stepTimerRef.current = setInterval(() => {
      i = Math.min(i + 1, CHECK_STEPS.length - 1)
      setCheckStepIndex(i)
    }, 700)
  }

  const stopCheckAnimation = () => {
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current)
      stepTimerRef.current = null
    }
  }

  const runCheck = async () => {
    closeModal(async () => {
      setStage("checking")
      setError("")
      startCheckAnimation()
      try {
        const res = await checkDrug({
          drug_name: drugName.trim(),
          dosage,
          frequency,
          with_food: withFood,
        })
        await new Promise((r) => setTimeout(r, 600))
        setResult(res)
        setStage("result")
      } catch {
        setError("Could not check that medicine right now. Please try again.")
        setStage("idle")
      } finally {
        stopCheckAnimation()
      }
    })
  }

  const reset = () => {
    setDrugName("")
    setDosage("")
    setFrequency("")
    setWithFood(false)
    setResult(null)
    setError("")
    setImagePreview(null)
    setStage("idle")
  }

  const retakePhoto = () => {
    setImagePreview(null)
    setStage("idle")
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Medicine Check</h1>
        <p className="text-sm text-stone-500 mt-0.5">Is this drug safe for you and baby?</p>
      </header>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => handleImageCapture(e.target.files?.[0] ?? null)} />
      <input ref={uploadRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => handleImageCapture(e.target.files?.[0] ?? null)} />

      <div className="px-4 pt-4">

        {/* ---- IDLE: capture buttons ---- */}
        {stage === "idle" && (
          <>
            <div className="card mb-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  What is the medicine called?
                </label>
                <input
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && drugName.trim()) openModal() }}
                  placeholder="e.g. Panadol, Amoxicillin, Folic acid"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-forest-100 transition-all"
                  autoCapitalize="words"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => cameraRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-stone-100 text-stone-600 font-medium rounded-xl py-3 text-xs active:bg-stone-200 transition-colors">
                  <CameraIcon className="w-4 h-4" />
                  Take photo
                </button>
                <button onClick={() => uploadRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-stone-100 text-stone-600 font-medium rounded-xl py-3 text-xs active:bg-stone-200 transition-colors">
                  <UploadIcon className="w-4 h-4" />
                  Upload image
                </button>
              </div>

              <p className="text-[11px] text-stone-400 text-center">
                Snap the pack or type the name. Either works.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={openModal}
              disabled={!drugName.trim()}
              className="w-full bg-forest-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors"
            >
              Check this medicine
            </button>
          </>
        )}

        {/* ---- PREVIEW: show captured image before checking ---- */}
        {stage === "preview" && imagePreview && (
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 shadow-lg" style={{ aspectRatio: "4/3" }}>
              <img src={imagePreview} alt="Captured medicine" className="w-full h-full object-cover" />
              {/* Scan corner brackets for that "scanning" feel */}
              <div className="absolute inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-white/80 rounded-tl-lg" style={{ borderTopWidth: 3, borderLeftWidth: 3 }} />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-white/80 rounded-tr-lg" style={{ borderTopWidth: 3, borderRightWidth: 3 }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-white/80 rounded-bl-lg" style={{ borderBottomWidth: 3, borderLeftWidth: 3 }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-white/80 rounded-br-lg" style={{ borderBottomWidth: 3, borderRightWidth: 3 }} />
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                <CheckBadge className="w-3 h-3" />
                Image loaded
              </div>
              <button onClick={retakePhoto}
                className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center active:bg-black/70 transition-colors">
                <RetakeIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="card">
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Confirm or correct the medicine name
              </label>
              <input
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                autoFocus
                placeholder="Type what you see on the pack"
                className="w-full bg-stone-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-forest-100 transition-all"
              />
              <p className="text-[11px] text-stone-400 mt-2">
                We do not auto-read packs yet, just confirm the name you can see.
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={retakePhoto}
                className="flex-1 bg-white border border-stone-200 text-stone-600 font-semibold rounded-2xl py-3.5 text-sm active:bg-stone-50 transition-colors">
                Retake
              </button>
              <button onClick={openModal} disabled={!drugName.trim()}
                className="flex-[2] bg-forest-600 disabled:bg-stone-300 text-white font-semibold rounded-2xl py-3.5 text-sm active:bg-forest-700 transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ---- CHECKING: animated progress ---- */}
        {stage === "checking" && (
          <div className="flex flex-col items-center justify-center py-16">
            {imagePreview && (
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src={imagePreview} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-forest-600/20 animate-pulse" />
              </div>
            )}
            <SpinnerIcon className="w-10 h-10 text-forest-500 mb-5" />
            <p className="text-base font-semibold text-stone-800 mb-1">{drugName}</p>
            <p className="text-sm text-stone-500 transition-all duration-300">{CHECK_STEPS[checkStepIndex]}</p>
            <div className="flex gap-1.5 mt-5">
              {CHECK_STEPS.map((_, i) => (
                <div key={i} className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i <= checkStepIndex ? "w-6 bg-forest-500" : "w-1.5 bg-stone-200"
                )} />
              ))}
            </div>
          </div>
        )}

        {/* ---- RESULT ---- */}
        {stage === "result" && result && (
          <>
            <div className="card mb-3">
              <div className="flex items-start gap-3 mb-4">
                {imagePreview && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Results for</p>
                  <h2 className="font-display font-bold text-2xl text-stone-800">{result.drug}</h2>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className={cn("rounded-2xl border p-4", VERDICT[result.pregnancy].bg, VERDICT[result.pregnancy].border)}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-stone-600">During pregnancy</span>
                    <span className={cn("flex items-center gap-2 text-sm font-bold shrink-0", VERDICT[result.pregnancy].text)}>
                      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", VERDICT[result.pregnancy].dot)} />
                      {VERDICT[result.pregnancy].label}
                    </span>
                  </div>
                </div>

                <div className={cn("rounded-2xl border p-4", VERDICT[result.breastfeeding].bg, VERDICT[result.breastfeeding].border)}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-stone-600">While breastfeeding</span>
                    <span className={cn("flex items-center gap-2 text-sm font-bold shrink-0", VERDICT[result.breastfeeding].text)}>
                      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", VERDICT[result.breastfeeding].dot)} />
                      {VERDICT[result.breastfeeding].label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-forest-50 border border-forest-100 rounded-2xl p-4">
                <p className="text-xs font-semibold text-forest-600 mb-1">Lami says</p>
                <p className="text-sm text-forest-900 leading-relaxed">{result.note}</p>
              </div>

              {(result.user_dosage || result.user_frequency) && (
                <div className="mt-3 pt-3 border-t border-stone-100">
                  <p className="text-xs text-stone-400 mb-1.5 font-medium">Based on what you told me</p>
                  <div className="flex flex-wrap gap-2">
                    {result.user_dosage && <span className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">{result.user_dosage}</span>}
                    {result.user_frequency && <span className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">{result.user_frequency}</span>}
                    {result.with_food && <span className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">With food</span>}
                  </div>
                </div>
              )}
            </div>

            <div className="card mb-3 bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-800 leading-relaxed">
                This is guidance, not a prescription. Always confirm with your pharmacist or doctor.
              </p>
            </div>

            <button onClick={reset}
              className="w-full bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl py-3.5 text-sm active:bg-stone-50 transition-colors">
              Check another medicine
            </button>
          </>
        )}
      </div>

      {/* ---- MODAL with proper open/close animation ---- */}
      {showModal && (
        <div
          className={cn(
            "fixed inset-0 z-[60] flex items-end justify-center bg-black/40 transition-opacity duration-200",
            modalClosing ? "opacity-0" : "opacity-100"
          )}
          onClick={() => closeModal()}
        >
          <div
            className={cn(
              "w-full max-w-md bg-white rounded-t-[32px] px-6 pt-5 pb-8 pb-safe transition-transform duration-220",
              modalClosing ? "translate-y-full" : "translate-y-0"
            )}
            style={{ transitionTimingFunction: modalClosing ? "cubic-bezier(0.4,0,1,1)" : "cubic-bezier(0.16,1,0.3,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display font-bold text-xl text-stone-800">A few details</h2>
              <button onClick={() => closeModal()} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 active:bg-stone-200">
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-stone-500 mb-5">
              Tell me how you take {drugName} so I can give you better advice.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Dose</label>
                <input value={dosage} onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 500mg, 2 tablets, 1 spoon"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-forest-100" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">How often?</label>
                <input value={frequency} onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. twice a day, every 8 hours"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-forest-100" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Do you take it with food?</label>
                <button type="button" onClick={() => setWithFood((v) => !v)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all",
                    withFood ? "border-forest-400 bg-forest-50" : "border-stone-200 bg-white"
                  )}>
                  <span className={cn("text-sm font-medium transition-colors", withFood ? "text-forest-700" : "text-stone-500")}>
                    {withFood ? "Yes, with food" : "No, without food"}
                  </span>
                  <div className={cn("relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-200", withFood ? "bg-forest-500" : "bg-stone-300")}>
                    <div className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200", withFood ? "left-6" : "left-0.5")} />
                  </div>
                </button>
              </div>
            </div>

            <button onClick={runCheck}
              className="mt-6 w-full bg-forest-600 text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors">
              Check it for me
            </button>
            <button onClick={runCheck}
              className="mt-2 w-full text-stone-400 text-sm py-2 hover:text-stone-600 transition-colors">
              Skip, just check the name
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
