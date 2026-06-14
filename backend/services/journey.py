"""
Week-by-week pregnancy journey content.
Covers weeks 1-40 (pregnancy) + weeks 1-12 postpartum.
Content is generated via MamaBot on first access and cached.
"""

import json
from groq import Groq
from core.config import get_settings

JOURNEY_SYSTEM = """You are MamaBot. Provide week-by-week pregnancy/postpartum content for Nigerian mothers.
Respond ONLY with valid JSON. No markdown, no extra text.

JSON format:
{
  "week": 12,
  "phase": "pregnancy",
  "title": "Your baby is the size of a lime",
  "baby_size": "Lime",
  "baby_development": "Your baby's fingers and toes are fully formed. The face looks more human. Reflexes are developing.",
  "mother_changes": ["Morning sickness may start easing", "You might notice your waistline thickening", "Energy levels may start returning"],
  "nutrition_tips": ["Continue taking folic acid", "Eat iron-rich foods like ugu and beans", "Drink at least 8 glasses of water daily"],
  "warning_signs_this_week": ["Heavy bleeding", "Severe cramping", "Fever above 38C"],
  "affirmation": "You are growing a whole person. Every day you show up is a victory, mama."
}"""

NIGERIAN_SIZE_REFERENCES = {
    4: "grain of rice", 5: "apple seed", 6: "sweet pea", 7: "blueberry",
    8: "kidney bean", 9: "grape", 10: "strawberry", 11: "fig",
    12: "lime", 13: "egg", 14: "lemon", 15: "orange",
    16: "avocado", 17: "pear", 18: "bell pepper", 19: "mango",
    20: "banana", 21: "carrot", 22: "papaya", 23: "large mango",
    24: "corn cob", 25: "cauliflower", 26: "cucumber", 27: "head of lettuce",
    28: "small pineapple", 29: "butternut squash", 30: "large cabbage",
    32: "coconut", 34: "cantaloupe", 36: "head of romaine lettuce",
    38: "watermelon", 40: "small pumpkin",
}


async def get_week_content(week: int, phase: str = "pregnancy") -> dict:
    settings = get_settings()
    client = Groq(api_key=settings.groq_api_key)

    size_ref = NIGERIAN_SIZE_REFERENCES.get(week, "growing beautifully")

    prompt = f"""Generate content for week {week} of {phase}.
Baby size reference: {size_ref}
Make all content culturally relevant for Nigerian mothers.
Include local foods in nutrition tips. Be warm and encouraging."""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": JOURNEY_SYSTEM},
            {"role": "user", "content": prompt},
        ],
        max_tokens=600,
        temperature=0.4,
    )

    content = response.choices[0].message.content or "{}"
    clean = content.strip()
    if clean.startswith("```"):
        lines = clean.split("\n")
        clean = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])

    return json.loads(clean)
