import React, { useState, useEffect } from 'react';
import { Gauge, Eye, Palette } from 'lucide-react';

interface NavbarProps {
  viewMode: 'visual' | 'engineering';
  onToggleViewMode: (mode: 'visual' | 'engineering') => void;
  onOpenBrandModal: () => void;
  teamNumber: string;
  groupCode: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onToggleViewMode,
  onOpenBrandModal,
  teamNumber,
  groupCode,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-[#E7B56A]/20 py-2.5 shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Dual Brand Logos */}
          <button
            type="button"
            onClick={() => {
              onToggleViewMode('visual');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group text-left min-w-0"
          >
            <div className="flex items-center -space-x-2 shrink-0">
              <img
                src="images/brand/emblem-main.png"
                alt="Logotipo WAFLE Rocket Tec"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain bg-[#0B0B0B] border border-[#E7B56A]/60 p-0.5 group-hover:scale-105 transition-transform duration-300"
              />
              <img
                src="images/brand/rocket-tec-sinaloa.svg"
                alt="Logotipo Rocket Tec Sinaloa"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain bg-[#0B0B0B] border border-[#D8903D]/55 p-0.5 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-orbitron font-bold text-sm sm:text-base tracking-wider text-[#FFF3E0]">
                  WAFLE
                </span>
                <span className="text-[11px] font-mono text-[#E7B56A] hidden md:inline">
                  ROCKET TEC
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F8D6A1]/70 hidden sm:block truncate">
                {teamNumber} • {groupCode} • Sinaloa
              </span>
            </div>
          </button>

          {/* Right Controls: Brand Kit + Separated Mode Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenBrandModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#F8D6A1]/85 hover:text-[#FFF3E0] bg-white/[0.04] hover:bg-white/[0.1] border border-[#E7B56A]/25 transition-all"
              title="Ver Guía Oficial de Identidad Visual"
            >
              <Palette className="w-3.5 h-3.5 text-[#D8903D]" />
              <span>Identidad</span>
            </button>

            <div className="flex items-center p-1 rounded-full bg-black/75 backdrop-blur-md border border-[#E7B56A]/25">
              <button
                type="button"
                onClick={() => {
                  onToggleViewMode('visual');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
                  viewMode === 'visual'
                    ? 'bg-gradient-to-r from-[#E7B56A] to-[#D8903D] text-[#0B0B0B] font-bold shadow-glow-amber'
                    : 'text-[#F8D6A1]/80 hover:text-[#FFF3E0]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Landing Page</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onToggleViewMode('engineering');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all ${
                  viewMode === 'engineering'
                    ? 'bg-gradient-to-r from-[#E7B56A] to-[#D8903D] text-[#0B0B0B] font-bold shadow-glow-amber'
                    : 'text-[#F8D6A1]/80 hover:text-[#FFF3E0]'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Datos &amp; Simulador</span>
                <span className="sm:hidden">Datos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
