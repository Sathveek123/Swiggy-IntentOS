import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Heart, Sparkles, CheckCircle2,
  Brain, Gift, Clock, Star, Shield, Users, BookOpen, Zap
} from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

// ─────────────────────────────────────────
// MODULE 5: MOOD COMPANION (Emotion Commerce Engine)
// AI Personality: Emotional Intelligence AI
// Accent: Deep Rose #BE185D
// Route: /mood-companion
// ─────────────────────────────────────────

const ACCENT = '#BE185D';
const ACCENT_LIGHT = '#FFF1F2';
const ACCENT_MID = '#FB7185';

export const MoodCompanionFlow: React.FC = () => {
  const navigate = useNavigate();
  const { replaceCartWithPlan } = useLifeOSStore();

  const [step, setStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<string>('😫 Stressed');
  const [selectedSurpriseTo, setSelectedSurpriseTo] = useState<string | null>(null);
  const [reflectionRating, setReflectionRating] = useState<string | null>(null);
  const [bundleAdded, setBundleAdded] = useState<Record<string, boolean>>({
    food: true, dessert: true, chocolate: false, flowers: false
  });

  const moods = [
    { label: '😊 Happy', desc: 'Celebratory & uplifting', color: '#F59E0B' },
    { label: '😌 Relaxed', desc: 'Calm, light & soothing', color: '#10B981' },
    { label: '😔 Low', desc: 'Warm comfort, gentle care', color: '#6366F1' },
    { label: '😫 Stressed', desc: 'Soothing, familiar & easy', color: ACCENT },
    { label: '🎉 Celebrating', desc: 'Festive, special & indulgent', color: '#FC8019' },
    { label: '❤️ Romantic', desc: 'Intimate, curated & special', color: '#EF4444' },
    { label: '🤒 Under the Weather', desc: 'Healing soups & warm teas', color: '#22C55E' },
    { label: '😴 Exhausted', desc: 'Simple, quick & nourishing', color: '#8B5CF6' },
  ];

  const moodPlan = {
    '😫 Stressed': { meal: 'Chicken Soup + Garlic Bread + Chamomile Tea', match: 96, time: '18 mins', image: IMAGES.soup, why: ['You selected "Stressed"', 'Long workday detected (9 PM order)', 'Cool weather tonight — 22°C', 'Ordered comfort meals before (3×)', 'Budget ₹350 — respected ✓'], alt: [{ label: 'Need Energy', pct: 92 }, { label: 'Need Comfort', pct: 98 }, { label: 'Need Celebration', pct: 61 }, { label: 'Need Relaxation', pct: 95 }] },
    '😊 Happy': { meal: 'Butter Chicken + Garlic Naan + Gulab Jamun', match: 94, time: '22 mins', image: IMAGES.biryani, why: ['You selected "Happy"', 'Friday evening — celebration detected', 'Budget comfortable: ₹450', 'High-rated restaurant nearby (4.8★)', 'Your past favourite: Indian cuisine'], alt: [{ label: 'Need Celebration', pct: 96 }, { label: 'Need Indulgence', pct: 91 }, { label: 'Need Sharing', pct: 88 }, { label: 'Need Comfort', pct: 82 }] },
    '❤️ Romantic': { meal: 'Pasta Alfredo + Tiramisu + Red Grape Juice', match: 98, time: '25 mins', image: IMAGES.fineDining1, why: ['You selected "Romantic"', 'Anniversary this week — detected', 'Premium restaurant within range', 'Couple\'s meal detected from history', 'Candle-lit dining option added'], alt: [{ label: 'Fine Dining', pct: 98 }, { label: 'Surprise Bundle', pct: 95 }, { label: 'Comfort Dinner', pct: 79 }, { label: 'Celebration', pct: 91 }] },
    '🎉 Celebrating': { meal: 'Biryani Platter + Kulfi + Mango Lassi', match: 97, time: '28 mins', image: IMAGES.biryani, why: ['You selected "Celebrating"', 'Promotion detected from calendar', 'Party-size portion suggested', '4.9★ restaurant: Paradise Biryani', 'Festive bundle added from Instamart'], alt: [{ label: 'Party Feast', pct: 97 }, { label: 'Celebration Cake', pct: 94 }, { label: 'Dinner for Two', pct: 88 }, { label: 'Comfort Spread', pct: 79 }] },
  };

  const currentPlan = moodPlan[selectedMood as keyof typeof moodPlan] || moodPlan['😫 Stressed'];

  const surprisePeople = [
    { label: 'Mom', icon: '👩', note: 'Her fav: Masala Chai + Mathri' },
    { label: 'Dad', icon: '👨', note: 'His fav: Mutton Biryani' },
    { label: 'Partner', icon: '❤️', note: 'Anniversary in 3 days!' },
    { label: 'Best Friend', icon: '🤝', note: 'Their comfort: Pizza' },
    { label: 'Colleague', icon: '💼', note: 'Team treat suggestion' },
  ];

  const memoryTimeline = [
    { event: '🎂 Your Birthday', date: 'Mar 15', order: 'Black Forest Cake + Pizza', stars: 5 },
    { event: '🎉 Job Promotion', date: 'Feb 3', order: 'Dinner for Two · Truffles', stars: 5 },
    { event: '❤️ Anniversary', date: 'Jan 22', order: 'Pasta + Rose Cake + Wine', stars: 5 },
    { event: '😔 Difficult Day', date: 'Dec 18', order: 'Manchow Soup + Garlic Bread', stars: 4 },
    { event: '🤒 Sick Day', date: 'Nov 30', order: 'Moong Dal Khichdi + Ginger Tea', stars: 5 },
  ];

  const bundleItems = [
    { key: 'food', label: 'Chicken Soup + Garlic Bread', source: 'Swiggy Food', price: 280, icon: '🍲', required: true },
    { key: 'dessert', label: 'Warm Gulab Jamun (2 pcs)', source: 'Swiggy Food', price: 80, icon: '🍮', required: false },
    { key: 'chocolate', label: 'Cadbury Silk 130g', source: 'Instamart', price: 95, icon: '🍫', required: false },
    { key: 'flowers', label: 'Chamomile Tea Bags (20)', source: 'Instamart', price: 120, icon: '🌼', required: false },
  ];

  const handleGoToCart = () => {
    const selectedItems = bundleItems.filter(i => bundleAdded[i.key]);
    replaceCartWithPlan([
      { id: 'mc_1', name: 'Chicken Soup + Garlic Bread', qty: 1, price: 280, category: 'food', image: IMAGES.soup, tag: 'Mood Match 96% ❤️' },
      { id: 'mc_2', name: 'Warm Gulab Jamun', qty: 1, price: 80, category: 'food', image: IMAGES.lemonHoneyTea, tag: 'Comfort Dessert 🍮' },
      { id: 'mc_3', name: 'Cadbury Silk 130g', qty: 1, price: 95, category: 'instamart', image: IMAGES.lemonHoneyTea, tag: 'Emotional Add-on 🍫' },
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
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Mood Companion · Step {step}/10</span>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ─── SCREEN 1: EMOTION SELECTOR ─── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="rounded-3xl p-5 text-center space-y-1.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <span className="text-4xl block">💙</span>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Hi Sathveek 👋</h1>
                <p className="text-xs text-[#6B7280]">How are you feeling right now? LifeOS understands the occasion — not just your order.</p>

                {/* Responsible AI Guardrail — subtle but visible */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <Shield className="w-3 h-3 text-[#9CA3AF]" />
                  <span className="text-[9px] text-[#9CA3AF]">Your emotional state is never diagnosed. Only used to find the right food.</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {moods.map(m => (
                  <button key={m.label} onClick={() => setSelectedMood(m.label)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer shadow-2xs h-20 flex flex-col justify-between ${selectedMood === m.label ? 'ring-2' : 'bg-white border-[#E8E8E8]'}`}
                    style={{ borderColor: selectedMood === m.label ? m.color : '#E8E8E8', backgroundColor: selectedMood === m.label ? `${m.color}10` : '#FFFFFF' }}>
                    <div className="flex justify-between items-start">
                      <span className="text-2xl">{m.label.split(' ')[0]}</span>
                      {selectedMood === m.label && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: m.color }} />}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-[#1C1C1E] block">{m.label.split(' ').slice(1).join(' ')}</span>
                      <span className="text-[9px] text-[#6B7280]">{m.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(2)} className="w-full text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer transition-all" style={{ backgroundColor: ACCENT }}>
                <span>Understand My Moment</span><ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ─── SCREEN 2: EMOTION INTELLIGENCE ANALYSIS ─── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="py-4 space-y-5 text-center">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl animate-pulse shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `2px solid ${ACCENT}` }}>
                💙
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Emotional Intelligence AI</h2>
                <span className="text-xs font-bold" style={{ color: ACCENT }}>Reading: {selectedMood}</span>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 text-left space-y-2 shadow-soft text-xs max-w-xs mx-auto">
                <p className="font-extrabold text-[10px] uppercase text-[#9CA3AF] pb-1 border-b border-[#F5F5F3]">Emotional Signals Analyzed</p>
                {[
                  `Emotion: ${selectedMood} — registered`,
                  'Time: 9:15 PM — late evening context',
                  'Weather: 22°C, light drizzle outside',
                  'Recent orders: comfort meals (3 of 7 days)',
                  'Budget: ₹350 — moderate comfort range',
                  'Occasion: weekday — recovery mode',
                  'Social: solo evening — no group context',
                  'Nearby: warm kitchen open — 18 min ETA',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span className="text-[#1C1C1E]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <button onClick={() => setStep(1)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(3)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>See My Plan</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 3: EMOTIONAL JOURNEY — COMFORT PLAN ─── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Tonight's Comfort Plan 🌙</h1>
                <p className="text-xs text-[#6B7280]">Tailored for your <em>{selectedMood.split(' ').slice(1).join(' ')}</em> mood — not just your appetite.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-soft">
                <div className="relative h-40">
                  <img src={currentPlan.image} alt="Comfort Meal" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs" style={{ backgroundColor: ACCENT }}>
                    Mood Match: {currentPlan.match}%
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {currentPlan.time}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-extrabold text-sm text-[#1C1C1E]">{currentPlan.meal}</h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full text-white font-bold" style={{ backgroundColor: ACCENT }}>Emotion-curated</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F3] text-[#6B7280] font-bold">No calorie counting</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F5F3] text-[#6B7280] font-bold">✓ Budget safe</span>
                  </div>

                  {/* Delight Prediction Engine */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#F5F5F3]">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                      <span className="text-[10px] font-bold" style={{ color: ACCENT }}>Delight Prediction Engine</span>
                    </div>
                    <span className="font-extrabold text-sm" style={{ color: ACCENT }}>94% Delight Match</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(4)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Why This Plan?</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 4: AI REASONING ─── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🧠 Why This Plan?</h1>
                <p className="text-xs text-[#6B7280]">Emotion Understanding Engine — transparent AI reasoning.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                <p className="font-extrabold text-[11px] text-[#6B7280] uppercase border-b border-[#F5F5F3] pb-1.5">AI Reasoning Log</p>
                {currentPlan.why.map((reason, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-1 border-b border-[#F9F9F9] last:border-0">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0 mt-0.5" style={{ backgroundColor: ACCENT }}>{i + 1}</span>
                    <span className="text-[#1C1C1E]">{reason}</span>
                  </div>
                ))}
              </div>

              {/* Occasion Intelligence Engine */}
              <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Brain className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Occasion Intelligence Engine</span>
                </div>
                <p className="text-[#4B5563]">AI detected: <strong>Weekday stress recovery</strong>. No celebration detected. No occasion override. Comfort mode activated. Plan is gentle, warm, and non-stimulating.</p>
              </div>

              {/* Responsible AI Guardrail */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft flex gap-2.5">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#22C55E]" />
                <div>
                  <span className="font-bold text-xs text-[#1C1C1E] block">🛡️ Responsible AI Guardrail</span>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">LifeOS does not diagnose emotional states. This plan is based only on the mood you selected and contextual signals. You can always ignore or change it.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(5)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Explore Alternatives</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 5: EMOTIONAL ALTERNATIVES ─── */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Emotional Alternatives 🎭</h1>
                <p className="text-xs text-[#6B7280]">Other emotional needs AI detected from your context — what fits best?</p>
              </div>

              <div className="space-y-2.5">
                {currentPlan.alt.map((a, idx) => (
                  <div key={idx} className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-extrabold text-sm text-[#1C1C1E]">{a.label}</span>
                      <span className="font-extrabold text-sm" style={{ color: a.pct >= 95 ? ACCENT : a.pct >= 88 ? '#F59E0B' : '#6B7280' }}>
                        {a.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${a.pct}%`, backgroundColor: a.pct >= 95 ? ACCENT : '#F59E0B' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Comfort Recommendation Engine note */}
              <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Comfort Recommendation Engine</span>
                </div>
                <p className="text-[#4B5563]">"Need Comfort" scores highest at <strong>{Math.max(...currentPlan.alt.map(a => a.pct))}%</strong>. This is your primary emotional need right now. AI has matched your plan accordingly.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(4)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(6)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Build Companion Bundle</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 6: COMPANION BUNDLE (Experience Bundle Engine) ─── */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🎁 Companion Bundle</h1>
                <p className="text-xs text-[#6B7280]">Experience Bundle Engine — Food + Instamart into one emotional moment.</p>
              </div>

              <div className="space-y-2">
                {bundleItems.map(item => (
                  <div key={item.key} className={`bg-white border rounded-2xl p-3.5 shadow-soft flex items-center justify-between transition-all ${bundleAdded[item.key] ? 'border-[#BE185D]/40 bg-[#FFF1F2]' : 'border-[#E8E8E8]'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <span className="font-bold text-xs text-[#1C1C1E] block">{item.label}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] px-1.5 py-0.5 rounded text-white font-bold" style={{ backgroundColor: item.source === 'Swiggy Food' ? ACCENT : '#22C55E' }}>{item.source}</span>
                          <span className="text-[10px] text-[#6B7280]">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                    {item.required
                      ? <span className="text-[10px] font-bold text-[#9CA3AF]">Included</span>
                      : <button onClick={() => setBundleAdded(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                          className={`w-11 h-6 rounded-full transition-all p-0.5 cursor-pointer ${bundleAdded[item.key] ? '' : 'bg-[#E8E8E8]'}`}
                          style={{ backgroundColor: bundleAdded[item.key] ? ACCENT : '#E8E8E8' }}>
                          <div className={`w-5 h-5 rounded-full bg-white transition-all ${bundleAdded[item.key] ? 'translate-x-5' : ''}`} />
                        </button>
                    }
                  </div>
                ))}
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft flex justify-between items-center">
                <span className="font-bold text-[#1C1C1E] text-xs">Bundle Total</span>
                <span className="font-extrabold text-base" style={{ color: ACCENT }}>
                  ₹{bundleItems.filter(i => bundleAdded[i.key]).reduce((s, i) => s + i.price, 0)}
                </span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(5)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(7)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Surprise Someone?</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 7: SURPRISE PLANNING ENGINE ─── */}
          {step === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">💝 Surprise Someone</h1>
                <p className="text-xs text-[#6B7280]">Surprise Planning Engine — AI builds a thoughtful gift plan for the people who matter.</p>
              </div>

              <div className="space-y-2">
                {surprisePeople.map(p => (
                  <button key={p.label} onClick={() => setSelectedSurpriseTo(selectedSurpriseTo === p.label ? null : p.label)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 shadow-soft transition-all cursor-pointer ${selectedSurpriseTo === p.label ? 'ring-2' : 'bg-white border-[#E8E8E8]'}`}
                    style={{ borderColor: selectedSurpriseTo === p.label ? ACCENT : '#E8E8E8', backgroundColor: selectedSurpriseTo === p.label ? ACCENT_LIGHT : '#FFFFFF' }}>
                    <span className="text-2xl">{p.icon}</span>
                    <div className="flex-1">
                      <span className="font-extrabold text-sm text-[#1C1C1E] block">{p.label}</span>
                      <span className="text-[10px] text-[#6B7280]">{p.note}</span>
                    </div>
                    {selectedSurpriseTo === p.label && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />}
                  </button>
                ))}
              </div>

              {selectedSurpriseTo && (
                <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                  <p className="font-bold text-xs" style={{ color: ACCENT }}>AI Surprise Bundle for {selectedSurpriseTo}:</p>
                  <p className="text-[10px] text-[#4B5563] mt-1">Personalized comfort meal + chocolate + handwritten note option — all in one order, delivered with care. 🎁</p>
                </div>
              )}

              {!selectedSurpriseTo && (
                <p className="text-center text-[10px] text-[#9CA3AF]">Skip — just ordering for yourself? That's perfectly okay too.</p>
              )}

              <div className="flex gap-2">
                <button onClick={() => setStep(6)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(8)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Emotional Memory</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 8: EMOTIONAL MEMORY ENGINE ─── */}
          {step === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">📚 Emotional Memory</h1>
                <p className="text-xs text-[#6B7280]">LifeOS remembers every meaningful occasion — so you never forget either.</p>
              </div>

              {/* Upcoming occasions */}
              <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <p className="font-extrabold text-[11px] uppercase tracking-wide mb-2" style={{ color: ACCENT }}>Upcoming Occasions</p>
                <div className="space-y-1.5">
                  {[
                    { event: '❤️ Partner Anniversary', days: '3 days away', action: 'Plan dinner for two?' },
                    { event: '🎂 Mom\'s Birthday', days: '12 days away', action: 'Send a surprise cake?' },
                  ].map(o => (
                    <div key={o.event} className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-[#E8E8E8]">
                      <div>
                        <span className="font-bold text-xs text-[#1C1C1E] block">{o.event}</span>
                        <span className="text-[10px] text-[#6B7280]">{o.days}</span>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: ACCENT }}>{o.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Timeline */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft">
                <p className="font-extrabold text-[11px] uppercase tracking-wide text-[#6B7280] border-b border-[#F5F5F3] pb-1.5">Memory Timeline</p>
                {memoryTimeline.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-[#F9F9F9] last:border-0">
                    <div>
                      <span className="font-bold text-xs text-[#1C1C1E] block">{m.event}</span>
                      <span className="text-[10px] text-[#6B7280]">{m.date} · {m.order}</span>
                    </div>
                    <span className="text-sm tracking-tight text-[#FC8019]">
                      {'★'.repeat(m.stars)}{'☆'.repeat(5 - m.stars)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(7)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(9)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Mood Reflection</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 9: MOOD REFLECTION (Learning Loop) ─── */}
          {step === 9 && (
            <motion.div key="s9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">How Did It Feel? 💙</h1>
                <p className="text-xs text-[#6B7280]">AI learns gently — no diagnosis, no pressure. Just honest feedback.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: '⭐⭐⭐⭐⭐ Much Better', sub: 'The meal lifted my mood.' },
                  { label: '🙂 About the Same', sub: 'It was good, nothing changed.' },
                  { label: '😐 Not Really', sub: 'Didn\'t quite hit the spot.' },
                ].map(r => (
                  <button key={r.label} onClick={() => setReflectionRating(r.label)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer shadow-soft ${reflectionRating === r.label ? 'ring-2' : 'bg-white border-[#E8E8E8]'}`}
                    style={{ borderColor: reflectionRating === r.label ? ACCENT : '#E8E8E8', backgroundColor: reflectionRating === r.label ? ACCENT_LIGHT : '#FFFFFF' }}>
                    <span className="font-extrabold text-sm text-[#1C1C1E] block">{r.label}</span>
                    <span className="text-[10px] text-[#6B7280]">{r.sub}</span>
                  </button>
                ))}
              </div>

              {reflectionRating && (
                <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                  <p className="font-bold text-xs" style={{ color: ACCENT }}>Emotional Memory updated ✓</p>
                  <p className="text-[10px] text-[#4B5563] mt-1">Next time you feel {selectedMood.split(' ').slice(1).join(' ')}, LifeOS will refine the recommendation. AI learns from every moment.</p>
                </div>
              )}

              {/* Responsible AI note */}
              <div className="flex items-start gap-2 bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-soft">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#22C55E]" />
                <p className="text-[10px] text-[#6B7280]">Your reflection is used only to improve food recommendations. LifeOS never shares emotional data or uses it to diagnose your mental state.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(8)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(10)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Complete & Order</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 10: EMOTIONAL SUMMARY + ORDER ─── */}
          {step === 10 && (
            <motion.div key="s10" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="space-y-4 text-xs text-center">

              {/* Celebration */}
              <div className="rounded-3xl p-5 shadow-soft space-y-2" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <span className="text-4xl block animate-bounce">💙</span>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Mood Supported ✓</h2>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                  {[
                    { label: 'Mood', val: selectedMood },
                    { label: 'Comfort Delivered', val: '✓' },
                    { label: 'Delivery Time', val: currentPlan.time },
                    { label: 'Saved to Memory', val: '✓' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl p-2 border border-[#E8E8E8]">
                      <span className="text-[#6B7280] block">{s.label}</span>
                      <span className="font-extrabold text-[11px] block" style={{ color: ACCENT }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Connection Engine */}
              {selectedSurpriseTo && (
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft flex items-center gap-2.5 text-left">
                  <span className="text-2xl">💝</span>
                  <div>
                    <span className="font-bold text-xs text-[#1C1C1E] block">Surprise for {selectedSurpriseTo} added</span>
                    <span className="text-[10px] text-[#6B7280]">Social Connection Engine — sharing care through food.</span>
                  </div>
                </div>
              )}

              {/* Tonight's order */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 text-left shadow-soft">
                <span className="font-extrabold text-[11px] uppercase text-[#1C1C1E] block border-b border-[#F0F0F0] pb-1.5">Tonight's Comfort Bundle → Cart</span>
                {bundleItems.filter(i => bundleAdded[i.key]).map(item => (
                  <div key={item.key} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <div>
                        <span className="font-bold text-xs text-[#1C1C1E]">{item.label}</span>
                        <span className="text-[10px] text-[#6B7280] block">{item.source}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-sm text-[#1C1C1E]">₹{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t border-[#F0F0F0]">
                  <span className="font-bold text-[#6B7280]">Total</span>
                  <span className="font-extrabold" style={{ color: ACCENT }}>₹{bundleItems.filter(i => bundleAdded[i.key]).reduce((s, i) => s + i.price, 0)}</span>
                </div>
              </div>

              {/* Final Responsible AI note */}
              <div className="flex items-start gap-2 bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-soft text-left">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#22C55E]" />
                <p className="text-[10px] text-[#6B7280]">LifeOS does not track or store mental health data. Emotional context is used only within this session for food discovery.</p>
              </div>

              <button onClick={handleGoToCart} className="w-full text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                <span>Order Comfort Bundle</span><ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-6 text-center">
        <p className="text-[10px] text-[#9CA3AF]">Swiggy LifeOS Mood Companion · Emotional Intelligence AI · Builders Club</p>
      </div>
    </div>
  );
};
