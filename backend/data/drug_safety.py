"""
Medication pregnancy and breastfeeding safety database.
Covers common drugs available in Nigeria.
Categories follow a simplified version of pregnancy safety classes.
"""

# safety: "safe" | "caution" | "avoid" | "unknown"
DRUGS: dict[str, dict] = {
    "paracetamol": {
        "names": ["paracetamol", "panadol", "acetaminophen", "p-paracetamol", "emzor paracetamol"],
        "pregnancy": "safe",
        "breastfeeding": "safe",
        "note": "First choice for pain and fever in pregnancy. Stick to the dose on the pack and do not combine with other paracetamol products.",
    },
    "ibuprofen": {
        "names": ["ibuprofen", "brufen", "nurofen", "advil"],
        "pregnancy": "avoid",
        "breastfeeding": "caution",
        "note": "Avoid in pregnancy especially after 20 weeks, it can affect the baby. Paracetamol is the safer choice. Small occasional doses are usually okay while breastfeeding but ask your clinician.",
    },
    "aspirin": {
        "names": ["aspirin", "acetylsalicylic acid"],
        "pregnancy": "caution",
        "breastfeeding": "caution",
        "note": "Low-dose aspirin is sometimes prescribed in pregnancy for specific reasons, but do not start it on your own. Full-dose aspirin should be avoided.",
    },
    "amoxicillin": {
        "names": ["amoxicillin", "amoxil", "ampiclox", "amoxiclav", "augmentin"],
        "pregnancy": "safe",
        "breastfeeding": "safe",
        "note": "A commonly used antibiotic considered safe in pregnancy and breastfeeding. Finish the full course your clinician prescribed.",
    },
    "metronidazole": {
        "names": ["metronidazole", "flagyl"],
        "pregnancy": "caution",
        "breastfeeding": "caution",
        "note": "Often used for specific infections in pregnancy under guidance. Do not self-medicate. Avoid alcohol completely while taking it.",
    },
    "chloroquine": {
        "names": ["chloroquine", "chloroquin"],
        "pregnancy": "caution",
        "breastfeeding": "caution",
        "note": "Malaria treatment in pregnancy must be guided by a clinician. The recommended drugs depend on your trimester. Do not self-treat malaria in pregnancy.",
    },
    "artemether": {
        "names": ["artemether", "lumefantrine", "coartem", "artemether-lumefantrine", "act"],
        "pregnancy": "caution",
        "breastfeeding": "caution",
        "note": "ACT malaria treatment is generally avoided in the first trimester and used with care later. Malaria in pregnancy is dangerous, so see a clinician quickly rather than self-treating.",
    },
    "folic acid": {
        "names": ["folic acid", "folate", "pregnacare", "folicare"],
        "pregnancy": "safe",
        "breastfeeding": "safe",
        "note": "Essential in pregnancy. It protects your baby's spine and brain. Keep taking it as advised.",
    },
    "ferrous sulphate": {
        "names": ["ferrous sulphate", "ferrous", "iron tablet", "iron supplement", "fefol", "ranferon", "astyfer"],
        "pregnancy": "safe",
        "breastfeeding": "safe",
        "note": "Iron supplements help prevent anaemia in pregnancy. Take with vitamin C (like orange) for better absorption. May cause dark stool, that is normal.",
    },
    "vitamin c": {
        "names": ["vitamin c", "ascorbic acid"],
        "pregnancy": "safe",
        "breastfeeding": "safe",
        "note": "Safe in normal amounts and helps your body absorb iron. Do not take very high doses.",
    },
    "tetracycline": {
        "names": ["tetracycline", "doxycycline", "oxytetracycline"],
        "pregnancy": "avoid",
        "breastfeeding": "caution",
        "note": "Avoid in pregnancy. It can affect the baby's teeth and bones. Tell your clinician you are pregnant so they choose a safer antibiotic.",
    },
    "ciprofloxacin": {
        "names": ["ciprofloxacin", "cipro", "ciproxin"],
        "pregnancy": "avoid",
        "breastfeeding": "caution",
        "note": "Usually avoided in pregnancy unless there is no safer option. Do not self-medicate. Ask your clinician for a pregnancy-safe antibiotic.",
    },
    "promethazine": {
        "names": ["promethazine", "phenergan", "avomine"],
        "pregnancy": "caution",
        "breastfeeding": "caution",
        "note": "Sometimes used for severe nausea in pregnancy under guidance. Check with your clinician before using.",
    },
    "magnesium trisilicate": {
        "names": ["magnesium trisilicate", "antacid", "gestid", "gaviscon"],
        "pregnancy": "safe",
        "breastfeeding": "safe",
        "note": "Antacids like this help with heartburn in pregnancy and are generally safe. Take separately from your iron tablet.",
    },
    "misoprostol": {
        "names": ["misoprostol", "cytotec"],
        "pregnancy": "avoid",
        "breastfeeding": "caution",
        "note": "This can cause strong contractions and is dangerous to take on your own in pregnancy. Only ever use under direct medical supervision.",
    },
}


def lookup_drug(query: str) -> dict | None:
    q = query.lower().strip()
    for key, data in DRUGS.items():
        if q == key or q in data["names"] or any(q in n or n in q for n in data["names"]):
            return {"key": key, **data}
    return None
