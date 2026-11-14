import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { BrandIdentityModal } from './components/BrandIdentityModal';
import { VisualLandingPage } from './sections/VisualLandingPage';
import { HeroSection } from './sections/HeroSection';
import { MassAvionicsSection } from './sections/MassAvionicsSection';
import { FlightSimulatorSection } from './sections/FlightSimulatorSection';
import { PropulsionSection } from './sections/PropulsionSection';
import { RecoveryPhysicsSection } from './sections/RecoveryPhysicsSection';
import { Footer } from './components/Footer';
import { MISSION_CONSTANTS } from './data/rocketData';

const STORAGE_TEAM_NUM_KEY = 'wafle_team_number_v2';
const STORAGE_GROUP_CODE_KEY = 'wafle_group_code_v2';

export function App() {
  const [viewMode, setViewMode] = useState<'visual' | 'engineering'>('visual');
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const [teamNumber, setTeamNumber] = useState<string>(() => {
    try {
      return window.localStorage.getItem(STORAGE_TEAM_NUM_KEY) || MISSION_CONSTANTS.teamNumber;
    } catch {
      return MISSION_CONSTANTS.teamNumber;
    }
  });

  const [groupCode, setGroupCode] = useState<string>(() => {
    try {
      return window.localStorage.getItem(STORAGE_GROUP_CODE_KEY) || MISSION_CONSTANTS.groupCode;
    } catch {
      return MISSION_CONSTANTS.groupCode;
    }
  });

  const handleUpdateTeamMeta = (nextTeamNumber: string, nextGroupCode: string) => {
    setTeamNumber(nextTeamNumber);
    setGroupCode(nextGroupCode);
    try {
      window.localStorage.setItem(STORAGE_TEAM_NUM_KEY, nextTeamNumber);
      window.localStorage.setItem(STORAGE_GROUP_CODE_KEY, nextGroupCode);
    } catch {
      // ignore storage errors
    }
  };

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
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
        teamNumber={teamNumber}
        groupCode={groupCode}
      />

      <main className="flex-1">
        {viewMode === 'visual' ? (
          <VisualLandingPage
            onEnterEngineering={handleEnterEngineering}
            onOpenBrandModal={() => setIsBrandModalOpen(true)}
            teamNumber={teamNumber}
            groupCode={groupCode}
            onUpdateTeamMeta={handleUpdateTeamMeta}
          />
        ) : (
          <div className="pt-20 animate-fadeIn">
            {/* Top Banner in Separated Engineering & Data Mode */}
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
                DATOS TÉCNICOS (APARTE) • {teamNumber} • {groupCode}
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
        teamNumber={teamNumber}
        groupCode={groupCode}
      />

      <BrandIdentityModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
}

export default App;
