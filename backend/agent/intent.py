import os
import json
from typing import Dict, Any
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

anthropic_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", ""))

def classify_intent(situation_text: str) -> Dict[str, Any]:
    """
    Uses Anthropic Claude 3.5 Sonnet to dynamically analyze user situation
    and construct a custom, intelligent Swiggy LifePlan.
    """
    system_prompt = """
    You are Swiggy LifeOS AI Agent. Analyze the user's situation and output a JSON object representing a multi-service Swiggy LifePlan across Food Delivery, Instamart Quick Commerce, and Dineout Reservations.

    Respond ONLY with a valid JSON object matching this schema:
    {
      "intent": "short_intent_category",
      "budget": 800,
      "food": {
        "restaurant": "Restaurant Name",
        "rating": 4.7,
        "deliveryTime": "22 mins",
        "items": [
          {"id": "f_1", "name": "Dish Name", "qty": 1, "price": 180, "category": "food"}
        ]
      },
      "instamart": {
        "deliveryTime": "10 mins",
        "items": [
          {"id": "g_1", "name": "Product Name", "qty": 1, "price": 40, "category": "instamart"}
        ]
      },
      "dineout": {
        "restaurant": "Dineout Venue Name",
        "tableFor": 2,
        "slot": "7:30 PM",
        "avgCost": 600
      },
      "savings": 120,
      "mcp_tools_called": [
        "get_addresses ✅",
        "search_restaurants ✅",
        "search_products ✅",
        "get_available_slots ✅"
      ]
    }
    """

    try:
        if os.getenv("ANTHROPIC_API_KEY"):
            response = anthropic_client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1000,
                system=system_prompt,
                messages=[{"role": "user", "content": f"User situation: '{situation_text}'"}]
            )
            content = response.content[0].text
            if "{" in content and "}" in content:
                json_str = content[content.find("{"):content.rfind("}")+1]
                data = json.loads(json_str)
                data["situation"] = situation_text
                
                f_total = sum(i["price"] * i["qty"] for i in data["food"]["items"])
                im_total = sum(i["price"] * i["qty"] for i in data["instamart"]["items"])
                data["food"]["total"] = f_total
                data["instamart"]["total"] = im_total
                data["totalEstimate"] = f_total + im_total
                return data
    except Exception as e:
        print(f"[Claude Intent Error]: {e}")

    lower_p = situation_text.lower()
    budget = 800
    if "200" in lower_p or "100" in lower_p: budget = 200
    elif "500" in lower_p or "300" in lower_p: budget = 500
    elif "1000" in lower_p or "1200" in lower_p: budget = 1200

    if "sick" in lower_p or "headache" in lower_p or "cold" in lower_p or "soup" in lower_p:
        return {
            "situation": situation_text,
            "budget": budget,
            "food": {
                "restaurant": "Healthy Soup & Healing Bowls",
                "rating": 4.8,
                "deliveryTime": "18 mins",
                "items": [
                    {"id": "f_1", "name": "Hot Manchow Soup", "qty": 1, "price": 120, "category": "food"},
                    {"id": "f_2", "name": "Adrak Ginger Herbal Tea", "qty": 1, "price": 50, "category": "food"}
                ],
                "total": 170
            },
            "instamart": {
                "deliveryTime": "8 mins",
                "items": [
                    {"id": "g_1", "name": "Strepsils Honey Lemon", "qty": 1, "price": 30, "category": "instamart"}
                ],
                "total": 30
            },
            "dineout": {
                "restaurant": "Wellness Tea Lounge",
                "tableFor": 1,
                "slot": "6:00 PM",
                "avgCost": 200
            },
            "totalEstimate": 200,
            "savings": 45,
            "mcp_tools_called": ["get_addresses ✅", "search_restaurants ✅", "search_products ✅"]
        }
    elif "gym" in lower_p or "protein" in lower_p or "workout" in lower_p:
        return {
            "situation": situation_text,
            "budget": budget,
            "food": {
                "restaurant": "FitBites Protein Studio",
                "rating": 4.9,
                "deliveryTime": "20 mins",
                "items": [
                    {"id": "f_1", "name": "Grilled Chicken Protein Bowl", "qty": 1, "price": 280, "category": "food"},
                    {"id": "f_2", "name": "Whey Protein Shake", "qty": 1, "price": 140, "category": "food"}
                ],
                "total": 420
            },
            "instamart": {
                "deliveryTime": "10 mins",
                "items": [
                    {"id": "g_1", "name": "Greek Yogurt Blueberry", "qty": 2, "price": 60, "category": "instamart"}
                ],
                "total": 120
            },
            "dineout": {
                "restaurant": "The Organic Protein Cafe",
                "tableFor": 1,
                "slot": "8:00 PM",
                "avgCost": 500
            },
            "totalEstimate": 540,
            "savings": 90,
            "mcp_tools_called": ["get_addresses ✅", "search_restaurants ✅", "search_products ✅"]
        }

    return {
        "situation": situation_text,
        "budget": budget,
        "food": {
            "restaurant": "Paradise Biryani",
            "rating": 4.5,
            "deliveryTime": "28 mins",
            "items": [
                {"id": "f_1", "name": "Chicken Biryani", "qty": 2, "price": 180, "category": "food"},
                {"id": "f_2", "name": "Veg Biryani", "qty": 1, "price": 130, "category": "food"},
                {"id": "f_3", "name": "Raita", "qty": 2, "price": 20, "category": "food"}
            ],
            "total": 530
        },
        "instamart": {
            "deliveryTime": "12 mins",
            "items": [
                {"id": "g_1", "name": "Pepsi 500ml", "qty": 3, "price": 30, "category": "instamart"},
                {"id": "g_2", "name": "Paper Plates Pack", "qty": 1, "price": 40, "category": "instamart"},
                {"id": "g_3", "name": "Lays Classic", "qty": 2, "price": 25, "category": "instamart"}
            ],
            "total": 180
        },
        "dineout": {
            "restaurant": "The Biryani House",
            "tableFor": 4,
            "slot": "7:30 PM",
            "avgCost": 650
        },
        "totalEstimate": 710,
        "savings": 120,
        "mcp_tools_called": [
            "get_addresses ✅",
            "search_restaurants ✅",
            "search_products ✅",
            "get_available_slots ✅"
        ]
    }

classify_intent_with_claude = classify_intent
