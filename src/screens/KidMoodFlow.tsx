import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Smile, Heart, Sparkles, ShieldCheck, 
  CheckCircle2, Flame, Star, Coffee, AlertCircle, RotateCcw, 
  Lock, Sliders, Activity, Award, ThumbsUp, RefreshCw, Layers, Check, HelpCircle
} from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

export const KidMoodFlow: React.FC = () => {
  const navigate = useNavigate();
  const { replaceCartWithPlan } = useLifeOSStore();

  // Wizard Step State (1 to 10)
  const [step, setStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<string>("Happy 😊");
  const [selectedCharacter, setSelectedCharacter] = useState<string>("Chef Panda 🐼");
  
  // Custom Plate Builder State
  const [selectedProtein, setSelectedProtein] = useState<string>("Paneer");
  const [selectedVeggie, setSelectedVeggie] = useState<string>("Corn");
  const [selectedDrink, setSelectedDrink] = useState<string>("Fresh Orange Juice");

  // Parent Controls State
  const [parentRules, setParentRules] = useState({
    limitSugar: true,
    noSoftDrinks: true,
    maxBudget: 350,
    noNuts: true,
    noMushrooms: true
  });

  // Reflection Rating State
  const [reflectionRating, setReflectionRating] = useState<string | null>(null);

  // Enterprise Systems: Parent Dashboard active tab
  const [parentTab, setParentTab] = useState<string>('nutrition');

  const moods = [
    { label: "Happy 😊", desc: "Fun, colorful & uplifting treat", color: "#FC8019" },
    { label: "Comfort 🥺", desc: "Warm, cozy & mild food", color: "#6366F1" },
    { label: "Party 🎉", desc: "Bite-sized snacks & celebration", color: "#EC4899" },
    { label: "Excited 🤩", desc: "Crispy surprises & dips", color: "#F59E0B" },
    { label: "Sleepy 😴", desc: "Light, easy-to-digest dinner", color: "#8B5CF6" },
    { label: "Not Feeling Well 🤒", desc: "Warm soup & healing tea", color: "#22C55E" },
    { label: "Sweet Cravings 🍫", desc: "Fruit & chocolate pairing", color: "#3B82F6" },
    { label: "Crunchy Mood 🍟", desc: "Baked crunchy finger foods", color: "#14B8A6" }
  ];

  const characters = [
    { name: "Chef Panda 🐼", quote: "I cooked something super special & yummy today!", avatar: "🐼", bg: "#FFF4EC", border: "#FC8019" },
    { name: "Captain Dino 🦖", quote: "Roar! Fuel up for today's giant adventure!", avatar: "🦖", bg: "#F0FFF4", border: "#22C55E" },
    { name: "Space Robot 🤖", quote: "Beep boop! Space mission energy plate is ready!", avatar: "🤖", bg: "#EEF2FF", border: "#6366F1" }
  ];

  const handleGoToCart = () => {
    replaceCartWithPlan([
      { id: "kid_1", name: "Mini Cheese Pizza", qty: 1, price: 180, category: "food", image: IMAGES.pizza, tag: "Kid Favorite 🍕" },
      { id: "kid_2", name: "Fresh Orange Juice 250ml", qty: 1, price: 65, category: "instamart", image: IMAGES.pepsi, tag: "Fresh 🍊" },
      { id: "kid_3", name: "Fresh Fruit Bowl", qty: 1, price: 40, category: "instamart", image: IMAGES.bananas, tag: "Healthy 🍎" }
    ]);
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* Navigation Bar with Explicit Back Buttons for EVERY screen */}
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
          
          <div className="flex items-center gap-1.5 bg-[#EC4899] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-pill">
            <Smile className="w-3.5 h-3.5 fill-white" />
            <span>Kid Mood Menu · Step {step}/10</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* SCREEN 1: WELCOME & MOOD SELECTOR */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-[#FDF2F8] border border-[#EC4899]/30 rounded-3xl p-5 shadow-soft text-center space-y-2">
                <span className="text-4xl block">👋</span>
                <h1 className="text-2xl font-extrabold text-[#1C1C1E]">Hi Aarav!</h1>
                <p className="text-xs text-[#6B7280]">What mood are you in today? Tap how you feel!</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.label)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-24 shadow-2xs ${
                      selectedMood === m.label 
                        ? 'bg-[#FDF2F8] border-[#EC4899] text-[#1C1C1E] ring-2 ring-[#EC4899]/30' 
                        : 'bg-white border-[#E8E8E8] hover:border-[#EC4899]/40 text-[#4B5563]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xl">{m.label.split(" ").slice(-1)[0]}</span>
                      {selectedMood === m.label && (
                        <CheckCircle2 className="w-4 h-4 text-[#EC4899]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-[#1C1C1E]">{m.label.split(" ")[0]}</h4>
                      <p className="text-[9px] text-[#6B7280] mt-0.5 line-clamp-1">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Analyze Aarav's Mood</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* SCREEN 2: AI MOOD ANALYSIS STEPPER */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-6 text-center space-y-5"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-[#FDF2F8] border-2 border-[#EC4899] flex items-center justify-center text-4xl shadow-soft animate-bounce">
                🐼
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Chef Panda is Thinking...</h2>
                <span className="text-xs text-[#EC4899] font-bold">Detected Mood: {selectedMood}</span>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 text-left space-y-2.5 max-w-xs mx-auto text-xs shadow-soft">
                {[
                  "Mood: Happy 😊 verified",
                  "Time: 7:15 PM dinner slot",
                  "Parent Budget: Under ₹350 limit",
                  "Previous Favorite: Paneer Cheese Pizza",
                  "Nutrition Goal: 20g+ Protein",
                  "Allergy Check: Zero Nuts / Peanuts",
                  "Nearby Kitchen: 18 mins delivery time",
                  "Dessert Balance: Fresh Fruit Bowl"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#22C55E] font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22C55E]" />
                    <span className="text-[#1C1C1E]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Happy Meal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: MOOD RESULT & TODAY'S HAPPY MEAL */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Today's Happy Meal 🍕</h1>
                <p className="text-xs text-[#6B7280]">Tailored for Aarav's {selectedMood} mood.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-soft">
                <div className="relative h-36">
                  <img src={IMAGES.pizza} alt="Happy Meal" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#EC4899] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                    Mood Score: 96% Match
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    18 min delivery
                  </span>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-sm text-[#1C1C1E]">
                    <span>Mini Cheese Pizza + Orange Juice + Fruit Bowl</span>
                    <span className="text-[#EC4899]">₹285</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px]">
                    <div className="bg-[#FFF4EC] p-2 rounded-xl border border-[#FC8019]/20">
                      <span className="text-[#6B7280] block">Nutrition Score</span>
                      <span className="font-extrabold text-[#FC8019] text-xs">82 / 100</span>
                    </div>
                    <div className="bg-[#F0FFF4] p-2 rounded-xl border border-[#22C55E]/20">
                      <span className="text-[#6B7280] block">Fun Score</span>
                      <span className="font-extrabold text-[#22C55E] text-xs">96%</span>
                    </div>
                    <div className="bg-[#FDF2F8] p-2 rounded-xl border border-[#EC4899]/20">
                      <span className="text-[#6B7280] block">Sugar Level</span>
                      <span className="font-extrabold text-[#EC4899] text-xs">Moderate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ⭐ ENTERPRISE SYSTEM 1: PARENT TRUST ENGINE */}
              <div className="bg-white border border-[#22C55E]/30 rounded-2xl p-4 space-y-2.5 text-xs shadow-soft">
                <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                    <span className="font-extrabold text-[#1C1C1E] text-[11px] uppercase tracking-wide">AI Trust Report</span>
                  </div>
                  <span className="bg-[#22C55E] text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full">All 6 Checks Passed ✓</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'Nutrition Checked', status: true },
                    { label: 'Sugar Limit Safe (<20g)', status: true },
                    { label: 'Allergy Safe (Nut-Free Verified)', status: true },
                    { label: 'Age Appropriate (7 yrs)', status: true },
                    { label: 'Parent Rules Applied', status: true },
                    { label: 'Restaurant Hygiene Verified (4.6★)', status: true },
                  ].map((check) => (
                    <div key={check.label} className="flex items-center justify-between">
                      <span className="text-[#4B5563]">{check.label}</span>
                      <span className="text-[#22C55E] font-bold text-[10px]">✓ Safe</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Choose Character</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: INTERACTIVE CHARACTER THEME MODE */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Choose Character Theme 🎭</h1>
                <p className="text-xs text-[#6B7280]">Who is presenting Aarav's meal today?</p>
              </div>

              <div className="space-y-3">
                {characters.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCharacter(c.name)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer shadow-soft ${
                      selectedCharacter === c.name 
                        ? 'bg-white ring-2' 
                        : 'bg-white border-[#E8E8E8] hover:border-[#EC4899]/40'
                    }`}
                    style={{ 
                      borderColor: selectedCharacter === c.name ? c.border : '#E8E8E8',
                      backgroundColor: selectedCharacter === c.name ? c.bg : '#FFFFFF'
                    }}
                  >
                    <span className="text-4xl p-2 rounded-2xl bg-white shadow-xs border border-black/5">{c.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-sm text-[#1C1C1E]">{c.name}</h3>
                        {selectedCharacter === c.name && <CheckCircle2 className="w-4 h-4 text-[#EC4899]" />}
                      </div>
                      <p className="text-xs text-[#6B7280] italic mt-0.5">"{c.quote}"</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Build My Plate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: INTERACTIVE "BUILD MY PLATE" CUSTOMIZER */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 text-xs"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Build My Plate 🍽️</h1>
                <p className="text-xs text-[#6B7280]">Presented by {selectedCharacter}</p>
              </div>

              {/* Protein Selector */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                <span className="font-bold text-[#1C1C1E] block">1. Pick Your Protein 💪</span>
                <div className="grid grid-cols-3 gap-2">
                  {["Paneer", "Chicken", "Egg"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedProtein(p)}
                      className={`p-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                        selectedProtein === p 
                          ? 'bg-[#EC4899] text-white border-[#EC4899] shadow-xs' 
                          : 'bg-[#FAFAF8] text-[#4B5563] border-[#E8E8E8]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Veggies Selector */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                <span className="font-bold text-[#1C1C1E] block">2. Pick Your Crunchy Veggies 🌽</span>
                <div className="grid grid-cols-3 gap-2">
                  {["Corn", "Carrot", "None"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVeggie(v)}
                      className={`p-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                        selectedVeggie === v 
                          ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-xs' 
                          : 'bg-[#FAFAF8] text-[#4B5563] border-[#E8E8E8]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drink Selector */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                <span className="font-bold text-[#1C1C1E] block">3. Pick Your Healthy Drink 🍊</span>
                <div className="grid grid-cols-3 gap-2">
                  {["Fresh Orange Juice", "Milkshake", "Water"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDrink(d)}
                      className={`p-2 rounded-xl font-bold border text-[10px] transition-all cursor-pointer ${
                        selectedDrink === d 
                          ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-xs' 
                          : 'bg-[#FAFAF8] text-[#4B5563] border-[#E8E8E8]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(4)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Parent Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: PARENT DASHBOARD — 3 TABS (Nutrition, Meal History, Picky Eating) */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 text-xs"
            >
              <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-3.5 flex items-center justify-between shadow-soft">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FC8019]" />
                  <div>
                    <h3 className="font-extrabold text-sm text-[#1C1C1E]">Parent Guardian Review</h3>
                    <span className="text-[10px] text-[#6B7280]">Aarav's Complete Dashboard</span>
                  </div>
                </div>
                <span className="bg-[#22C55E] text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full">Approved ✓</span>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-1.5 text-[11px]">
                {[
                  { id: 'nutrition', label: '🥗 Nutrition' },
                  { id: 'history', label: '📅 Meal History' },
                  { id: 'picky', label: '📈 Picky Eating' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setParentTab(tab.id)}
                    className={`flex-1 py-1.5 rounded-full font-bold border transition-all cursor-pointer ${
                      parentTab === tab.id
                        ? 'bg-[#EC4899] text-white border-[#EC4899] shadow-xs'
                        : 'bg-white text-[#4B5563] border-[#E8E8E8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB: NUTRITION */}
              {parentTab === 'nutrition' && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                  <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                    <div className="bg-[#F5F5F3] p-2.5 rounded-xl">
                      <span className="text-[#6B7280] block">Calories</span>
                      <span className="font-extrabold text-[#1C1C1E] text-sm">620 kcal</span>
                    </div>
                    <div className="bg-[#F5F5F3] p-2.5 rounded-xl">
                      <span className="text-[#6B7280] block">Protein</span>
                      <span className="font-extrabold text-[#22C55E] text-sm">24g ({selectedProtein})</span>
                    </div>
                    <div className="bg-[#F5F5F3] p-2.5 rounded-xl">
                      <span className="text-[#6B7280] block">Sugar Content</span>
                      <span className="font-extrabold text-[#FC8019] text-sm">18g (Low ✓)</span>
                    </div>
                    <div className="bg-[#F5F5F3] p-2.5 rounded-xl">
                      <span className="text-[#6B7280] block">Veggies</span>
                      <span className="font-extrabold text-[#22C55E] text-sm">{selectedVeggie} ✓</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#F0F0F0] flex justify-between items-center">
                    <span className="text-[#6B7280]">Cost: <strong className="text-[#1C1C1E]">₹285</strong></span>
                    <span className="text-[#6B7280]">Delivery: <strong className="text-[#1C1C1E]">20 mins</strong></span>
                  </div>
                </div>
              )}

              {/* ⭐ ENTERPRISE SYSTEM 2: MEAL HISTORY TIMELINE */}
              {parentTab === 'history' && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                  <span className="font-extrabold text-[#1C1C1E] text-[11px] uppercase tracking-wide block border-b border-[#F0F0F0] pb-2">
                    This Week's Meal Log — AI Avoids Repetition
                  </span>
                  {[
                    { day: 'Monday', meal: 'Paneer Wrap & Juice', stars: 5, color: '#22C55E' },
                    { day: 'Tuesday', meal: 'Mini Cheese Pizza', stars: 4, color: '#FC8019' },
                    { day: 'Wednesday', meal: 'Healthy Veggie Bowl', stars: 5, color: '#22C55E' },
                    { day: 'Thursday', meal: 'Tomato Butter Pasta', stars: 4, color: '#FC8019' },
                    { day: 'Today (Fri)', meal: 'Mini Pizza + Juice + Fruit', stars: 0, color: '#EC4899', current: true },
                  ].map((entry) => (
                    <div key={entry.day} className={`flex items-center justify-between py-1.5 border-b border-[#F9F9F9] last:border-0 ${ entry.current ? 'opacity-60' : '' }`}>
                      <div>
                        <span className="font-bold text-[#1C1C1E] block">{entry.day}</span>
                        <span className="text-[10px] text-[#6B7280]">{entry.meal}</span>
                      </div>
                      <div className="text-right">
                        {entry.current
                          ? <span className="text-[10px] font-bold text-[#EC4899] bg-[#FDF2F8] px-2 py-0.5 rounded-full">Tonight ✨</span>
                          : <span className="text-sm tracking-tight" style={{ color: entry.color }}>
                              {'★'.repeat(entry.stars)}{'☆'.repeat(5 - entry.stars)}
                            </span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ⭐ ENTERPRISE SYSTEM 3: PICKY EATING PROGRESS TRACKER */}
              {parentTab === 'picky' && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                  <span className="font-extrabold text-[#1C1C1E] text-[11px] uppercase tracking-wide block border-b border-[#F0F0F0] pb-2">
                    🌱 Food Acceptance Journey — Aarav's Palate Growth
                  </span>
                  <div className="space-y-3">
                    {[
                      { week: 'Week 1', pct: 18, label: 'Vegetables', note: 'Only corn & potato' },
                      { week: 'Week 3', pct: 43, label: 'Vegetables', note: 'Added carrot & beans' },
                      { week: 'Week 5', pct: 61, label: 'Vegetables', note: 'Trying broccoli' },
                      { week: 'Week 8', pct: 76, label: 'Vegetables', note: '8 new foods accepted!' },
                    ].map((entry) => (
                      <div key={entry.week}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="font-bold text-[#1C1C1E]">{entry.week}</span>
                          <span className="text-[#6B7280]">{entry.note}</span>
                          <span className="font-extrabold text-[#22C55E]">{entry.pct}%</span>
                        </div>
                        <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#EC4899] to-[#22C55E] transition-all"
                            style={{ width: `${entry.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#6B7280] pt-1 border-t border-[#F0F0F0]">
                    Swiggy LifeOS gently introduces 1–2 new ingredients per week. Parents see measurable progress. Competitors don't have this.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(5)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(7)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Swap Options</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 7: SWAP ENGINE & "TRY INSTEAD" OPTIONS */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 text-xs"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Swap Engine 🔀</h1>
                <p className="text-xs text-[#6B7280]">If Aarav says "No", instant alternatives ready with zero search.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: "Grilled Chicken/Paneer Wrap", match: "94% Match", price: "₹240", desc: "Mild, easy to hold finger food" },
                  { name: "Mini Veggie Burger & Baked Fries", match: "91% Match", price: "₹210", desc: "Zero deep frying, 100% baked" },
                  { name: "Creamy Tomato Butter Pasta", match: "89% Match", price: "₹260", desc: "Whole wheat pasta with hidden veggies" }
                ].map((alt, idx) => (
                  <div key={idx} className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 flex items-center justify-between shadow-soft">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#1C1C1E]">{alt.name}</h4>
                        <span className="bg-[#22C55E]/10 text-[#22C55E] text-[9px] font-bold px-2 py-0.5 rounded-full">{alt.match}</span>
                      </div>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{alt.desc}</p>
                    </div>
                    <span className="font-extrabold text-sm text-[#EC4899]">{alt.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(6)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Fun Meter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 8: FUN METER & HAPPINESS SCORE */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 text-center space-y-4 text-xs"
            >
              <div className="bg-[#FDF2F8] border border-[#EC4899]/30 rounded-3xl p-5 shadow-soft space-y-2">
                <span className="text-3xl block">🥳</span>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Aarav's Today's Happiness Score</h2>
                <div className="text-2xl tracking-widest text-[#FC8019]">😊😊😊😊☆</div>
                <span className="text-2xl font-extrabold text-[#EC4899] block">95% Fun Rating</span>
              </div>

              {/* Food Adventure Level */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 text-left shadow-soft">
                <div className="flex justify-between font-bold text-[#1C1C1E]">
                  <span>🎨 Food Adventure Level</span>
                  <span className="text-[#22C55E]">5% New Cuisines</span>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Gently introducing 5% new healthy foods alongside Aarav's familiar favorites to reduce picky eating!
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(7)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(9)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Parent Safeguards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 9: PARENT GUARDIAN CONTROLS */}
          {step === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4 text-xs"
            >
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Parent Guardian Controls 🛡️</h1>
                <p className="text-xs text-[#6B7280]">Set strict dietary rules before recommendations are generated.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1C1C1E]">Strict Sugar Cap (&lt;20g)</span>
                  <button 
                    onClick={() => setParentRules({...parentRules, limitSugar: !parentRules.limitSugar})}
                    className={`w-12 h-6 rounded-full transition-all p-0.5 ${parentRules.limitSugar ? 'bg-[#22C55E]' : 'bg-[#E8E8E8]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${parentRules.limitSugar ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-[#F0F0F0] pt-2.5">
                  <span className="font-bold text-[#1C1C1E]">Block Soft Drinks & Fizzy Soda</span>
                  <button 
                    onClick={() => setParentRules({...parentRules, noSoftDrinks: !parentRules.noSoftDrinks})}
                    className={`w-12 h-6 rounded-full transition-all p-0.5 ${parentRules.noSoftDrinks ? 'bg-[#22C55E]' : 'bg-[#E8E8E8]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${parentRules.noSoftDrinks ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-[#F0F0F0] pt-2.5">
                  <span className="font-bold text-[#1C1C1E]">Allergy Lock: No Nuts / Peanuts</span>
                  <button 
                    onClick={() => setParentRules({...parentRules, noNuts: !parentRules.noNuts})}
                    className={`w-12 h-6 rounded-full transition-all p-0.5 ${parentRules.noNuts ? 'bg-[#22C55E]' : 'bg-[#E8E8E8]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${parentRules.noNuts ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(8)}
                  className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(10)}
                  className="w-2/3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Stage Happy Meal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 10: AI CELEBRATION & FAMILY HARMONY */}
          {step === 10 && (
            <motion.div
              key="step10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 space-y-4 text-xs text-center"
            >
              {/* Mission Complete Celebration */}
              <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-3xl p-5 shadow-soft space-y-2">
                <span className="text-4xl block animate-bounce">🎉</span>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Mission Complete!</h2>
                <div className="flex justify-center gap-2 text-[10px] font-extrabold pt-1">
                  <span className="bg-[#EC4899] text-white px-2.5 py-0.5 rounded-full">🐼 Kid Approved</span>
                  <span className="bg-[#22C55E] text-white px-2.5 py-0.5 rounded-full">🛡️ Parent Approved</span>
                </div>
                <p className="text-xs text-[#6B7280] pt-1">Delivered in 18 mins to Indiranagar · ₹285 Total</p>
              </div>

              {/* System 7: Learning Engine Feedback */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                <span className="font-bold text-[#1C1C1E] block">AI Learning Loop: How did Aarav like this meal?</span>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {["Loved ⭐⭐⭐⭐⭐", "Didn't Eat ❌", "Too Spicy 🌶️", "Too Sweet 🍭"].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setReflectionRating(rating)}
                      className={`p-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                        reflectionRating === rating 
                          ? 'bg-[#EC4899] text-white border-[#EC4899] shadow-xs' 
                          : 'bg-white text-[#6B7280] border-[#E8E8E8]'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                {reflectionRating && (
                  <span className="text-[10px] text-[#22C55E] font-bold block pt-1">
                    Feedback saved! Memory Engine updated for Aarav's next meal.
                  </span>
                )}
              </div>

              <button
                onClick={handleGoToCart}
                className="w-full bg-[#EC4899] hover:bg-[#DB2777] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Stage Happy Meal to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">
          Swiggy LifeOS Kid Engine · Built for Swiggy Builders Club
        </p>
      </div>
    </div>
  );
};
