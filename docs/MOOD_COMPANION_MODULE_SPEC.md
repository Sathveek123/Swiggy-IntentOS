# 💙 Mood Companion — Product Engineering Specification

> **Module ID**: `module_05_mood_companion`  
> **AI Personality**: **Emotional Intelligence AI**  
> **Accent Color**: Purple `#A855F7`  
> **Route**: `/mood-companion`  
> **Target**: Swiggy Builders Club · `builders@swiggy.in`

---

## 1. The Real Problem

People rarely order food purely out of physiological hunger. A significant portion of orders is driven by emotional state:

```
Exhaustion / Stress → Comfort Food Seek
Celebration / Joy → Indulgence & Party Order
Loneliness / Low Energy → Warm Nourishment
```

Traditional apps treat all orders as identical transactional queries. Swiggy LifeOS treats food as emotional medicine.

---

## 2. Core Product Flow

1. **Top Bar**: Back arrow to `/modules` + "💙 Mood Companion" + Purple "Emotion AI" badge.
2. **Hero Section**: "How are you feeling right now?" heading with soft purple background (`#FDF4FF`).
3. **5 Mood Tiles**:
   - 😰 **Stressed**: Warm yellow card (`#FEF3C7`) → "Need Comfort" (Khichdi, Dal, Chai)
   - 😊 **Happy**: Fresh green card (`#DCFCE7`) → "Feeling Great!" (Try Something New)
   - 😢 **Sad**: Soft purple card (`#EDE9FE`) → "Need a Hug" (Ice Cream, Chocolate, Biryani)
   - 🎉 **Celebrating**: Festive red-pink card (`#FEE2E2`) → "Party Mode!" (Cake, Pizza, Desserts)
   - 😴 **Low Energy**: Calm blue card (`#F0F9FF`) → "Need an Energy Boost" (Coffee, Protein, Juice)
4. **Responsible AI Disclosure**: Explicit confirmation that LifeOS does not diagnose mental health and uses mood input solely for food comfort matching.
5. **Execution CTA**: "Find My [Mood] Food →" (Navigates to `/thinking` → `/plan` with staged emotional intent).

---

## 3. Specialized AI Engines

- **Emotion Understanding Engine**: Maps mood inputs to scientific comfort food categories.
- **Occasion Intelligence Engine**: Detects anniversaries, birthdays, promotions, and late-night study sessions.
- **Surprise Planning Engine**: Generates thoughtful food & dessert bundles for loved ones.
- **Responsible AI Guardrails**: Strict safety limits preventing emotional diagnosis or manipulative messaging.

---

## 4. Swiggy Business Impact

- **Dessert & Premium Attachment**: +48% increase in dessert add-ons during comfort/celebration states.
- **Gift Ordering**: Drives cross-user gift orders for friends and family.
- **Brand Loyalty**: Positions Swiggy as an empathetic life companion rather than just a utility app.

---

*Swiggy LifeOS · Mood Companion Spec · July 2026*
