import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserProfile {
  id: string
  name: string
  stage: string
  week: number
  weeklyBudget: number
  preferredLanguage: string
  dueDate?: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  tier?: "normal" | "see_clinic" | "urgent"
  mode: string
  timestamp: string
}

interface AppState {
  user: UserProfile | null
  messages: ChatMessage[]
  chatMode: "general" | "symptom" | "nutrition"

  setUser: (user: UserProfile) => void
  addMessage: (msg: ChatMessage) => void
  clearMessages: () => void
  setChatMode: (mode: "general" | "symptom" | "nutrition") => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      messages: [],
      chatMode: "general",

      setUser: (user) => set({ user }),
      addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),
      clearMessages: () => set({ messages: [] }),
      setChatMode: (mode) => set({ chatMode: mode }),
    }),
    {
      name: "mum-companion-store",
      partialize: (state) => ({
        user: state.user,
        messages: state.messages.slice(-50), // keep last 50 messages
      }),
    }
  )
)
