import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Sparkles, Heart, Plus, Minus, Trash2 } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItemQty, removeFromCart, planData, placeOrder } = useLifeOSStore();
  const [selectedTip, setSelectedTip] = useState<number | null>(30);

  const foodItems = cartItems.filter(i => i.category === 'food');
  const instamartItems = cartItems.filter(i => i.category === 'instamart');

  // Derive restaurant name smartly from item tags or item name
  const derivedRestaurant = (() => {
    const firstFood = foodItems[0];
    if (!firstFood) return planData.food.restaurant;
    // If it's a module-staged cart item, infer restaurant from item name/tag
    const name = firstFood.name.toLowerCase();
    if (name.includes('mexican') || name.includes('rice bowl') || name.includes('taco') || name.includes('burrito')) return 'Tortilla Grill';
    if (name.includes('pizza')) return 'La Pino\'z Pizza';
    if (name.includes('biryani') || name.includes('dum')) return 'Paradise Biryani';
    if (name.includes('dosa') || name.includes('idli') || name.includes('south')) return 'Sagar Ratna';
    if (name.includes('burger') || name.includes('fries')) return 'Burger Singh';
    if (name.includes('protein') || name.includes('bowl') || name.includes('grilled')) return 'FitBites Protein Studio';
    if (name.includes('pasta') || name.includes('calzone') || name.includes('wrap')) return 'Truffles Kitchen';
    if (name.includes('soup') || name.includes('tea') || name.includes('healthy')) return 'Healthy Bowl Co.';
    if (name.includes('paneer') || name.includes('curry') || name.includes('thali')) return 'Barbeque Nation Kitchen';
    // Fallback to planData restaurant
    return planData.food.restaurant;
  })();


  const foodSubtotal = foodItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const instamartSubtotal = instamartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tipAmount = selectedTip || 0;
  
  const deliveryFee = 0; // FREE with Swiggy One VIP!
  
  const grandTotal = foodSubtotal + instamartSubtotal + tipAmount + deliveryFee;

  const handleCheckout = () => {
    placeOrder();
    navigate('/summary');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-32">
      <div>
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/plan')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#FFF4EC] text-[#FC8019] text-xs font-bold px-3 py-1 rounded-full border border-[#FC8019]/20">
            <Sparkles className="w-3 h-3 text-[#FC8019]" />
            <span>Swiggy One FREE Delivery</span>
          </div>
        </div>

        {/* Screen Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
            Multi-Service Cart 🛒
          </h1>
          <p className="text-xs text-[#6B7280] font-normal mt-1">
            Grouped order across Swiggy Food and Instamart.
          </p>
        </div>

        {/* Saved Address Bar */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-3.5 shadow-soft mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FFF4EC] text-[#FC8019] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs text-[#1C1C1E]">Deliver to Home</span>
                <span className="text-[10px] bg-[#22C55E] text-white font-bold px-1.5 py-0.2 rounded">DEFAULT</span>
              </div>
              <p className="text-[11px] text-[#6B7280] font-medium truncate max-w-[200px]">
                Indiranagar, Bengaluru, KA
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Address selection modal: Swiggy Food MCP get_addresses()")}
            className="text-xs font-bold text-[#FC8019] hover:underline"
          >
            Change
          </button>
        </div>

        {/* SECTION 1: Food Items Group */}
        {foodItems.length > 0 && (
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft mb-4">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🍗</span>
                <span className="font-extrabold text-xs text-[#1C1C1E]">{derivedRestaurant}</span>
              </div>
              <span className="text-[11px] font-bold text-[#FC8019]">{planData.food.deliveryTime}</span>
            </div>

            <div className="space-y-3">
              {foodItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover border border-[#E8E8E8] shrink-0 shadow-2xs" />
                    ) : (
                      <div className="w-11 h-11 rounded-lg bg-[#F5F5F3] flex items-center justify-center shrink-0 text-sm">🍗</div>
                    )}
                    <div>
                      <h4 className="font-bold text-xs text-[#1C1C1E]">{item.name}</h4>
                      <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#E8E8E8] rounded-lg bg-[#FAFAF8] overflow-hidden">
                      <button onClick={() => updateCartItemQty(item.id, -1)} className="px-2 py-1 text-[#6B7280] hover:bg-white text-xs font-bold">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-extrabold text-[#1C1C1E]">{item.qty}</span>
                      <button onClick={() => updateCartItemQty(item.id, 1)} className="px-2 py-1 text-[#FC8019] hover:bg-white text-xs font-bold">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#9CA3AF] hover:text-[#EF4444] p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Instamart Quick Commerce Group */}
        {instamartItems.length > 0 && (
          <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft mb-4">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛒</span>
                <span className="font-extrabold text-xs text-[#1C1C1E]">Instamart Dark Store</span>
              </div>
              <span className="text-[11px] font-bold text-[#22C55E]">{planData.instamart.deliveryTime}</span>
            </div>

            <div className="space-y-3">
              {instamartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover border border-[#E8E8E8] shrink-0 shadow-2xs" />
                    ) : (
                      <div className="w-11 h-11 rounded-lg bg-[#F5F5F3] flex items-center justify-center shrink-0 text-sm">🛒</div>
                    )}
                    <div>
                      <h4 className="font-bold text-xs text-[#1C1C1E]">{item.name}</h4>
                      <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#E8E8E8] rounded-lg bg-[#FAFAF8] overflow-hidden">
                      <button onClick={() => updateCartItemQty(item.id, -1)} className="px-2 py-1 text-[#6B7280] hover:bg-white text-xs font-bold">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-extrabold text-[#1C1C1E]">{item.qty}</span>
                      <button onClick={() => updateCartItemQty(item.id, 1)} className="px-2 py-1 text-[#FC8019] hover:bg-white text-xs font-bold">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#9CA3AF] hover:text-[#EF4444] p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip Delivery Partner Card */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-[#EC4899]" />
            <h4 className="font-extrabold text-xs text-[#1C1C1E]">Tip Delivery Partner</h4>
          </div>
          <p className="text-[11px] text-[#6B7280] font-normal mb-3">
            100% of your tip goes to the Swiggy valet partner.
          </p>
          <div className="flex gap-2">
            {[20, 30, 50].map((tipVal) => (
              <button
                key={tipVal}
                onClick={() => setSelectedTip(selectedTip === tipVal ? null : tipVal)}
                className={`
                  flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all
                  ${selectedTip === tipVal
                    ? 'bg-[#FFF4EC] border-[#FC8019] text-[#FC8019]'
                    : 'bg-white border-[#E8E8E8] text-[#6B7280] hover:bg-[#F5F5F3]'
                  }
                `}
              >
                ₹{tipVal}
              </button>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft space-y-2.5">
          <h4 className="font-extrabold text-xs text-[#1C1C1E] border-b border-[#F0F0F0] pb-2">Bill Details</h4>
          <div className="flex justify-between text-xs text-[#6B7280]">
            <span>Food Subtotal</span>
            <span className="font-bold text-[#1C1C1E]">₹{foodSubtotal}</span>
          </div>
          <div className="flex justify-between text-xs text-[#6B7280]">
            <span>Instamart Subtotal</span>
            <span className="font-bold text-[#1C1C1E]">₹{instamartSubtotal}</span>
          </div>
          <div className="flex justify-between text-xs text-[#6B7280]">
            <span>Swiggy One Delivery Fee</span>
            <span className="font-bold text-[#22C55E]">FREE <span className="line-through text-[#9CA3AF] text-[10px]">₹45</span></span>
          </div>
          {tipAmount > 0 && (
            <div className="flex justify-between text-xs text-[#6B7280]">
              <span>Delivery Partner Tip</span>
              <span className="font-bold text-[#1C1C1E]">₹{tipAmount}</span>
            </div>
          )}

          <div className="pt-2 border-t border-[#F0F0F0] flex justify-between items-center text-sm font-extrabold text-[#1C1C1E]">
            <span>To Pay</span>
            <span className="text-[#FC8019] text-base">₹{grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#E8E8E8] max-w-[430px] mx-auto z-30">
        <button
          onClick={handleCheckout}
          className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-base h-13 rounded-2xl shadow-pill flex items-center justify-between px-5 transition-all cursor-pointer"
        >
          <div className="text-left">
            <span className="text-[10px] block opacity-80 uppercase font-semibold">Pay on Delivery</span>
            <span>₹{grandTotal} · COD</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Place Swiggy Order</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  );
};
