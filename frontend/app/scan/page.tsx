"use client"

import { useState, useRef } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { checkDrug, type DrugCheckResponse } from "@/lib/api/client"
import { cn } from "@/lib/utils/cn"

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  )
}

function UploadIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SpinnerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.2"/>
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

const VERDICT = {
  safe: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", label: "Safe", dot: "bg-green-500" },
  caution: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Use with caution", dot: "bg-amber-500" },
  avoid: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Avoid", dot: "bg-red-500" },
  unknown: { bg: "bg-stone-50", border: "border-stone-200", text: "text-stone-600", label: "Not sure, ask a clinician", dot: "bg-stone-400" },
}

export default function ScanPage() {
  const [drugName, setDrugName] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [withFood, setWithFood] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DrugCheckResponse | null>(null)
  const [error, setError] = useState("")
  const cameraRef = useRef<HTMLInputElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)

  const runCheck = async () => {
    setLoading(true)
    setShowModal(false)
    setError("")
    try {
      const res = await checkDrug({
        drug_name: drugName.trim(),
        dosage,
        frequency,
        with_food: withFood,
      })
      setResult(res)
    } catch {
      setError("Could not check that medicine right now. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setDrugName("")
    setDosage("")
    setFrequency("")
    setWithFood(false)
    setResult(null)
    setError("")
  }

  const handleImageCapture = (file: File | null) => {
    if (!file) return
    // Image captured -- user can still edit name manually
    // We do not run OCR. Just acknowledge the capture.
    setDrugName((prev) => prev || "")
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Medicine Check</h1>
        <p className="text-sm text-stone-500 mt-0.5">Is this drug safe for you and baby?</p>
      </header>

      {/* Hidden file inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={(e) => handleImageCapture(e.target.files?.[0] ?? null)} />
      <input ref={uploadRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => handleImageCapture(e.target.files?.[0] ?? null)} />

      <div className="px-4 pt-4">
        {!result ? (
          <>
            <div className="card mb-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  What is the medicine called?
                </label>
                <input
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && drugName.trim()) setShowModal(true) }}
                  placeholder="e.g. Panadol, Amoxicillin, Folic acid"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-forest-100 transition-all"
                  autoCapitalize="words"
                />
              </div>

              {/* Camera and upload buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => cameraRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-stone-100 text-stone-600 font-medium rounded-xl py-2.5 text-xs active:bg-stone-200 transition-colors">
                  <CameraIcon className="w-4 h-4" />
                  Take photo
                </button>
                <button onClick={() => uploadRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-stone-100 text-stone-600 font-medium rounded-xl py-2.5 text-xs active:bg-stone-200 transition-colors">
                  <UploadIcon className="w-4 h-4" />
                  Upload image
                </button>
              </div>

              <p className="text-[11px] text-stone-400 text-center">
                Type the drug name above. Camera or file upload can help you read the pack.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={() => setShowModal(true)}
              disabled={!drugName.trim() || loading}
              className="w-full bg-forest-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <><SpinnerIcon className="w-4 h-4" />Checking...</>
              ) : "Check this medicine"}
            </button>
          </>
        ) : (
          <>
            <div className="card mb-3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">Results for</p>
                  <h2 className="font-display font-bold text-2xl text-stone-800">{result.drug}</h2>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                {/* Pregnancy verdict */}
                <div className={cn("rounded-2xl border p-4", VERDICT[result.pregnancy].bg, VERDICT[result.pregnancy].border)}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-stone-600">During pregnancy</span>
                    <span className={cn("flex items-center gap-2 text-sm font-bold shrink-0", VERDICT[result.pregnancy].text)}>
                      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", VERDICT[result.pregnancy].dot)} />
                      {VERDICT[result.pregnancy].label}
                    </span>
                  </div>
                </div>

                {/* Breastfeeding verdict */}
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

              {/* Lami's note */}
              <div className="bg-forest-50 border border-forest-100 rounded-2xl p-4">
                <p className="text-xs font-semibold text-forest-600 mb-1">Lami says</p>
                <p className="text-sm text-forest-900 leading-relaxed">{result.note}</p>
              </div>

              {/* What she told us */}
              {(result.user_dosage || result.user_frequency) && (
                <div className="mt-3 pt-3 border-t border-stone-100">
                  <p className="text-xs text-stone-400 mb-1.5 font-medium">Based on what you told me</p>
                  <div className="flex flex-wrap gap-2">
                    {result.user_dosage && (
                      <span className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">
                        {result.user_dosage}
                      </span>
                    )}
                    {result.user_frequency && (
                      <span className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">
                        {result.user_frequency}
                      </span>
                    )}
                    {result.with_food && (
                      <span className="bg-stone-100 text-stone-600 text-xs px-3 py-1 rounded-full">
                        With food
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="card mb-3 bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-800 leading-relaxed">
                This is guidance to help you, not a prescription. Always confirm with your pharmacist or doctor before starting or stopping any medicine.
              </p>
            </div>

            <button onClick={reset}
              className="w-full bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl py-3.5 text-sm active:bg-stone-50 transition-colors">
              Check another medicine
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-[32px] px-6 pt-5 pb-8 pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mb-5" />

            <h2 className="font-display font-bold text-xl text-stone-800 mb-1">
              A few details
            </h2>
            <p className="text-sm text-stone-500 mb-5">
              Tell me how you take {drugName} so I can give you better advice.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Dose
                </label>
                <input
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 500mg, 2 tablets, 1 spoon"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-forest-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  How often?
                </label>
                <input
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. twice a day, every 8 hours"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-forest-100"
                />
              </div>

              {/* Fixed toggle - proper layout, no overflow */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Do you take it with food?
                </label>
                <button
                  type="button"
                  onClick={() => setWithFood((v) => !v)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all",
                    withFood
                      ? "border-forest-400 bg-forest-50"
                      : "border-stone-200 bg-white"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    withFood ? "text-forest-700" : "text-stone-500"
                  )}>
                    {withFood ? "Yes, with food" : "No, without food"}
                  </span>

                  {/* Toggle track */}
                  <div className={cn(
                    "relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-200",
                    withFood ? "bg-forest-500" : "bg-stone-300"
                  )}>
                    {/* Toggle thumb */}
                    <div className={cn(
                      "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200",
                      withFood ? "left-6" : "left-0.5"
                    )} />
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={runCheck}
              className="mt-6 w-full bg-forest-600 text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors"
            >
              Check it for me
            </button>
            <button
              onClick={() => { setShowModal(false); setTimeout(runCheck, 50) }}
              className="mt-2 w-full text-stone-400 text-sm py-2 hover:text-stone-600 transition-colors"
            >
              Skip, just check the name
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
