import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from api.routes import router

load_dotenv()

app = FastAPI(
    title="Swiggy LifeOS — Official MCP Agent Orchestrator",
    description="Backend AI Agent Service connecting React PWA to Swiggy Food, Instamart & Dineout MCP Servers",
    version="1.0.0"
)

# Enable CORS for Frontend PWA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API router
app.include_router(router)

@app.get("/")
def read_root():
    return {
        "service": "Swiggy LifeOS Official MCP Backend",
        "status": "ONLINE",
        "version": "1.0.0",
        "docs_url": "http://localhost:8000/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
