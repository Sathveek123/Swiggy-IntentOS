import asyncio
from typing import Dict, Any
from mcp.food_client import FoodMCPClient
from mcp.instamart_client import InstamartMCPClient
from mcp.dineout_client import DineoutMCPClient

async def execute_combined_recipe(intent: Dict[str, Any]) -> Dict[str, Any]:
    """
    Executes official Swiggy MCP Combined Recipe across Food, Instamart & Dineout MCP Servers.
    Dynamically adjusts items, delivery times, and price totals based on budget & intent parameters.
    """
    food_client = FoodMCPClient()
    im_client = InstamartMCPClient()
    dineout_client = DineoutMCPClient()
    
    budget = intent.get("budget", 800)
    occasion = intent.get("occasion", "Custom LifePlan")
    intent_type = intent.get("intent", "FULL_PLAN")

    result = {
        "situation": f"{occasion} · ₹{budget} budget",
        "budget": budget,
        "food": None,
        "instamart": None,
        "dineout": None,
        "totalEstimate": 0,
        "savings": max(20, int(budget * 0.15)),
        "mcp_tools_called": []
    }
    
    # --- STEP 1: Address Resolution ---
    address_id = "home_addr_001"
    try:
        addresses_res = await food_client.get_addresses()
        result["mcp_tools_called"].append("get_addresses ✅")
        address_list = addresses_res.get("data", [])
        if address_list:
            home_addr = next((a for a in address_list if a.get("label") == "Home"), address_list[0])
            address_id = home_addr.get("id") or home_addr.get("addressId") or address_id
    except Exception:
        result["mcp_tools_called"].append("get_addresses (simulated) ⚡")

    # --- STEP 2: Budget-tailored dynamic item generation ---
    if budget <= 150:
        # Survival Mode / Under 150
        food_restaurant = "Sri Krishna Sagar Tiffin"
        food_items = [{"id": "f_1", "name": "Set Dosa (3 pcs) + Sambar", "qty": 1, "price": 65, "category": "food"}]
        food_total = 65
        
        im_items = [{"id": "g_1", "name": "Parle-G Biscuit Family Pack", "qty": 1, "price": 25, "category": "instamart"}]
        im_total = 25
        
        dine_restaurant = "Student Canteen Express"
        dine_slot = "1:00 PM"
        dine_cost = 90

    elif budget <= 400:
        # Budget Meal / Study
        food_restaurant = "Dosa Express & Coffee"
        food_items = [
            {"id": "f_1", "name": "Masala Dosa", "qty": 1, "price": 110, "category": "food"},
            {"id": "f_2", "name": "Filter Coffee", "qty": 1, "price": 40, "category": "food"}
        ]
        food_total = 150

        im_items = [
          {"id": "g_1", "name": "Real Fruit Juice 200ml", "qty": 2, "price": 35, "category": "instamart"},
          {"id": "g_2", "name": "Marie Gold Biscuit", "qty": 1, "price": 30, "category": "instamart"}
        ]
        im_total = 100

        dine_restaurant = "Sagar Ratna South Tiffin"
        dine_slot = "1:30 PM"
        dine_cost = 250

    elif budget <= 600:
        # Gym / Working Late
        food_restaurant = "FitBites Protein Bowl Studio"
        food_items = [
            {"id": "f_1", "name": "Grilled Chicken Bowl", "qty": 1, "price": 270, "category": "food"},
            {"id": "f_2", "name": "Cold Coffee", "qty": 1, "price": 90, "category": "food"}
        ]
        food_total = 360

        im_items = [
            {"id": "g_1", "name": "Greek Yogurt 200g", "qty": 2, "price": 60, "category": "instamart"},
            {"id": "g_2", "name": "Bananas (6 pcs)", "qty": 1, "price": 40, "category": "instamart"}
        ]
        im_total = 160

        dine_restaurant = "NutriKitchen Cafe"
        dine_slot = "8:00 PM"
        dine_cost = 550

    else:
        # Friends Party / Family / Default (₹800+)
        food_restaurant = "Paradise Biryani"
        food_items = [
            {"id": "f_1", "name": "Chicken Biryani", "qty": 2, "price": 180, "category": "food"},
            {"id": "f_2", "name": "Veg Biryani", "qty": 1, "price": 130, "category": "food"},
            {"id": "f_3", "name": "Raita", "qty": 2, "price": 20, "category": "food"}
        ]
        food_total = 530

        im_items = [
            {"id": "g_1", "name": "Pepsi 500ml", "qty": 3, "price": 30, "category": "instamart"},
            {"id": "g_2", "name": "Paper Plates Pack", "qty": 1, "price": 40, "category": "instamart"},
            {"id": "g_3", "name": "Lays Classic", "qty": 2, "price": 25, "category": "instamart"}
        ]
        im_total = 180

        dine_restaurant = "The Biryani House"
        dine_slot = "7:30 PM"
        dine_cost = 650

    # --- STEP 3: Execute MCP tool callers for live data check ---
    food_query = intent.get("food_query", "biryani")
    try:
        res = await food_client.search_restaurants(address_id, food_query)
        result["mcp_tools_called"].append("search_restaurants ✅")
        rests = res.get("data", {}).get("restaurants", [])
        if rests:
            food_restaurant = rests[0].get("name", food_restaurant)
    except Exception:
        result["mcp_tools_called"].append("search_restaurants (mock) ⚡")

    grocery_query = intent.get("grocery_query", "drinks")
    try:
        await im_client.search_products(address_id, grocery_query)
        result["mcp_tools_called"].append("search_products ✅")
    except Exception:
        result["mcp_tools_called"].append("search_products (mock) ⚡")

    try:
        await dineout_client.get_available_slots("r_dine_1", "2026-07-25", intent.get("party_size", 2))
        result["mcp_tools_called"].append("get_available_slots ✅")
    except Exception:
        result["mcp_tools_called"].append("get_available_slots (mock) ⚡")

    result["food"] = {
        "restaurant": food_restaurant,
        "rating": 4.5,
        "items": food_items,
        "deliveryTime": "20 mins" if budget <= 400 else "28 mins",
        "total": food_total
    }

    result["instamart"] = {
        "items": im_items,
        "deliveryTime": "10 mins" if budget <= 400 else "12 mins",
        "total": im_total
    }

    result["dineout"] = {
        "restaurant": dine_restaurant,
        "tableFor": intent.get("party_size", 2),
        "slot": dine_slot,
        "avgCost": dine_cost
    }

    result["totalEstimate"] = food_total + im_total
    return result
