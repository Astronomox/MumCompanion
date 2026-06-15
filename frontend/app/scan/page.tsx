"use client"

import { useState, useRef } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { checkDrug, type DrugCheckResponse } from "@/lib/api/client"
import { cn } from "@/lib/utils/cn"

function CameraIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className}><path d="M3 8 a2 2 0 0 1 2 -2 h2 l1.5 -2 h7 L17 6 h2 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7"/></svg>
}

const verdictStyle = {
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
  const fileRef = useRef<HTMLInputElement>(null)

  const openModal = () => {
    if (!drugName.trim()) return
    setShowModal(true)
  }

  const runCheck = async () => {
    setLoading(true)
    setShowModal(false)
    try {
      const res = await checkDrug({ drug_name: drugName.trim(), dosage, frequency, with_food: withFood })
      setResult(res)
    } catch {
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setDrugName(""); setDosage(""); setFrequency(""); setWithFood(false); setResult(null)
  }

  return (
    <div className="min-h-dvh bg-cream-50 pb-24">
      <header className="bg-white border-b border-stone-100 px-4 py-4 pt-safe">
        <h1 className="font-display font-bold text-xl text-stone-800">Medicine Check</h1>
        <p className="text-sm text-stone-500 mt-0.5">Find out if a drug is safe for you and baby</p>
      </header>

      <div className="px-4 pt-4">
        {!result ? (
          <>
            <div className="card mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-2">What is the medicine called?</label>
              <input
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                placeholder="e.g. Panadol, Amoxicillin, Folic acid"
                className="w-full bg-stone-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-forest-100"
              />

              {/* Camera assist - optional, never required */}
              <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
                onChange={() => { /* camera assist only reads if possible; user still confirms name */ }} />
              <button onClick={() => fileRef.current?.click()}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-sage-100 text-forest-700 font-medium rounded-2xl py-3 text-sm active:bg-sage-200">
                <CameraIcon className="w-5 h-5" />
                Snap the pack to help me read it
              </button>
              <p className="text-[11px] text-stone-400 mt-2 text-center">
                You can always type the name yourself if the photo is not clear
              </p>
            </div>

            <button onClick={openModal} disabled={!drugName.trim() || loading}
              className="w-full bg-forest-600 disabled:bg-stone-300 text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700 transition-colors">
              {loading ? "Checking..." : "Check this medicine"}
            </button>
          </>
        ) : (
          <>
            <div className="card mb-3">
              <h2 className="font-display font-bold text-xl text-stone-800 mb-4">{result.drug}</h2>

              <div className="space-y-3">
                <div className={cn("rounded-2xl border p-4", verdictStyle[result.pregnancy].bg, verdictStyle[result.pregnancy].border)}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-600">During pregnancy</span>
                    <span className={cn("flex items-center gap-2 text-sm font-bold", verdictStyle[result.pregnancy].text)}>
                      <span className={cn("w-2 h-2 rounded-full", verdictStyle[result.pregnancy].dot)} />
                      {verdictStyle[result.pregnancy].label}
                    </span>
                  </div>
                </div>

                <div className={cn("rounded-2xl border p-4", verdictStyle[result.breastfeeding].bg, verdictStyle[result.breastfeeding].border)}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-600">While breastfeeding</span>
                    <span className={cn("flex items-center gap-2 text-sm font-bold", verdictStyle[result.breastfeeding].text)}>
                      <span className={cn("w-2 h-2 rounded-full", verdictStyle[result.breastfeeding].dot)} />
                      {verdictStyle[result.breastfeeding].label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-forest-50 rounded-2xl p-4">
                <p className="text-sm text-forest-800 leading-relaxed">{result.note}</p>
              </div>

              {(result.user_dosage || result.user_frequency) && (
                <div className="mt-4 border-t border-stone-100 pt-3">
                  <p className="text-xs text-stone-400 mb-1">What you told me</p>
                  <p className="text-sm text-stone-600">
                    {result.user_dosage && `Dose: ${result.user_dosage}. `}
                    {result.user_frequency && `How often: ${result.user_frequency}. `}
                    {result.with_food ? "Taken with food." : ""}
                  </p>
                </div>
              )}
            </div>

            <div className="card mb-3 bg-amber-50 border-amber-100">
              <p className="text-xs text-amber-800">
                This is guidance to help you, not a prescription. Always confirm with your pharmacist or clinician before starting or stopping any medicine.
              </p>
            </div>

            <button onClick={reset} className="w-full bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl py-3.5 text-sm">
              Check another medicine
            </button>
          </>
        )}
      </div>

      {/* Self-fill dosage modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md bg-white rounded-t-4xl p-6 pb-safe animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mb-5" />
            <h2 className="font-display font-bold text-lg text-stone-800 mb-1">A few details</h2>
            <p className="text-sm text-stone-500 mb-5">Tell me how you take {drugName}, so I can give you better advice.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Dose (what is written or what you take)</label>
                <input value={dosage} onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 500mg, 2 tablets, 1 spoon"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">How often?</label>
                <input value={frequency} onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. twice a day, every 8 hours"
                  className="w-full bg-stone-100 rounded-2xl px-4 py-3 text-sm outline-none" />
              </div>
              <button onClick={() => setWithFood((v) => !v)}
                className={cn("w-full flex items-center justify-between rounded-2xl px-4 py-3 border-2 transition-colors",
                  withFood ? "border-forest-400 bg-forest-50" : "border-stone-200 bg-white")}>
                <span className="text-sm font-medium text-stone-700">I take it with food</span>
                <span className={cn("w-11 h-6 rounded-full transition-colors relative", withFood ? "bg-forest-500" : "bg-stone-300")}>
                  <span className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform", withFood ? "translate-x-5" : "translate-x-0.5")} />
                </span>
              </button>
            </div>

            <button onClick={runCheck} className="mt-6 w-full bg-forest-600 text-white font-semibold rounded-2xl py-4 text-sm active:bg-forest-700">
              Check it for me
            </button>
            <button onClick={() => { setShowModal(false); setTimeout(runCheck, 50) }} className="mt-2 w-full text-stone-400 text-sm py-2">
              Skip, just check the name
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
