export type PregnancyStage = "first_trimester" | "second_trimester" | "third_trimester" | "postpartum"

export type TriageTier = "normal" | "see_clinic" | "urgent"

export interface UserProfile {
  id: string
  name: string
  dueDate?: string
  deliveryDate?: string
  stage: PregnancyStage
  weekNumber: number
  weeklyBudget: number
  preferredLanguage: "en" | "yo" | "ig" | "ha"
  createdAt: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  triageTier?: TriageTier
  timestamp: string
  mode: "symptom" | "nutrition" | "general"
}

export interface MealPlan {
  id: string
  userId: string
  weekStart: string
  budget: number
  days: DayPlan[]
  totalCost: number
  generatedAt: string
}

export interface DayPlan {
  day: number
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks: Meal[]
  totalNaira: number
  nutrients: NutrientSummary
}

export interface Meal {
  name: string
  description: string
  costNaira: number
  ingredients: string[]
  portionNotes: string
}

export interface NutrientSummary {
  calories: number
  protein: number
  iron: number
  folate: number
  calcium: number
  vitaminC: number
}

export interface WeeklyContent {
  week: number
  phase: "pregnancy" | "postpartum"
  title: string
  babySize: string
  babyDevelopment: string
  motherChanges: string[]
  nutritionTips: string[]
  warningSignsThisWeek: string[]
  affirmation: string
}

export interface SymptomResponse {
  answer: string
  tier: TriageTier
  triageReason?: string
  redFlagMatched?: string
}
