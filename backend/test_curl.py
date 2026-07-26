import httpx
import json

response = httpx.post(
    "http://localhost:8000/api/plan",
    json={"situation": "biryani near me"}
)

print("STATUS CODE:", response.status_code)
print("RESPONSE JSON:")
print(json.dumps(response.json(), indent=2))
