import os
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse, HTMLResponse
from pydantic import BaseModel
from agent.intent import classify_intent
from recipes.combined import execute_combined_recipe
from mcp.food_client import FoodMCPClient
from auth.oauth import (
    dynamic_client_registration,
    build_authorize_url,
    exchange_code_for_token,
    get_current_token,
    get_oauth_state,
    revoke_token,
)

router = APIRouter()

# Callback URL — must match what you registered in Dynamic Client Registration
# For local dev: http://localhost:8000/api/auth/callback
# For production: your deployed backend URL
REDIRECT_URI = os.getenv("OAUTH_REDIRECT_URI", "http://localhost:8000/api/auth/callback")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


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


# ─── SWIGGY OAUTH 2.1 + PKCE ENDPOINTS ──────────────────────────────────────

@router.get("/api/auth/status")
async def auth_status():
    """
    Check if we have a valid Swiggy OAuth access token.
    Frontend polls this to show 'Connected / Not Connected' badge.
    """
    token = get_current_token()
    state = get_oauth_state()
    return {
        "connected": bool(token),
        "has_token": bool(token),
        "client_registered": bool(state.get("client_id")),
        "token_preview": f"{token[:12]}..." if token else None,
    }


@router.get("/api/auth/start")
async def oauth_start():
    """
    Step 1: Begin the Swiggy OAuth 2.1 + PKCE flow.

    1. Dynamic Client Registration (RFC 7591) — only runs once
    2. Build /auth/authorize URL with PKCE challenge
    3. Return URL for frontend to redirect user to

    Frontend calls this, then redirects user's browser to the returned authorize_url.
    """
    # Step 1: Dynamic Client Registration (idempotent — skipped if already done)
    dcr_result = await dynamic_client_registration(REDIRECT_URI)
    if not dcr_result:
        raise HTTPException(
            status_code=503,
            detail="Dynamic Client Registration with Swiggy failed. Swiggy MCP server may be unreachable."
        )

    client_id = dcr_result.get("client_id") or get_oauth_state().get("client_id")
    if not client_id:
        raise HTTPException(status_code=500, detail="No client_id after DCR. Cannot proceed.")

    # Step 2: Build PKCE authorize URL
    authorize_url, code_verifier, state_token = build_authorize_url(REDIRECT_URI, client_id)

    return {
        "authorize_url": authorize_url,
        "state": state_token,
        "redirect_uri": REDIRECT_URI,
        "client_id": client_id,
        "note": "Redirect the user to authorize_url. They will login with Swiggy phone + OTP."
    }


@router.get("/api/auth/callback")
async def oauth_callback(
    code: str = Query(..., description="Authorization code from Swiggy"),
    state: str = Query(None, description="State token for CSRF verification")
):
    """
    Step 2: Swiggy redirects here after Phone + OTP login.

    Exchanges the authorization code for an access_token using PKCE code_verifier.
    Stores the token and redirects the frontend to /agent with success message.
    """
    oauth_st = get_oauth_state()

    # CSRF state check
    if state and oauth_st.get("state_token") and state != oauth_st["state_token"]:
        raise HTTPException(status_code=400, detail="OAuth state mismatch — possible CSRF attack.")

    client_id = oauth_st.get("client_id")
    code_verifier = oauth_st.get("code_verifier")

    if not client_id or not code_verifier:
        raise HTTPException(
            status_code=400,
            detail="OAuth session expired or not started. Call /api/auth/start first."
        )

    # Exchange code for token
    token = await exchange_code_for_token(code, REDIRECT_URI, client_id, code_verifier)
    if not token:
        # Redirect to frontend with error
        return RedirectResponse(
            url=f"{FRONTEND_URL}/agent?oauth=error&reason=token_exchange_failed"
        )

    # Redirect to frontend agent screen with success
    return RedirectResponse(
        url=f"{FRONTEND_URL}/agent?oauth=success"
    )


@router.post("/api/auth/logout")
async def oauth_logout():
    """
    Revoke the Swiggy OAuth token and clear local state.
    """
    token = get_current_token()
    state = get_oauth_state()

    if not token:
        return {"revoked": False, "reason": "No active token to revoke."}

    revoked = await revoke_token(token)

    # Clear in-memory state regardless of revoke result
    state["access_token"] = None
    state["code_verifier"] = None
    state["state_token"] = None

    return {
        "revoked": revoked,
        "message": "Swiggy session revoked. Call /api/auth/start to reconnect."
    }


@router.get("/api/auth/first-tool-test")
async def first_tool_test():
    """
    Test: calls get_addresses with the current token.
    If you see saved addresses — OAuth is wired up correctly.
    As the Swiggy docs say: 'If you see a user's saved addresses, you're wired up.'
    """
    token = get_current_token()
    if not token:
        return {
            "success": False,
            "message": "No token. Visit /api/auth/start to authenticate first.",
            "docs": "https://mcp.swiggy.com/docs/quickstart"
        }

    food = FoodMCPClient()
    result = await food.get_addresses()
    return {
        "success": True,
        "token_preview": f"{token[:12]}...",
        "get_addresses_result": result,
        "message": "You're wired up! Now try search_restaurants with an addressId from above."
    }
