import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-[#FAFAF8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Orange Radial Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #FC8019 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dead-Centered Logo & Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center text-center relative z-10"
      >
        <Logo size="lg" />
        
        <p className="text-xs text-[#6B7280] font-medium mt-3 tracking-wide">
          Life. Simplified.
        </p>

        {/* Minimal Progress Line */}
        <div className="w-32 h-1 bg-[#E8E8E8] rounded-full mt-8 overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="w-full h-full bg-[#FC8019] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};
