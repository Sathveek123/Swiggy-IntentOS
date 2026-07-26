import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, QrCode, Share2, CheckCircle2, ArrowLeft, ArrowRight, Sparkles, Plus, ThumbsUp } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const GroupOrder: React.FC = () => {
  const navigate = useNavigate();
  const { setChip } = useLifeOSStore();
  const [friendsCount, setFriendsCount] = useState(4);
  const [budgetPerPerson, setBudgetPerPerson] = useState(200);

  const totalBudget = friendsCount * budgetPerPerson;

  const handleCreateGroupPlan = () => {
    setChip("👥 Friends Coming Over");
    navigate('/thinking');
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-28">
      <div>
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-2 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#FFF4EC] text-[#FC8019] text-xs font-bold px-3 py-1 rounded-full border border-[#FC8019]/20">
            <Users className="w-3.5 h-3.5" />
            <span>Group Order Studio</span>
          </div>
        </div>

        {/* Screen Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
            Group Order & Split 👥
          </h1>
          <p className="text-xs text-[#6B7280] font-normal mt-1">
            Solve group decision chaos with live voting & 1-tap budget splitting.
          </p>
        </div>

        {/* Live Invite Card */}
        <div className="bg-gradient-to-r from-[#1C1C1E] to-[#333336] rounded-2xl p-4 text-white shadow-soft mb-4 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-[#FC8019] text-white font-extrabold px-2 py-0.5 rounded">
              LIVE SESSION ACTIVE
            </span>
            <h3 className="font-extrabold text-sm text-white mt-1.5">Group Session #SWG-882</h3>
            <p className="text-xs text-[#9CA3AF] font-normal">Invite friends via link or QR</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => alert("Copied Group Invite Link!")} className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
              <Share2 className="w-4 h-4" />
            </button>
            <button onClick={() => alert("QR Code Modal Opened")} className="w-9 h-9 rounded-full bg-[#FC8019] text-white flex items-center justify-center shadow-pill">
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Budget & Friends Splitter */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft mb-4 space-y-4">
          <h4 className="font-extrabold text-xs text-[#1C1C1E] border-b border-[#F0F0F0] pb-2">
            Budget & Party Size Calculator
          </h4>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7280]">Party Size (Friends)</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setFriendsCount(Math.max(2, friendsCount - 1))} className="w-7 h-7 rounded-lg bg-[#F5F5F3] font-bold text-xs">-</button>
              <span className="font-extrabold text-sm text-[#1C1C1E]">{friendsCount} people</span>
              <button onClick={() => setFriendsCount(friendsCount + 1)} className="w-7 h-7 rounded-lg bg-[#FFF4EC] text-[#FC8019] font-bold text-xs">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7280]">Budget per person</span>
            <div className="flex items-center gap-2">
              {[150, 200, 300].map(val => (
                <button
                  key={val}
                  onClick={() => setBudgetPerPerson(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                    budgetPerPerson === val ? 'bg-[#FC8019] text-white border-[#FC8019]' : 'bg-[#F5F5F3] text-[#6B7280] border-transparent'
                  }`}
                >
                  ₹{val}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#F0F0F0] flex justify-between items-center text-xs">
            <span className="font-bold text-[#6B7280]">Total Group Budget Limit</span>
            <span className="text-base font-extrabold text-[#FC8019]">₹{totalBudget}</span>
          </div>
        </div>

        {/* Live Friends Voting Feed */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft space-y-2.5">
          <h4 className="font-extrabold text-xs text-[#1C1C1E] border-b border-[#F0F0F0] pb-2 flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5 text-[#FC8019]" /> Live Group Votes
          </h4>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-bold text-[#1C1C1E]">🍗 Hyderabadi Biryani</span>
            <span className="bg-[#FFF4EC] text-[#FC8019] font-extrabold px-2 py-0.5 rounded-full text-[10px]">
              3 Votes (Sathveek, Rahul, Priya)
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-bold text-[#1C1C1E]">🍕 Cheese Burst Pizza</span>
            <span className="bg-[#F5F5F3] text-[#6B7280] font-extrabold px-2 py-0.5 rounded-full text-[10px]">
              1 Vote (Amit)
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleCreateGroupPlan}
          className="w-full bg-[#FC8019] hover:bg-[#E5700F] text-white font-extrabold text-sm h-12 rounded-xl shadow-pill flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Generate Group LifePlan (₹{totalBudget})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
