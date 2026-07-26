import os
from typing import List, Dict, Any
from .client import SwiggyMCPClient

class InstamartMCPClient(SwiggyMCPClient):
    def __init__(self):
        url = os.getenv("SWIGGY_IM_MCP_URL", "https://mcp.swiggy.com/im")
        super().__init__(url)
    
    async def search_products(self, address_id: str, query: str) -> Dict[str, Any]:
        return await self.call_tool("search_products", {
            "addressId": address_id,
            "query": query
        })
    
    async def your_go_to_items(self, address_id: str) -> Dict[str, Any]:
        return await self.call_tool("your_go_to_items", {
            "addressId": address_id
        })
    
    async def update_cart(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        return await self.call_tool("update_cart", {
            "items": items
        })
    
    async def get_cart(self) -> Dict[str, Any]:
        return await self.call_tool("get_cart")
    
    async def checkout(self, payment_method: str = "COD") -> Dict[str, Any]:
        return await self.call_tool("checkout", {
            "paymentMethod": payment_method
        })
    
    async def track_order(self, order_id: str) -> Dict[str, Any]:
        return await self.call_tool("track_order", {
            "orderId": order_id
        })
