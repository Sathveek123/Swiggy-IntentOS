import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, PiggyBank, ArrowLeft, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { PlanCard } from '../components/PlanCard';
import { ExplainabilityBadge } from '../components/ExplainabilityBadge';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const Plan: React.FC = () => {
  const navigate = useNavigate();
  const { planData, situationText, selectedChip, replaceCartWithPlan, mcpToolsCalled } = useLifeOSStore();
  const [foodAdded, setFoodAdded] = useState(false);
  const [instamartAdded, setInstamartAdded] = useState(false);
  const [showToolsList, setShowToolsList] = useState(true);

  // Accurately compute totals from items
  const foodTotal = planData.food.items.reduce((s, i) => s + (i.price * i.qty), 0);
  const instamartTotal = planData.instamart.items.reduce((s, i) => s + (i.price * i.qty), 0);
  const totalEstimate = foodTotal + instamartTotal;
  
  const budget = planData.budget || 800;
  const budgetUsedPercent = Math.min(Math.round((totalEstimate / budget) * 100), 100);
  const budgetRemainingPercent = 100 - budgetUsedPercent;

  const handleAddFood = () => {
    replaceCartWithPlan([...planData.food.items]);
    setFoodAdded(true);
  };

  const handleAddInstamart = () => {
    replaceCartWithPlan([...planData.instamart.items]);
    setInstamartAdded(true);
  };

  const handleGoToCart = () => {
    // Replace cart with exact items of this specific LifePlan
    replaceCartWithPlan([...planData.food.items, ...planData.instamart.items]);
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-[#FC8019] bg-[#FFF4EC] px-3 py-1 rounded-full border border-[#FC8019]/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> LifeOS Optimized
          </span>
        </div>

        {/* Screen Title */}
        <div className="mb-2">
          <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
            Your LifePlan is Ready ✨
          </h1>
          <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#FFF4EC] text-[#FC8019] border border-[#FC8019]/30 text-xs font-semibold px-3.5 py-1.5 rounded-full">
            <span>{selectedChip || situationText || "Friends coming over · ₹800 budget"}</span>
          </div>
        </div>

        {/* Pillar 3 & 4: Explainability & Trust Layer Badge */}
        <ExplainabilityBadge
          confidence={Math.min(99, Math.round(70 + (planData.food.rating || 4.5) * 5))}
          reasons={[
            `Fits within your ₹${budget} budget limit — total cost ₹${totalEstimate}`,
            `${planData.food.restaurant} has a ${planData.food.rating ?? 4.7}★ rating for hygiene & consistency`,
            `Estimated arrival in ${planData.food.deliveryTime} to your saved location`,
            planData.savings > 0 ? `Saves ₹${planData.savings} with Swiggy One bundle optimization` : `Optimized selection from live menu availability`,
            `Instamart essentials (${planData.instamart.items[0]?.name ?? "Quick items"}) in ${planData.instamart.deliveryTime}`
          ]}
        />

        {/* Stacked Plan Cards */}
        <div className="space-y-3 mt-4">
          {/* CARD 1 — Food Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <PlanCard
              type="food"
              title="Food Delivery"
              restaurantOrStore={planData.food.restaurant}
              rating={planData.food.rating}
              deliveryTime={planData.food.deliveryTime}
              items={planData.food.items}
              totalPrice={foodTotal}
              isAdded={foodAdded}
              onAction={handleAddFood}
            />
          </motion.div>

          {/* CARD 2 — Instamart Quick Essentials */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <PlanCard
              type="instamart"
              title="Instamart Quick Essentials"
              restaurantOrStore="Instamart Dark Store"
              deliveryTime={planData.instamart.deliveryTime}
              items={planData.instamart.items}
              totalPrice={instamartTotal}
              isAdded={instamartAdded}
              onAction={handleAddInstamart}
            />
          </motion.div>

          {/* CARD 3 — Dineout Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <PlanCard
              type="dineout"
              title="Or Dine Out Instead?"
              restaurantOrStore={planData.dineout.restaurant}
              rating={4.5}
              tableFor={planData.dineout.tableFor}
              slot={planData.dineout.slot}
              onAction={() => alert(`Table for ${planData.dineout.tableFor} reserved at ${planData.dineout.restaurant}!`)}
            />
          </motion.div>
        </div>

        {/* Savings Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.4 }}
          className="mt-4 bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-4 flex items-center gap-3 shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-[#FC8019] text-white flex items-center justify-center shrink-0 shadow-pill">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1C1C1E] uppercase tracking-wider">
              Smart Savings Applied
            </h4>
            <p className="text-xs text-[#4B5563] font-medium mt-0.5">
              You're saving <span className="font-bold text-[#FC8019]">₹{planData.savings}</span> with AI bundled suggestions.
            </p>
          </div>
        </motion.div>

        {/* MCP Tools Called Collapsible Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.45 }}
          className="bg-[#1C1C1E] rounded-2xl p-4 mt-4 shadow-soft text-white"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FC8019]" />
              <span className="font-semibold text-xs text-white">⚡ MCP Tools Called</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FC8019] text-white font-bold text-[11px] rounded-full px-2.5 py-0.5">
                {mcpToolsCalled.length} tools
              </span>
              <button
                onClick={() => setShowToolsList(!showToolsList)}
                className="text-[#9CA3AF] hover:text-white transition-colors p-1"
              >
                {showToolsList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tools List */}
          <AnimatePresence>
            {showToolsList && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-3 border-t border-white/10 mt-3 space-y-1.5"
              >
                {mcpToolsCalled.map((toolStr, idx) => {
                  const cleanName = toolStr.replace(' ✅', '').replace(' ⚡', '');
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
                      <span>→ {cleanName}</span>
                      <span className="text-[#22C55E] font-bold">✅</span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Budget Tracker Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.5 }}
          className="mt-4 bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft"
        >
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="font-medium text-[#6B7280]">Total Estimated Cost</span>
            <span className="font-bold text-[#1C1C1E] text-sm">
              ₹{totalEstimate} <span className="text-[#6B7280] font-normal">/ ₹{budget} budget</span>
            </span>
          </div>

          <div className="w-full bg-[#F0F0F0] h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${budgetUsedPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-[#FC8019] rounded-full"
            />
          </div>

          <div className="flex justify-between items-center mt-2 text-[11px]">
            <span className="text-[#FC8019] font-semibold">{budgetUsedPercent}% of budget used</span>
            <span className="text-[#6B7280] font-medium">{budgetRemainingPercent}% remaining</span>
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#E8E8E8] max-w-[430px] mx-auto z-30">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoToCart}
          className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-bold text-base h-13 rounded-2xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Confirm & Go to Cart</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
