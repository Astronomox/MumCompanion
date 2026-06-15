from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.meal_planner import generate_meal_plan

router = APIRouter(prefix="/planner", tags=["planner"])


class PlanRequest(BaseModel):
    weekly_budget: int
    stage: str = "second_trimester"
    week: int = 20
    dietary_notes: str = ""


@router.post("/generate")
async def create_plan(payload: PlanRequest):
    if payload.weekly_budget < 3000:
        raise HTTPException(status_code=400, detail="Minimum budget is 3,000 naira per week")
    return await generate_meal_plan(
        weekly_budget=payload.weekly_budget,
        stage=payload.stage,
        week=payload.week,
        dietary_notes=payload.dietary_notes,
    )
