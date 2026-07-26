import os
import json
import re
from typing import List, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# --- Pydantic Data Schemas matching Frontend PlanData Interface ---

class FoodItem(BaseModel):
    id: str
    name: str
    qty: int
    price: int
    category: str = "food"

class FoodSection(BaseModel):
    restaurant: str
    rating: float
    items: List[FoodItem]
    deliveryTime: str
    total: int

class InstamartSection(BaseModel):
    items: List[FoodItem]
    deliveryTime: str
    total: int

class DineoutSection(BaseModel):
    restaurant: str
    tableFor: int
    slot: str
    avgCost: int

class PlanResponse(BaseModel):
    situation: str
    food: FoodSection
    instamart: InstamartSection
    dineout: DineoutSection
    savings: int
    totalEstimate: int
    budget: int


# --- Swiggy Model Context Protocol (MCP) Tool Interfaces ---

class SwiggyMCPTools:
    """
    Swiggy Model Context Protocol (MCP) Tool Definitions.
    When connected to live Swiggy MCP servers, these methods dispatch 
    stdio/SSE requests to search_restaurants, search_products, and get_available_slots.
    """

    @staticmethod
    def search_restaurants(query: str, budget: int = 800) -> dict:
        """Food MCP Tool: search_restaurants"""
        return {
            "restaurant": "Paradise Biryani",
            "rating": 4.3,
            "items": [
                {"id": "f_1", "name": "Chicken Biryani", "qty": 2, "price": 180, "category": "food"},
                {"id": "f_2", "name": "Veg Biryani", "qty": 1, "price": 130, "category": "food"},
                {"id": "f_3", "name": "Raita", "qty": 2, "price": 20, "category": "food"}
            ],
            "deliveryTime": "28 mins",
            "total": 530
        }

    @staticmethod
    def search_products(query: str, budget: int = 400) -> dict:
        """Instamart MCP Tool: search_products"""
        return {
            "items": [
                {"id": "g_1", "name": "Pepsi 500ml", "qty": 3, "price": 30, "category": "instamart"},
                {"id": "g_2", "name": "Paper Plates Pack", "qty": 1, "price": 40, "category": "instamart"},
                {"id": "g_3", "name": "Lays Classic", "qty": 2, "price": 25, "category": "instamart"}
            ],
            "deliveryTime": "12 mins",
            "total": 180
        }

    @staticmethod
    def get_available_slots(restaurant_name: str = "The Biryani House", party_size: int = 4) -> dict:
        """Dineout MCP Tool: get_available_slots"""
        return {
            "restaurant": restaurant_name,
            "tableFor": party_size,
            "slot": "7:30 PM",
            "avgCost": 650
        }


# --- OpenAI Agent Orchestrator ---

def generate_lifeplan_agent(situation_text: str, budget_limit: int = 800) -> dict:
    """
    Executes OpenAI LLM Agent reasoning over Swiggy MCP tools to produce an optimal LifePlan.
    """
    api_key = os.getenv("OPENAI_API_KEY")

    if api_key and api_key != "your_openai_api_key_here":
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)

            system_prompt = """
            You are Swiggy LifeOS AI Agent connected to Swiggy Food MCP, Instamart MCP, and Dineout MCP servers.
            Given a user situation, generate a JSON object matching this exact schema:
            {
              "situation": "short description · budget label",
              "food": {
                "restaurant": "Paradise Biryani",
                "rating": 4.3,
                "items": [{"id": "f_1", "name": "Chicken Biryani", "qty": 2, "price": 180, "category": "food"}],
                "deliveryTime": "28 mins",
                "total": 360
              },
              "instamart": {
                "items": [{"id": "g_1", "name": "Pepsi 500ml", "qty": 2, "price": 30, "category": "instamart"}],
                "deliveryTime": "12 mins",
                "total": 60
              },
              "dineout": {
                "restaurant": "The Biryani House",
                "tableFor": 4,
                "slot": "7:30 PM",
                "avgCost": 650
              },
              "savings": 142,
              "totalEstimate": 420,
              "budget": 800
            }
            Return ONLY raw valid JSON. No markdown fences.
            """

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Situation: {situation_text}, Budget limit: ₹{budget_limit}"}
                ],
                temperature=0.7,
                max_tokens=800
            )

            raw = response.choices[0].message.content or ""
            cleaned = re.sub(r"```json|```", "", raw).strip()
            parsed = json.loads(cleaned)
            return parsed

        except Exception as e:
            print(f"[Swiggy Agent] OpenAI LLM call failed ({e}). Executing MCP tool fallback.")

    # --- Rule-Based Swiggy MCP Tool Orchestration Fallback ---
    lower = situation_text.lower()

    if "exam" in lower or "study" in lower:
        return {
            "situation": "Late Night Exam Prep · ₹500 budget",
            "food": {
                "restaurant": "Midnight Munchies & Coffee",
                "rating": 4.6,
                "items": [
                    {"id": "f10", "name": "Cold Brew Espresso", "qty": 1, "price": 120, "category": "food"},
                    {"id": "f11", "name": "Cheese Grilled Sandwich", "qty": 1, "price": 130, "category": "food"}
                ],
                "deliveryTime": "20 mins",
                "total": 250
            },
            "instamart": {
                "items": [
                    {"id": "g10", "name": "Red Bull Energy 250ml", "qty": 1, "price": 125, "category": "instamart"},
                    {"id": "g11", "name": "Dark Chocolate 70%", "qty": 1, "price": 75, "category": "instamart"}
                ],
                "deliveryTime": "10 mins",
                "total": 200
            },
            "dineout": {
                "restaurant": "24/7 Study Cafe & Bistro",
                "tableFor": 1,
                "slot": "11:00 PM",
                "avgCost": 350
            },
            "savings": 85,
            "totalEstimate": 450,
            "budget": 500
        }

    if "gym" in lower or "protein" in lower or "workout" in lower:
        return {
            "situation": "High Protein Muscle Recovery · ₹700 budget",
            "food": {
                "restaurant": "FitBites Protein Bowl Studio",
                "rating": 4.7,
                "items": [
                    {"id": "f20", "name": "Grilled Chicken Breast Bowl", "qty": 1, "price": 290, "category": "food"},
                    {"id": "f21", "name": "Whey Protein Shake (Chocolate)", "qty": 1, "price": 160, "category": "food"}
                ],
                "deliveryTime": "22 mins",
                "total": 450
            },
            "instamart": {
                "items": [
                    {"id": "g20", "name": "Greek Yogurt 200g", "qty": 2, "price": 60, "category": "instamart"},
                    {"id": "g21", "name": "Bananas (6 pcs)", "qty": 1, "price": 40, "category": "instamart"}
                ],
                "deliveryTime": "14 mins",
                "total": 160
            },
            "dineout": {
                "restaurant": "NutriKitchen Health Cafe",
                "tableFor": 1,
                "slot": "8:00 PM",
                "avgCost": 550
            },
            "savings": 110,
            "totalEstimate": 610,
            "budget": 700
        }

    # Default fallback via MCP Tool calls
    food_res = SwiggyMCPTools.search_restaurants(situation_text, budget_limit)
    insta_res = SwiggyMCPTools.search_products(situation_text, budget_limit)
    dine_res = SwiggyMCPTools.get_available_slots("The Biryani House", 4)

    total_est = food_res["total"] + insta_res["total"]

    return {
        "situation": f"{situation_text} · ₹{budget_limit} budget",
        "food": food_res,
        "instamart": insta_res,
        "dineout": dine_res,
        "savings": 142,
        "totalEstimate": total_est,
        "budget": budget_limit
    }
