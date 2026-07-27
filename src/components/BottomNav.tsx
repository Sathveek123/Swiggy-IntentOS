import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, ShoppingBag, LayoutGrid, MessageSquare, BrainCircuit } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useLifeOSStore();

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Exactly 5 clean core tabs tailored for consumer mobile experience
  const tabs = [
    { path: '/home', label: 'Home', icon: HomeIcon },
    { path: '/modules', label: 'Modules', icon: LayoutGrid },
    { path: '/agent', label: 'AI Agent', icon: MessageSquare },
    { path: '/dashboard', label: 'AI Health', icon: BrainCircuit },
    { path: '/cart', label: 'Cart', icon: ShoppingBag, badge: totalCartCount }
  ];

  if (location.pathname === '/' || location.pathname === '/splash' || location.pathname === '/thinking') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 px-3 pb-3 pt-1 pointer-events-none">
      <div className="bg-[#1C1C1E]/95 backdrop-blur-md border border-white/15 rounded-2xl shadow-2xl p-1.5 flex items-center justify-around pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.path === '/modules' && (
            location.pathname.includes('survival') ||
            location.pathname.includes('kid') ||
            location.pathname.includes('taste') ||
            location.pathname.includes('nutri') ||
            location.pathname.includes('mood') ||
            location.pathname.includes('celebration')
          ));
          const Icon = tab.icon;

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`
                relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 flex-1
                ${isActive ? 'text-[#FC8019] font-extrabold' : 'text-[#9CA3AF] hover:text-white font-medium'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#FC8019]/20 rounded-xl -z-0 border border-[#FC8019]/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#FC8019]' : 'text-[#9CA3AF]'}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#FC8019] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight">{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
