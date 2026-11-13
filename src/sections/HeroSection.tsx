import React from 'react';
import { ArrowRight, Compass, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const metrics = [
    { value: '70.0 g', label: 'Masa al despegue (m₀)' },
    { value: '75 m', label: 'Apogeo estimado (Estes A10-3T)' },
    { value: '3.79 m/s', label: 'Velocidad terminal de descenso' },
    { value: '19.8 s', label: 'Tiempo de descenso controlado' },
  ];

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0B0B0B]"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[420px] rounded-full opacity-20 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #D8903D 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clean Typography & Direct CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E7B56A]">
              <MapPin className="w-3.5 h-3.5 text-[#D8903D]" />
              <span>Tecnológico de Monterrey • Campus Culiacán</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#FFF3E0] leading-[1.08]">
              Ingeniería aeroespacial impresa en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF3E0] via-[#E7B56A] to-[#D8903D]">
                PLA V10
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-[#F8D6A1]/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
              <strong className="text-[#FFF3E0] font-semibold">WAFLE Rocket Tec</strong> es un cohete
              experimental impulsado por un motor sólido <span className="text-[#FFF3E0]">Estes A10-3T</span>,
              con arquitectura de separación independiente, altímetro barométrico y paracaídas octogonal
              de alta estabilidad.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#simulador"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display font-semibold text-sm text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all"
              >
                <span>Simular Trayectoria</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#arquitectura"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display font-medium text-sm text-[#FFF3E0] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
              >
                <Compass className="w-4 h-4 text-[#E7B56A]" />
                <span>Ver Despiece CAD V10</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Emblem Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] p-5 rounded-3xl bg-[#12100E] border border-white/10 shadow-glow-soft">
              <div className="rounded-2xl overflow-hidden aspect-square bg-[#0B0B0B] border border-[#E7B56A]/20">
                <img
                  src="/images/brand/emblem-main.jpg"
                  alt="Emblema WAFLE Rocket Tec"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-1 text-xs font-mono text-[#F8D6A1]/70">
                <span>REVISIÓN CAD V10</span>
                <span className="text-[#E7B56A]">ρ = 1.16 kg/m³ • 30 °C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean 4-Metric Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-center lg:text-left">
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] tracking-tight">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm text-[#F8D6A1]/65 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
