import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { TrackType } from '../../types/game';
import { ArrowRight, Sparkles, BookOpen, Bot } from 'lucide-react';
import gsap from 'gsap';

// Official Technology SVG Logos
const PythonLogo: React.FC = () => (
  <svg viewBox="0 0 128 128" className="w-8 h-8 shrink-0">
    <path fill="url(#pyBlue)" d="M63.5 12.2c-27.1 0-25.4 11.8-25.4 11.8l.1 12.3h25.8v3.7H27.3S12 38.3 12 65.7c0 27.4 13.4 26.4 13.4 26.4h8v-11.5s-.4-13.8 13.6-13.8h23.4s13.1.2 13.1-13V25.3s1.7-13.1-26.8-13.1zm-13.7 8.2c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z"/>
    <path fill="url(#pyYellow)" d="M64.5 115.8c27.1 0 25.4-11.8 25.4-11.8l-.1-12.3H64v-3.7h36.7s15.3 1.7 15.3-25.7c0-27.4-13.4-26.4-13.4-26.4h-8v11.5s.4 13.8-13.6 13.8H67.6s-13.1-.2-13.1 13v28.5s-1.7 13.1 26.8 13.1zm13.7-8.2c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
    <defs>
      <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3776AB" />
        <stop offset="100%" stopColor="#2B5B84" />
      </linearGradient>
      <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD43B" />
        <stop offset="100%" stopColor="#FFE873" />
      </linearGradient>
    </defs>
  </svg>
);

const JavaScriptLogo: React.FC = () => (
  <svg viewBox="0 0 128 128" className="w-8 h-8 shrink-0">
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path fill="#000000" d="M67.3 104c3.4 5.7 7.9 9.9 15.8 9.9 6.7 0 11-3.3 11-8.3 0-5.8-4.6-8-12.3-11.3l-4.2-1.8c-12.1-5.2-20.2-11.7-20.2-25.1 0-13.4 10.3-23.7 26.9-23.7 11.6 0 19.9 4.1 25.5 14.1l-10.4 6.7c-3.1-5.5-6.5-7.7-14.8-7.7-6 0-9.8 2.6-9.8 6.6 0 4.6 3.6 6.7 10.7 9.8l4.2 1.8c14.2 6.1 21.9 12.3 21.9 25.9 0 15.6-12 24.8-29.6 24.8-16.5 0-26.6-8.2-31.5-17.7l12-8zM24 102.5c3.2 4.6 7.4 7.8 14.2 7.8 6.5 0 10.6-3.1 10.6-15.3V45h15.9v50.6c0 20.2-11.3 28.4-26.9 28.4-13.4 0-21.9-6.9-26.1-15.8l12.3-5.7z"/>
  </svg>
);

const DjangoLogo: React.FC = () => (
  <svg viewBox="0 0 128 128" className="w-8 h-8 shrink-0">
    <rect width="128" height="128" rx="16" fill="#092E20" />
    <path fill="#44B78B" d="M78 28h18v72H78V83.5C73.5 95 62 99 50 99 29 99 14 82 14 62s15-37 36-37c12 0 23.5 4 28 15.5V28zm-22.5 57c12.5 0 22.5-9.8 22.5-23s-10-23-22.5-23S33 48.8 33 62s10 23 22.5 23z"/>
  </svg>
);

const ReactLogo: React.FC = () => (
  <svg viewBox="0 0 128 128" className="w-8 h-8 shrink-0 animate-[spin_20s_linear_infinite]">
    <circle cx="64" cy="64" r="11" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="6" fill="none">
      <ellipse cx="64" cy="64" rx="48" ry="18" />
      <ellipse cx="64" cy="64" rx="48" ry="18" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="48" ry="18" transform="rotate(120 64 64)" />
    </g>
  </svg>
);

interface ModuleTrack {
  id: TrackType;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  LogoComponent: React.FC;
  cardBg: string;
  borderColor: string;
  badgeStyle: string;
  textColor: string;
  buttonGradient: string;
  levelsCount: number;
}

