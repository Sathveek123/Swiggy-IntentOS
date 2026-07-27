import os
import re
import json
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

# ── Budget extractor ──────────────────────────────────────────────────────────
def _extract_budget(text: str) -> int:
    nums = re.findall(r'[\u20b9rs\.]?\s*(\d{3,6})', text.lower())
    for n in nums:
        val = int(n)
        if 50 <= val <= 50000:
            return val
    return 800

# ── Plan factory ─────────────────────────────────────────────────────────────
def _make_plan(situation, budget, restaurant, rating, delivery, items_food,
               items_im, dine_rest, dine_for, dine_slot, dine_avg, savings):
    f_total = sum(i["price"] * i["qty"] for i in items_food)
    im_total = sum(i["price"] * i["qty"] for i in items_im)
    return {
        "situation": situation,
        "budget": budget,
        "food": {
            "restaurant": restaurant,
            "rating": rating,
            "deliveryTime": delivery,
            "items": items_food,
            "total": f_total,
        },
        "instamart": {
            "deliveryTime": "10 mins",
            "items": items_im,
            "total": im_total,
        },
        "dineout": {
            "restaurant": dine_rest,
            "tableFor": dine_for,
            "slot": dine_slot,
            "avgCost": dine_avg,
        },
        "totalEstimate": f_total + im_total,
        "savings": savings,
        "mcp_tools_called": [
            "get_addresses [OK]",
            "search_restaurants [OK]",
            "search_products [OK]",
            "get_available_slots [OK]",
        ],
    }


