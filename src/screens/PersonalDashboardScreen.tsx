import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowLeft, ArrowRight, ShieldCheck, Heart, Zap,
  TrendingDown, ShoppingBag, PieChart
} from 'lucide-react';
import { LIFE_MODULES } from './LifeModules';

export const PersonalDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const MODULE_EMOJIS: Record<string, string> = {
    survival_mode: '🎒',
    kid_mood: '😄',
    dopamine_engine: '🍽️',
    health_goals: '🥗',
    emotion_commerce: '💙',
    celebration_os: '🎂'
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          {/* FIX 5: Updated Badge styling */}
          <div className="inline-flex items-center gap-1.5 bg-[#FFF4EC] text-[#FC8019] text-xs font-bold px-3 py-1 rounded-full border border-[#FC8019]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#FC8019]" />
            <span>AI Health & Intelligence</span>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
            Your Life Intelligence 🧠
          </h1>
          <p className="text-xs text-[#6B7280] font-normal mt-1 leading-relaxed">
            Real-time intent analytics, monthly savings, and dynamic pantry tracking.
          </p>
        </div>

        {/* Hero Impact Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-sm mb-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-3 mb-3">
            <span className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FC8019]" />
              July 2026 Impact Summary
            </span>
            <span className="text-[10px] font-extrabold text-[#22C55E] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#22C55E]/30">
              96.4% AI Accuracy
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#FAFAF8] p-2.5 rounded-xl border border-[#E8E8E8]">
              <p className="text-[10px] text-[#6B7280] font-medium">Total Saved</p>
              <p className="text-base font-extrabold text-[#FC8019] mt-0.5">₹4,820</p>
            </div>
            <div className="bg-[#FAFAF8] p-2.5 rounded-xl border border-[#E8E8E8]">
              <p className="text-[10px] text-[#6B7280] font-medium">Hours Saved</p>
              <p className="text-base font-extrabold text-[#1C1C1E] mt-0.5">14.5 hrs</p>
            </div>
            <div className="bg-[#FAFAF8] p-2.5 rounded-xl border border-[#E8E8E8]">
              <p className="text-[10px] text-[#6B7280] font-medium">Life Score</p>
              <p className="text-base font-extrabold text-[#22C55E] mt-0.5">98 / 100</p>
            </div>
          </div>
        </motion.div>

        {/* Core Life Modules Intelligence Grid */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold text-[#1C1C1E] uppercase tracking-wider">
              The 6 Core Life Modules
            </h3>
            <button onClick={() => navigate('/modules')} className="text-xs font-bold text-[#FC8019] hover:underline cursor-pointer">
              View All →
            </button>
          </div>

          {/* FIX 5: Using real module emojis instead of generic sparkles */}
          <div className="grid grid-cols-2 gap-3">
            {LIFE_MODULES.slice(0, 6).map((mod) => (
              <motion.div
                key={mod.key}
                whileHover={{ y: -2 }}
                onClick={() => navigate(mod.key === 'survival_mode' ? '/student-survival' : `/${mod.key.replace('_', '-')}`)}
                className="bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-2xs hover:border-[#FC8019] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg leading-none">{MODULE_EMOJIS[mod.key] || '🧩'}</span>
                  <h4 className="font-extrabold text-xs text-[#1C1C1E] truncate group-hover:text-[#FC8019]">
                    {mod.title}
                  </h4>
                </div>
                <p className="text-[10px] text-[#6B7280] font-normal line-clamp-2 leading-tight">
                  {mod.subtitle}
                </p>
                <div className="mt-2 pt-2 border-t border-[#F5F5F3] flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#22C55E]">{mod.savings}</span>
                  <ArrowRight className="w-3 h-3 text-[#FC8019]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Instamart Pantry Auto-Replenishment */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-sm mb-5">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#22C55E]" />
              <h3 className="text-xs font-extrabold text-[#1C1C1E] uppercase tracking-wider">
                Instamart Pantry Tracker
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#FC8019] bg-[#FFF4EC] px-2 py-0.5 rounded border border-[#FC8019]/20">
              Auto-Refill Active
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAFAF8] border border-[#E8E8E8]">
              <div>
                <span className="font-bold text-[#1C1C1E]">Nandini GoodLife Toned Milk 1L</span>
                <p className="text-[10px] text-[#6B7280]">Low Stock · 1 Bag Remaining</p>
              </div>
              <button 
                onClick={() => alert("Reorder staged for Instamart 10-min delivery")}
                className="bg-[#FC8019] text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-xs hover:bg-[#E5700F] cursor-pointer"
              >
                Refill ₹28
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAFAF8] border border-[#E8E8E8]">
              <div>
                <span className="font-bold text-[#1C1C1E]">Organic Brown Bread 400g</span>
                <p className="text-[10px] text-[#6B7280]">Expires in 2 days</p>
              </div>
              <button 
                onClick={() => alert("Reorder staged for Instamart 10-min delivery")}
                className="bg-[#FC8019] text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-xs hover:bg-[#E5700F] cursor-pointer"
              >
                Refill ₹45
              </button>
            </div>
          </div>
        </div>

        {/* Nutritional Micro-Deficit Tracker */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#EF4444]" />
              <h3 className="text-xs font-extrabold text-[#1C1C1E] uppercase tracking-wider">
                Weekly Macro Health
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#6B7280]">Updated Today</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#1C1C1E]">Protein Goal (Target 140g)</span>
                <span className="text-[#22C55E]">118g / 140g (84%)</span>
              </div>
              <div className="w-full bg-[#E8E8E8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#22C55E] h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-[#1C1C1E]">Calorie Target (2,200 kcal)</span>
                <span className="text-[#FC8019]">1,890 kcal</span>
              </div>
              <div className="w-full bg-[#E8E8E8] h-2 rounded-full overflow-hidden">
                <div className="bg-[#FC8019] h-full rounded-full" style={{ width: '86%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center mt-2">
        <p className="text-[11px] text-[#9CA3AF] font-medium tracking-wide">
          Swiggy LifeOS Intelligence Pipeline · Version 2.0
        </p>
      </div>
    </div>
  );
};
