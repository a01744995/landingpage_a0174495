import React, { useState } from 'react';
import {
  Scale,
  Flame,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { MASS_BREAKDOWN, ENGINE_SPECS, CAD_PARTS_V10, CadPart } from '../data/rocketData';

type TabKey = 'masas' | 'propulsion' | 'recuperacion' | 'estructura';

export const MassAvionicsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('masas');
  const [showEquations, setShowEquations] = useState(false);

  // Integrated Structure Tab State
  const [selectedPart, setSelectedPart] = useState<CadPart>(CAD_PARTS_V10[0]);
  const [isSeparated, setIsSeparated] = useState<boolean>(true);

  const tabs: { id: TabKey; label: string; icon: React.ElementType }[] = [
    { id: 'masas', label: 'Masas & Aviónica', icon: Scale },
    { id: 'propulsion', label: 'Motor Estes A10-3T', icon: Flame },
    { id: 'recuperacion', label: 'Paracaídas Octogonal', icon: ShieldCheck },
    { id: 'estructura', label: 'Estructura PLA & Separación', icon: Layers },
  ];

  return (
    <section id="ingenieria" className="py-24 bg-[#0B0B0B] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header + Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D]">
              02 • SUBSISTEMAS DE INGENIERÍA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
              Especificaciones técnicas del prototipo.
            </h2>
          </div>

          {/* Clean Segmented Tabs */}
          <div className="flex flex-wrap p-1.5 rounded-2xl sm:rounded-full bg-[#14110E] border border-white/10 self-start gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#E7B56A] text-[#0B0B0B] font-semibold'
                      : 'text-[#F8D6A1]/75 hover:text-[#FFF3E0]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: MASAS & AVIÓNICA */}
        {activeTab === 'masas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-3xl bg-[#14110E] border border-white/10 p-7 sm:p-8 space-y-6">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-bold text-[#FFF3E0]">
                  Distribución de Masas
                </h3>
                <span className="font-mono text-xs text-[#E7B56A]">
                  Despegue: 70.0 g → Descenso: 34.0 g
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-white/10">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">MASA SECA</span>
                  <span className="text-xl font-bold text-[#FFF3E0] mt-1 block">55.0 g</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-white/10">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">MOTOR A10-3T</span>
                  <span className="text-xl font-bold text-[#E7B56A] mt-1 block">12–15 g</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#D8903D]/50">
                  <span className="text-[10px] text-[#E7B56A] block">DESPEGUE (m₀)</span>
                  <span className="text-xl font-bold text-[#FFF3E0] mt-1 block">70.0 g</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-[#F8D6A1]/70">
                  CARGA ÚTIL SUSPENDIDA EN DESCENSO (m_t = 34.0 g)
                </div>
                {MASS_BREAKDOWN.suspendedComponents.map((comp) => (
                  <div
                    key={comp.name}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl bg-[#0B0B0B] border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: comp.color }}
                      />
                      <span className="text-sm text-[#FFF3E0] font-medium">{comp.name}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#E7B56A]">
                      {comp.massG.toFixed(1)} g ({comp.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl bg-[#14110E] border border-white/10 p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#D8903D]">
                  INSTRUMENTACIÓN ELECTRÓNICA
                </span>
                <h3 className="font-display text-2xl font-bold text-[#FFF3E0]">
                  Bahía Barométrica en Ojiva
                </h3>
                <p className="text-sm text-[#F8D6A1]/75 leading-relaxed">
                  El fuselaje principal se separa tras la eyección y desciende de forma
                  independiente, mientras el paracaídas sostiene únicamente la ojiva con la
                  electrónica para reducir la energía de impacto a solo{' '}
                  <strong className="text-[#FFF3E0]">0.244 J</strong>.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-white/10">
                  <div className="font-semibold text-[#FFF3E0]">Altímetro Barométrico (12.0 g)</div>
                  <div className="text-xs text-[#F8D6A1]/70 mt-1">
                    Alojado en cavidad cerrada con orificios estáticos inferiores aislados de los gases de eyección.
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0B0B] border border-white/10">
                  <div className="font-semibold text-[#FFF3E0]">Amortiguación Goma EVA (5 mm)</div>
                  <div className="text-xs text-[#F8D6A1]/70 mt-1">
                    Cuna interna de Foami que absorbe el aterrizaje (equivalente a una caída libre de 73 cm).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPULSIÓN & TRAYECTORIA */}
        {activeTab === 'propulsion' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-5 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs text-[#F8D6A1]/60 block">MOTOR SÓLIDO</span>
                <span className="text-2xl font-bold text-[#FFF3E0] mt-1 block">{ENGINE_SPECS.model}</span>
              </div>
              <div className="p-5 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs text-[#F8D6A1]/60 block">IMPULSO / EMPUJE</span>
                <span className="text-2xl font-bold text-[#E7B56A] mt-1 block">2.5 Ns • 5.7 N</span>
              </div>
              <div className="p-5 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs text-[#F8D6A1]/60 block">QUEMADO / RETARDO</span>
                <span className="text-2xl font-bold text-[#FFF3E0] mt-1 block">0.5 s + 3.0 s</span>
              </div>
              <div className="p-5 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs text-[#F8D6A1]/60 block">APOGEO ESTIMADO</span>
                <span className="text-2xl font-bold text-[#E7B56A] mt-1 block">≈ 75 m (60–90 m)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="font-mono text-xs text-[#D8903D]">FASE 1 • 0.0 s → 0.5 s</span>
                <h4 className="font-display text-lg font-bold text-[#FFF3E0] mt-2">Ascenso Propulsado</h4>
                <p className="text-sm text-[#F8D6A1]/75 mt-2">
                  Combustión activa del motor Estes A10-3T con empuje medio de 5.7 N para acelerar los 70.0 g al despegue (T/W₀ = 8.30:1).
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="font-mono text-xs text-[#D8903D]">FASE 2 • 0.5 s → 3.5 s</span>
                <h4 className="font-display text-lg font-bold text-[#FFF3E0] mt-2">Inercia y Eyección</h4>
                <p className="text-sm text-[#F8D6A1]/75 mt-2">
                  Ascenso libre durante los 3.0 s de retardo desde v_max ≈ 35.8 m/s hasta el apogeo de ≈ 75 m en Culiacán (ρ = 1.16 kg/m³).
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="font-mono text-xs text-[#D8903D]">FASE 3 • 3.5 s → 23.3 s</span>
                <h4 className="font-display text-lg font-bold text-[#FFF3E0] mt-2">Descenso Controlado</h4>
                <p className="text-sm text-[#F8D6A1]/75 mt-2">
                  3 a 4 hojas de Wadding protegen el PLA (55–60 °C) y el paracaídas desciende la ojiva a 3.79 m/s durante 19.8 s.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SISTEMA DE RECUPERACIÓN & ECUACIONES */}
        {activeTab === 'recuperacion' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs font-mono text-[#D8903D]">CAMPANA OCTOGONAL</span>
                <div className="font-display text-2xl font-bold text-[#FFF3E0] mt-1">D = 27.5 cm</div>
                <p className="text-xs text-[#F8D6A1]/70 mt-2">
                  Sin spill hole. Área superficial nominal S₀ = 534.7 cm² (0.0535 m²).
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs font-mono text-[#D8903D]">MATERIAL TEXTIL</span>
                <div className="font-display text-2xl font-bold text-[#FFF3E0] mt-1">Tafeta Stretch</div>
                <p className="text-xs text-[#F8D6A1]/70 mt-2">
                  100% poliéster (≈ 65 g/m²) con bordes termosellados contra deshilachado.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs font-mono text-[#D8903D]">LÍNEAS DE SUSPENSIÓN</span>
                <div className="font-display text-2xl font-bold text-[#FFF3E0] mt-1">8 × 30.0 cm</div>
                <p className="text-xs text-[#F8D6A1]/70 mt-2">
                  Hilo 100% Nylon Omega No. 2 con refuerzos adhesivos en vértices (0.44 N/línea).
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#14110E] border border-white/10">
                <span className="text-xs font-mono text-[#D8903D]">SHOCK CORD & WADDING</span>
                <div className="font-display text-2xl font-bold text-[#FFF3E0] mt-1">Elástico 52 cm</div>
                <p className="text-xs text-[#F8D6A1]/70 mt-2">
                  Amortigua el tirón de apertura (3.49 N) + 3–4 hojas de papel ignífugo.
                </p>
              </div>
            </div>

            {/* Clean Collapsible Accordion for Physical Equations */}
            <div className="rounded-3xl bg-[#14110E] border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowEquations(!showEquations)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-[#D8903D] uppercase block">
                    FUNDAMENTO FÍSICO-MATEMÁTICO
                  </span>
                  <span className="font-display font-bold text-base text-[#FFF3E0]">
                    Ver ecuaciones del modelo de descenso (S₀, v_t, t_d, E_k, F_apertura)
                  </span>
                </div>
                {showEquations ? (
                  <ChevronUp className="w-5 h-5 text-[#E7B56A]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#E7B56A]" />
                )}
              </button>

              {showEquations && (
                <div className="p-6 pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-[#0B0B0B]">
                    <div className="text-[#F8D6A1]/60">1. Área Octogonal (S₀)</div>
                    <div className="text-sm font-bold text-[#FFF3E0] mt-1">S₀ = 2√2 · R² = 534.7 cm²</div>
                    <div className="text-[#E7B56A] mt-1">Con spill hole 10%: A_ef = 0.99 · S₀</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B0B0B]">
                    <div className="text-[#F8D6A1]/60">2. Velocidad Terminal (v_t)</div>
                    <div className="text-sm font-bold text-[#FFF3E0] mt-1">v_t = √(2·m_t·g / ρ·C_d·S₀)</div>
                    <div className="text-[#E7B56A] mt-1">Prototipo: 3.79 m/s (3.89 m/s osc.)</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B0B0B]">
                    <div className="text-[#F8D6A1]/60">3. Tiempo de Descenso (t_d)</div>
                    <div className="text-sm font-bold text-[#FFF3E0] mt-1">t_d = h / v_t = 19.8 s</div>
                    <div className="text-[#E7B56A] mt-1">Para h ≈ 75 m en Culiacán</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B0B0B]">
                    <div className="text-[#F8D6A1]/60">4. Energía de Impacto (E_k)</div>
                    <div className="text-sm font-bold text-[#FFF3E0] mt-1">E_k = ½·m_t·v_t² = 0.244 J</div>
                    <div className="text-[#E7B56A] mt-1">Caída equivalente h_eq = v_t²/2g = 73 cm</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B0B0B] sm:col-span-2">
                    <div className="text-[#F8D6A1]/60">5. Fuerza de Apertura (v₀ = 10 m/s, C_x = 1.5)</div>
                    <div className="text-sm font-bold text-[#FFF3E0] mt-1">
                      F_apertura = ½ · ρ · v₀² · C_d · S₀ · C_x = 3.49 N totales (0.44 N por línea)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: ESTRUCTURA PLA & SEPARACIÓN DE ETAPAS (SUBTLE CAD LINKS) */}
        {activeTab === 'estructura' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Animated Rocket Separation SVG */}
            <div className="lg:col-span-5 rounded-3xl bg-[#14110E] border border-white/10 p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-4 mb-2 border-b border-white/10">
                <span className="text-xs font-mono text-[#F8D6A1]/70">
                  {isSeparated ? 'Separación de etapas' : 'Vehículo ensamblado'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSeparated(!isSeparated)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-[#E7B56A] transition-colors"
                >
                  {isSeparated ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span>{isSeparated ? 'Ensamblar' : 'Mostrar separación'}</span>
                </button>
              </div>

              <svg
                viewBox="0 0 340 500"
                className="w-full max-w-[260px] h-auto select-none my-2"
                role="img"
                aria-label="Diagrama animado de la estructura en PLA y separación del cohete WAFLE"
              >
                <line
                  x1="170"
                  y1="20"
                  x2="170"
                  y2="480"
                  stroke="#E7B56A"
                  strokeOpacity="0.18"
                  strokeDasharray="4 4"
                />

                {/* 01 Ojiva A */}
                <g
                  onClick={() => setSelectedPart(CAD_PARTS_V10[0])}
                  className="cursor-pointer transition-transform duration-700"
                  style={{ transform: `translateY(${isSeparated ? -28 : 0}px)` }}
                >
                  <path
                    d="M170 40 C144 83, 138 119, 138 147 L202 147 C202 119, 196 83, 170 40 Z"
                    fill={selectedPart.id === 'pieza-01' ? '#D8903D' : '#1E1813'}
                    stroke={selectedPart.id === 'pieza-01' ? '#FFF3E0' : '#E7B56A'}
                    strokeWidth="2"
                  />
                  <text x="218" y="110" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                    Ojiva A
                  </text>
                </g>

                {/* 02 Tapa Ojiva B */}
                <g
                  onClick={() => setSelectedPart(CAD_PARTS_V10[1])}
                  className="cursor-pointer transition-transform duration-700"
                  style={{ transform: `translateY(${isSeparated ? -10 : 0}px)` }}
                >
                  <rect
                    x="138"
                    y="149"
                    width="64"
                    height="20"
                    rx="2"
                    fill={selectedPart.id === 'pieza-02' ? '#D8903D' : '#282019'}
                    stroke={selectedPart.id === 'pieza-02' ? '#FFF3E0' : '#E7B56A'}
                    strokeWidth="2"
                  />
                  <text x="122" y="163" textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                    Tapa B
                  </text>
                </g>

                {/* 03 Cuerpo */}
                <g
                  onClick={() => setSelectedPart(CAD_PARTS_V10[2])}
                  className="cursor-pointer transition-transform duration-700"
                  style={{ transform: `translateY(${isSeparated ? 14 : 0}px)` }}
                >
                  <rect
                    x="138"
                    y="177"
                    width="64"
                    height="170"
                    rx="3"
                    fill={selectedPart.id === 'pieza-03' ? '#D8903D' : '#1E1813'}
                    stroke={selectedPart.id === 'pieza-03' ? '#FFF3E0' : '#E7B56A'}
                    strokeWidth="2"
                  />
                  <text x="218" y="265" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                    Fuselaje
                  </text>
                </g>

                {/* 06 Portaguía */}
                <g
                  onClick={() => setSelectedPart(CAD_PARTS_V10[3])}
                  className="cursor-pointer transition-transform duration-700"
                  style={{ transform: `translate(${isSeparated ? -12 : 0}px, ${isSeparated ? 14 : 0}px)` }}
                >
                  <rect
                    x="126"
                    y="240"
                    width="10"
                    height="42"
                    rx="2"
                    fill={selectedPart.id === 'pieza-06' ? '#E7B56A' : '#2C221A'}
                    stroke="#FFF3E0"
                    strokeWidth="1.5"
                  />
                  <text x="115" y="265" textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                    Portaguía
                  </text>
                </g>

                {/* 05 Alerones */}
                <g
                  onClick={() => setSelectedPart(CAD_PARTS_V10[4])}
                  className="cursor-pointer transition-transform duration-700"
                  style={{ transform: `translateY(${isSeparated ? 24 : 0}px)` }}
                >
                  <polygon
                    points="138,300 95,313 95,360 138,352"
                    fill={selectedPart.id === 'pieza-05' ? '#D8903D' : '#282019'}
                    stroke={selectedPart.id === 'pieza-05' ? '#FFF3E0' : '#E7B56A'}
                    strokeWidth="2"
                  />
                  <polygon
                    points="202,300 245,313 245,360 202,352"
                    fill={selectedPart.id === 'pieza-05' ? '#D8903D' : '#282019'}
                    stroke={selectedPart.id === 'pieza-05' ? '#FFF3E0' : '#E7B56A'}
                    strokeWidth="2"
                  />
                  <text x="255" y="340" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                    Alerones
                  </text>
                </g>

                {/* 04 PortaMotor A */}
                <g
                  onClick={() => setSelectedPart(CAD_PARTS_V10[5])}
                  className="cursor-pointer transition-transform duration-700"
                  style={{ transform: `translateY(${isSeparated ? 48 : 0}px)` }}
                >
                  <rect
                    x="148"
                    y="357"
                    width="44"
                    height="55"
                    rx="3"
                    fill={selectedPart.id === 'pieza-04' ? '#D8903D' : '#231B14'}
                    stroke={selectedPart.id === 'pieza-04' ? '#FFF3E0' : '#D8903D'}
                    strokeWidth="2"
                  />
                  <text x="128" y="390" textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                    PortaMotor
                  </text>
                </g>
              </svg>
            </div>

            {/* Right: Lightweight Part Pills + Physical Spec Card */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap gap-2">
                {CAD_PARTS_V10.map((part) => {
                  const active = selectedPart.id === part.id;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      onClick={() => setSelectedPart(part)}
                      className={`px-3.5 py-2 rounded-full text-xs font-mono transition-all ${
                        active
                          ? 'bg-[#E7B56A] text-[#0B0B0B] font-bold shadow-glow-amber'
                          : 'bg-[#14110E] text-[#F8D6A1]/80 hover:text-[#FFF3E0] border border-white/10'
                      }`}
                    >
                      {part.codeName}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-3xl bg-[#14110E] border border-white/10 p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[#D8903D] uppercase">
                      {selectedPart.subsystem}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#FFF3E0] mt-1">
                      {selectedPart.name}
                    </h3>
                  </div>

                  <a
                    href={`/cad/${encodeURIComponent(selectedPart.fileName)}`}
                    download={selectedPart.fileName}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[#E7B56A] font-mono text-[11px] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Archivo .SLDPRT</span>
                  </a>
                </div>

                <p className="text-sm text-[#F8D6A1]/80 leading-relaxed">
                  {selectedPart.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-[#F8D6A1]/50 block">MATERIAL & ORIENTACIÓN</span>
                    <span className="text-[#FFF3E0] mt-1 block">{selectedPart.material} • Vertical</span>
                  </div>
                  <div>
                    <span className="text-[#F8D6A1]/50 block">RESTRICCIÓN TÉRMICA / MASA</span>
                    <span className="text-[#E7B56A] mt-1 block">{selectedPart.massInfo} (Límite 55–60 °C)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
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
        )}
      </div>
    </section>
  );
};
