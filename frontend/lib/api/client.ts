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

// Chat
export interface ChatPayload {
  messages: { role: "user" | "assistant"; content: string }[]
  mode: "symptom" | "nutrition" | "general"
  stage: string
  week: number
}

export interface ChatResponse {
  answer: string
  tier: "normal" | "see_clinic" | "urgent"
  triage_reason?: string
  red_flag_matched?: string
}

export function sendChat(payload: ChatPayload): Promise<ChatResponse> {
  return apiFetch("/chat/", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

// Meal planner
export interface PlannerPayload {
  weekly_budget: number
  stage: string
  week: number
  dietary_notes?: string
}

export function generateMealPlan(payload: PlannerPayload): Promise<unknown> {
  return apiFetch("/planner/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

// Journey
export function getWeekContent(week: number, phase = "pregnancy"): Promise<unknown> {
  return apiFetch(`/journey/week/${week}?phase=${phase}`)
}
