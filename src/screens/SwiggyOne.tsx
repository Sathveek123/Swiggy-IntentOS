import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Sparkles, ShieldCheck, Zap, ArrowLeft, ArrowRight, Gift, Percent, Utensils } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const SwiggyOne: React.FC = () => {
  const navigate = useNavigate();
  const { setChip } = useLifeOSStore();

  const handleApplyVipPlan = () => {
    setChip("👥 Friends Coming Over");
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
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#FFB800] to-[#FC8019] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-lg">
            <Crown className="w-3.5 h-3.5 fill-white" />
            <span>Swiggy One VIP Lounge</span>
          </div>
        </div>

        {/* Hero Gold Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2A2A2D] via-[#1C1C1E] to-[#2C1D11] border border-[#FFB800]/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden mb-5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FC8019]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-[#FFB800] bg-[#FFB800]/15 px-2.5 py-0.5 rounded-full border border-[#FFB800]/30 tracking-wider">
              GOLD MEMBER STATUS ACTIVE
            </span>
            <span className="text-xs font-bold text-white">Sathveek Varma</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            ₹4,820 Saved This Year 🎉
          </h2>
          <p className="text-xs text-[#9CA3AF] font-normal mt-1">
            Unlimited Free Deliveries + VIP Discounts across Food, Instamart & Dineout.
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
            <span className="text-[#9CA3AF]">Next renewal: <strong className="text-white">Dec 2026</strong></span>
            <span className="text-[#FFB800] font-bold">Auto-Renewed</span>
          </div>
        </motion.div>

        {/* Perks Grid */}
        <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">
          Your Exclusive VIP Privileges
        </h3>

        <div className="space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FC8019]/20 text-[#FC8019] border border-[#FC8019]/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Unlimited FREE Delivery</h4>
              <p className="text-xs text-[#9CA3AF] font-normal mt-0.5 leading-relaxed">
                Zero delivery fee on all Food & Instamart orders above ₹99.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Flat 50% Off Dineout Pass</h4>
              <p className="text-xs text-[#9CA3AF] font-normal mt-0.5 leading-relaxed">
                Instant bill discount at 2,400+ fine dining restaurants.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Swiggy Gourmet Complimentary Tasting</h4>
              <p className="text-xs text-[#9CA3AF] font-normal mt-0.5 leading-relaxed">
                Free chef special dessert with every Swiggy Gourmet order.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="relative z-10 pt-4">
        <button
          onClick={handleApplyVipPlan}
          className="w-full bg-gradient-to-r from-[#FC8019] to-[#FFB800] text-white font-extrabold text-sm h-12 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Order Swiggy One VIP LifePlan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
