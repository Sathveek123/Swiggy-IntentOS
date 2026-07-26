import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  size?: number;
}

export const AnimatedCheckmark: React.FC<Props> = ({ size = 80 }) => {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="rounded-full bg-[#FFF4EC] border-2 border-[#FC8019] flex items-center justify-center shadow-lg shadow-[#FC8019]/15"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FC8019"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
