import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, Sparkles, BrainCircuit } from 'lucide-react';

interface Props {
  confidence?: number;
  reasons?: string[];
}

export const ExplainabilityBadge: React.FC<Props> = ({
  confidence = 96,
  reasons = [
    "Within your ₹800 budget limit",
    "High 4.7★ hygiene & consistency rating",
    "22 min fastest delivery route",
    "Matches your Friday group preference",
    "Saves ₹142 with Swiggy One bundle discount"
  ]
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-3.5 shadow-xs my-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#FC8019] text-white flex items-center justify-center font-bold text-xs shadow-pill">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-[#1C1C1E]">AI Decision Confidence</span>
              <span className="bg-[#22C55E] text-white text-[10px] font-extrabold px-2 py-0.2 rounded-full shadow-2xs">
                {confidence}% CONFIDENT
              </span>
            </div>
            <span className="text-[10px] text-[#6B7280] font-medium block">
              Transparent, explainable recommendation engine
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold text-[#FC8019] flex items-center gap-1 hover:underline"
        >
          <span>Why recommended?</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-3 mt-2.5 border-t border-[#FC8019]/20 space-y-1.5"
          >
            <span className="text-[10px] font-extrabold text-[#FC8019] uppercase tracking-wider block mb-1">
              Decision Reasoning Breakdown:
            </span>
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#1C1C1E]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
