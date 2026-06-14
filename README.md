# Mum Companion

AI-powered maternal health companion for pregnant women and nursing mothers in Nigeria.
Built for HelpMum CareCode Hackathon 2.0.

## Stack
- **Frontend:** Next.js 15 App Router, TypeScript, Tailwind CSS (PWA)
- **Backend:** FastAPI (Python)
- **AI:** MamaBot-Llama architecture via Groq (llama-3.1-8b-instant) for demo; HF Inference Endpoint in production
- **DB:** Supabase
- **Deploy:** Vercel (frontend) + Render (backend)

## HelpMum Integration

| Asset | Status | Notes |
|---|---|---|
| MamaBot-Llama | Groq fallback | HelpMumHQ/MamaBot-Llama not on HF Inference Providers. Using Groq-hosted Llama 3.1 8B with MamaBot system prompt. Same model architecture and HelpMum framing. |
| 9ja Translators | P1 (Week 2) | HelpMumHQ/AI-translator-9ja-to-eng and AI-translator-eng-to-9ja exist but not on HF Inference Providers. Loaded via transformers on backend for P1 voice feature. |

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Fill in .env with your keys
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

## Architecture

```
User (mobile PWA)
    |
    v
Next.js Frontend (Vercel)
    |
    v
FastAPI Backend (Render)
    |
    +-- Red-flag detection layer (hard-coded, runs on every symptom query)
    +-- MamaBot service (Groq/Llama 3.1 8B with MamaBot system prompt)
    +-- Meal planner service (MamaBot + Nigerian foods DB)
    +-- Journey service (MamaBot, week-by-week content)
    |
    v
Supabase (user profiles, journey progress, meal plans)
```

## Red-Flag Detection
Hard-coded layer runs IN PARALLEL with MamaBot on every symptom query.
Any match forces `urgent` tier regardless of model output.

Covered: heavy bleeding, severe headache, reduced fetal movement, severe abdominal pain, vision changes, persistent vomiting, chest pain, difficulty breathing, sudden swelling, high fever, seizure, loss of consciousness, rupture of membranes, cord prolapse.

## P0 Features (Week 1)
- [x] AI Symptom Companion with triage
- [x] Nutrition Q&A
- [x] Budget-aware 7-day meal planner (Nigerian foods + Naira prices)
- [x] Week-by-week pregnancy journey (weeks 1-40 + 12 postpartum)

## P1 Features (Week 2)
- [ ] Voice in Yoruba (HelpMum 9ja translators)
- [ ] Anaemia nail-photo screening
- [ ] Photo food logging

## P2 Features
- [ ] Kick counter + contraction timer
- [ ] Medication safety checker
- [ ] Birth plan PDF export
