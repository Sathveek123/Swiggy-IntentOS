import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';
import { checkBackendHealth } from '../services/backendClient';
import { useLifeOSStore } from '../store/useLifeOSStore';

interface ModuleChip {
  id: string;
  key: string;
  title: string;
  emoji: string;
  route: string;
  prompt: string;
}

const CHIPS: ModuleChip[] = [
  {
    id: 'survival',
    key: 'student-survival',
    title: 'Survive on a budget',
    emoji: '🎒',
    route: '/student-survival',
    prompt: 'I have ₹147 left today and I have to survive until tomorrow morning'
  },
  {
    id: 'kid',
    key: 'kid-mood',
    title: 'Order for my kid',
    emoji: '😄',
    route: '/kid-mood',
    prompt: 'My kid is a picky eater refusing vegetables and wants fun food'
  },
  {
    id: 'discovery',
    key: 'taste-discovery',
    title: 'Discover something new',
    emoji: '🍽️',
    route: '/taste-discovery',
    prompt: 'I am bored of ordering the same food every week suggest something exciting'
  },
  {
    id: 'health',
    key: 'nutri-goal',
    title: 'Eat healthy',
    emoji: '🥗',
    route: '/nutri-goal',
    prompt: 'I just finished a workout need 45g protein recovery meal under ₹500'
  },
  {
    id: 'mood',
    key: 'mood-companion',
    title: 'Mood comfort',
    emoji: '💙',
    route: '/mood-companion',
    prompt: 'Feeling super stressed and exhausted need comforting hot meal'
  },
  {
    id: 'celebration',
    key: 'celebration-os',
    title: 'Plan a celebration',
    emoji: '🎂',
    route: '/celebration-os',
    prompt: 'Hosting a birthday party dinner for 6 people tonight'
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { situationText, setSituation, setChip } = useLifeOSStore();
  const [inputText, setInputText] = useState('');
  const [backendOnline, setBackendOnline] = useState(false);
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null);

  useEffect(() => {
    checkBackendHealth().then(setBackendOnline);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleChipSelect = (chip: ModuleChip) => {
    setSelectedChipId(chip.id);
    setChip(chip.key);
    setSituation(chip.prompt);
    setTimeout(() => {
      navigate(chip.route);
    }, 150);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };
    } else {
      setInputText("I have ₹300 and need best pancakes near me");
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputText.trim() || situationText.trim() || "I have ₹300 and need best pancakes near me";
    setSituation(query);
    navigate('/thinking');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* TOP BAR */}
        <header className="h-[56px] bg-white border-b border-[#F0F0F0] px-5 flex items-center justify-between sticky top-0 z-40">
          <Logo size="sm" />
          <div className="w-9 h-9 rounded-full bg-[#FC8019] text-white flex items-center justify-center font-extrabold text-xs shadow-pill ring-2 ring-[#FC8019]/20 cursor-pointer">
            SV
          </div>
        </header>

        {/* GREETING SECTION */}
        <div className="px-5 pt-6 pb-2">
          {/* Status pill */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-[#22C55E] animate-pulse' : 'bg-[#F59E0B]'}`} />
            <span className="text-[11px] font-semibold text-[#6B7280] tracking-wide">
              {backendOnline ? 'MCP Agent Online · Swiggy Builders Club' : 'Demo Mode · Swiggy Builders Club'}
            </span>
          </div>

          {/* Greeting */}
          <h1 className="text-[28px] font-extrabold text-[#1C1C1E] tracking-tight leading-tight">
            {getGreeting()}, Sathveek 👋
          </h1>
          <p className="text-[15px] text-[#6B7280] font-normal mt-2 leading-relaxed">
            What's your situation today?
          </p>
        </div>

        {/* INPUT CARD */}
        <section className="mt-4 px-5">
          <form onSubmit={handleSubmit}>
            <div className="bg-white border-[1.5px] border-[#E8E8E8] rounded-[20px] p-4 shadow-[0_2px_20px_rgba(0,0,0,0.06)] focus-within:border-[#FC8019] focus-within:ring-3 focus-within:ring-[#FC8019]/10 transition-all">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tell me your situation...&#10;e.g. 'I have ₹300 and exam tomorrow'"
                className="w-full text-[15px] text-[#1C1C1E] placeholder-[#C4C4C4] font-normal min-h-[72px] resize-none outline-none bg-transparent leading-relaxed"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              <div className="border-t border-[#F5F5F3] pt-3 mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className="w-9 h-9 rounded-full bg-[#F5F5F3] hover:bg-[#E8E8E8] flex items-center justify-center text-[#6B7280] transition-colors cursor-pointer"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-[#FC8019] hover:bg-[#E5700F] text-white font-bold text-[13px] px-5 py-2.5 rounded-full shadow-[0_4px_12px_rgba(252,128,25,0.3)] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Let's Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </form>
        </section>

        {/* SITUATION CHIPS */}
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
              Pick a situation
            </span>
            <button
              onClick={() => navigate('/modules')}
              className="text-[12px] font-medium text-[#FC8019] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CHIPS.map((chip) => {
              const isSelected = selectedChipId === chip.id;
              return (
                <motion.div
                  key={chip.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChipSelect(chip)}
                  className={`border-[1.5px] rounded-[16px] p-3.5 min-h-[80px] flex flex-col justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#FC8019] bg-[#FFF9F5] shadow-sm'
                      : 'border-[#E8E8E8] bg-white hover:border-[#FC8019]/60 shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  <div className="text-[32px] leading-none">
                    {chip.emoji}
                  </div>

                  <span className="text-[13px] font-semibold text-[#1C1C1E] mt-2 leading-snug">
                    {chip.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-8 pb-5 text-center">
        <p className="text-[11px] font-normal text-[#C4C4C4]">
          Powered by Swiggy Builders Club · MCP
        </p>
      </footer>
    </div>
  );
};
