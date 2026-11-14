import React, { useState } from 'react';
import { Maximize2, Minimize2, Download, CheckCircle2 } from 'lucide-react';
import { CAD_PARTS_V10, CadPart } from '../data/rocketData';

export const ArchitectureSection: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<CadPart>(CAD_PARTS_V10[0]);
  const [isExploded, setIsExploded] = useState<boolean>(true);

  return (
    <section id="arquitectura" className="py-24 bg-[#0E0C0A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D]">
            01 • ARQUITECTURA ESTRUCTURAL CAD V10
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
            6 piezas impresas en PLA vertical.
          </h2>
          <p className="text-sm sm:text-base text-[#F8D6A1]/70 mt-3 leading-relaxed">
            Selecciona cualquier pieza en el diagrama o en la lista para inspeccionar su función y
            descargar su archivo original de SolidWorks (<span className="font-mono text-[#E7B56A]">.SLDPRT</span>).
          </p>
        </div>

        {/* Clean 2-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Clean Interactive Blueprint */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B0B0B] border border-white/10 p-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-4 mb-2 border-b border-white/10">
              <span className="text-xs font-mono text-[#F8D6A1]/70">
                {isExploded ? 'Vista en despiece' : 'Vista ensamblada'}
              </span>
              <button
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-[#E7B56A] transition-colors"
              >
                {isExploded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isExploded ? 'Ensamblar' : 'Separar piezas'}</span>
              </button>
            </div>

            <svg
              viewBox="0 0 340 520"
              className="w-full max-w-[280px] h-auto select-none my-2"
              role="img"
              aria-label="Despiece interactivo del cohete WAFLE V10"
            >
              <line
                x1="170"
                y1="20"
                x2="170"
                y2="500"
                stroke="#E7B56A"
                strokeOpacity="0.18"
                strokeDasharray="4 4"
              />

              {/* 01 Ojiva A */}
              <g
                onClick={() => setSelectedPart(CAD_PARTS_V10[0])}
                className="cursor-pointer transition-transform duration-500"
                style={{ transform: `translateY(${isExploded ? -32 : 0}px)` }}
              >
                <path
                  d="M170 45 C144 88, 138 124, 138 152 L202 152 C202 124, 196 88, 170 45 Z"
                  fill={selectedPart.id === 'pieza-01' ? '#D8903D' : '#1E1813'}
                  stroke={selectedPart.id === 'pieza-01' ? '#FFF3E0' : '#E7B56A'}
                  strokeWidth="2"
                />
                <text x="220" y="115" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                  01 Ojiva A
                </text>
              </g>

              {/* 02 Tapa Ojiva B */}
              <g
                onClick={() => setSelectedPart(CAD_PARTS_V10[1])}
                className="cursor-pointer transition-transform duration-500"
                style={{ transform: `translateY(${isExploded ? -12 : 0}px)` }}
              >
                <rect
                  x="138"
                  y="154"
                  width="64"
                  height="20"
                  rx="2"
                  fill={selectedPart.id === 'pieza-02' ? '#D8903D' : '#282019'}
                  stroke={selectedPart.id === 'pieza-02' ? '#FFF3E0' : '#E7B56A'}
                  strokeWidth="2"
                />
                <text x="120" y="168" textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                  02 Tapa B
                </text>
              </g>

              {/* 03 Cuerpo */}
              <g
                onClick={() => setSelectedPart(CAD_PARTS_V10[2])}
                className="cursor-pointer transition-transform duration-500"
                style={{ transform: `translateY(${isExploded ? 10 : 0}px)` }}
              >
                <rect
                  x="138"
                  y="182"
                  width="64"
                  height="175"
                  rx="3"
                  fill={selectedPart.id === 'pieza-03' ? '#D8903D' : '#1E1813'}
                  stroke={selectedPart.id === 'pieza-03' ? '#FFF3E0' : '#E7B56A'}
                  strokeWidth="2"
                />
                <text x="220" y="270" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                  03 Cuerpo
                </text>
              </g>

              {/* 06 Portaguía */}
              <g
                onClick={() => setSelectedPart(CAD_PARTS_V10[3])}
                className="cursor-pointer transition-transform duration-500"
                style={{ transform: `translate(${isExploded ? -14 : 0}px, ${isExploded ? 10 : 0}px)` }}
              >
                <rect
                  x="126"
                  y="245"
                  width="10"
                  height="42"
                  rx="2"
                  fill={selectedPart.id === 'pieza-06' ? '#E7B56A' : '#2C221A'}
                  stroke="#FFF3E0"
                  strokeWidth="1.5"
                />
                <text x="115" y="270" textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                  06 Guía
                </text>
              </g>

              {/* 05 Alerones */}
              <g
                onClick={() => setSelectedPart(CAD_PARTS_V10[4])}
                className="cursor-pointer transition-transform duration-500"
                style={{ transform: `translateY(${isExploded ? 22 : 0}px)` }}
              >
                <polygon
                  points="138,305 95,318 95,365 138,357"
                  fill={selectedPart.id === 'pieza-05' ? '#D8903D' : '#282019'}
                  stroke={selectedPart.id === 'pieza-05' ? '#FFF3E0' : '#E7B56A'}
                  strokeWidth="2"
                />
                <polygon
                  points="202,305 245,318 245,365 202,357"
                  fill={selectedPart.id === 'pieza-05' ? '#D8903D' : '#282019'}
                  stroke={selectedPart.id === 'pieza-05' ? '#FFF3E0' : '#E7B56A'}
                  strokeWidth="2"
                />
                <text x="255" y="345" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                  05 Alerones
                </text>
              </g>

              {/* 04 PortaMotor A */}
              <g
                onClick={() => setSelectedPart(CAD_PARTS_V10[5])}
                className="cursor-pointer transition-transform duration-500"
                style={{ transform: `translateY(${isExploded ? 55 : 0}px)` }}
              >
                <rect
                  x="148"
                  y="362"
                  width="44"
                  height="55"
                  rx="3"
                  fill={selectedPart.id === 'pieza-04' ? '#D8903D' : '#231B14'}
                  stroke={selectedPart.id === 'pieza-04' ? '#FFF3E0' : '#D8903D'}
                  strokeWidth="2"
                />
                <text x="128" y="395" textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                  04 PortaMotor
                </text>
              </g>
            </svg>
          </div>

          {/* Right: Simple Part Pills + Clean Focused Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tabs for the 6 Parts */}
            <div className="flex flex-wrap gap-2">
              {CAD_PARTS_V10.map((part) => {
                const active = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedPart(part)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                      active
                        ? 'bg-[#E7B56A] text-[#0B0B0B] font-bold shadow-glow-amber'
                        : 'bg-[#14110E] text-[#F8D6A1]/80 hover:text-[#FFF3E0] border border-white/10'
                    }`}
                  >
                    {part.partNumber.replace(' — V10', '')}: {part.codeName}
                  </button>
                );
              })}
            </div>

            {/* Clean Detail Card */}
            <div className="rounded-3xl bg-[#14110E] border border-white/10 p-7 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#D8903D] uppercase">
                    {selectedPart.subsystem}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF3E0] mt-1">
                    {selectedPart.name}
                  </h3>
                </div>

                <a
                  href={`cad/${encodeURIComponent(selectedPart.fileName)}`}
                  download={selectedPart.fileName}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E7B56A] hover:bg-[#FFF3E0] text-[#0B0B0B] font-mono text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar CAD (.SLDPRT)</span>
                </a>
              </div>

              <p className="text-sm sm:text-base text-[#F8D6A1]/80 leading-relaxed">
                {selectedPart.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[#F8D6A1]/50 block">MATERIAL E IMPRESIÓN</span>
                  <span className="text-[#FFF3E0] mt-1 block">{selectedPart.material} (Vertical)</span>
                </div>
                <div>
                  <span className="text-[#F8D6A1]/50 block">MASA / CONDICIÓN TÉRMICA</span>
                  <span className="text-[#E7B56A] mt-1 block">{selectedPart.massInfo}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {selectedPart.engineeringSpecs.slice(0, 2).map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F8D6A1]/75">
                    <CheckCircle2 className="w-4 h-4 text-[#D8903D] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
