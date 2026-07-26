import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, ShoppingBag, MapPin, Navigation } from 'lucide-react';
import { AnimatedCheckmark } from '../components/AnimatedCheckmark';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const Summary: React.FC = () => {
  const navigate = useNavigate();
  const { planData, cartItems, resetStore } = useLifeOSStore();

  const foodItems = cartItems.filter(i => i.category === 'food');
  const instamartItems = cartItems.filter(i => i.category === 'instamart');

  const foodSubtotal = foodItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const instamartSubtotal = instamartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const grandTotal = foodSubtotal + instamartSubtotal;

  const handleStartNewPlan = () => {
    resetStore();
    navigate('/home');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* Animated Checkmark Header */}
        <div className="flex flex-col items-center justify-center pt-6 pb-4">
          <AnimatedCheckmark size={84} />
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight mt-4 text-center"
          >
            Order Confirmed! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="text-xs text-[#6B7280] font-normal mt-1 text-center"
          >
            Swiggy LifeOS synchronized your order across services
          </motion.p>
        </div>

        {/* Order Delivery Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="space-y-3 mt-4"
        >
          {/* Card 1: Food Delivery Status */}
          {foodItems.length > 0 && (
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft">
              <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">🍗</span>
                  <span className="font-bold text-xs text-[#1C1C1E]">{planData.food.restaurant}</span>
                </div>
                <span className="bg-[#FFF4EC] text-[#FC8019] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#FC8019]/20">
                  Preparing
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FC8019]" />
                  <span>Est. Arrival: <strong className="text-[#1C1C1E]">{planData.food.deliveryTime}</strong></span>
                </div>
                <span className="font-bold text-[#1C1C1E]">₹{foodSubtotal}</span>
              </div>
            </div>
          )}

          {/* Card 2: Instamart Quick Commerce Status */}
          {instamartItems.length > 0 && (
            <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft">
              <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">🛒</span>
                  <span className="font-bold text-xs text-[#1C1C1E]">Instamart Dark Store</span>
                </div>
                <span className="bg-[#F0FFF4] text-[#22C55E] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#22C55E]/20">
                  Packed
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Est. Arrival: <strong className="text-[#1C1C1E]">{planData.instamart.deliveryTime}</strong></span>
                </div>
                <span className="font-bold text-[#1C1C1E]">₹{instamartSubtotal}</span>
              </div>
            </div>
          )}

          {/* Card 3: Dineout Reservation Status */}
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">🍽️</span>
                <span className="font-bold text-xs text-[#1C1C1E]">{planData.dineout.restaurant}</span>
              </div>
              <span className="bg-[#EEF2FF] text-[#6366F1] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#6366F1]/20">
                Reserved
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B7280]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Table for <strong>{planData.dineout.tableFor}</strong> at <strong>{planData.dineout.slot}</strong></span>
              </div>
              <span className="font-semibold text-[#6366F1]">₹0 Pre-pay</span>
            </div>
          </div>
        </motion.div>

        {/* COD Summary Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          className="mt-4 bg-[#F5F5F3] border border-[#E8E8E8] rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span className="text-xs font-semibold text-[#1C1C1E]">Payment Mode</span>
          </div>
          <span className="text-xs font-bold text-[#1C1C1E] bg-white border border-[#E8E8E8] px-3 py-1 rounded-full shadow-2xs">
            Cash on Delivery (COD) ₹{grandTotal > 0 ? grandTotal : planData.totalEstimate}
          </span>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        className="space-y-2.5 pt-4"
      >
        <button
          onClick={() => navigate('/tracking')}
          className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-bold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
          <span>Track Orders Live</span>
        </button>

        <button
          onClick={handleStartNewPlan}
          className="w-full bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] border border-[#E8E8E8] font-bold text-sm h-12 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Start New LifePlan</span>
        </button>
      </motion.div>
    </div>
  );
};
