import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Gauge,
  ChevronDown,
  Sparkles,
  Users,
  Rocket,
  Shield,
} from 'lucide-react';
import { MISSION_CONSTANTS, TEAM_MEMBERS } from '../data/rocketData';
import { LaunchCountdown } from '../components/LaunchCountdown';

interface VisualLandingPageProps {
  onEnterEngineering: (targetSection?: string) => void;
  teamNumber: string;
  groupCode: string;
}

const EMBER_PARTICLES = [
  { left: '58%', delay: '0s', duration: '4.1s', size: 'w-1.5 h-1.5' },
  { left: '64%', delay: '0.7s', duration: '3.7s', size: 'w-2 h-2' },
  { left: '70%', delay: '1.3s', duration: '4.6s', size: 'w-1.5 h-1.5' },
  { left: '75%', delay: '0.3s', duration: '3.9s', size: 'w-1 h-1' },
  { left: '80%', delay: '1.8s', duration: '4.9s', size: 'w-2 h-2' },
  { left: '68%', delay: '2.3s', duration: '4.3s', size: 'w-1 h-1' },
  { left: '84%', delay: '1.0s', duration: '5.1s', size: 'w-1.5 h-1.5' },
  { left: '61%', delay: '2.8s', duration: '4.5s', size: 'w-1 h-1' },
];

const STARFIELD = [
  { top: '12%', left: '8%', delay: '0s', size: 'w-1 h-1' },
  { top: '22%', left: '19%', delay: '0.9s', size: 'w-1.5 h-1.5' },
  { top: '16%', left: '42%', delay: '1.5s', size: 'w-1 h-1' },
  { top: '34%', left: '28%', delay: '2.1s', size: 'w-1 h-1' },
  { top: '14%', left: '74%', delay: '0.5s', size: 'w-1.5 h-1.5' },
  { top: '28%', left: '88%', delay: '1.7s', size: 'w-1 h-1' },
  { top: '44%', left: '11%', delay: '2.6s', size: 'w-1.5 h-1.5' },
  { top: '48%', left: '54%', delay: '1.1s', size: 'w-1 h-1' },
];

const FLOATING_WAFFLES = [
  { top: '16%', right: '8%', delay: '0s', size: 'w-10 h-10', opacity: 'opacity-40' },
  { top: '62%', right: '5%', delay: '1.8s', size: 'w-8 h-8', opacity: 'opacity-30' },
  { top: '26%', left: '4%', delay: '2.4s', size: 'w-9 h-9', opacity: 'opacity-25' },
];

const MiniWaffleTile: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    style={style}
    aria-hidden="true"
    fill="none"
  >
    <rect
      x="4"
      y="4"
      width="40"
      height="40"
      rx="10"
      fill="#6B3A1E"
      stroke="#E7B56A"
      strokeWidth="2.5"
    />
    <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#D8903D" />
    <rect x="20.5" y="10" width="7" height="7" rx="1.5" fill="#E7B56A" />
    <rect x="31" y="10" width="7" height="7" rx="1.5" fill="#D8903D" />
    <rect x="10" y="20.5" width="7" height="7" rx="1.5" fill="#E7B56A" />
    <rect x="20.5" y="20.5" width="7" height="7" rx="1.5" fill="#FFF3E0" fillOpacity="0.8" />
    <rect x="31" y="20.5" width="7" height="7" rx="1.5" fill="#E7B56A" />
    <rect x="10" y="31" width="7" height="7" rx="1.5" fill="#D8903D" />
    <rect x="20.5" y="31" width="7" height="7" rx="1.5" fill="#E7B56A" />
    <rect x="31" y="31" width="7" height="7" rx="1.5" fill="#D8903D" />
  </svg>
);

