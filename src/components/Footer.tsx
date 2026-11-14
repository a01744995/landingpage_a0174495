import React from 'react';
import { ArrowUp } from 'lucide-react';
import { MISSION_CONSTANTS } from '../data/rocketData';

interface FooterProps {
  onNavigateView?: (mode: 'visual' | 'engineering', sectionId?: string) => void;
  teamNumber: string;
  groupCode: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateView,
  teamNumber,
  groupCode,
}) => {
  return (
    <footer className="bg-[#080706] border-t border-[#E7B56A]/20 py-12 text-xs text-[#F8D6A1]/65">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center -space-x-2 shrink-0">
            <img
              src="images/brand/emblem-main.png"
              alt="WAFLE Rocket Tec"
              className="w-10 h-10 rounded-full object-contain bg-[#0B0B0B] border border-[#E7B56A]/45 p-0.5"
            />
            <img
              src="images/brand/rocket-tec-sinaloa.svg"
              alt="Rocket Tec Sinaloa"
              className="w-10 h-10 rounded-full object-contain bg-[#0B0B0B] border border-[#D8903D]/45 p-0.5"
            />
          </div>
          <div>
            <span className="font-orbitron font-bold text-sm text-[#FFF3E0] tracking-wider">
              WAFLE ROCKET TEC
            </span>
            <span className="block text-[11px] font-mono text-[#E7B56A]/85 mt-0.5">
              {teamNumber} • {groupCode} • {MISSION_CONSTANTS.programName}
            </span>
            <span className="block text-[11px] font-mono text-[#F8D6A1]/50">
              {MISSION_CONSTANTS.institution} • {MISSION_CONSTANTS.campus}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 font-mono">
          {onNavigateView ? (
            <>
              <button
                type="button"
                onClick={() => onNavigateView('visual')}
                className="hover:text-[#FFF3E0] transition-colors"
              >
                Landing Page
              </button>
              <button
                type="button"
                onClick={() => onNavigateView('engineering', 'simulador')}
                className="hover:text-[#FFF3E0] transition-colors"
              >
                Simulador
              </button>
              <button
                type="button"
                onClick={() => onNavigateView('engineering', 'ingenieria')}
                className="hover:text-[#FFF3E0] transition-colors"
              >
                Subsistemas
              </button>
            </>
          ) : (
            <a href="#inicio" className="hover:text-[#FFF3E0] transition-colors">
              Inicio
            </a>
          )}
          <a
            href="#inicio"
            className="inline-flex items-center gap-1 text-[#E7B56A] hover:text-[#FFF3E0] transition-colors"
          >
            <span>Subir</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
