import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2, Sparkles, Terminal, Cpu } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { resolveUserSituation } from '../services/intentEngine';

const STEPS = [
  { label: "Classifying Situation Intent...", detail: "Claude 3.5 Sonnet NLP Engine" },
  { label: "Calling Swiggy MCP Tool Callers...", detail: "Food, Instamart & Dineout JSON-RPC" },
  { label: "Building Multi-Service LifePlan...", detail: "Optimizing bundle savings & ETAs" }
];

export const Thinking: React.FC = () => {
  const navigate = useNavigate();
  const { situationText, selectedChip, setPlan } = useLifeOSStore();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const prompt = situationText || selectedChip || "Friends coming over in 30 mins and I have ₹800";
    
    // Resolve dynamic plan via backend / AI engine
    resolveUserSituation(prompt).then((plan) => {
      setPlan(plan);
    });

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    const navTimer = setTimeout(() => {
      navigate('/plan');
    }, 2400);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(navTimer);
    };
  }, [situationText, selectedChip, setPlan, navigate]);

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#1C1C1E] text-white flex flex-col justify-between p-6 border-x border-white/10 shadow-sm relative overflow-hidden">
      {/* Background Pulsing Glow */}
      <div className="absolute inset-0 bg-radial from-[#FC8019]/20 via-transparent to-transparent pointer-events-none" />

      <div>
        {/* Header Badge */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-[#FC8019]" />
            <span>Claude 3.5 Sonnet Intent Engine</span>
          </div>

          <span className="text-[10px] text-[#22C55E] font-bold bg-[#22C55E]/20 border border-[#22C55E]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            LIVE MCP
          </span>
        </div>

        {/* Concentric Pulsing Circles Animation */}
        <div className="my-12 flex flex-col items-center justify-center relative">
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-36 h-36 rounded-full border border-[#FC8019]/40 absolute"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full border-2 border-[#FC8019]/70 absolute"
          />

          <div className="w-16 h-16 rounded-full bg-[#FC8019] text-white flex items-center justify-center shadow-2xl relative z-10">
            <Brain className="w-8 h-8 animate-pulse" />
          </div>

          <span className="mt-8 font-extrabold text-sm text-white tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#FC8019]" />
            Orchestrating Swiggy LifePlan...
          </span>
          <p className="text-xs text-[#9CA3AF] font-medium mt-1 text-center max-w-[260px]">
            "{situationText || selectedChip || "Friends coming over in 30 mins, ₹800 budget"}"
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
          {STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${isDone
                      ? 'bg-[#22C55E] text-white'
                      : isCurrent
                        ? 'bg-[#FC8019] text-white animate-bounce'
                        : 'bg-white/10 text-[#9CA3AF]'
                    }
                  `}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isCurrent || isDone ? 'text-white' : 'text-[#9CA3AF]'}`}>
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-[#9CA3AF] font-mono mt-0.5">{step.detail}</p>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-bold text-[#FC8019] animate-pulse">
                    Processing...
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center py-2">
        <p className="text-[11px] text-[#6B7280] font-mono">
          Swiggy JSON-RPC 2.0 Protocol · OAuth Bearer Token Verified
        </p>
      </div>
    </div>
  );
};
