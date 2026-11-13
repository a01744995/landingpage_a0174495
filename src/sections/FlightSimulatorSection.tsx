import React, { useState, useMemo, useEffect } from 'react';
import { RotateCcw, ChevronDown, ChevronUp, Play, Pause, Flame, ShieldCheck, ArrowUpRight } from 'lucide-react';
import {
  PARACHUTE_PRESETS,
  MISSION_CONSTANTS,
  FULL_ROCKET_PREDICTIONS,
  ParachutePreset,
} from '../data/rocketData';

export const FlightSimulatorSection: React.FC = () => {
  const [activePresetId, setActivePresetId] = useState<string>(PARACHUTE_PRESETS[0].id);
  const [diameterCm, setDiameterCm] = useState<number>(27.5);
  const [massG, setMassG] = useState<number>(34.0);
  const [cd, setCd] = useState<number>(0.75);
  const [apogeeM, setApogeeM] = useState<number>(75.0);
  const [spillHole, setSpillHole] = useState<boolean>(false);
  const [geometryType, setGeometryType] = useState<ParachutePreset['geometryType']>('octagonal-solid');
  const [showTable, setShowTable] = useState<boolean>(false);

  // Real-time animated flight playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);

  const handleSelectPreset = (preset: ParachutePreset) => {
    setActivePresetId(preset.id);
    setDiameterCm(preset.diameterCm);
    setMassG(preset.massG);
    setCd(preset.cd);
    setApogeeM(75.0);
    setSpillHole(preset.spillHoleRatio > 0);
    setGeometryType(preset.geometryType);
    setSimTime(0);
    setIsPlaying(true);
  };

  const simResults = useMemo(() => {
    const rho = MISSION_CONSTANTS.airDensityRho;
    const g = MISSION_CONSTANTS.gravityG;
    const v0 = MISSION_CONSTANTS.remnantDeploymentVelocityV0;
    const cx = MISSION_CONSTANTS.openingShockFactorCx;

    const massKg = massG / 1000;
    const radiusM = diameterCm / 200;

    let s0M2 = 2 * Math.SQRT2 * radiusM * radiusM;
    if (geometryType === 'cruciform' || geometryType === 'hemispherical') {
      s0M2 = Math.PI * radiusM * radiusM;
    }

    const effectiveAreaM2 = spillHole ? 0.99 * s0M2 : s0M2;
    const vt = Math.sqrt((2 * massKg * g) / (rho * cd * effectiveAreaM2));
    const td = apogeeM / vt;
    const totalFlightTime = 3.5 + td;
    const ek = 0.5 * massKg * vt * vt;
    const hEqCm = ((vt * vt) / (2 * g)) * 100;
    const fOpening = 0.5 * rho * v0 * v0 * cd * effectiveAreaM2 * cx;

    return {
      vt,
      td,
      totalFlightTime,
      ek,
      hEqCm,
      fOpening,
    };
  }, [diameterCm, massG, cd, apogeeM, spillHole, geometryType]);

  // Animate flight playback along h(t)
  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setSimTime((prev) => {
        const next = prev + dt * 2.4; // 2.4x playback speed for smooth presentation
        return next > simResults.totalFlightTime ? 0 : next;
      });
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, simResults.totalFlightTime]);

  const getAltitudeAtTime = (t: number) => {
    const hBurn = apogeeM * 0.12; // 9.0 m at burnout for 75 m apogee
    if (t <= 0.5) {
      return hBurn * Math.pow(t / 0.5, 2);
    }
    if (t <= 3.5) {
      return apogeeM - (apogeeM - hBurn) * Math.pow((3.5 - t) / 3.0, 2);
    }
    return Math.max(0, apogeeM - simResults.vt * (t - 3.5));
  };

  const chart = useMemo(() => {
    const width = 720;
    const height = 310;
    const padL = 48;
    const padR = 24;
    const padT = 32;
    const padB = 40;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    const maxTime = Math.max(26, Math.ceil(simResults.totalFlightTime + 2));
    const maxAlt = Math.max(95, Math.ceil(apogeeM + 10));

    const toX = (t: number) => padL + (t / maxTime) * plotW;
    const toY = (h: number) => padT + plotH - (h / maxAlt) * plotH;

    // Sample ascent curve (0.0 -> 3.5s)
    const ascentPoints: string[] = [];
    for (let i = 0; i <= 35; i++) {
      const t = (i / 35) * 3.5;
      const h = getAltitudeAtTime(t);
      ascentPoints.push(`${i === 0 ? 'M' : 'L'} ${toX(t).toFixed(1)} ${toY(h).toFixed(1)}`);
    }

    const pApogee = { x: toX(3.5), y: toY(apogeeM) };
    const pLanding = { x: toX(simResults.totalFlightTime), y: toY(0) };

    const ascentPath = ascentPoints.join(' ');
    const descentPath = `M ${pApogee.x.toFixed(1)} ${pApogee.y.toFixed(1)} L ${pLanding.x.toFixed(1)} ${pLanding.y.toFixed(1)}`;
    const areaPath = `${ascentPath} L ${pLanding.x.toFixed(1)} ${pLanding.y.toFixed(1)} L ${toX(0).toFixed(1)} ${toY(0).toFixed(1)} Z`;

    return { width, height, padL, padR, padT, padB, toX, toY, pApogee, pLanding, ascentPath, descentPath, areaPath };
  }, [apogeeM, simResults]);

  const currentAlt = getAltitudeAtTime(simTime);
  const markerX = chart.toX(simTime);
  const markerY = chart.toY(currentAlt);
  const currentPhaseLabel =
    simTime <= 0.5
      ? 'FASE 1 • PROPULSIÓN ACTIVA'
      : simTime < 3.5
      ? 'FASE 2 • ASCENSO POR INERCIA'
      : 'FASE 3 • PARACAÍDAS DESPLEGADO';

  return (
    <section id="simulador" className="py-20 bg-[#0E0C0A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D]">
              01 • SIMULADOR INTERACTIVO & PREDICCIONES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
              Perfil de trayectoria h(t) en tiempo real.
            </h2>
          </div>

          {/* Preset Pills */}
          <div className="flex flex-wrap gap-2">
            {PARACHUTE_PRESETS.map((preset) => {
              const active = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3.5 py-2 rounded-full text-xs font-mono transition-all ${
                    active
                      ? 'bg-[#E7B56A] text-[#0B0B0B] font-bold shadow-glow-amber'
                      : 'bg-[#14110E] text-[#F8D6A1]/75 hover:text-[#FFF3E0] border border-white/10'
                  }`}
                >
                  {preset.isBuiltPrototype ? '★ Prototipo Real' : preset.name.replace('Configuración ', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 4 Cols: Minimal Sliders */}
          <div className="lg:col-span-4 rounded-3xl bg-[#14110E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#FFF3E0]">Controles</h3>
                <button
                  type="button"
                  onClick={() => handleSelectPreset(PARACHUTE_PRESETS[0])}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#E7B56A] hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restaurar prototipo</span>
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#F8D6A1]/80">Diámetro (D)</span>
                  <span className="text-[#E7B56A] font-bold">{diameterCm.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="18.0"
                  max="36.0"
                  step="0.1"
                  value={diameterCm}
                  onChange={(e) => {
                    setDiameterCm(parseFloat(e.target.value));
                    setActivePresetId('custom');
                  }}
                  className="telemetry-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#F8D6A1]/80">Masa en descenso (m_t)</span>
                  <span className="text-[#E7B56A] font-bold">{massG.toFixed(1)} g</span>
                </div>
                <input
                  type="range"
                  min="24.0"
                  max="50.0"
                  step="0.5"
                  value={massG}
                  onChange={(e) => {
                    setMassG(parseFloat(e.target.value));
                    setActivePresetId('custom');
                  }}
                  className="telemetry-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#F8D6A1]/80">Coeficiente de arrastre (C_d)</span>
                  <span className="text-[#E7B56A] font-bold">{cd.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.60"
                  max="1.50"
                  step="0.01"
                  value={cd}
                  onChange={(e) => {
                    setCd(parseFloat(e.target.value));
                    setActivePresetId('custom');
                  }}
                  className="telemetry-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#F8D6A1]/80">Apogeo estimado (h)</span>
                  <span className="text-[#E7B56A] font-bold">{apogeeM.toFixed(0)} m</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="90"
                  step="1"
                  value={apogeeM}
                  onChange={(e) => setApogeeM(parseFloat(e.target.value))}
                  className="telemetry-slider"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#F8D6A1]/60">
              Culiacán: ρ = 1.16 kg/m³ • 30 °C • g = 9.81 m/s²
            </div>
          </div>

          {/* Right 8 Cols: 4 Clean KPIs + Animated SVG Chart */}
          <div className="lg:col-span-8 rounded-3xl bg-[#14110E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-5">
            {/* 4 Key Simulation Outputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-[#0B0B0B] border border-white/10">
                <span className="text-[10px] text-[#F8D6A1]/60 block">VEL. TERMINAL</span>
                <span className="text-xl font-bold text-[#FFF3E0]">{simResults.vt.toFixed(2)} m/s</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B0B0B] border border-white/10">
                <span className="text-[10px] text-[#F8D6A1]/60 block">TIEMPO DESCENSO</span>
                <span className="text-xl font-bold text-[#E7B56A]">{simResults.td.toFixed(1)} s</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B0B0B] border border-white/10">
                <span className="text-[10px] text-[#F8D6A1]/60 block">ENERGÍA IMPACTO</span>
                <span className="text-xl font-bold text-[#FFF3E0]">{simResults.ek.toFixed(3)} J</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B0B0B] border border-white/10">
                <span className="text-[10px] text-[#F8D6A1]/60 block">FUERZA APERTURA</span>
                <span className="text-xl font-bold text-[#E7B56A]">{simResults.fOpening.toFixed(2)} N</span>
              </div>
            </div>

            {/* Playback Bar & Phase Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E7B56A] text-[#0B0B0B] font-mono text-xs font-bold hover:brightness-110 transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pausar Vuelo' : 'Reproducir Vuelo'}</span>
                </button>
                <span className="font-mono text-xs text-[#E7B56A]">
                  t = {simTime.toFixed(1)} s • h = {currentAlt.toFixed(1)} m
                </span>
              </div>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#0B0B0B] border border-[#E7B56A]/25 text-[#F8D6A1]">
                {currentPhaseLabel}
              </span>
            </div>

            {/* Animated SVG Graph */}
            <div className="rounded-2xl bg-[#0B0B0B] border border-white/10 p-4">
              <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="cleanAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D8903D" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#D8903D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0, 25, 50, 75].map((alt) => {
                  const y = chart.toY(alt);
                  return (
                    <g key={alt}>
                      <line
                        x1={chart.padL}
                        y1={y}
                        x2={chart.width - chart.padR}
                        y2={y}
                        stroke="#FFF3E0"
                        strokeOpacity="0.08"
                      />
                      <text x={chart.padL - 8} y={y + 4} textAnchor="end" fill="#F8D6A1" fontSize="10" fontFamily="JetBrains Mono">
                        {alt}m
                      </text>
                    </g>
                  );
                })}

                <path d={chart.areaPath} fill="url(#cleanAreaGrad)" />
                <path d={chart.ascentPath} fill="none" stroke="#FFF3E0" strokeWidth="2.5" />
                <path d={chart.descentPath} fill="none" stroke="#D8903D" strokeWidth="3" />

                <circle cx={chart.pApogee.x} cy={chart.pApogee.y} r="4.5" fill="#FFF3E0" stroke="#D8903D" strokeWidth="2" />
                <text x={chart.pApogee.x + 10} y={chart.pApogee.y - 8} fill="#FFF3E0" fontSize="10" fontFamily="JetBrains Mono">
                  Apogeo {apogeeM}m (3.5s)
                </text>

                <circle cx={chart.pLanding.x} cy={chart.pLanding.y} r="4.5" fill="#D8903D" />
                <text x={chart.pLanding.x} y={chart.pLanding.y - 10} textAnchor="middle" fill="#E7B56A" fontSize="10" fontFamily="JetBrains Mono">
                  {simResults.totalFlightTime.toFixed(1)}s
                </text>

                {/* Animated Live Rocket / Parachute Marker */}
                <g transform={`translate(${markerX}, ${markerY})`}>
                  <circle r="11" fill="#D8903D" fillOpacity="0.25" className="animate-ping" />
                  <circle r="5.5" fill="#FFF3E0" stroke="#D8903D" strokeWidth="2.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* CONFIRMED FULL-ROCKET BALLISTIC & RECOVERY PREDICTIONS PANEL */}
        <div className="rounded-3xl bg-[#14110E] border border-[#E7B56A]/25 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D]">
                VALIDACIÓN FÍSICA INTEGRAL (m₀ = 70.0 g • m_t = 34.0 g • Estes A10-3T)
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFF3E0] mt-1">
                Predicciones Confirmadas y Calculadas del Cohete Completo
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#D8903D]/15 text-[#E7B56A] border border-[#D8903D]/30 self-start sm:self-auto">
              Duración Total de Misión: {FULL_ROCKET_PREDICTIONS.recovery.totalMissionTimeS} s
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ascent Predictions (Newly Derived from Full Rocket Specs) */}
            <div className="p-5 rounded-2xl bg-[#0B0B0B] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E7B56A]">
                <Flame className="w-4 h-4 text-[#D8903D]" />
                <span>Fase de Ascenso Propulsado e Inercia (Nuevas Predicciones)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">EMPUJE / PESO (T/W₀)</span>
                  <span className="text-lg font-bold text-[#FFF3E0]">
                    {FULL_ROCKET_PREDICTIONS.ascent.thrustToWeightRatio.toFixed(2)} : 1
                  </span>
                  <span className="text-[10px] text-[#E7B56A] block">5.7 N / 0.687 N</span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">ACELERACIÓN MEDIA</span>
                  <span className="text-lg font-bold text-[#FFF3E0]">
                    {FULL_ROCKET_PREDICTIONS.ascent.netAccelerationMs2} m/s²
                  </span>
                  <span className="text-[10px] text-[#D8903D] block">
                    ≈ {FULL_ROCKET_PREDICTIONS.ascent.netAccelerationG} G (0.0–0.5 s)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">VEL. MÁX (BURNOUT)</span>
                  <span className="text-lg font-bold text-[#E7B56A]">
                    {FULL_ROCKET_PREDICTIONS.ascent.maxBurnoutVelocityMs} m/s
                  </span>
                  <span className="text-[10px] text-[#F8D6A1]/60 block">
                    {FULL_ROCKET_PREDICTIONS.ascent.maxBurnoutVelocityKmh} km/h
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">ALTITUD BURNOUT (0.5 s)</span>
                  <span className="text-lg font-bold text-[#FFF3E0]">
                    ≈ {FULL_ROCKET_PREDICTIONS.ascent.burnoutAltitudeM.toFixed(1)} m
                  </span>
                  <span className="text-[10px] text-[#F8D6A1]/60 block">Fin de combustión</span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-[#D8903D]/35 col-span-2">
                  <span className="text-[10px] text-[#E7B56A] block">APOGEO CONFIRMADO (t = 3.5 s)</span>
                  <span className="text-lg font-bold text-[#FFF3E0] inline-flex items-center gap-1.5">
                    <span>≈ {FULL_ROCKET_PREDICTIONS.ascent.apogeeConfirmedM.toFixed(0)} m</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D8903D]" />
                  </span>
                  <span className="text-[10px] text-[#F8D6A1]/70 block">
                    Rango óptimo {FULL_ROCKET_PREDICTIONS.ascent.apogeeRangeM} con arrastre en Culiacán
                  </span>
                </div>
              </div>
            </div>

            {/* Confirmed Recovery Predictions */}
            <div className="p-5 rounded-2xl bg-[#0B0B0B] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#E7B56A]">
                <ShieldCheck className="w-4 h-4 text-[#D8903D]" />
                <span>Fase de Recuperación & Impacto (Predicciones Confirmadas)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">VEL. TERMINAL (v_t)</span>
                  <span className="text-lg font-bold text-[#FFF3E0]">
                    {FULL_ROCKET_PREDICTIONS.recovery.terminalVelocityNominalMs} m/s
                  </span>
                  <span className="text-[10px] text-[#E7B56A] block">
                    {FULL_ROCKET_PREDICTIONS.recovery.terminalVelocityOscMs} m/s (balanceo)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">TIEMPO CAÍDA (t_d)</span>
                  <span className="text-lg font-bold text-[#E7B56A]">
                    {FULL_ROCKET_PREDICTIONS.recovery.descentTimeS} s
                  </span>
                  <span className="text-[10px] text-[#F8D6A1]/60 block">Desde h = 75 m</span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">ENERGÍA IMPACTO (E_k)</span>
                  <span className="text-lg font-bold text-[#FFF3E0]">
                    {FULL_ROCKET_PREDICTIONS.recovery.impactKineticEnergyJ} J
                  </span>
                  <span className="text-[10px] text-[#D8903D] block">
                    Caída eq: {FULL_ROCKET_PREDICTIONS.recovery.equivalentFreeFallCm.toFixed(0)} cm
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-white/5">
                  <span className="text-[10px] text-[#F8D6A1]/60 block">CHOQUE APERTURA</span>
                  <span className="text-lg font-bold text-[#E7B56A]">
                    {FULL_ROCKET_PREDICTIONS.recovery.openingShockForceN} N
                  </span>
                  <span className="text-[10px] text-[#F8D6A1]/60 block">
                    {FULL_ROCKET_PREDICTIONS.recovery.openingForcePerLineN} N / línea
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#14110E] border border-emerald-500/30 col-span-2">
                  <span className="text-[10px] text-emerald-400 block">DICTAMEN DE INTEGRIDAD</span>
                  <span className="text-sm font-bold text-[#FFF3E0] block mt-0.5">
                    Ojiva PLA + Altímetro 12 g Seguros
                  </span>
                  <span className="text-[10px] text-[#F8D6A1]/70 block">
                    Cuna de Goma EVA 5 mm disipa los 0.244 J sin daño estructural
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Collapsible Table */}
        <div className="rounded-3xl bg-[#14110E] border border-white/10 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <span className="font-display font-semibold text-sm sm:text-base text-[#FFF3E0]">
              Ver tabla comparativa de las 4 configuraciones de recuperación
            </span>
            {showTable ? <ChevronUp className="w-5 h-5 text-[#E7B56A]" /> : <ChevronDown className="w-5 h-5 text-[#E7B56A]" />}
          </button>

          {showTable && (
            <div className="px-6 pb-6 overflow-x-auto border-t border-white/10">
              <table className="w-full text-left font-mono text-xs mt-4">
                <thead>
                  <tr className="border-b border-white/10 text-[#F8D6A1]/60">
                    <th className="py-3 pr-4">Configuración</th>
                    <th className="py-3 px-3">C_d</th>
                    <th className="py-3 px-3">Diámetro</th>
                    <th className="py-3 px-3">Área</th>
                    <th className="py-3 px-3">v_t</th>
                    <th className="py-3 px-3">Caída (t_d)</th>
                    <th className="py-3 px-3">Impacto (E_k)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PARACHUTE_PRESETS.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => handleSelectPreset(row)}
                      className="cursor-pointer hover:bg-white/[0.03]"
                    >
                      <td className="py-3.5 pr-4 font-sans font-semibold text-[#FFF3E0]">{row.name}</td>
                      <td className="py-3.5 px-3 text-[#E7B56A]">{row.cd.toFixed(2)}</td>
                      <td className="py-3.5 px-3">{row.diameterCm} cm</td>
                      <td className="py-3.5 px-3">{row.areaCm2 ? `${row.areaCm2} cm²` : '—'}</td>
                      <td className="py-3.5 px-3 font-bold text-[#FFF3E0]">{row.vtNominal.toFixed(2)} m/s</td>
                      <td className="py-3.5 px-3 text-[#E7B56A]">{row.tdSeconds} s</td>
                      <td className="py-3.5 px-3">{row.ekJoules} J</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
