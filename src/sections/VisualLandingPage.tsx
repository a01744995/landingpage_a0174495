import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Gauge,
  ChevronDown,
  Palette,
  Sparkles,
  Users,
  Rocket,
  Check,
  Pencil,
  Shield,
} from 'lucide-react';
import {
  BRAND_PALETTE,
  BRAND_TYPOGRAPHY,
  MISSION_CONSTANTS,
  TEAM_MEMBERS,
} from '../data/rocketData';
import { LaunchCountdown } from '../components/LaunchCountdown';

interface VisualLandingPageProps {
  onEnterEngineering: (targetSection?: string) => void;
  onOpenBrandModal: () => void;
  teamNumber: string;
  groupCode: string;
  onUpdateTeamMeta: (nextTeamNumber: string, nextGroupCode: string) => void;
}

const EMBER_PARTICLES = [
  { left: '60%', delay: '0s', duration: '4.1s', size: 'w-1.5 h-1.5' },
  { left: '66%', delay: '0.8s', duration: '3.7s', size: 'w-2 h-2' },
  { left: '72%', delay: '1.4s', duration: '4.6s', size: 'w-1.5 h-1.5' },
  { left: '76%', delay: '0.3s', duration: '3.9s', size: 'w-1 h-1' },
  { left: '81%', delay: '1.9s', duration: '4.9s', size: 'w-2 h-2' },
  { left: '69%', delay: '2.4s', duration: '4.3s', size: 'w-1 h-1' },
  { left: '85%', delay: '1.1s', duration: '5.2s', size: 'w-1.5 h-1.5' },
  { left: '63%', delay: '2.9s', duration: '4.5s', size: 'w-1 h-1' },
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

export const VisualLandingPage: React.FC<VisualLandingPageProps> = ({
  onEnterEngineering,
  onOpenBrandModal,
  teamNumber,
  groupCode,
  onUpdateTeamMeta,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [draftTeam, setDraftTeam] = useState(teamNumber);
  const [draftGroup, setDraftGroup] = useState(groupCode);

  useEffect(() => {
    setDraftTeam(teamNumber);
    setDraftGroup(groupCode);
  }, [teamNumber, groupCode]);

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

  const handleCopyColor = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    window.setTimeout(() => setCopiedHex((prev) => (prev === hex ? null : prev)), 1500);
  };

  const handleSaveMeta = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTeamMeta(
      draftTeam.trim() || MISSION_CONSTANTS.teamNumber,
      draftGroup.trim() || MISSION_CONSTANTS.groupCode
    );
    setIsEditingMeta(false);
  };

  return (
    <div ref={rootRef} className="bg-[#0B0B0B] text-[#FFF3E0] overflow-x-hidden">
      {/* SCENE 1: CINEMATIC HERO + IDENTIFICACIÓN DEL EQUIPO + LOGOTIPOS */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Render with Animated Starfield & Pan */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/visuals/hero-launch.jpg"
            alt="Lanzamiento WAFLE Rocket Tec"
            className="w-full h-full object-cover object-center animate-hero-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/70" />

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

          {/* Animated Rising Ignition Embers */}
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
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain drop-shadow-[0_12px_28px_rgba(216,144,61,0.28)]"
                />
              </div>

              <h1 className="sr-only">WAFLE Rocket Tec — Rocket Tec Sinaloa</h1>

              <p className="text-base sm:text-lg text-[#FFF3E0]/90 leading-relaxed font-light max-w-xl">
                Proyecto aeroespacial estudiantil creado bajo el programa{' '}
                <strong className="text-[#E7B56A] font-semibold">Rocket Tec Sinaloa</strong>.
                Unimos identidad visual, diseño creativo y trabajo colaborativo rumbo al gran día de lanzamiento.
              </p>

              {/* Team Identification Plate (Nombre, Número de Equipo, Grupo) */}
              <div className="rounded-2xl bg-[#120F0C]/90 backdrop-blur-xl border border-[#E7B56A]/35 p-4 sm:p-5 max-w-xl shadow-glow-soft">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E7B56A]/15">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D8903D] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Identificación Oficial del Equipo
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingMeta((v) => !v)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#E7B56A]/80 hover:text-[#FFF3E0] transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>{isEditingMeta ? 'Cancelar' : 'Editar clave'}</span>
                  </button>
                </div>

                {isEditingMeta ? (
                  <form onSubmit={handleSaveMeta} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={draftTeam}
                      onChange={(e) => setDraftTeam(e.target.value)}
                      placeholder="Ej. Equipo 04"
                      aria-label="Número de equipo"
                      className="px-3 py-2 rounded-xl bg-[#0B0B0B] border border-[#E7B56A]/40 text-xs font-mono text-[#FFF3E0] focus:outline-none focus:border-[#D8903D]"
                    />
                    <input
                      type="text"
                      value={draftGroup}
                      onChange={(e) => setDraftGroup(e.target.value)}
                      placeholder="Ej. Grupo 502"
                      aria-label="Grupo"
                      className="px-3 py-2 rounded-xl bg-[#0B0B0B] border border-[#E7B56A]/40 text-xs font-mono text-[#FFF3E0] focus:outline-none focus:border-[#D8903D]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#E7B56A] text-[#0B0B0B] font-mono text-xs font-bold hover:brightness-110 transition-all"
                    >
                      Guardar
                    </button>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="p-2.5 rounded-xl bg-[#0B0B0B]/80 border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-[#F8D6A1]/60 block">
                        Nombre del Equipo
                      </span>
                      <span className="font-display font-bold text-sm text-[#FFF3E0] mt-0.5 block">
                        {MISSION_CONSTANTS.teamName}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0B0B]/80 border border-[#E7B56A]/30">
                      <span className="text-[10px] font-mono uppercase text-[#F8D6A1]/60 block">
                        Número de Equipo
                      </span>
                      <span className="font-orbitron font-bold text-sm text-[#E7B56A] mt-0.5 block">
                        {teamNumber}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0B0B]/80 border border-[#D8903D]/30">
                      <span className="text-[10px] font-mono uppercase text-[#F8D6A1]/60 block">
                        Grupo
                      </span>
                      <span className="font-orbitron font-bold text-sm text-[#FFF3E0] mt-0.5 block">
                        {groupCode}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#cuenta-regresiva"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-display font-bold text-sm uppercase tracking-wider text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all hover:scale-[1.03]"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Ver Cuenta Regresiva</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>

                <button
                  type="button"
                  onClick={() => onEnterEngineering('simulador')}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-display font-medium text-sm text-[#FFF3E0] bg-black/60 hover:bg-black/85 backdrop-blur-md border border-[#E7B56A]/35 transition-all hover:border-[#E7B56A]"
                >
                  <Gauge className="w-4 h-4 text-[#E7B56A]" />
                  <span>Datos Técnicos (Aparte)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Animated Dual Logo Crest Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] rounded-[2rem] bg-[#120F0C]/85 backdrop-blur-xl border border-[#E7B56A]/35 p-6 shadow-glow-soft">
                {/* Animated Orbital Ring */}
                <div className="pointer-events-none absolute -inset-3 rounded-[2.4rem] border border-dashed border-[#D8903D]/25 animate-pulse-ring" />

                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#E7B56A] mb-4">
                  <span>Insignias Oficiales</span>
                  <span>Sinaloa • 2026</span>
                </div>

                {/* WAFLE Team Emblem */}
                <div className="relative flex items-center justify-center py-2">
                  <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-[#0B0B0B] border border-[#E7B56A]/30 p-3 flex items-center justify-center shadow-glow-amber animate-rocket-hover">
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

        {/* Clean Identity Strip (Zero Technical Data) */}
        <div className="relative z-10 border-t border-[#E7B56A]/20 bg-black/65 backdrop-blur-xl">
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

      {/* SCENE 2: CUENTA REGRESIVA OFICIAL */}
      <section id="cuenta-regresiva" className="py-20 sm:py-24 bg-[#0B0B0B] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
          <LaunchCountdown />
        </div>
      </section>

      {/* SCENE 3: LOGOTIPOS OFICIALES & IDENTIDAD VISUAL */}
      <section id="identidad" className="py-20 sm:py-24 bg-[#0E0C0A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal-on-scroll">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#D8903D]">
                01 • LOGOTIPOS &amp; IDENTIDAD VISUAL
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
                Sistema Gráfico Oficial WAFLE × Rocket Tec Sinaloa
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenBrandModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-all self-start md:self-auto shadow-glow-amber"
            >
              <Palette className="w-4 h-4" />
              <span>Abrir Guía de Identidad Completa</span>
            </button>
          </div>

          {/* Dual Logos Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal-on-scroll reveal-delay-1 group rounded-3xl bg-[#14110E] border border-[#E7B56A]/30 p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:border-[#D8903D] transition-all hover:-translate-y-1">
              <div className="w-36 h-36 rounded-3xl bg-[#0B0B0B] border border-[#E7B56A]/30 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
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
                  Emblema principal del equipo que fusiona la estética waffle, caramelo e ignición espacial sobre contraste negro espacial.
                </p>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-delay-2 group rounded-3xl bg-[#14110E] border border-[#E7B56A]/30 p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:border-[#D8903D] transition-all hover:-translate-y-1">
              <div className="w-36 h-36 rounded-3xl bg-[#0B0B0B] border border-[#D8903D]/35 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
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
                  Insignia oficial del reto aeroespacial en Campus Culiacán, integrada en nuestras credenciales y plataforma de misión.
                </p>
              </div>
            </div>
          </div>

          {/* Official Color Palette + Typography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 6 Color Swatches */}
            <div className="lg:col-span-7 reveal-on-scroll rounded-3xl bg-[#14110E] border border-white/10 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8903D] block">
                    Paleta Cromática Oficial
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#FFF3E0]">
                    6 Colores de Identidad WAFLE
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#F8D6A1]/60">
                  Clic para copiar HEX
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRAND_PALETTE.map((swatch) => {
                  const isCopied = copiedHex === swatch.hex;
                  return (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => handleCopyColor(swatch.hex)}
                      className="text-left p-3 rounded-2xl bg-[#0B0B0B] border border-[#E7B56A]/20 hover:border-[#E7B56A] transition-all hover:-translate-y-0.5 group"
                    >
                      <div
                        className="w-full h-11 rounded-xl border border-white/15 mb-2.5 transition-transform group-hover:scale-[1.02]"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="font-display font-bold text-xs text-[#FFF3E0]">
                        {swatch.name}
                      </div>
                      <div className="font-mono text-xs text-[#E7B56A] flex items-center justify-between mt-0.5">
                        <span>{isCopied ? '¡Copiado!' : swatch.hex}</span>
                        {isCopied && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Showcase */}
            <div className="lg:col-span-5 reveal-on-scroll reveal-delay-1 rounded-3xl bg-[#14110E] border border-white/10 p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8903D] block">
                  Sistema Tipográfico
                </span>
                <h3 className="font-display text-xl font-bold text-[#FFF3E0]">
                  Tipografías Oficiales
                </h3>
              </div>

              <div className="space-y-3">
                {BRAND_TYPOGRAPHY.map((font) => (
                  <div
                    key={font.name}
                    className="p-3.5 rounded-2xl bg-[#0B0B0B] border border-white/10"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#E7B56A] mb-1">
                      <span>{font.name}</span>
                      <span className="text-[#F8D6A1]/60">{font.role}</span>
                    </div>
                    <div className={`text-sm sm:text-base font-bold text-[#FFF3E0] ${font.className}`}>
                      {font.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 4: GALERÍA VISUAL CONCEPTUAL (SIN DATOS TÉCNICOS) */}
      <section id="galeria-mision" className="py-20 sm:py-28 bg-[#0B0B0B] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Visual Card 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#E7B56A]/25 shadow-glow-soft bg-[#080706] group">
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
                Cada línea del vehículo refleja la identidad de nuestro equipo: textura geométrica, acabados dorados en caramelo y una arquitectura modular pensada para volar y recuperarse con seguridad.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnterEngineering('ingenieria')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Consultar Datos Técnicos Aparte</span>
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
                Nuestra campana octogonal en tonos crema vainilla y caramelo simboliza el equilibrio entre creatividad, identidad de marca y retorno controlado tras el apogeo.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnterEngineering('simulador')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0B0B0B] bg-[#E7B56A] hover:bg-[#FFF3E0] transition-colors"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Ir al Simulador de Vuelo (Aparte)</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 rounded-3xl overflow-hidden border border-[#E7B56A]/25 shadow-glow-soft bg-[#080706] group">
              <img
                src="images/visuals/parachute-recovery.jpg"
                alt="Recuperación visual WAFLE Rocket Tec"
                className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700 animate-float-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 5: TRIPULACIÓN OFICIAL */}
      <section id="tripulacion" className="py-20 sm:py-24 bg-[#0E0C0A] border-t border-white/10">
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
                className={`reveal-on-scroll reveal-delay-${(idx % 5) + 1} group rounded-3xl bg-[#14110E] border border-white/10 hover:border-[#E7B56A]/60 p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-soft`}
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

          {/* Dedicated CTA to Separated Technical Data View */}
          <div className="mt-16 sm:mt-20 rounded-3xl bg-gradient-to-r from-[#1D150E] via-[#14100C] to-[#1D150E] border border-[#E7B56A]/35 p-8 sm:p-12 text-center space-y-5 shadow-glow-soft reveal-on-scroll">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E7B56A]">
              SECCIÓN APARTE DE INGENIERÍA • {MISSION_CONSTANTS.institution.toUpperCase()}
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF3E0] max-w-2xl mx-auto">
              Todos los datos técnicos, masas, archivos CAD y simulador están organizados aparte.
            </h3>
            <p className="text-sm text-[#F8D6A1]/75 max-w-xl mx-auto">
              Mantenemos la portada enfocada en identidad visual, logotipos y cuenta regresiva. Ingresa al módulo aparte cuando desees consultar especificaciones o simular el vuelo.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onEnterEngineering('simulador')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm uppercase tracking-wider text-[#0B0B0B] bg-gradient-to-r from-[#E7B56A] to-[#D8903D] hover:brightness-110 shadow-glow-amber transition-all hover:scale-[1.03]"
              >
                <Gauge className="w-4 h-4" />
                <span>Abrir Datos Técnicos &amp; Simulador (Aparte)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
