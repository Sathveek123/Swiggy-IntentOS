# Swiggy LifeOS — Master Product Architecture
### Version 2.0 · July 2026 · Swiggy Builders Club Submission

---

## What is LifeOS?

Swiggy LifeOS is not a recommendation engine.

It is an **operating system for everyday life** — built on top of Swiggy's existing infrastructure (Food, Instamart, Dineout, One) — that understands *human life situations* and uses AI to make the right decision at the right moment.

> "Every module answers one question: *How does LifeOS understand this moment in someone's life?*"

---

## The LifeOS Protocol — Universal OS Language

Every module in LifeOS follows the same 7-step decision loop. This creates one common OS language while letting each module solve a completely different problem.

```
Life Situation
      ↓
Context Engine        ← reads signals: time, weather, budget, history, calendar
      ↓
AI Reasoning          ← generates a transparent, explainable plan
      ↓
Recommendation        ← a specific food + instamart + dineout suggestion
      ↓
Why?                  ← shows the user exactly why this was chosen
      ↓
Execute               ← places the order across Swiggy services
      ↓
Learn                 ← remembers the outcome to improve next time
```

---

## The Official Six Core Life Modules

| # | Module | Human Life Situation | AI Personality | Accent Color | Route |
|---|---|---|---|---|---|
| 1 | 🎒 **Student Survival Mode** | Financial pressure, last ₹147 in hostel, exam hunger | Resource Optimization AI | 🟠 `#F59E0B` | `/student-survival` |
| 2 | 😄 **Kid Mood Menu** | Family meal deadlock, picky eating, child indecision | Family Emotion AI | 🩷 `#EC4899` | `/kid-mood` |
| 3 | 🍽️ **Taste Discovery** | Monotonous reordering trap & cuisine repetition | Behavioral AI | 🟣 `#10B981` | `/taste-discovery` |
| 4 | 🥗 **NutriGoal Engine** | Macro targets (45g protein) + real-time health goals | Health Intelligence AI | 🔷 `#0EA5E9` | `/nutri-goal` |
| 5 | 💙 **Mood Companion** | Ordering based on emotional states (Stress, Comfort, Joy) | Emotional Intelligence AI | 🟪 `#A855F7` | `/mood-companion` |
| 6 | 🎂 **Celebration OS** | Cross-service event planning: Food + Cake + Dineout | Event Intelligence AI | 🟡 `#F59E0B` | `/celebration-os` |

---

## Module Identity Framework

Every module is distinct across 6 core dimensions:

| Dimension | What it defines |
|---|---|
| **Life Situation** | The real human problem being solved |
| **AI Personality** | The type of intelligence applied |
| **UX Pattern** | The interaction model (wizard / emotion selector / goal input / budget stepper) |
| **Reasoning Pipeline** | The unique logic chain for this module |
| **Swiggy Service Mix** | Which services are used (Food / Instamart / Dineout / Swiggy One) |
| **Business Value** | The specific Swiggy metric this module improves |

---

## Module Deep-Dives

---

### Module 1 — 🎒 Student Survival Mode
- **Route**: `/student-survival`
- **Input**: Exact budget (e.g. ₹147), number of people.
- **AI Logic**: Maximize calories-per-rupee under tight financial constraints.
- **Visual Distinction**: Red budget warning bar on ultra-low budget (<₹200).
- **MCP Server**: `swiggy_food_mcp` (price filter).

---

### Module 2 — 😄 Kid Mood Menu
- **Route**: `/kid-mood`
- **Input**: 4 emotion cards (Happy / Sad / Excited / Picky).
- **AI Logic**: Kids think in feelings, not cuisines. Maps emotion to child-friendly food.
- **Visual Distinction**: Soft pink background, large emoji cards, parent trust indicators.
- **MCP Server**: `swiggy_food_mcp` (kid menu filter).

---

### Module 3 — 🍽️ Taste Discovery
- **Route**: `/taste-discovery`
- **Input**: Last ordered dish + 3-level adventure slider (Safe 10% / Moderate 30% / Adventurous 50%).
- **AI Logic**: Breaks food routine loops by introducing gentle 10–50% cuisine variations.
- **Visual Distinction**: Fresh emerald theme, "🎲 Surprise Me" button.
- **MCP Server**: `swiggy_food_mcp` (cuisine variation).

---

### Module 4 — 🥗 NutriGoal Engine
- **Route**: `/nutri-goal`
- **Input**: Protein (g), Carb (g), Calorie (kcal) sliders + Diet Type (High Protein, Veg, Keto).
- **AI Logic**: Calculates meals hitting exact macro targets without manual calorie logging.
- **Visual Distinction**: Sky blue theme, live macro progress bars.
- **MCP Server**: `swiggy_food_mcp` + `swiggy_instamart_mcp`.

---

### Module 5 — 💙 Mood Companion
- **Route**: `/mood-companion`
- **Input**: 5 mood tiles (Stressed / Happy / Sad / Celebrating / Low Energy).
- **AI Logic**: Treats food as emotional comfort. Responsible AI guardrails prevent diagnosis.
- **Visual Distinction**: Soft purple theme, explicit guardrail notices.
- **MCP Server**: `swiggy_food_mcp` (comfort query).

---

### Module 6 — 🎂 Celebration OS
- **Route**: `/celebration-os`
- **Input**: Occasion, guest count, total budget, 3 multi-service toggles.
- **AI Logic**: Orchestrates Food Delivery + Instamart Cake + Dineout Table Reservation in 1 plan.
- **Visual Distinction**: Gold theme, live budget split calculator.
- **MCP Server**: **ALL 3 SERVERS** (`swiggy_food_mcp`, `swiggy_instamart_mcp`, `swiggy_dineout_mcp`).

---

## Technical Architecture & File Structure

```
src/
├── screens/
│   ├── LifeModules.tsx          ← Intent Hub (6 Core Module Cards)
│   ├── StudentSurvivalFlow.tsx  ← Module 1 (/student-survival)
│   ├── KidMoodFlow.tsx          ← Module 2 (/kid-mood)
│   ├── TasteDiscoveryFlow.tsx   ← Module 3 (/taste-discovery)
│   ├── NutriGoalFlow.tsx        ← Module 4 (/nutri-goal)
│   ├── MoodCompanionFlow.tsx    ← Module 5 (/mood-companion)
│   └── CelebrationOSFlow.tsx    ← Module 6 (/celebration-os)
├── store/
│   └── useLifeOSStore.ts        ← Zustand store: cart, plan, modules
└── data/
    └── mockData.ts              ← Mock plans, restaurant data, images
```

**Build Status**: PWA Ready · Vite v6.4.3 · 0 TypeScript Errors · Tested live on `http://localhost:5173`.

---

*Swiggy LifeOS · Master Specification v2.0 · July 2026*
