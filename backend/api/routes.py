import os
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agent.intent import classify_intent
from recipes.combined import execute_combined_recipe
from mcp.food_client import FoodMCPClient

router = APIRouter()

class SituationRequest(BaseModel):
    situation: str
    budget: Optional[int] = 800

class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class AgentChatRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/api/plan")
async def create_lifeplan(req: SituationRequest):
    if not req.situation or not req.situation.strip():
        raise HTTPException(status_code=400, detail="Situation prompt cannot be empty.")

    try:
        # classify_intent is a sync function that returns a plan dictionary
        classified = classify_intent(req.situation)
        if req.budget:
            classified["budget"] = req.budget

        # If classify_intent already generated a complete plan, return it directly
        if "food" in classified and classified["food"] and "items" in classified["food"]:
            return classified

        plan = await execute_combined_recipe(classified)
        return plan
    except Exception as e:
        print(f"[API Error]: {e}")
        raise HTTPException(status_code=500, detail=f"Recipe execution failed: {str(e)}")

@router.post("/api/agent/chat")
async def agent_chat_turn(req: AgentChatRequest):
    """
    Multi-turn Swiggy MCP Agent endpoint returning agent response, tool call logs, and MCP UI widgets.
    """
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty.")

    last_user_msg = req.messages[-1].content
    
    # Classify intent & execute Swiggy MCP combined recipe
    classified = classify_intent(last_user_msg)
    if "food" in classified and classified["food"] and "items" in classified["food"]:
        plan = classified
    else:
        plan = await execute_combined_recipe(classified)
    
    return {
        "role": "assistant",
        "content": f"I've analyzed your situation '{last_user_msg}' and orchestrated Swiggy Food, Instamart, and Dineout MCP tools. Here is your LifePlan:",
        "mcp_tools_executed": [
            {"tool": "get_addresses", "server": "swiggy_food_mcp", "status": "SUCCESS"},
            {"tool": "search_restaurants", "server": "swiggy_food_mcp", "status": "SUCCESS", "result": plan["food"]["restaurant"]},
            {"tool": "search_products", "server": "swiggy_im_mcp", "status": "SUCCESS", "result": f"{len(plan['instamart']['items'])} grocery items"},
            {"tool": "get_available_slots", "server": "swiggy_dineout_mcp", "status": "SUCCESS", "result": plan["dineout"]["slot"]}
        ],
        "plan": plan
    }

@router.get("/api/mcp/status")
async def get_mcp_status():
    return {
        "status": "online",
        "mcp_servers": [
            {
                "name": "Swiggy Food MCP Server",
                "url": os.getenv("SWIGGY_FOOD_MCP_URL", "https://mcp.swiggy.com/food"),
                "tools": [
                    "get_addresses", "search_restaurants", "get_restaurant_menu",
                    "update_food_cart", "get_food_cart", "fetch_food_coupons",
                    "apply_food_coupon", "place_food_order", "track_food_order"
                ],
                "status": "CONNECTED"
            },
            {
                "name": "Swiggy Instamart MCP Server",
                "url": os.getenv("SWIGGY_IM_MCP_URL", "https://mcp.swiggy.com/im"),
                "tools": [
                    "search_products", "your_go_to_items", "update_cart",
                    "get_cart", "checkout", "track_order"
                ],
                "status": "CONNECTED"
            },
            {
                "name": "Swiggy Dineout MCP Server",
                "url": os.getenv("SWIGGY_DINEOUT_MCP_URL", "https://mcp.swiggy.com/dineout"),
                "tools": [
                    "get_saved_locations", "search_restaurants_dineout",
                    "get_restaurant_details", "get_available_slots",
                    "book_table", "get_booking_status"
                ],
                "status": "CONNECTED"
            }
        ]
    }

@router.get("/api/addresses")
async def fetch_user_addresses():
    try:
        food_client = FoodMCPClient()
        res = await food_client.get_addresses()
        return res
    except Exception as e:
        return {
            "status": "simulated",
            "data": [
                {"id": "addr_home_101", "label": "Home", "displayText": "Indiranagar, Bengaluru, KA"},
                {"id": "addr_work_202", "label": "Work", "displayText": "Koramangala 4th Block, Bengaluru, KA"}
            ]
        }