const MODULES: ModuleTrack[] = [
  {
    id: 'python',
    title: 'Python',
    badge: 'Fundamentos de Lógica',
    tagline: 'Sintaxis limpia y algoritmos',
    description: 'Aprende la base del pensamiento computacional: secuencias, variables, estructuras condicionales y bucles en Python.',
    LogoComponent: PythonLogo,
    cardBg: 'bg-slate-900/90 bg-gradient-to-br from-[#3776AB]/15 via-[#3776AB]/5 to-slate-950',
    borderColor: 'border-[#3776AB]/50 hover:border-[#FFD43B]',
    badgeStyle: 'bg-[#3776AB]/20 text-[#60A5FA] border-[#3776AB]/40',
    textColor: 'text-[#60A5FA]',
    buttonGradient: 'from-[#3776AB] to-[#2563EB] hover:from-[#60A5FA] hover:to-[#3776AB] text-white',
    levelsCount: 10
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    badge: 'Web Interactiva',
    tagline: 'Lógica cliente y tiempo real',
    description: 'Domina la programación del navegador, funciones asíncronas, manipulación interactiva y eventos dinámicos con JS.',
    LogoComponent: JavaScriptLogo,
    cardBg: 'bg-slate-900/90 bg-gradient-to-br from-[#F7DF1E]/15 via-[#F7DF1E]/5 to-slate-950',
    borderColor: 'border-[#F7DF1E]/50 hover:border-[#F7DF1E]',
    badgeStyle: 'bg-[#F7DF1E]/20 text-[#F7DF1E] border-[#F7DF1E]/40',
    textColor: 'text-[#F7DF1E]',
    buttonGradient: 'from-[#F7DF1E] to-[#EAB308] hover:from-[#FDE047] hover:to-[#F7DF1E] text-slate-950 font-bold',
    levelsCount: 10
  },
  {
    id: 'django',
    title: 'Django',
    badge: 'Framework Backend',
    tagline: 'Servidores, Rutas y APIs',
    description: 'Explora la lógica de servidores con Python: construcción de vistas, controladores de respuesta, endpoints y arquitectura web.',
    LogoComponent: DjangoLogo,
    cardBg: 'bg-slate-900/90 bg-gradient-to-br from-[#092E20]/50 via-[#44B78B]/10 to-slate-950',
    borderColor: 'border-[#44B78B]/50 hover:border-[#44B78B]',
    badgeStyle: 'bg-[#44B78B]/20 text-[#44B78B] border-[#44B78B]/40',
    textColor: 'text-[#44B78B]',
    buttonGradient: 'from-[#44B78B] to-[#10B981] hover:from-[#34D399] hover:to-[#44B78B] text-slate-950 font-bold',
    levelsCount: 10
  },
  {
    id: 'react',
    title: 'React',
    badge: 'Framework Frontend',
    tagline: 'Componentes y Estado',
    description: 'Aprende la arquitectura reactiva del desarrollo moderno: declaración de componentes, estado dinámico y renderizado de UI.',
    LogoComponent: ReactLogo,
    cardBg: 'bg-slate-900/90 bg-gradient-to-br from-[#61DAFB]/15 via-[#61DAFB]/5 to-slate-950',
    borderColor: 'border-[#61DAFB]/50 hover:border-[#61DAFB]',
    badgeStyle: 'bg-[#61DAFB]/20 text-[#61DAFB] border-[#61DAFB]/40',
    textColor: 'text-[#61DAFB]',
    buttonGradient: 'from-[#61DAFB] to-[#0284C7] hover:from-[#38BDF8] hover:to-[#61DAFB] text-slate-950 font-bold',
    levelsCount: 10
  }
];

export const HomePanel: React.FC = () => {
  const { setActiveTrack, userProgress } = useGameStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.module-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  const totalCompleted = Object.values(userProgress).filter(p => p.completed).length;

  return (
    <div className="flex-1 h-full w-full flex flex-col justify-between items-center p-4 sm:p-5 max-w-6xl mx-auto overflow-hidden">
      {/* Compact Header */}
      <div className="text-center mb-3 sm:mb-4 relative shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold mb-2 shadow-lg shadow-cyan-500/10 animate-pulse">
          <Sparkles size={13} />
          <span>Plataforma de Entrenamiento Gamificado</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-1 tracking-tight">
          SELECCIONA TU MÓDULO
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-medium leading-normal">
          Elige la tecnología que deseas aprender hoy. Cada módulo cuenta con sus propios retos pedagógicos y código adaptado.
        </p>

        {/* Status Pills */}
        <div className="flex items-center justify-center gap-3 mt-2 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-0.5 rounded-lg border border-slate-800">
            <Bot size={14} className="text-cyan-400" />
            <span>Mentor: <strong className="text-slate-200">Cody</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-0.5 rounded-lg border border-slate-800">
            <BookOpen size={14} className="text-amber-400" />
            <span>Completados: <strong className="text-amber-400">{totalCompleted} Niveles</strong></span>
          </div>
        </div>
      </div>

      {/* 2x2 Modules Grid (Fits exact height) */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full flex-1 min-h-0">
        {MODULES.map(module => {
          const { LogoComponent } = module;

          return (
            <div
              key={module.id}
              onClick={() => setActiveTrack(module.id)}
              className={`module-card ${module.cardBg} border ${module.borderColor} rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 group flex flex-col justify-between h-full`}
            >
              <div>
                {/* Top Row: Official SVG Logo & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-slate-950 border ${module.borderColor} shadow-lg shadow-slate-950/50 group-hover:scale-110 transition-all`}>
                    <LogoComponent />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${module.badgeStyle}`}>
                    {module.badge}
                  </span>
                </div>

                {/* Module Title & Tagline */}
                <h2 className="text-xl font-black text-slate-100 mb-0.5 flex items-center gap-2">
                  {module.title}
                </h2>
                <p className={`text-xs font-bold ${module.textColor} mb-2`}>
                  {module.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {module.description}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2">
                <span className="text-[11px] font-semibold text-slate-400">
                  {module.levelsCount} Misiones de Aprendizaje
                </span>

                <button
                  className={`px-4 py-2 bg-gradient-to-r ${module.buttonGradient} font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95`}
                >
                  <span>Iniciar {module.title}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
