import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, ShoppingBag, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';

export const Analytics: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    { label: "Decision Time Reduction", value: "-78%", sub: "14 mins down to 3 mins", color: "#FC8019", icon: Clock },
    { label: "Cart Abandonment Recovery", value: "+24%", sub: "Intent-driven recovery", color: "#22C55E", icon: TrendingUp },
    { label: "Monthly Repeat Order Lift", value: "+3.8%", sub: "Time Machine engine", color: "#6366F1", icon: Zap },
    { label: "Instamart Cross-Basket Lift", value: "+42%", sub: "Food + Grocery bundles", color: "#EC4899", icon: ShoppingBag }
  ];

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
          <div className="flex items-center gap-1.5 bg-[#22C55E] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Swiggy Exec Analytics</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            LifeOS Leadership Dashboard 📊
          </h1>
          <p className="text-xs text-[#9CA3AF] font-normal mt-1 leading-relaxed">
            Quantified business impact & conversion metrics for Swiggy Leadership.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-soft"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${m.color}20`, color: m.color }}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">{m.value}</h3>
                <span className="font-extrabold text-xs text-white block mt-1">{m.label}</span>
                <span className="text-[10px] text-[#9CA3AF] block mt-0.5">{m.sub}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Summary Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5">
          <h4 className="font-extrabold text-xs text-white border-b border-white/10 pb-2">
            Key Architectural Takeaway
          </h4>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            By transforming Swiggy from a search bar platform into an intent-driven Life OS, we eliminate decision friction, boost Instamart cross-basket attachments, and optimize Dineout table utilization in a single agent turn.
          </p>
        </div>
      </div>

      <div className="relative z-10 pt-4">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#FC8019] text-white font-extrabold text-sm h-12 rounded-xl shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          Return to Swiggy LifeOS
        </button>
      </div>
    </div>
  );
};
