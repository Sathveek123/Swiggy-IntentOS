import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Phone, MessageSquare, CheckCircle2, ShieldCheck, Navigation } from 'lucide-react';
import { useLifeOSStore } from '../store/useLifeOSStore';

export const Tracking: React.FC = () => {
  const navigate = useNavigate();
  const { planData } = useLifeOSStore();
  const [currentStep, setCurrentStep] = useState(2);
  const [etaSeconds, setEtaSeconds] = useState(28 * 60);

  useEffect(() => {
    // Progress countdown
    const timer = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const stepTimer1 = setTimeout(() => setCurrentStep(3), 4000);
    const stepTimer2 = setTimeout(() => setCurrentStep(4), 9000);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
    };
  }, []);

  const formatMinutes = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const steps = [
    { label: "Order Confirmed", time: "Just now", done: currentStep >= 1 },
    { label: "Kitchen Preparing", time: "In Progress", done: currentStep >= 2 },
    { label: "Rider Assigned", time: "Ramesh Kumar (⭐ 4.9)", done: currentStep >= 3 },
    { label: "Out for Delivery", time: "ETA 18 mins", done: currentStep >= 4 }
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] flex flex-col justify-between p-5 border-x border-[#E8E8E8] shadow-sm relative pb-24">
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pt-2 pb-4 border-b border-[#E8E8E8] mb-5">
          <button
            onClick={() => navigate('/summary')}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F5F3]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#FFF4EC] text-[#FC8019] text-xs font-semibold px-3 py-1 rounded-full border border-[#FC8019]/20">
            <Navigation className="w-3.5 h-3.5 animate-spin" />
            <span>Live GPS Tracking</span>
          </div>
        </div>

        {/* ETA Hero Banner */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5 shadow-soft mb-5 text-center relative overflow-hidden">
          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-1">
            Estimated Arrival
          </span>
          <h2 className="text-3xl font-extrabold text-[#FC8019] tracking-tight">
            {formatMinutes(etaSeconds)}
          </h2>
          <p className="text-xs text-[#1C1C1E] font-medium mt-1">
            {planData.food.restaurant} · Food Delivery
          </p>

          <div className="w-full bg-[#F0F0F0] h-2 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: "30%" }}
              animate={{ width: currentStep >= 4 ? "85%" : currentStep >= 3 ? "60%" : "40%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-[#FC8019] rounded-full"
            />
          </div>
        </div>

        {/* Rider Info Card */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-soft mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#FC8019] text-white font-bold flex items-center justify-center text-sm shadow-pill">
              RK
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1C1C1E]">Ramesh Kumar</h4>
              <p className="text-xs text-[#6B7280] font-medium mt-0.5">Swiggy Valet · 4.9 ⭐ (1,240 orders)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Calling delivery valet Ramesh Kumar...")}
              className="w-9 h-9 rounded-full bg-[#FFF4EC] text-[#FC8019] border border-[#FC8019]/30 flex items-center justify-center hover:bg-[#FC8019] hover:text-white transition-all"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert("Opening chat with valet...")}
              className="w-9 h-9 rounded-full bg-[#F5F5F3] text-[#1C1C1E] border border-[#E8E8E8] flex items-center justify-center hover:bg-white transition-all"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Stepper Timeline */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5 shadow-soft space-y-4">
          <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
            Order Timeline
          </h4>
          {steps.map((st, idx) => (
            <div key={idx} className="flex items-start gap-3 relative">
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-3.5 top-6 bottom-0 w-0.5 ${
                    st.done ? 'bg-[#FC8019]' : 'bg-[#E8E8E8]'
                  }`}
                />
              )}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                  st.done ? 'bg-[#FC8019] text-white shadow-xs' : 'bg-[#F5F5F3] text-[#9CA3AF] border border-[#E8E8E8]'
                }`}
              >
                {st.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <div className="flex-1 pb-1">
                <h5 className={`text-sm font-bold ${st.done ? 'text-[#1C1C1E]' : 'text-[#9CA3AF]'}`}>
                  {st.label}
                </h5>
                <p className="text-xs text-[#6B7280] font-normal">{st.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home */}
      <div className="pt-4">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#FC8019] text-white font-bold text-sm h-12 rounded-xl shadow-pill transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
