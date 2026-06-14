from fastapi import APIRouter, HTTPException
from services.journey import get_week_content

router = APIRouter(prefix="/journey", tags=["journey"])


@router.get("/week/{week}")
async def week_content(week: int, phase: str = "pregnancy"):
    if phase == "pregnancy" and not (1 <= week <= 40):
        raise HTTPException(status_code=400, detail="Week must be 1-40 for pregnancy")
    if phase == "postpartum" and not (1 <= week <= 12):
        raise HTTPException(status_code=400, detail="Postpartum week must be 1-12")

    content = await get_week_content(week=week, phase=phase)
    return content
