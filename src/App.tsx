import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Splash } from './screens/Splash';
import { Home } from './screens/Home';
import { Thinking } from './screens/Thinking';
import { Plan } from './screens/Plan';
import { Cart } from './screens/Cart';
import { Summary } from './screens/Summary';
import { Tracking } from './screens/Tracking';
import { MCPReady } from './screens/MCPReady';
import { LifeModules } from './screens/LifeModules';
import { AgentChat } from './screens/AgentChat';
import { SwiggyOne } from './screens/SwiggyOne';
import { Gourmet } from './screens/Gourmet';
import { GroupOrder } from './screens/GroupOrder';
import { Analytics } from './screens/Analytics';
import { PersonalDashboardScreen } from './screens/PersonalDashboardScreen';
import { StudentSurvivalFlow } from './screens/StudentSurvivalFlow';
import { KidMoodFlow } from './screens/KidMoodFlow';
import { TasteDiscoveryFlow } from './screens/TasteDiscoveryFlow';
import { NutriGoalFlow } from './screens/NutriGoalFlow';
import { MoodCompanionFlow } from './screens/MoodCompanionFlow';
import { NeighborhoodPulseFlow } from './screens/NeighborhoodPulseFlow';
import { CelebrationOSFlow } from './screens/CelebrationOSFlow';
import { BottomNav } from './components/BottomNav';
import { ErrorBoundary } from './components/ErrorBoundary';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Splash /></PageWrapper>} />
        <Route path="/splash" element={<PageWrapper><Splash /></PageWrapper>} />
        <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><PersonalDashboardScreen /></PageWrapper>} />
        <Route path="/student-survival" element={<PageWrapper><StudentSurvivalFlow /></PageWrapper>} />
        <Route path="/kid-mood" element={<PageWrapper><KidMoodFlow /></PageWrapper>} />
        <Route path="/taste-discovery" element={<PageWrapper><TasteDiscoveryFlow /></PageWrapper>} />
        <Route path="/nutri-goal" element={<PageWrapper><NutriGoalFlow /></PageWrapper>} />
        <Route path="/mood-companion" element={<PageWrapper><MoodCompanionFlow /></PageWrapper>} />
        <Route path="/neighborhood-pulse" element={<PageWrapper><NeighborhoodPulseFlow /></PageWrapper>} />
        <Route path="/celebration-os" element={<PageWrapper><CelebrationOSFlow /></PageWrapper>} />
        <Route path="/swiggy-one" element={<PageWrapper><SwiggyOne /></PageWrapper>} />
        <Route path="/gourmet" element={<PageWrapper><Gourmet /></PageWrapper>} />
        <Route path="/group-order" element={<PageWrapper><GroupOrder /></PageWrapper>} />
        <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
        <Route path="/agent" element={<PageWrapper><AgentChat /></PageWrapper>} />
        <Route path="/modules" element={<PageWrapper><LifeModules /></PageWrapper>} />
        <Route path="/thinking" element={<PageWrapper><Thinking /></PageWrapper>} />
        <Route path="/plan" element={<PageWrapper><Plan /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
        <Route path="/summary" element={<PageWrapper><Summary /></PageWrapper>} />
        <Route path="/tracking" element={<PageWrapper><Tracking /></PageWrapper>} />
        <Route path="/mcp-ready" element={<PageWrapper><MCPReady /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1E] relative">
          <AnimatedRoutes />
          <BottomNav />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
