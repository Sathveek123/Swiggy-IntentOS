import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, ShoppingBag, MapPin } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { resolveUserSituation } from '../services/intentEngine';

const STATUS_MESSAGES = [
  "Classifying Life Situation intent via Claude Sonnet...",
  "Querying Swiggy Food MCP for top hygiene rated restaurants...",
  "Checking Instamart inventory & 10-min delivery slots...",
  "Reserving Dineout table options & bundle savings...",
  "Finalizing 1-Click Swiggy LifePlan..."
];

export const Thinking: React.FC = () => {
  const navigate = useNavigate();
  const { situationText, selectedChip, setPlan } = useLifeOSStore();
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const prompt = situationText || selectedChip || "I have ₹300 and need best pancakes near me";
    
    resolveUserSituation(prompt).then((plan) => {
      setPlan(plan);
    });

    const statusInterval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 500);

    const navTimer = setTimeout(() => {
      navigate('/plan');
    }, 2400);

    return () => {
      clearInterval(statusInterval);
      clearTimeout(navTimer);
    };
  }, [situationText, selectedChip, setPlan, navigate]);

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col justify-between p-6 border-x border-[#E8E8E8] shadow-sm relative overflow-hidden">
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1.5 bg-[#FFF4EC] text-[#FC8019] text-xs font-bold px-3 py-1 rounded-full border border-[#FC8019]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Swiggy MCP Intent Engine</span>
          </div>

          <span className="text-[10px] font-bold text-[#22C55E] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full border border-[#22C55E]/30">
            LIVE MCP
          </span>
        </div>

        {/* Title */}
        <div className="text-center mt-12 mb-10">
          <h2 className="text-xl font-extrabold text-[#1C1C1E] tracking-tight">
            Connecting to Swiggy MCP...
          </h2>
          <p className="text-xs text-[#6B7280] font-normal mt-1 max-w-[280px] mx-auto">
            "{situationText || selectedChip || "I have ₹300 and need best pancakes near me"}"
          </p>
        </div>

        {/* VISUAL MCP SERVICE ORCHESTRATION CARDS */}
        <div className="flex items-center justify-center gap-3 my-8 relative">
          {/* Card 1: Food */}
          <div className="flex flex-col items-center">
            <div className="w-[60px] h-[60px] rounded-xl bg-white border-[1.5px] border-[#E8E8E8] shadow-sm flex items-center justify-center text-[#FC8019]">
              <Utensils className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#1C1C1E] mt-2">Food</span>
          </div>

          {/* Dotted Connector 1 */}
          <div className="w-10 flex items-center justify-between overflow-hidden">
            <motion.div
              animate={{ x: [0, 16] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="flex gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
            </motion.div>
          </div>

          {/* Card 2: Instamart */}
          <div className="flex flex-col items-center">
            <div className="w-[60px] h-[60px] rounded-xl bg-white border-[1.5px] border-[#E8E8E8] shadow-sm flex items-center justify-center text-[#22C55E]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#1C1C1E] mt-2">Instamart</span>
          </div>

          {/* Dotted Connector 2 */}
          <div className="w-10 flex items-center justify-between overflow-hidden">
            <motion.div
              animate={{ x: [0, 16] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="flex gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC8019]" />
            </motion.div>
          </div>

          {/* Card 3: Dineout */}
          <div className="flex flex-col items-center">
            <div className="w-[60px] h-[60px] rounded-xl bg-white border-[1.5px] border-[#E8E8E8] shadow-sm flex items-center justify-center text-[#6366F1]">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-[#1C1C1E] mt-2">Dineout</span>
          </div>
        </div>

        {/* Rotating Status Message Box */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-sm text-center mt-6">
          <p className="text-xs font-semibold text-[#FC8019] animate-pulse">
            {STATUS_MESSAGES[statusIdx]}
          </p>
        </div>
      </div>

      <div className="text-center py-3">
        <p className="text-[11px] text-[#9CA3AF] font-mono">
          Swiggy JSON-RPC 2.0 Protocol · OAuth 2.1
        </p>
      </div>
    </div>
  );
};
