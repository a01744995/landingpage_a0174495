import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { BRAND_PALETTE } from '../data/rocketData';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Kit de Logos e Identidad Visual WAFLE Rocket Project"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#120F0C] border border-[#E7B56A]/40 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E7B56A]/20">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#D8903D]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8903D] block">
                DOCUMENTO DE IDENTIDAD CORPORATIVA • VERSIÓN 1.0
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFF3E0]">
                WAFLE Rocket Project — Guía Oficial de Identidad Visual
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1C1612] border border-[#E7B56A]/30 text-[#FFF3E0] hover:text-[#D8903D] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Brand Kit Sheet Image */}
        <div className="rounded-2xl overflow-hidden border border-[#E7B56A]/30 bg-[#FFF3E0] mb-6">
          <img
            src="images/brand/brand-kit-guide.png"
            alt="Lámina de Identidad Visual WAFLE Rocket Project"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Dual Brand Logos Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#E7B56A]/25 flex items-center gap-4">
            <img
              src="images/brand/emblem-main.png"
              alt="Logotipo Oficial WAFLE Rocket Tec"
              className="w-16 h-16 object-contain shrink-0"
            />
            <div>
              <div className="font-display font-bold text-sm text-[#FFF3E0]">
                Logotipo del Equipo WAFLE
              </div>
              <p className="text-xs text-[#F8D6A1]/70 mt-0.5">
                Emblema oficial de identidad con inspiración wafle, caramelo y chocolate.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#E7B56A]/25 flex items-center gap-4">
            <img
              src="images/brand/rocket-tec-sinaloa.svg"
              alt="Logotipo Oficial Rocket Tec Sinaloa"
              className="w-16 h-16 object-contain shrink-0"
            />
            <div>
              <div className="font-display font-bold text-sm text-[#FFF3E0]">
                Logotipo Rocket Tec Sinaloa
              </div>
              <p className="text-xs text-[#F8D6A1]/70 mt-0.5">
                Insignia institucional del programa aeroespacial en Campus Culiacán.
              </p>
            </div>
          </div>
        </div>

        {/* Color Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BRAND_PALETTE.map((color) => (
            <div
              key={color.hex}
              className="p-3 rounded-2xl bg-[#0B0B0B] border border-[#E7B56A]/20 flex flex-col justify-between"
            >
              <div
                className="w-full h-12 rounded-xl border border-white/15 mb-2.5"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="font-display font-bold text-xs text-[#FFF3E0]">{color.name}</div>
                <div className="font-mono text-xs text-[#E7B56A] font-semibold mt-0.5">{color.hex}</div>
                <div className="text-[10px] text-[#F8D6A1]/65 mt-1 leading-tight">{color.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
