# 🏛️ Swiggy LifeOS — Architecture Specification v2.0

## Swiggy Model Context Protocol (MCP) Integration Engine

> **Document Class**: Architecture & Protocol Specification  
> **Status**: APPROVED / PRODUCTION READY  
> **Target Ecosystem**: Swiggy Food MCP (`https://mcp.swiggy.com/food`), Instamart MCP (`https://mcp.swiggy.com/im`), Dineout MCP (`https://mcp.swiggy.com/dineout`)  

---

## 1. Protocol Architecture & Request Cycle

```
[ User Natural Intent Input ]
             │
             ▼
[ React PWA Client (Port 5173) ]
             │
             ▼  POST /api/plan
[ FastAPI Backend Orchestrator (Port 8000) ]
             │
             ├──► 1. Anthropic Intent Classifier (claude-3-5-sonnet)
             │
             └──► 2. Swiggy Combined Recipe Executor
                     │
                     ├──► FoodMCPClient.search_restaurants()
                     ├──► InstamartMCPClient.search_products()
                     └──► DineoutMCPClient.get_available_slots()
             │
             ▼  JSON Response (PlanData)
[ React PWA Client Renders LifePlan UI ]
```

---

## 2. Swiggy MCP Tool Registry

### 🍕 Swiggy Food MCP Server Tools (`/food`)
| Tool Name | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `get_addresses` | None | `Address[]` | Resolves saved delivery addresses (`label`, `addressId`). |
| `search_restaurants` | `addressId`, `query` | `Restaurant[]` | Searches nearby restaurants; checks `availabilityStatus: OPEN`. |
| `get_restaurant_menu` | `restaurantId` | `MenuCategory[]` | Fetches categories, items, and add-on pricing. |
| `update_food_cart` | `restaurantId`, `items[]` | `Cart` | Flushes old cart and updates items for selected restaurant. |
| `get_food_cart` | None | `CartDetails` | Returns items, bill breakdown, and COD payment options. |
| `fetch_food_coupons` | None | `Coupon[]` | Retrieves available coupons (filtered for COD suitability). |
| `apply_food_coupon` | `code` | `DiscountResult` | Applies promo code to current cart total. |
| `place_food_order` | `paymentMethod: "COD"` | `OrderConfirmation` | Places non-idempotent food delivery order. |
| `track_food_order` | `orderId` | `TrackingStatus` | Polls delivery partner ETA and real-time status. |

---

### 🛒 Swiggy Instamart Quick Commerce MCP Tools (`/im`)
| Tool Name | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `search_products` | `addressId`, `query` | `Product[]` | Searches Instamart dark store inventory for SKUs (`spinId`). |
| `your_go_to_items` | `addressId` | `Product[]` | Returns frequently ordered SKUs for 1-tap reorders. |
| `update_cart` | `items[{spinId, quantity}]` | `Cart` | Updates Instamart cart variants. |
| `get_cart` | None | `CartDetails` | Evaluates ₹99 minimum order limit and serviceability. |
| `checkout` | `paymentMethod: "COD"` | `OrderConfirmation` | Executes quick-commerce checkout. |
| `track_order` | `orderId` | `TrackingStatus` | Tracks 10-20 min quick delivery progress. |

---

### 🍽️ Swiggy Dineout Reservation MCP Tools (`/dineout`)
| Tool Name | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `get_saved_locations` | None | `Location[]` | Resolves `lat` / `lng` coordinates for dining search. |
| `search_restaurants_dineout` | `lat`, `lng`, `query` | `DineoutRest[]` | Finds dining venues, amenities, and available discounts. |
| `get_available_slots` | `restaurantId`, `date`, `guestCount` | `Slot[]` | Retrieves 7-day forward reservation time slots. |
| `book_table` | `restaurantId`, `slotId`, `guestCount` | `BookingResult` | Reserves dining table slot. |
| `get_booking_status` | `bookingId` | `BookingStatus` | Returns confirmation status and venue address. |

---

## 3. Key Non-Idempotency & Retries Safeguards

Per Swiggy engineering guidelines:
- `place_food_order`, `checkout`, and `book_table` are **non-idempotent**.
- On HTTP `5xx` or network errors during order placement, the agent waits 2-5s and invokes `get_food_orders` / `get_orders` / `get_booking_status` to verify whether the order was created before attempting a retry.
- Cart cap limit of **₹1000** is enforced upstream before invoking checkout tools.

---

*Swiggy LifeOS Protocol Specification v2.0 APPROVED.*
