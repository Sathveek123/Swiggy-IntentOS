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
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#1C1C1E] text-white flex flex-col justify-between p-5 border-x border-white/10 shadow-sm relative pb-28 overflow-hidden">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#FC8019] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-lg">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Personal AI Dashboard</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Your Life Intelligence 🧠
          </h1>
          <p className="text-xs text-[#9CA3AF] font-normal mt-1 leading-relaxed">
            Personal health, financial savings & 15 human behavioral modules.
          </p>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-[#FC8019] text-xs font-bold mb-1">
              <PiggyBank className="w-4 h-4" />
              <span>Money Saved</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">₹4,820</h3>
            <span className="text-[10px] text-[#9CA3AF]">Swiggy One & AI Bundles</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-[#22C55E] text-xs font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>Time Saved</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">14.5 Hrs</h3>
            <span className="text-[10px] text-[#9CA3AF]">Decision time -78%</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-[#6366F1] text-xs font-bold mb-1">
              <Dumbbell className="w-4 h-4" />
              <span>Protein Tracked</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">1,240g</h3>
            <span className="text-[10px] text-[#9CA3AF]">Nutritional Goal Engine</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-[#EC4899] text-xs font-bold mb-1">
              <Zap className="w-4 h-4" />
              <span>AI Accuracy</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">96.4%</h3>
            <span className="text-[10px] text-[#9CA3AF]">Decision Confidence</span>
          </div>
        </div>

        {/* FEATURE: All 15 Life Event Intent Engines Grid */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-[#FC8019]" />
              The 15 Human Behavior Life Modules
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
                className="bg-white/5 border border-white/10 hover:border-[#FC8019] p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all group cursor-pointer"
              >
                <span className="text-xl">✨</span>
                <span className="text-[10px] font-bold text-white group-hover:text-[#FC8019] truncate w-full">{mod.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pantry Consumption Predictor */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#FC8019]" />
              Pantry Intelligence Tracker
            </span>
            <span className="text-[10px] font-bold text-[#22C55E]">AUTO-SYNCED</span>
          </div>

          <div className="space-y-2.5">
            {pantryItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-bold text-white">{item.name}</span>
                </div>
                <span className="font-bold text-xs" style={{ color: item.color }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Swiggy Restaurant AI Matrix */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <span className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
              Swiggy Restaurant AI Matrix
            </span>
            <span className="text-[10px] font-bold text-[#9CA3AF]">PARADISE BIRYANI</span>
          </div>

          <div className="space-y-2.5">
            {restaurantScores.map((score, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9CA3AF] font-medium">{score.label}</span>
                  <span className="font-extrabold text-white">{score.score} / 10</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
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
          className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          Return to LifeOS Home
        </button>
      </div>
    </div>
  );
};
