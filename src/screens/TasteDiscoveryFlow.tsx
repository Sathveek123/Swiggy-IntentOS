import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Compass, BrainCircuit, TrendingUp,
  RefreshCw, Layers, ShieldCheck, CheckCircle2, BarChart2,
  Sliders, Star, Zap, Map, Activity, XCircle
} from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

// ─────────────────────────────────────────
// MODULE 3: TASTE DISCOVERY (Dopamine Engine)
// AI Personality: Behavioral AI
// Accent: Violet #7C3AED
// Route: /taste-discovery
// ─────────────────────────────────────────

export const TasteDiscoveryFlow: React.FC = () => {
  const navigate = useNavigate();
  const { replaceCartWithPlan } = useLifeOSStore();

  const [step, setStep] = useState<number>(1);

  // Screen 1: Food Personality
  const [spiceLevel, setSpiceLevel] = useState<string>('Medium');
  const [budget, setBudget] = useState<number>(300);
  const [dietPref, setDietPref] = useState<string>('Mixed');

  // Screen 3: Novelty mode selection
  const [discoveryMode, setDiscoveryMode] = useState<string>('Balanced');

  // Screen 6: Selected recommendation
  const [selectedRec, setSelectedRec] = useState<string>('Mexican Rice Bowl');

  // Screen 10: Reflection
  const [reflection, setReflection] = useState<string | null>(null);

  const handleGoToCart = () => {
    replaceCartWithPlan([
      { id: 'td_1', name: 'Mexican Rice Bowl', qty: 1, price: 280, category: 'food', image: IMAGES.vegBiryani, tag: 'Discovery Pick 🌮' },
      { id: 'td_2', name: 'Mango Lassi', qty: 1, price: 80, category: 'instamart', image: IMAGES.lemonHoneyTea, tag: 'Refreshing 🥭' },
    ]);
    navigate('/cart');
  };

  const noveltyRecs = [
    {
      name: 'Garlic Paneer Pizza',
      novelty: 8,
      badge: 'Safe ✓',
      badgeColor: '#22C55E',
      desc: 'Your pizza, elevated. Familiar base with a twist.',
      price: '₹249',
      image: IMAGES.pizza,
    },
    {
      name: 'Mexican Rice Bowl',
      novelty: 24,
      badge: 'Explore ✓',
      badgeColor: '#FC8019',
      desc: 'Bold flavours, easy comfort. Perfect next step.',
      price: '₹280',
      image: IMAGES.vegBiryani,
    },
    {
      name: 'Vietnamese Pho Soup',
      novelty: 71,
      badge: 'Adventure!',
      badgeColor: '#7C3AED',
      desc: 'Completely new territory. Light broth, big flavour.',
      price: '₹320',
      image: IMAGES.soup,
    },
  ];

  const cuisineMap = [
    { name: 'South Indian', stars: 5, bar: 95 },
    { name: 'Italian / Pizza', stars: 5, bar: 90 },
    { name: 'North Indian', stars: 4, bar: 78 },
    { name: 'Chinese', stars: 3, bar: 52 },
    { name: 'Mexican', stars: 2, bar: 24 },
    { name: 'Japanese', stars: 1, bar: 8 },
  ];

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

          <div className="flex items-center gap-1.5 bg-[#7C3AED] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-pill">
            <Compass className="w-3.5 h-3.5" />
            <span>Taste Discovery · Step {step}/8</span>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ─── SCREEN 1: FOOD PERSONALITY ENGINE ─── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="bg-[#F5F3FF] border border-[#7C3AED]/30 rounded-3xl p-5 shadow-soft text-center space-y-1">
                <span className="text-4xl block">🧬</span>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Your Food Personality</h1>
                <p className="text-xs text-[#6B7280]">The AI builds your taste DNA before making a single recommendation.</p>
              </div>

              {/* Routine Detection Alert */}
              <div className="bg-[#FFF4EC] border border-[#FC8019]/30 rounded-2xl p-4 shadow-soft space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#FC8019]" />
                  <span className="font-extrabold text-[#1C1C1E]">🔄 Routine Detected by AI</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { item: '🍕 Pizza', count: '11×', color: '#EF4444' },
                    { item: '🍔 Burger', count: '7×', color: '#F59E0B' },
                    { item: '🍛 Biryani', count: '9×', color: '#FC8019' },
                  ].map(r => (
                    <div key={r.item} className="bg-white border border-[#E8E8E8] p-2 rounded-xl">
                      <span className="block text-base">{r.item.split(' ')[0]}</span>
                      <span className="text-[10px] text-[#6B7280]">{r.item.split(' ')[1]}</span>
                      <span className="font-extrabold text-xs block" style={{ color: r.color }}>{r.count} this month</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#6B7280] text-[10px] text-center">Your meal pattern has become repetitive. Let's fix that.</p>
              </div>

              {/* Taste Preferences */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft text-xs">
                <span className="font-bold text-[#1C1C1E] block border-b border-[#F0F0F0] pb-1.5">Taste Preferences</span>

                {/* Spice Level */}
                <div>
                  <span className="text-[#6B7280] mb-1.5 block">Spice Tolerance</span>
                  <div className="flex gap-2">
                    {['Mild', 'Medium', 'Spicy', 'Very Spicy'].map(s => (
                      <button key={s} onClick={() => setSpiceLevel(s)}
                        className={`flex-1 py-1.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${spiceLevel === s ? 'bg-[#7C3AED] text-white border-[#7C3AED]' : 'bg-[#FAFAF8] text-[#4B5563] border-[#E8E8E8]'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diet Preference */}
                <div>
                  <span className="text-[#6B7280] mb-1.5 block">Diet</span>
                  <div className="flex gap-2">
                    {['Veg', 'Non-Veg', 'Mixed'].map(d => (
                      <button key={d} onClick={() => setDietPref(d)}
                        className={`flex-1 py-1.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${dietPref === d ? 'bg-[#7C3AED] text-white border-[#7C3AED]' : 'bg-[#FAFAF8] text-[#4B5563] border-[#E8E8E8]'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#6B7280]">Max Budget</span>
                    <span className="font-extrabold text-[#7C3AED]">₹{budget}</span>
                  </div>
                  <input type="range" min={100} max={600} value={budget} onChange={e => setBudget(Number(e.target.value))}
                    className="w-full accent-[#7C3AED] cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-0.5"><span>₹100</span><span>₹600</span></div>
                </div>
              </div>

              <button onClick={() => setStep(2)}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer transition-all">
                <span>Analyze My Taste DNA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ─── SCREEN 2: NOVELTY SCORE RECOMMENDATIONS ─── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Novelty Score Engine 🌈</h1>
                <p className="text-xs text-[#6B7280]">Every recommendation has a novelty score. You choose how far to go.</p>
              </div>

              <div className="space-y-3">
                {noveltyRecs.map(rec => (
                  <button key={rec.name} onClick={() => setSelectedRec(rec.name)}
                    className={`w-full bg-white border rounded-2xl overflow-hidden text-left transition-all cursor-pointer shadow-soft ${selectedRec === rec.name ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/20' : 'border-[#E8E8E8] hover:border-[#7C3AED]/30'}`}>
                    <div className="relative h-24">
                      <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs"
                        style={{ backgroundColor: rec.badgeColor }}>
                        {rec.badge}
                      </span>
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {rec.price}
                      </span>
                    </div>
                    <div className="p-3 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h3 className="font-extrabold text-sm text-[#1C1C1E]">{rec.name}</h3>
                        {selectedRec === rec.name && <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />}
                      </div>
                      <p className="text-[10px] text-[#6B7280]">{rec.desc}</p>
                      {/* Novelty progress bar */}
                      <div>
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span className="text-[#9CA3AF]">Novelty Score</span>
                          <span className="font-bold" style={{ color: rec.badgeColor }}>{rec.novelty}%</span>
                        </div>
                        <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${rec.novelty}%`, backgroundColor: rec.badgeColor }} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(3)} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer">
                  <span>Set Discovery Mode</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 3: DISCOVERY MODE + COMFORT ZONE ENGINE ─── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">AI Discovery Mode 🤖</h1>
                <p className="text-xs text-[#6B7280]">How much novelty can you handle? The AI adapts to your comfort zone.</p>
              </div>

              <div className="space-y-3">
                {[
                  { mode: 'Safe', icon: '🛡️', desc: 'Only familiar foods. Small tweaks within your favourites.', novelty: '0–15%', color: '#22C55E' },
                  { mode: 'Balanced', icon: '⚖️', desc: 'Mostly familiar, with 20% gentle exploration each week.', novelty: '15–40%', color: '#FC8019' },
                  { mode: 'Adventure', icon: '🚀', desc: 'Push boundaries. Cuisines you\'ve never tried before.', novelty: '40–100%', color: '#7C3AED' },
                ].map(m => (
                  <button key={m.mode} onClick={() => setDiscoveryMode(m.mode)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3.5 shadow-soft transition-all cursor-pointer ${discoveryMode === m.mode ? 'ring-2' : 'bg-white border-[#E8E8E8] hover:border-[#7C3AED]/30'}`}
                    style={{ borderColor: discoveryMode === m.mode ? m.color : '#E8E8E8', backgroundColor: discoveryMode === m.mode ? `${m.color}10` : '#FFFFFF' }}>
                    <span className="text-3xl">{m.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-sm text-[#1C1C1E]">{m.mode} Mode</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: m.color }}>Novelty {m.novelty}</span>
                      </div>
                      <p className="text-[10px] text-[#6B7280] mt-1">{m.desc}</p>
                    </div>
                    {discoveryMode === m.mode && <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: m.color }} />}
                  </button>
                ))}
              </div>

              {/* Comfort Zone Engine Note */}
              <div className="bg-[#F5F3FF] border border-[#7C3AED]/20 rounded-2xl p-3.5 text-xs shadow-soft">
                <div className="flex items-center gap-1.5 mb-1">
                  <BrainCircuit className="w-4 h-4 text-[#7C3AED]" />
                  <span className="font-bold text-[#7C3AED]">Comfort Zone Engine</span>
                </div>
                <p className="text-[#4B5563]">AI never jumps from Pizza to Sushi overnight. In <strong>{discoveryMode}</strong> mode, it introduces change at your own pace — 1 new ingredient or cuisine per week maximum.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(4)} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer">
                  <span>View Flavor Map</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 4: FLAVOR MAP + FOOD DIVERSITY SCORE ─── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🌍 Your Flavor Map</h1>
                <p className="text-xs text-[#6B7280]">See which cuisines you've explored — and which ones are waiting.</p>
              </div>

              {/* Food Diversity Score */}
              <div className="bg-[#F5F3FF] border border-[#7C3AED]/30 rounded-2xl p-4 shadow-soft">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-extrabold text-[#1C1C1E] text-sm">Food Diversity Score</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#7C3AED]">42%</span>
                    <span className="text-[10px] text-[#6B7280] block">Goal: 70%</span>
                  </div>
                </div>
                <div className="h-3 bg-[#E8E8E8] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" style={{ width: '42%' }} />
                </div>
                <p className="text-[10px] text-[#6B7280] mt-1.5">Explore 4 more cuisines to reach your diversity goal.</p>
              </div>

              {/* Cuisine Map */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft text-xs">
                {cuisineMap.map(c => (
                  <div key={c.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#1C1C1E]">{c.name}</span>
                      <span className="text-[#FC8019] text-sm">{'★'.repeat(c.stars)}{'☆'.repeat(5 - c.stars)}</span>
                    </div>
                    <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" style={{ width: `${c.bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(5)} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer">
                  <span>Smart Replacement Path</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 5: SMART REPLACEMENT ENGINE ─── */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">Smart Replacement Path 🎯</h1>
                <p className="text-xs text-[#6B7280]">AI expands your palate in tiny, comfortable steps. Not a sudden leap.</p>
              </div>

              {/* Step Journey */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-0 shadow-soft text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#9CA3AF] text-[11px] uppercase mb-3">
                  <span>Your Pizza Comfort Zone → Expanding Journey</span>
                </div>
                {[
                  { step: 'Now',    item: '🍕 Pizza (Plain)', note: 'Your current comfort zone', active: true },
                  { step: 'Week 2', item: '🧄 Garlic Herb Pizza', note: 'Familiar base, bolder topping' },
                  { step: 'Week 4', item: '🌶️ Stuffed Crust Pizza', note: 'New texture, same love' },
                  { step: 'Week 6', item: '🫓 Calzone', note: 'Italian, folded — still cozy' },
                  { step: 'Week 8', item: '🌯 Italian Wrap', note: 'Same flavours, new format' },
                  { step: 'Week 10', item: '🍝 Creamy Pasta', note: 'Full Italian explorer status 🎉' },
                ].map((row, idx) => (
                  <div key={idx} className={`flex items-start gap-3 py-2.5 border-b border-[#F5F5F3] last:border-0 ${row.active ? 'opacity-100' : 'opacity-70'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-extrabold shrink-0 ${row.active ? 'bg-[#7C3AED] text-white' : 'bg-[#F0F0F0] text-[#6B7280]'}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-[#1C1C1E] block">{row.item}</span>
                      <span className="text-[10px] text-[#6B7280]">{row.step} — {row.note}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(4)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(6)} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer">
                  <span>Taste Evolution</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 6: TASTE EVOLUTION TIMELINE ─── */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">📊 Taste Evolution Timeline</h1>
                <p className="text-xs text-[#6B7280]">How your palate grows over time with Swiggy LifeOS.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-4 shadow-soft text-xs">
                {[
                  { year: '2025 (Now)', label: 'Mostly Pizza & Biryani', pct: 42, note: 'Comfort zone. Repetitive.', color: '#9CA3AF' },
                  { year: '2026', label: 'Pizza + Pasta + Mexican', pct: 58, note: 'Explorer unlocked.', color: '#FC8019' },
                  { year: '2027', label: 'Italian + Asian + Indian', pct: 74, note: 'Balanced world palate.', color: '#7C3AED' },
                  { year: '2028', label: 'Balanced Global Explorer', pct: 91, note: '91% Diversity Score 🌍', color: '#22C55E' },
                ].map(ev => (
                  <div key={ev.year}>
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="font-extrabold text-[#1C1C1E]">{ev.year}</span>
                        <span className="ml-2 text-[10px] text-[#6B7280]">{ev.label}</span>
                      </div>
                      <span className="font-bold text-xs" style={{ color: ev.color }}>{ev.pct}%</span>
                    </div>
                    <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${ev.pct}%`, backgroundColor: ev.color }} />
                    </div>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{ev.note}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(5)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(7)} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer">
                  <span>Why NOT Rejected?</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 7: NEGATIVE EXPLAINABILITY ─── */}
          {step === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🚫 Why NOT These Plans?</h1>
                <p className="text-xs text-[#6B7280]">The Behavioral AI explains every rejected option — building your trust.</p>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3 shadow-soft text-xs">
                {[
                  { item: '🍕 Plain Pizza', reason: 'Ordered yesterday. Zero novelty value today.', code: 'Routine Block' },
                  { item: '🍔 Cheese Burger', reason: 'Already 4 times this week. Routine detected.', code: 'Frequency Cap' },
                  { item: '🍛 Biryani (again)', reason: 'Heavy meal. 9:30 PM — late night penalty applied.', code: 'Time & Load Filter' },
                  { item: '🌮 Tacos (direct jump)', reason: 'Novelty score 82%. Too big a leap for Balanced Mode.', code: 'Comfort Zone Guard' },
                ].map((r, idx) => (
                  <div key={idx} className="flex items-start justify-between py-2 border-b border-[#F5F5F3] last:border-0">
                    <div>
                      <span className="line-through text-[#9CA3AF] block">{r.item}</span>
                      <span className="text-[10px] text-[#4B5563] mt-0.5 block">{r.reason}</span>
                    </div>
                    <span className="bg-[#EF4444]/10 text-[#EF4444] text-[9px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0">{r.code}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(6)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(8)} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer">
                  <span>Stage Discovery Meal</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 8: DISCOVERY PLAN + CELEBRATION + REFLECTION ─── */}
          {step === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="space-y-4 text-xs">

              {/* Celebration */}
              <div className="bg-[#F5F3FF] border border-[#7C3AED]/30 rounded-3xl p-5 text-center shadow-soft space-y-1.5">
                <span className="text-4xl block animate-bounce">🎊</span>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Discovery Complete!</h2>
                <p className="text-[#6B7280] text-xs">Your first step out of the routine. <strong className="text-[#7C3AED]">Mexican Rice Bowl</strong> awaits.</p>
                <div className="flex justify-center gap-2 pt-1">
                  <span className="bg-[#7C3AED] text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold">🧬 Taste DNA Updated</span>
                  <span className="bg-[#22C55E] text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold">+3% Diversity Score</span>
                </div>
              </div>

              {/* Discovery Plan Summary */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft">
                <span className="font-extrabold text-[#1C1C1E] text-[11px] uppercase tracking-wide block border-b border-[#F0F0F0] pb-1.5">Tonight's Discovery Plan</span>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#1C1C1E]">Mexican Rice Bowl</h3>
                    <p className="text-[10px] text-[#6B7280]">Tortilla Grill · 24 mins · Novelty 24%</p>
                    <p className="text-[10px] text-[#7C3AED] font-bold mt-0.5">Balanced Mode · First time cuisine 🌮</p>
                  </div>
                  <span className="text-lg font-extrabold text-[#1C1C1E]">₹280</span>
                </div>
                <div className="flex justify-between items-start pt-1 border-t border-[#F5F5F3]">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#1C1C1E]">Mango Lassi</h3>
                    <p className="text-[10px] text-[#6B7280]">Instamart · 10 mins</p>
                  </div>
                  <span className="text-lg font-extrabold text-[#1C1C1E]">₹80</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-[#F5F5F3]">
                  <span className="text-[#6B7280]">Total</span>
                  <span className="font-extrabold text-[#7C3AED]">₹360</span>
                </div>
              </div>

              {/* Negative Explainability quick badge */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 space-y-1.5 shadow-soft">
                <span className="font-bold text-[#1C1C1E] text-[11px] uppercase block">❌ Rejected Tonight</span>
                <div className="flex gap-2 flex-wrap">
                  {['Pizza (ordered yesterday)', 'Biryani (9× this month)', 'Burger (frequency cap)'].map(r => (
                    <span key={r} className="bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]/30 text-[9px] font-bold px-2 py-0.5 rounded-full line-through">{r}</span>
                  ))}
                </div>
              </div>

              {/* AI Reflection Loop */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2 shadow-soft text-center">
                <span className="font-bold text-[#1C1C1E] block text-xs">Behavioral Learning Loop: How was the discovery?</span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {['Loved It! ⭐⭐⭐⭐⭐', 'Too Different 😬', 'Will Reorder 🔄', 'Not For Me ❌'].map(r => (
                    <button key={r} onClick={() => setReflection(r)}
                      className={`p-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${reflection === r ? 'bg-[#7C3AED] text-white border-[#7C3AED]' : 'bg-white text-[#6B7280] border-[#E8E8E8]'}`}>
                      {r}
                    </button>
                  ))}
                </div>
                {reflection && <p className="text-[10px] text-[#22C55E] font-bold pt-1">Behavioral model updated! Novelty score recalibrated for next week.</p>}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(7)} className="w-1/3 bg-white hover:bg-[#F5F5F3] text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={handleGoToCart} className="w-2/3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer">
                  <span>Order Discovery Meal</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-6 text-center">
        <p className="text-[10px] text-[#9CA3AF]">Swiggy LifeOS Dopamine Engine · Behavioral AI · Builders Club</p>
      </div>
    </div>
  );
};