const WaffleSyrupDivider: React.FC = () => (
  <div className="relative w-full overflow-hidden leading-none bg-[#0B0B0B]" aria-hidden="true">
    <svg
      viewBox="0 0 1440 54"
      preserveAspectRatio="none"
      className="w-full h-8 sm:h-11 block"
    >
      <defs>
        <linearGradient id="syrupWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B3A1E" stopOpacity="0.7" />
          <stop offset="35%" stopColor="#D8903D" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#E7B56A" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#6B3A1E" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path
        d="M0,18 C120,18 145,42 195,42 C245,42 265,16 340,16 C420,16 445,48 495,48 C545,48 565,18 660,18 C745,18 770,40 820,40 C870,40 895,15 990,15 C1070,15 1095,46 1145,46 C1195,46 1220,18 1310,18 C1375,18 1405,32 1440,32 L1440,0 L0,0 Z"
        fill="url(#syrupWaveGrad)"
        className="animate-syrup-drip"
      />
    </svg>
  </div>
);

export const VisualLandingPage: React.FC<VisualLandingPageProps> = ({
  onEnterEngineering,
  teamNumber,
  groupCode,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll('.reveal-on-scroll'));
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="bg-[#0B0B0B] text-[#FFF3E0] overflow-x-hidden">
      {/* SCENE 1: CINEMATIC HERO + IDENTIFICACIÓN DEL EQUIPO + AMBIENTACIÓN WAFLE */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Render with Animated Starfield, Waffle Mesh & Pan */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/visuals/hero-launch.jpg"
            alt="Lanzamiento WAFLE Rocket Tec"
            className="w-full h-full object-cover object-center animate-hero-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/70" />
          <div className="pointer-events-none absolute inset-0 bg-waffle-animated opacity-40" />

          {/* Twinkling Starfield */}
          {STARFIELD.map((star, idx) => (
            <span
              key={idx}
              className={`pointer-events-none absolute rounded-full bg-[#FFF3E0] shadow-[0_0_8px_#E7B56A] animate-twinkle ${star.size}`}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Floating Zero-Gravity Mini Waffles */}
          {FLOATING_WAFFLES.map((waffle, idx) => (
            <MiniWaffleTile
              key={idx}
              className={`pointer-events-none hidden md:block absolute animate-waffle-float ${waffle.size} ${waffle.opacity}`}
              style={{
                top: waffle.top,
                right: waffle.right,
                left: waffle.left,
                animationDelay: waffle.delay,
              }}
            />
          ))}

          {/* Animated Rising Ignition Embers & Caramel Sparks */}
          <div className="pointer-events-none absolute inset-x-0 bottom-16 h-64 overflow-hidden">
            {EMBER_PARTICLES.map((p, idx) => (
              <span
                key={idx}
                className={`absolute bottom-0 rounded-full bg-[#E7B56A] shadow-[0_0_12px_#D8903D] animate-ember ${p.size}`}
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
            {/* Left: Team Identification & Storytelling */}
            <div className="lg:col-span-7 space-y-6 animate-fadeIn">
              <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#E7B56A]/40">
                <span className="w-2 h-2 rounded-full bg-[#D8903D] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#E7B56A]">
                  {MISSION_CONSTANTS.institution} • {MISSION_CONSTANTS.campus}
                </span>
              </div>

              {/* Official Horizontal Logo Lockup */}
              <div className="max-w-md">
                <img
                  src="images/brand/logo-horizontal.png"
                  alt="WAFLE Rocket Tec"
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain drop-shadow-[0_12px_28px_rgba(216,144,61,0.3)]"
                />
              </div>

              <h1 className="sr-only">WAFLE Rocket Tec — Rocket Tec Sinaloa</h1>

              <p className="text-base sm:text-lg text-[#FFF3E0]/90 leading-relaxed font-light max-w-xl">
                Proyecto aeroespacial estudiantil creado bajo el programa{' '}
                <strong className="text-[#E7B56A] font-semibold">Rocket Tec Sinaloa</strong>.
                Unimos estética artesanal de wafle, creatividad y trabajo colaborativo rumbo al gran día de lanzamiento.
              </p>

              {/* Team Identification Plate (Nombre, Número de Equipo, Grupo) */}
              <div className="rounded-2xl bg-[#120F0C]/90 bg-waffle-mesh backdrop-blur-xl border border-[#E7B56A]/40 p-4 sm:p-5 max-w-xl waffle-toast-glow">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E7B56A]/15">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D8903D] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Identificación Oficial del Equipo
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E7B56A]/80">
                    {MISSION_CONSTANTS.programName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="p-2.5 rounded-xl bg-[#0B0B0B]/85 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-[#F8D6A1]/60 block">
                      Nombre del Equipo
                    </span>
                    <span className="font-display font-bold text-sm text-[#FFF3E0] mt-0.5 block">
                      {MISSION_CONSTANTS.teamName}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B0B0B]/85 border border-[#E7B56A]/35">
                    <span className="text-[10px] font-mono uppercase text-[#F8D6A1]/60 block">
                      Número de Equipo
                    </span>
                    <span className="font-orbitron font-bold text-sm text-[#E7B56A] mt-0.5 block">
                      {teamNumber}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B0B0B]/85 border border-[#D8903D]/35">
                    <span className="text-[10px] font-mono uppercase text-[#F8D6A1]/60 block">
                      Grupo
                    </span>
                    <span className="font-orbitron font-bold text-sm text-[#FFF3E0] mt-0.5 block">
                      {groupCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Hero CTA */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#cuenta-regresiva"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-display font-bold text-sm uppercase tracking-wider text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all hover:scale-[1.03]"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Ver Cuenta Regresiva</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>

                <a
                  href="#logotipos"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-display font-medium text-sm text-[#FFF3E0] bg-black/60 hover:bg-black/85 backdrop-blur-md border border-[#E7B56A]/35 transition-all hover:border-[#E7B56A]"
                >
                  <Sparkles className="w-4 h-4 text-[#E7B56A]" />
                  <span>Explorar Logotipos &amp; Equipo</span>
                </a>
              </div>
            </div>

            {/* Right: Animated Dual Logo Crest Showcase with Caramel Drip & Floating Waffles */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] rounded-[2rem] bg-[#120F0C]/90 bg-waffle-animated backdrop-blur-xl border border-[#E7B56A]/40 p-6 waffle-toast-glow">
                {/* Animated Orbital Ring */}
                <div className="pointer-events-none absolute -inset-3 rounded-[2.4rem] border border-dashed border-[#D8903D]/30 animate-pulse-ring" />

                {/* Floating Caramel Drops Around Crest */}
                <span
                  className="pointer-events-none absolute -top-2 left-10 w-2.5 h-3.5 rounded-full bg-[#D8903D] shadow-[0_0_10px_#D8903D] animate-caramel-drop"
                  style={{ animationDelay: '0.2s' }}
                />
                <span
                  className="pointer-events-none absolute -top-2 right-12 w-2 h-3 rounded-full bg-[#E7B56A] shadow-[0_0_10px_#E7B56A] animate-caramel-drop"
                  style={{ animationDelay: '1.6s' }}
                />

                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#E7B56A] mb-4">
                  <span>Insignias Oficiales</span>
                  <span>Sinaloa • 2026</span>
                </div>

                {/* WAFLE Team Emblem */}
                <div className="relative flex items-center justify-center py-2">
                  <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-[#0B0B0B] border-2 border-[#E7B56A]/45 p-3 flex items-center justify-center shadow-glow-amber animate-rocket-hover">
                    <img
                      src="images/brand/emblem-main.png"
                      alt="Logotipo Oficial Equipo WAFLE"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Rocket Tec Sinaloa Companion Strip */}
                <div className="mt-5 pt-4 border-t border-[#E7B56A]/20 flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B0B0B] border border-[#D8903D]/40 p-1.5 shrink-0 flex items-center justify-center animate-float-slow">
                    <img
                      src="images/brand/rocket-tec-sinaloa.svg"
                      alt="Logotipo Rocket Tec Sinaloa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8903D] block">
                      Programa Institucional
                    </span>
                    <div className="font-display font-bold text-sm text-[#FFF3E0]">
                      Rocket Tec Sinaloa
                    </div>
                    <span className="text-[11px] text-[#F8D6A1]/70 block truncate">
                      {teamNumber} • {groupCode} • Campus Culiacán
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Identity Strip */}
        <div className="relative z-10 border-t border-[#E7B56A]/25 bg-black/70 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-[#FFF3E0]">
                {MISSION_CONSTANTS.teamName}
              </div>
              <div className="text-[11px] font-mono text-[#E7B56A]/80 uppercase mt-0.5">
                Nombre del Equipo
              </div>
            </div>
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-[#E7B56A]">
                {teamNumber} • {groupCode}
              </div>
              <div className="text-[11px] font-mono text-[#E7B56A]/80 uppercase mt-0.5">
                Registro Académico
              </div>
            </div>
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-[#FFF3E0]">
                Rocket Tec Sinaloa
              </div>
              <div className="text-[11px] font-mono text-[#E7B56A]/80 uppercase mt-0.5">
                Liga &amp; Programa
              </div>
            </div>
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-[#E7B56A]">
                02 Dic 2026 • 7:00 a. m.
              </div>
              <div className="text-[11px] font-mono text-[#E7B56A]/80 uppercase mt-0.5">
                Lanzamiento Final (UTC−7)
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaffleSyrupDivider />

      {/* SCENE 2: CUENTA REGRESIVA OFICIAL */}
      <section id="cuenta-regresiva" className="py-20 sm:py-24 bg-[#0B0B0B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
          <LaunchCountdown />
        </div>
      </section>

      {/* SCENE 3: LOGOTIPOS OFICIALES (SIN SECCIÓN DE IDENTIDAD GRÁFICA) */}
      <section id="logotipos" className="py-20 sm:py-24 bg-[#0E0C0A] border-t border-white/10 bg-waffle-mesh">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 reveal-on-scroll">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#D8903D]">
                01 • LOGOTIPOS OFICIALES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
                WAFLE Rocket Tec × Rocket Tec Sinaloa
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14110E] border border-[#E7B56A]/30 text-xs font-mono text-[#E7B56A] self-start md:self-auto">
              <MiniWaffleTile className="w-4 h-4 animate-waffle-float" />
              <span>{teamNumber} • {groupCode}</span>
            </div>
          </div>

          {/* Dual Logos Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal-on-scroll reveal-delay-1 group relative overflow-hidden rounded-3xl bg-[#14110E] bg-waffle-animated border border-[#E7B56A]/35 p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:border-[#D8903D] transition-all duration-300 hover:-translate-y-1.5 waffle-toast-glow">
              <div className="w-36 h-36 rounded-3xl bg-[#0B0B0B] border border-[#E7B56A]/35 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500 animate-waffle-float">
                <img
                  src="images/brand/emblem-main.png"
                  alt="Logotipo del Equipo WAFLE"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8903D]">
                  Logotipo del Equipo
                </span>
                <h3 className="font-display text-2xl font-bold text-[#FFF3E0]">
                  WAFLE Rocket Tec
                </h3>
                <p className="text-xs sm:text-sm text-[#F8D6A1]/75 leading-relaxed">
                  Emblema oficial del equipo que fusiona la textura dorada de wafle, el glaseado de caramelo y la propulsión hacia el espacio.
                </p>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-delay-2 group relative overflow-hidden rounded-3xl bg-[#14110E] bg-waffle-animated border border-[#E7B56A]/35 p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:border-[#D8903D] transition-all duration-300 hover:-translate-y-1.5 waffle-toast-glow">
              <div className="w-36 h-36 rounded-3xl bg-[#0B0B0B] border border-[#D8903D]/40 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500 animate-float-slow">
                <img
                  src="images/brand/rocket-tec-sinaloa.svg"
                  alt="Logotipo de Rocket Tec Sinaloa"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8903D]">
                  Logotipo Institucional
                </span>
                <h3 className="font-display text-2xl font-bold text-[#FFF3E0]">
                  Rocket Tec Sinaloa
                </h3>
                <p className="text-xs sm:text-sm text-[#F8D6A1]/75 leading-relaxed">
                  Insignia oficial del programa aeroespacial en Campus Culiacán, integrada en nuestras credenciales y plataforma de misión.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 4: GALERÍA VISUAL CONCEPTUAL */}
      <section id="galeria-mision" className="py-20 sm:py-28 bg-[#0B0B0B] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Visual Card 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#E7B56A]/30 waffle-toast-glow bg-[#080706] group">
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#E7B56A]/25 animate-pulse-ring z-10" />
              <img
                src="images/visuals/rocket-blueprint-art.jpg"
                alt="Concepto visual WAFLE Rocket Tec"
                className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8903D]">
                02 • CONCEPTO VISUAL DEL VEHÍCULO
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] leading-tight">
                Estética artesanal Waffle llevada al diseño aeroespacial.
              </h2>
              <p className="text-sm sm:text-base text-[#F8D6A1]/75 leading-relaxed">
                Cada línea del vehículo refleja la esencia de nuestro equipo: relieve de rejilla dorada, acabados en tono caramelo y una silueta modular diseñada para volar y recuperarse con estilo.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnterEngineering('ingenieria')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-colors shadow-glow-amber"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explorar Ingeniería del Vehículo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visual Card 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8903D]">
                03 • EXPERIENCIA DE RECUPERACIÓN
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] leading-tight">
                Retorno elegante en el cielo sinaloense.
              </h2>
              <p className="text-sm sm:text-base text-[#F8D6A1]/75 leading-relaxed">
                Nuestra campana en tonos crema vainilla y caramelo simboliza el equilibrio entre creatividad, diseño y regreso suave tras alcanzar la altura máxima.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnterEngineering('simulador')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-colors shadow-glow-amber"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Probar Simulador de Descenso</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 rounded-3xl overflow-hidden border border-[#E7B56A]/30 waffle-toast-glow bg-[#080706] group">
              <img
                src="images/visuals/parachute-recovery.jpg"
                alt="Recuperación visual WAFLE Rocket Tec"
                className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700 animate-float-slow"
              />
            </div>
          </div>
        </div>
      </section>

      <WaffleSyrupDivider />

      {/* SCENE 5: TRIPULACIÓN OFICIAL */}
      <section id="tripulacion" className="py-20 sm:py-24 bg-[#0E0C0A] bg-waffle-mesh">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 reveal-on-scroll">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8903D] inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                04 • TRIPULACIÓN OFICIAL
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
                Equipo {MISSION_CONSTANTS.teamName}
              </h2>
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#14110E] border border-[#E7B56A]/30 text-xs font-mono text-[#E7B56A] self-start md:self-auto">
              <span>{teamNumber}</span>
              <span className="text-[#D8903D]">•</span>
              <span>{groupCode}</span>
              <span className="text-[#D8903D]">•</span>
              <span>{MISSION_CONSTANTS.programName}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                className={`reveal-on-scroll reveal-delay-${(idx % 5) + 1} group rounded-3xl bg-[#14110E] border border-white/10 hover:border-[#E7B56A]/65 p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-amber`}
              >
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#0B0B0B]">
                  <img
                    src={member.image}
                    alt={member.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 px-1 text-center">
                  <span className="text-[10px] font-mono text-[#D8903D] block">
                    {member.badgeCode}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#FFF3E0] mt-0.5">
                    {member.fullName}
                  </h3>
                  <p className="text-[11px] text-[#E7B56A]/80 mt-0.5 line-clamp-2">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Simulator Call-To-Action Card */}
          <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1D150E] via-[#14100C] to-[#1D150E] bg-waffle-animated border border-[#E7B56A]/40 p-8 sm:p-12 text-center space-y-5 waffle-toast-glow reveal-on-scroll">
            <MiniWaffleTile className="pointer-events-none hidden sm:block absolute top-6 left-8 w-10 h-10 opacity-30 animate-waffle-float" />
            <MiniWaffleTile
              className="pointer-events-none hidden sm:block absolute bottom-6 right-8 w-10 h-10 opacity-30 animate-waffle-float"
              style={{ animationDelay: '1.8s' }}
            />

            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E7B56A] relative z-10 block">
              CENTRO DE SIMULACIÓN • {MISSION_CONSTANTS.institution.toUpperCase()}
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF3E0] max-w-2xl mx-auto relative z-10">
              Explora el simulador interactivo de vuelo y la ingeniería de misión
            </h3>
            <p className="text-sm text-[#F8D6A1]/75 max-w-xl mx-auto relative z-10">
              Visualiza la trayectoria de vuelo, el modelo físico y las simulaciones interactivas del proyecto WAFLE Rocket Tec.
            </p>
            <div className="pt-2 relative z-10">
              <button
                type="button"
                onClick={() => onEnterEngineering('simulador')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm uppercase tracking-wider text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all hover:scale-[1.03]"
              >
                <Gauge className="w-4 h-4" />
                <span>Abrir Simulador &amp; Ingeniería</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
