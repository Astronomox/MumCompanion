"""
Hard-coded red-flag detection layer.
Runs on every symptom query. Any match forces urgent tier regardless of LLM output.
"""

RED_FLAGS: list[tuple[str, str]] = [
    ("heavy bleeding", "heavy bleeding"),
    ("bleeding heavily", "heavy bleeding"),
    ("lots of blood", "heavy bleeding"),
    ("severe headache", "severe headache"),
    ("worst headache", "severe headache"),
    ("splitting headache", "severe headache"),
    ("reduced fetal movement", "reduced fetal movement"),
    ("baby not moving", "reduced fetal movement"),
    ("baby stopped moving", "reduced fetal movement"),
    ("not feeling baby", "reduced fetal movement"),
    ("kicks reduced", "reduced fetal movement"),
    ("severe abdominal pain", "severe abdominal pain"),
    ("severe stomach pain", "severe abdominal pain"),
    ("terrible pain in my stomach", "severe abdominal pain"),
    ("unbearable pain", "severe abdominal pain"),
    ("vision changes", "vision changes"),
    ("blurry vision", "vision changes"),
    ("seeing spots", "vision changes"),
    ("seeing stars", "vision changes"),
    ("blurred vision", "vision changes"),
    ("can't see clearly", "vision changes"),
    ("persistent vomiting", "persistent vomiting"),
    ("can't keep anything down", "persistent vomiting"),
    ("vomiting all day", "persistent vomiting"),
    ("chest pain", "chest pain"),
    ("difficulty breathing", "difficulty breathing"),
    ("can't breathe", "difficulty breathing"),
    ("sudden swelling", "sudden swelling"),
    ("hands and face swollen", "sudden swelling"),
    ("high fever", "high fever"),
    ("seizure", "seizure"),
    ("convulsion", "seizure"),
    ("unconscious", "loss of consciousness"),
    ("water broke", "rupture of membranes"),
    ("fluid leaking", "rupture of membranes"),
    ("cord coming out", "cord prolapse"),
]


def check_red_flags(text: str) -> tuple[bool, str | None]:
    """
    Returns (is_urgent, matched_symptom).
    Case-insensitive. Checks all patterns.
    """
    lower = text.lower()
    for pattern, symptom in RED_FLAGS:
        if pattern in lower:
            return True, symptom
    return False, None
