"""
Budget-aware 7-day meal planner.
Uses MamaBot (Groq) for nutritional reasoning + Nigerian foods database for costing.
"""

import json
from groq import Groq
from core.config import get_settings
from data.nigerian_foods import get_all_foods, FOODS

PLANNER_SYSTEM = """You are MamaBot, HelpMum's maternal nutrition expert. Generate a 7-day Nigerian meal plan for a pregnant/nursing mother.

STRICT RULES:
1. Only use foods from the provided Nigerian foods list
2. Total weekly cost MUST stay within the given budget in Naira
3. Every day must include breakfast, lunch, dinner, and 1-2 snacks
4. Maximize iron, folate, and calcium for pregnancy
5. Respond ONLY with valid JSON - no extra text, no markdown

JSON format:
{
  "days": [
    {
      "day": 1,
      "breakfast": {"name": "Oatmeal with banana", "foods": ["Oatmeal", "Banana"], "cost_naira": 300, "notes": "Add a pinch of cinnamon"},
      "lunch": {"name": "Rice and stew with ugu", "foods": ["Brown rice (ofada)", "Tomatoes", "Ugu leaf (pumpkin leaves)", "Mackerel (titus)"], "cost_naira": 1200, "notes": "Cook ugu lightly to preserve folate"},
      "dinner": {"name": "Eba and egusi with spinach", "foods": ["Eba (cassava)", "Spinach (green)", "Crayfish", "Stockfish"], "cost_naira": 750, "notes": ""},
      "snacks": [{"name": "Orange", "foods": ["Orange"], "cost_naira": 100}],
      "day_total": 2350
    }
  ],
  "weekly_total": 16000,
  "nutrition_notes": "This plan provides excellent iron from ugu and liver, folate from beans and spinach, and vitamin C from oranges to boost iron absorption.",
  "tips": ["Pair iron-rich foods with vitamin C for better absorption", "Drink water between meals, not during"]
}"""


async def generate_meal_plan(
    weekly_budget: int,
    stage: str,
    week: int,
    dietary_notes: str = "",
) -> dict:
    settings = get_settings()
    client = Groq(api_key=settings.groq_api_key)

    foods_list = "\n".join([
        f"- {f['name']} ({f['category']}): {f['cost_naira']} naira per {f['unit']}"
        for f in FOODS
    ])

    user_prompt = f"""Generate a 7-day meal plan.
Stage: {stage} (Week {week})
Weekly budget: {weekly_budget:,} naira
Additional notes: {dietary_notes or 'None'}

Available Nigerian foods:
{foods_list}

Remember: weekly total must not exceed {weekly_budget:,} naira. Return only JSON."""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": PLANNER_SYSTEM},
            {"role": "user", "content": user_prompt},
        ],
        max_tokens=2000,
        temperature=0.2,
    )

    content = response.choices[0].message.content or "{}"

    # Strip markdown fences if model wrapped it
    clean = content.strip()
    if clean.startswith("```"):
        lines = clean.split("\n")
        clean = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])

    plan = json.loads(clean)
    return plan
