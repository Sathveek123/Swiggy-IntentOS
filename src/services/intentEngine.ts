import { PlanData, IMAGES } from '../data/mockData';
import { fetchLifePlan } from './backendClient';

export async function resolveUserSituation(prompt: string): Promise<PlanData> {
  const cleanPrompt = prompt.trim();

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
    console.warn("Backend API unavailable, using local dynamic intent engine:", e);
  }

  // Dynamic Local Intent Parsing Engine with High-Res Images
  const lower = cleanPrompt.toLowerCase();
  
  if (lower.includes("sick") || lower.includes("headache") || lower.includes("cold") || lower.includes("soup")) {
    return {
      situation: cleanPrompt,
      budget: 300,
      food: {
        restaurant: "Healthy Soup & Healing Bowls",
        rating: 4.8,
        image: IMAGES.soup,
        deliveryTime: "18 mins",
        items: [
          { id: "f_soup_1", name: "Hot Manchow Soup", qty: 1, price: 120, category: "food", image: IMAGES.soup, tag: "Healing Hot 🥣" },
          { id: "f_tea_1", name: "Adrak Ginger Herbal Tea", qty: 1, price: 50, category: "food", image: IMAGES.gingerTea, tag: "Immunitea ☕" }
        ],
        total: 170
      },
      instamart: {
        deliveryTime: "8 mins",
        items: [
          { id: "g_strep_1", name: "Strepsils Honey Lemon", qty: 1, price: 30, category: "instamart", image: IMAGES.strepsils, tag: "Sore Throat 🍋" }
        ],
        total: 30
      },
      dineout: {
        restaurant: "Wellness Tea Lounge",
        rating: 4.7,
        image: IMAGES.fineDining2,
        tableFor: 1,
        slot: "6:00 PM",
        avgCost: 200
      },
      totalEstimate: 200,
      savings: 45
    };
  }

  if (lower.includes("gym") || lower.includes("protein") || lower.includes("workout")) {
    return {
      situation: cleanPrompt,
      budget: 600,
      food: {
        restaurant: "FitBites Protein Studio",
        rating: 4.9,
        image: IMAGES.proteinBowl,
        deliveryTime: "20 mins",
        items: [
          { id: "f_fit_1", name: "Grilled Chicken Protein Bowl", qty: 1, price: 280, category: "food", image: IMAGES.proteinBowl, tag: "35g Protein 💪" },
          { id: "f_shake_1", name: "Whey Protein Shake", qty: 1, price: 140, category: "food", image: IMAGES.shake, tag: "Zero Sugar 🥤" }
        ],
        total: 420
      },
      instamart: {
        deliveryTime: "10 mins",
        items: [
          { id: "g_yogurt_1", name: "Greek Yogurt Blueberry", qty: 2, price: 60, category: "instamart", image: IMAGES.greekYogurt, tag: "15g Protein 🥣" }
        ],
        total: 120
      },
      dineout: {
        restaurant: "The Organic Protein Cafe",
        rating: 4.8,
        image: IMAGES.fineDining3,
        tableFor: 1,
        slot: "8:00 PM",
        avgCost: 500
      },
      totalEstimate: 540,
      savings: 90
    };
  }

  if (lower.includes("exam") || lower.includes("study") || lower.includes("midnight")) {
    return {
      situation: cleanPrompt,
      budget: 400,
      food: {
        restaurant: "24/7 Midnight Cafe & Coffee",
        rating: 4.7,
        image: IMAGES.coffee,
        deliveryTime: "15 mins",
        items: [
          { id: "f_coffee_1", name: "Cold Brew Espresso", qty: 2, price: 140, category: "food", image: IMAGES.coffee, tag: "High Caffeine ⚡" },
          { id: "f_wrap_1", name: "Paneer Tikka Wrap", qty: 1, price: 110, category: "food", image: IMAGES.paneerTikka, tag: "Hot & Cheesy 🧀" }
        ],
        total: 250
      },
      instamart: {
        deliveryTime: "10 mins",
        items: [
          { id: "g_monster_1", name: "Monster Energy 350ml", qty: 1, price: 110, category: "instamart", image: IMAGES.pepsi, tag: "Energy Boost 🚀" }
        ],
        total: 110
      },
      dineout: {
        restaurant: "Study Lounge & Coffee Bar",
        rating: 4.6,
        image: IMAGES.fineDining1,
        tableFor: 1,
        slot: "11:00 PM",
        avgCost: 350
      },
      totalEstimate: 360,
      savings: 60
    };
  }

  // General fallback
  return {
    situation: cleanPrompt,
    budget: 800,
    food: {
      restaurant: "Paradise Biryani",
      rating: 4.5,
      image: IMAGES.biryani,
      deliveryTime: "28 mins",
      items: [
        { id: "f_1", name: "Chicken Biryani", qty: 2, price: 180, category: "food", image: IMAGES.biryani, tag: "Bestseller 🔥" },
        { id: "f_2", name: "Veg Biryani", qty: 1, price: 130, category: "food", image: IMAGES.vegBiryani, tag: "Must Try 🌟" },
        { id: "f_3", name: "Raita", qty: 2, price: 20, category: "food", image: IMAGES.raita }
      ],
      total: 530
    },
    instamart: {
      deliveryTime: "12 mins",
      items: [
        { id: "g_1", name: "Pepsi 500ml", qty: 3, price: 30, category: "instamart", image: IMAGES.pepsi, tag: "Chilled ❄️" },
        { id: "g_2", name: "Paper Plates Pack", price: 40, qty: 1, category: "instamart", image: IMAGES.plates },
        { id: "g_3", name: "Lays Classic", price: 25, qty: 2, category: "instamart", image: IMAGES.chips }
      ],
      total: 180
    },
    dineout: {
      restaurant: "The Biryani House",
      rating: 4.6,
      image: IMAGES.fineDining1,
      tableFor: 4,
      slot: "7:30 PM",
      avgCost: 650
    },
    totalEstimate: 710,
    savings: 120
  };
}
