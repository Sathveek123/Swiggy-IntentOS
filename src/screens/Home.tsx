import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mic, ArrowRight, Sparkles, Volume2, Utensils, ShoppingBag, MapPin,
  MessageSquare, Compass, Zap, Flame, Crown, Star, Heart, Smile, Activity, PartyPopper
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { SituationChip } from '../components/SituationChip';
import { checkBackendHealth } from '../services/backendClient';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

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
        setSituation("I have ₹300 rupees with me I need to eat best pancake near the store");
        setIsRecording(false);
      }, 1600);
    }
  };

  const handleDemoClick = () => {
    setSituation("I have ₹300 rupees with me I need to eat best pancake near the store");
    setChip("🥞 Pancake under ₹300");
    setTimeout(() => navigate('/thinking'), 200);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!situationText.trim()) return;
    navigate('/thinking');
  };

  const moduleGateways = [
    { label: 'Survive on a budget', icon: '🎒', route: '/student-survival', badge: 'Budget AI', color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Order for my kid', icon: '😄', route: '/kid-mood', badge: 'Family AI', color: '#EC4899', bg: '#FFF0F9' },
    { label: 'Discover something new', icon: '🍽️', route: '/taste-discovery', badge: 'Dopamine AI', color: '#10B981', bg: '#F0FDF4' },
    { label: 'Eat healthy', icon: '🥗', route: '/nutri-goal', badge: 'Health AI', color: '#0EA5E9', bg: '#F0F9FF' },
    { label: 'Mood comfort', icon: '💙', route: '/mood-companion', badge: 'Emotion AI', color: '#A855F7', bg: '#FDF4FF' },
    { label: 'Plan a celebration', icon: '🎂', route: '/celebration-os', badge: 'Event AI', color: '#F59E0B', bg: '#FFFBEB' },
  ];

  const serviceDishes = {
    all: [
      { name: "Pancake Maple Combo", rating: "4.8", time: "18m", price: "₹240", image: IMAGES.pizza, tag: "Top Rated 🥞", route: '/taste-discovery' },
      { name: "High Protein Bowl", rating: "4.9", time: "22m", price: "₹280", image: IMAGES.proteinBowl, tag: "Gym Special 💪", route: '/nutri-goal' },
      { name: "Set Dosa + Sambar", rating: "4.7", time: "15m", price: "₹95", image: IMAGES.dosa, tag: "Budget Fav 💸", route: '/student-survival' },
      { name: "Belgian Truffle Cake", rating: "4.9", time: "25m", price: "₹499", image: IMAGES.thali, tag: "Party Special 🎂", route: '/celebration-os' }
    ],
    food: [
      { name: "Pancake Maple Combo", rating: "4.8", time: "18m", price: "₹240", image: IMAGES.pizza, tag: "Hot Meals 🥞" },
      { name: "Hyderabadi Biryani", rating: "4.8", time: "25m", price: "₹240", image: IMAGES.biryani, tag: "Bestseller 🔥" },
      { name: "Set Dosa + Sambar", rating: "4.7", time: "15m", price: "₹95", image: IMAGES.dosa, tag: "Budget Fav 💸" }
    ],
    instamart: [
      { name: "Whipped Cream 200ml", rating: "4.9", time: "10m", price: "₹45", image: IMAGES.pepsi, tag: "10-Min Fast 🥛" },
      { name: "Greek Yogurt Blueberry", rating: "4.8", time: "10m", price: "₹60", image: IMAGES.pepsi, tag: "High Protein 🥣" },
      { name: "Cadbury Silk 130g", rating: "4.9", time: "8m", price: "₹95", image: IMAGES.chips, tag: "Sweet Comfort 🍫" }
    ],
    dineout: [
      { name: "The Waffle & Pancake Cafe", rating: "4.8", time: "Reserve", price: "₹300 avg", image: IMAGES.fineDining2, tag: "Cozy Cafe ☕" },
      { name: "FitBites Organic Studio", rating: "4.9", time: "Reserve", price: "₹450 avg", image: IMAGES.fineDining3, tag: "Dine-in Health 🥗" },
      { name: "Barbeque Nation Dining", rating: "4.7", time: "Reserve", price: "₹650 avg", image: IMAGES.fineDining1, tag: "Party Table 🍽️" }
    ]
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
              <span>▶ Try Intent Demo</span>
            </motion.button>

            <div className="w-9 h-9 rounded-full bg-[#FC8019] text-white flex items-center justify-center font-extrabold text-xs shadow-pill ring-2 ring-[#FC8019]/20 cursor-pointer">
              SV
            </div>
          </div>
        </div>

        {/* LifeOS Intent Gateway Hero */}
        <div className="mt-5 bg-gradient-to-r from-[#1C1C1E] via-[#2A2A2D] to-[#1C1C1E] rounded-3xl p-5 text-white shadow-md relative overflow-hidden border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#FC8019] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              <Crown className="w-3 h-3 fill-white" />
              <span>SWIGGY LIFEOS GATEWAY</span>
            </div>
            <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/20 px-2 py-0.5 rounded border border-[#22C55E]/30">
              FREE DELIVERY ACTIVE
            </span>
          </div>

          <h1 className="text-xl font-extrabold tracking-tight mt-2.5 leading-snug text-white">
            {getGreeting()}, Sathveek 👋
          </h1>
          <p className="text-xs text-[#E5E7EB] font-bold mt-1">
            What are you trying to do today?
          </p>
          <p className="text-[11px] text-[#9CA3AF] font-normal mt-0.5">
            LifeOS understands your life situation before selecting the service.
          </p>

          {/* Service Context Selector — each button triggers real AI intent plan */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setSituation("I want to order the best food delivery right now — surprise me with something great");
                navigate('/thinking');
              }}
              className="flex flex-col items-center gap-1 text-center group cursor-pointer transition-all p-1 rounded-xl hover:bg-[#FC8019]/20 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#FC8019] group-hover:bg-[#FC8019] group-hover:text-white transition-all">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">Food</span>
            </button>

            <button
              onClick={() => {
                setSituation("I need quick grocery delivery from Instamart — get my household essentials delivered in 10 minutes");
                navigate('/thinking');
              }}
              className="flex flex-col items-center gap-1 text-center group cursor-pointer transition-all p-1 rounded-xl hover:bg-[#22C55E]/20 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-all">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">Instamart</span>
            </button>

            <button
              onClick={() => {
                setSituation("Book me a great restaurant table for dining out tonight — 2 people, good ambience");
                navigate('/thinking');
              }}
              className="flex flex-col items-center gap-1 text-center group cursor-pointer transition-all p-1 rounded-xl hover:bg-[#6366F1]/20 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">Dineout</span>
            </button>

            <button
              onClick={() => navigate('/agent')}
              className="flex flex-col items-center gap-1 text-center group cursor-pointer p-1 rounded-xl hover:bg-[#EC4899]/20 active:scale-95 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#EC4899] group-hover:bg-[#EC4899] group-hover:text-white transition-all">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB]">AI Chat</span>
            </button>
          </div>
        </div>

        {/* 🚀 THE 6 LIFE MODULE GATEWAY CARDS (Primary Life Entry Points) */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#1C1C1E] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FC8019]" />
              Select Your Life Situation
            </span>
            <button onClick={() => navigate('/modules')} className="text-[11px] font-bold text-[#FC8019] hover:underline">
              View Hub ➔
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {moduleGateways.map(g => (
              <motion.button
                key={g.route}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(g.route)}
                className="bg-white border border-[#E8E8E8] rounded-2xl p-3 text-left shadow-soft hover:border-[#FC8019] transition-all cursor-pointer flex flex-col justify-between"
                style={{ backgroundColor: g.bg }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl">{g.icon}</span>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: g.color }}>
                    {g.badge}
                  </span>
                </div>
                <span className="font-extrabold text-xs text-[#1C1C1E] leading-tight block">{g.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dynamic Natural Language Input */}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="bg-white border border-[#E8E8E8] rounded-[22px] p-4 shadow-soft transition-all focus-within:border-[#FC8019] focus-within:ring-2 focus-within:ring-[#FC8019]/10">
            <textarea
              value={situationText}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe any real life situation... e.g. 'I have ₹300 rupees with me I need to eat best pancake near the store' or '₹8000 budget for 50 stray dogs'"
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

        {/* Featured Items based on Service Filter */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-extrabold text-[#1C1C1E] tracking-tight">
              Featured LifeOS Dishes 🔥
            </span>
            <span className="text-[11px] text-[#FC8019] font-bold">See All</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {serviceDishes.all.map((dish: { name: string; rating: string; time: string; price: string; image: string; tag: string; route?: string }, i: number) => (
              <div
                key={i}
                onClick={() => {
                  setSituation(`I need ${dish.name} under ${dish.price}`);
                  navigate('/thinking');
                }}
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
      </div>

      {/* Footer Status */}
      <div className="py-4 text-center flex items-center justify-center gap-2">
        <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-[#22C55E] shadow-sm' : 'bg-[#CBD5E1]'}`} />
        <p className="text-[11px] text-[#9CA3AF] font-medium tracking-wide">
          {backendOnline 
            ? 'MCP Agent Online · Swiggy Builders Club'
            : 'LifeOS Intent Gateway · Swiggy Builders Club'
          }
        </p>
      </div>
    </div>
  );
};
