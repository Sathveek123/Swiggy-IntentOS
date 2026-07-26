import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, MapPin, Radio, Clock, Star,
  TrendingUp, Shield, Zap, Eye, Navigation, AlertTriangle
} from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

// ─────────────────────────────────────────
// MODULE 6: NEIGHBORHOOD PULSE
// AI Personality: Community Intelligence AI
// Accent: Indigo #4338CA
// Route: /neighborhood-pulse
// ─────────────────────────────────────────

const ACCENT = '#4338CA';
const ACCENT_LIGHT = '#EEF2FF';
const ACCENT_MID = '#818CF8';

// Animated live pulse dot
const PulseDot: React.FC<{ color?: string; size?: number }> = ({ color = ACCENT, size = 8 }) => (
  <span className="relative flex" style={{ width: size, height: size }}>
    <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60" style={{ backgroundColor: color }} />
    <span className="relative inline-flex rounded-full" style={{ width: size, height: size, backgroundColor: color }} />
  </span>
);

export const NeighborhoodPulseFlow: React.FC = () => {
  const navigate = useNavigate();
  const { replaceCartWithPlan } = useLifeOSStore();

  const [step, setStep] = useState<number>(1);
  const [activeZone, setActiveZone] = useState<string | null>('South');
  const [orderTiming, setOrderTiming] = useState<'now' | 'wait'>('now');
  const [discoveryAdded, setDiscoveryAdded] = useState(false);
  const [liveTime, setLiveTime] = useState<string>('');
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  // Live clock for realism
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  const pulseSignals = [
    { label: 'Rain', icon: '🌧️', active: true, intensity: 'Light drizzle' },
    { label: 'Office Rush', icon: '🏢', active: true, intensity: 'Winding down' },
    { label: 'Festival', icon: '🎉', active: false, intensity: 'None detected' },
    { label: 'Cricket Match', icon: '🏏', active: true, intensity: 'Match ends 7 PM' },
    { label: 'Weekend Crowd', icon: '🚶', active: false, intensity: 'Weekday' },
    { label: 'Power Stable', icon: '⚡', active: true, intensity: 'All zones normal' },
  ];

  const zones = [
    { id: 'North', label: 'North Zone', activity: 'Busy', actColor: '#EF4444', actBg: '#FEF2F2', eta: '32 min', demand: 87, desc: 'Cricket surge incoming' },
    { id: 'South', label: 'South Zone', activity: 'Calm', actColor: ACCENT, actBg: ACCENT_LIGHT, eta: '14 min', demand: 34, desc: 'Best ETA right now' },
    { id: 'East', label: 'East Zone', activity: 'Festival', actColor: '#F59E0B', actBg: '#FFFBEB', eta: '28 min', demand: 72, desc: 'Local event on' },
    { id: 'West', label: 'West Zone', activity: 'Fast', actColor: '#22C55E', actBg: '#F0FFF4', eta: '11 min', demand: 22, desc: 'Drivers available' },
  ];

  const communityTrends = [
    { rank: 1, name: 'Healthy Bowls', orders: 432, change: '+18%', icon: '🥗' },
    { rank: 2, name: 'Fresh Juice', orders: 289, change: '+24%', icon: '🥤' },
    { rank: 3, name: 'Chicken Meals', orders: 271, change: '+9%', icon: '🍗' },
    { rank: 4, name: 'South Indian', orders: 198, change: '+5%', icon: '🍛' },
    { rank: 5, name: 'Ice Cream', orders: 143, change: '+31%', icon: '🍦' },
    { rank: 6, name: 'Biryani', orders: 411, change: '-3%', icon: '🍚' },
  ];

  const hiddenGems = [
    { name: 'Amma\'s Kitchen', tag: 'Family Kitchen · Since 1998', rating: 4.9, eta: '12 min', wait: 'Low', match: 97, price: '₹120–₹180 avg', image: IMAGES.dosa, badge: '🏆 Neighborhood Fav' },
    { name: 'Sri Venkatesh Tiffins', tag: 'Authentic Home Cooking', rating: 4.8, eta: '18 min', wait: 'Low', match: 94, price: '₹80–₹140 avg', image: IMAGES.idli, badge: '⭐ Hidden Gem' },
    { name: 'Mama\'s Mutton Corner', tag: 'Local Legend · 23 Years', rating: 4.7, eta: '22 min', wait: 'Medium', match: 91, price: '₹200–₹280 avg', image: IMAGES.muttonBiryani, badge: '🔥 Trending Locally' },
  ];

  const weeklyInsights = [
    { label: 'Fastest Delivery Zone', value: 'South Zone', sub: '11 min avg this week', icon: '⚡', color: '#22C55E' },
    { label: 'Lowest Wait Area', value: 'West Zone', sub: 'Lowest congestion', icon: '🟢', color: ACCENT },
    { label: 'Most Popular Cuisine', value: 'South Indian', sub: '38% of all local orders', icon: '🍛', color: '#F59E0B' },
    { label: 'Peak Demand Time', value: '7:00–8:30 PM', sub: 'Avoid if possible', icon: '⚠️', color: '#EF4444' },
    { label: 'Best Value Window', value: '5:30–6:30 PM', sub: 'Pre-surge savings avg ₹60', icon: '💰', color: '#059669' },
    { label: 'New Restaurants', value: '3 opened this week', sub: 'Avg 20% launch offer', icon: '🆕', color: '#8B5CF6' },
  ];

  const handleGoToCart = () => {
    replaceCartWithPlan([
      { id: 'np_1', name: 'Set Dosa + Sambar (Amma\'s Kitchen)', qty: 1, price: 120, category: 'food', image: IMAGES.dosa, tag: 'Hidden Gem · 4.9★ 🏆' },
      { id: 'np_2', name: 'Filter Coffee 200ml', qty: 1, price: 45, category: 'food', image: IMAGES.coffee, tag: 'Local Fav · 12 min ⚡' },
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
            <Radio className="w-3.5 h-3.5" />
            <span>Neighborhood Pulse · Step {step}/10</span>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ─── SCREEN 1: NEIGHBORHOOD OVERVIEW ─── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">

              {/* Hero */}
              <div className="rounded-3xl p-5 shadow-soft space-y-3" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#6B7280]">Good Evening 👋</p>
                    <h1 className="text-2xl font-extrabold text-[#1C1C1E] leading-tight">Neighborhood<br />Pulse</h1>
                    <p className="text-[10px] text-[#6B7280] mt-1">Indiranagar, Bengaluru · {liveTime}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <PulseDot color="#22C55E" size={12} />
                    <span className="text-[10px] font-extrabold text-[#22C55E]">CALM</span>
                    <span className="text-[9px] text-[#6B7280]">Live</span>
                  </div>
                </div>

                {/* Activity meter */}
                <div>
                  <div className="flex justify-between text-[10px] text-[#6B7280] mb-1">
                    <span>Neighborhood Activity</span>
                    <span className="font-bold" style={{ color: ACCENT }}>34% · Low Demand</span>
                  </div>
                  <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '34%', backgroundColor: ACCENT }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#9CA3AF] mt-0.5">
                    <span>Calm</span><span>Moderate</span><span>Peak</span>
                  </div>
                </div>
              </div>

              {/* Live signals grid */}
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wide mb-2" style={{ color: ACCENT }}>📡 Live Community Signals</p>
                <div className="grid grid-cols-3 gap-2">
                  {pulseSignals.map(s => (
                    <div key={s.label} className={`bg-white border rounded-2xl p-2.5 text-center shadow-2xs ${s.active ? '' : 'opacity-40'}`}
                      style={{ borderColor: s.active ? `${ACCENT}30` : '#E8E8E8' }}>
                      <span className="text-xl block">{s.icon}</span>
                      <span className="text-[9px] font-bold text-[#1C1C1E] block">{s.label}</span>
                      <span className="text-[8px] text-[#6B7280]">{s.intensity}</span>
                      {s.active && <div className="mt-1 flex justify-center"><PulseDot color={ACCENT} size={5} /></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy guardrail */}
              <div className="flex items-start gap-2 bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-2xs">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#22C55E]" />
                <p className="text-[10px] text-[#6B7280]">All insights are anonymized community aggregates. No individual orders, addresses, or personal data are ever shown.</p>
              </div>

              <button onClick={() => setStep(2)} className="w-full text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                <span>Read Community Signals</span><ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ─── SCREEN 2: LIVE COMMUNITY SIGNALS ─── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="py-2 space-y-4 text-center">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl animate-pulse shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `2px solid ${ACCENT}` }}>
                📡
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Community Intelligence AI</h2>
                <span className="text-xs font-bold" style={{ color: ACCENT }}>Scanning Indiranagar · Live</span>
              </div>

              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 text-left space-y-2.5 shadow-soft text-xs">
                <p className="font-extrabold text-[10px] uppercase text-[#6B7280]">📡 Live Community Signals</p>
                {[
                  { icon: '🌧️', label: 'Weather', val: 'Light rain · 22°C · Drizzle since 5 PM' },
                  { icon: '🚗', label: 'Traffic', val: 'Moderate · Office exit peak declining' },
                  { icon: '🎉', label: 'Local Events', val: 'Cricket ends 7 PM · College Fest active' },
                  { icon: '🍽️', label: 'Restaurant Load', val: '67% restaurants at normal capacity' },
                  { icon: '🛵', label: 'Delivery Fleet', val: '142 drivers active · Good coverage' },
                  { icon: '📈', label: 'Current Demand', val: '34% of peak · Calm window now' },
                  { icon: '📊', label: 'Community Trends', val: 'Comfort food +22% vs yesterday' },
                  { icon: '⏱️', label: 'ETA Prediction', val: 'South Zone: 14 min · Best right now' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-1 border-b border-[#F5F5F3] last:border-0">
                    <span className="text-base shrink-0">{s.icon}</span>
                    <div>
                      <span className="font-extrabold text-[#1C1C1E] block">{s.label}</span>
                      <span className="text-[10px] text-[#6B7280]">{s.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ⭐ COMMUNITY EVENTS ENGINE */}
              <div className="rounded-2xl p-4 text-left space-y-2.5 shadow-soft text-xs" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}30` }}>
                <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: `${ACCENT}30` }}>
                  <span className="font-extrabold text-[10px] uppercase" style={{ color: ACCENT }}>🎉 Community Events Engine</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: ACCENT }}>4 Events Active</span>
                </div>
                <p className="text-[10px] text-[#6B7280]">LifeOS senses nearby community gatherings & environmental events to adjust delivery routes & timing before congestion hits.</p>

                <div className="space-y-2 pt-1">
                  {[
                    { event: '🎓 College Fest (IIT-B Campus)', impact: 'Crowd → Restaurant Surge', action: 'Order before 6:30 PM recommended', color: ACCENT },
                    { event: '🛕 Temple Festival (East Zone)', impact: 'Heavy Traffic → Delivery Delay', action: 'Suggested Pickup or West Zone delivery', color: '#F59E0B' },
                    { event: '🎬 Blockbuster Movie Release', impact: 'Multiplex Rush → Dessert Surge', action: 'Extra Instamart fleet deployed', color: '#8B5CF6' },
                    { event: '🌧️ Sudden Heavy Rain Drizzle', impact: 'Soup Trending (+48%)', action: 'Prioritizing fast delivery soup bowls', color: '#3B82F6' },
                  ].map((e, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-2.5 border border-[#E8E8E8] shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-[#1C1C1E]">{e.event}</span>
                        <span className="text-[8px] font-bold px-1.5 py-0.2 rounded text-white" style={{ backgroundColor: e.color }}>Sensed ✓</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-[#6B7280]">{e.impact}</span>
                        <span className="font-bold" style={{ color: e.color }}>{e.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <button onClick={() => setStep(1)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(3)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>View Pulse Map</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 3: PULSE MAP (Zone View) ─── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🗺️ Pulse Map</h1>
                <p className="text-xs text-[#6B7280]">Tap a zone to see real-time delivery intelligence.</p>
              </div>

              {/* Visual zone grid — styled like a simple map */}
              <div className="bg-white border border-[#E8E8E8] rounded-3xl overflow-hidden shadow-soft">
                {/* North */}
                <button onClick={() => setActiveZone('North')}
                  className={`w-full p-3 border-b border-[#F0F0F0] flex items-center justify-between transition-all cursor-pointer ${activeZone === 'North' ? '' : ''}`}
                  style={{ backgroundColor: activeZone === 'North' ? '#FEF2F2' : '#FAFAF8' }}>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#EF4444]" />
                    <div className="text-left">
                      <span className="font-extrabold text-xs text-[#1C1C1E] block">↑ North Zone</span>
                      <span className="text-[10px] text-[#EF4444]">Cricket surge · ETA 32 min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PulseDot color="#EF4444" size={7} />
                    <span className="text-[10px] font-extrabold text-[#EF4444]">BUSY</span>
                  </div>
                </button>

                {/* Middle row: West + Center + East */}
                <div className="grid grid-cols-3 border-b border-[#F0F0F0]">
                  {[
                    { id: 'West', label: '← West', sub: 'Fast · 11 min', color: '#22C55E', status: 'FAST', bg: '#F0FFF4' },
                    { id: 'Center', label: '📍 You', sub: 'Indiranagar', color: ACCENT, status: 'HERE', bg: ACCENT_LIGHT },
                    { id: 'East', label: 'East →', sub: 'Festival · 28 min', color: '#F59E0B', status: 'EVENT', bg: '#FFFBEB' },
                  ].map(z => (
                    <button key={z.id} onClick={() => z.id !== 'Center' && setActiveZone(z.id)}
                      className="p-3 flex flex-col items-center justify-center gap-1 border-x border-[#F0F0F0] first:border-l-0 last:border-r-0 cursor-pointer transition-all"
                      style={{ backgroundColor: activeZone === z.id ? z.bg : '#FAFAF8' }}>
                      <span className="text-[10px] font-bold text-[#1C1C1E]">{z.label}</span>
                      <span className="text-[9px] text-[#6B7280]">{z.sub}</span>
                      <PulseDot color={z.color} size={6} />
                      <span className="text-[8px] font-extrabold" style={{ color: z.color }}>{z.status}</span>
                    </button>
                  ))}
                </div>

                {/* South */}
                <button onClick={() => setActiveZone('South')}
                  className="w-full p-3 flex items-center justify-between transition-all cursor-pointer"
                  style={{ backgroundColor: activeZone === 'South' ? ACCENT_LIGHT : '#FAFAF8' }}>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 rotate-180" style={{ color: ACCENT }} />
                    <div className="text-left">
                      <span className="font-extrabold text-xs text-[#1C1C1E] block">↓ South Zone</span>
                      <span className="text-[10px]" style={{ color: ACCENT }}>Calm · ETA 14 min · Best now</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PulseDot color={ACCENT} size={7} />
                    <span className="text-[10px] font-extrabold" style={{ color: ACCENT }}>CALM ✓</span>
                  </div>
                </button>
              </div>

              {/* Zone detail */}
              {activeZone && (() => {
                const zone = zones.find(z => z.id === activeZone);
                if (!zone) return null;
                return (
                  <div className="rounded-2xl p-3.5 text-xs shadow-soft" style={{ backgroundColor: zone.actBg, border: `1px solid ${zone.actColor}20` }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold" style={{ color: zone.actColor }}>{zone.label} · {zone.activity}</span>
                      <span className="font-bold text-[#1C1C1E]">ETA: {zone.eta}</span>
                    </div>
                    <p className="text-[#4B5563]">{zone.desc} · Demand level: <strong>{zone.demand}%</strong></p>
                    <div className="h-1.5 bg-white/60 rounded-full overflow-hidden mt-2">
                      <div className="h-full rounded-full" style={{ width: `${zone.demand}%`, backgroundColor: zone.actColor }} />
                    </div>
                  </div>
                );
              })()}

              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(4)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Smart Timing</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 4: SMART TIMING ENGINE ─── */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">⏱️ Smart Timing Engine</h1>
                <p className="text-xs text-[#6B7280]">AI optimizes when you order — not just what you order.</p>
              </div>

              {/* Timing options */}
              <div className="space-y-2.5">
                {[
                  { id: 'now', label: 'Order Now', eta: '14 min', saving: null, badge: '✓ Recommended', highlight: true, sub: 'Low demand window. South Zone drivers available. Pre-surge advantage.' },
                  { id: 'wait', label: 'Wait 25 minutes', eta: '31 min', saving: '₹70 savings (estimated)', badge: 'Save money', highlight: false, sub: 'Pre-ordering in calm window may unlock lower surge pricing.' },
                ].map(t => (
                  <button key={t.id} onClick={() => setOrderTiming(t.id as 'now' | 'wait')}
                    className={`w-full p-4 rounded-2xl border text-left shadow-soft cursor-pointer transition-all ${orderTiming === t.id ? 'ring-2' : 'bg-white border-[#E8E8E8]'}`}
                    style={{ borderColor: orderTiming === t.id ? ACCENT : '#E8E8E8', backgroundColor: orderTiming === t.id ? ACCENT_LIGHT : '#FFFFFF' }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-[#1C1C1E]">{t.label}</span>
                      <span className="text-white font-bold text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: t.highlight ? '#22C55E' : ACCENT }}>{t.badge}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-extrabold text-xl" style={{ color: ACCENT }}>🛵 {t.eta}</span>
                      {t.saving && <span className="font-bold text-[#059669]">{t.saving}</span>}
                    </div>
                    <p className="text-[10px] text-[#6B7280]">{t.sub}</p>
                  </button>
                ))}
              </div>

              {/* Demand timeline */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft">
                <p className="font-extrabold text-[11px] uppercase text-[#6B7280] mb-3">Demand Forecast Next 90 Minutes</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[
                    { time: '6:15', h: 30, isNow: true },
                    { time: '6:30', h: 38 },
                    { time: '6:45', h: 68, surge: true },
                    { time: '7:00', h: 88, surge: true },
                    { time: '7:15', h: 95, surge: true },
                    { time: '7:30', h: 82 },
                    { time: '7:45', h: 60 },
                  ].map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full rounded-t" style={{
                        height: `${b.h}%`,
                        backgroundColor: b.isNow ? '#22C55E' : b.surge ? '#EF4444' : ACCENT_MID,
                        opacity: b.surge ? 0.8 : 1
                      }} />
                      <span className="text-[7px] text-[#9CA3AF]">{b.time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2 text-[9px]">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#22C55E]" /><span>Now (calm)</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EF4444]" /><span>Surge zone</span></div>
                </div>
                <div className="mt-2 p-2 rounded-xl text-center text-[10px] font-bold" style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                  ⚠️ Peak starts 6:45 PM. Order now to avoid 18 min delay.
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(5)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Hidden Gems</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 5: HIDDEN GEMS ENGINE ─── */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">⭐ Hidden Gems</h1>
                <p className="text-xs text-[#6B7280]">Quality local restaurants your neighborhood loves — that most people never find.</p>
              </div>

              <div className="space-y-3">
                {hiddenGems.map((gem, idx) => (
                  <div key={idx} className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-soft">
                    <div className="h-24 w-full relative">
                      <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-white font-bold text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: ACCENT }}>{gem.badge}</span>
                      <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        ★ {gem.rating}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-extrabold text-sm text-[#1C1C1E]">{gem.name}</h3>
                          <p className="text-[10px] text-[#6B7280]">{gem.tag}</p>
                        </div>
                        <span className="font-extrabold text-sm" style={{ color: ACCENT }}>{gem.match}% match</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                        <span className="font-bold text-[#22C55E]">🛵 {gem.eta}</span>
                        <span className="text-[#6B7280]">· Wait: {gem.wait}</span>
                        <span className="text-[#6B7280]">· {gem.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(4)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(6)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Community Trends</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 6: COMMUNITY TRENDS ─── */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">📊 Community Trends</h1>
                <p className="text-xs text-[#6B7280]">Real neighborhood ordering patterns tonight — not social media. Tap to explore.</p>
              </div>

              {/* Privacy note */}
              <div className="flex items-center gap-2 bg-white border border-[#E8E8E8] rounded-xl p-2.5 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                <p className="text-[9px] text-[#6B7280]">Aggregated community data only. No individual orders shown. Privacy-first design.</p>
              </div>

              <div className="space-y-2">
                {communityTrends.map(t => (
                  <button key={t.rank} onClick={() => setSelectedTrend(selectedTrend === t.name ? null : t.name)}
                    className={`w-full bg-white border rounded-2xl p-3 flex items-center gap-3 shadow-soft text-left cursor-pointer transition-all ${selectedTrend === t.name ? 'ring-2' : 'border-[#E8E8E8]'}`}
                    style={{ borderColor: selectedTrend === t.name ? ACCENT : '#E8E8E8', backgroundColor: selectedTrend === t.name ? ACCENT_LIGHT : '#FFFFFF' }}>
                    <span className="font-extrabold text-[11px] text-[#9CA3AF] w-5 text-center shrink-0">#{t.rank}</span>
                    <span className="text-2xl shrink-0">{t.icon}</span>
                    <div className="flex-1">
                      <span className="font-extrabold text-xs text-[#1C1C1E]">{t.name}</span>
                      <div className="h-1.5 bg-[#F0F0F0] rounded-full mt-1 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(t.orders / 450) * 100}%`, backgroundColor: ACCENT }} />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-xs text-[#1C1C1E] block">{t.orders}</span>
                      <span className={`text-[10px] font-bold ${t.change.startsWith('+') ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{t.change}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(5)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(7)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Demand Prediction</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 7: DEMAND PREDICTION ENGINE ─── */}
          {step === 7 && (
            <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">📈 Demand Prediction</h1>
                <p className="text-xs text-[#6B7280]">Delivery surge forecast for the next 90 minutes.</p>
              </div>

              {/* Surge alert */}
              <div className="rounded-2xl p-4 shadow-soft flex gap-3" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-sm text-[#EF4444] block">Delivery Surge Expected</span>
                  <span className="text-[10px] text-[#DC2626]">6:45 PM · +62 min estimated wait if ordered then</span>
                  <p className="text-[10px] text-[#4B5563] mt-1">AI recommends ordering before 6:30 PM to avoid surge. Current calm window: <strong>18 minutes</strong> remaining.</p>
                </div>
              </div>

              {/* Prediction stats */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Current ETA', val: '14 min', sub: 'South Zone', color: '#22C55E' },
                  { label: 'Post-Surge ETA', val: '32 min', sub: 'After 6:45 PM', color: '#EF4444' },
                  { label: 'Driver Availability', val: '142', sub: 'Active now', color: ACCENT },
                  { label: 'Best Order Window', val: '< 18 min', sub: 'Before surge', color: '#059669' },
                ].map(s => (
                  <div key={s.label} className="bg-white border border-[#E8E8E8] rounded-2xl p-3 shadow-soft text-center">
                    <span className="font-extrabold text-xl block" style={{ color: s.color }}>{s.val}</span>
                    <span className="font-bold text-[11px] text-[#1C1C1E] block">{s.label}</span>
                    <span className="text-[9px] text-[#6B7280]">{s.sub}</span>
                  </div>
                ))}
              </div>

              {/* Value Optimization Engine */}
              <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Value Optimization Engine</span>
                </div>
                <p className="text-[#4B5563]">Ordering now in the calm window saves approximately <strong>₹40–₹70</strong> in surge pricing and <strong>18 minutes</strong> of delivery time. 1,847 nearby users are ordering right now — the smart window is narrow.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(6)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(8)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>New Discoveries</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 8: LOCAL DISCOVERIES ─── */}
          {step === 8 && (
            <motion.div key="s8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🆕 Local Discoveries</h1>
                <p className="text-xs text-[#6B7280]">New restaurants in your neighborhood this week — with launch offers.</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'The Kerala Kitchen', opened: 'Opened today', offer: '20% launch offer', tag: 'Authentic Kerala · Koramangala', eta: '16 min', image: IMAGES.dosa, badge: '🆕 NEW TODAY' },
                  { name: 'Bombay Bistro Co.', opened: 'Opened 2 days ago', offer: '15% this week', tag: 'Street Food · HSR Layout', eta: '21 min', image: IMAGES.biryani, badge: '🆕 NEW' },
                  { name: 'The Protein Lab', opened: 'Opened 5 days ago', offer: '1st order free dessert', tag: 'Health Kitchen · Indiranagar', eta: '12 min', image: IMAGES.proteinBowl, badge: '🆕 NEW' },
                ].map((r, i) => (
                  <div key={i} className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-soft">
                    <div className="relative h-24">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-white font-bold text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: ACCENT }}>{r.badge}</span>
                      <span className="absolute bottom-2 right-2 bg-[#22C55E] text-white font-bold text-[9px] px-2 py-0.5 rounded">{r.offer}</span>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-sm text-[#1C1C1E] block">{r.name}</span>
                        <span className="text-[10px] text-[#6B7280]">{r.tag}</span>
                        <span className="text-[10px] font-bold text-[#6B7280] block">{r.opened} · 🛵 {r.eta}</span>
                      </div>
                      <button onClick={() => setDiscoveryAdded(!discoveryAdded)}
                        className="text-[10px] font-extrabold px-3 py-1.5 rounded-xl cursor-pointer transition-all text-white"
                        style={{ backgroundColor: discoveryAdded && i === 0 ? '#22C55E' : ACCENT }}>
                        {discoveryAdded && i === 0 ? 'Added ✓' : 'Try It'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(7)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(9)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Community Insights</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 9: COMMUNITY INSIGHTS (Neighborhood Memory) ─── */}
          {step === 9 && (
            <motion.div key="s9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-xs">
              <div>
                <h1 className="text-xl font-extrabold text-[#1C1C1E]">🏘️ Community Insights</h1>
                <p className="text-xs text-[#6B7280]">Neighborhood Memory Engine — a week of patterns in your local area.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {weeklyInsights.map(w => (
                  <div key={w.label} className="bg-white border border-[#E8E8E8] rounded-2xl p-3 shadow-soft">
                    <span className="text-xl block mb-1">{w.icon}</span>
                    <span className="font-extrabold text-sm block" style={{ color: w.color }}>{w.value}</span>
                    <span className="font-bold text-[10px] text-[#1C1C1E] block">{w.label}</span>
                    <span className="text-[9px] text-[#6B7280]">{w.sub}</span>
                  </div>
                ))}
              </div>

              {/* Community Trend Engine badge */}
              <div className="rounded-2xl p-3.5 shadow-soft" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="font-bold" style={{ color: ACCENT }}>Community Trend Engine</span>
                </div>
                <p className="text-[#4B5563]">These insights are generated from <strong>100% anonymized</strong>, aggregated neighborhood data. No individual user behavior is ever exposed. Powered by Swiggy's privacy-first infrastructure.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep(8)} className="w-1/3 bg-white text-[#1C1C1E] font-bold text-xs h-12 rounded-xl border border-[#E8E8E8]">Back</button>
                <button onClick={() => setStep(10)} className="w-2/3 text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-1 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                  <span>Order Smart</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── SCREEN 10: PULSE SUMMARY + ORDER ─── */}
          {step === 10 && (
            <motion.div key="s10" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="space-y-4 text-xs text-center">

              <div className="rounded-3xl p-5 shadow-soft space-y-2" style={{ backgroundColor: ACCENT_LIGHT, border: `1px solid ${ACCENT}20` }}>
                <span className="text-4xl block animate-bounce">📡</span>
                <h2 className="text-xl font-extrabold text-[#1C1C1E]">Pulse Decoded ✓</h2>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                  {[
                    { label: 'Order Window', val: 'Before surge ✓' },
                    { label: 'Time Saved', val: '18 minutes' },
                    { label: 'Zone', val: 'South · 14 min ETA' },
                    { label: 'New Discovery', val: '1 restaurant' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl p-2 border border-[#E8E8E8]">
                      <span className="text-[#6B7280] block">{s.label}</span>
                      <span className="font-extrabold text-xs block" style={{ color: ACCENT }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI recommendation */}
              <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 text-left shadow-soft space-y-2">
                <span className="font-extrabold text-[11px] uppercase text-[#1C1C1E] block border-b border-[#F0F0F0] pb-1.5">Tonight's Smart Order → Cart</span>
                {[
                  { name: 'Set Dosa + Sambar', source: "Amma's Kitchen · Hidden Gem", price: '₹120', match: '97%' },
                  { name: 'Filter Coffee 200ml', source: 'Local Fav · 4.9★', price: '₹45', match: '95%' },
                ].map(item => (
                  <div key={item.name} className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-xs text-[#1C1C1E] block">{item.name}</span>
                      <span className="text-[10px] text-[#6B7280]">{item.source} · <strong style={{ color: ACCENT }}>{item.match}</strong> neighborhood match</span>
                    </div>
                    <span className="font-extrabold text-sm text-[#1C1C1E]">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t border-[#F0F0F0]">
                  <span className="text-[#6B7280]">Total · Pre-surge</span>
                  <span className="font-extrabold" style={{ color: ACCENT }}>₹165</span>
                </div>
              </div>

              {/* Privacy final */}
              <div className="flex items-start gap-2 bg-white border border-[#E8E8E8] rounded-xl p-3 shadow-soft text-left">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#22C55E]" />
                <p className="text-[9px] text-[#6B7280]">Neighborhood Pulse uses only anonymized community-level data. No individual location, order, or personal detail is ever surfaced or stored by this module.</p>
              </div>

              <button onClick={handleGoToCart} className="w-full text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer" style={{ backgroundColor: ACCENT }}>
                <span>Order Before the Rush</span><ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="relative z-10 pt-6 text-center">
        <p className="text-[10px] text-[#9CA3AF]">Swiggy LifeOS Neighborhood Pulse · Community Intelligence AI · Builders Club</p>
      </div>
    </div>
  );
};
