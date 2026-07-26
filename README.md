# 🌟 Swiggy LifeOS — Intent-Driven Commerce Engine & Recipe Orchestrator

> **Built for Swiggy Builders Club · July 2026**

[![PWA](https://img.shields.io/badge/PWA-Ready-22C55E?style=for-the-badge)](http://localhost:5173)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge)](http://localhost:5173)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge)](http://localhost:8000)
[![Anthropic](https://img.shields.io/badge/Anthropic_Claude-SDK-412991?style=for-the-badge)](http://localhost:8000)
[![Swiggy_MCP](https://img.shields.io/badge/Swiggy_MCP-Connected-FC8019?style=for-the-badge)](http://localhost:8000)

---

## 🎯 What is Swiggy LifeOS?

Swiggy LifeOS is an **AI Mission Planner & Intent Operating System** that replaces traditional search bars with **real-life intent orchestration** across Swiggy Food, Instamart, and Dineout.

Instead of asking: *"What would you like to order?"*

LifeOS asks: *"What's happening in your world today?"*

```
               Swiggy LifeOS PWA
         (React + TypeScript + Tailwind)
                       │
                       ▼  POST /api/plan
               FastAPI Backend Server
              (Python 3.11 + Uvicorn)
                       │
                       ▼  Anthropic Claude Agent
            Swiggy MCP Intent Router
                       │
      ┌────────────────┼────────────────┐
      ▼                ▼                ▼
 Food MCP Client Instamart MCP Client Dineout MCP Client
(get_addresses,  (search_products,    (get_saved_locations,
 search_rest,     update_cart,         get_available_slots,
 get_menu, etc)   checkout, etc)       book_table, etc)
```

---

## 🏆 The Official 6 LifeOS Core Modules

| # | Module | Route | Human Life Situation | AI Personality & Persona | Accent |
|---|---|---|---|---|---|
| **1** | 🎒 **Student Survival Mode** | `/student-survival` | Ultra-low budget, hostel gate countdown, exam hunger | Resource Optimization AI | 🟠 `#F59E0B` |
| **2** | 😄 **Kid Mood Menu** | `/kid-mood` | Family indecision, picky eating, mealtime deadlock | Family Emotion AI | 🩷 `#EC4899` |
| **3** | 🍽️ **Taste Discovery** | `/taste-discovery` | Monotonous reordering loop & cuisine repetition | Behavioral AI | 🟣 `#10B981` |
| **4** | 🥗 **NutriGoal Engine** | `/nutri-goal` | Macro targets (45g protein) + workout schedule | Health Intelligence AI | 🔷 `#0EA5E9` |
| **5** | 💙 **Mood Companion** | `/mood-companion` | Emotional moments & comfort matching | Emotional Intelligence AI | 🟪 `#A855F7` |
| **6** | 🎂 **Celebration OS** | `/celebration-os` | Event planning: Food + Instamart Cake + Dineout | Event Intelligence AI | 🟡 `#F59E0B` |

---

## 📚 Complete Documentation Suite

- 📄 **[docs/LIFEOS_MASTER_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/LIFEOS_MASTER_SPEC.md)** — Master LifeOS Architecture Specification.
- 📄 **[docs/STUDENT_SURVIVAL_MODULE_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/STUDENT_SURVIVAL_MODULE_SPEC.md)** — Student Survival Mode Spec.
- 📄 **[docs/KID_MOOD_MENU_MODULE_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/KID_MOOD_MENU_MODULE_SPEC.md)** — Kid Mood Menu Spec.
- 📄 **[docs/TASTE_DISCOVERY_MODULE_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/TASTE_DISCOVERY_MODULE_SPEC.md)** — Taste Discovery Spec.
- 📄 **[docs/NUTRIGOAL_MODULE_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/NUTRIGOAL_MODULE_SPEC.md)** — NutriGoal Engine Spec.
- 📄 **[docs/MOOD_COMPANION_MODULE_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/MOOD_COMPANION_MODULE_SPEC.md)** — Mood Companion Spec.
- 📄 **[docs/CELEBRATION_OS_MODULE_SPEC.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/CELEBRATION_OS_MODULE_SPEC.md)** — Celebration OS Spec.
- 📄 **[docs/architecture_v2.md](file:///d:/Client%20Projects/SWIGGY%20LIFE%20OS/docs/architecture_v2.md)** — Swiggy MCP Protocol Specification.

---

## 🚀 Running Locally

### 1. Start FastAPI Backend Server
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python main.py
# Server running at http://localhost:8000
```

### 2. Start React Frontend PWA
```bash
npm install
npm run dev
# App running at http://localhost:5173
```

---

## 📱 Core Screen Navigation

| Screen | Route | Purpose |
| :--- | :--- | :--- |
| **Intent Hub** | `/modules` | Core Module selection hub displaying the 6 official Life Modules |
| **Student Survival** | `/student-survival` | Budget calculator & max calorie-per-rupee optimization flow |
| **Kid Mood Menu** | `/kid-mood` | 2x2 Emotion tile picker & kid-friendly food discovery |
| **Taste Discovery** | `/taste-discovery` | Cuisine variation slider & "🎲 Surprise Me" adventure generator |
| **NutriGoal Engine** | `/nutri-goal` | Macro sliders (Protein, Carb, Calorie) & diet type selector |
| **Mood Companion** | `/mood-companion` | 5 Emotional mood tiles & scientific comfort food matching |
| **Celebration OS** | `/celebration-os` | Multi-service event orchestrator (Food + Instamart + Dineout) |
| **Thinking** | `/thinking` | Real-time AI processing indicator & progress stepper |
| **Plan** | `/plan` | Generated LifePlan Hero Screen (Food + Instamart + Dineout) |
| **Cart** | `/cart` | Multi-service cart with item controls & budget breakdown |

---

*Made with ❤️ for Swiggy Builders Club · July 2026*
