import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Zap, PiggyBank, Sparkles, BrainCircuit, 
  ShieldCheck, AlertTriangle, Flame, Clock, Award, Coffee, BookOpen, 
  ShoppingCart, Heart, CheckCircle2, ChevronRight, HelpCircle, Layers, DollarSign,
  XCircle, RefreshCw, Star, WifiOff, Activity, Sliders, GitCommit, Database, Check, RotateCcw
} from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

export const StudentSurvivalFlow: React.FC = () => {
  const navigate = useNavigate();
  const { replaceCartWithPlan } = useLifeOSStore();

  // Wizard Step State: 1 = Context/Memory, 2 = Controls & Dashboard, 3 = Missions, 4 = Decision Tree & Thinking, 5 = Operating System
  const [step, setStep] = useState<number>(1);
  const [walletAmount, setWalletAmount] = useState<number>(147);
  const [selectedMission, setSelectedMission] = useState<string>("Study Fuel");
  const [activeTab, setActiveTab] = useState<string>("plan");
  
  // System 4: User Control Sliders
  const [userWeights, setUserWeights] = useState({
    budget: 90,
    protein: 85,
    speed: 70,
    taste: 80,
    health: 75
  });

  // System 7: Auto-Recovery Simulator State
  const [isRecoveryActive, setIsRecoveryActive] = useState<boolean>(false);
  
  // System 14 & 15: Mission Celebration & Reflection
  const [isMissionComplete, setIsMissionComplete] = useState<boolean>(false);
  const [reflectionRating, setReflectionRating] = useState<string | null>(null);

  // System 13: Offline Handling Simulator State
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // System 11: Thinking Micro-interaction Stepper
  const [thinkingStep, setThinkingStep] = useState<number>(0);
  const thinkingStepsList = [
    "Checking Wallet Budget Cap (₹147)...",
    "Verifying Computer Networks Exam Schedule...",
    "Checking Hostel Gate 3 Closure Time (10 PM)...",
    "Searching Nearby 24/7 Swiggy MCP Kitchens...",
    "Finding Instamart Dark Store Stock...",
    "Calculating Protein & Calorie Ratios...",
    "Applying STUDENT100 Coupon Savings...",
    "Finalizing Autonomous Survival Operating Plan..."
  ];

  useEffect(() => {
    if (step === 4) {
      const interval = setInterval(() => {
        setThinkingStep((prev) => {
          if (prev < thinkingStepsList.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleGoToCart = () => {
    replaceCartWithPlan([
      { id: "surv_1", name: "Paneer Fried Rice", qty: 1, price: 89, category: "food", image: IMAGES.vegBiryani, tag: "Study Fuel ⚡" },
      { id: "surv_2", name: "Organic Bananas (6 pcs)", qty: 1, price: 35, category: "instamart", image: IMAGES.bananas, tag: "Fresh 🍌" }
    ]);
    setIsMissionComplete(true);
    navigate('/cart');
  };

  const missions = [
    { id: "study_fuel", label: "Study Fuel ⚡", confidence: 94, desc: "22g protein for late night exam focus", icon: "🧠" },
    { id: "cheapest", label: "Cheapest Meal 💸", confidence: 91, desc: "Absolute minimum spend under ₹70", icon: "🏷️" },
    { id: "max_calories", label: "Maximum Calories 🔋", confidence: 87, desc: "Highest kcal per rupee for energy", icon: "🔥" },
    { id: "high_protein", label: "High Protein 🏋️", confidence: 89, desc: "30g+ protein for muscle recovery", icon: "💪" },
    { id: "fastest", label: "Fastest Delivery 🚀", confidence: 82, desc: "Food at gate in <15 mins", icon: "⏱️" },
    { id: "comfort", label: "Comfort Food 🍕", desc: "Cheesy treats for stress relief", confidence: 78, icon: "🧀" }
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* System 13: Offline Handling Banner */}
        {isOffline && (
          <div className="bg-[#F59E0B] text-black text-xs font-bold p-2.5 text-center rounded-xl mb-3 flex items-center justify-center gap-1.5 shadow-sm">
            <WifiOff className="w-4 h-4" />
            <span>Offline Mode: Loaded Cached Survival Plan (Reconnect to Place Order)</span>
          </div>
        )}

        {/* Bright Header Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => {
              if (step > 1) setStep(step - 1);
              else navigate('/modules');
            }}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3] transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1.5 bg-[#FC8019] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-pill">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Student Survival Mode · Step {step}/5</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CONTEXT & LIFEOS MEMORY ENGINE (BRIGHT CONSUMER THEME) */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Bright Situation Card */}
              <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-3xl p-5 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👋</span>
                    <div>
                      <h2 className="text-xl font-extrabold text-[#1C1C1E]">Good Evening Sathveek</h2>
                      <span className="text-xs text-[#22C55E] font-bold">Memory Synced · Indiranagar Hostel Gate 3</span>
                    </div>
                  </div>
                  <span className="bg-[#FC8019] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                    98% Profile Match
                  </span>
                </div>

                {/* System 6 Memory Attributes */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#FC8019]/20 shadow-2xs">
                    <span className="text-[#6B7280] block text-[10px]">Persona</span>
                    <span className="font-extrabold text-[#1C1C1E]">Late Night Learner</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#FC8019]/20 shadow-2xs">
                    <span className="text-[#6B7280] block text-[10px]">Avg Dinner Time</span>
                    <span className="font-extrabold text-[#1C1C1E]">9:42 PM</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#FC8019]/20 shadow-2xs">
                    <span className="text-[#6B7280] block text-[10px]">Favorite Protein</span>
                    <span className="font-extrabold text-[#EC4899]">Paneer / Eggs</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#FC8019]/20 shadow-2xs">
                    <span className="text-[#6B7280] block text-[10px]">Target Budget</span>
                    <span className="font-extrabold text-[#22C55E]">₹120 / meal</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#FC8019]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs bg-white p-3 rounded-2xl border border-[#FC8019]/30 shadow-2xs">
                    <span className="text-[#4B5563] font-medium">Wallet Cash Balance</span>
                    <span className="text-xl font-extrabold text-[#FC8019]">₹{walletAmount} left</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-[#FC8019]/20 shadow-2xs">
                      <span className="text-[#6B7280] text-[10px]">Hostel Allowance</span>
                      <span className="font-extrabold text-[#1C1C1E] block">5 Days Left</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-[#FC8019]/20 shadow-2xs">
                      <span className="text-[#6B7280] text-[10px]">Exam Detected</span>
                      <span className="font-extrabold text-[#22C55E] block">Tomorrow 9 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System 8: Prediction Accuracy Badge */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-soft">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#22C55E]" />
                  <div>
                    <span className="font-bold text-[#1C1C1E] block">AI Prediction Engine</span>
                    <span className="text-[10px] text-[#6B7280]">Predicted Study Night (Correct ✓)</span>
                  </div>
                </div>
                <span className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                  91% Accuracy
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-[11px] h-12 rounded-xl border border-[#E8E8E8] flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <WifiOff className="w-3.5 h-3.5 text-[#FC8019]" />
                  <span>{isOffline ? "Online" : "Offline"}</span>
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-2/3 bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Continue to Controls</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SURVIVAL DASHBOARD & USER CONTROL OPTIMIZER */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Survival Dashboard & Controls 🎛️</h1>
                <p className="text-xs text-[#6B7280] mt-0.5">Customize real-time AI optimization weights.</p>
              </div>

              {/* Bright Wallet Slider Simulator */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B7280]">Current Available Cash</span>
                  <span className="text-lg font-extrabold text-[#FC8019]">₹{walletAmount}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={300}
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(Number(e.target.value))}
                  className="w-full accent-[#FC8019] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6B7280]">
                  <span>Emergency ₹30</span>
                  <span>Hostel Cap ₹300</span>
                </div>
              </div>

              {/* System 4: Bright User Control Weight Sliders */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1C1E] border-b border-[#F0F0F0] pb-2">
                  <Sliders className="w-4 h-4 text-[#FC8019]" />
                  <span>Real-Time AI Weight Preferences</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#6B7280]">Budget Savings</span>
                      <span className="font-extrabold text-[#FC8019]">{userWeights.budget}%</span>
                    </div>
                    <input 
                      type="range" min={10} max={100} value={userWeights.budget}
                      onChange={(e) => setUserWeights({...userWeights, budget: Number(e.target.value)})}
                      className="w-full accent-[#FC8019] h-1.5 bg-[#F0F0F0] rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#6B7280]">Protein Goal (25g+)</span>
                      <span className="font-extrabold text-[#EC4899]">{userWeights.protein}%</span>
                    </div>
                    <input 
                      type="range" min={10} max={100} value={userWeights.protein}
                      onChange={(e) => setUserWeights({...userWeights, protein: Number(e.target.value)})}
                      className="w-full accent-[#EC4899] h-1.5 bg-[#F0F0F0] rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#6B7280]">Delivery Speed (&lt;25m)</span>
                      <span className="font-extrabold text-[#3B82F6]">{userWeights.speed}%</span>
                    </div>
                    <input 
                      type="range" min={10} max={100} value={userWeights.speed}
                      onChange={(e) => setUserWeights({...userWeights, speed: Number(e.target.value)})}
                      className="w-full accent-[#3B82F6] h-1.5 bg-[#F0F0F0] rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8] shadow-xs cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Choose Mission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MISSIONS & GOAL TRADE-OFF SIMULATOR */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Choose Your Mission 🎯</h1>
                <p className="text-xs text-[#6B7280] mt-0.5">Select goal & view real-time confidence scores.</p>
              </div>

              {/* System 3: Bright Goal Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {missions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMission(m.label)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                      selectedMission === m.label 
                        ? 'bg-[#FFF4EC] border-[#FC8019] text-[#1C1C1E] shadow-soft' 
                        : 'bg-white border-[#E8E8E8] hover:border-[#FC8019]/40 text-[#4B5563] shadow-2xs'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xl">{m.icon}</span>
                      <span className="bg-[#22C55E] text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow-2xs">
                        {m.confidence}%
                      </span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#1C1C1E]">{m.label}</h4>
                      <p className="text-[9px] text-[#6B7280] mt-0.5 line-clamp-1">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* System 3 Trade-Off Calculator Banner */}
              <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-3.5 text-xs space-y-1 shadow-soft">
                <span className="text-[#FC8019] font-bold uppercase text-[10px]">Trade-off Delta Calculator</span>
                <p className="text-[#4B5563]">
                  Changing from <strong className="text-[#1C1C1E]">Study Fuel</strong> to <strong className="text-[#1C1C1E]">Cheapest</strong>:
                  <span className="text-[#EF4444] font-bold ml-1">Lose 12g Protein</span> | <span className="text-[#22C55E] font-bold ml-1">Save ₹24 Cash</span>
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8] shadow-xs cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Launch AI Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DECISION TREE & MICRO-INTERACTION STEPPER */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-6 text-center space-y-5"
            >
              {/* Concentric Pulsing Brain */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-[#FC8019]/20 border border-[#FC8019]"
                />
                <div className="w-14 h-14 rounded-full bg-[#FC8019] text-white flex items-center justify-center shadow-pill z-10">
                  <BrainCircuit className="w-7 h-7 animate-pulse" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#1C1C1E]">AI Decision Intelligence Engine</h2>
                <span className="text-xs text-[#FC8019] font-bold">Target Mission: {selectedMission}</span>
              </div>

              {/* System 11: Bright Micro-interaction Stepper Feedback */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 text-left space-y-2 max-w-xs mx-auto text-xs shadow-soft">
                {thinkingStepsList.map((stepText, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between transition-all ${
                      idx <= thinkingStep ? 'text-[#1C1C1E] font-semibold' : 'text-[#9CA3AF]'
                    }`}
                  >
                    <span>{stepText}</span>
                    {idx <= thinkingStep && <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 max-w-xs mx-auto pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8] shadow-xs cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="w-2/3 bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Survival Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SURVIVAL MASTER OPERATING SYSTEM (9 SUB-TABS BRIGHT THEME) */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {/* Top 9 Sub-Navigation Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
                {[
                  { id: "plan", label: "📋 Plan" },
                  { id: "tree", label: "🌳 Decision Tree" },
                  { id: "alternatives", label: "🔀 Alternatives" },
                  { id: "money", label: "💰 Money Timeline" },
                  { id: "study", label: "☕ Study Boost" },
                  { id: "emergency", label: "🚨 Emergency & Recovery" },
                  { id: "health", label: "🧠 Health & Progress" },
                  { id: "prediction", label: "📈 AI Memory" },
                  { id: "celebration", label: "🎓 Celebration" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap font-bold text-xs transition-all cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-[#FC8019] text-white shadow-pill' 
                        : 'bg-white text-[#4B5563] hover:text-[#1C1C1E] border border-[#E8E8E8] shadow-2xs'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: SURVIVAL PLAN & WHY NOT REJECTIONS */}
              {activeTab === "plan" && (
                <div className="space-y-3">
                  {/* System 1: Confidence Score Banner */}
                  <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-3 flex items-center justify-between text-xs shadow-soft">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#FC8019]" />
                      <div>
                        <span className="font-extrabold text-[#1C1C1E] block">Survival Confidence Score</span>
                        <span className="text-[10px] text-[#6B7280]">Hostel, Exam & Nutrition Verified</span>
                      </div>
                    </div>
                    <span className="bg-[#FC8019] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
                      96% CONFIDENT
                    </span>
                  </div>

                  {/* Dinner Card */}
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-[#FC8019] uppercase tracking-wider">Dinner · Swiggy Food</span>
                        <h3 className="font-extrabold text-base text-[#1C1C1E]">Paneer Fried Rice</h3>
                        <p className="text-xs text-[#6B7280]">Sri Krishna Sagar · 22 mins delivery</p>
                      </div>
                      <span className="text-lg font-extrabold text-[#1C1C1E]">₹89</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#6B7280] pt-1">
                      <span>680 kcal</span>
                      <span>•</span>
                      <span className="text-[#EC4899] font-bold">22g Protein</span>
                    </div>
                  </div>

                  {/* Instamart Snack Card */}
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Snack · Instamart 8-Min</span>
                        <h3 className="font-extrabold text-base text-[#1C1C1E]">Organic Bananas (6 pcs)</h3>
                        <p className="text-xs text-[#6B7280]">Instamart Dark Store · 10 mins</p>
                      </div>
                      <span className="text-lg font-extrabold text-[#1C1C1E]">₹35</span>
                    </div>
                  </div>

                  {/* Total & Remaining Cash Bar */}
                  <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-4 flex justify-between items-center shadow-soft">
                    <div>
                      <span className="text-[10px] text-[#6B7280] uppercase font-bold block">Total Plan Cost</span>
                      <span className="text-xl font-extrabold text-[#1C1C1E]">₹124</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#6B7280] uppercase font-bold block">Remaining Cash</span>
                      <span className="text-xl font-extrabold text-[#22C55E]">₹23 Left</span>
                    </div>
                  </div>

                  {/* System 2: Why NOT Other Plans? (Negative Explainability Log) */}
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2.5 text-xs shadow-soft">
                    <span className="font-bold text-[#1C1C1E] uppercase text-[10px] tracking-wider block border-b border-[#F0F0F0] pb-1">
                      ❌ Why NOT Other Plans? (Negative Explainability Log)
                    </span>

                    <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F0F0]">
                      <span className="text-[#6B7280] line-through">Pepperoni Pizza Combo (₹180)</span>
                      <span className="text-[#EF4444] font-bold text-[10px]">Rejected: Budget Exceeded</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F0F0]">
                      <span className="text-[#6B7280] line-through">Cheese Burger & Fries (₹110)</span>
                      <span className="text-[#EF4444] font-bold text-[10px]">Rejected: Low Protein (8g)</span>
                    </div>

                    <div className="flex items-center justify-between text-xs py-1">
                      <span className="text-[#6B7280] line-through">Hyderabadi Biryani (₹140)</span>
                      <span className="text-[#EF4444] font-bold text-[10px]">Rejected: 45 Min (Gate Lock)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGoToCart}
                    className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Stage Survival Plan to Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TAB 2: DECISION TREE VISUALIZATION */}
              {activeTab === "tree" && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 text-xs shadow-soft">
                  <h4 className="font-bold text-[#1C1C1E] uppercase tracking-wider text-[10px] border-b border-[#F0F0F0] pb-1">
                    🌳 Decision Tree Execution Graph
                  </h4>

                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-[#4B5563]">
                      <GitCommit className="w-4 h-4 text-[#FC8019]" />
                      <span>Input: Student Sathveek (Indiranagar)</span>
                    </div>
                    <div className="ml-4 pl-2 border-l border-[#E8E8E8] space-y-2">
                      <div className="text-[#1C1C1E]">└─► Calendar: Computer Networks Exam 9 AM</div>
                      <div className="text-[#1C1C1E]">└─► Time: 9:34 PM (Late Night Gate 3 Lock)</div>
                      <div className="text-[#1C1C1E]">└─► Budget Cap: ₹147 Cash Balance</div>
                      <div className="text-[#1C1C1E]">└─► Protein Filter: 22g Target</div>
                      <div className="text-[#22C55E] font-bold">└─► Coupon: STUDENT100 Applied</div>
                      <div className="text-[#FC8019] font-bold">└─► Final Plan: Paneer Fried Rice + Bananas</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ALTERNATIVE PLANS */}
              {activeTab === "alternatives" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-1 shadow-soft">
                    <div className="flex justify-between font-bold text-[#1C1C1E]">
                      <span>🔋 Maximum Calories</span>
                      <span className="text-[#FC8019]">₹99</span>
                    </div>
                    <p className="text-[#6B7280]">Set Dosa (3 pcs) + Parle-G Biscuit · 1,200 kcal</p>
                  </div>

                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-1 shadow-soft">
                    <div className="flex justify-between font-bold text-[#1C1C1E]">
                      <span>🥗 Healthiest Option</span>
                      <span className="text-[#22C55E]">₹118</span>
                    </div>
                    <p className="text-[#6B7280]">Sprouted Moong Salad + Fresh Coconut Water · 900 kcal</p>
                  </div>

                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-1 shadow-soft">
                    <div className="flex justify-between font-bold text-[#1C1C1E]">
                      <span>💸 Cheapest Possible</span>
                      <span className="text-[#3B82F6]">₹63</span>
                    </div>
                    <p className="text-[#6B7280]">Egg Roll + Filter Coffee · 600 kcal</p>
                  </div>
                </div>
              )}

              {/* TAB 4: MONEY TIMELINE */}
              {activeTab === "money" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                    <h4 className="font-bold text-[#1C1C1E] uppercase text-[10px]">Hostel Budget Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-[#F0F0F0] pb-1">
                        <span className="text-[#1C1C1E] font-bold">Friday (Tonight)</span>
                        <span className="text-[#FC8019]">Start ₹147 → Spend ₹58 → ₹89 Left</span>
                      </div>
                      <div className="flex justify-between border-b border-[#F0F0F0] pb-1">
                        <span className="text-[#1C1C1E] font-bold">Saturday (Exam Day)</span>
                        <span className="text-[#22C55E]">Spend ₹40 → ₹49 Left</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1C1C1E] font-bold">Sunday</span>
                        <span className="text-[#3B82F6]">Spend ₹35 → ₹14 Buffer</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: STUDY BOOST */}
              {activeTab === "study" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 flex items-center justify-between shadow-soft">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-[#FC8019]" />
                      <div>
                        <h4 className="font-bold text-[#1C1C1E]">Instamart Cold Coffee</h4>
                        <span className="text-[10px] text-[#6B7280]">10-min delivery</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#1C1C1E] text-sm">₹18</span>
                  </div>
                </div>
              )}

              {/* TAB 6: SYSTEM 7 EMERGENCY & AUTO-RECOVERY */}
              {activeTab === "emergency" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                    <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-2">
                      <span className="font-bold text-[#1C1C1E] uppercase text-[10px]">Auto-Recovery Strategy</span>
                      <button 
                        onClick={() => setIsRecoveryActive(!isRecoveryActive)}
                        className="bg-[#FC8019] text-white font-bold px-2.5 py-1 rounded text-[10px] shadow-2xs"
                      >
                        Simulate Closure Trigger
                      </button>
                    </div>

                    {isRecoveryActive ? (
                      <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-3 space-y-1">
                        <span className="font-bold text-[#22C55E]">Restaurant Closed → Auto Recovery Triggered</span>
                        <p className="text-[#1C1C1E]">Found Similar Kitchen: <strong>Sri Krishna Sagar Tiffin</strong></p>
                        <p className="text-[#6B7280]">Result: <span className="text-[#22C55E] font-bold">₹8 Cheaper, 2 Mins Faster</span></p>
                      </div>
                    ) : (
                      <p className="text-[#6B7280]">If primary kitchen closes or items go out of stock, Swiggy AI auto-swaps to nearest verified kitchen.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: SYSTEM 9 & 10 HEALTH SCORE & PROGRESS */}
              {activeTab === "health" && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                    <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-2">
                      <span className="font-bold text-[#1C1C1E] uppercase text-[10px]">Student Health Score</span>
                      <span className="text-xl font-extrabold text-[#22C55E]">78 / 100</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-[#F5F5F3] p-2 rounded-xl">
                        <span className="text-[#6B7280] block">Protein</span>
                        <span className="font-bold text-[#22C55E]">Good (22g)</span>
                      </div>
                      <div className="bg-[#F5F5F3] p-2 rounded-xl">
                        <span className="text-[#6B7280] block">Hydration</span>
                        <span className="font-bold text-[#F59E0B]">Low (1.2L)</span>
                      </div>
                      <div className="bg-[#F5F5F3] p-2 rounded-xl">
                        <span className="text-[#6B7280] block">Late Night Eating</span>
                        <span className="font-bold text-[#EF4444]">High (41%)</span>
                      </div>
                      <div className="bg-[#F5F5F3] p-2 rounded-xl">
                        <span className="text-[#6B7280] block">Breakfast</span>
                        <span className="font-bold text-[#F59E0B]">Skipped 9x</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: SYSTEM 6 & 8 AI PREDICTION & MEMORY */}
              {activeTab === "prediction" && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 text-xs shadow-soft">
                  <h4 className="font-bold text-[#1C1C1E] uppercase text-[10px] border-b border-[#F0F0F0] pb-1">
                    📈 LifeOS Learning & Memory Log
                  </h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Monthly Prediction Accuracy</span>
                      <span className="font-bold text-[#22C55E]">91%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Hostel Gate Lock Accuracy</span>
                      <span className="font-bold text-[#22C55E]">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Budget Compliance Rate</span>
                      <span className="font-bold text-[#22C55E]">94%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: SYSTEM 14 & 15 CELEBRATION & AI REFLECTION */}
              {activeTab === "celebration" && (
                <div className="space-y-3 text-xs">
                  {/* System 14: Emotional Success Celebration */}
                  <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-4 text-center space-y-2 shadow-soft">
                    <span className="text-3xl">🎓</span>
                    <h3 className="font-extrabold text-base text-[#1C1C1E]">Mission Complete!</h3>
                    <p className="text-[#1C1C1E] font-bold">Stayed ₹31 Under Budget · Protein Goal Completed</p>
                    <p className="text-[#22C55E] font-extrabold text-xs">Good Luck for Tomorrow's Computer Networks Exam! 🌟</p>
                  </div>

                  {/* System 15: AI Reflection Loop */}
                  <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 text-center shadow-soft">
                    <span className="font-bold text-[#1C1C1E] text-xs block">AI Reflection Loop: How was this recommendation?</span>
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {["Too Expensive", "Too Spicy", "Perfect ✨", "Too Small", "Loved It ❤️"].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setReflectionRating(rating)}
                          className={`p-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                            reflectionRating === rating 
                              ? 'bg-[#FC8019] text-white border-[#FC8019] shadow-xs' 
                              : 'bg-white text-[#6B7280] border-[#E8E8E8] hover:border-[#FC8019]/40'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    {reflectionRating && (
                      <span className="text-[10px] text-[#22C55E] font-bold block pt-1">
                        Feedback logged! Retrained model weights for your next order.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">
          Swiggy LifeOS Student Engine · Built for Swiggy Builders Club
        </p>
      </div>
    </div>
  );
};
