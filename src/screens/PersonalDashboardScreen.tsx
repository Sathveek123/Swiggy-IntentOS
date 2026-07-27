import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BrainCircuit, PiggyBank, Clock, Dumbbell, ShieldCheck, Star, Package, ChevronRight, Zap, LayoutGrid, Sparkles } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { LIFE_MODULES, ModuleCard } from './LifeModules';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const PersonalDashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setChip } = useLifeOSStore();

  const pantryItems = [
    { name: "Fresh Milk 1L", status: "2 days left", icon: "🥛", color: "#FC8019" },
    { name: "Whole Wheat Bread", status: "Expires Tomorrow", icon: "🍞", color: "#EF4444" },
    { name: "Basmati Rice 5kg", status: "18 days remaining", icon: "🌾", color: "#22C55E" },
    { name: "Organic Eggs (6pk)", status: "5 left in pantry", icon: "🥚", color: "#6366F1" }
  ];

  const restaurantScores = [
    { label: "Taste & Hygiene", score: "9.3", bar: "93%" },
    { label: "Eco Packaging", score: "8.7", bar: "87%" },
    { label: "Portion Consistency", score: "9.5", bar: "95%" },
    { label: "Delivery Speed", score: "8.8", bar: "88%" },
    { label: "Price / Value Ratio", score: "9.2", bar: "92%" }
  ];

  const handleModuleClick = (chipPrompt: string) => {
    setChip(chipPrompt);
    navigate('/thinking');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28 overflow-hidden">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#FC8019] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-soft">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Personal AI Dashboard</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
            Your Life Intelligence 🧠
          </h1>
          <p className="text-xs text-[#6B7280] font-normal mt-1 leading-relaxed">
            Personal health, financial savings & core behavioral intent modules.
          </p>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft">
            <div className="flex items-center gap-1.5 text-[#FC8019] text-xs font-bold mb-1">
              <PiggyBank className="w-4 h-4" />
              <span>Money Saved</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1C1C1E]">₹4,820</h3>
            <span className="text-[10px] text-[#6B7280]">Swiggy One & AI Bundles</span>
          </div>

          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft">
            <div className="flex items-center gap-1.5 text-[#22C55E] text-xs font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>Time Saved</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1C1C1E]">14.5 Hrs</h3>
            <span className="text-[10px] text-[#6B7280]">Decision time -78%</span>
          </div>

          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft">
            <div className="flex items-center gap-1.5 text-[#6366F1] text-xs font-bold mb-1">
              <Dumbbell className="w-4 h-4" />
              <span>Protein Tracked</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1C1C1E]">1,240g</h3>
            <span className="text-[10px] text-[#6B7280]">NutriGoal Engine</span>
          </div>

          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft">
            <div className="flex items-center gap-1.5 text-[#EC4899] text-xs font-bold mb-1">
              <Zap className="w-4 h-4" />
              <span>AI Accuracy</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#1C1C1E]">96.4%</h3>
            <span className="text-[10px] text-[#6B7280]">Decision Confidence</span>
          </div>
        </div>

        {/* FEATURE: Core Life Modules Grid */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 mb-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
            <span className="font-extrabold text-xs text-[#1C1C1E] uppercase tracking-wider flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-[#FC8019]" />
              The Core Life Modules
            </span>
            <button onClick={() => navigate('/modules')} className="text-[10px] font-bold text-[#FC8019] hover:underline">
              View All ➔
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {LIFE_MODULES.slice(0, 6).map((mod: ModuleCard) => (
              <button
                key={mod.key}
                onClick={() => handleModuleClick(mod.title)}
                className="bg-[#FAFAF8] border border-[#E8E8E8] hover:border-[#FC8019] p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all group cursor-pointer"
              >
                <span className="text-xl">✨</span>
                <span className="text-[10px] font-bold text-[#1C1C1E] group-hover:text-[#FC8019] truncate w-full">{mod.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pantry Consumption Predictor */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 mb-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
            <span className="font-extrabold text-xs text-[#1C1C1E] uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#FC8019]" />
              Pantry Intelligence Tracker
            </span>
            <span className="text-[10px] font-bold text-[#22C55E]">AUTO-SYNCED</span>
          </div>

          <div className="space-y-2.5">
            {pantryItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#F5F5F3] last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-bold text-[#1C1C1E]">{item.name}</span>
                </div>
                <span className="font-bold text-xs" style={{ color: item.color }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Swiggy Restaurant AI Matrix */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 mb-3">
            <span className="font-extrabold text-xs text-[#1C1C1E] uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
              Swiggy Restaurant AI Matrix
            </span>
            <span className="text-[10px] font-bold text-[#6B7280]">PARADISE BIRYANI</span>
          </div>

          <div className="space-y-2.5">
            {restaurantScores.map((score, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B7280] font-medium">{score.label}</span>
                  <span className="font-extrabold text-[#1C1C1E]">{score.score} / 10</span>
                </div>
                <div className="w-full bg-[#F5F5F3] h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FC8019] rounded-full" style={{ width: score.bar }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-4">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center transition-all cursor-pointer"
        >
          Return to LifeOS Home
        </button>
      </div>
    </div>
  );
};
