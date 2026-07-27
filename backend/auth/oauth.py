"""
Swiggy OAuth 2.1 + PKCE Implementation
Follows: https://mcp.swiggy.com docs (Developer Quickstart)

Flow:
  1. Dynamic Client Registration (RFC 7591) at POST /auth/register
  2. Generate PKCE code_verifier + code_challenge
  3. Redirect user to /auth/authorize?code_challenge=...
  4. User does Phone + OTP on Swiggy
  5. Swiggy redirects to our callback with ?code=...
  6. We POST /auth/token with code_verifier to get access_token
  7. Use Bearer token for all MCP tool calls
"""

import os
import hashlib
import secrets
import base64
import httpx
from typing import Optional, Dict, Any

# Swiggy OAuth base URL
SWIGGY_BASE = "https://mcp.swiggy.com"
AUTH_ENDPOINT        = f"{SWIGGY_BASE}/auth/authorize"
TOKEN_ENDPOINT       = f"{SWIGGY_BASE}/auth/token"
REGISTER_ENDPOINT    = f"{SWIGGY_BASE}/auth/register"
REVOKE_ENDPOINT      = f"{SWIGGY_BASE}/auth/logout"

# In-memory store (replace with Redis/DB for production multi-user)
_oauth_state: Dict[str, Any] = {
    "client_id": None,
    "client_secret": None,
    "access_token": None,
    "code_verifier": None,
    "state_token": None,
}


def generate_pkce_pair() -> tuple[str, str]:
    """Generate PKCE code_verifier and code_challenge (S256)."""
    code_verifier = secrets.token_urlsafe(64)  # 43-128 chars, URL-safe
    digest = hashlib.sha256(code_verifier.encode("ascii")).digest()
    code_challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")
    return code_verifier, code_challenge


def generate_state_token() -> str:
    """CSRF protection state token."""
    return secrets.token_urlsafe(32)


async def dynamic_client_registration(redirect_uri: str) -> Optional[Dict[str, Any]]:
    """
    RFC 7591 Dynamic Client Registration at Swiggy MCP.
    No pre-registration needed — the MCP client registers itself automatically.
    """
    if _oauth_state["client_id"]:
        # Already registered, reuse
        return {"client_id": _oauth_state["client_id"]}

    payload = {
        "client_name": "Swiggy LifeOS",
        "redirect_uris": [redirect_uri],
        "grant_types": ["authorization_code"],
        "response_types": ["code"],
        "scope": "mcp:tools mcp:resources mcp:prompts",
        "token_endpoint_auth_method": "none"  # PKCE public client
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(REGISTER_ENDPOINT, json=payload)
            if resp.status_code in (200, 201):
                data = resp.json()
                _oauth_state["client_id"] = data.get("client_id")
                print(f"[OAuth] DCR Success. Client ID: {_oauth_state['client_id']}")
                return data
            else:
                print(f"[OAuth] DCR Failed: {resp.status_code} — {resp.text}")
                return None
    except Exception as e:
        print(f"[OAuth] DCR Error: {e}")
        return None


def build_authorize_url(redirect_uri: str, client_id: str) -> tuple[str, str, str]:
    """
    Build the Swiggy /auth/authorize URL with PKCE.
    Returns (authorize_url, code_verifier, state_token).
    """
    code_verifier, code_challenge = generate_pkce_pair()
    state_token = generate_state_token()

    # Store for callback verification
    _oauth_state["code_verifier"] = code_verifier
    _oauth_state["state_token"] = state_token

    params = (
        f"response_type=code"
        f"&client_id={client_id}"
        f"&redirect_uri={redirect_uri}"
        f"&code_challenge={code_challenge}"
        f"&code_challenge_method=S256"
        f"&state={state_token}"
        f"&scope=mcp:tools%20mcp:resources%20mcp:prompts"
    )
    url = f"{AUTH_ENDPOINT}?{params}"
    return url, code_verifier, state_token


async def exchange_code_for_token(
    code: str,
    redirect_uri: str,
    client_id: str,
    code_verifier: str
) -> Optional[str]:
    """
    POST /auth/token to exchange authorization code for access_token.
    Returns the access_token string if successful.
    """
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "code_verifier": code_verifier,
        "client_id": client_id,
        "redirect_uri": redirect_uri
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(TOKEN_ENDPOINT, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                token = data.get("access_token")
                if token:
                    # Store token globally so MCP clients can pick it up
                    _oauth_state["access_token"] = token
                    # Also write to .env for persistence across restarts
                    _persist_token_to_env(token)
                    print(f"[OAuth] Token exchange SUCCESS. Expires in: {data.get('expires_in')}s")
                    return token
                print(f"[OAuth] Token exchange: no access_token in response: {data}")
                return None
            else:
                print(f"[OAuth] Token exchange FAILED: {resp.status_code} — {resp.text}")
                return None
    except Exception as e:
        print(f"[OAuth] Token exchange error: {e}")
        return None


def get_current_token() -> Optional[str]:
    """Get the currently stored OAuth access token."""
    # Priority: in-memory → env var
    return _oauth_state.get("access_token") or os.getenv("SWIGGY_ACCESS_TOKEN") or None


def get_oauth_state() -> Dict[str, Any]:
    """Get the current in-memory OAuth state."""
    return _oauth_state


async def revoke_token(token: str) -> bool:
    """Revoke the Swiggy OAuth token on logout."""
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.post(
                REVOKE_ENDPOINT,
                headers={"Authorization": f"Bearer {token}"}
            )
            return resp.status_code in (200, 204)
    except Exception as e:
        print(f"[OAuth] Revoke error: {e}")
        return False


def _persist_token_to_env(token: str):
    """Write access token to .env file so it survives restarts."""
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    try:
        lines = []
        found = False
        if os.path.exists(env_path):
            with open(env_path, "r") as f:
                for line in f:
                    if line.startswith("SWIGGY_ACCESS_TOKEN="):
                        lines.append(f"SWIGGY_ACCESS_TOKEN={token}\n")
                        found = True
                    else:
                        lines.append(line)
        if not found:
            lines.append(f"SWIGGY_ACCESS_TOKEN={token}\n")
        with open(env_path, "w") as f:
            f.writelines(lines)
        print("[OAuth] Token persisted to .env")
    except Exception as e:
        print(f"[OAuth] Could not persist token: {e}")
