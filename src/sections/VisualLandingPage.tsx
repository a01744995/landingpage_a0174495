import React from 'react';
import { ArrowRight, Gauge, ChevronDown, Layers, ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/rocketData';

interface VisualLandingPageProps {
  onEnterEngineering: (targetSection?: string) => void;
}

export const VisualLandingPage: React.FC<VisualLandingPageProps> = ({
  onEnterEngineering,
}) => {
  const emberParticles = [
    { left: '68%', delay: '0s', duration: '4.2s', size: 'w-1.5 h-1.5' },
    { left: '74%', delay: '1.1s', duration: '3.8s', size: 'w-2 h-2' },
    { left: '80%', delay: '0.6s', duration: '4.8s', size: 'w-1 h-1' },
    { left: '63%', delay: '1.8s', duration: '5.1s', size: 'w-1.5 h-1.5' },
    { left: '77%', delay: '2.3s', duration: '4.0s', size: 'w-1 h-1' },
  ];

  return (
    <div className="bg-[#0B0B0B] text-[#FFF3E0]">
      {/* SCENE 1: FULL-SCREEN CINEMATIC HERO LAUNCH */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Render with subtle motion */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/visuals/hero-launch.jpg"
            alt="WAFLE Rocket Tec Launch"
            className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/60" />

          {/* Subtle Animated Rising Ignition Embers */}
          <div className="pointer-events-none absolute inset-x-0 bottom-24 h-48 overflow-hidden">
            {emberParticles.map((p, idx) => (
              <span
                key={idx}
                className={`absolute bottom-0 rounded-full bg-[#E7B56A] shadow-[0_0_10px_#D8903D] animate-ember ${p.size}`}
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E7B56A]/30">
              <span className="w-2 h-2 rounded-full bg-[#D8903D] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#E7B56A]">
                TECNOLÓGICO DE MONTERREY • CAMPUS CULIACÁN
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-[#FFF3E0] leading-[1.02]">
              WAFLE
              <span className="block text-2xl sm:text-3xl font-mono font-normal tracking-[0.25em] text-[#E7B56A] mt-2">
                ROCKET TEC
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#FFF3E0]/85 leading-relaxed font-light">
              Cohete experimental de manufactura aditiva en PLA, propulsión sólida Estes A10-3T e
              instrumentación barométrica protegida.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={() => onEnterEngineering('simulador')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-display font-bold text-sm uppercase tracking-wider text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all hover:scale-[1.02]"
              >
                <Gauge className="w-4 h-4" />
                <span>Abrir Simulador & Predicciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#galeria-mision"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-display font-medium text-sm text-[#FFF3E0] bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/15 transition-all"
              >
                <span>Explorar el Vehículo</span>
                <ChevronDown className="w-4 h-4 text-[#E7B56A] animate-bounce" />
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Floating Physical Specifications Bar (Real Built Specs Only — No Predictions) */}
        <div className="relative z-10 border-t border-white/10 bg-black/55 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#FFF3E0]">PLA 1.24 g/cm³</div>
              <div className="text-xs font-mono text-[#E7B56A]/80 uppercase mt-0.5">Manufactura Aditiva Vertical</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#FFF3E0]">70.0 g</div>
              <div className="text-xs font-mono text-[#E7B56A]/80 uppercase mt-0.5">Masa Total al Despegue</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#FFF3E0]">Estes A10-3T</div>
              <div className="text-xs font-mono text-[#E7B56A]/80 uppercase mt-0.5">Propulsión Sólida (2.5 Ns)</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#FFF3E0]">27.5 cm</div>
              <div className="text-xs font-mono text-[#E7B56A]/80 uppercase mt-0.5">Campana en Tafeta Stretch</div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 2: STUDIO PRODUCT SHOWCASE (APPLE / SPACEX VISUAL STYLE) */}
      <section id="galeria-mision" className="py-24 sm:py-32 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Visual Card 1: Studio Rocket Render */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#E7B56A]/25 shadow-glow-soft bg-[#080706] group">
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E7B56A]/20 animate-pulse-ring z-10" />
              <img
                src="images/visuals/rocket-blueprint-art.jpg"
                alt="Estructura WAFLE Rocket Tec en PLA"
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8903D]">
                01 • FUSELAJE E INSTRUMENTACIÓN
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] leading-tight">
                Arquitectura modular en PLA con separación de etapas.
              </h2>
              <p className="text-sm sm:text-base text-[#F8D6A1]/75 leading-relaxed">
                Construido en ácido poliláctico (<span className="text-[#FFF3E0]">55.0 g</span> de masa seca), con
                barrera ignífuga de celulosa y una ojiva ventilada que aloja el altímetro barométrico de{' '}
                <span className="text-[#FFF3E0]">12.0 g</span> sobre cuna de Goma EVA de{' '}
                <span className="text-[#FFF3E0]">5 mm</span>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnterEngineering('ingenieria')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-colors"
                >
                  <Layers className="w-4 h-4" />
                  <span>Ver Arquitectura y Masas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visual Card 2: Octagonal Parachute Recovery at Twilight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8903D]">
                02 • SISTEMA DE RECUPERACIÓN
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] leading-tight">
                Campana octogonal en Tafeta Stretch.
              </h2>
              <p className="text-sm sm:text-base text-[#F8D6A1]/75 leading-relaxed">
                Prototipo construido sin orificio central de <span className="text-[#FFF3E0]">27.5 cm</span> de
                diámetro (<span className="text-[#FFF3E0]">534.7 cm²</span>) con bordes termosellados,{' '}
                <span className="text-[#FFF3E0]">8 líneas</span> de Nylon Omega No. 2 de{' '}
                <span className="text-[#FFF3E0]">30 cm</span> y cordón elástico de{' '}
                <span className="text-[#FFF3E0]">52 cm</span> para sostener únicamente los{' '}
                <span className="text-[#FFF3E0]">34.0 g</span> de la ojiva.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnterEngineering('simulador')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ver Simulador de Descenso</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 rounded-3xl overflow-hidden border border-[#E7B56A]/25 shadow-glow-soft bg-[#080706] group">
              <img
                src="images/visuals/parachute-recovery.jpg"
                alt="Recuperación por Paracaídas Octogonal WAFLE"
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700 animate-float-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 3: VISUAL CREW SHOWCASE */}
      <section className="py-24 bg-[#0E0C0A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8903D]">
              03 • TRIPULACIÓN OFICIAL
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
              Equipo WAFLE Rocket Tec
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group rounded-3xl bg-[#14110E] border border-white/10 hover:border-[#E7B56A]/50 p-3 transition-all hover:-translate-y-1.5"
              >
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#0B0B0B]">
                  <img
                    src={member.image}
                    alt={member.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3 px-1 text-center">
                  <h3 className="font-display font-bold text-sm text-[#FFF3E0]">{member.fullName}</h3>
                  <p className="text-[11px] text-[#E7B56A]/75 mt-0.5 truncate">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Big Call To Action to Enter Technical Engineering Mode */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#1D150E] via-[#14100C] to-[#1D150E] border border-[#E7B56A]/35 p-8 sm:p-12 text-center space-y-5 shadow-glow-soft">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E7B56A]">
              EVALUACIÓN TÉCNICA • TECNOLÓGICO DE MONTERREY
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF3E0] max-w-2xl mx-auto">
              ¿Listo para inspeccionar las predicciones de vuelo y el simulador físico?
            </h3>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onEnterEngineering('simulador')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm uppercase tracking-wider text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all hover:scale-[1.02]"
              >
                <span>Entrar al Simulador & Predicciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
