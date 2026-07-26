import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { FoodItem } from '../data/mockData';

interface CartItemProps {
  item: FoodItem;
  onUpdateQty: (id: string, delta: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQty }) => {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-[#F0F0F0] last:border-none">
      {/* Item info */}
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-sm text-[#1C1C1E]">{item.name}</h4>
        <p className="text-xs text-[#6B7280] font-medium mt-0.5">₹{item.price} each</p>
      </div>

      {/* Quantity counter + Price */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[#F5F5F3] border border-[#E8E8E8] rounded-full px-2 py-1 gap-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onUpdateQty(item.id, -1)}
            className="w-6 h-6 rounded-full bg-white text-[#1C1C1E] flex items-center justify-center border border-[#E8E8E8] shadow-2xs hover:bg-[#FFF4EC] hover:text-[#FC8019]"
          >
            <Minus className="w-3 h-3" />
          </motion.button>
          <span className="text-xs font-bold text-[#1C1C1E] min-w-[14px] text-center">
            {item.qty}
          </span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onUpdateQty(item.id, 1)}
            className="w-6 h-6 rounded-full bg-white text-[#1C1C1E] flex items-center justify-center border border-[#E8E8E8] shadow-2xs hover:bg-[#FFF4EC] hover:text-[#FC8019]"
          >
            <Plus className="w-3 h-3" />
          </motion.button>
        </div>

        <div className="text-right min-w-[50px]">
          <span className="font-bold text-sm text-[#1C1C1E]">
            ₹{item.price * item.qty}
          </span>
        </div>
      </div>
    </div>
  );
};
