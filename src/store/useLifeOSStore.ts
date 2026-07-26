import { create } from 'zustand';
import { defaultMockPlan, PlanData, FoodItem, chipMockPlans } from '../data/mockData';

interface LifeOSState {
  situationText: string;
  selectedChip: string | null;
  activeLifeModule: string | null;
  planData: PlanData;
  cartItems: FoodItem[];
  mcpToolsCalled: string[];
  isVoiceActive: boolean;

  setSituation: (text: string) => void;
  setChip: (chip: string | null) => void;
  setLifeModule: (moduleKey: string) => void;
  setPlan: (plan: PlanData) => void;
  
  addToCart: (items: FoodItem[]) => void;
  replaceCartWithPlan: (items: FoodItem[]) => void;
  updateCartItemQty: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  toggleVoice: () => void;
  resetStore: () => void;
  placeOrder: () => void;
}

export const useLifeOSStore = create<LifeOSState>((set, get) => ({
  situationText: '',
  selectedChip: null,
  activeLifeModule: null,
  planData: defaultMockPlan,
  cartItems: [],
  mcpToolsCalled: [
    "get_addresses ✅",
    "search_restaurants ✅",
    "get_restaurant_menu ✅",
    "search_products ✅",
    "get_saved_locations ✅",
    "search_restaurants_dineout ✅",
    "get_available_slots ✅"
  ],
  isVoiceActive: false,

  setSituation: (text: string) => set({ situationText: text }),
  
  setChip: (chip: string | null) => {
    if (chip && chipMockPlans[chip]) {
      set({ 
        selectedChip: chip, 
        planData: chipMockPlans[chip],
        mcpToolsCalled: [
          "get_addresses ✅",
          "search_restaurants ✅",
          "search_products ✅",
          "get_available_slots ✅"
        ]
      });
    } else {
      set({ selectedChip: chip });
    }
  },

  setLifeModule: (moduleKey: string) => set({ activeLifeModule: moduleKey }),

  setPlan: (plan: PlanData) => set({ 
    planData: plan,
    mcpToolsCalled: [
      "get_addresses ✅",
      "search_restaurants ✅",
      "search_products ✅",
      "get_available_slots ✅"
    ]
  }),

  addToCart: (newItems: FoodItem[]) => set((state) => {
    const updatedCart = [...state.cartItems];
    newItems.forEach((item) => {
      const existing = updatedCart.find((c) => c.id === item.id);
      if (existing) {
        existing.qty += item.qty;
      } else {
        updatedCart.push({ ...item });
      }
    });
    return { cartItems: updatedCart };
  }),

  replaceCartWithPlan: (items: FoodItem[]) => set({
    cartItems: items.map(i => ({ ...i }))
  }),

  updateCartItemQty: (itemId: string, delta: number) => set((state) => {
    const updatedCart = state.cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as FoodItem[];

    return { cartItems: updatedCart };
  }),

  removeFromCart: (itemId: string) => set((state) => ({
    cartItems: state.cartItems.filter((i) => i.id !== itemId),
  })),

  clearCart: () => set({ cartItems: [] }),

  toggleVoice: () => set((state) => ({ isVoiceActive: !state.isVoiceActive })),

  resetStore: () => set({
    situationText: '',
    selectedChip: null,
    activeLifeModule: null,
    planData: defaultMockPlan,
    cartItems: [],
    mcpToolsCalled: [
      "get_addresses ✅",
      "search_restaurants ✅",
      "search_products ✅",
      "get_available_slots ✅"
    ],
    isVoiceActive: false
  }),

  placeOrder: () => set({
    cartItems: [],
    situationText: '',
    selectedChip: null
  })
}));
