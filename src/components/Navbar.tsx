import React, { useState, useEffect } from 'react';
import { Gauge, Eye } from 'lucide-react';

interface NavbarProps {
  viewMode: 'visual' | 'engineering';
  onToggleViewMode: (mode: 'visual' | 'engineering') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onToggleViewMode,
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
          ? 'bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => {
              onToggleViewMode('visual');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left"
          >
            <img
              src="images/brand/emblem-main.jpg"
              alt="WAFLE Rocket Tec"
              className="w-10 h-10 rounded-full object-cover border border-[#E7B56A]/50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-lg tracking-wider text-[#FFF3E0]">
                WAFLE
              </span>
              <span className="text-xs font-mono text-[#E7B56A] hidden sm:inline">
                ROCKET TEC
              </span>
            </div>
          </button>

          {/* Mode Switcher Pill */}
          <div className="flex items-center p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
            <button
              type="button"
              onClick={() => {
                onToggleViewMode('visual');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'visual'
                  ? 'bg-[#E7B56A] text-[#0B0B0B] font-bold shadow-glow-amber'
                  : 'text-[#F8D6A1]/80 hover:text-[#FFF3E0]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Portada Visual</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onToggleViewMode('engineering');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'engineering'
                  ? 'bg-[#E7B56A] text-[#0B0B0B] font-bold shadow-glow-amber'
                  : 'text-[#F8D6A1]/80 hover:text-[#FFF3E0]'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Ingeniería & Simulador</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
