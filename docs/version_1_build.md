# 🧾 Swiggy LifeOS — Technical Documentation & Architecture Report (v3.5 PROD)

> **Project Name**: Swiggy LifeOS (PWA + FastAPI + Swiggy MCP Agent)  
> **Subtitle**: Intent-Driven Commerce Engine & Recipe Orchestrator for Swiggy Food, Instamart & Dineout  
> **Version**: 3.5.0-PROD  
> **Author**: Google Antigravity AI Engineering Team  
> **Target Platform**: Desktop & Mobile Web (Progressive Web Application) + Python FastAPI Server  
> **Full Stack**: React 18 + TypeScript + Vite 6 + Tailwind CSS 3 + Framer Motion 11 + Zustand 5 + FastAPI + Anthropic Claude SDK + Swiggy MCP JSON-RPC Clients  

---

## 📑 Table of Contents

1. [Executive Overview & Vision](#1-executive-overview--vision)
2. [Full Stack System Architecture](#2-full-stack-system-architecture)
3. [Design System & 5-Tab Clean Mobile Navigation](#3-design-system--5-tab-clean-mobile-navigation)
4. [Backend MCP Client & Dual-Mode Safeguard Architecture](#4-backend-mcp-client--dual-mode-safeguard-architecture)
5. [Complete 14-Screen UI Breakdown & Interactive Routes](#5-complete-14-screen-ui-breakdown--interactive-routes)
6. [Explainability Badge & Trust Layer](#6-explainability-badge--trust-layer)
7. [Cart Staging Fix & State Management (Zustand Store)](#7-cart-staging-fix--state-management-zustand-store)
8. [Progressive Web App (PWA) & Service Worker](#8-progressive-web-app-pwa--service-worker)
9. [Complete File Directory & Source Code Reference](#9-complete-file-directory--source-code-reference)
10. [Empirical Browser Verification & Developer Guide](#10-empirical-browser-verification--developer-guide)

---

## 1. Executive Overview & Vision

**Swiggy LifeOS** is an AI-native decision and orchestration engine built on top of Swiggy’s Model Context Protocol (MCP) servers:
- 🍕 **Swiggy Food Delivery MCP** (`https://mcp.swiggy.com/food`)
- 🛒 **Instamart Quick Commerce MCP** (`https://mcp.swiggy.com/im`)
- 🍽️ **Dineout Dining Reservations MCP** (`https://mcp.swiggy.com/dineout`)

### The Shift: Intent Engine vs. Search Bars
Traditional food delivery platforms force users to manually search, compare prices, filter cuisines, check delivery times, and manage separate carts across services. **Swiggy LifeOS turns real human situations into single-turn executable LifePlans.**

---

## 2. Full Stack System Architecture

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

## 3. Design System & 5-Tab Clean Mobile Navigation

- **Color Tokens**: Pure White `#FFFFFF`, Warm Surface `#FAFAF8`, Card Fill `#F5F5F3`, Swiggy Orange `#FC8019`, Charcoal Text `#1C1C1E`, Muted Slate `#6B7280`, Success Green `#22C55E`.
- **5 Clean Core Mobile Tabs (`BottomNav.tsx`)**:
  1. 🏠 **Home** (`/home`)
  2. 🧩 **15 Modules** (`/modules`)
  3. 🤖 **AI Agent** (`/agent`)
  4. 🧠 **AI Health** (`/dashboard`)
  5. 🛒 **Cart** (`/cart`)
- **Typography**: 100% **Inter** font family from Google Fonts.
- **Visual Particles**: Particle canvas (`ParticleCanvas.tsx`) animating floating micro-particles for mobile application polish.

---

## 4. Backend MCP Client & Dual-Mode Safeguard Architecture

The backend is housed in the `backend/` directory and built with **FastAPI**, **Anthropic SDK**, and **HTTPX**.

### 4.1 Base JSON-RPC 2.0 Client (`backend/mcp/client.py`)
Handles JSON-RPC 2.0 requests over HTTP to Swiggy MCP server endpoints, appending OAuth Bearer headers and handling status errors with fallback simulation safeguards.

### 4.2 Food MCP Server Client (`backend/mcp/food_client.py`)
Implements official Swiggy Food MCP tool callers: `get_addresses`, `search_restaurants`, `get_restaurant_menu`, `update_food_cart`, `get_food_cart`, `fetch_food_coupons`, `apply_food_coupon`, `place_food_order`, `track_food_order`.

### 4.3 Instamart MCP Server Client (`backend/mcp/instamart_client.py`)
Implements Swiggy Instamart Quick Commerce MCP tool callers: `search_products`, `your_go_to_items`, `update_cart`, `get_cart`, `checkout`, `track_order`.

### 4.4 Dineout MCP Server Client (`backend/mcp/dineout_client.py`)
Implements Swiggy Dineout Reservation MCP tool callers: `get_saved_locations`, `search_restaurants_dineout`, `get_restaurant_details`, `get_available_slots`, `book_table`, `get_booking_status`.

---

## 5. Complete 14-Screen UI Breakdown & Interactive Routes

1. `/splash` — **Splash Screen**: Monogram logo mark pulse animation & loading progress bar.
2. `/home` — **5-Star Swiggy Home Screen**: Swiggy One VIP banner, top trending dishes carousel, live Web Speech STT mic, and intent presets.
3. `/swiggy-one` — **Swiggy One VIP Lounge**: Member Gold Card, ₹4,820 savings tracker, and VIP privileges breakdown.
4. `/gourmet` — **Swiggy Gourmet Studio**: Michelin-inspired tasting menus, sommelier pairings, and fine dining reservation.
5. `/group-order` — **Instant Group Order Studio**: Multi-user QR invite, live voting feed, and split-budget calculator.
6. `/analytics` — **Swiggy Exec Analytics**: Conversion metrics for Swiggy Leadership (-78% decision time, +24% cart recovery, +42% Instamart lift).
7. `/dashboard` — **Personal AI Health & Financial Dashboard**: Money Saved (₹4,820), Time Saved (14.5 Hrs), Protein (1,240g), Pantry Tracker, and 15 Modules preview grid.
8. `/modules` — **15 Life Event Modules Hub**: Interactive grid of all 15 Life Modules with persona tags.
9. `/thinking` — **Thinking AI Screen**: Pulsing concentric circles and 3-step progress stepper.
10. `/plan` — **LifePlan Hero Screen**: Stacked Food, Instamart, and Dineout cards with high-res thumbnails, Explainability Badge (`96% CONFIDENT`), and collapsible **⚡ MCP Tools Called** card.
11. `/cart` — **Multi-Service Cart Screen**: Clean item staging, quantity controls, delivery tip options, and Swiggy One FREE delivery.
12. `/summary` — **Summary Screen**: Animated SVG checkmark draw effect and delivery status cards.
13. `/tracking` — **Live GPS Tracking Screen**: Delivery valet profile (*Ramesh Kumar ⭐ 4.9*), call/chat triggers, and progress countdown.
14. `/mcp-ready` — **Interactive MCP Protocol Playground**: Live JSON-RPC 2.0 payload runner, tool execution tester, and latency meters.

---

## 6. Explainability Badge & Trust Layer

Located at `src/components/ExplainabilityBadge.tsx`:
- Renders on `/plan` screen displaying **`96% CONFIDENT`** AI Decision Confidence and an interactive **"Why recommended?"** reasoning drawer detailing budget fit, hygiene rating, fast delivery route, and Swiggy One bundle discount.

---

## 7. Cart Staging Fix & State Management (Zustand Store)

Located in `src/store/useLifeOSStore.ts`:
- Added `replaceCartWithPlan(items: FoodItem[])`: Clears old test session items when resolving a new situation prompt so that the cart ALWAYS displays 100% accurate items.

---

## 8. Progressive Web App (PWA) & Service Worker

Configured via `vite-plugin-pwa` in `vite.config.ts`:
- Generates `dist/sw.js` and `dist/manifest.webmanifest`.
- Standalone display mode with `#FC8019` theme color.

---

## 9. Complete File Directory & Source Code Reference

```
d:/Client Projects/SWIGGY LIFE OS/
├── backend/
│   ├── main.py                  # FastAPI Application Entrypoint
│   ├── requirements.txt         # Python Package Dependencies
│   ├── .env                     # Server Environment Secrets
│   ├── agent/
│   │   ├── intent.py            # Anthropic Intent Classifier (Claude 3.5 Sonnet)
│   │   └── prompts.py           # System Prompts & Instructions
│   ├── recipes/
│   │   └── combined.py          # Swiggy Multi-Service MCP Recipe
│   ├── mcp/
│   │   ├── client.py            # Swiggy JSON-RPC Base Client
│   │   ├── food_client.py       # Food MCP Server Client
│   │   ├── instamart_client.py  # Instamart MCP Server Client
│   │   └── dineout_client.py    # Dineout MCP Server Client
│   └── api/
│       └── routes.py            # FastAPI REST Routes (/api/plan, /api/agent/chat)
├── docs/
│   ├── MASTER_PROJECT_DOCUMENTATION.md  # Master Documentation Report
│   ├── DECISION_INTELLIGENCE_SPEC.md    # 20-Pillar Strategic Specification
│   ├── LIFEOS_FOUNDER_PITCH.md           # Master Founder Pitch Document
│   ├── GO_LIVE_CHECKLIST.md              # Shipping & Submission Guide
│   ├── architecture_v2.md                # Protocol & Tool Specification
│   └── version_1_build.md                # Technical Build Report
├── src/
│   ├── components/              # BottomNav, ExplainabilityBadge, PlanCard, ParticleCanvas, AnimatedCheckmark, ErrorBoundary, Logo
│   ├── data/                    # mockData.ts with Unsplash imagery assets
│   ├── screens/                 # 14 Interactive Route Screens
│   ├── services/                # backendClient.ts & intentEngine.ts
│   └── store/                   # Zustand State Store
├── index.html                   # Entry HTML with Inter fonts
├── package.json                 # Frontend Node Dependencies
├── README.md                    # Repository Overview
├── tailwind.config.js           # Tailwind Token Configurations
└── vite.config.ts               # Vite & PWA Configurations
```

---

## 10. Empirical Browser Verification & Developer Guide

```bash
# 1. Run Python FastAPI Backend
cd backend
pip install -r requirements.txt
python main.py
# Running at http://localhost:8000

# 2. Run React Frontend PWA
npm install
npm run dev
# Running at http://localhost:5173

# 3. Verify TypeScript Typecheck
npx tsc --noEmit

# 4. Verify Production Build
npm run build
```

---

*Documentation updated for Swiggy LifeOS v3.5.0 PROD.*  
*Made with ❤️ for Swiggy Builders Club.*
