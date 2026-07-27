import { PlanData, IMAGES } from '../data/mockData';
import { fetchLifePlan } from './backendClient';

export async function resolveUserSituation(prompt: string): Promise<PlanData> {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase();

  // 1. Try FastAPI backend live agent if available
  try {
    const livePlan = await fetchLifePlan(cleanPrompt);
    if (livePlan && livePlan.food && livePlan.food.items) {
      return {
        situation: livePlan.situation || cleanPrompt,
        budget: livePlan.budget || 800,
        food: {
          ...livePlan.food,
          image: livePlan.food.image || IMAGES.soup
        },
        instamart: livePlan.instamart,
        dineout: {
          ...livePlan.dineout,
          image: livePlan.dineout.image || IMAGES.fineDining1
        },
        savings: livePlan.savings || 120,
        totalEstimate: livePlan.totalEstimate || (livePlan.food.total + livePlan.instamart.total)
      };
    }
  } catch (e) {
    console.warn("Backend API unavailable, using dynamic local intent engine:", e);
  }

  // 2. Extract Budget from prompt dynamically
  const budgetMatch = cleanPrompt.match(/(?:budget|under|rs\.?|rupees?|₹)\s*:?\s*₹?\s*(\d+)/i) || cleanPrompt.match(/(\d+)\s*(?:rupees?|rs|budget|₹)/i);
  let parsedBudget = budgetMatch ? parseInt(budgetMatch[1]) : 800;
  if (parsedBudget < 50) parsedBudget = 300;

  // 3. Handle Stray Dogs / Community Feed Intent
  if (lower.includes("dog") || lower.includes("stray") || lower.includes("animal")) {
    const targetCount = 50;
    const foodCost = Math.min(6500, Math.round(parsedBudget * 0.8));
    const instamartCost = Math.min(1200, Math.round(parsedBudget * 0.15));
    const totalEst = foodCost + instamartCost;

    return {
      situation: cleanPrompt,
      budget: parsedBudget,
      food: {
        restaurant: "Community Kitchen & Animal Relief",
        rating: 4.9,
        image: IMAGES.thali,
        deliveryTime: "30 mins",
        items: [
          { id: "f_dog_1", name: `Bulk Chicken & Rice Meal Trays (${targetCount} packs)`, qty: 1, price: foodCost, category: "food", image: IMAGES.thali, tag: "50 Meals Bulk Pack 🐾" }
        ],
        total: foodCost
      },
      instamart: {
        deliveryTime: "12 mins",
        items: [
          { id: "g_dog_1", name: "Pedigree & Meat Treat Packs (5s)", qty: 2, price: Math.round(instamartCost / 2), category: "instamart", image: IMAGES.chips, tag: "Animal Nutrition 🐕" }
        ],
        total: instamartCost
      },
      dineout: {
        restaurant: "Community Center Garden",
        rating: 4.8,
        image: IMAGES.fineDining1,
        tableFor: 2,
        slot: "5:00 PM",
        avgCost: 0
      },
      savings: 450,
      totalEstimate: totalEst
    };
  }

  // 4. Handle Pancake Intent
  if (lower.includes("pancake") || lower.includes("pan cake") || lower.includes("waffle")) {
    const foodCost = 210;
    const instamartCost = 45;
    const totalEst = foodCost + instamartCost;

    return {
      situation: cleanPrompt,
      budget: parsedBudget,
      food: {
        restaurant: "The Pancake Story & Waffle House",
        rating: 4.8,
        image: IMAGES.pizza,
        deliveryTime: "18 mins",
        items: [
          { id: "f_pan_1", name: "Fluffy Maple Syrup Pancakes (3pcs)", qty: 1, price: 150, category: "food", image: IMAGES.pizza, tag: "Top Rated 🥞" },
          { id: "f_pan_2", name: "Nutella Chocolate Waffle Bite", qty: 1, price: 60, category: "food", image: IMAGES.pizza, tag: "Fresh Baked 🍫" }
        ],
        total: foodCost
      },
      instamart: {
        deliveryTime: "10 mins",
        items: [
          { id: "g_milk_1", name: "Amul Fresh Whipped Cream 200ml", qty: 1, price: 45, category: "instamart", image: IMAGES.pepsi, tag: "Fresh Cold 🥛" }
        ],
        total: instamartCost
      },
      dineout: {
        restaurant: "The Waffle & Pancake Cafe",
        rating: 4.7,
        image: IMAGES.fineDining2,
        tableFor: 2,
        slot: "4:30 PM",
        avgCost: 300
      },
      savings: 35,
      totalEstimate: totalEst
    };
  }

  // 5. Handle Health / Protein Intent
  if (lower.includes("gym") || lower.includes("protein") || lower.includes("workout") || lower.includes("health")) {
    const foodCost = 320;
    const instamartCost = 110;
    const totalEst = foodCost + instamartCost;

    return {
      situation: cleanPrompt,
      budget: parsedBudget,
      food: {
        restaurant: "FitBites Protein Studio",
        rating: 4.9,
        image: IMAGES.proteinBowl,
        deliveryTime: "20 mins",
        items: [
          { id: "f_fit_1", name: "Grilled Chicken Protein Bowl", qty: 1, price: 240, category: "food", image: IMAGES.proteinBowl, tag: "35g Protein 💪" },
          { id: "f_fit_2", name: "Cold Brew Whey Protein Shake", qty: 1, price: 80, category: "food", image: IMAGES.coffee, tag: "Zero Sugar 🥤" }
        ],
        total: foodCost
      },
      instamart: {
        deliveryTime: "10 mins",
        items: [
          { id: "g_yogurt_1", name: "Epigamia Greek Yogurt Blueberry", qty: 2, price: 55, category: "instamart", image: IMAGES.pepsi, tag: "15g Protein 🥣" }
        ],
        total: instamartCost
      },
      dineout: {
        restaurant: "The Organic Health Cafe",
        rating: 4.8,
        image: IMAGES.fineDining3,
        tableFor: 1,
        slot: "7:00 PM",
        avgCost: 400
      },
      totalEstimate: totalEst,
      savings: 65
    };
  }

  // 6. Handle Sick / Healing Soup Intent
  if (lower.includes("sick") || lower.includes("cold") || lower.includes("soup") || lower.includes("fever")) {
    const foodCost = 150;
    const instamartCost = 35;
    const totalEst = foodCost + instamartCost;

    return {
      situation: cleanPrompt,
      budget: parsedBudget,
      food: {
        restaurant: "Healthy Soup & Immunity Kitchen",
        rating: 4.8,
        image: IMAGES.soup,
        deliveryTime: "16 mins",
        items: [
          { id: "f_soup_1", name: "Hot Chicken Manchow Soup", qty: 1, price: 110, category: "food", image: IMAGES.soup, tag: "Immunity Hot 🥣" },
          { id: "f_tea_1", name: "Adrak Herbal Ginger Tea", qty: 1, price: 40, category: "food", image: IMAGES.gingerTea, tag: "Healing Tea ☕" }
        ],
        total: foodCost
      },
      instamart: {
        deliveryTime: "8 mins",
        items: [
          { id: "g_strep_1", name: "Strepsils Orange Vitamin C", qty: 1, price: 35, category: "instamart", image: IMAGES.strepsils, tag: "Sore Throat 🍊" }
        ],
        total: instamartCost
      },
      dineout: {
        restaurant: "Wellness Tea Lounge",
        rating: 4.7,
        image: IMAGES.fineDining2,
        tableFor: 1,
        slot: "6:00 PM",
        avgCost: 200
      },
      totalEstimate: totalEst,
      savings: 40
    };
  }

  // 7. General Dynamic Intent Engine (Fits any prompt & requested budget)
  const item1Price = Math.min(180, Math.round(parsedBudget * 0.45));
  const item2Price = Math.min(110, Math.round(parsedBudget * 0.25));
  const instamartPrice = Math.min(60, Math.round(parsedBudget * 0.15));

  const mainDishName = cleanPrompt.length > 2 ? `${cleanPrompt.slice(0, 24)} Special Meal` : "Hyderabadi Biryani Combo";
  const foodTotal = item1Price + item2Price;
  const totalEst = foodTotal + instamartPrice;

  return {
    situation: cleanPrompt,
    budget: parsedBudget,
    food: {
      restaurant: "Swiggy Select Kitchen",
      rating: 4.8,
      image: IMAGES.biryani,
      deliveryTime: "22 mins",
      items: [
        { id: "f_gen_1", name: mainDishName, qty: 1, price: item1Price, category: "food", image: IMAGES.biryani, tag: "LifeOS Choice ✨" },
        { id: "f_gen_2", name: "Crispy Garlic Bread / Side Dish", qty: 1, price: item2Price, category: "food", image: IMAGES.dosa, tag: "Chef Special 🌟" }
      ],
      total: foodTotal
    },
    instamart: {
      deliveryTime: "10 mins",
      items: [
        { id: "g_gen_1", name: "Chilled Beverage 500ml", qty: 1, price: instamartPrice, category: "instamart", image: IMAGES.pepsi, tag: "10-Min Fast ⚡" }
      ],
      total: instamartPrice
    },
    dineout: {
      restaurant: "Swiggy Gourmet Bistro",
      rating: 4.7,
      image: IMAGES.fineDining1,
      tableFor: 2,
      slot: "8:00 PM",
      avgCost: 450
    },
    totalEstimate: totalEst,
    savings: Math.round(totalEst * 0.2)
  };
}
