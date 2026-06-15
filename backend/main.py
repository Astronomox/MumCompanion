from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, planner, journey, medication

app = FastAPI(
    title="Mum AI Companion API",
    description="Lami, the AI companion for Nigerian mothers. Built on HelpMum's maternal health knowledge.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(planner.router)
app.include_router(journey.router)
app.include_router(medication.router)


@app.get("/health")
def health():
    return {"status": "ok", "service": "mum-ai-companion", "companion": "Lami"}
