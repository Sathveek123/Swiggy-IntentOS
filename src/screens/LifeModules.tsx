import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Smile, Activity, Heart, Compass, Users, PhoneCall, Clock, ShieldCheck, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';
import { ParticleCanvas } from '../components/ParticleCanvas';

export interface ModuleCard {
  key: string;
  title: string;
  subtitle: string;
  icon: any;
  persona: string;
  color: string;
  bgColor: string;
  image: string;
  sampleDish: string;
  time: string;
  savings: string;
}

export const LIFE_MODULES: ModuleCard[] = [
  {
    key: "survival_mode",
    title: "Student Survival Mode",
    subtitle: "Max calories per rupee optimization under ₹100 limit.",
    icon: Zap,
    persona: "College Students",
    color: "#FC8019",
    bgColor: "#FFF4EC",
    image: IMAGES.dosa,
    sampleDish: "Set Dosa + Parle-G",
    time: "15 mins",
    savings: "₹25 Saved"
  },
  {
    key: "kid_mood",
    title: "Kid Mood Menu",
    subtitle: "Visual emotion-based food discovery for kids & parents.",
    icon: Smile,
    persona: "Kids & Parents",
    color: "#22C55E",
    bgColor: "#F0FFF4",
    image: IMAGES.pizza,
    sampleDish: "Cheese Pizza + Lava Cake",
    time: "20 mins",
    savings: "₹80 Saved"
  },
  {
    key: "dopamine_engine",
    title: "Taste Discovery",
    subtitle: "15% cuisine variation breaking monotonous reordering.",
    icon: Activity,
    persona: "Working Professionals",
    color: "#7C3AED",
    bgColor: "#F3E8FF",
    image: IMAGES.biryani,
    sampleDish: "Hyderabadi Chicken Biryani",
    time: "25 mins",
    savings: "₹142 Saved"
  },
  {
    key: "health_goals",
    title: "NutriGoal Engine",
    subtitle: "45g Protein Muscle Recovery & Macro Goal Tracker.",
    icon: Heart,
    persona: "Fitness & Health",
    color: "#059669",
    bgColor: "#ECFDF5",
    image: IMAGES.proteinBowl,
    sampleDish: "Grilled Protein Bowl + Shake",
    time: "22 mins",
    savings: "₹110 Saved"
  },
  {
    key: "emotion_commerce",
    title: "Mood Companion",
    subtitle: "Treats food as emotional medicine & mood comfort.",
    icon: Sparkles,
    persona: "Emotional Comfort",
    color: "#BE185D",
    bgColor: "#FFF1F2",
    image: IMAGES.soup,
    sampleDish: "Manchow Soup + Ginger Tea",
    time: "18 mins",
    savings: "₹45 Saved"
  },
  {
    key: "celebration_os",
    title: "Celebration OS",
    subtitle: "Cross-service: Food + Instamart Cake + Dineout in 1 plan.",
    icon: Star,
    persona: "Events & Gifting",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    image: IMAGES.thali,
    sampleDish: "Belgian Cake + Royal Feast",
    time: "30 mins",
    savings: "₹250 Saved"
  }
];

export const LifeModules: React.FC = () => {
  const navigate = useNavigate();
  const { setLifeModule, setChip } = useLifeOSStore();

  const handleSelectModule = (mod: ModuleCard) => {
    setLifeModule(mod.key);
    setChip(mod.title);
    if (mod.key === "survival_mode") {
      navigate('/student-survival');
    } else if (mod.key === "kid_mood") {
      navigate('/kid-mood');
    } else if (mod.key === "dopamine_engine") {
      navigate('/taste-discovery');
    } else if (mod.key === "health_goals") {
      navigate('/nutri-goal');
    } else if (mod.key === "emotion_commerce") {
      navigate('/mood-companion');
    } else if (mod.key === "celebration_os") {
      navigate('/celebration-os');
    } else {
      navigate('/thinking');
    }
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* Top Header */}
        <div className="pt-2 mb-5">
          <div className="inline-flex items-center gap-1.5 bg-[#FC8019] text-white text-xs font-extrabold px-3.5 py-1 rounded-full mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>The 6 Core Life Modules</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
            Swiggy LifeOS Intent Hub 🧩
          </h1>
          <p className="text-xs text-[#6B7280] font-normal mt-1 leading-relaxed">
            Move Swiggy from search-based ordering to real-life intent orchestration.
          </p>
        </div>

        {/* Modules Grid with Rich Food Imagery */}
        <div className="space-y-4">
          {LIFE_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => handleSelectModule(mod)}
                className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-soft cursor-pointer hover:border-[#FC8019] transition-all group"
              >
                {/* Food Image Banner Header */}
                <div className="relative h-28 overflow-hidden">
                  <img src={mod.image} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <span
                    className="absolute top-2 left-2 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs"
                    style={{ backgroundColor: mod.bgColor, color: mod.color }}
                  >
                    {mod.persona}
                  </span>

                  <span className="absolute bottom-2 left-2 text-white font-extrabold text-xs">
                    {mod.sampleDish}
                  </span>

                  <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {mod.time}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: mod.bgColor, color: mod.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-[#1C1C1E] group-hover:text-[#FC8019] transition-colors">
                        {mod.title}
                      </h3>
                    </div>

                    <span className="text-[11px] font-extrabold text-[#22C55E]">
                      {mod.savings}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B7280] font-normal mt-2 leading-relaxed">
                    {mod.subtitle}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#F0F0F0] flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#FC8019] uppercase tracking-wider">
                      Single-Turn Intent Staged
                    </span>

                    <button className="bg-[#FC8019] text-white font-bold text-xs px-3 py-1 rounded-lg flex items-center gap-1 shadow-xs group-hover:bg-[#E5700F]">
                      <span>Launch Engine</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="py-4 text-center mt-4">
        <p className="text-[11px] text-[#9CA3AF] font-medium tracking-wide">
          Built for Swiggy Builders Club · July 2026
        </p>
      </div>
    </div>
  );
};
