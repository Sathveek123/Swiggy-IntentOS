import { PlanData } from '../data/mockData';

const BACKEND_URL = 'http://localhost:8000';

export interface BackendPlanResponse {
  success?: boolean;
  situation?: string;
  food?: any;
  instamart?: any;
  dineout?: any;
  savings?: number;
  total_estimate?: number;
  totalEstimate?: number;
  budget?: number;
  mcp_tools_called?: string[];
}

export interface AgentChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AgentChatResponse {
  role: string;
  content: string;
  mcp_tools_executed: Array<{
    tool: string;
    server: string;
    status: string;
    result?: string;
  }>;
  plan: PlanData;
}

export async function fetchLifePlan(situation: string): Promise<BackendPlanResponse | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation })
    });
    
    if (!response.ok) throw new Error('Backend unavailable');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('[LifeOS] Backend offline or unavailable, using client engine:', error);
    return null;
  }
}

export async function sendAgentChatMessage(messages: AgentChatMessage[]): Promise<AgentChatResponse | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/agent/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    
    if (!response.ok) throw new Error('Backend unavailable');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('[LifeOS] Agent chat endpoint unavailable, fallback to mock agent:', error);
    return null;
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/`);
    return res.ok;
  } catch {
    return false;
  }
}

export function convertBackendPlan(backendPlan: BackendPlanResponse): PlanData {
  const foodItems = (backendPlan.food?.items || []).map((item: any, i: number) => ({
    id: item.id || `f_${i}`,
    name: item.name,
    qty: item.qty || 1,
    price: item.price || 0,
    category: 'food' as const
  }));

  const instamartItems = (backendPlan.instamart?.items || []).map((item: any, i: number) => ({
    id: item.id || `g_${i}`,
    name: item.name,
    qty: item.qty || 1,
    price: item.price || 0,
    category: 'instamart' as const
  }));

  const foodTotal = foodItems.reduce((s: number, i: any) => s + (i.price * i.qty), 0) || backendPlan.food?.total || 0;
  const imTotal = instamartItems.reduce((s: number, i: any) => s + (i.price * i.qty), 0) || backendPlan.instamart?.total || 0;
  const grandTotal = foodTotal + imTotal;

  return {
    situation: backendPlan.situation || "Your LifePlan",
    food: {
      restaurant: backendPlan.food?.restaurant || "Paradise Biryani",
      rating: backendPlan.food?.rating || 4.3,
      items: foodItems,
      deliveryTime: backendPlan.food?.delivery_time || backendPlan.food?.deliveryTime || "28 mins",
      total: foodTotal
    },
    instamart: {
      items: instamartItems,
      deliveryTime: backendPlan.instamart?.delivery_time || backendPlan.instamart?.deliveryTime || "12 mins",
      total: imTotal
    },
    dineout: {
      restaurant: backendPlan.dineout?.restaurant || "The Biryani House",
      tableFor: backendPlan.dineout?.tableFor || backendPlan.dineout?.table_for || 2,
      slot: backendPlan.dineout?.slot || backendPlan.dineout?.available_slot?.time || "7:30 PM",
      avgCost: backendPlan.dineout?.avgCost || backendPlan.dineout?.avg_cost || 600
    },
    savings: backendPlan.savings || 142,
    totalEstimate: grandTotal > 0 ? grandTotal : (backendPlan.total_estimate || backendPlan.totalEstimate || 0),
    budget: backendPlan.budget || 800
  };
}
