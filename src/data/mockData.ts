export interface FoodItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  category: 'food' | 'instamart';
  image?: string;
  tag?: string;
}

export interface PlanData {
  situation: string;
  food: {
    restaurant: string;
    rating: number;
    image?: string;
    items: FoodItem[];
    deliveryTime: string;
    total: number;
  };
  instamart: {
    items: FoodItem[];
    deliveryTime: string;
    total: number;
  };
  dineout: {
    restaurant: string;
    rating?: number;
    image?: string;
    tableFor: number;
    slot: string;
    avgCost: number;
    offer?: string;
  };
  savings: number;
  totalEstimate: number;
  budget: number;
}

export const IMAGES = {
  // 25+ High-Resolution Food & Grocery Imagery
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  vegBiryani: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&auto=format&fit=crop&q=80",
  muttonBiryani: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
  raita: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
  paradiseResto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
  
  dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
  idli: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
  coffee: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
  
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
  gingerTea: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
  lemonHoneyTea: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80",
  strepsils: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
  
  proteinBowl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
  shake: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
  greekYogurt: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
  bananas: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
  
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
  nachos: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&auto=format&fit=crop&q=80",
  lavaCake: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
  gulabJamun: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
  
  butterChicken: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
  paneerTikka: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
  thali: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&auto=format&fit=crop&q=80",
  dalMakhani: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
  naan: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80",
  
  milk: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
  eggs: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop&q=80",
  pepsi: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
  chips: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
  plates: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
  
  fineDining1: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80",
  fineDining2: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop&q=80",
  fineDining3: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80"
};

export const defaultMockPlan: PlanData = {
  situation: "Friends coming over · ₹800 budget",
  food: {
    restaurant: "Paradise Biryani",
    rating: 4.3,
    image: IMAGES.paradiseResto,
    items: [
      { id: "f1", name: "Hyderabadi Chicken Biryani", qty: 2, price: 180, category: 'food', image: IMAGES.biryani, tag: "Bestseller 🔥" },
      { id: "f2", name: "Paneer Veg Biryani", qty: 1, price: 130, category: 'food', image: IMAGES.vegBiryani, tag: "Must Try 🌟" },
      { id: "f3", name: "Mint Masala Raita", qty: 2, price: 20, category: 'food', image: IMAGES.raita }
    ],
    deliveryTime: "28 mins",
    total: 530
  },
  instamart: {
    items: [
      { id: "g1", name: "Pepsi Cold Drink 500ml", qty: 3, price: 30, category: 'instamart', image: IMAGES.pepsi, tag: "Chilled ❄️" },
      { id: "g2", name: "Paper Plates Pack (10s)", qty: 1, price: 40, category: 'instamart', image: IMAGES.plates },
      { id: "g3", name: "Lays Classic Salted", qty: 2, price: 25, category: 'instamart', image: IMAGES.chips }
    ],
    deliveryTime: "12 mins",
    total: 180
  },
  dineout: {
    restaurant: "The Biryani House",
    rating: 4.6,
    image: IMAGES.fineDining1,
    tableFor: 4,
    slot: "7:30 PM",
    avgCost: 650,
    offer: "Flat 25% Off on Bill"
  },
  savings: 142,
  totalEstimate: 710,
  budget: 800
};

