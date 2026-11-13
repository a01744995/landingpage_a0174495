import React from 'react';
import { ShieldCheck, Compass, Layers, Flame, Anchor, Sigma, CheckCircle2 } from 'lucide-react';

export const RecoveryPhysicsSection: React.FC = () => {
  const prototypeSpecs = [
    {
      title: 'Geometría de Campana Octogonal Plana',
      value: 'D = 27.5 cm (0.275 m)',
      detail: 'Octágono regular sin orificio central (spill hole). Área superficial nominal S₀ = 534.7 cm² (0.0535 m²).',
    },
    {
      title: 'Material Textil & Sellado Térmico',
      value: 'Tafeta Stretch (≈ 65 g/m²)',
      detail: '100% poliéster de alta tenacidad con bordes termosellados para prevenir el deshilachado ante el choque de apertura.',
    },
    {
      title: 'Líneas de Suspensión Simétricas',
      value: '8 Líneas × 30.0 cm',
      detail: 'Hilo 100% Nylon Omega No. 2 de 30.0 cm de longitud útil cada una, fijadas con refuerzos adhesivos en los 8 vértices.',
    },
    {
      title: 'Cordón de Choque (Shock Cord)',
      value: 'Elástico ≈ 52.0 cm',
      detail: 'Une el cáncamo de la ojiva con el nudo central de las líneas para amortiguar el tirón de eyección (F_apertura = 3.49 N).',
    },
    {
      title: 'Barrera Térmica (Wadding)',
      value: '3 a 4 Hojas Ignífugas',
      detail: 'Papel ignífugo o servilletas de celulosa colocadas sobre el motor Estes A10-3T para bloquear las llamas de eyección.',
    },
  ];

  const equations = [
    {
      code: 'EQ-01',
      name: 'Área Superficial de Campana Octogonal (S₀)',
      formula: 'S₀ = 2√2 · R²   (donde D = 2R)',
      subFormula: 'Con spill hole (d_s = 0.1D):  A_ef = 0.99 · S₀',
      evaluation: 'Para R = 0.1375 m (D = 27.5 cm) → S₀ = 534.7 cm² (0.0535 m²)',
      purpose: 'Determina la superficie aerodinámica efectiva expuesta al flujo durante el descenso vertical.',
    },
    {
      code: 'EQ-02',
      name: 'Velocidad Terminal de Descenso (v_t)',
      formula: 'v_t = √[ (2 · m_t · g) / (ρ · C_d · S₀) ]',
      subFormula: 'Equilibrio dinámico: W = m_t · g = ½ · ρ · v_t² · C_d · S₀',
      evaluation: 'Con m_t = 0.034 kg, ρ = 1.16 kg/m³, C_d = 0.75 → v_t = 3.79 m/s (3.89 m/s con C_d = 0.71)',
      purpose: 'Garantiza una velocidad de toque suave que preserve la integridad de la ojiva de PLA y el altímetro.',
    },
    {
      code: 'EQ-03',
      name: 'Tiempo Total de Descenso (t_d)',
      formula: 't_d = h / v_t',
      subFormula: 'Desde el apogeo estimado (h ≈ 75 m) hasta el aterrizaje',
      evaluation: 'Para h = 75 m y v_t = 3.79 m/s → t_d = 19.8 segundos',
      purpose: 'Define la ventana temporal de recuperación y deriva por viento tras la eyección en t = 3.5 s.',
    },
    {
      code: 'EQ-04',
      name: 'Energía Cinética al Impacto (E_k) y Caída Equivalente (h_eq)',
      formula: 'E_k = ½ · m_t · v_t²     ;     h_eq = v_t² / (2g)',
      subFormula: 'Criterio de seguridad estructural para ojiva PLA + altímetro',
      evaluation: 'E_k = 0.244 J  |  h_eq = 0.73 m (equivalente a caída libre desde 73 cm)',
      purpose: 'Demuestra que el impacto es absorbido holgadamente por la cuna interna de Goma EVA de 5 mm.',
    },
    {
      code: 'EQ-05',
      name: 'Fuerza de Choque en la Apertura (F_apertura)',
      formula: 'F_apertura = ½ · ρ · v₀² · C_d · S₀ · C_x',
      subFormula: 'Velocidad remanente v₀ ≈ 10 m/s  |  Factor de inflación C_x ≈ 1.5',
      evaluation: 'F_apertura = 3.49 N totales  →  0.44 N de tensión por cada una de las 8 líneas',
      purpose: 'Verifica que los vértices reforzados y las 8 líneas de Nylon Omega No. 2 operan con amplio factor de seguridad.',
    },
  ];

  return (
    <section
      id="recuperacion"
      className="py-20 md:py-28 bg-[#0B0B0B] border-t border-[#E7B56A]/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8903D]/15 border border-[#D8903D]/35 text-[#E7B56A] text-xs font-mono uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              MÓDULO 04 • RECUPERACIÓN & MODELO FÍSICO-MATEMÁTICO
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF3E0] tracking-tight">
              Paracaídas Octogonal & Ecuaciones de Descenso
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#F8D6A1]/80 max-w-xl">
            Ingeniería de detalle del prototipo físico construido en el Campus Culiacán y formulación matemática
            rigurosa del equilibrio aerodinámico e impacto estructural.
          </p>
        </div>

        {/* Top Grid: Octagonal Canopy CAD Blueprint + Prototype Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Left 5 Cols: Octagonal Canopy Geometric SVG */}
          <div className="lg:col-span-5 rounded-3xl bg-[#13100D] border border-[#E7B56A]/25 p-6 flex flex-col justify-between bg-blueprint-grid">
            <div className="flex items-center justify-between border-b border-[#E7B56A]/15 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8903D] block">
                  GEOMETRÍA DEL PROTOTIPO REAL
                </span>
                <h3 className="font-display text-lg font-bold text-[#FFF3E0]">
                  Campana Octogonal Plana (S₀ = 534.7 cm²)
                </h3>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#D8903D]/20 text-[#E7B56A]">
                D = 27.5 cm
              </span>
            </div>

            <div className="my-4 flex items-center justify-center">
              <svg
                viewBox="0 0 320 300"
                className="w-full max-w-[290px] h-auto"
                role="img"
                aria-label="Geometría octogonal del paracaídas WAFLE Rocket Tec con 8 líneas de suspensión"
              >
                {/* Circumscribed Circle R = 13.75 cm */}
                <circle
                  cx="160"
                  cy="140"
                  r="105"
                  fill="none"
                  stroke="#E7B56A"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />

                {/* Regular Octagon Centered at (160, 140), R = 105 */}
                <polygon
                  points="265,140 234.2,214.2 160,245 85.8,214.2 55,140 85.8,65.8 160,35 234.2,65.8"
                  fill="#261C14"
                  fillOpacity="0.9"
                  stroke="#D8903D"
                  strokeWidth="2.5"
                />

                {/* Radial Gore Lines (8 vertices) */}
                <line x1="55" y1="140" x2="265" y2="140" stroke="#E7B56A" strokeOpacity="0.35" strokeWidth="1" />
                <line x1="160" y1="35" x2="160" y2="245" stroke="#E7B56A" strokeOpacity="0.35" strokeWidth="1" />
                <line x1="85.8" y1="65.8" x2="234.2" y2="214.2" stroke="#E7B56A" strokeOpacity="0.35" strokeWidth="1" />
                <line x1="234.2" y1="65.8" x2="85.8" y2="214.2" stroke="#E7B56A" strokeOpacity="0.35" strokeWidth="1" />

                {/* 8 Vertex Adhesive Reinforcements */}
                {[
                  [265, 140],
                  [234.2, 214.2],
                  [160, 245],
                  [85.8, 214.2],
                  [55, 140],
                  [85.8, 65.8],
                  [160, 35],
                  [234.2, 65.8],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="4.5" fill="#E7B56A" stroke="#0B0B0B" strokeWidth="1.5" />
                ))}

                {/* Diameter Dimension Line */}
                <line x1="55" y1="272" x2="265" y2="272" stroke="#FFF3E0" strokeWidth="1.2" />
                <line x1="55" y1="266" x2="55" y2="278" stroke="#FFF3E0" strokeWidth="1.2" />
                <line x1="265" y1="266" x2="265" y2="278" stroke="#FFF3E0" strokeWidth="1.2" />
                <text x="160" y="288" textAnchor="middle" fill="#FFF3E0" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                  Diámetro Circunscrito D = 27.5 cm (2R)
                </text>

                {/* Center Badge */}
                <rect x="108" y="122" width="104" height="36" rx="6" fill="#0B0B0B" stroke="#E7B56A" strokeWidth="1.2" />
                <text x="160" y="137" textAnchor="middle" fill="#FFF3E0" fontSize="9.5" fontFamily="JetBrains Mono" fontWeight="bold">
                  S₀ = 534.7 cm²
                </text>
                <text x="160" y="150" textAnchor="middle" fill="#D8903D" fontSize="8" fontFamily="JetBrains Mono">
                  SIN SPILL HOLE
                </text>
              </svg>
            </div>

            <div className="pt-3 border-t border-[#E7B56A]/15 flex items-center justify-between text-xs font-mono text-[#F8D6A1]/75">
              <span>8 vértices con refuerzo adhesivo</span>
              <span className="text-[#E7B56A]">0.44 N / línea</span>
            </div>
          </div>

          {/* Right 7 Cols: 5 Built Prototype Spec Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-3">
            {prototypeSpecs.map((spec, idx) => (
              <div
                key={spec.title}
                className="p-4 sm:p-5 rounded-2xl bg-[#14110E] border border-[#E7B56A]/20 hover:border-[#D8903D] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D8903D]/20 text-[#E7B56A]">
                      SPEC-0{idx + 1}
                    </span>
                    <h4 className="font-display font-bold text-base text-[#FFF3E0]">{spec.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F8D6A1]/80 leading-relaxed">{spec.detail}</p>
                </div>
                <div className="sm:text-right font-mono shrink-0">
                  <span className="inline-block px-3 py-1.5 rounded-xl bg-[#0B0B0B] border border-[#E7B56A]/30 text-xs sm:text-sm font-bold text-[#E7B56A]">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equations Matrix */}
        <div className="rounded-3xl bg-[#13100D] border border-[#E7B56A]/30 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E7B56A]/15">
            <div className="flex items-center gap-2.5">
              <Sigma className="w-6 h-6 text-[#D8903D]" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D] block">
                  FUNDAMENTO TEÓRICO & MODELADO FÍSICO
                </span>
                <h3 className="font-display text-2xl font-bold text-[#FFF3E0]">
                  Ecuaciones Físicas del Modelo de Descenso
                </h3>
              </div>
            </div>
            <span className="font-mono text-xs text-[#F8D6A1]/75 bg-[#0B0B0B] px-3.5 py-1.5 rounded-xl border border-[#E7B56A]/20">
              Parámetros Culiacán: ρ = 1.16 kg/m³ • g = 9.81 m/s² • h = 75 m
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equations.map((eq) => (
              <div
                key={eq.code}
                className="p-5 rounded-2xl bg-[#0B0B0B]/90 border border-[#E7B56A]/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D8903D] mb-2">
                    <span>{eq.code}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E7B56A]" />
                  </div>
                  <h4 className="font-display font-bold text-base text-[#FFF3E0]">{eq.name}</h4>

                  <div className="my-3 p-3 rounded-xl bg-[#16120E] border border-[#D8903D]/35 font-mono">
                    <div className="text-sm font-bold text-[#FFF3E0]">{eq.formula}</div>
                    <div className="text-[11px] text-[#E7B56A] mt-1">{eq.subFormula}</div>
                  </div>

                  <p className="text-xs text-[#F8D6A1]/75 leading-relaxed">{eq.purpose}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7B56A]/15 text-[11px] font-mono text-[#E7B56A]">
                  {eq.evaluation}
                </div>
              </div>
            ))}

            {/* Summary Validation Box (6th card in grid) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#261C14] to-[#14100C] border border-[#D8903D] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#E7B56A] block mb-2">
                  DICTAMEN DE SEGURIDAD ESTRUCTURAL
                </span>
                <h4 className="font-display font-bold text-lg text-[#FFF3E0]">
                  Integridad de Ojiva PLA y Altímetro Garantizada
                </h4>
                <p className="text-xs text-[#F8D6A1]/85 mt-2.5 leading-relaxed">
                  Con una energía cinética al impacto de apenas <strong className="text-[#FFF3E0]">0.244 J</strong>{' '}
                  (equivalente a soltar la ojiva desde <strong className="text-[#FFF3E0]">73 cm</strong> de altura) y
                  una tensión por línea de <strong className="text-[#FFF3E0]">0.44 N</strong> en la apertura, el
                  prototipo real construido cumple todos los criterios mecánicos y térmicos para el lanzamiento.
                </p>
              </div>
              <a
                href="#simulador"
                className="mt-4 inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#D8903D] text-[#0B0B0B] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#E7B56A] transition-colors"
              >
                Comprobar en el Simulador Interactivo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
