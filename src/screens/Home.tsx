import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, ArrowRight, Sparkles, Volume2, Utensils, ShoppingBag, MapPin, MessageSquare, Compass, Zap, Flame, Crown, Star } from 'lucide-react';
import { Logo } from '../components/Logo';
import { SituationChip } from '../components/SituationChip';
import { checkBackendHealth } from '../services/backendClient';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

const POPULAR_CHIPS = [
  "👥 Friends Coming Over",
  "📚 Exam Tomorrow",
  "🏋️ Post Gym Meal",
  "💸 Under ₹300"
];

const EVENT_CHIPS = [
  "🎉 Birthday Party",
  "👨‍👩‍👧‍👦 Family Dinner",
  "💻 Working Late",
  "🛒 Weekly Groceries"
];

const FEATURED_DISHES = [
  { name: "Hyderabadi Biryani", rating: "4.8", time: "25m", price: "₹240", image: IMAGES.biryani, tag: "Bestseller 🔥" },
  { name: "Crispy Masala Dosa", rating: "4.7", time: "18m", price: "₹110", image: IMAGES.dosa, tag: "Must Try 🌟" },
  { name: "High Protein Bowl", rating: "4.9", time: "22m", price: "₹290", image: IMAGES.proteinBowl, tag: "Gym Special 💪" },
  { name: "Makhani Butter Chicken", rating: "4.8", time: "30m", price: "₹380", image: IMAGES.butterChicken, tag: "Swiggy One 👑" }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { situationText, setSituation, selectedChip, setChip, isVoiceActive, toggleVoice } = useLifeOSStore();
  const [isRecording, setIsRecording] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    checkBackendHealth().then(setBackendOnline);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleChipClick = (chip: string) => {
    setChip(chip);
    navigate('/thinking');
  };

  const handleVoiceClick = () => {
    toggleVoice();
    setIsRecording(true);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSituation(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };
    } else {
      setTimeout(() => {
        setSituation("High protein post gym meal with cold coffee under ₹600");
        setIsRecording(false);
      }, 1600);
    }
  };

  const handleDemoClick = () => {
    setSituation("My friends are coming over in 30 mins and I have ₹800");
    setChip("👥 Friends Coming Over");
    setTimeout(() => navigate('/thinking'), 200);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!situationText.trim()) return;
    navigate('/thinking');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pt-2">
          <Logo size="sm" />
          
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleDemoClick}
              className="bg-[#1C1C1E] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-sm hover:bg-[#333] transition-all flex items-center gap-1 cursor-pointer border border-white/10"
            >
              <Sparkles className="w-3 h-3 text-[#FC8019]" />
              <span>▶ Demo</span>
            </motion.button>

            <div className="w-9 h-9 rounded-full bg-[#FC8019] text-white flex items-center justify-center font-extrabold text-xs shadow-pill ring-2 ring-[#FC8019]/20 cursor-pointer">
              SV
            </div>
          </div>
        </div>

        {/* Swiggy One VIP Membership Hero Banner */}
        <div className="mt-5 bg-gradient-to-r from-[#1C1C1E] via-[#2A2A2D] to-[#1C1C1E] rounded-2xl p-4 text-white shadow-md relative overflow-hidden border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#FC8019] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              <Crown className="w-3 h-3 fill-white" />
              <span>SWIGGY ONE VIP MEMBER</span>
            </div>
            <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/20 px-2 py-0.5 rounded border border-[#22C55E]/30">
              FREE DELIVERY ACTIVE
            </span>
          </div>

          <h1 className="text-xl font-extrabold tracking-tight mt-2.5 leading-snug text-white">
            {getGreeting()}, Sathveek 👋
          </h1>
          <p className="text-xs text-[#9CA3AF] font-normal mt-0.5">
            AI-Native Intent Orchestration across Food, Instamart & Dineout.
          </p>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/10">
            <button onClick={() => handleChipClick("👥 Friends Coming Over")} className="flex flex-col items-center gap-1 text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#FC8019] group-hover:bg-[#FC8019] group-hover:text-white transition-all">
                <Utensils className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">Food</span>
            </button>

            <button onClick={() => handleChipClick("🛒 Weekly Groceries")} className="flex flex-col items-center gap-1 text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-all">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">Instamart</span>
            </button>

            <button onClick={() => handleChipClick("👨‍👩‍👧‍👦 Family Dinner")} className="flex flex-col items-center gap-1 text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">Dineout</span>
            </button>

            <button onClick={() => navigate('/agent')} className="flex flex-col items-center gap-1 text-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#EC4899] group-hover:bg-[#EC4899] group-hover:text-white transition-all">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">AI Chat</span>
            </button>
          </div>
        </div>

        {/* Main Input Box */}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="bg-white border border-[#E8E8E8] rounded-[22px] p-4 shadow-soft transition-all focus-within:border-[#FC8019] focus-within:ring-2 focus-within:ring-[#FC8019]/10">
            <textarea
              value={situationText}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe your situation... e.g. 'Friends coming over in 30 mins, ₹800 budget' or 'High protein post workout meal'"
              rows={3}
              className="w-full bg-transparent text-[14px] font-normal text-[#1C1C1E] placeholder-[#9CA3AF] resize-none outline-none leading-relaxed"
            />

            <div className="pt-3 mt-1 border-t border-[#F0F0F0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={handleVoiceClick}
                  className={`
                    w-9 h-9 rounded-full border flex items-center justify-center transition-all relative cursor-pointer
                    ${isVoiceActive || isRecording
                      ? 'bg-[#FFF4EC] border-[#FC8019] text-[#FC8019]'
                      : 'bg-white border-[#E8E8E8] text-[#6B7280] hover:bg-[#F5F5F3]'
                    }
                  `}
                >
                  {isRecording ? (
                    <Volume2 className="w-4 h-4 animate-bounce text-[#FC8019]" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                  {(isVoiceActive || isRecording) && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FC8019] rounded-full animate-ping" />
                  )}
                </motion.button>

                {isRecording ? (
                  <span className="text-xs font-semibold text-[#FC8019] animate-pulse">
                    Listening to voice...
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-[#9CA3AF]">
                    Voice & Text Supported
                  </span>
                )}
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                disabled={!situationText.trim()}
                className="bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-xs py-2.5 px-5 rounded-full shadow-pill flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>Let's Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </form>

        {/* Featured Swiggy Dishes Image Carousel */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#1C1C1E] tracking-tight">
              Top Trending Swiggy Dishes 🔥
            </span>
            <span className="text-[11px] text-[#FC8019] font-bold">See All</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {FEATURED_DISHES.map((dish, i) => (
              <div
                key={i}
                onClick={() => handleChipClick(dish.name.includes('Biryani') ? "👥 Friends Coming Over" : "🏋️ Post Gym Meal")}
                className="w-36 bg-white border border-[#E8E8E8] rounded-xl p-2 shrink-0 shadow-2xs cursor-pointer hover:border-[#FC8019] transition-all group"
              >
                <div className="relative mb-2 overflow-hidden rounded-lg">
                  <img src={dish.image} alt={dish.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-1 left-1 bg-[#1C1C1E]/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {dish.tag}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-[#1C1C1E] truncate">{dish.name}</h4>
                <div className="flex items-center justify-between mt-1 text-[11px]">
                  <span className="font-bold text-[#FC8019]">{dish.price}</span>
                  <span className="bg-[#22C55E] text-white text-[9px] font-bold px-1 rounded flex items-center gap-0.5">
                    {dish.rating} <Star className="w-2 h-2 fill-white" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Presets */}
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold text-[#6B7280] uppercase tracking-wider">
                ⚡ Popular Intent Presets
              </span>
              <span className="text-[11px] text-[#FC8019] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Quick Action
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {POPULAR_CHIPS.map((chipLabel) => (
                <SituationChip
                  key={chipLabel}
                  label={chipLabel}
                  isSelected={selectedChip === chipLabel}
                  onClick={() => handleChipClick(chipLabel)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold text-[#6B7280] uppercase tracking-wider">
                🎉 Life Events & Occasions
              </span>
              <span className="text-[11px] text-[#6366F1] font-bold flex items-center gap-1">
                <Compass className="w-3 h-3" /> Occasion AI
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {EVENT_CHIPS.map((chipLabel) => (
                <SituationChip
                  key={chipLabel}
                  label={chipLabel}
                  isSelected={selectedChip === chipLabel}
                  onClick={() => handleChipClick(chipLabel)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Health Status */}
      <div className="py-4 text-center flex items-center justify-center gap-2">
        <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-[#22C55E] shadow-sm' : 'bg-[#CBD5E1]'}`} />
        <p className="text-[11px] text-[#9CA3AF] font-medium tracking-wide">
          {backendOnline 
            ? 'MCP Agent Online · Swiggy Builders Club'
            : 'Demo Mode · Swiggy Builders Club'
          }
        </p>
      </div>
    </div>
  );
};
