import httpx
import json

try:
    r_root = httpx.get("http://localhost:8000/")
    print("ROOT_RESPONSE:", r_root.json())
except Exception as e:
    print("ROOT_ERROR:", e)

try:
    r_plan = httpx.post("http://localhost:8000/api/plan", json={"situation": "friends coming over budget 800"})
    print("PLAN_RESPONSE:", json.dumps(r_plan.json(), indent=2))
except Exception as e:
    print("PLAN_ERROR:", e)
