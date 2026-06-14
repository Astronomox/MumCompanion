"""
Nigerian foods database with approximate Lagos market prices (Naira, 2024).
Used for budget-aware meal planning.
"""

FOODS: list[dict] = [
    # Proteins
    {"name": "Beans (oloyin)", "category": "protein", "unit": "cup", "cost_naira": 250, "protein_g": 15, "iron_mg": 3.7, "folate_mcg": 256, "calcium_mg": 46, "vitc_mg": 0, "calories": 225},
    {"name": "Egg", "category": "protein", "unit": "piece", "cost_naira": 150, "protein_g": 6, "iron_mg": 0.9, "folate_mcg": 22, "calcium_mg": 28, "vitc_mg": 0, "calories": 70},
    {"name": "Mackerel (titus)", "category": "protein", "unit": "medium", "cost_naira": 800, "protein_g": 25, "iron_mg": 1.8, "folate_mcg": 10, "calcium_mg": 66, "vitc_mg": 0, "calories": 200},
    {"name": "Stockfish", "category": "protein", "unit": "small wrap", "cost_naira": 300, "protein_g": 18, "iron_mg": 1.2, "folate_mcg": 5, "calcium_mg": 30, "vitc_mg": 0, "calories": 100},
    {"name": "Crayfish", "category": "protein", "unit": "tbsp", "cost_naira": 100, "protein_g": 5, "iron_mg": 0.5, "folate_mcg": 2, "calcium_mg": 35, "vitc_mg": 0, "calories": 30},
    {"name": "Chicken (drumstick)", "category": "protein", "unit": "piece", "cost_naira": 700, "protein_g": 22, "iron_mg": 1.1, "folate_mcg": 8, "calcium_mg": 12, "vitc_mg": 0, "calories": 180},
    {"name": "Cow liver", "category": "protein", "unit": "small portion", "cost_naira": 400, "protein_g": 20, "iron_mg": 6.5, "folate_mcg": 212, "calcium_mg": 11, "vitc_mg": 2, "calories": 140},
    {"name": "Tofu", "category": "protein", "unit": "block", "cost_naira": 300, "protein_g": 10, "iron_mg": 1.8, "folate_mcg": 18, "calcium_mg": 350, "vitc_mg": 0, "calories": 80},

    # Carbohydrates
    {"name": "Brown rice (ofada)", "category": "carb", "unit": "cup cooked", "cost_naira": 200, "protein_g": 4, "iron_mg": 0.4, "folate_mcg": 5, "calcium_mg": 10, "vitc_mg": 0, "calories": 215},
    {"name": "Eba (cassava)", "category": "carb", "unit": "medium ball", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.3, "folate_mcg": 14, "calcium_mg": 16, "vitc_mg": 0, "calories": 220},
    {"name": "Yam (boiled)", "category": "carb", "unit": "medium slice", "cost_naira": 150, "protein_g": 2, "iron_mg": 0.5, "folate_mcg": 14, "calcium_mg": 14, "vitc_mg": 12, "calories": 180},
    {"name": "Plantain (ripe, boiled)", "category": "carb", "unit": "medium", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.5, "folate_mcg": 22, "calcium_mg": 3, "vitc_mg": 18, "calories": 150},
    {"name": "Oatmeal", "category": "carb", "unit": "cup cooked", "cost_naira": 200, "protein_g": 5, "iron_mg": 2, "folate_mcg": 14, "calcium_mg": 21, "vitc_mg": 0, "calories": 150},
    {"name": "Bread (whole wheat)", "category": "carb", "unit": "2 slices", "cost_naira": 200, "protein_g": 6, "iron_mg": 1.8, "folate_mcg": 20, "calcium_mg": 40, "vitc_mg": 0, "calories": 170},

    # Vegetables (high in iron and folate)
    {"name": "Ugu leaf (pumpkin leaves)", "category": "vegetable", "unit": "handful", "cost_naira": 100, "protein_g": 3, "iron_mg": 3.4, "folate_mcg": 94, "calcium_mg": 40, "vitc_mg": 30, "calories": 25},
    {"name": "Ewedu (jute leaves)", "category": "vegetable", "unit": "handful", "cost_naira": 80, "protein_g": 2, "iron_mg": 2.7, "folate_mcg": 78, "calcium_mg": 98, "vitc_mg": 28, "calories": 20},
    {"name": "Moringa leaves", "category": "vegetable", "unit": "handful", "cost_naira": 100, "protein_g": 2, "iron_mg": 4, "folate_mcg": 40, "calcium_mg": 185, "vitc_mg": 51, "calories": 30},
    {"name": "Tomatoes", "category": "vegetable", "unit": "2 medium", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.5, "folate_mcg": 18, "calcium_mg": 12, "vitc_mg": 23, "calories": 35},
    {"name": "Spinach (green)", "category": "vegetable", "unit": "handful", "cost_naira": 100, "protein_g": 3, "iron_mg": 3.6, "folate_mcg": 194, "calcium_mg": 99, "vitc_mg": 28, "calories": 23},
    {"name": "Garden egg", "category": "vegetable", "unit": "3 pieces", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.2, "folate_mcg": 14, "calcium_mg": 9, "vitc_mg": 4, "calories": 35},
    {"name": "Okra", "category": "vegetable", "unit": "cup", "cost_naira": 100, "protein_g": 2, "iron_mg": 0.8, "folate_mcg": 87, "calcium_mg": 82, "vitc_mg": 23, "calories": 30},

    # Fruits
    {"name": "Orange", "category": "fruit", "unit": "medium", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.1, "folate_mcg": 39, "calcium_mg": 52, "vitc_mg": 70, "calories": 62},
    {"name": "Banana", "category": "fruit", "unit": "medium", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.3, "folate_mcg": 20, "calcium_mg": 6, "vitc_mg": 9, "calories": 89},
    {"name": "Pawpaw (papaya)", "category": "fruit", "unit": "cup", "cost_naira": 100, "protein_g": 1, "iron_mg": 0.1, "folate_mcg": 37, "calcium_mg": 20, "vitc_mg": 60, "calories": 55},
    {"name": "Watermelon", "category": "fruit", "unit": "slice", "cost_naira": 150, "protein_g": 1, "iron_mg": 0.2, "folate_mcg": 4, "calcium_mg": 7, "vitc_mg": 12, "calories": 45},

    # Dairy / calcium
    {"name": "Peak milk (evaporated)", "category": "dairy", "unit": "small tin", "cost_naira": 300, "protein_g": 8, "iron_mg": 0.2, "folate_mcg": 12, "calcium_mg": 290, "vitc_mg": 0, "calories": 340},
    {"name": "Soy milk", "category": "dairy", "unit": "cup", "cost_naira": 200, "protein_g": 7, "iron_mg": 1, "folate_mcg": 24, "calcium_mg": 300, "vitc_mg": 0, "calories": 100},
]


def get_foods_by_budget(weekly_budget_naira: int, stage: str) -> list[dict]:
    """Return affordable foods for a given weekly budget."""
    daily_budget = weekly_budget_naira / 7
    return [f for f in FOODS if f["cost_naira"] <= daily_budget * 0.4]


def get_all_foods() -> list[dict]:
    return FOODS
