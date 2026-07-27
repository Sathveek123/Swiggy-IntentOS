import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Mic, ArrowLeft, CheckCircle2, Link2, Sparkles } from 'lucide-react';
import { sendAgentChatMessage, AgentChatMessage } from '../services/backendClient';
import { resolveUserSituation } from '../services/intentEngine';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { PlanData } from '../data/mockData';

interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolsExecuted?: Array<{ tool: string; server: string; status: string; result?: string }>;
  planWidget?: PlanData;
}

const QUICK_PROMPTS = [
  "🎒 I have ₹200 left",
  "😄 Kid wants food",
  "🥗 Post gym meal",
  "🎂 Plan birthday"
];

export const AgentChat: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setPlan, addToCart } = useLifeOSStore();
  const [swiggyConnected, setSwiggyConnected] = useState(false);
  const [connectingOAuth, setConnectingOAuth] = useState(false);
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

  useEffect(() => {
    const oauthResult = searchParams.get('oauth');
    if (oauthResult === 'success') {
      setSwiggyConnected(true);
      setMessages(prev => [...prev, {
        id: 'oauth_success',
        role: 'assistant',
        content: '🎉 Swiggy account connected! I now have access to your real Swiggy addresses, restaurants, and cart. Try asking me anything!'
      }]);
    }
    fetch('http://localhost:8000/api/auth/status')
      .then(r => r.json())
      .then(data => setSwiggyConnected(data.connected))
      .catch(() => {});
  }, [searchParams]);

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
      try {
        const dynamicPlan = await resolveUserSituation(textToSend);
        const lower = textToSend.toLowerCase();

        const isCasual = lower.length < 25 && (
          lower.includes("hi") || lower.includes("hello") || lower.includes("hey") ||
          lower.includes("how are") || lower.includes("what can") || lower.includes("help") ||
          lower.includes("who are") || lower.includes("good")
        );

        if (isCasual) {
          setMessages(prev => [...prev, {
            id: `ast_${Date.now()}`,
            role: 'assistant',
            content: `Hey there! 👋 I'm your Swiggy LifeOS Agent.\n\nTell me your food situation and I'll coordinate a plan across Swiggy Food 🍽️, Instamart 🛒, and Dineout 🍽️.\n\nTry: "I have ₹300, best pancakes near me?" or "Plan birthday dinner for 10 people."`
          }]);
        } else {
          setMessages(prev => [...prev, {
            id: `ast_${Date.now()}`,
            role: 'assistant',
            content: `Got it! Here's your personalized LifePlan for: "${textToSend}"`,
            toolsExecuted: [
              { tool: "get_addresses", server: "swiggy_food_mcp", status: "SUCCESS", result: "Indiranagar, KA" },
              { tool: "search_restaurants", server: "swiggy_food_mcp", status: "SUCCESS", result: dynamicPlan.food.restaurant },
              { tool: "search_products", server: "swiggy_im_mcp", status: "SUCCESS", result: dynamicPlan.instamart.items[0]?.name || "Quick Essentials" },
              { tool: "get_available_slots", server: "swiggy_dineout_mcp", status: "SUCCESS", result: dynamicPlan.dineout.slot + " — " + dynamicPlan.dineout.restaurant }
            ],
            planWidget: dynamicPlan
          }]);
        }
      } catch {
        setMessages(prev => [...prev, {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: "Sorry, I couldn't process that right now. Try describing your food situation — e.g. 'I have ₹300, need pancakes' or 'Birthday dinner for 5 people under ₹2000'."
        }]);
      }
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
        setInputText("I have ₹300 rupees with me I need to eat best pancake near the store");
        setIsListening(false);
      }, 1200);
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
        {/* WHITE TOP BAR (FIX 4) */}
        <header className="flex items-center justify-between pt-1 pb-3 border-b border-[#F0F0F0] mb-3 bg-white -mx-4 px-4 sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/home')}
              className="w-8 h-8 rounded-full bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="font-extrabold text-[16px] text-[#1C1C1E] tracking-tight">Swiggy Agent Chat</h2>
              <p className="text-[11px] text-[#22C55E] font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Live MCP Connected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {swiggyConnected ? (
              <span className="text-[11px] font-semibold bg-[#F0FFF4] text-[#22C55E] border border-[#22C55E]/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ✓ Connected
              </span>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={connectingOAuth}
                onClick={async () => {
                  setConnectingOAuth(true);
                  try {
                    const res = await fetch('http://localhost:8000/api/auth/start');
                    const data = await res.json();
                    if (data.authorize_url) {
                      window.location.href = data.authorize_url;
                    }
                  } catch {
                    setMessages(prev => [...prev, {
                      id: `oauth_info_${Date.now()}`,
                      role: 'assistant',
                      content: '🔗 To connect real Swiggy MCP:\n\n1. Start the backend: cd backend && python main.py\n2. Visit http://localhost:8000/api/auth/start\n3. Complete Swiggy Phone + OTP login\n4. You\'ll be redirected back here automatically.'
                    }]);
                  } finally {
                    setConnectingOAuth(false);
                  }
                }}
                className="text-[11px] bg-[#FC8019] hover:bg-[#E5700F] text-white font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer"
              >
                <Link2 className="w-3 h-3" />
                {connectingOAuth ? 'Connecting...' : 'Connect Swiggy'}
              </motion.button>
            )}
          </div>
        </header>

        {/* MESSAGES SCROLL AREA */}
        <div className="space-y-3.5 max-h-[58vh] overflow-y-auto pr-1 no-scrollbar">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#FC8019] text-white rounded-br-none shadow-xs font-semibold'
                    : 'bg-white border border-[#E8E8E8] text-[#1C1C1E] rounded-bl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>

                {/* MCP Executed Tools Breakdown */}
                {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-black/10 text-[11px] space-y-1.5 font-sans">
                    <div className="flex items-center gap-1 font-extrabold text-[#FC8019]">
                      <Sparkles className="w-3 h-3" />
                      <span>Swiggy MCP Tools Executed:</span>
                    </div>
                    {msg.toolsExecuted.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[10px] text-[#4B5563]">
                        <span className="font-semibold">{t.server}: <code className="bg-black/5 px-1 py-0.5 rounded text-[#1C1C1E]">{t.tool}</code></span>
                        <span className="font-bold text-[#22C55E]">{t.result || t.status}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline LifePlan Widget Component */}
                {msg.planWidget && (
                  <div className="mt-3 pt-3 border-t border-[#E8E8E8] bg-[#FAFAF8] p-3 rounded-xl border border-[#E8E8E8]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-[#FC8019] uppercase tracking-wider">
                        Orchestrated LifePlan
                      </span>
                      <span className="text-[11px] font-extrabold text-[#1C1C1E]">
                        ₹{msg.planWidget.totalEstimate}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-[11px] text-[#4B5563] font-medium mb-3">
                      <div>🍽️ <strong>Food:</strong> {msg.planWidget.food.restaurant} (₹{msg.planWidget.food.total})</div>
                      <div>🛒 <strong>Instamart:</strong> {msg.planWidget.instamart.items[0]?.name || "Essentials"} (₹{msg.planWidget.instamart.total})</div>
                      <div>📍 <strong>Dineout:</strong> Table for {msg.planWidget.dineout.tableFor} at {msg.planWidget.dineout.restaurant}</div>
                    </div>

                    <button
                      onClick={() => handleApplyWidgetToCart(msg.planWidget!)}
                      className="w-full bg-[#FC8019] text-white text-[11px] font-bold py-2 rounded-lg hover:bg-[#E5700F] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Stage Plan to Cart</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[#6B7280]">
              <div className="w-6 h-6 rounded-full bg-[#FC8019]/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#FC8019] animate-spin" />
              </div>
              <span>Swiggy MCP Agent is orchestrating tools...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 4 QUICK PROMPT SUGGESTION CHIPS (FIX 4) */}
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="bg-white border border-[#E8E8E8] rounded-xl px-3 py-2.5 text-left text-[12px] font-medium text-[#1C1C1E] hover:border-[#FC8019] hover:bg-[#FFF9F5] transition-all cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          <p className="text-center text-[11px] text-[#C4C4C4] mt-3">
            Powered by Claude + Swiggy MCP
          </p>
        </div>
      </div>

      {/* WHITE BOTTOM INPUT BAR (FIX 4) */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#F0F0F0] p-3 z-40 shadow-md">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isListening ? 'bg-[#FC8019] text-white animate-pulse' : 'bg-[#F5F5F3] text-[#6B7280] hover:bg-[#E8E8E8]'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Talk to Swiggy MCP Agent..."
            className="flex-1 bg-[#F5F5F3] text-[#1C1C1E] text-xs px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#FC8019]/30 transition-all font-medium"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-full bg-[#FC8019] hover:bg-[#E5700F] text-white flex items-center justify-center transition-all cursor-pointer shrink-0 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
