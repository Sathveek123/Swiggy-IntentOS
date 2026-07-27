import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, MessageSquare, ShoppingBag } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useLifeOSStore();

  const tabs = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/modules', label: 'Modules', icon: LayoutGrid },
    { path: '/agent', label: 'Agent', icon: MessageSquare },
    { path: '/cart', label: 'Cart', icon: ShoppingBag, badge: cartItems.length },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#F0F0F0] h-16 max-w-[430px] mx-auto flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)] shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || (tab.path === '/modules' && ['/student-survival', '/kid-mood', '/taste-discovery', '/nutri-goal', '/mood-companion', '/celebration-os'].includes(location.pathname));

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full relative cursor-pointer transition-colors ${
              isActive ? 'text-[#FC8019]' : 'text-[#9CA3AF] hover:text-[#6B7280]'
            }`}
          >
            {/* Active Indicator Dot */}
            {isActive && (
              <span className="absolute top-1.5 w-1 h-1 rounded-full bg-[#FC8019]" />
            )}

            <div className="relative mt-1">
              <Icon className="w-5 h-5 stroke-[2]" />
              {Boolean(tab.badge && tab.badge > 0) && (
                <span className="absolute -top-1.5 -right-2 bg-[#FC8019] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {tab.badge}
                </span>
              )}
            </div>

            <span className={`text-[10px] font-medium mt-1 ${isActive ? 'font-bold text-[#FC8019]' : 'text-[#9CA3AF]'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
