import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-xl text-sm',
    md: 'w-11 h-11 rounded-2xl text-lg',
    lg: 'w-14 h-14 rounded-2xl text-2xl',
  };

  const titleSizes = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center gap-3">
        {/* Monogram Box */}
        <div className={`${iconSizes[size]} bg-[#FC8019] text-white flex items-center justify-center font-extrabold shadow-pill transition-transform`}>
          SL
        </div>
        {/* Brand Text */}
        <div className="flex flex-col">
          <span className={`${titleSizes[size]} text-[#1C1C1E] font-bold leading-tight`}>
            Swiggy <span className="text-[#FC8019]">LifeOS</span>
          </span>
        </div>
      </div>
      {showTagline && (
        <p className="mt-2 text-xs font-medium text-[#6B7280] tracking-wider uppercase">
          Life. Simplified.
        </p>
      )}
    </div>
  );
};
