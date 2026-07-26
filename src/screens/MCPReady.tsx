import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, ShieldCheck, Cpu, Play, CheckCircle2, Copy, RefreshCw, Zap } from 'lucide-react';

interface ToolDef {
  name: string;
  description: string;
  payload: any;
  response: any;
}

const MCP_SERVERS = [
  {
    id: "food",
    name: "Swiggy Food MCP Server",
    endpoint: "https://mcp.swiggy.com/food",
    toolsCount: 9,
    status: "ONLINE",
    latency: "14ms",
    tools: [
      {
        name: "search_restaurants",
        description: "Searches nearby restaurants and menu availability",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "search_restaurants", arguments: { addressId: "home_01", query: "biryani" } }, id: 1 },
        response: { result: { restaurants: [{ id: "r_101", name: "Paradise Biryani", rating: 4.3, deliveryTime: "28 mins", status: "OPEN" }] } }
      },
      {
        name: "get_restaurant_menu",
        description: "Retrieves complete item menu & add-ons for restaurant",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "get_restaurant_menu", arguments: { restaurantId: "r_101" } }, id: 2 },
        response: { result: { menu: [{ id: "f_1", name: "Chicken Biryani", price: 180 }] } }
      },
      {
        name: "place_food_order",
        description: "Places non-idempotent food delivery order via COD",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "place_food_order", arguments: { paymentMethod: "COD" } }, id: 3 },
        response: { result: { orderId: "SWG_FD_9921", status: "CONFIRMED", eta: "28 mins" } }
      }
    ]
  },
  {
    id: "im",
    name: "Swiggy Instamart MCP Server",
    endpoint: "https://mcp.swiggy.com/im",
    toolsCount: 6,
    status: "ONLINE",
    latency: "9ms",
    tools: [
      {
        name: "search_products",
        description: "Searches dark store inventory for quick commerce SKUs",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "search_products", arguments: { addressId: "home_01", query: "pepsi chips" } }, id: 1 },
        response: { result: { products: [{ spinId: "sp_90", name: "Pepsi 500ml", price: 30, stock: 45 }] } }
      },
      {
        name: "checkout",
        description: "Executes 10-minute quick commerce checkout",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "checkout", arguments: { paymentMethod: "COD" } }, id: 2 },
        response: { result: { orderId: "SWG_IM_4012", status: "PACKED", eta: "12 mins" } }
      }
    ]
  },
  {
    id: "dineout",
    name: "Swiggy Dineout MCP Server",
    endpoint: "https://mcp.swiggy.com/dineout",
    toolsCount: 6,
    status: "ONLINE",
    latency: "18ms",
    tools: [
      {
        name: "get_available_slots",
        description: "Retrieves table reservation time slots for dining venue",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "get_available_slots", arguments: { restaurantId: "d_1", date: "2026-07-25", guestCount: 4 } }, id: 1 },
        response: { result: { slots: [{ slotId: "s_730", time: "7:30 PM", available: true }] } }
      },
      {
        name: "book_table",
        description: "Reserves dining venue table slot",
        payload: { jsonrpc: "2.0", method: "tools/call", params: { name: "book_table", arguments: { restaurantId: "d_1", slotId: "s_730", guestCount: 4 } }, id: 2 },
        response: { result: { bookingId: "DIN_BK_8820", status: "CONFIRMED", table: "Table for 4" } }
      }
    ]
  }
];

