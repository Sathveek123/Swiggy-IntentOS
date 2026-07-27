# 📚 SWIGGY LIFEOS — MASTER SYSTEM DOCUMENTATION

**Version**: 2.0.0 (Production Release)  
**Live URL**: [https://swiggy-intent-os.vercel.app](https://swiggy-intent-os.vercel.app)  
**Backend API**: [http://localhost:8000](http://localhost:8000) (Docs: `/docs`)  
**GitHub Repository**: [https://github.com/Sathveek123/Swiggy-IntentOS](https://github.com/Sathveek123/Swiggy-IntentOS)

---

## 📑 TABLE OF CONTENTS
1. [Executive Summary & Vision](#1-executive-summary--vision)
2. [The 6 Core Life Modules](#2-the-6-core-life-modules)
3. [Technical Architecture & Data Flow](#3-technical-architecture--data-flow)
4. [Swiggy OAuth 2.1 + PKCE Security Implementation](#4-swiggy-oauth-21--pkce-security-implementation)
5. [Swiggy MCP Tool Integration (Food, Instamart, Dineout)](#5-swiggy-mcp-tool-integration)
6. [Dynamic AI Intent Engine (Claude 3.5 Sonnet)](#6-dynamic-ai-intent-engine)
7. [Frontend UI/UX & Design System](#7-frontend-uiux--design-system)
8. [Testing & Empirical Verification Matrix](#8-testing--empirical-verification-matrix)
9. [Deployment & Quickstart Guide](#9-deployment--quickstart-guide)

---

## 1. EXECUTIVE SUMMARY & VISION

Traditional food delivery applications treat users as **database query builders**. Users must manually search for restaurants, apply filters, scroll through menus, calculate item prices, and coordinate multiple orders across categories (e.g., meals from Food Delivery, drinks/desserts from Quick Commerce, table bookings from Dineout).

**Swiggy LifeOS** transitions Swiggy from **Search-Based Ordering** to **Life Intent Orchestration**. Instead of forcing users to navigate complex catalog structures, LifeOS accepts a natural language **Life Situation** (e.g. *"I have ₹147 left and exam tomorrow"* or *"Hosting a birthday dinner for 6 people"*) and uses a multi-agent orchestration layer to return a single, unified, 1-click **LifePlan** spanning:
- 🍽️ **Swiggy Food Delivery** (hygiene-rated meals & regional dishes)
- 🛒 **Swiggy Instamart** (10-minute quick commerce groceries & party supplies)
- 📍 **Swiggy Dineout** (table reservations & slot booking)

---

## 2. THE 6 CORE LIFE MODULES

| Module | Route | Primary Objective | Key AI / Algorithmic Innovation |
|---|---|---|---|
| **🎒 Student Survival Mode** | `/student-survival` | Maximum nutritional value on tight student budgets | **Max-Calories-per-Rupee Algorithm**: Evaluates meal density and matches budget constraints (e.g. ₹147 bundle: Set Dosa + Parle-G + Chai). |
| **😄 Kid Mood Menu** | `/kid-mood` | Frictionless meal selection for parents based on kid emotions | **Visual Emotion Mapping**: Bypasses traditional cuisine filters; bundles hidden-veggie meals, treats, and Instamart activity packs. |
| **🍽️ Taste Discovery** | `/taste-discovery` | Breaking food routine fatigue and habit lock-in | **15% Intent Shift Engine**: Analyzes historic ordering data and recommends subtle flavor variations (e.g. Hyderabadi Dum Biryani + Mirchi Ka Salan). |
| **🥗 NutriGoal Engine** | `/nutri-goal` | Automated macro-nutrient matching for fitness goals | **Cross-Category Macro Optimizer**: Pulls high-protein meals from Food MCP and protein supplements/yogurts from Instamart MCP to hit exact protein targets (e.g. 54g protein). |
| **💙 Mood Companion** | `/mood-companion` | Empathic comfort food & care package recommendation | **Emotional Wellness Engine**: Maps stress, sadness, or exhaustion to soothing care packages (e.g. Hot Manchow Soup + Ginger Tea + Instamart Lavender Candles). |
| **🎂 Celebration OS** | `/celebration-os` | 1-Click multi-service group event coordination | **3-Service Synchronized Timeline**: Coordinates Swiggy Food (group feast), Instamart (cake & candles in 12 mins), and Dineout (table reservation) in a single turn. |

---

## 3. TECHNICAL ARCHITECTURE & DATA FLOW

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             REACT PWA FRONTEND                            │
│    (Vite 6 + Tailwind CSS v4 + Framer Motion + React Router v6)         │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ HTTP / REST API (JSON)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                           FASTAPI BACKEND ENGINE                          │
│                      (Python 3.12 + Uvicorn + Pydantic)                   │
├────────────────────────────────────┬─────────────────────────────────────┤
│ 1. Intent Classifier               │ 2. Swiggy OAuth 2.1 Engine          │
│    (agent/intent.py)               │    (auth/oauth.py)                  │
│    - Anthropic Claude 3.5 Sonnet   │    - Dynamic Client Registration    │
│    - Dynamic Rule Engine           │    - PKCE Code Generation (S256)    │
│    - Budget & Prompt Extractor     │    - Token Store & Auto-Refresh     │
└────────────────────────────────────┼─────────────────────────────────────┘
                                     │ Bearer Token HTTP JSON-RPC 2.0
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                          OFFICIAL SWIGGY MCP SERVERS                      │
├──────────────────────────┬──────────────────────────┬────────────────────┤
│   Swiggy Food MCP        │   Swiggy Instamart MCP   │ Swiggy Dineout MCP │
│   mcp.swiggy.com/food    │   mcp.swiggy.com/im      │ mcp.swiggy.com/dine│
│   - get_addresses        │   - search_products      │ - get_slots        │
│   - search_restaurants   │   - get_item_availability│ - reserve_table    │
└──────────────────────────┴──────────────────────────┴────────────────────┘
```

---

## 4. SWIGGY OAUTH 2.1 + PKCE SECURITY IMPLEMENTATION

Swiggy MCP servers require **OAuth 2.1 with PKCE (Proof Key for Code Exchange)**. Static API keys are explicitly prohibited by Swiggy's security model.

### Key Components (`backend/auth/oauth.py`):
1. **Dynamic Client Registration (RFC 7591)**: `dynamic_client_registration()` automatically registers local/staging application instances against `mcp.swiggy.com/oauth/register`, returning a client ID (`swiggy-mcp`).
2. **PKCE Pair Generation**: `generate_pkce_pair()` produces a cryptographically secure 128-byte `code_verifier` and computes its SHA-256 base64url-encoded `code_challenge` (`S256`).
3. **Authorization Endpoint**: Builds `/auth/authorize?response_type=code&client_id=...&code_challenge=...&scope=mcp:tools` URL.
4. **Token Exchange & Persistence**: Exchanges authorization codes for JWT access tokens (`SWIGGY_ACCESS_TOKEN`) and persists them to `.env`. Tokens are automatically injected as `Authorization: Bearer <token>` into all outgoing MCP tool requests.

---

## 5. SWIGGY MCP TOOL INTEGRATION

The system integrates with official Swiggy Model Context Protocol (MCP) servers:

- **`get_addresses`**: Fetches real user saved delivery locations.
- **`search_restaurants(address_id, query)`**: Queries open, hygiene-rated food partners.
- **`search_products(address_id, query)`**: Searches 10-minute Instamart inventory.
- **`get_available_slots(restaurant_id, date, party_size)`**: Fetches real-time Dineout table availability.

---

## 6. DYNAMIC AI INTENT ENGINE

Located in `backend/agent/intent.py`:
1. **Primary LLM Mode**: Calls Anthropic Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`) to parse complex user situations into structured JSON.
2. **Dynamic Fallback Engine**: If external LLM APIs fail or hit rate limits, the dynamic fallback engine parses budget constraints and matches keywords across all 6 core module personas (Pancakes, Stray Animals, Birthday Celebrations, Student Budgets, Gym Protein, Emotional Comfort).

---

## 7. FRONTEND UI/UX & DESIGN SYSTEM

- **Design Tokens**: Warm light background (`#FAFAF8`), primary brand orange (`#FC8019`), dark slate typography (`#1C1C1E`), muted borders (`#E8E8E8`).
- **Typography**: Inter font throughout with high legibility.
- **Navigation**: Clean 4-tab bottom navigation (**Home**, **Modules**, **Agent**, **Cart**) with active dot indicator (`w-1 h-1 bg-[#FC8019]`).
- **Micro-Animations**: Framer Motion tab transitions, subtle button press feedback (`whileTap={{ scale: 0.97 }}`), and visual MCP orchestration flow with moving dotted connectors on `/thinking`.

---

## 8. TESTING & EMPIRICAL VERIFICATION MATRIX

| Scenario | Input Query | Expected Output | Status |
|---|---|---|---|
| Student Pancakes | *"I have 300 rupees with me I need to eat best pancake"* | The Pancake Story (Classic Pancakes + Nutella Waffle) · ₹467 | ✅ PASS |
| Kid Meals | *"My kid is hungry and wants fun food tonight"* | Pizza Hut Kids (Cheese Burst Pizza + Lava Cake) · ₹707 | ✅ PASS |
| Taste Shift | *"Bored of reordering same food want something new"* | Hyderabadi Biryani House (Dum Biryani + Mirchi Salan) · ₹600 | ✅ PASS |
| Gym Recovery | *"I just came from gym need 45g protein recovery meal"* | FitBites Studio (Grilled Chicken Bowl + Whey Shake) · ₹420 | ✅ PASS |
| Comfort Meal | *"Feeling very stressed and sad need comfort food"* | Soul Comfort Kitchen (Mac & Cheese + Hot Tea) · ₹540 | ✅ PASS |
| Group Birthday | *"Birthday party dinner for 6 people tonight"* | Barbeque Nation (Feast for 6 + Cake + Dineout Slot) · ₹1,480 | ✅ PASS |

---

## 9. DEPLOYMENT & QUICKSTART GUIDE

### Local Backend & Frontend Run:
```bash
# 1. Start FastAPI Backend (Port 8000)
cd backend
python main.py

# 2. Start Vite Frontend (Port 5173)
npm run dev

# 3. Connect Swiggy OAuth
Open http://localhost:8000/api/auth/start in browser
```

### Production Build & Deploy:
```bash
# Verify TypeScript & Build
npx tsc --noEmit
npm run build

# Push to GitHub (Triggers Vercel Auto-Deploy)
git add .
git commit -m "production build"
git push origin main
```
