import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, Clock, MapPin, ArrowLeft, ArrowRight, Utensils, Award } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';
import { IMAGES } from '../data/mockData';

const GOURMET_DISHES = [
  {
    name: "Truffle Mushroom Risotto",
    chef: "Chef Jean-Luc (Parisian Bistro)",
    rating: "4.9",
    price: "₹780",
    image: IMAGES.fineDining1,
    tag: "Michelin Style 🌟"
  },
  {
    name: "Pan-Seared Chilean Sea Bass",
    chef: "Chef Antonio (Coastal Fine Dining)",
    rating: "4.9",
    price: "₹1,250",
    image: IMAGES.fineDining2,
    tag: "Chef Signature 👨‍🍳"
  },
  {
    name: "Artisanal Dark Chocolate Soufflé",
    chef: "Pastry Master Claire",
    rating: "4.8",
    price: "₹450",
    image: IMAGES.lavaCake,
    tag: "Complimentary for Swiggy One 👑"
  }
];

export const Gourmet: React.FC = () => {
  const navigate = useNavigate();
  const { setChip } = useLifeOSStore();

  const handleBookGourmet = () => {
    setChip("🎉 Birthday Party");
    navigate('/thinking');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#141416] text-white flex flex-col justify-between p-5 border-x border-white/10 shadow-sm relative pb-28 overflow-hidden">
      <ParticleCanvas />

      <div className="relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#8B5CF6] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>Swiggy Gourmet Studio</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Curated Fine Dining ✨
          </h1>
          <p className="text-xs text-[#9CA3AF] font-normal mt-1 leading-relaxed">
            Hand-crafted tasting menus, Michelin-inspired chefs & sommelier pairing notes.
          </p>
        </div>

        {/* Gourmet Dishes List */}
        <div className="space-y-4">
          {GOURMET_DISHES.map((dish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-soft"
            >
              <div className="relative h-36">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-[#1C1C1E]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                  {dish.tag}
                </span>
                <span className="absolute bottom-2 right-2 bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                  {dish.rating} <Star className="w-2.5 h-2.5 fill-white" />
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-extrabold text-base text-white">{dish.name}</h3>
                <p className="text-xs text-[#9CA3AF] font-medium mt-0.5">{dish.chef}</p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10">
                  <span className="text-sm font-extrabold text-[#8B5CF6]">{dish.price}</span>
                  <button
                    onClick={handleBookGourmet}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span>Reserve Tasting</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-4">
        <button
          onClick={handleBookGourmet}
          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold text-sm h-12 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Coordinate Swiggy Gourmet Experience</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
