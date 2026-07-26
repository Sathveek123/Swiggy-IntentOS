import os
from typing import Dict, Any
from .client import SwiggyMCPClient

class DineoutMCPClient(SwiggyMCPClient):
    def __init__(self):
        url = os.getenv("SWIGGY_DINEOUT_MCP_URL", "https://mcp.swiggy.com/dineout")
        super().__init__(url)
    
    async def get_saved_locations(self) -> Dict[str, Any]:
        return await self.call_tool("get_saved_locations")
    
    async def search_restaurants_dineout(
        self, lat: float, lng: float, query: str
    ) -> Dict[str, Any]:
        return await self.call_tool("search_restaurants_dineout", {
            "lat": lat,
            "lng": lng,
            "query": query
        })
    
    async def get_restaurant_details(self, restaurant_id: str) -> Dict[str, Any]:
        return await self.call_tool("get_restaurant_details", {
            "restaurantId": restaurant_id
        })
    
    async def get_available_slots(
        self, restaurant_id: str, date: str, guest_count: int
    ) -> Dict[str, Any]:
        return await self.call_tool("get_available_slots", {
            "restaurantId": restaurant_id,
            "date": date,
            "guestCount": guest_count
        })
    
    async def book_table(
        self, restaurant_id: str, slot_id: str, guest_count: int
    ) -> Dict[str, Any]:
        return await self.call_tool("book_table", {
            "restaurantId": restaurant_id,
            "slotId": slot_id,
            "guestCount": guest_count
        })
    
    async def get_booking_status(self, booking_id: str) -> Dict[str, Any]:
        return await self.call_tool("get_booking_status", {
            "bookingId": booking_id
        })
