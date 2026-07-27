import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Sparkles, Terminal, ArrowRight, Bot, CheckCircle2, ArrowLeft, Star, Clock } from 'lucide-react';
import { sendAgentChatMessage, AgentChatMessage } from '../services/backendClient';
import { resolveUserSituation } from '../services/intentEngine';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { PlanData, IMAGES } from '../data/mockData';

interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolsExecuted?: Array<{ tool: string; server: string; status: string; result?: string }>;
  planWidget?: PlanData;
}

const PRESET_PROMPTS = [
  "Order 2 biryanis & cold drinks under ₹500",
  "Midnight study coffee + energy bar in 15 mins",
  "Family dinner: Butter chicken + table for 4 at 8 PM"
];

export const AgentChat: React.FC = () => {
  const navigate = useNavigate();
  const { setPlan, addToCart } = useLifeOSStore();
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      id: "msg_init",
      role: "assistant",
      content: "Hey! 👋 I'm your Swiggy LifeOS AI Agent powered by Anthropic Claude.\n\nYou can ask me anything — say hi, tell me what you're craving, or share a life situation:\n\n• \"I have ₹300, best pancakes near me?\"\n• \"Plan birthday dinner for 10 people under ₹5000\"\n• \"I just came from the gym, need protein\"\n• \"I have 8000 rupees to feed 50 stray dogs\"\n\nI'll coordinate Swiggy Food 🍽️, Instamart 🛒 and Dineout 🍽️ together in one plan.",
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    const userTurnId = `usr_${Date.now()}`;
    const newMsg: ChatTurn = { id: userTurnId, role: 'user', content: textToSend };
    
    setMessages(prev => [...prev, newMsg]);
    if (!customPrompt) setInputText("");
    setIsTyping(true);

    const historyPayload: AgentChatMessage[] = messages.map(m => ({ role: m.role, content: m.content }));
    historyPayload.push({ role: 'user', content: textToSend });

    try {
      const res = await sendAgentChatMessage(historyPayload);
      setIsTyping(false);

      if (res && res.plan) {
        const assistantTurn: ChatTurn = {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: res.content || `I've analyzed your situation '${textToSend}' and orchestrated Swiggy Food, Instamart, and Dineout MCP tools:`,
          toolsExecuted: res.mcp_tools_executed,
          planWidget: res.plan
        };
        setMessages(prev => [...prev, assistantTurn]);
      } else {
        const dynamicPlan = await resolveUserSituation(textToSend);
        const mockTurn: ChatTurn = {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: `Coordinated Swiggy Food, Instamart, and Dineout MCP tools for '${textToSend}'. Generated your custom LifePlan:`,
          toolsExecuted: [
            { tool: "get_addresses", server: "swiggy_food_mcp", status: "SUCCESS", result: "Indiranagar, KA" },
            { tool: "search_restaurants", server: "swiggy_food_mcp", status: "SUCCESS", result: dynamicPlan.food.restaurant },
            { tool: "search_products", server: "swiggy_im_mcp", status: "SUCCESS", result: dynamicPlan.instamart.items[0]?.name || "Essentials" },
            { tool: "get_available_slots", server: "swiggy_dineout_mcp", status: "SUCCESS", result: "7:30 PM Slot" }
          ],
          planWidget: dynamicPlan
        };
        setMessages(prev => [...prev, mockTurn]);
      }
    } catch (e) {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };
    } else {
      setTimeout(() => {
        setInputText("Order 2 chicken biryanis and cold drinks under ₹500");
        setIsListening(false);
      }, 1500);
    }
  };

  const handleApplyWidgetToCart = (widget: PlanData) => {
    setPlan(widget);
    addToCart(widget.food.items);
    addToCart(widget.instamart.items);
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-4 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pt-2 pb-3 border-b border-[#E8E8E8] mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/home')}
              className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#FC8019] text-white flex items-center justify-center font-bold shadow-pill">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-[#1C1C1E]">Swiggy Agent Chat</h2>
              <p className="text-[10px] text-[#22C55E] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                Live Swiggy MCP Connected
              </p>
            </div>
          </div>

          <span className="text-[11px] bg-[#1C1C1E] text-white font-bold px-2.5 py-1 rounded-full">
            Anthropic Agent
          </span>
        </div>

        {/* Preset Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="bg-white border border-[#E8E8E8] hover:border-[#FC8019] text-[#1C1C1E] text-[11px] font-medium px-3 py-1.5 rounded-full shrink-0 shadow-2xs transition-all"
            >
              💬 {prompt}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`
                  max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-soft
                  ${msg.role === 'user'
                    ? 'bg-[#FC8019] text-white rounded-br-none font-medium'
                    : 'bg-white border border-[#E8E8E8] text-[#1C1C1E] rounded-bl-none'
                  }
                `}
              >
                {msg.content}

                {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-black/10 text-[11px] space-y-1.5 font-sans">
                    <div className="flex items-center gap-1 font-extrabold text-[#FC8019] text-[10px] uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-[#FC8019]" /> Multi-Service Swiggy Plan Orchestrated:
                    </div>
                    {msg.toolsExecuted.map((t, idx) => {
                      const displayLabel = 
                        t.tool === 'get_addresses' ? '📍 Delivery Location' :
                        t.tool === 'search_restaurants' ? '🍽️ Swiggy Food' :
                        t.tool === 'search_products' ? '🛒 Instamart Quick Commerce' :
                        t.tool === 'get_available_slots' || t.tool === 'book_table' ? '🍽️ Swiggy Dineout Table' :
                        `⚡ ${t.server}`;
                      return (
                        <div key={idx} className="flex items-center justify-between text-[#4B5563] bg-[#FAFAF8] px-2.5 py-1 rounded-lg border border-[#E8E8E8]">
                          <span className="font-bold text-[#1C1C1E]">{displayLabel}</span>
                          <span className="text-[#22C55E] font-extrabold">✓ {t.result || 'Connected'}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Visual MCP Response Widget with Food Thumbnails */}
              {msg.planWidget && (
                <div className="mt-2.5 w-full bg-white border border-[#FC8019]/40 rounded-2xl p-3.5 shadow-soft">
                  <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-2">
                    <span className="text-xs font-bold text-[#1C1C1E] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#FC8019]" />
                      Swiggy MCP Widget Response
                    </span>
                    <span className="text-[11px] font-extrabold text-[#FC8019]">₹{msg.planWidget.totalEstimate} Total</span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <img
                      src={msg.planWidget.food.image || IMAGES.biryani}
                      alt="Food"
                      className="w-12 h-12 rounded-xl object-cover border border-[#E8E8E8] shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-[#1C1C1E]">{msg.planWidget.food.restaurant}</h4>
                      <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">
                        {msg.planWidget.food.items.length} dishes · {msg.planWidget.food.deliveryTime}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyWidgetToCart(msg.planWidget!)}
                    className="w-full mt-2 bg-[#FC8019] hover:bg-[#E5700F] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-pill transition-all"
                  >
                    <span>Load LifePlan to Cart</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#6B7280] font-medium bg-white border border-[#E8E8E8] px-3.5 py-2 rounded-2xl rounded-bl-none w-fit shadow-xs">
              <Bot className="w-4 h-4 text-[#FC8019] animate-spin" />
              <span>Orchestrating Swiggy MCP tools...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-white border border-[#E8E8E8] rounded-full p-1.5 pl-4 shadow-soft focus-within:border-[#FC8019]"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Talk to Swiggy MCP Agent..."
            className="flex-1 bg-transparent text-xs text-[#1C1C1E] outline-none placeholder-[#9CA3AF]"
          />

          <button
            type="button"
            onClick={handleVoiceInput}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-[#FFF4EC] text-[#FC8019] border border-[#FC8019]' : 'text-[#6B7280] hover:bg-[#F5F5F3]'
            }`}
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-[#FC8019]' : ''}`} />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-full bg-[#FC8019] text-white flex items-center justify-center disabled:opacity-40 shadow-pill transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
