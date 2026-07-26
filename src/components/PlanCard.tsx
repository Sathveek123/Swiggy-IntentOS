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
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft transition-all hover:border-[#FC8019] relative overflow-hidden">
      {/* Top Card Header Badge */}
      <div className="flex items-center justify-between mb-3 border-b border-[#F0F0F0] pb-3">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.border} ${badge.text}`}>
          <BadgeIcon className="w-3 h-3" />
          <span>{badge.label}</span>
        </div>

        {/* Swiggy One Member Free Delivery Badge */}
        <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#FC8019] bg-[#FFF4EC] px-2.5 py-0.5 rounded-full border border-[#FC8019]/20">
          <Sparkles className="w-3 h-3 text-[#FC8019]" />
          <span>Swiggy One FREE</span>
        </div>
      </div>

      {/* Main Vendor Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-extrabold text-base text-[#1C1C1E] tracking-tight">
            {restaurantOrStore}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#6B7280]">
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
                    <span className="font-bold text-[#1C1C1E]">{item.name}</span>
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
  );
};
