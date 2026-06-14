from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, planner, journey

app = FastAPI(
    title="Mum Companion API",
    description="AI maternal health companion for Nigerian mothers. Powered by MamaBot-Llama.",
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


@app.get("/health")
def health():
    return {"status": "ok", "service": "mum-companion-api"}
