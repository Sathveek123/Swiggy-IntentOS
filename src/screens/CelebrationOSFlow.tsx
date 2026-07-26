import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, PartyPopper, Users, Calendar, ShoppingBag, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

const ACCENT = '#F59E0B';
const ACCENT_LIGHT = '#FFFBEB';

export const CelebrationOSFlow: React.FC = () => {
  const navigate = useNavigate();
  const { setSituation, setLifeModule, replaceCartWithPlan } = useLifeOSStore();

  const [occasion, setOccasion] = useState<string>('🎂 Birthday');
  const [people, setPeople] = useState<number>(4);
  const [budget, setBudget] = useState<string>('2500');
  const [when, setWhen] = useState<string>('Today');

  const [includeFood, setIncludeFood] = useState<boolean>(true);
  const [includeCake, setIncludeCake] = useState<boolean>(true);
  const [includeDineout, setIncludeDineout] = useState<boolean>(true);

  const occasions = [
    '🎂 Birthday', '💕 Anniversary', '🎓 Graduation',
    '🏆 Achievement', '💼 Promotion', '🎊 Just Because'
  ];

  const calcBudget = parseInt(budget) || 2500;
  const foodShare = includeFood ? Math.round(calcBudget * 0.45) : 0;
  const cakeShare = includeCake ? Math.round(calcBudget * 0.20) : 0;
  const dineoutShare = includeDineout ? Math.round(calcBudget * 0.35) : 0;

  const handleActivate = () => {
    setLifeModule('celebration_os');
    setSituation(
      `Planning ${occasion} for ${people} people, budget ₹${budget}, when: ${when}. ` +
      `Services requested: ${includeFood ? 'Swiggy Food Delivery, ' : ''}${includeCake ? 'Instamart Birthday Cake, ' : ''}${includeDineout ? 'Dineout Table Booking' : ''}`
    );
    // Also stage a multi-service celebration cart
    replaceCartWithPlan([
      { id: 'cel_1', name: 'Royal Celebration Thali Platter', qty: 2, price: 540, category: 'food', image: IMAGES.thali, tag: 'Party Food 🍕' },
      { id: 'cel_2', name: 'Belgian Chocolate Truffle Cake 500g', qty: 1, price: 499, category: 'instamart', image: IMAGES.pizza, tag: 'Instamart Cake 🎂' },
    ]);
    navigate('/thinking');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FFFBEB] text-[#1C1C1E] flex flex-col p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <ParticleCanvas />

      <div className="relative z-10 space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => navigate('/modules')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center hover:bg-[#F5F5F3] transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#1C1C1E]" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#F59E0B] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-pill">
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Event AI · Celebration Mode</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-[#F59E0B]/30 rounded-3xl p-5 text-center space-y-2 shadow-soft">
          <span className="text-4xl block animate-bounce">🎂</span>
          <h1 className="text-2xl font-extrabold text-[#1C1C1E]">Plan the Perfect Celebration</h1>
          <p className="text-xs text-[#6B7280]">
            One plan orchestrating <strong>Food Delivery + Instamart Cake + Dineout Reservation</strong> simultaneously.
          </p>
        </div>

        {/* Occasion Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold uppercase text-[#92400E] block">Select Occasion</label>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {occasions.map(occ => (
              <button
                key={occ}
                onClick={() => setOccasion(occ)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap border transition-all cursor-pointer ${
                  occasion === occ
                    ? 'bg-[#F59E0B] text-white border-[#F59E0B] shadow-xs'
                    : 'bg-white text-[#1C1C1E] border-[#E8E8E8] hover:bg-[#FFFBEB]'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Details Form */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-3.5 shadow-soft text-xs">
          {/* People Stepper */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F59E0B]" />
              <span className="font-bold text-[#1C1C1E]">How many people?</span>
            </div>
            <div className="flex items-center border border-[#E8E8E8] rounded-xl bg-[#FAFAF8] overflow-hidden">
              <button
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="px-3 py-1.5 text-xs font-extrabold text-[#6B7280] hover:bg-white cursor-pointer"
              >
                -
              </button>
              <span className="px-3 font-extrabold text-sm text-[#1C1C1E]">{people}</span>
              <button
                onClick={() => setPeople(people + 1)}
                className="px-3 py-1.5 text-xs font-extrabold text-[#F59E0B] hover:bg-white cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Budget Input */}
          <div className="flex items-center justify-between border-t border-[#F5F5F3] pt-3">
            <span className="font-bold text-[#1C1C1E]">Total Celebration Budget</span>
            <div className="flex items-center gap-1 border border-[#E8E8E8] rounded-xl px-2.5 py-1 bg-[#FAFAF8] focus-within:border-[#F59E0B]">
              <span className="font-extrabold text-[#F59E0B]">₹</span>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-20 font-extrabold text-sm text-[#1C1C1E] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* When Selector */}
          <div className="flex items-center justify-between border-t border-[#F5F5F3] pt-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F59E0B]" />
              <span className="font-bold text-[#1C1C1E]">When is it?</span>
            </div>
            <div className="flex gap-1.5">
              {['Today', 'Tomorrow', 'This Weekend'].map(w => (
                <button
                  key={w}
                  onClick={() => setWhen(w)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    when === w
                      ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
                      : 'bg-white text-[#6B7280] border-[#E8E8E8]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* What to Include Toggles */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 space-y-2.5 shadow-soft text-xs">
          <span className="font-extrabold text-[10px] uppercase text-[#9CA3AF] block">Services to Coordinate (MCP Multi-Server)</span>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <span className="text-base">🍕</span>
              <div>
                <span className="font-bold text-[#1C1C1E] block">Food Delivery</span>
                <span className="text-[10px] text-[#6B7280]">Swiggy Food MCP</span>
              </div>
            </div>
            <button
              onClick={() => setIncludeFood(!includeFood)}
              className={`w-11 h-6 rounded-full transition-all p-0.5 cursor-pointer ${includeFood ? 'bg-[#F59E0B]' : 'bg-[#E8E8E8]'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-all ${includeFood ? 'translate-x-5' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#F5F5F3]">
            <div className="flex items-center gap-2">
              <span className="text-base">🎂</span>
              <div>
                <span className="font-bold text-[#1C1C1E] block">Cake & Party Supplies</span>
                <span className="text-[10px] text-[#6B7280]">Swiggy Instamart MCP</span>
              </div>
            </div>
            <button
              onClick={() => setIncludeCake(!includeCake)}
              className={`w-11 h-6 rounded-full transition-all p-0.5 cursor-pointer ${includeCake ? 'bg-[#F59E0B]' : 'bg-[#E8E8E8]'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-all ${includeCake ? 'translate-x-5' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#F5F5F3]">
            <div className="flex items-center gap-2">
              <span className="text-base">🍽️</span>
              <div>
                <span className="font-bold text-[#1C1C1E] block">Dineout Table Reservation</span>
                <span className="text-[10px] text-[#6B7280]">Swiggy Dineout MCP</span>
              </div>
            </div>
            <button
              onClick={() => setIncludeDineout(!includeDineout)}
              className={`w-11 h-6 rounded-full transition-all p-0.5 cursor-pointer ${includeDineout ? 'bg-[#F59E0B]' : 'bg-[#E8E8E8]'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-all ${includeDineout ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Live Estimated Split Banner */}
        <div className="bg-[#FEF3C7] border border-[#F59E0B]/40 rounded-2xl p-3.5 shadow-soft text-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#92400E] font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-[#92400E]" />
            <span>Estimated Budget Split</span>
          </div>
          <div className="flex justify-center gap-3 font-extrabold text-[11px] text-[#1C1C1E]">
            {includeFood && <span>Food: ~₹{foodShare}</span>}
            {includeCake && <span>Cake: ~₹{cakeShare}</span>}
            {includeDineout && <span>Dineout: ~₹{dineoutShare}</span>}
          </div>
        </div>

        {/* Activate CTA */}
        <button
          onClick={handleActivate}
          className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Plan My {occasion.split(' ').slice(1).join(' ')} →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative z-10 pt-6 text-center">
        <p className="text-[10px] text-[#9CA3AF]">Swiggy LifeOS Celebration OS · Multi-Service Event AI · Builders Club</p>
      </div>
    </div>
  );
};