export const chipMockPlans: Record<string, PlanData> = {
  "👥 Friends Coming Over": defaultMockPlan,

  "📚 Exam Tomorrow": {
    situation: "Late Night Exam Prep · ₹400 budget",
    food: {
      restaurant: "Midnight Munchies & Coffee",
      rating: 4.6,
      image: IMAGES.coffee,
      items: [
        { id: "f10", name: "Cold Brew Espresso", qty: 1, price: 120, category: 'food', image: IMAGES.coffee, tag: "High Caffeine ⚡" },
        { id: "f11", name: "Cheese Grilled Sandwich", qty: 1, price: 130, category: 'food', image: IMAGES.dosa, tag: "Hot & Cheesy 🧀" }
      ],
      deliveryTime: "20 mins",
      total: 250
    },
    instamart: {
      items: [
        { id: "g10", name: "Red Bull Energy Drink", qty: 1, price: 125, category: 'instamart', image: IMAGES.pepsi, tag: "Energy 🚀" },
        { id: "g11", name: "Dark Chocolate 70%", qty: 1, price: 75, category: 'instamart', image: IMAGES.chips }
      ],
      deliveryTime: "10 mins",
      total: 200
    },
    dineout: {
      restaurant: "24/7 Study Cafe & Bistro",
      rating: 4.7,
      image: IMAGES.fineDining2,
      tableFor: 1,
      slot: "11:00 PM",
      avgCost: 350,
      offer: "Free Wi-Fi & Coffee"
    },
    savings: 85,
    totalEstimate: 450,
    budget: 500
  },

  "🏋️ Post Gym Meal": {
    situation: "High Protein Muscle Recovery · ₹600 budget",
    food: {
      restaurant: "FitBites Protein Bowl Studio",
      rating: 4.7,
      image: IMAGES.proteinBowl,
      items: [
        { id: "f20", name: "Grilled Chicken Breast Bowl (35g Protein)", qty: 1, price: 290, category: 'food', image: IMAGES.proteinBowl, tag: "35g Protein 💪" },
        { id: "f21", name: "Whey Protein Shake (Chocolate)", qty: 1, price: 160, category: 'food', image: IMAGES.shake, tag: "Zero Sugar 🥤" }
      ],
      deliveryTime: "22 mins",
      total: 450
    },
    instamart: {
      items: [
        { id: "g20", name: "Greek Yogurt High Protein", qty: 2, price: 60, category: 'instamart', image: IMAGES.greekYogurt, tag: "15g Protein 🥣" },
        { id: "g21", name: "Organic Bananas (6 pcs)", qty: 1, price: 40, category: 'instamart', image: IMAGES.bananas }
      ],
      deliveryTime: "14 mins",
      total: 160
    },
    dineout: {
      restaurant: "NutriKitchen Health Bistro",
      rating: 4.8,
      image: IMAGES.fineDining3,
      tableFor: 1,
      slot: "8:00 PM",
      avgCost: 550,
      offer: "20% Off Protein Bowls"
    },
    savings: 110,
    totalEstimate: 610,
    budget: 700
  },

  "💸 Under ₹300": {
    situation: "Budget Saver Meal · ₹300 limit",
    food: {
      restaurant: "Dosa Express",
      rating: 4.4,
      image: IMAGES.dosa,
      items: [
        { id: "f30", name: "Crispy Masala Dosa", qty: 1, price: 110, category: 'food', image: IMAGES.dosa, tag: "Crispy 🥞" },
        { id: "f31", name: "South Indian Filter Coffee", qty: 1, price: 40, category: 'food', image: IMAGES.coffee }
      ],
      deliveryTime: "18 mins",
      total: 150
    },
    instamart: {
      items: [
        { id: "g30", name: "Real Fruit Juice 200ml", qty: 2, price: 35, category: 'instamart', image: IMAGES.pepsi },
        { id: "g31", name: "Marie Gold Biscuit", qty: 1, price: 30, category: 'instamart', image: IMAGES.chips }
      ],
      deliveryTime: "11 mins",
      total: 100
    },
    dineout: {
      restaurant: "Sagar Ratna South Tiffin",
      rating: 4.5,
      image: IMAGES.fineDining1,
      tableFor: 2,
      slot: "1:30 PM",
      avgCost: 250,
      offer: "10% Off Tiffin"
    },
    savings: 60,
    totalEstimate: 250,
    budget: 300
  },

  "🎉 Birthday Party": {
    situation: "Celebration Special · ₹2000 budget",
    food: {
      restaurant: "Truffles Gourmet & Pizza",
      rating: 4.8,
      image: IMAGES.pizza,
      items: [
        { id: "f40", name: "Paneer Tikka Pizza 12\"", qty: 1, price: 480, category: 'food', image: IMAGES.pizza, tag: "Chef Special 🍕" },
        { id: "f41", name: "Loaded Cheese Nachos Supreme", qty: 1, price: 290, category: 'food', image: IMAGES.nachos },
        { id: "f42", name: "Molten Lava Chocolate Cake", qty: 3, price: 110, category: 'food', image: IMAGES.lavaCake, tag: "Dessert Spl 🎂" }
      ],
      deliveryTime: "32 mins",
      total: 1100
    },
    instamart: {
      items: [
        { id: "g40", name: "Chocolate Cake 500g", qty: 1, price: 450, category: 'instamart', image: IMAGES.lavaCake },
        { id: "g41", name: "Party Popper & Balloons", qty: 1, price: 150, category: 'instamart', image: IMAGES.plates },
        { id: "g42", name: "Sprite 1.25L Bottle", qty: 2, price: 65, category: 'instamart', image: IMAGES.pepsi }
      ],
      deliveryTime: "15 mins",
      total: 730
    },
    dineout: {
      restaurant: "Sky Lounge & Terrace Bistro",
      rating: 4.9,
      image: IMAGES.fineDining2,
      tableFor: 6,
      slot: "8:30 PM",
      avgCost: 2200,
      offer: "Flat 30% Off Group Booking"
    },
    savings: 340,
    totalEstimate: 1830,
    budget: 2000
  },

  "👨‍👩‍👧‍👦 Family Dinner": {
    situation: "Weekend Family Feast · ₹1500 budget",
    food: {
      restaurant: "Punjab Grill & Curry House",
      rating: 4.6,
      image: IMAGES.butterChicken,
      items: [
        { id: "f50", name: "Makhani Butter Chicken", qty: 1, price: 420, category: 'food', image: IMAGES.butterChicken, tag: "Royal Gravy 🍗" },
        { id: "f51", name: "Slow Cooked Dal Makhani", qty: 1, price: 280, category: 'food', image: IMAGES.dalMakhani },
        { id: "f52", name: "Garlic Butter Naan (4 pcs)", qty: 1, price: 180, category: 'food', image: IMAGES.naan }
      ],
      deliveryTime: "30 mins",
      total: 880
    },
    instamart: {
      items: [
        { id: "g50", name: "Amul Vanilla Ice Cream 1L", qty: 1, price: 180, category: 'instamart', image: IMAGES.lavaCake },
        { id: "g51", name: "Gulab Jamun (8 pcs)", qty: 1, price: 140, category: 'instamart', image: IMAGES.raita }
      ],
      deliveryTime: "14 mins",
      total: 320
    },
    dineout: {
      restaurant: "Barbeque Nation Family Resto",
      rating: 4.7,
      image: IMAGES.fineDining3,
      tableFor: 4,
      slot: "8:00 PM",
      avgCost: 1600,
      offer: "Unlimited Buffet Special"
    },
    savings: 220,
    totalEstimate: 1200,
    budget: 1500
  },

  "survival_mode": {
    situation: "Student Survival Mode · ₹100 Max Calories",
    food: {
      restaurant: "Sri Krishna Sagar Tiffin",
      rating: 4.5,
      image: IMAGES.dosa,
      items: [
        { id: "m1", name: "Set Dosa (3 pcs) + Sambar", qty: 1, price: 65, category: 'food', image: IMAGES.dosa, tag: "Max Calories ⚡" }
      ],
      deliveryTime: "15 mins",
      total: 65
    },
    instamart: {
      items: [
        { id: "m2", name: "Parle-G Biscuit Family Pack", qty: 1, price: 25, category: 'instamart', image: IMAGES.chips }
      ],
      deliveryTime: "10 mins",
      total: 25
    },
    dineout: {
      restaurant: "Student Canteen Express",
      rating: 4.4,
      image: IMAGES.fineDining1,
      tableFor: 1,
      slot: "1:00 PM",
      avgCost: 90,
      offer: "Student Pass Discount"
    },
    savings: 25,
    totalEstimate: 90,
    budget: 100
  }
};
