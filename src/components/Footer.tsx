import React from 'react';
import { ArrowUp } from 'lucide-react';
import { MISSION_CONSTANTS } from '../data/rocketData';

interface FooterProps {
  onNavigateView?: (mode: 'visual' | 'engineering', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateView }) => {
  return (
    <footer className="bg-[#080706] border-t border-white/10 py-12 text-xs text-[#F8D6A1]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="images/brand/emblem-main.jpg"
            alt="WAFLE Rocket Tec"
            className="w-9 h-9 rounded-full object-cover border border-[#E7B56A]/30"
          />
          <div>
            <span className="font-display font-bold text-sm text-[#FFF3E0]">WAFLE ROCKET TEC</span>
            <span className="block text-[11px] font-mono text-[#F8D6A1]/50">
              {MISSION_CONSTANTS.institution} • {MISSION_CONSTANTS.campus}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono">
          {onNavigateView ? (
            <>
              <button
                type="button"
                onClick={() => onNavigateView('visual')}
                className="hover:text-[#FFF3E0] transition-colors"
              >
                Portada Visual
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
            className="inline-flex items-center gap-1 text-[#E7B56A] hover:text-[#FFF3E0]"
          >
            <span>Subir</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
