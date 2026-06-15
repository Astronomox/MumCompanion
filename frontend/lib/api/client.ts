const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export interface ChatPayload {
  messages: { role: "user" | "assistant"; content: string }[]
  mode: "symptom" | "nutrition" | "general" | "scan"
  name: string
  stage: string
  week: number
  baby_name?: string
  language?: string
}

export interface ChatResponse {
  answer: string
  tier: "normal" | "see_clinic" | "urgent"
  triage_reason?: string
  red_flag_matched?: string
}

export function sendChat(payload: ChatPayload): Promise<ChatResponse> {
  return apiFetch("/chat/", { method: "POST", body: JSON.stringify(payload) })
}

export interface DrugCheckPayload {
  drug_name: string
  dosage?: string
  frequency?: string
  with_food?: boolean
}

export interface DrugCheckResponse {
  drug: string
  pregnancy: "safe" | "caution" | "avoid" | "unknown"
  breastfeeding: "safe" | "caution" | "avoid" | "unknown"
  note: string
  user_dosage?: string
  user_frequency?: string
  with_food?: boolean
}

export function checkDrug(payload: DrugCheckPayload): Promise<DrugCheckResponse> {
  return apiFetch("/medication/check", { method: "POST", body: JSON.stringify(payload) })
}

export function generateMealPlan(payload: { weekly_budget: number; stage: string; week: number; dietary_notes?: string }): Promise<unknown> {
  return apiFetch("/planner/generate", { method: "POST", body: JSON.stringify(payload) })
}

export function getWeekContent(week: number, phase = "pregnancy"): Promise<unknown> {
  return apiFetch(`/journey/week/${week}?phase=${phase}`)
}
