import React, { useEffect, useMemo, useState } from 'react';
import { CalendarClock, MapPin, Rocket, Sparkles } from 'lucide-react';
import { MISSION_CONSTANTS } from '../data/rocketData';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
  progressPct: number;
}

const calculateTimeRemaining = (): TimeRemaining => {
  const targetMs = new Date(MISSION_CONSTANTS.launchDateIso).getTime();
  const startMs = new Date(MISSION_CONSTANTS.launchWindowStartIso).getTime();
  const nowMs = Date.now();
  const diff = Math.max(0, targetMs - nowMs);

  const totalSpan = Math.max(1, targetMs - startMs);
  const elapsed = Math.min(totalSpan, Math.max(0, nowMs - startMs));
  const progressPct = Math.min(100, Math.max(4, (elapsed / totalSpan) * 100));

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLaunched: true,
      progressPct: 100,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isLaunched: false,
    progressPct,
  };
};

const pad2 = (n: number) => String(n).padStart(2, '0');

export const LaunchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeRemaining());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const blocks = useMemo(
    () => [
      { label: 'Días', value: pad2(timeLeft.days), highlight: false },
      { label: 'Horas', value: pad2(timeLeft.hours), highlight: false },
      { label: 'Minutos', value: pad2(timeLeft.minutes), highlight: false },
      { label: 'Segundos', value: pad2(timeLeft.seconds), highlight: true },
    ],
    [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
  );

  return (
    <div className="relative rounded-[2rem] bg-gradient-to-br from-[#16120E] via-[#0F0C09] to-[#1A130C] border border-[#E7B56A]/40 p-6 sm:p-10 waffle-toast-glow overflow-hidden bg-waffle-animated">
      {/* Melted Caramel & Chocolate Syrup Drip Top Border */}
      <svg
        viewBox="0 0 1200 44"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 w-full h-7 sm:h-9 opacity-85"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="countdownSyrup" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B3A1E" />
            <stop offset="45%" stopColor="#D8903D" />
            <stop offset="75%" stopColor="#E7B56A" />
            <stop offset="100%" stopColor="#6B3A1E" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L1200,0 L1200,12 C1150,12 1135,34 1110,34 C1085,34 1075,14 1040,14 C1000,14 985,26 960,26 C935,26 920,10 860,10 C800,10 785,38 755,38 C725,38 710,13 655,13 C600,13 585,28 555,28 C525,28 505,11 450,11 C390,11 375,35 345,35 C315,35 300,12 245,12 C190,12 175,27 145,27 C115,27 95,12 45,12 C20,12 8,18 0,18 Z"
          fill="url(#countdownSyrup)"
          className="animate-syrup-drip"
        />
      </svg>

      {/* Decorative Orbital Rings */}
      <div className="pointer-events-none absolute -top-28 -right-28 w-72 h-72 rounded-full border border-[#D8903D]/15 animate-orbit-slow" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-80 h-80 rounded-full border border-dashed border-[#E7B56A]/15 animate-orbit-reverse" />

      <div className="relative z-10 space-y-8 pt-2">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E7B56A]/20 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D8903D]/15 border border-[#D8903D]/40 text-[#E7B56A] text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#D8903D] animate-ping" />
              <span>CUENTA REGRESIVA OFICIAL • T−LANZAMIENTO</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF3E0] tracking-tight">
              Rumbo al Lanzamiento Final
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono">
            <div className="inline-flex items-center gap-2 text-[#FFF3E0] bg-[#0B0B0B]/85 px-3.5 py-2 rounded-xl border border-[#E7B56A]/25">
              <CalendarClock className="w-4 h-4 text-[#D8903D] shrink-0" />
              <span>{MISSION_CONSTANTS.launchDateLabel}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[#E7B56A]/85 px-1">
              <MapPin className="w-3.5 h-3.5 text-[#D8903D] shrink-0" />
              <span>{MISSION_CONSTANTS.launchTimezoneLabel}</span>
            </div>
          </div>
        </div>

        {/* Countdown Grid */}
        {timeLeft.isLaunched ? (
          <div className="py-8 px-6 rounded-2xl bg-[#0B0B0B]/90 border border-[#D8903D] text-center space-y-3 animate-countdown-pulse">
            <Rocket className="w-10 h-10 text-[#E7B56A] mx-auto animate-rocket-hover" />
            <div className="font-orbitron text-2xl sm:text-4xl font-bold shimmer-gold-text">
              ¡VENTANA DE LANZAMIENTO ACTIVA!
            </div>
            <p className="text-sm text-[#F8D6A1]/80 font-mono">
              WAFLE Rocket Tec • Culiacán, Sinaloa • Misión en curso
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {blocks.map((block) => (
              <div
                key={block.label}
                className={`relative rounded-2xl sm:rounded-3xl bg-[#0B0B0B]/90 bg-waffle-mesh border p-4 sm:p-6 text-center transition-transform duration-300 hover:-translate-y-1.5 ${
                  block.highlight
                    ? 'border-[#D8903D]/70 animate-countdown-pulse'
                    : 'border-[#E7B56A]/25 hover:border-[#E7B56A]/65'
                }`}
              >
                {/* Mini golden waffle square corner accent */}
                <span className="absolute top-3 right-3 w-2 h-2 rotate-45 bg-[#D8903D]/70 rounded-[1px]" />
                <div
                  key={block.highlight ? block.value : undefined}
                  className={`font-orbitron text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight tabular-nums ${
                    block.highlight ? 'text-[#E7B56A] animate-tick-pop' : 'text-[#FFF3E0]'
                  }`}
                >
                  {block.value}
                </div>
                <div className="mt-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#F8D6A1]/75">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mission Readiness Timeline Bar */}
        <div className="space-y-2.5 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-[#E7B56A]">
              <Sparkles className="w-3.5 h-3.5 text-[#D8903D]" />
              <span>Cronómetro sincronizado con hora oficial de Culiacán (UTC−7)</span>
            </span>
            <span className="text-[#FFF3E0]/80">
              Progreso de preparación: {timeLeft.progressPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#0B0B0B] border border-[#E7B56A]/20 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6B3A1E] via-[#D8903D] to-[#FFF3E0] transition-all duration-700"
              style={{ width: `${timeLeft.progressPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
