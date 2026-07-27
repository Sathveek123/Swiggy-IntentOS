import React from 'react';
import { Clock, Star, Users, Calendar, Plus, CheckCircle2, ShoppingBag, Utensils, MapPin, Sparkles } from 'lucide-react';
import { FoodItem } from '../data/mockData';

interface PlanCardProps {
  type: 'food' | 'instamart' | 'dineout';
  title: string;
  restaurantOrStore: string;
  rating?: number;
  deliveryTime?: string;
  items?: FoodItem[];
  totalPrice?: number;
  tableFor?: number;
  slot?: string;
  isAdded?: boolean;
  onAction?: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  type,
  title,
  restaurantOrStore,
  rating = 4.5,
  deliveryTime = '25 mins',
  items = [],
  totalPrice = 0,
  tableFor = 2,
  slot = '8:00 PM',
  isAdded = false,
  onAction,
}) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'food':
        return {
          bg: 'bg-[#FFF4EC]',
          border: 'border-[#FC8019]/30',
          text: 'text-[#FC8019]',
          icon: Utensils,
          label: 'FOOD DELIVERY',
        };
      case 'instamart':
        return {
          bg: 'bg-[#F0FFF4]',
          border: 'border-[#22C55E]/30',
          text: 'text-[#22C55E]',
          icon: ShoppingBag,
          label: 'INSTAMART 10-MIN',
        };
      case 'dineout':
        return {
          bg: 'bg-[#EEF2FF]',
          border: 'border-[#6366F1]/30',
          text: 'text-[#6366F1]',
          icon: MapPin,
          label: 'DINEOUT RESERVATION',
        };
    }
  };

  const badge = getBadgeStyle();
  const BadgeIcon = badge.icon;

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-0 shadow-soft transition-all hover:border-[#FC8019] relative overflow-hidden">
      {/* 60px Top Image Strip */}
      <div className="h-16 w-full relative overflow-hidden">
        <img
          src={
            type === 'food'
              ? 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
              : type === 'instamart'
              ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=80'
          }
          alt={restaurantOrStore}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold backdrop-blur-xs border ${badge.bg} ${badge.border} ${badge.text}`}>
            <BadgeIcon className="w-2.5 h-2.5" />
            <span>{badge.label}</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-extrabold text-[#FC8019] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
          <Sparkles className="w-2.5 h-2.5 text-[#FC8019]" />
          <span>Swiggy One</span>
        </div>
      </div>

      <div className="p-4">
        {/* Main Vendor Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-[#1C1C1E] tracking-tight">
                {restaurantOrStore}
              </h3>
              <span className="text-[9px] font-bold text-[#22C55E] bg-[#E8F5E9] border border-[#22C55E]/30 px-1.5 py-0.2 rounded">
                OPEN
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#6B7280]">
              {type !== 'instamart' && rating && (
                <div className="flex items-center gap-1 bg-[#22C55E] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                  <span>{rating}</span>
                  <Star className="w-2.5 h-2.5 fill-white" />
                </div>
              )}
              {deliveryTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FC8019]" />
                  <span className="font-semibold text-[#1C1C1E]">{deliveryTime}</span>
                </div>
              )}
              <span className="text-[#9CA3AF]">· 2.1 km away</span>
            </div>
          </div>
        </div>

        {/* Food / Instamart Items List with High Res Thumbnails */}
        {type !== 'dineout' && items.length > 0 && (
          <div className="space-y-2.5 my-3.5 pt-2 border-t border-[#F5F5F3]">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2.5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E8E8E8] shrink-0 shadow-2xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F3] flex items-center justify-center shrink-0 text-xs">
                      {type === 'food' ? '🍗' : '🛒'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#1C1C1E]">
                        {type === 'food' ? '🍗 ' : '🛒 '}
                        {item.name}
                      </span>
                      {item.tag && (
                        <span className="text-[9px] font-bold text-[#FC8019] bg-[#FFF4EC] px-1.5 py-0.2 rounded border border-[#FC8019]/20">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6B7280] font-medium">
                      Qty: {item.qty} × ₹{item.price}
                    </span>
                  </div>
                </div>

                <span className="font-extrabold text-[#1C1C1E] text-xs">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}

            {/* Subtotal Row */}
            <div className="flex justify-between items-center pt-2.5 border-t border-[#F0F0F0]">
              <span className="text-xs font-bold text-[#6B7280]">Item Total</span>
              <span className="text-sm font-extrabold text-[#1C1C1E]">
                ₹{totalPrice}
              </span>
            </div>
          </div>
        )}

        {/* Dineout Table Reservation Content */}
        {type === 'dineout' && (
          <div className="bg-[#FAFAF8] border border-[#E8E8E8] rounded-xl p-3 my-3 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Calendar className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Reservation Slot:</span>
              </div>
              <span className="font-bold text-[#1C1C1E] bg-white border border-[#E8E8E8] px-2 py-0.5 rounded">
                {slot} Today
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Users className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Party Size:</span>
              </div>
              <span className="font-bold text-[#1C1C1E] bg-white border border-[#E8E8E8] px-2 py-0.5 rounded">
                Table for {tableFor}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        {onAction && (
          <button
            onClick={onAction}
            disabled={isAdded}
            className={`
              w-full mt-2 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm
              ${isAdded
                ? 'bg-[#F0FFF4] text-[#22C55E] border border-[#22C55E]/30'
                : type === 'dineout'
                  ? 'bg-[#6366F1] hover:bg-[#4F46E5] text-white'
                  : 'bg-[#FC8019] hover:bg-[#E5700F] text-white'
              }
            `}
          >
            {isAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{type === 'dineout' ? 'Book Table Slot' : 'Add Items to Cart'}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
