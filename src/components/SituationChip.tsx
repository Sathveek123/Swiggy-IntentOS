import React from 'react';
import { motion } from 'framer-motion';

interface SituationChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SituationChip: React.FC<SituationChipProps> = ({ label, isSelected, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      className={`
        w-full text-left py-3 px-4 rounded-xl text-[13.5px] font-medium transition-all duration-200 border flex items-center gap-2
        ${isSelected 
          ? 'bg-[#FFF4EC] border-[#FC8019] text-[#FC8019] font-semibold shadow-sm' 
          : 'bg-white border-[#E8E8E8] text-[#1C1C1E] hover:border-[#D1D5DB] hover:bg-[#FAFAF8]'
        }
      `}
    >
      <span className="truncate">{label}</span>
    </motion.button>
  );
};
