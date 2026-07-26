import os
from typing import List, Dict, Any
from .client import SwiggyMCPClient

class FoodMCPClient(SwiggyMCPClient):
    def __init__(self):
        url = os.getenv("SWIGGY_FOOD_MCP_URL", "https://mcp.swiggy.com/food")
        super().__init__(url)
    
    async def get_addresses(self) -> Dict[str, Any]:
        return await self.call_tool("get_addresses")
    
    async def search_restaurants(self, address_id: str, query: str) -> Dict[str, Any]:
        return await self.call_tool("search_restaurants", {
            "addressId": address_id,
            "query": query
        })
    
    async def get_restaurant_menu(self, restaurant_id: str) -> Dict[str, Any]:
        return await self.call_tool("get_restaurant_menu", {
            "restaurantId": restaurant_id
        })
    
    async def update_food_cart(self, restaurant_id: str, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        return await self.call_tool("update_food_cart", {
            "restaurantId": restaurant_id,
            "items": items
        })
    
    async def get_food_cart(self) -> Dict[str, Any]:
        return await self.call_tool("get_food_cart")
    
    async def fetch_food_coupons(self) -> Dict[str, Any]:
        return await self.call_tool("fetch_food_coupons")
    
    async def apply_food_coupon(self, code: str) -> Dict[str, Any]:
        return await self.call_tool("apply_food_coupon", {
            "code": code
        })
    
    async def place_food_order(self, payment_method: str = "COD") -> Dict[str, Any]:
        return await self.call_tool("place_food_order", {
            "paymentMethod": payment_method
        })
    
    async def track_food_order(self, order_id: str) -> Dict[str, Any]:
        return await self.call_tool("track_food_order", {
            "orderId": order_id
        })
