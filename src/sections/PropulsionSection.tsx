import React from 'react';
import { Flame, Rocket, Clock, ArrowUp, Shield, Sparkles, Compass } from 'lucide-react';
import { ENGINE_SPECS, MISSION_CONSTANTS } from '../data/rocketData';

export const PropulsionSection: React.FC = () => {
  const flightPhases = [
    {
      phase: 'FASE 01',
      timeWindow: '0.0 s → 0.5 s',
      title: 'Ascenso Propulsado (Combustión Activa)',
      subtitle: 'Motor comercial de combustible sólido Estes A10-3T',
      metrics: [
        { label: 'Impulso Total', value: '≈ 2.5 Ns' },
        { label: 'Empuje Medio', value: '≈ 5.7 N' },
        { label: 'Duración del Impulso', value: '≈ 0.5 s' },
      ],
      description:
        'Encendido eléctrico vertical con tobera hacia abajo. El motor Estes A10-3T proporciona un empuje medio de 5.7 N durante medio segundo, acelerando los 70.0 g de masa inicial (m₀) fuera del riel de lanzamiento.',
    },
    {
      phase: 'FASE 02',
      timeWindow: '0.5 s → 3.5 s',
      title: 'Ascenso por Inercia & Eyección en Apogeo',
      subtitle: 'Retardo pirotécnico de 3.0 segundos tras agotar el combustible',
      metrics: [
        { label: 'Retardo de Eyección', value: '3.0 s' },
        { label: 'Apogeo Estimado (h)', value: '≈ 75 m (60–90 m)' },
        { label: 'Densidad Aire Culiacán', value: 'ρ ≈ 1.16 kg/m³' },
      ],
      description:
        'Tras apagarse el motor en t = 0.5 s, el cohete asciende por inercia desacelerado por la gravedad (9.81 m/s²) y el arrastre aerodinámico hasta alcanzar los ≈ 75 m en t = 3.5 s, instante en que se dispara la carga de eyección.',
    },
    {
      phase: 'FASE 03',
      timeWindow: '3.5 s → 23.3 s (t_d = 19.8 s)',
      title: 'Separación Estructural & Descenso Controlado',
      subtitle: 'Despliegue de campana octogonal en Tafeta Stretch (D = 27.5 cm)',
      metrics: [
        { label: 'Masa Suspendida (m_t)', value: '34.0 g (0.034 kg)' },
        { label: 'Velocidad Terminal (v_t)', value: '3.79 m/s (3.89 m/s osc.)' },
        { label: 'Fuerza de Apertura', value: '3.49 N (0.44 N/línea)' },
      ],
      description:
        'Las 3–4 hojas de Wadding bloquean las llamas de eyección, el cordón elástico de 52 cm amortigua el tirón de apertura y la ojiva con el altímetro desciende establemente durante 19.8 s hasta aterrizar con E_k = 0.244 J.',
    },
  ];

  return (
    <section
      id="propulsion"
      className="py-20 md:py-28 bg-[#0E0C0A] border-t border-[#E7B56A]/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8903D]/15 border border-[#D8903D]/35 text-[#E7B56A] text-xs font-mono uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5" />
              MÓDULO 03 • SISTEMA DE PROPULSIÓN & TRAYECTORIA
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF3E0] tracking-tight">
              Motor Sólido {ENGINE_SPECS.model} & Perfil de Misión
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#F8D6A1]/80 max-w-xl">
            Trayectoria balística calibrada para las condiciones atmosféricas de{' '}
            <strong className="text-[#FFF3E0]">Culiacán, Sinaloa</strong> (<span className="font-mono text-[#E7B56A]">54–55 m s. n. m.</span>,{' '}
            <span className="font-mono text-[#E7B56A]">30 °C</span>,{' '}
            <span className="font-mono text-[#E7B56A]">ρ ≈ 1.16 kg/m³</span>).
          </p>
        </div>

        {/* Engine Spec Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1A140F] via-[#14110E] to-[#1A140F] border border-[#E7B56A]/30 p-6 sm:p-8 mb-10 shadow-glow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D] block">
                UNIDAD PROPULSORA COMERCIAL
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF3E0]">
                Motor {ENGINE_SPECS.model}
              </h3>
              <p className="text-xs sm:text-sm text-[#F8D6A1]/80 leading-relaxed">
                {ENGINE_SPECS.type}. Alojado en la <strong>Pieza 04 — PortaMotor A (PLA)</strong> con barrera térmica
                superior de 3 a 4 hojas de papel ignífugo (Wadding).
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-4 rounded-2xl bg-[#0B0B0B]/90 border border-[#E7B56A]/20">
                <span className="text-[10px] text-[#F8D6A1]/60 block">IMPULSO TOTAL</span>
                <span className="text-xl sm:text-2xl font-bold text-[#FFF3E0] mt-1 block">
                  ≈ {ENGINE_SPECS.totalImpulseNs} Ns
                </span>
                <span className="text-[10px] text-[#D8903D]">Clase A (Estes)</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0B0B]/90 border border-[#E7B56A]/20">
                <span className="text-[10px] text-[#F8D6A1]/60 block">EMPUJE MEDIO</span>
                <span className="text-xl sm:text-2xl font-bold text-[#E7B56A] mt-1 block">
                  ≈ {ENGINE_SPECS.averageThrustN} N
                </span>
                <span className="text-[10px] text-[#F8D6A1]/70">T/W inicial &gt; 8:1</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0B0B]/90 border border-[#E7B56A]/20">
                <span className="text-[10px] text-[#F8D6A1]/60 block">QUEMADO (t_b)</span>
                <span className="text-xl sm:text-2xl font-bold text-[#FFF3E0] mt-1 block">
                  ≈ {ENGINE_SPECS.burnTimeS} s
                </span>
                <span className="text-[10px] text-[#D8903D]">0.0 s → 0.5 s</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0B0B]/90 border border-[#E7B56A]/20">
                <span className="text-[10px] text-[#F8D6A1]/60 block">RETARDO EYECCIÓN</span>
                <span className="text-xl sm:text-2xl font-bold text-[#E7B56A] mt-1 block">
                  {ENGINE_SPECS.ejectionDelayS.toFixed(1)} s
                </span>
                <span className="text-[10px] text-[#F8D6A1]/70">Apogeo t ≈ 3.5 s</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Flight Phases Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {flightPhases.map((item, index) => (
            <div
              key={item.phase}
              className="rounded-3xl bg-[#14110E] border border-[#E7B56A]/25 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-[#D8903D] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E7B56A]/15">
                  <span className="px-2.5 py-1 rounded-lg bg-[#D8903D]/20 text-[#E7B56A] font-mono text-xs font-bold">
                    {item.phase}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FFF3E0]">
                    <Clock className="w-3.5 h-3.5 text-[#D8903D]" />
                    {item.timeWindow}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#FFF3E0] mt-4">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#E7B56A] mt-1">{item.subtitle}</p>

                <p className="text-xs sm:text-sm text-[#F8D6A1]/80 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7B56A]/15 grid grid-cols-3 gap-2 font-mono">
                {item.metrics.map((m) => (
                  <div key={m.label} className="p-2.5 rounded-xl bg-[#0B0B0B]/80 border border-[#E7B56A]/10">
                    <span className="text-[9px] uppercase text-[#F8D6A1]/60 block truncate">{m.label}</span>
                    <span className="text-xs font-bold text-[#FFF3E0] mt-0.5 block">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