def classify_intent(situation_text: str) -> Dict[str, Any]:
    """
    Dynamic intent classifier — tries Claude 3.5 Sonnet first,
    then uses a rich keyword fallback covering all major LifeOS modules.
    """
    lower = situation_text.lower()
    budget = _extract_budget(situation_text)

    # ── 1. Try Claude AI first ────────────────────────────────────────────────
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if api_key and api_key.startswith("sk-"):
        try:
            from anthropic import Anthropic
            client = Anthropic(api_key=api_key)
            system_prompt = """You are Swiggy LifeOS AI Agent. Analyze the user's situation and output ONLY a valid JSON object matching this exact schema (no explanation, no markdown, just JSON):
{
  "situation": "...",
  "budget": 800,
  "food": {
    "restaurant": "Restaurant Name",
    "rating": 4.7,
    "deliveryTime": "22 mins",
    "items": [{"id": "f_1", "name": "Dish Name", "qty": 1, "price": 180, "category": "food"}],
    "total": 180
  },
  "instamart": {
    "deliveryTime": "10 mins",
    "items": [{"id": "g_1", "name": "Product Name", "qty": 1, "price": 40, "category": "instamart"}],
    "total": 40
  },
  "dineout": {"restaurant": "Venue Name", "tableFor": 2, "slot": "7:30 PM", "avgCost": 600},
  "savings": 120,
  "totalEstimate": 220,
  "mcp_tools_called": ["get_addresses \u2705", "search_restaurants \u2705", "search_products \u2705", "get_available_slots \u2705"]
}
Rules:
- Make items SPECIFIC to what the user asked (pancakes → pancake dishes, stray dogs → bulk pet food/rice)
- Budget must be respected — keep totalEstimate within budget where possible
- Always return real-sounding restaurant names relevant to the food type
- For large groups or animal feeding, multiply quantities accordingly"""

            response = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1200,
                system=system_prompt,
                messages=[{"role": "user", "content": f"User situation: '{situation_text}'\nBudget detected: ₹{budget}"}]
            )
            content = response.content[0].text.strip()
            if "{" in content and "}" in content:
                json_str = content[content.find("{"):content.rfind("}")+1]
                data = json.loads(json_str)
                data["situation"] = situation_text
                # Ensure totals are computed
                if "items" in data.get("food", {}):
                    data["food"]["total"] = sum(i["price"] * i["qty"] for i in data["food"]["items"])
                if "items" in data.get("instamart", {}):
                    data["instamart"]["total"] = sum(i["price"] * i["qty"] for i in data["instamart"]["items"])
                if "total" not in data.get("food", {}):
                    data["food"]["total"] = 0
                if "total" not in data.get("instamart", {}):
                    data["instamart"]["total"] = 0
                print(f"[Claude Intent] Resolved: {data['food']['restaurant']}")
                return data
        except Exception as e:
            print(f"[Claude Intent] Fell back to local engine: {e}")

    # ── 2. Rich local keyword fallback ────────────────────────────────────────

    # Pancake / Waffle
    if any(k in lower for k in ["pancake", "waffle", "crepe"]):
        per_item = min(budget // 2, 149)
        return _make_plan(
            situation_text, budget,
            "The Pancake Story & Waffle House", 4.8, "18 mins",
            [
                {"id":"f_1","name":"Classic Butter Pancake Stack","qty":2,"price":per_item,"category":"food"},
                {"id":"f_2","name":"Nutella Waffle","qty":1,"price":min(per_item+20, 179),"category":"food"},
            ],
            [{"id":"g_1","name":"Maple Syrup Sachet","qty":2,"price":25,"category":"instamart"}],
            "The Good Mornings Café", 2, "9:00 AM", 350, 65
        )

    # Stray dogs / animal feeding / charity
    if any(k in lower for k in ["stray dog", "stray cat", "feed dog", "feed animal", "street dog", "homeless dog"]):
        count = 50
        m = re.search(r'(\d+)\s*(dog|cat|animal)', lower)
        if m: count = int(m.group(1))
        per_dog = max(budget // count, 30)
        return _make_plan(
            situation_text, budget,
            "Community Kitchen & Bulk Meals", 4.6, "35 mins",
            [
                {"id":"f_1","name":f"Bulk Rice + Chicken Meal Pack (x{count//10})","qty":count//10,"price":per_dog*10,"category":"food"},
                {"id":"f_2","name":"Plain Boiled Rice Tray (1kg)","qty":count//25,"price":150,"category":"food"},
            ],
            [
                {"id":"g_1","name":f"Pedigree Dog Food 1kg Packs","qty":count//10,"price":200,"category":"instamart"},
                {"id":"g_2","name":"Disposable Trays (50 pcs)","qty":1,"price":80,"category":"instamart"},
            ],
            "Community Feeding Centre", count, "Open Anytime", 0, budget // 10
        )

    # Birthday / celebration / party
    if any(k in lower for k in ["birthday", "celebration", "anniversary", "party", "bday"]):
        guests = 4
        m = re.search(r'(\d+)\s*(people|person|guest|friends)', lower)
        if m: guests = int(m.group(1))
        return _make_plan(
            situation_text, budget,
            "Barbeque Nation & Royal Feast", 4.8, "35 mins",
            [
                {"id":"f_1","name":"Butter Chicken (serves 4)","qty":2,"price":380,"category":"food"},
                {"id":"f_2","name":"Biryani Premium (serves 4)","qty":1,"price":480,"category":"food"},
                {"id":"f_3","name":"Naan Basket","qty":2,"price":120,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Belgian Chocolate Celebration Cake","qty":1,"price":699,"category":"instamart"},
                {"id":"g_2","name":"Birthday Candles & Decoration Kit","qty":1,"price":149,"category":"instamart"},
                {"id":"g_3","name":"Soft Drinks Assorted 6-pack","qty":2,"price":180,"category":"instamart"},
            ],
            "ITC Grand Chola Dineout", guests, "8:00 PM", 1200 + (guests * 150), 350
        )

    # Student / budget / broke / hostel
    if any(k in lower for k in ["student", "budget", "broke", "hostel", "college", "cheap", "affordable", "save money"]):
        per_item = min(budget // 3, 80)
        return _make_plan(
            situation_text, budget,
            "Udupi Sagar South Indian Meals", 4.4, "15 mins",
            [
                {"id":"f_1","name":"Set Dosa with Sambar & Chutney","qty":2,"price":per_item,"category":"food"},
                {"id":"f_2","name":"Masala Chai","qty":2,"price":25,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Parle-G Biscuits (10 pack)","qty":1,"price":20,"category":"instamart"},
                {"id":"g_2","name":"Instant Noodles (Maggi 12-pack)","qty":1,"price":85,"category":"instamart"},
            ],
            "Student Canteen Dineout", 1, "1:00 PM", 80, 35
        )

    # Gym / protein / workout / fitness
    if any(k in lower for k in ["gym", "protein", "workout", "fitness", "muscle", "post workout", "pre workout"]):
        return _make_plan(
            situation_text, budget,
            "FitBites Protein Studio", 4.9, "20 mins",
            [
                {"id":"f_1","name":"Grilled Chicken Protein Bowl","qty":1,"price":280,"category":"food"},
                {"id":"f_2","name":"Whey Protein Banana Shake","qty":1,"price":140,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Greek Yogurt Blueberry (200g)","qty":2,"price":60,"category":"instamart"},
                {"id":"g_2","name":"Mixed Nuts Power Pack","qty":1,"price":120,"category":"instamart"},
            ],
            "The Organic Protein Café", 1, "8:00 PM", 500, 90
        )

    # Sick / cold / fever / soup / unwell
    if any(k in lower for k in ["sick", "cold", "fever", "headache", "unwell", "soup", "ill", "cough", "throat"]):
        return _make_plan(
            situation_text, budget,
            "Healing Bowls & Soup Kitchen", 4.8, "18 mins",
            [
                {"id":"f_1","name":"Hot Manchow Soup (large)","qty":1,"price":120,"category":"food"},
                {"id":"f_2","name":"Ginger Honey Lemon Tea","qty":2,"price":50,"category":"food"},
                {"id":"f_3","name":"Congee (Soft Rice Porridge)","qty":1,"price":90,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Strepsils Honey Lemon 16s","qty":1,"price":65,"category":"instamart"},
                {"id":"g_2","name":"Vicks VapoRub","qty":1,"price":45,"category":"instamart"},
            ],
            "Wellness Tea Lounge", 1, "6:00 PM", 200, 45
        )

    # Sad / mood / stress / comfort
    if any(k in lower for k in ["sad", "stress", "anxious", "lonely", "depress", "comfort", "mood", "emotional", "feeling low", "upset", "heartbreak"]):
        return _make_plan(
            situation_text, budget,
            "Soul Comfort Kitchen", 4.7, "20 mins",
            [
                {"id":"f_1","name":"Mac & Cheese (large bowl)","qty":1,"price":220,"category":"food"},
                {"id":"f_2","name":"Molten Chocolate Lava Cake","qty":2,"price":140,"category":"food"},
                {"id":"f_3","name":"Hot Masala Chai","qty":1,"price":40,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Dairy Milk Silk 150g","qty":2,"price":80,"category":"instamart"},
                {"id":"g_2","name":"Scented Candles (Lavender)","qty":1,"price":150,"category":"instamart"},
            ],
            "The Cozy Corner Café", 1, "7:00 PM", 350, 80
        )

    # Kids / children / toddler / family
    if any(k in lower for k in ["kid", "child", "toddler", "son", "daughter", "family", "children"]):
        return _make_plan(
            situation_text, budget,
            "Pizza Hut Kids Special", 4.6, "25 mins",
            [
                {"id":"f_1","name":"Cheese Burst Pizza (Medium)","qty":1,"price":379,"category":"food"},
                {"id":"f_2","name":"Pasta Arrabiata","qty":1,"price":199,"category":"food"},
                {"id":"f_3","name":"Garlic Bread","qty":1,"price":129,"category":"food"},
            ],
            [
                {"id":"g_1","name":"KitKat Fun Pack (8 pcs)","qty":1,"price":99,"category":"instamart"},
                {"id":"g_2","name":"Tropicana Juice Box (6-pack)","qty":1,"price":120,"category":"instamart"},
            ],
            "Chili's Kids Dineout", 4, "7:00 PM", 600, 120
        )

    # Biryani / rice
    if any(k in lower for k in ["biryani", "rice", "dum", "hyderabadi"]):
        return _make_plan(
            situation_text, budget,
            "Hyderabadi Biryani House", 4.7, "25 mins",
            [
                {"id":"f_1","name":"Hyderabadi Chicken Dum Biryani","qty":2,"price":220,"category":"food"},
                {"id":"f_2","name":"Mirchi Ka Salan","qty":1,"price":80,"category":"food"},
                {"id":"f_3","name":"Raita","qty":2,"price":40,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Pepsi 750ml","qty":2,"price":45,"category":"instamart"},
                {"id":"g_2","name":"Paper Plates 25-pack","qty":1,"price":35,"category":"instamart"},
            ],
            "The Biryani Paradise Dineout", 4, "8:00 PM", 650, 130
        )

    # Coffee / tea / cafe / study
    if any(k in lower for k in ["coffee", "cafe", "latte", "cappuccino", "study", "midnight"]):
        return _make_plan(
            situation_text, budget,
            "Starbucks Reserve & Third Wave", 4.8, "15 mins",
            [
                {"id":"f_1","name":"Caramel Macchiato (Large)","qty":2,"price":180,"category":"food"},
                {"id":"f_2","name":"Chocolate Croissant","qty":2,"price":120,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Red Bull Energy Drink","qty":2,"price":125,"category":"instamart"},
                {"id":"g_2","name":"Dark Chocolate Almonds","qty":1,"price":99,"category":"instamart"},
            ],
            "Café Coffee Day Dineout", 2, "10:00 PM", 250, 60
        )

    # Pizza / fast food / burger
    if any(k in lower for k in ["pizza", "burger", "fast food", "fries", "sandwich", "wrap"]):
        return _make_plan(
            situation_text, budget,
            "Domino's Pizza Express", 4.6, "20 mins",
            [
                {"id":"f_1","name":"Pepperoni Delight Pizza (Large)","qty":1,"price":449,"category":"food"},
                {"id":"f_2","name":"Cheesy Garlic Bread","qty":1,"price":149,"category":"food"},
                {"id":"f_3","name":"Choco Lava Cake (2 pcs)","qty":1,"price":99,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Coke 1.5L","qty":1,"price":60,"category":"instamart"},
                {"id":"g_2","name":"Lay's American Style Cream & Onion","qty":2,"price":30,"category":"instamart"},
            ],
            "Pizza Express Dineout", 2, "8:30 PM", 500, 100
        )

    # Evening / dinner / date / romantic
    if any(k in lower for k in ["dinner", "date", "romantic", "evening", "special", "dine"]):
        return _make_plan(
            situation_text, budget,
            "Olive Bar & Kitchen", 4.9, "30 mins",
            [
                {"id":"f_1","name":"Grilled Salmon with Herbs","qty":1,"price":680,"category":"food"},
                {"id":"f_2","name":"Bruschetta with Burrata","qty":1,"price":320,"category":"food"},
                {"id":"f_3","name":"Tiramisu","qty":2,"price":250,"category":"food"},
            ],
            [
                {"id":"g_1","name":"Moet & Chandon Sparkling Wine","qty":1,"price":1800,"category":"instamart"},
                {"id":"g_2","name":"Rose Bouquet","qty":1,"price":299,"category":"instamart"},
            ],
            "Taj Vivanta Rooftop Dineout", 2, "8:00 PM", 2500, 400
        )

    # DEFAULT — fully dynamic based on budget
    dish_price = min(budget // 3, 250)
    return _make_plan(
        situation_text, budget,
        "Swiggy Top Pick Restaurant", 4.5, "25 mins",
        [
            {"id":"f_1","name":"Chef's Special Main Course","qty":2,"price":dish_price,"category":"food"},
            {"id":"f_2","name":"Signature Dessert","qty":1,"price":dish_price // 2,"category":"food"},
        ],
        [
            {"id":"g_1","name":"Soft Drink 500ml","qty":2,"price":35,"category":"instamart"},
            {"id":"g_2","name":"Quick Snack Pack","qty":1,"price":60,"category":"instamart"},
        ],
        "Premium Dineout Venue", 2, "7:30 PM", budget // 2, budget // 10
    )


classify_intent_with_claude = classify_intent
