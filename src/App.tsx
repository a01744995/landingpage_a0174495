import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { VisualLandingPage } from './sections/VisualLandingPage';
import { HeroSection } from './sections/HeroSection';
import { MassAvionicsSection } from './sections/MassAvionicsSection';
import { FlightSimulatorSection } from './sections/FlightSimulatorSection';
import { PropulsionSection } from './sections/PropulsionSection';
import { RecoveryPhysicsSection } from './sections/RecoveryPhysicsSection';
import { Footer } from './components/Footer';
import { MISSION_CONSTANTS } from './data/rocketData';

export function App() {
  const [viewMode, setViewMode] = useState<'visual' | 'engineering'>('visual');

  const handleEnterEngineering = (targetSection?: string) => {
    setViewMode('engineering');
    setTimeout(() => {
      if (targetSection) {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 60);
  };

  const handleFooterNavigate = (mode: 'visual' | 'engineering', sectionId?: string) => {
    if (mode === 'visual') {
      setViewMode('visual');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleEnterEngineering(sectionId);
    }
  };

  return (
    <div
      id="inicio"
      className="min-h-screen bg-[#0B0B0B] text-[#FFF3E0] flex flex-col selection:bg-[#D8903D] selection:text-[#0B0B0B]"
    >
      <Navbar
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        teamNumber={MISSION_CONSTANTS.teamNumber}
        groupCode={MISSION_CONSTANTS.groupCode}
      />

      <main className="flex-1">
        {viewMode === 'visual' ? (
          <VisualLandingPage
            onEnterEngineering={handleEnterEngineering}
            teamNumber={MISSION_CONSTANTS.teamNumber}
            groupCode={MISSION_CONSTANTS.groupCode}
          />
        ) : (
          <div className="pt-20 animate-fadeIn">
            {/* Top Banner in Engineering & Simulator Mode */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setViewMode('visual');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#E7B56A] hover:text-[#FFF3E0] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Landing Page</span>
              </button>
              <span className="text-xs font-mono text-[#F8D6A1]/65">
                INGENIERÍA &amp; SIMULADOR • {MISSION_CONSTANTS.teamNumber} • {MISSION_CONSTANTS.groupCode}
              </span>
            </div>

            <HeroSection />
            <FlightSimulatorSection />
            <MassAvionicsSection />
            <PropulsionSection />
            <RecoveryPhysicsSection />
          </div>
        )}
      </main>

      <Footer
        onNavigateView={handleFooterNavigate}
        teamNumber={MISSION_CONSTANTS.teamNumber}
        groupCode={MISSION_CONSTANTS.groupCode}
      />
    </div>
  );
}

export default App;
