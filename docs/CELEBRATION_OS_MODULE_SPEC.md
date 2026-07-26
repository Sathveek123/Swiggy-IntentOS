# 🎂 Celebration OS — Product Engineering Specification

> **Module ID**: `module_06_celebration_os`  
> **AI Personality**: **Event Intelligence AI**  
> **Accent Color**: Gold `#F59E0B`  
> **Route**: `/celebration-os`  
> **Target**: Swiggy Builders Club · `builders@swiggy.in`

---

## 1. The Real Problem

Planning a celebration (Birthday, Anniversary, Promotion) usually requires coordinating across multiple apps or services:
- Ordering main food on Swiggy Food
- Ordering cake & candles on Instamart
- Reserving a table on Dineout

Celebration OS orchestrates all 3 Swiggy services into **a single unified AI plan**.

---

## 2. Core Product Flow

1. **Top Bar**: Back arrow to `/modules` + "🎂 Celebration OS" + Gold "Event AI" badge.
2. **Hero Section**: "Plan the perfect celebration" heading with gold background (`#FFFBEB`).
3. **Occasion Selector**: 🎂 Birthday | 💕 Anniversary | 🎓 Graduation | 🏆 Achievement | 💼 Promotion | 🎊 Just Because.
4. **Details Form**:
   - **People Stepper**: 1 to 10+ guests
   - **Budget Input**: Total budget (e.g. ₹2,500)
   - **When Selector**: Today / Tomorrow / This Weekend
5. **Multi-Service Toggles** (Cross-MCP Coordination):
   - 🍕 **Food Delivery**: Swiggy Food MCP
   - 🎂 **Cake & Party Supplies**: Swiggy Instamart MCP
   - 🍽️ **Restaurant Table Booking**: Swiggy Dineout MCP
6. **Live Budget Split Preview**: Dynamic calculation showing estimated split across Food, Cake, and Dineout.
7. **Execution CTA**: "Plan My [Occasion] →" (Triggers multi-server MCP coordination across Food, Instamart, and Dineout).

---

## 3. Specialized AI Engines

- **Multi-Service Orchestration Engine**: Coordinates API calls across Swiggy Food, Instamart, and Dineout simultaneously.
- **Budget Share Allocator**: Dynamically partitions total budget into optimal shares for food, dessert, and table reservation fees.
- **Event Timing Predictor**: Ensures cake delivery arrives 30 minutes prior to main food or party start time.

---

## 4. Swiggy Business Impact

- **Triple-Service Monetization**: Simultaneously captures GMV across Swiggy Food, Instamart, and Dineout in a single order.
- **High Basket Value**: Celebration plans average ₹1,800–₹3,500 per checkout.
- **Cross-Service Discovery**: Introduces Swiggy Food users to Instamart and Dineout services seamlessly.

---

*Swiggy LifeOS · Celebration OS Spec · July 2026*
