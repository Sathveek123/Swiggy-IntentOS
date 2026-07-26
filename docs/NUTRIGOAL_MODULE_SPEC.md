# 🥗 NutriGoal Engine — Product Engineering Specification

> **Module ID**: `module_04_nutri_goal`  
> **AI Personality**: **Health Intelligence AI**  
> **Accent Color**: Sky Blue `#0EA5E9`  
> **Route**: `/nutri-goal`  
> **Target**: Swiggy Builders Club · `builders@swiggy.in`

---

## 1. The Real Problem

Health apps usually force users into tedious manual calorie tracking:

```
Track Calories → Manual Entry → Complex Charts → User Drops Off
```

Swiggy LifeOS takes a completely different approach:
- Users input macro targets (Protein, Carbs, Calories) and dietary preferences.
- AI analyzes local restaurant menus & Instamart products to calculate meals hitting exact macro targets.
- Zero manual logging required.

---

## 2. Core Product Flow

1. **Top Bar**: Back arrow to `/modules` + "🥗 NutriGoal Engine" + Blue "Health AI" badge.
2. **Hero Section**: "What are your macro goals?" heading with Sky Blue theme (`#F0F9FF`).
3. **Macro Sliders**:
   - 🥩 **Protein Target Slider**: 20g to 200g (Default: 45g)
   - 🌾 **Carb Limit Slider**: 50g to 300g (Default: 150g)
   - 🔥 **Calorie Target Slider**: 500 to 2500 kcal (Default: 1200 kcal)
4. **Diet Type Selector**: High Protein / Balanced / Veg Only / No Dairy / Keto.
5. **Meal Timing Selector**: Breakfast / Lunch / Post-Workout / Dinner.
6. **Execution CTA**: "Build My Nutrition Plan →" (Navigates to `/thinking` → `/plan` with staged macro parameters).

---

## 3. Specialized AI Engines

- **Nutrition Intelligence Engine**: Maps raw menu items to macro/micronutrient profiles.
- **Goal Alignment Engine**: Scores every food option based on how closely it matches the user's protein and calorie targets.
- **Grocery Synergy Engine**: Recommends Instamart add-ons (Greek yogurt, eggs, fruit) to fill protein or vitamin gaps.
- **Habit Formation Engine**: Gently suggests timing and post-workout meal adjustments without restrictive calorie counting.

---

## 4. Swiggy Business Impact

- **Instamart Basket Size**: Increases average basket size via protein & fresh fruit add-ons (+35%).
- **High-LTV Retention**: Health-conscious users demonstrate 2.4x higher repeat order frequency.
- **Health Brand Partnerships**: Creates co-marketing opportunities for health-focused cloud kitchens (FitBites, NutriBowl).

---

*Swiggy LifeOS · NutriGoal Engine Spec · July 2026*
