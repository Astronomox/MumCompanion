export const RED_FLAG_SYMPTOMS = [
  "heavy bleeding",
  "severe headache",
  "reduced fetal movement",
  "baby not moving",
  "severe abdominal pain",
  "vision changes",
  "blurred vision",
  "seeing spots",
  "persistent vomiting",
  "chest pain",
  "difficulty breathing",
  "sudden swelling",
  "high fever",
  "seizure",
  "loss of consciousness",
  "fluid leaking",
  "water broke",
  "cord prolapse",
]

export const WEEK_TO_STAGE: Record<number, string> = Object.fromEntries([
  ...Array.from({ length: 13 }, (_, i) => [i + 1, "first_trimester"]),
  ...Array.from({ length: 14 }, (_, i) => [i + 14, "second_trimester"]),
  ...Array.from({ length: 13 }, (_, i) => [i + 28, "third_trimester"]),
])

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" },
  { code: "ha", label: "Hausa" },
]
