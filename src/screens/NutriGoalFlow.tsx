import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Heart, Activity, CheckCircle2,
  ShieldCheck, TrendingUp, Zap, RefreshCw, Award, BookOpen, ShoppingCart
} from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

// ─────────────────────────────────────────
// MODULE 4: NUTRIGOAL ENGINE
// AI Personality: Health Intelligence AI
// Accent: Emerald #059669
// Route: /nutri-goal
// ─────────────────────────────────────────

const ACCENT = '#059669';
const ACCENT_LIGHT = '#ECFDF5';
const ACCENT_BORDER = '#059669';

export const NutriGoalFlow: React.FC = () => {
  const navigate = useNavigate();
  const { replaceCartWithPlan } = useLifeOSStore();

  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('💪 Build Muscle');
  const [parentTab, setParentTab] = useState<string>('today');
  const [swapDone, setSwapDone] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  // Life Context Engine — selected active context card
  const [activeContext, setActiveContext] = useState<string>('gym');

  const goals = [
    { label: '💪 Build Muscle', desc: '140g+ protein daily', color: '#059669' },
    { label: '⚖️ Lose Weight', desc: 'Calorie deficit, high fiber', color: '#F59E0B' },
    { label: '❤️ Heart Healthy', desc: 'Low sodium, healthy fats', color: '#EC4899' },
    { label: '🧠 Brain Focus', desc: 'Omega-3, antioxidants', color: '#8B5CF6' },
    { label: '🏃 Active Lifestyle', desc: 'High energy, complex carbs', color: '#3B82F6' },
    { label: '🥗 Balanced Eating', desc: 'Macro balance, variety', color: '#FC8019' },
    { label: '🌱 Vegetarian Fitness', desc: 'Plant protein, iron-rich', color: '#22C55E' },
    { label: '🏥 Medical Diet', desc: 'Dietitian-guided plan', color: '#EF4444' },
  ];

  const todayMacros = [
    { label: 'Calories', value: '2,200 kcal', target: '2,200', pct: 72, color: '#059669' },
    { label: 'Protein', value: '140g', target: '140g', pct: 91, color: '#3B82F6' },
    { label: 'Carbs', value: '210g', target: '210g', pct: 64, color: '#F59E0B' },
    { label: 'Fats', value: '65g', target: '65g', pct: 55, color: '#EC4899' },
    { label: 'Fiber', value: '30g', target: '30g', pct: 74, color: '#22C55E' },
    { label: 'Water', value: '3L', target: '3L', pct: 47, color: '#60A5FA' },
  ];

  const mealPlan = [
    { slot: 'Breakfast · 8 AM', name: 'Oats + Boiled Eggs + Banana', source: 'Instamart', kcal: 480, protein: '28g', color: '#F59E0B', icon: '🥣' },
    { slot: 'Lunch · 1 PM', name: 'Grilled Chicken Protein Bowl', source: 'Swiggy Food', kcal: 620, protein: '45g', color: '#059669', icon: '🍗', image: IMAGES.proteinBowl },
    { slot: 'Snack · 5 PM', name: 'Greek Yogurt + Peanut Butter', source: 'Instamart', kcal: 280, protein: '22g', color: '#8B5CF6', icon: '🥜' },
    { slot: 'Dinner · 8 PM', name: 'Paneer Tikka + Brown Rice', source: 'Swiggy Food', kcal: 580, protein: '38g', color: '#EC4899', icon: '🍛', image: IMAGES.paneerTikka ?? IMAGES.proteinBowl },
    { slot: 'Hydration', name: 'Electrolyte Drink + 3L Water', source: 'Instamart', kcal: 45, protein: '—', color: '#60A5FA', icon: '💧' },
  ];

  const weeklyProgress = [
    { label: 'Overall Goal', pct: 82 },
    { label: 'Protein', pct: 91 },
    { label: 'Calories', pct: 97 },
    { label: 'Fiber', pct: 74 },
    { label: 'Water', pct: 61 },
    { label: 'Sugar Limit', pct: 88 },
  ];

  const groceryList = [
    { name: 'Greek Yogurt 400g', price: '₹89', icon: '🥛', goal: 'Protein +18g' },
    { name: 'Farm Eggs (6)', price: '₹72', icon: '🥚', goal: 'Protein +24g' },
    { name: 'Rolled Oats 500g', price: '₹65', icon: '🌾', goal: 'Fiber +8g' },
    { name: 'Bananas (6 pcs)', price: '₹45', icon: '🍌', goal: 'Energy +240kcal' },
    { name: 'Peanut Butter 350g', price: '₹145', icon: '🥜', goal: 'Protein +22g' },
    { name: 'Mixed Fresh Fruits', price: '₹120', icon: '🍎', goal: 'Vitamins A+C' },
  ];

  const badges = [
    { icon: '💪', label: 'Protein Champion', desc: '5 days >120g' },
    { icon: '💧', label: 'Hydration Hero', desc: '3L/day streak' },
    { icon: '🌿', label: 'Fiber Explorer', desc: '30g fiber target' },
    { icon: '⚖️', label: 'Balanced Week', desc: 'All macros hit' },
  ];

  const handleGoToCart = () => {
    replaceCartWithPlan([
      { id: 'ng_1', name: 'Grilled Chicken Protein Bowl', qty: 1, price: 349, category: 'food', image: IMAGES.proteinBowl, tag: 'Goal Match 97% 💪' },
      { id: 'ng_2', name: 'Greek Yogurt 400g', qty: 1, price: 89, category: 'instamart', image: IMAGES.proteinBowl, tag: 'Protein +18g 🥛' },
      { id: 'ng_3', name: 'Mixed Fresh Fruits', qty: 1, price: 120, category: 'instamart', image: IMAGES.bananas, tag: 'Vitamins A+C 🍎' },
    ]);
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] text-[#1C1C1E] flex flex-col p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button
            onClick={() => { if (step > 1) setStep(step - 1); else navigate('/modules'); }}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center hover:bg-[#F5F5F3] transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#1C1C1E]" />
          </button>

          <div className="flex items-center gap-1.5 text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-pill" style={{ backgroundColor: ACCENT }}>
            <Heart className="w-3.5 h-3.5" />
            <span>NutriGoal Engine · Step {step}/10</span>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ─── SCREEN 1: HEALTH GOAL SELECTOR ─── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="rounded-3xl p-5 text-center space-y-1 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, borderColor: ACCENT, border: '1px solid' }}>
                <span className="text-4xl block">🥗</span>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Hi Sathveek 👋</h1>
                <p className="text-xs text-[#6B7280]">What's your health goal? LifeOS builds your entire nutrition plan around it — no calorie counting required.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {goals.map(g => (
                  <button key={g.label} onClick={() => setSelectedGoal(g.label)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer shadow-2xs h-20 flex flex-col justify-between ${selectedGoal === g.label ? 'ring-2' : 'bg-white border-[#E8E8E8]'}`}
                    style={{ borderColor: selectedGoal === g.label ? g.color : '#E8E8E8', backgroundColor: selectedGoal === g.label ? `${g.color}10` : '#fff' }}>
                    <div className="flex justify-between">
                      <span className="text-xl">{g.label.split(' ')[0]}</span>
                      {selectedGoal === g.label && <CheckCircle2 className="w-4 h-4" style={{ color: g.color }} />}
                    </div>
                    <div>
                      <span className="font-extrabold text-[11px] text-[#1C1C1E] block">{g.label.split(' ').slice(1).join(' ')}</span>
                      <span className="text-[9px] text-[#6B7280]">{g.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(2)} className="w-full text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                <span>Build My Nutrition Plan</span><ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ─── SCREEN 2: AI HEALTH ASSESSMENT ─── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="py-4 space-y-5 text-center">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl animate-pulse shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `2px solid ${ACCENT}` }}>
                🧬
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Health Intelligence AI</h2>
                <span className="text-xs font-bold" style={{ color: ACCENT }}>Analyzing for: {selectedGoal}</span>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 text-left space-y-2 shadow-soft text-xs max-w-xs mx-auto">
                <p className="font-extrabold text-[10px] uppercase text-[#6B7280] border-b border-[#F5F5F3] pb-1.5">Health Signals</p>
                {[
                  'Goal: Build Muscle — confirmed',
                  'Order History: 47 meals analyzed',
                  'Avg Protein/day: 68g (below target)',
                  'Budget: ₹350 preferred',
                  'Activity Level: High (5 gym days/wk)',
                  'Delivery Area: Indiranagar verified',
                  'Nutrition Profile: 12 deficiencies mapped',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span className="text-[#1C1C1E]">{item}</span>
                  </div>
                ))}
              </div>

              {/* ⭐ LIFE CONTEXT ENGINE — reading the current moment */}
              <div className="rounded-2xl p-4 text-left space-y-2 shadow-soft text-xs max-w-xs mx-auto" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <p className="font-extrabold text-[10px] uppercase border-b pb-1.5" style={{ color: ACCENT, borderColor: `${ACCENT}30` }}>Life Context Signals</p>
                {[
                  'Calendar: Gym at 6 PM today',
                  'Weather: 28°C Clear — outdoor activity likely',
                  'Workload: 4 meetings today (busy day)',
                  'Sleep: 6.2h last night (below 8h target)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F59E0B]" />
                    <span className="text-[#1C1C1E]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <button onClick={() => setStep(1)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(3)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>View Goal Dashboard</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 3: TODAY'S MACRO GOAL DASHBOARD ─── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-extrabold text-[#1C1C1E]">Today's Target 📊</h1>
                  <p className="text-xs text-[#6B7280]">Precision plan for {selectedGoal}.</p>
                </div>
                <span className="text-white text-[10px] font-extrabold px-3 py-1 rounded-full" style={{ backgroundColor: ACCENT }}>Goal Match 94%</span>
              </div>

              {/* ⭐ LIFE CONTEXT ENGINE — the OS layer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide" style={{ color: ACCENT }}>🌐 Life Context Intelligence</span>
                  <span className="text-[9px] text-[#6B7280] bg-[#F5F5F3] px-2 py-0.5 rounded-full">Today · 8:15 PM</span>
                </div>

                <p className="text-[10px] text-[#6B7280]">LifeOS understands <em>this moment</em> — not just your goal. Tap a signal to see how it changes your plan.</p>

                <div className="space-y-2">
                  {[
                    {
                      id: 'gym',
                      signal: '🏋️ Gym at 6 PM',
                      chain: ['High Protein Lunch recommended', 'Order before 1 PM → arrives fresh', 'Protein shake add-on from Instamart', 'Post-workout: 45g protein window'],
                      color: ACCENT,
                      bg: ACCENT_LIGHT,
                    },
                    {
                      id: 'sleep',
                      signal: '😴 Poor Sleep (6.2h)',
                      chain: ['Avoid heavy lunch today', 'Hydration +600ml added to plan', 'Magnesium-rich foods prioritised', 'Light dinner before 7:30 PM'],
                      color: '#8B5CF6',
                      bg: '#F5F3FF',
                    },
                    {
                      id: 'busy',
                      signal: '📅 Very Busy Day (4 meetings)',
                      chain: ['One complete balanced bowl — no prep', 'Instamart snack ready in 10 mins', 'No complex multi-item order needed', 'AI handles decision fatigue'],
                      color: '#3B82F6',
                      bg: '#EFF6FF',
                    },
                    {
                      id: 'rain',
                      signal: '🌧️ Rain Forecast Today',
                      chain: ['Vitamin C rich meals added', 'Warm soup recommended for dinner', 'Ginger & turmeric add-ons suggested', 'Immunity-focused grocery bundle'],
                      color: '#F59E0B',
                      bg: '#FFFBEB',
                    },
                  ].map(ctx => (
                    <button
                      key={ctx.id}
                      onClick={() => setActiveContext(activeContext === ctx.id ? '' : ctx.id)}
                      className="w-full text-left rounded-2xl border transition-all cursor-pointer overflow-hidden shadow-soft"
                      style={{ borderColor: activeContext === ctx.id ? ctx.color : '#E8E8E8', backgroundColor: activeContext === ctx.id ? ctx.bg : '#FFFFFF' }}
                    >
                      <div className="p-3 flex items-center justify-between">
                        <span className="font-extrabold text-xs text-[#1C1C1E]">{ctx.signal}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: ctx.color }}>
                          {activeContext === ctx.id ? 'Active ✓' : 'Tap to see'}
                        </span>
                      </div>
                      {activeContext === ctx.id && (
                        <div className="px-3 pb-3 space-y-1.5 border-t" style={{ borderColor: `${ctx.color}20` }}>
                          {ctx.chain.map((step, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px]">
                              <span className="font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: ctx.color }}>{i + 1}</span>
                              <span className="text-[#4B5563]">{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Macro Grid */}
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-extrabold text-[#1C1C1E]">Today's Macro Targets</h2>
                <span className="text-white text-[10px] font-extrabold px-3 py-1 rounded-full" style={{ backgroundColor: ACCENT }}>Context-Adjusted ✓</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {todayMacros.map(m => (
                  <div key={m.label} className="bg-white border border-[#E8E8E8] rounded-2xl p-3 shadow-soft">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-[#6B7280]">{m.label}</span>
                      <span className="font-extrabold text-xs" style={{ color: m.color }}>{m.pct}%</span>
                    </div>
                    <span className="font-extrabold text-sm text-[#1C1C1E] block mb-1.5">{m.value}</span>
                    <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutrition Intelligence Engine badge */}
              <div className="rounded-2xl p-3.5 text-xs shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Nutrition Intelligence Engine</span>
                </div>
                <p className="text-[#4B5563]">Your current daily protein average is <strong>68g</strong> — 72g below the <strong>140g</strong> target for muscle gain. Today's plan closes 78% of that gap automatically.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(4)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>View AI Meal Plan</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 4: AI MEAL PLAN (Food + Instamart) ─── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🍽️ AI Meal Plan</h1>
                <p className="text-xs text-[#6B7280]">Every meal sourced from Food + Instamart. Zero manual planning.</p>
              </div>

              <div className="space-y-2.5">
                {mealPlan.map((meal, idx) => (
                  <div key={idx} className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-soft">
                    {meal.image && (
                      <div className="h-20 w-full">
                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {!meal.image && <span className="text-2xl">{meal.icon}</span>}
                        <div>
                          <span className="text-[10px] font-bold text-[#6B7280] block">{meal.slot}</span>
                          <span className="font-extrabold text-xs text-[#1C1C1E]">{meal.name}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] px-1.5 py-0.5 rounded text-white font-bold" style={{ backgroundColor: meal.color }}>{meal.source}</span>
                            <span className="text-[10px] text-[#6B7280]">{meal.kcal} kcal · P {meal.protein}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(5)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>View Nutrition Score</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 5: NUTRITION SCORE + MEAL SWAP ENGINE ─── */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              {/* Nutrition Score */}
              <div className="rounded-3xl p-5 text-center shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <h1 className="text-xl font-extrabold text-[#1C1C1E] mb-1">Today's Nutrition Score</h1>
                <span className="text-5xl font-extrabold block" style={{ color: ACCENT }}>92</span>
                <span className="text-xs text-[#6B7280]">out of 100</span>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                {[
                  { label: 'Protein', grade: 'Excellent', color: ACCENT },
                  { label: 'Sugar Intake', grade: 'Low ✓', color: '#22C55E' },
                  { label: 'Dietary Fiber', grade: 'Good', color: '#F59E0B' },
                  { label: 'Healthy Fats', grade: 'Good', color: '#3B82F6' },
                  { label: 'Processed Food', grade: 'Low ✓', color: '#22C55E' },
                  { label: 'Sodium Level', grade: 'Moderate', color: '#FC8019' },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-center py-0.5 border-b border-[#F5F5F3] last:border-0">
                    <span className="text-[#4B5563]">{r.label}</span>
                    <span className="font-bold" style={{ color: r.color }}>{r.grade}</span>
                  </div>
                ))}
              </div>

              {/* Smart Meal Swap Engine */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft space-y-2.5">
                <span className="font-extrabold text-[#1C1C1E] text-[11px] uppercase tracking-wide block">🔄 Smart Meal Replacement Engine</span>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 p-2.5 rounded-xl text-center border ${swapDone ? 'opacity-40 line-through' : 'border-[#EF4444]/30 bg-[#FEF2F2]'}`}>
                    <span className="text-base block">🍛</span>
                    <span className="font-bold text-xs text-[#EF4444]">Fried Rice</span>
                    <span className="text-[10px] text-[#6B7280] block">Goal Match 48%</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#6B7280] shrink-0" />
                  <div className="flex-1 p-2.5 rounded-xl text-center border border-[#059669]/30 bg-[#ECFDF5]">
                    <span className="text-base block">🥙</span>
                    <span className="font-bold text-xs" style={{ color: ACCENT }}>Brown Rice Bowl</span>
                    <span className="text-[10px] text-[#6B7280] block">Goal Match 94%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                  <div className="bg-[#ECFDF5] rounded-xl p-1.5 font-bold" style={{ color: ACCENT }}>Same Price</div>
                  <div className="bg-[#ECFDF5] rounded-xl p-1.5 font-bold" style={{ color: ACCENT }}>+18g Protein</div>
                  <div className="bg-[#ECFDF5] rounded-xl p-1.5 font-bold" style={{ color: ACCENT }}>60% Less Oil</div>
                </div>
                {!swapDone
                  ? <button onClick={() => setSwapDone(true)} className="w-full text-white font-bold text-xs h-9 rounded-xl cursor-pointer" style={{ backgroundColor: ACCENT }}>Apply Swap ✓</button>
                  : <p className="text-center text-[10px] font-bold" style={{ color: ACCENT }}>Swap applied! Meal plan updated. +4 points on Nutrition Score.</p>
                }
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(4)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(6)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Weekly Progress</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 6: PROGRESS DASHBOARD ─── */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">📈 Weekly Progress</h1>
                <p className="text-xs text-[#6B7280]">Nutrition Progress Engine — your 7-day journey at a glance.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3.5 shadow-soft text-xs">
                {weeklyProgress.map(w => (
                  <div key={w.label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-[#1C1C1E]">{w.label}</span>
                      <span className="font-extrabold" style={{ color: w.pct >= 85 ? ACCENT : '#FC8019' }}>{w.pct}%</span>
                    </div>
                    <div className="h-2.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${w.pct}%`, backgroundColor: w.pct >= 85 ? ACCENT : '#F59E0B' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutrition Prediction Engine */}
              <div className="rounded-2xl p-3.5 text-xs shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Nutrition Prediction Engine</span>
                </div>
                <p className="text-[#4B5563]">If you continue at this pace → <strong>Muscle Gain Goal</strong> reached in <strong>28 days</strong>. Your consistency score is <strong>87%</strong> this week. 🎯</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(5)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(7)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>AI Coach</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 7: AI COACH + HABIT FORMATION + HEALTH RISK ENGINE ─── */}
          {step === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🧠 AI Health Coach</h1>
                <p className="text-xs text-[#6B7280]">Habit Formation + Health Risk Engine working together.</p>
              </div>

              {/* Coach nudges */}
              <div className="space-y-2.5">
                {[
                  { emoji: '🎉', title: 'Protein Target: Achieved!', sub: 'Yesterday you hit 138g protein. 2g short of goal — nearly perfect.', color: ACCENT, bg: ACCENT_LIGHT },
                  { emoji: '💧', title: 'Drink 600ml More Water', sub: 'Current: 2.4L. Goal: 3L. Hydration is crucial for muscle recovery.', color: '#3B82F6', bg: '#EFF6FF' },
                  { emoji: '⚠️', title: 'High Sodium — 4 Days Running', sub: 'AI suggests reducing salty snacks today. Not a medical diagnosis — dietary guidance.', color: '#F59E0B', bg: '#FFFBEB' },
                  { emoji: '🌙', title: 'Late Night Snacking Detected', sub: '3 of 7 nights: food ordered after 11 PM. AI suggests a protein shake instead.', color: '#8B5CF6', bg: '#F5F3FF' },
                ].map(c => (
                  <div key={c.title} className="rounded-2xl p-3.5 flex gap-3 shadow-soft" style={{ backgroundColor: c.bg, border: `1px solid ${c.color}20` }}>
                    <span className="text-2xl shrink-0">{c.emoji}</span>
                    <div>
                      <span className="font-extrabold text-[#1C1C1E] block">{c.title}</span>
                      <span className="text-[10px] text-[#4B5563] mt-0.5 block">{c.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(6)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(8)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Grocery Companion</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 8: GROCERY SYNERGY ENGINE (Instamart) ─── */}
          {step === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🛒 Grocery Companion</h1>
                <p className="text-xs text-[#6B7280]">Grocery Synergy Engine — everything supports your {selectedGoal} goal.</p>
              </div>

              <div className="space-y-2">
                {groceryList.map(g => (
                  <div key={g.name} className="bg-white border border-[#E8E8E8] rounded-2xl p-3 flex items-center justify-between shadow-soft">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{g.icon}</span>
                      <div>
                        <span className="font-bold text-xs text-[#1C1C1E] block">{g.name}</span>
                        <span className="text-[10px] font-bold" style={{ color: ACCENT }}>{g.goal}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-[#1C1C1E]">{g.price}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-3.5 text-xs shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <ShoppingCart className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Instamart Bundle: ₹536 total</span>
                </div>
                <p className="text-[#4B5563]">Adding this bundle covers <strong>+84g protein</strong> across 3 days. Delivered in 10 mins to your door.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(7)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(9)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Earn Badges</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 9: HEALTHY CHOICE REWARD ENGINE ─── */}
          {step === 9 && (
            <motion.div key="s9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🎖️ Healthy Choice Rewards</h1>
                <p className="text-xs text-[#6B7280]">Earn badges for consistent healthy habits. Tap to claim.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {badges.map(b => (
                  <button key={b.label} onClick={() => setSelectedBadge(b.label)}
                    className={`bg-white border rounded-2xl p-4 text-center cursor-pointer shadow-soft transition-all ${selectedBadge === b.label ? 'ring-2' : 'border-[#E8E8E8]'}`}
                    style={{ borderColor: selectedBadge === b.label ? ACCENT : '#E8E8E8', backgroundColor: selectedBadge === b.label ? ACCENT_LIGHT : '#fff' }}>
                    <span className="text-3xl block mb-1">{b.icon}</span>
                    <span className="font-extrabold text-xs text-[#1C1C1E] block">{b.label}</span>
                    <span className="text-[10px] text-[#6B7280]">{b.desc}</span>
                    {selectedBadge === b.label && <span className="text-[10px] font-extrabold mt-1 block" style={{ color: ACCENT }}>Claimed! ✓</span>}
                  </button>
                ))}
              </div>

              {/* Wellness Partner Engine */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft space-y-1.5">
                <span className="font-extrabold text-[#1C1C1E] text-[11px] uppercase block">🤝 Wellness Partner Engine</span>
                <p className="text-[10px] text-[#6B7280]">Share your weekly progress with family, trainer, or friends. Coming in V2: Dietitian integration.</p>
                <div className="flex gap-2 pt-1">
                  {['Share with Family', 'Share with Trainer', 'Share Progress'].map(s => (
                    <button key={s} onClick={() => alert(`${s} — Wellness Partner Engine`)}
                      className="flex-1 py-1.5 rounded-full text-[9px] font-bold border border-[#E8E8E8] text-[#4B5563] hover:bg-[#F5F5F3] cursor-pointer">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(8)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(10)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Goal Celebration</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 10: GOAL CELEBRATION + ORDER ─── */}
          {step === 10 && (
            <motion.div key="s10" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="space-y-4 text-xs text-center">

              {/* Celebration */}
              <div className="rounded-3xl p-5 shadow-soft space-y-2" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <span className="text-4xl block animate-bounce">🏆</span>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Mission Complete!</h2>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                  {[
                    { label: 'Goal', val: 'Muscle Gain 💪' },
                    { label: 'Today\'s Nutrition', val: '94% ✓' },
                    { label: 'Healthy Choices', val: '5 Today' },
                    { label: 'Protein Goal', val: 'Achieved ✓' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl p-2 border border-[#E8E8E8]">
                      <span className="text-[#6B7280] block">{s.label}</span>
                      <span className="font-extrabold text-xs" style={{ color: ACCENT }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tonight's order summary */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 text-left shadow-soft">
                <span className="font-extrabold text-[11px] uppercase text-[#1C1C1E] block border-b border-[#F0F0F0] pb-1.5">Tonight's Plan → Cart</span>
                {[
                  { name: 'Grilled Chicken Protein Bowl', source: 'FitBites', price: '₹349', match: '97%' },
                  { name: 'Greek Yogurt 400g', source: 'Instamart', price: '₹89', match: '95%' },
                  { name: 'Mixed Fresh Fruits', source: 'Instamart', price: '₹120', match: '92%' },
                ].map(item => (
                  <div key={item.name} className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-xs text-[#1C1C1E] block">{item.name}</span>
                      <span className="text-[10px] text-[#6B7280]">{item.source} · Goal Match <strong style={{ color: ACCENT }}>{item.match}</strong></span>
                    </div>
                    <span className="font-extrabold text-sm text-[#1C1C1E]">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t border-[#F0F0F0]">
                  <span className="text-[#6B7280]">Total</span>
                  <span className="font-extrabold" style={{ color: ACCENT }}>₹558</span>
                </div>
              </div>

              <p className="text-[10px] text-[#6B7280] text-center">Keep going! Consistency score: <strong style={{ color: ACCENT }}>87%</strong> this week.</p>

              <button onClick={handleGoToCart} className="w-full text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                <span>Order Nutrition Plan</span><ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-6 text-center">
        <p className="text-[10px] text-[#9CA3AF]">Swiggy LifeOS NutriGoal Engine · Health Intelligence AI · Builders Club</p>
      </div>
    </div>
  );
};