export const MCPReady: React.FC = () => {
  const navigate = useNavigate();
  const [activeServerId, setActiveServerId] = useState("food");
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const currentServer = MCP_SERVERS.find(s => s.id === activeServerId) || MCP_SERVERS[0];
  const currentTool = currentServer.tools[selectedToolIndex] || currentServer.tools[0];

  const handleTestTool = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#1C1C1E] text-white flex flex-col justify-between p-5 border-x border-white/10 shadow-sm relative pb-28">
      <div>
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#FC8019] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Swiggy MCP Playground</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Swiggy Model Context Protocol 🔌
          </h1>
          <p className="text-xs text-[#9CA3AF] font-normal mt-1 leading-relaxed">
            Live JSON-RPC 2.0 tool execution playground across Food, Instamart & Dineout servers.
          </p>
        </div>

        {/* Server Selector Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
          {MCP_SERVERS.map((server) => (
            <button
              key={server.id}
              onClick={() => {
                setActiveServerId(server.id);
                setSelectedToolIndex(0);
              }}
              className={`
                px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border
                ${activeServerId === server.id
                  ? 'bg-[#FC8019] text-white border-[#FC8019]'
                  : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white'
                }
              `}
            >
              {server.name.split(' ')[1]} MCP
            </button>
          ))}
        </div>

        {/* Server Status Header Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
            <div>
              <h3 className="font-extrabold text-sm text-white">{currentServer.name}</h3>
              <p className="text-[11px] text-[#9CA3AF] font-mono mt-0.5">{currentServer.endpoint}</p>
            </div>
            <span className="bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              {currentServer.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <span className="text-[10px] text-[#9CA3AF] block">Tools Count</span>
              <span className="font-extrabold text-white text-xs">{currentServer.toolsCount} Active</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <span className="text-[10px] text-[#9CA3AF] block">Protocol</span>
              <span className="font-extrabold text-[#FC8019] text-xs">JSON-RPC 2.0</span>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/5">
              <span className="text-[10px] text-[#9CA3AF] block">Latency</span>
              <span className="font-extrabold text-[#22C55E] text-xs">{currentServer.latency}</span>
            </div>
          </div>
        </div>

        {/* Tool Selector Buttons */}
        <div className="mb-3">
          <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-2">
            Select Tool to Execute
          </span>
          <div className="flex flex-wrap gap-2">
            {currentServer.tools.map((t, idx) => (
              <button
                key={t.name}
                onClick={() => setSelectedToolIndex(idx)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-mono transition-all border
                  ${selectedToolIndex === idx
                    ? 'bg-white text-[#1C1C1E] border-white font-bold'
                    : 'bg-white/5 text-[#9CA3AF] border-white/10 hover:text-white'
                  }
                `}
              >
                {t.name}()
              </button>
            ))}
          </div>
        </div>

        {/* JSON-RPC Request & Response Code Block */}
        <div className="bg-black/80 border border-white/10 rounded-2xl p-4 shadow-xl font-mono text-xs relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FC8019]" />
              <span className="text-white font-bold text-xs">{currentTool.name}()</span>
            </div>

            <button
              onClick={handleTestTool}
              disabled={isExecuting}
              className="bg-[#FC8019] hover:bg-[#E5700F] text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm transition-all"
            >
              {isExecuting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
              <span>Execute Tool</span>
            </button>
          </div>

          <p className="text-[11px] text-[#9CA3AF] mb-3 not-mono">
            {currentTool.description}
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-[#FC8019] block font-bold uppercase tracking-wider mb-1">
                JSON-RPC 2.0 Request Payload:
              </span>
              <pre className="bg-white/5 p-2.5 rounded-lg text-[11px] text-[#22C55E] overflow-x-auto border border-white/5">
                {JSON.stringify(currentTool.payload, null, 2)}
              </pre>
            </div>

            <div>
              <span className="text-[10px] text-[#3B82F6] block font-bold uppercase tracking-wider mb-1">
                Tool Execution Result:
              </span>
              <pre className="bg-white/5 p-2.5 rounded-lg text-[11px] text-[#60A5FA] overflow-x-auto border border-white/5">
                {isExecuting ? "Executing HTTP POST call..." : JSON.stringify(currentTool.response, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center mt-4">
        <p className="text-[11px] text-[#6B7280] font-medium tracking-wide">
          Swiggy Builders Club · Model Context Protocol Specification
        </p>
      </div>
    </div>
  );
};
